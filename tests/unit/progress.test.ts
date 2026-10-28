/**
 * 進度存檔（src/core/progress.ts）測試。
 * 用 localStorage mock（Vitest stubGlobal），唔需要 jsdom。
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  SAVE_KEY,
  SAVE_VERSION,
  clearedCount,
  clearedRecord,
  collectIdioms,
  defaultSave,
  isLevelUnlocked,
  loadProgress,
  markChapterSeen,
  markTutorialSeen,
  nextPlayableLevel,
  recordLevelClear,
  resetProgress,
  saveProgress,
  totalStars,
  updateSettings,
} from '../../src/core/progress';
import type { SaveData } from '../../src/core/types';

/* ------------------------------------------------------------------ */
/* localStorage mock                                                   */
/* ------------------------------------------------------------------ */
function createStorage(initial: Record<string, string> = {}): Storage {
  const map = new Map<string, string>(Object.entries(initial));
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, String(value));
    },
  } as Storage;
}

function seedSave(save: SaveData): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

beforeEach(() => {
  vi.stubGlobal('localStorage', createStorage());
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/* ------------------------------------------------------------------ */
describe('loadProgress / saveProgress', () => {
  it('defaultSave 結構正確、版本為 1', () => {
    const save = defaultSave();
    expect(save).toEqual({
      version: SAVE_VERSION,
      levels: {},
      collected: [],
      settings: { sound: true, reducedMotion: false },
      seenChapters: [],
      tutorialSeen: false,
    });
    expect(SAVE_VERSION).toBe(1);
  });

  it('未有任何存檔時回傳預設值', () => {
    expect(loadProgress()).toEqual(defaultSave());
  });

  it('saveProgress → loadProgress roundtrip 保留資料', () => {
    const save = defaultSave();
    save.levels['1'] = { stars: 3, mistakes: 0, hints: 0, clearedAt: 123 };
    save.collected = ['hua-she-tian-zu'];
    save.settings = { sound: false, reducedMotion: true };
    save.seenChapters = [1, 2];
    save.tutorialSeen = true;
    saveProgress(save);
    expect(loadProgress()).toEqual(save);
  });

  it('損壞 JSON／版本不符時安全回退預設值', () => {
    localStorage.setItem(SAVE_KEY, '{ not json');
    expect(loadProgress()).toEqual(defaultSave());

    localStorage.setItem(SAVE_KEY, JSON.stringify({ version: 99, levels: { 1: { stars: 3 } } }));
    expect(loadProgress()).toEqual(defaultSave());
  });

  it('過濾非法紀錄、星級 clamp 1–3、collected 去重', () => {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        version: 1,
        levels: {
          1: { stars: 9, mistakes: 2, hints: 1, clearedAt: 5 },
          2: { stars: 0, mistakes: 0, hints: 0, clearedAt: 5 },
          3: { stars: 2 },
          4: 'bad-record',
        },
        collected: ['a', 'a', 5, 'b'],
        settings: { sound: false, reducedMotion: 'yes' },
        seenChapters: [1, 1, '2', 'x', 2.5],
        tutorialSeen: 'true',
      }),
    );
    const save = loadProgress();
    expect(save.levels['1'].stars).toBe(3);
    expect(save.levels['2']).toBeUndefined();
    expect(save.levels['3']).toMatchObject({ stars: 2, mistakes: 0, hints: 0 });
    expect(save.levels['4']).toBeUndefined();
    expect(save.collected).toEqual(['a', 'b']);
    expect(save.settings).toEqual({ sound: false, reducedMotion: false });
    expect(save.seenChapters).toEqual([1, 2]);
    expect(save.tutorialSeen).toBe(false);
  });

  it('localStorage 寫入失敗（quota）不會拋錯', () => {
    vi.stubGlobal('localStorage', {
      ...createStorage(),
      setItem() {
        throw new Error('QuotaExceededError');
      },
    });
    expect(() => saveProgress(defaultSave())).not.toThrow();
  });

  it('冇 localStorage 環境（SSR／node）安全回退', () => {
    vi.stubGlobal('localStorage', undefined);
    expect(loadProgress()).toEqual(defaultSave());
    expect(() => saveProgress(defaultSave())).not.toThrow();
  });
});

