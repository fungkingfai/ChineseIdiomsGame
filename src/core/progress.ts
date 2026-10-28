import type { LevelRecord, SaveData, Settings } from './types';

export const SAVE_KEY = 'cat-idioms-save-v1';
export const SAVE_VERSION = 1;

export function defaultSave(): SaveData {
  return {
    version: SAVE_VERSION,
    levels: {},
    collected: [],
    settings: { sound: true, reducedMotion: false },
    seenChapters: [],
    tutorialSeen: false,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** 由 localStorage 讀取存檔；資料異常時安全回退。 */
export function loadProgress(): SaveData {
  const base = defaultSave();
  try {
    if (typeof localStorage === 'undefined') return base;
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return base;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== SAVE_VERSION) return base;
    const levels: Record<string, LevelRecord> = {};
    if (isRecord(parsed.levels)) {
      for (const [key, value] of Object.entries(parsed.levels)) {
        if (!isRecord(value)) continue;
        const stars = Number(value.stars);
        if (!Number.isFinite(stars) || stars <= 0) continue;
        levels[key] = {
          stars: Math.min(3, Math.max(1, Math.round(stars))),
          mistakes: Number(value.mistakes) || 0,
          hints: Number(value.hints) || 0,
          clearedAt: Number(value.clearedAt) || Date.now(),
        };
      }
    }
    const settingsRaw = isRecord(parsed.settings) ? parsed.settings : {};
    const settings: Settings = {
      sound: settingsRaw.sound !== false,
      reducedMotion: settingsRaw.reducedMotion === true,
    };
    const collected = Array.isArray(parsed.collected)
      ? parsed.collected.filter((v): v is string => typeof v === 'string')
      : [];
    const seenChapters = Array.isArray(parsed.seenChapters)
      ? parsed.seenChapters.map(Number).filter((n) => Number.isInteger(n))
      : [];
    return {
      version: SAVE_VERSION,
      levels,
      collected: [...new Set(collected)],
      settings,
      seenChapters: [...new Set(seenChapters)],
      tutorialSeen: parsed.tutorialSeen === true,
    };
  } catch {
    return base;
  }
}

/** 寫入 localStorage；私密瀏覽／容量不足時靜默失敗。 */
export function saveProgress(save: SaveData): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

export function resetProgress(): SaveData {
  try {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
  return defaultSave();
}

export function clearedRecord(save: SaveData, levelId: number): LevelRecord | undefined {
  return save.levels[String(levelId)];
}

export function isLevelUnlocked(save: SaveData, levelId: number): boolean {
  if (levelId <= 1) return true;
  return (clearedRecord(save, levelId - 1)?.stars ?? 0) > 0;
}

/** 下一個可以玩的關卡：最大已解鎖關卡（全部清關時為最後一關） */
export function nextPlayableLevel(save: SaveData, totalLevels: number): number {
  if (totalLevels <= 0) return 1;
  let level = 1;
  for (let i = 1; i <= totalLevels; i += 1) {
    if (isLevelUnlocked(save, i)) level = i;
    else break;
  }
  return level;
}

export function totalStars(save: SaveData): number {
  return Object.values(save.levels).reduce((sum, record) => sum + record.stars, 0);
}

export function clearedCount(save: SaveData): number {
  return Object.values(save.levels).filter((record) => record.stars > 0).length;
}

/** 記錄過關（保留最靚成績），並立即寫入儲存。 */
export function recordLevelClear(
  save: SaveData,
  levelId: number,
  stars: number,
  mistakes: number,
  hints: number,
  idiomIds: string[] = [],
): SaveData {
  const key = String(levelId);
  const previous = save.levels[key];
  const nextStars = Math.min(3, Math.max(1, Math.round(stars)));
  save.levels[key] = {
    stars: previous ? Math.max(previous.stars, nextStars) : nextStars,
    mistakes: previous ? Math.min(previous.mistakes, mistakes) : mistakes,
    hints: previous ? Math.min(previous.hints, hints) : hints,
    clearedAt: Date.now(),
  };
  collectIdioms(save, idiomIds);
  saveProgress(save);
  return save;
}

export function collectIdioms(save: SaveData, idiomIds: string[]): SaveData {
  const set = new Set(save.collected);
  for (const id of idiomIds) set.add(id);
  save.collected = [...set];
  return save;
}

export function updateSettings(save: SaveData, patch: Partial<Settings>): SaveData {
  save.settings = { ...save.settings, ...patch };
  saveProgress(save);
  return save;
}

export function markChapterSeen(save: SaveData, chapterId: number): SaveData {
  if (!save.seenChapters.includes(chapterId)) {
    save.seenChapters.push(chapterId);
    saveProgress(save);
  }
  return save;
}

export function markTutorialSeen(save: SaveData): SaveData {
  if (!save.tutorialSeen) {
    save.tutorialSeen = true;
    saveProgress(save);
  }
  return save;
}
