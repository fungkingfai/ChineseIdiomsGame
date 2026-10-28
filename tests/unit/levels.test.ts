/**
 * 關卡資料驗證（src/data/levels.json）＋ 全關卡可解性模擬。
 * 規格：docs/PLAN.md §4／§5.3、docs/GAME_DESIGN.md §10、docs/LEVEL_DESIGN.md。
 * 資料未定稿（interim）時，成語組合重複／chain fallback 等項目會 FAIL，屬預期。
 */
import { describe, expect, it } from 'vitest';
import {
  TOTAL_LEVELS,
  chapters,
  getChapter,
  getChapterForLevel,
  getIdiom,
  getLevel,
  idiomById as dataIdiomById,
  idioms,
  levels,
  levelsByChapter,
} from '../../src/data/index';
import { createGame, getStars, isSolved, placeChar, solutionMap } from '../../src/core/puzzle';
import type { GameEvent, Idiom, Level } from '../../src/core/types';
import {
  chapterOf,
  clamp,
  cjkCount,
  difficultyOf,
  isChainLevel,
  keyOf,
  levelStats,
  mean,
  pearson,
  slotCellKeys,
  solutionMapOf,
  uniqueBlankKeys,
} from './data-helpers';

/* ------------------------------------------------------------------ */
/* 設計常數（docs/GAME_DESIGN.md §10）                                  */
/* ------------------------------------------------------------------ */
const TOTAL_LEVELS_EXPECTED = 100;
const CHAPTER_COUNT = 10;
const LEVELS_PER_CHAPTER = 10;
const CHAPTER_SCENES = [
  'garden',
  'bamboo',
  'moon',
  'snow',
  'sea',
  'stars',
  'festival',
  'rain',
  'cloud',
  'summit',
];
const HINTS_BY_CHAPTER = [3, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const DECOYS_BY_CHAPTER = [0, 1, 1, 2, 3, 3, 4, 5, 5, 6];
const BLANK_RATIO_START = 0.3;
const BLANK_RATIO_END = 0.65;
const MIN_FILL_WORDS = 2;
const MAX_FILL_WORDS = 4;
const MIN_CHAIN_WORDS = 3;
const MAX_CHAIN_WORDS = 6;

const idiomMap = new Map<string, Idiom>(idioms.map((idiom) => [idiom.id, idiom]));
const levelById = new Map<number, Level>(levels.map((level) => [level.id, level]));
const stats = levels.map((level) => levelStats(level, idiomMap));
const isHan = (char: string): boolean => /^[\u3400-\u4dbf\u4e00-\u9fff]$/u.test(char);

const fillWordCount = (id: number): number =>
  Math.min(MAX_FILL_WORDS, MIN_FILL_WORDS + Math.round(2 * difficultyOf(id)));
const chainWordCount = (id: number): number =>
  Math.min(MAX_CHAIN_WORDS, MIN_CHAIN_WORDS + Math.round(3 * difficultyOf(id)));
const targetBlankCount = (level: Level): number => {
  const ratio = BLANK_RATIO_START + (BLANK_RATIO_END - BLANK_RATIO_START) * difficultyOf(level.id);
  const totalChars = level.slots.length * 4;
  if (level.mode === 'chain') {
    return clamp(
      Math.round(ratio * totalChars),
      Math.max(2, level.slots.length - 1),
      2 * level.slots.length - 1,
    );
  }
  return clamp(Math.round(ratio * totalChars), 1, 3 * level.slots.length);
};

/* ------------------------------------------------------------------ */
/* 0. 資料 API                                                         */
/* ------------------------------------------------------------------ */
describe('資料 API（src/data/index）', () => {
  it('TOTAL_LEVELS 為 100、levels／idioms／chapters 有載入', () => {
    expect(TOTAL_LEVELS).toBe(TOTAL_LEVELS_EXPECTED);
    expect(levels).toHaveLength(TOTAL_LEVELS_EXPECTED);
    expect(idioms.length).toBeGreaterThan(0);
    expect(chapters).toHaveLength(CHAPTER_COUNT);
  });

  it('getLevel／getIdiom／getChapter／getChapterForLevel 正常', () => {
    expect(getLevel(1)?.id).toBe(1);
    expect(getLevel(100)?.id).toBe(100);
    expect(getLevel(101)).toBeUndefined();
    const firstIdiom = idioms[0];
    expect(getIdiom(firstIdiom.id)?.word).toBe(firstIdiom.word);
    expect(getIdiom('not-an-idiom')).toBeUndefined();
    expect(getChapter(1)?.scene).toBe('garden');
    expect(getChapter(10)?.scene).toBe('summit');
    expect(getChapterForLevel(15)?.id).toBe(2);
  });

  it('levelsByChapter 每章 10 關', () => {
    const grouped = levelsByChapter();
    expect(grouped.size).toBe(CHAPTER_COUNT);
    for (const chapter of chapters) {
      expect(grouped.get(chapter.id), `第 ${chapter.id} 章未分組`).toHaveLength(LEVELS_PER_CHAPTER);
    }
    // idiomById map 大小等於 idioms 數量（id 唯一）
    expect(dataIdiomById.size).toBe(idioms.length);
  });
});

/* ------------------------------------------------------------------ */
/* 1. 章節資料                                                         */
/* ------------------------------------------------------------------ */
describe('章節資料（chapters.json）', () => {
  it('10 章、id 1–10 連續、scene key 正確且不重複', () => {
    expect(chapters).toHaveLength(CHAPTER_COUNT);
    const issues: string[] = [];
    const scenes = new Set<string>();
    chapters.forEach((chapter, index) => {
      if (chapter.id !== index + 1) issues.push(`第 ${index + 1} 章 id 應為 ${index + 1}，實際 ${chapter.id}`);
      if (chapter.scene !== CHAPTER_SCENES[index]) {
        issues.push(`第 ${chapter.id} 章 scene 應為 ${CHAPTER_SCENES[index]}，實際 ${chapter.scene}`);
      }
      if (scenes.has(chapter.scene)) issues.push(`scene key 重複：${chapter.scene}`);
      scenes.add(chapter.scene);
      if (cjkCount(chapter.name) < 2) issues.push(`第 ${chapter.id} 章名稱太短`);
      if (cjkCount(chapter.blurb) < 8) issues.push(`第 ${chapter.id} 章 blurb 太短`);
    });
    expect(issues, issues.join('\n')).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 2. 關卡基本結構                                                     */
/* ------------------------------------------------------------------ */
describe('關卡基本結構', () => {
  it('100 關、id 1–100 連續、chapter = ceil(id/10)', () => {
    expect(levels).toHaveLength(TOTAL_LEVELS_EXPECTED);
    const issues: string[] = [];
    levels.forEach((level, index) => {
      if (level.id !== index + 1) issues.push(`第 ${index + 1} 筆 id 應為 ${index + 1}，實際 ${level.id}`);
      if (level.chapter !== chapterOf(level.id)) {
        issues.push(`Level ${level.id} chapter=${level.chapter}，預期 ${chapterOf(level.id)}`);
      }
      if (!chapters.some((chapter) => chapter.id === level.chapter)) {
        issues.push(`Level ${level.id} 章節 ${level.chapter} 唔存在`);
      }
    });
    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('模式分佈：18 關 chain（id>=11 且 5 的倍數）、Level 1–10 全 fill', () => {
    const issues: string[] = [];
    let chainCount = 0;
    for (const level of levels) {
      const expected = isChainLevel(level.id) ? 'chain' : 'fill';
      if (level.mode !== expected) issues.push(`Level ${level.id} mode=${level.mode}，預期 ${expected}`);
      if (level.mode === 'chain') chainCount += 1;
    }
    if (chainCount !== 18) issues.push(`chain 關應有 18 關，實際 ${chainCount} 關`);
    for (let id = 1; id <= LEVELS_PER_CHAPTER; id += 1) {
      if (levelById.get(id)?.mode !== 'fill') issues.push(`Level ${id} 教學期必須係 fill`);
    }
    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('每關至少 2 個成語，fill 2–4、chain 3–6', () => {
    const issues: string[] = [];
    for (const level of levels) {
      if (!Array.isArray(level.slots) || level.slots.length < 2) {
        issues.push(`Level ${level.id} 成語數少於 2`);
        continue;
      }
      if (level.mode === 'fill' && (level.slots.length < MIN_FILL_WORDS || level.slots.length > MAX_FILL_WORDS)) {
        issues.push(`Level ${level.id} fill 成語數 ${level.slots.length} 唔喺 2–4`);
      }
      if (level.mode === 'chain' && (level.slots.length < MIN_CHAIN_WORDS || level.slots.length > MAX_CHAIN_WORDS)) {
        issues.push(`Level ${level.id} chain 成語數 ${level.slots.length} 唔喺 3–6`);
      }
    }
    expect(issues, issues.join('\n')).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 3. 幾何一致性                                                       */
/* ------------------------------------------------------------------ */
describe('棋盤幾何', () => {
  it('cells 唯一、單一漢字、rows/cols 等於實際範圍、無遊離格', () => {
    const issues: string[] = [];
    for (const level of levels) {
      if (!Array.isArray(level.cells) || level.cells.length === 0) {
        issues.push(`Level ${level.id} 冇任何格`);
        continue;
      }
      if (!Number.isInteger(level.rows) || level.rows <= 0 || !Number.isInteger(level.cols) || level.cols <= 0) {
        issues.push(`Level ${level.id} rows/cols 非法`);
        continue;
      }
      const keys = new Set<string>();
      let maxRow = -1;
      let maxCol = -1;
      let badCell = false;
      for (const cell of level.cells) {
        if (!Number.isInteger(cell.r) || !Number.isInteger(cell.c) || cell.r < 0 || cell.c < 0) {
          issues.push(`Level ${level.id} 有非法格座標 (${cell.r},${cell.c})`);
          badCell = true;
          continue;
        }
        if (!isHan(cell.char)) {
          issues.push(`Level ${level.id} 格字「${cell.char}」唔係單一漢字`);
          badCell = true;
          continue;
        }
        const key = keyOf(cell.r, cell.c);
        if (keys.has(key)) {
          issues.push(`Level ${level.id} 格 ${key} 重複`);
          badCell = true;
        }
        keys.add(key);
        maxRow = Math.max(maxRow, cell.r);
        maxCol = Math.max(maxCol, cell.c);
      }
      if (badCell) continue;
      if (level.rows !== maxRow + 1 || level.cols !== maxCol + 1) {
        issues.push(
          `Level ${level.id} rows/cols=${level.rows}x${level.cols}，實際格範圍 ${maxRow + 1}x${maxCol + 1}`,
        );
      }
      if (level.mode === 'chain') {
        if (level.rows !== level.slots.length || level.cols !== 4) {
          issues.push(`Level ${level.id} chain 盤面必須 rows=成語數、cols=4`);
        }
      }
      // slot 格全部要喺 cells；cells 唔可以有遊離格
      const union = new Set<string>();
      for (const slot of level.slots) {
        for (const key of slotCellKeys(slot)) {
          union.add(key);
          if (!keys.has(key)) issues.push(`Level ${level.id} slot 格 ${key} 唔喺 cells`);
        }
      }
      if (union.size !== keys.size) {
        issues.push(`Level ${level.id} 有 ${keys.size - union.size} 個遊離格`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('成語交叉／接龍：答案字一致、fill 交叉、chain 首尾相接', () => {
    const issues: string[] = [];
    for (const level of levels) {
      if (level.mode === 'fill') {
        const solution = solutionMapOf(level);
        const seen = new Set<string>();
        level.slots.forEach((slot, slotIndex) => {
          const idiom = idiomMap.get(slot.idiomId);
          if (!idiom) {
            issues.push(`Level ${level.id} idiomId ${slot.idiomId} 唔存在`);
            return;
          }
          const keys = slotCellKeys(slot);
          keys.forEach((key, charIndex) => {
            if (solution.get(key) !== idiom.word[charIndex]) {
              issues.push(
                `Level ${level.id} slot ${slotIndex}（${idiom.word}）格 ${key} 答案字「${solution.get(key)}」≠「${idiom.word[charIndex]}」`,
              );
            }
          });
          let overlap = 0;
          for (const key of keys) if (seen.has(key)) overlap += 1;
          if (slotIndex > 0 && overlap < 1) {
            issues.push(`Level ${level.id} 第 ${slotIndex + 1} 個成語（${idiom.word}）冇同前面成語交叉`);
          }
          for (const key of keys) seen.add(key);
        });
      } else {
        const solution = solutionMapOf(level);
        level.slots.forEach((slot, index) => {
          const idiom = idiomMap.get(slot.idiomId);
          if (!idiom) {
            issues.push(`Level ${level.id} idiomId ${slot.idiomId} 唔存在`);
            return;
          }
          if (slot.row !== index || slot.col !== 0 || slot.dir !== 'h') {
            issues.push(`Level ${level.id} chain slot ${index} 位置／方向唔啱`);
          }
          slotCellKeys(slot).forEach((key, charIndex) => {
            if (solution.get(key) !== idiom.word[charIndex]) {
              issues.push(`Level ${level.id} chain slot ${index}（${idiom.word}）格 ${key} 答案字唔一致`);
            }
          });
          if (index > 0) {
            const previous = idiomMap.get(level.slots[index - 1].idiomId);
            if (previous && previous.word[3] !== idiom.word[0]) {
              issues.push(
                `Level ${level.id} 接龍斷鏈：${previous.word} → ${idiom.word}（${previous.word[3]} ≠ ${idiom.word[0]}）`,
              );
            }
          }
        });
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 4. blanks / bank                                                    */
/* ------------------------------------------------------------------ */
describe('空格與字庫', () => {
  it('blanks 合法（排序、不重複、0–3；fill 1–3；chain 連接位保留）', () => {
    const issues: string[] = [];
    for (const level of levels) {
      level.slots.forEach((slot, slotIndex) => {
        if (!Array.isArray(slot.blanks)) {
          issues.push(`Level ${level.id} slot ${slotIndex} blanks 唔係 array`);
          return;
        }
        const unique = new Set(slot.blanks);
        if (unique.size !== slot.blanks.length) issues.push(`Level ${level.id} slot ${slotIndex} blanks 有重複`);
        for (const index of slot.blanks) {
          if (!Number.isInteger(index) || index < 0 || index > 3) {
            issues.push(`Level ${level.id} slot ${slotIndex} blank index ${index} 非法`);
          }
        }
        if ([...slot.blanks].sort((a, b) => a - b).join(',') !== slot.blanks.join(',')) {
          issues.push(`Level ${level.id} slot ${slotIndex} blanks 未排序`);
        }
        if (level.mode === 'fill') {
          if (slot.blanks.length < 1 || slot.blanks.length > 3) {
            issues.push(`Level ${level.id} fill slot ${slotIndex} 空格數 ${slot.blanks.length} 唔喺 1–3`);
          }
        } else {
          if (slotIndex === 0 && slot.blanks.length !== 0) {
            issues.push(`Level ${level.id} chain row0 必須全顯示（blanks=[]）`);
          }
          if (slotIndex > 0) {
            if (slot.blanks.length < 1) issues.push(`Level ${level.id} chain row${slotIndex} 必須至少一個空格`);
            if (slot.blanks.includes(0)) issues.push(`Level ${level.id} chain row${slotIndex} 首字必須顯示`);
          }
          if (slotIndex < level.slots.length - 1 && slot.blanks.includes(3)) {
            issues.push(`Level ${level.id} chain row${slotIndex} 尾字必須顯示`);
          }
        }
      });
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('bank multiset 足夠、誘餌字數量符合曲線、誘餌唔等於答案字', () => {
    const issues: string[] = [];
    for (const level of levels) {
      const solution = solutionMap(level);
      const blankKeys = uniqueBlankKeys(level);
      const need = new Map<string, number>();
      for (const key of blankKeys) {
        const char = solution.get(key);
        if (!char) {
          issues.push(`Level ${level.id} 空格 ${key} 冇解答字`);
          continue;
        }
        need.set(char, (need.get(char) ?? 0) + 1);
      }
      const have = new Map<string, number>();
      for (const char of level.bank) {
        if (!isHan(char)) {
          issues.push(`Level ${level.id} 字庫「${char}」唔係單一漢字`);
          continue;
        }
        have.set(char, (have.get(char) ?? 0) + 1);
      }
      for (const [char, count] of need) {
        if ((have.get(char) ?? 0) < count) {
          issues.push(`Level ${level.id} 字庫唔夠「${char}」（需要 ${count}，得 ${have.get(char) ?? 0}）`);
        }
      }
      if (level.bank.length < blankKeys.length) {
        issues.push(`Level ${level.id} 字庫總數 ${level.bank.length} 少過空格數 ${blankKeys.length}`);
      }
      // 誘餌字 = 字庫多出嚟嘅卡；每章數量固定（docs/GAME_DESIGN §10.1）
      const expectedDecoys = DECOYS_BY_CHAPTER[level.chapter - 1];
      const decoyCount = level.bank.length - blankKeys.length;
      if (decoyCount !== expectedDecoys) {
        issues.push(`Level ${level.id} 誘餌字 ${decoyCount} 張，第 ${level.chapter} 章應為 ${expectedDecoys} 張`);
      }
      let realDecoys = 0;
      for (const [char, count] of have) {
        if ((need.get(char) ?? 0) === 0) realDecoys += count;
      }
      if (realDecoys !== decoyCount) {
        issues.push(`Level ${level.id} 有誘餌字同空格答案字相同（誘餌 ${realDecoys}/${decoyCount}）`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('hintLimit 1–3、每章符合曲線', () => {
    const issues: string[] = [];
    for (const level of levels) {
      if (!Number.isInteger(level.hintLimit) || level.hintLimit < 1 || level.hintLimit > 3) {
        issues.push(`Level ${level.id} hintLimit ${level.hintLimit} 唔喺 1–3`);
        continue;
      }
      const expected = HINTS_BY_CHAPTER[level.chapter - 1];
      if (level.hintLimit !== expected) {
        issues.push(`Level ${level.id} hintLimit=${level.hintLimit}，第 ${level.chapter} 章應為 ${expected}`);
      }
    }
    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('成語數、空格數符合難度公式；每關有 tier ≤ 2 錨', () => {
    const issues: string[] = [];
    for (const level of levels) {
      const stat = levelStats(level, idiomMap);
      if (level.mode === 'fill') {
        const expectedWords = fillWordCount(level.id);
        if (level.slots.length !== expectedWords) {
          issues.push(`Level ${level.id} fill 成語數 ${level.slots.length}，公式預期 ${expectedWords}`);
        }
      } else if (level.slots.length !== chainWordCount(level.id)) {
        issues.push(
          `Level ${level.id} chain 成語數 ${level.slots.length}，公式預期 ${chainWordCount(level.id)}（資料不足 fallback 會令此項 FAIL）`,
        );
      }
      const target = targetBlankCount(level);
      const tolerance = level.mode === 'fill' ? 1 : 0;
      if (Math.abs(stat.blankCount - target) > tolerance) {
        issues.push(`Level ${level.id} 空格數 ${stat.blankCount}，公式預期 ${target}（±${tolerance}）`);
      }
      if (stat.tiers.some((tier) => tier < 1 || tier > 5)) {
        issues.push(`Level ${level.id} 有成語 tier 非法`);
      } else if (Math.min(...stat.tiers) > 2) {
        issues.push(`Level ${level.id} 冇 tier ≤ 2 錨（tiers=${stat.tiers.join(',')}）`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 5. 標題／故事／唯一性                                               */
/* ------------------------------------------------------------------ */
describe('內容品質', () => {
  it('標題全站唯一、標題／故事為繁中、無穿橋提及答案成語', () => {
    const issues: string[] = [];
    const titles = new Set<string>();
    for (const level of levels) {
      if (typeof level.title !== 'string' || cjkCount(level.title) < 4) {
        issues.push(`Level ${level.id} 缺少繁中標題`);
        continue;
      }
      if (!level.title.includes('課')) issues.push(`Level ${level.id} 標題格式怪：${level.title}`);
      if (titles.has(level.title)) issues.push(`關卡標題重複：${level.title}`);
      titles.add(level.title);
      const storyLength = cjkCount(level.story);
      if (storyLength < 12 || storyLength > 160) {
        issues.push(`Level ${level.id} story 漢字數 ${storyLength} 唔合理`);
      }
      const text = `${level.title}\n${level.story}`;
      for (const slot of level.slots) {
        const idiom = idiomMap.get(slot.idiomId);
        if (idiom && text.includes(idiom.word)) {
          issues.push(`Level ${level.id} 標題／故事穿橋提及「${idiom.word}」`);
        }
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('100 關唯一（完整內容＋成語組合）', () => {
    const full = new Map<string, number>();
    const compositions = new Map<string, number>();
    const issues: string[] = [];
    for (const level of levels) {
      const fullSignature = `${level.mode}|${JSON.stringify(level)}`;
      const compositionSignature = `${level.mode}|${level.slots
        .map((slot) => slot.idiomId)
        .sort()
        .join(',')}`;
      if (full.has(fullSignature)) issues.push(`Level ${level.id} 同 Level ${full.get(fullSignature)} 完全相同`);
      if (compositions.has(compositionSignature)) {
        issues.push(
          `Level ${level.id} 成語組合同 Level ${compositions.get(compositionSignature)} 重複（${compositionSignature}）`,
        );
      }
      full.set(fullSignature, level.id);
      compositions.set(compositionSignature, level.id);
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 6. 難度趨勢                                                         */
/* ------------------------------------------------------------------ */
describe('難度趨勢', () => {
  const byChapter = CHAPTER_SCENES.map((_, index) => stats.filter((item) => item.chapter === index + 1));

  it('章節平均指標單調遞進（成語數↑、空格比例↑、tier↑、提示↓、誘餌↑）', () => {
    const issues: string[] = [];
    for (let index = 1; index < byChapter.length; index += 1) {
      const previous = byChapter[index - 1];
      const current = byChapter[index];
      const avg = (list: typeof previous, pick: (item: (typeof previous)[number]) => number): number =>
        mean(list.map(pick));
      if (avg(current, (item) => item.idiomCount) + 1e-9 < avg(previous, (item) => item.idiomCount)) {
        issues.push(`第 ${index + 1} 章平均成語數下降`);
      }
      if (avg(current, (item) => item.blankRatio) + 0.02 < avg(previous, (item) => item.blankRatio)) {
        issues.push(`第 ${index + 1} 章平均空格比例下降`);
      }
      if (avg(current, (item) => item.avgTier) + 0.2 < avg(previous, (item) => item.avgTier)) {
        issues.push(`第 ${index + 1} 章平均 tier 下降`);
      }
      if (avg(current, (item) => item.decoyCount) + 1e-9 < avg(previous, (item) => item.decoyCount)) {
        issues.push(`第 ${index + 1} 章誘餌字數下降`);
      }
      if (Math.max(...current.map((item) => item.hintLimit)) > Math.max(...previous.map((item) => item.hintLimit))) {
        issues.push(`第 ${index + 1} 章提示次數上升`);
      }
    }
    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('逐關難度相關性：r(空格比例)、r(成語數)、r(平均 tier) 均 ≥ 0.6', () => {
    const difficulties = stats.map((item) => difficultyOf(item.id));
    const correlations = {
      blankRatio: pearson(difficulties, stats.map((item) => item.blankRatio)),
      idioms: pearson(difficulties, stats.map((item) => item.idiomCount)),
      tier: pearson(difficulties, stats.map((item) => item.avgTier)),
    };
    const issues: string[] = [];
    if (correlations.blankRatio < 0.6) issues.push(`空格比例 r=${correlations.blankRatio.toFixed(2)} < 0.6`);
    if (correlations.idioms < 0.6) issues.push(`成語數 r=${correlations.idioms.toFixed(2)} < 0.6`);
    if (correlations.tier < 0.6) issues.push(`平均 tier r=${correlations.tier.toFixed(2)} < 0.6`);
    expect(
      issues,
      `難度相關性：空格比例 ${correlations.blankRatio.toFixed(2)}、成語數 ${correlations.idioms.toFixed(2)}、tier ${correlations.tier.toFixed(2)}`,
    ).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 7. 全關卡可解性模擬（用真正引擎）                                    */
/* ------------------------------------------------------------------ */
interface SolveResult {
  game: ReturnType<typeof createGame>;
  events: GameEvent[];
  blankKeys: string[];
}

function simulateSolve(level: Level): SolveResult {
  const game = createGame(level);
  const solution = solutionMap(level);
  const blankKeys = uniqueBlankKeys(level);
  const used = new Set<number>();
  const allocation = new Map<string, number>();
  for (const key of blankKeys) {
    const char = solution.get(key);
    expect(char, `Level ${level.id} 空格 ${key} 冇解答字`).toBeTruthy();
    const bankIndex = level.bank.findIndex((card, index) => card === char && !used.has(index));
    expect(
      bankIndex,
      `Level ${level.id} 字庫冇足夠「${char}」字卡（空格 ${key}）`,
    ).toBeGreaterThanOrEqual(0);
    used.add(bankIndex);
    allocation.set(key, bankIndex);
  }
  const events: GameEvent[] = [];
  for (const [key, bankIndex] of allocation) {
    events.push(...placeChar(game, key, level.bank[bankIndex], bankIndex));
  }
  return { game, events, blankKeys };
}

describe('全關卡可解性模擬（createGame → placeChar → isSolved）', () => {
  it('初始狀態：given 鎖定、空格未填、無空格開局成語自動鎖定（chain row0）', () => {
    const issues: string[] = [];
    for (const level of levels) {
      const game = createGame(level);
      const blanks = new Set(uniqueBlankKeys(level));
      for (const cell of level.cells) {
        const key = keyOf(cell.r, cell.c);
        const state = game.cells[key];
        if (!state) {
          issues.push(`Level ${level.id} 缺少格 ${key}`);
          continue;
        }
        if (blanks.has(key)) {
          if (state.locked || state.char !== '') issues.push(`Level ${level.id} 空格 ${key} 初始唔應該鎖定／有字`);
        } else if (!state.locked || state.char !== cell.char || state.source !== 'given') {
          issues.push(`Level ${level.id} given 格 ${key} 初始狀態唔啱`);
        }
      }
      if (game.mistakes !== 0 || game.hintsUsed !== 0 || game.solved || game.stars !== 0) {
        issues.push(`Level ${level.id} 初始計數器唔係 0`);
      }
      level.slots.forEach((slot, index) => {
        if (slot.blanks.length === 0 && !game.words[index].locked) {
          issues.push(`Level ${level.id} slot ${index} 冇空格但未自動鎖定`);
        }
        if (slot.blanks.length > 0 && game.words[index].locked) {
          issues.push(`Level ${level.id} slot ${index} 有空格但初始已鎖定`);
        }
      });
      if (level.mode === 'chain' && !game.words[0].locked) {
        issues.push(`Level ${level.id} chain row0 應該 auto locked`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('依解答填滿所有空格 → 每關 isSolved()=true、3 星、零錯誤', () => {
    const failures: string[] = [];
    let solvedCount = 0;
    for (const level of levels) {
      const { game, events, blankKeys } = simulateSolve(level);
      const wrong = events.filter((event) => event.type === 'word-wrong');
      const correct = events.filter((event) => event.type === 'word-correct');
      const solvedEvents = events.filter((event) => event.type === 'solved');
      const expectedCorrect = level.slots.filter((slot) => slot.blanks.length > 0).length;
      if (wrong.length > 0) failures.push(`Level ${level.id} 模擬填字出現 ${wrong.length} 次 word-wrong`);
      if (!isSolved(game)) failures.push(`Level ${level.id} 填滿正解後未 isSolved`);
      if (getStars(game) !== 3) failures.push(`Level ${level.id} 正解填滿應 3 星，實際 ${getStars(game)}`);
      if (game.mistakes !== 0) failures.push(`Level ${level.id} 模擬失誤數 ${game.mistakes}`);
      if (solvedEvents.length !== 1) failures.push(`Level ${level.id} solved 事件應為 1 次，實際 ${solvedEvents.length}`);
      if (correct.length !== expectedCorrect) {
        failures.push(`Level ${level.id} word-correct 事件 ${correct.length} 個，預期 ${expectedCorrect} 個`);
      }
      if (!game.words.every((word) => word.locked)) failures.push(`Level ${level.id} 仍有未鎖定成語`);
      // 每個空格都要被填到（正解 chars）
      for (const key of blankKeys) {
        if (game.cells[key]?.char !== solutionMap(level).get(key)) {
          failures.push(`Level ${level.id} 空格 ${key} 填字後答案唔一致`);
        }
      }
      solvedCount += 1;
    }
    expect(solvedCount).toBe(TOTAL_LEVELS_EXPECTED);
    expect(failures, failures.slice(0, 12).join('\n')).toEqual([]);
  });
});