/* ------------------------------------------------------------------ */
describe('resetProgress', () => {
  it('清除 localStorage 並回傳預設值', () => {
    const save = defaultSave();
    recordLevelClear(save, 1, 3, 0, 0, ['x']);
    expect(localStorage.getItem(SAVE_KEY)).not.toBeNull();
    const fresh = resetProgress();
    expect(fresh).toEqual(defaultSave());
    expect(localStorage.getItem(SAVE_KEY)).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
describe('解鎖與下一關', () => {
  it('Level 1 永遠解鎖；Level N 需要 N-1 通關', () => {
    const save = defaultSave();
    expect(isLevelUnlocked(save, 1)).toBe(true);
    expect(isLevelUnlocked(save, 2)).toBe(false);
    expect(isLevelUnlocked(save, 100)).toBe(false);

    save.levels['1'] = { stars: 1, mistakes: 3, hints: 2, clearedAt: 1 };
    expect(isLevelUnlocked(save, 2)).toBe(true);
    expect(isLevelUnlocked(save, 3)).toBe(false);
  });

  it('nextPlayableLevel：無進度→1；清幾關→下一關；全清→最後一關', () => {
    const save = defaultSave();
    expect(nextPlayableLevel(save, 100)).toBe(1);
    expect(nextPlayableLevel(save, 0)).toBe(1);
    recordLevelClear(save, 1, 3, 0, 0);
    expect(nextPlayableLevel(save, 100)).toBe(2);
    recordLevelClear(save, 2, 2, 1, 0);
    recordLevelClear(save, 3, 1, 1, 1);
    expect(nextPlayableLevel(save, 100)).toBe(4);
    for (let id = 4; id <= 100; id += 1) recordLevelClear(save, id, 3, 0, 0);
    expect(nextPlayableLevel(save, 100)).toBe(100);
  });
});

/* ------------------------------------------------------------------ */
describe('recordLevelClear', () => {
  it('記錄過關、自動儲存、收集成語、回傳同一 save', () => {
    const save = defaultSave();
    const result = recordLevelClear(save, 1, 3, 0, 0, ['a', 'b']);
    expect(result).toBe(save);
    expect(save.levels['1']).toMatchObject({ stars: 3, mistakes: 0, hints: 0 });
    expect(typeof save.levels['1'].clearedAt).toBe('number');
    expect(save.collected).toEqual(['a', 'b']);
    const reloaded = loadProgress();
    expect(reloaded.levels['1'].stars).toBe(3);
    expect(reloaded.collected).toEqual(['a', 'b']);
  });

  it('重玩保留最高星、最少錯誤／提示次數', () => {
    const save = defaultSave();
    recordLevelClear(save, 1, 1, 5, 3, []);
    recordLevelClear(save, 1, 3, 0, 1, []);
    expect(save.levels['1']).toMatchObject({ stars: 3, mistakes: 0, hints: 1 });
    // 較差成績唔會蓋過好成績
    recordLevelClear(save, 1, 2, 4, 2, []);
    expect(save.levels['1'].stars).toBe(3);
    expect(save.levels['1'].mistakes).toBe(0);
    expect(save.levels['1'].hints).toBe(1);
  });

  it('星級輸入 clamp 1–3、收集成語去重', () => {
    const save = defaultSave();
    recordLevelClear(save, 1, 9, 0, 0, ['a', 'a', 'b']);
    recordLevelClear(save, 2, 0, 0, 0, ['b', 'c']);
    expect(save.levels['1'].stars).toBe(3);
    expect(save.levels['2'].stars).toBe(1);
    expect(new Set(save.collected)).toEqual(new Set(['a', 'b', 'c']));
    expect(save.collected).toHaveLength(3);
  });
});

/* ------------------------------------------------------------------ */
describe('統計與查詢', () => {
  it('totalStars / clearedCount / clearedRecord', () => {
    const save = defaultSave();
    expect(totalStars(save)).toBe(0);
    expect(clearedCount(save)).toBe(0);
    expect(clearedRecord(save, 1)).toBeUndefined();
    save.levels['1'] = { stars: 3, mistakes: 0, hints: 0, clearedAt: 1 };
    save.levels['2'] = { stars: 2, mistakes: 1, hints: 0, clearedAt: 1 };
    expect(totalStars(save)).toBe(5);
    expect(clearedCount(save)).toBe(2);
    expect(clearedRecord(save, 2)?.stars).toBe(2);
  });

  it('collectIdioms 去重', () => {
    const save = defaultSave();
    collectIdioms(save, ['a', 'b']);
    collectIdioms(save, ['b', 'c']);
    expect(save.collected).toEqual(['a', 'b', 'c']);
  });
});

/* ------------------------------------------------------------------ */
describe('設定、章節、教學', () => {
  it('updateSettings 部分更新並持久化', () => {
    const save = defaultSave();
    updateSettings(save, { sound: false });
    expect(save.settings).toEqual({ sound: false, reducedMotion: false });
    expect(loadProgress().settings).toEqual({ sound: false, reducedMotion: false });
    updateSettings(save, { reducedMotion: true });
    expect(save.settings).toEqual({ sound: false, reducedMotion: true });
    expect(loadProgress().settings).toEqual({ sound: false, reducedMotion: true });
  });

  it('markChapterSeen 冪等並持久化', () => {
    const save = defaultSave();
    markChapterSeen(save, 1);
    markChapterSeen(save, 1);
    markChapterSeen(save, 2);
    expect(save.seenChapters).toEqual([1, 2]);
    expect(loadProgress().seenChapters).toEqual([1, 2]);
  });

  it('markTutorialSeen 冪等並持久化', () => {
    const save = defaultSave();
    markTutorialSeen(save);
    markTutorialSeen(save);
    expect(save.tutorialSeen).toBe(true);
    expect(loadProgress().tutorialSeen).toBe(true);
  });
});
