/**
 * 單元測試共用資料工具。
 * 注意：呢個唔係 *.test.ts，Vitest 唔會當成測試檔；只係測試之間共用嘅純函數。
 */
import type { Idiom, Level, Slot } from '../../src/core/types';

/** CJK 基本區＋擴充 A 單字 */
export const D_HAN = /[\u3400-\u4dbf\u4e00-\u9fff]/u;
export const HAN_ONLY = /^[\u3400-\u4dbf\u4e00-\u9fff]$/u;

export const isHan = (value: unknown): boolean =>
  typeof value === 'string' && HAN_ONLY.test(value);

export const cjkCount = (value: unknown): number =>
  Array.from(String(value ?? '')).filter((ch) => D_HAN.test(ch)).length;

export const mean = (list: number[]): number =>
  list.length === 0 ? 0 : list.reduce((sum, value) => sum + value, 0) / list.length;

/** Pearson 相關係數；樣本變異為 0 時回傳 0 */
export function pearson(xs: number[], ys: number[]): number {
  const mx = mean(xs);
  const my = mean(ys);
  let numerator = 0;
  let varX = 0;
  let varY = 0;
  for (let index = 0; index < xs.length; index += 1) {
    const dx = xs[index] - mx;
    const dy = ys[index] - my;
    numerator += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  if (varX === 0 || varY === 0) return 0;
  return numerator / Math.sqrt(varX * varY);
}

export const keyOf = (r: number, c: number): string => `${r}:${c}`;
export const chapterOf = (id: number): number => Math.floor((id - 1) / 10) + 1;
export const difficultyOf = (id: number): number => (id - 1) / 99;
export const isChainLevel = (id: number): boolean => id >= 11 && id % 5 === 0;
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** 一個 slot 的 4 個格 key（依成語字序） */
export function slotCellKeys(slot: Slot): string[] {
  const keys: string[] = [];
  for (let index = 0; index < 4; index += 1) {
    keys.push(
      slot.dir === 'h' ? keyOf(slot.row, slot.col + index) : keyOf(slot.row + index, slot.col),
    );
  }
  return keys;
}

/** 解答格 map（獨立於 core/puzzle 實作，用嚟交叉比對） */
export function solutionMapOf(level: Level): Map<string, string> {
  const map = new Map<string, string>();
  for (const cell of level.cells) map.set(keyOf(cell.r, cell.c), cell.char);
  return map;
}

/** 需要玩家填嘅格（去重；交叉空格只算一格） */
export function uniqueBlankKeys(level: Level): string[] {
  const keys = new Set<string>();
  for (const slot of level.slots) {
    const all = slotCellKeys(slot);
    for (const index of slot.blanks) keys.add(all[index]);
  }
  return [...keys];
}

export interface LevelStat {
  id: number;
  chapter: number;
  mode: Level['mode'];
  idiomCount: number;
  blankCount: number;
  blankRatio: number;
  bankSize: number;
  decoyCount: number;
  hintLimit: number;
  tiers: number[];
  avgTier: number;
  chainLength: number;
}

/** 由關卡資料計出難度統計（與 docs/PLAN.md §4.4 定義一致） */
export function levelStats(level: Level, idiomById: Map<string, Idiom>): LevelStat {
  const blankCount = uniqueBlankKeys(level).length;
  const totalChars = level.slots.length * 4;
  const tiers = level.slots.map((slot) => idiomById.get(slot.idiomId)?.tier ?? 0);
  return {
    id: level.id,
    chapter: level.chapter,
    mode: level.mode,
    idiomCount: level.slots.length,
    blankCount,
    blankRatio: totalChars === 0 ? 0 : blankCount / totalChars,
    bankSize: level.bank.length,
    decoyCount: level.bank.length - blankCount,
    hintLimit: level.hintLimit,
    tiers,
    avgTier: mean(tiers),
    chainLength: level.mode === 'chain' ? level.slots.length : 0,
  };
}

/** 收集問題字串，方便一次過報告所有資料錯誤 */
export function collectIssues(items: ArrayLike<unknown>, check: (item: unknown) => string | null): string[] {
  const issues: string[] = [];
  for (let index = 0; index < items.length; index += 1) {
    const issue = check(items[index]);
    if (issue) issues.push(issue);
  }
  return issues;
}
