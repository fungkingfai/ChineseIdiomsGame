/**
 * 核心引擎（src/core/puzzle.ts）行為測試。
 * 用合成關卡精確控制答案，另加真實 chain 關卡驗證 row0 自動鎖定。
 */
import { describe, expect, it } from 'vitest';
import {
  blankKeySet,
  createGame,
  getStars,
  isSolved,
  keyOf,
  placeChar,
  removeChar,
  slotBlankKeys,
  slotCellKeys,
  solutionMap,
  starsFor,
  useHint,
} from '../../src/core/puzzle';
import { getLevel } from '../../src/data/index';
import type { GameState, Level, LevelCell, Slot } from '../../src/core/types';

/* ------------------------------------------------------------------ */
/* 合成關卡工具                                                        */
/* ------------------------------------------------------------------ */
const HAN = /[\u3400-\u4dbf\u4e00-\u9fff]/u;

function makeCells(rows: string[]): LevelCell[] {
  const cells: LevelCell[] = [];
  rows.forEach((row, r) => {
    Array.from(row).forEach((char, c) => {
      if (HAN.test(char)) cells.push({ r, c, char });
    });
  });
  return cells;
}

function makeLevel(options: {
  cells: LevelCell[];
  slots: Slot[];
  bank: string[];
  mode?: Level['mode'];
}): Level {
  const maxRow = Math.max(...options.cells.map((cell) => cell.r));
  const maxCol = Math.max(...options.cells.map((cell) => cell.c));
  return {
    id: 900,
    chapter: 1,
    mode: options.mode ?? 'fill',
    title: '測試關卡',
    story: '測試用關卡，唔會出現在正式資料。',
    rows: maxRow + 1,
    cols: maxCol + 1,
    cells: options.cells,
    slots: options.slots,
    bank: options.bank,
    hintLimit: 3,
  };
}

/** 兩句橫向成語，無交叉：一二三四／五六七八 */
function twoWordLevel(): Level {
  return makeLevel({
    cells: makeCells(['一二三四', '五六七八']),
    slots: [
      { idiomId: 'test-a', row: 0, col: 0, dir: 'h', blanks: [1, 2] },
      { idiomId: 'test-b', row: 1, col: 0, dir: 'h', blanks: [0, 3] },
    ],
    bank: ['二', '三', '五', '八', '甲', '乙'],
  });
}

function place(game: GameState, key: string, char: string, bankIndex: number): string[] {
  return placeChar(game, key, char, bankIndex).map((event) => event.type);
}

/** 用正解填滿整關（依 bank multiset 配字卡 index） */
function solveCorrectly(game: GameState): void {
  const level = game.level;
  const solution = solutionMap(level);
  const used = new Set<number>();
  for (const slot of level.slots) {
    for (const key of slotCellKeys(slot)) {
      const cell = game.cells[key];
      if (!cell || cell.locked || cell.char !== '') continue;
      const char = solution.get(key);
      if (!char) continue;
      const bankIndex = level.bank.findIndex((card, index) => card === char && !used.has(index));
      expect(bankIndex, `字庫冇「${char}」可用字卡`).toBeGreaterThanOrEqual(0);
      used.add(bankIndex);
      placeChar(game, key, char, bankIndex);
    }
  }
}

/* ------------------------------------------------------------------ */
describe('createGame 建立遊戲', () => {
  it('given 格鎖定、空格留空、計數器歸零', () => {
    const level = twoWordLevel();
    const game = createGame(level);

    expect(Object.keys(game.cells)).toHaveLength(8);
    expect(game.cells['0:0']).toMatchObject({ char: '一', locked: true, source: 'given' });
    expect(game.cells['0:1']).toMatchObject({ char: '', locked: false, source: 'word' });
    expect(game.cells['1:0']).toMatchObject({ char: '', locked: false });
    expect(game.cells['1:3']).toMatchObject({ char: '', locked: false });
    expect(game.mistakes).toBe(0);
    expect(game.hintsUsed).toBe(0);
    expect(game.solved).toBe(false);
    expect(game.stars).toBe(0);
    expect(isSolved(game)).toBe(false);
    expect(getStars(game)).toBe(0);
    expect(game.words).toHaveLength(2);
    expect(game.words[0].cells).toEqual(['0:0', '0:1', '0:2', '0:3']);
    expect(game.words.every((word) => !word.locked)).toBe(true);
  });

  it('冇空格嘅成語一開始就 locked（chain row0）', () => {
    const chainLevel = getLevel(15);
    expect(chainLevel?.mode).toBe('chain');
    if (!chainLevel) return;
    const game = createGame(chainLevel);
    expect(game.words[0].locked).toBe(true);
    expect(game.words[0].slot.blanks).toEqual([]);
    for (let index = 1; index < game.words.length; index += 1) {
      expect(game.words[index].locked).toBe(false);
    }
  });
});

/* ------------------------------------------------------------------ */
describe('placeChar / removeChar 基本操作', () => {
  it('放字事件、再退回字庫 index', () => {
    const game = createGame(twoWordLevel());
    const events = placeChar(game, '0:1', '二', 0);
    expect(events.map((event) => event.type)).toEqual(['place']);
    expect(game.cells['0:1']).toMatchObject({ char: '二', source: 'word', bankIndex: 0, locked: false });

    const removed = removeChar(game, '0:1');
    expect(removed).toBe(0);
    expect(game.cells['0:1']).toMatchObject({ char: '', source: 'word', locked: false });
    expect(game.cells['0:1'].bankIndex).toBeUndefined();
    expect(removeChar(game, '0:1')).toBeNull();
  });

  it('唔可以放去 given／已填／鎖定格', () => {
    const game = createGame(twoWordLevel());
    expect(placeChar(game, '0:0', '甲', 4)).toEqual([]);
    placeChar(game, '0:1', '二', 0);
    expect(placeChar(game, '0:1', '三', 1)).toEqual([]);
    expect(removeChar(game, '0:0')).toBeNull();
    expect(removeChar(game, '9:9')).toBeNull();
  });

  it('未填完成語前唔會判定、唔會扣分', () => {
    const game = createGame(twoWordLevel());
    expect(place(game, '0:1', '七', 4)).toEqual(['place']);
    expect(game.mistakes).toBe(0);
    expect(game.words[0].locked).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
describe('成語判定：正確鎖定', () => {
  it('填完成語正確 → word-correct、全部格鎖定、字卡狀態保留', () => {
    const game = createGame(twoWordLevel());
    expect(place(game, '0:1', '二', 0)).toEqual(['place']);
    expect(place(game, '0:2', '三', 1)).toEqual(['place', 'word-correct']);
    expect(game.words[0].locked).toBe(true);
    for (const key of ['0:0', '0:1', '0:2', '0:3']) {
      expect(game.cells[key].locked, `格 ${key} 應鎖定`).toBe(true);
    }
    // 鎖定格唔可以再改
    expect(placeChar(game, '0:1', '七', 4)).toEqual([]);
    expect(removeChar(game, '0:1')).toBeNull();
    expect(game.mistakes).toBe(0);
  });
});

/* ------------------------------------------------------------------ */
describe('成語判定：錯誤清空', () => {
  it('填錯 → word-wrong、mistakes+1、清空玩家字、given 保留', () => {
    const game = createGame(twoWordLevel());
    expect(place(game, '0:1', '七', 4)).toEqual(['place']);
    expect(place(game, '0:2', '八', 5)).toEqual(['place', 'word-wrong']);
    expect(game.mistakes).toBe(1);
    expect(game.words[0].locked).toBe(false);
    expect(game.cells['0:1']).toMatchObject({ char: '', locked: false });
    expect(game.cells['0:2']).toMatchObject({ char: '', locked: false });
    expect(game.cells['0:0']).toMatchObject({ char: '一', source: 'given', locked: true });
    expect(game.cells['0:3']).toMatchObject({ char: '四', source: 'given', locked: true });
    // 清空後可以再試
    expect(place(game, '0:1', '二', 0)).toEqual(['place']);
    expect(place(game, '0:2', '三', 1)).toEqual(['place', 'word-correct']);
    expect(game.words[0].locked).toBe(true);
  });

  it('已鎖定嘅交叉格唔會被另一句錯誤清走', () => {
    // slot0 橫：一二三四（blank 1）；slot1 直：二五六七（blanks 1,2,3），交叉格 = (0,1)
    const level = makeLevel({
      cells: [
        ...makeCells(['一二三四']),
        { r: 1, c: 1, char: '五' },
        { r: 2, c: 1, char: '六' },
        { r: 3, c: 1, char: '七' },
      ],
      slots: [
        { idiomId: 'cross-a', row: 0, col: 0, dir: 'h', blanks: [1] },
        { idiomId: 'cross-b', row: 0, col: 1, dir: 'v', blanks: [1, 2, 3] },
      ],
      bank: ['二', '五', '六', '七', '甲'],
    });
    const game = createGame(level);

    // 先完成 slot0（正解「二」）→ 交叉格 (0,1) 鎖定
    expect(place(game, '0:1', '二', 0)).toEqual(['place', 'word-correct']);
    expect(game.cells['0:1'].locked).toBe(true);

    // slot1 故意填錯 → 只清空未鎖定嘅格
    expect(place(game, '1:1', '七', 3)).toEqual(['place']);
    expect(place(game, '2:1', '六', 2)).toEqual(['place']);
    const lastEvents = placeChar(game, '3:1', '五', 1);
    expect(lastEvents.map((event) => event.type)).toEqual(['place', 'word-wrong']);
    expect(game.mistakes).toBe(1);

    const wrongEvent = lastEvents.find((event) => event.type === 'word-wrong');
    expect(wrongEvent && wrongEvent.type === 'word-wrong' ? wrongEvent.cells : []).not.toContain('0:1');
    expect(game.cells['0:1']).toMatchObject({ char: '二', locked: true });
    expect(game.cells['1:1'].char).toBe('');
    expect(game.cells['2:1'].char).toBe('');
    expect(game.cells['3:1'].char).toBe('');
    // slot0 仍然鎖定
    expect(game.words[0].locked).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
describe('useHint 提示', () => {
  it('揭示正確字、鎖定、hintsUsed+1、bankIndex 對應字卡', () => {
    const game = createGame(twoWordLevel());
    const hint = useHint(game);
    expect(hint).not.toBeNull();
    if (!hint) return;
    expect(['0:1', '0:2', '1:0', '1:3']).toContain(hint.key);
    expect(hint.char).toBe(solutionMap(game.level).get(hint.key));
    expect(game.cells[hint.key]).toMatchObject({
      char: hint.char,
      locked: true,
      source: 'hint',
    });
    expect(game.hintsUsed).toBe(1);
    expect(hint.bankIndex).toBeGreaterThanOrEqual(0);
    expect(game.level.bank[hint.bankIndex]).toBe(hint.char);
    // 提示格唔可以退回
    expect(removeChar(game, hint.key)).toBeNull();
    // 再提示會揀另一個未填格
    const second = useHint(game);
    expect(second?.key).not.toBe(hint.key);
    expect(game.hintsUsed).toBe(2);
  });

  it('完成後 useHint 回傳 null', () => {
    const game = createGame(twoWordLevel());
    solveCorrectly(game);
    expect(isSolved(game)).toBe(true);
    expect(useHint(game)).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
describe('星級與過關', () => {
  it('0 錯誤 0 提示 → 3 星；solved 事件只有一次', () => {
    const game = createGame(twoWordLevel());
    solveCorrectly(game);
    expect(isSolved(game)).toBe(true);
    expect(game.stars).toBe(3);
    expect(getStars(game)).toBe(3);
    expect(game.mistakes).toBe(0);
    expect(game.hintsUsed).toBe(0);
    // 過關後唔可以再操作
    expect(placeChar(game, '0:1', '二', 0)).toEqual([]);
    expect(removeChar(game, '0:1')).toBeNull();
  });

  it('只有錯誤 → 2 星；只有提示 → 2 星；兩樣都有 → 1 星', () => {
    // 錯誤一次後重新填好
    const mistakeGame = createGame(twoWordLevel());
    place(mistakeGame, '0:1', '七', 4);
    place(mistakeGame, '0:2', '八', 5);
    solveCorrectly(mistakeGame);
    expect(mistakeGame.mistakes).toBe(1);
    expect(mistakeGame.hintsUsed).toBe(0);
    expect(getStars(mistakeGame)).toBe(2);

    // 只用一次提示
    const hintGame = createGame(twoWordLevel());
    useHint(hintGame);
    solveCorrectly(hintGame);
    expect(getStars(hintGame)).toBe(2);

    // 提示＋錯誤
    const bothGame = createGame(twoWordLevel());
    useHint(bothGame);
    place(bothGame, '0:1', '七', 4);
    place(bothGame, '0:2', '八', 5);
    solveCorrectly(bothGame);
    expect(bothGame.mistakes).toBe(1);
    expect(bothGame.hintsUsed).toBe(1);
    expect(getStars(bothGame)).toBe(1);
  });

  it('starsFor 公式：3／2／1，最少 1 星', () => {
    expect(starsFor(0, 0)).toBe(3);
    expect(starsFor(1, 0)).toBe(2);
    expect(starsFor(0, 1)).toBe(2);
    expect(starsFor(1, 1)).toBe(1);
    expect(starsFor(5, 9)).toBe(1);
  });
});

/* ------------------------------------------------------------------ */
describe('工具函數', () => {
  it('keyOf / slotCellKeys / slotBlankKeys / solutionMap / blankKeySet', () => {
    const level = twoWordLevel();
    expect(keyOf(2, 3)).toBe('2:3');
    expect(slotCellKeys(level.slots[0])).toEqual(['0:0', '0:1', '0:2', '0:3']);
    expect(slotCellKeys(level.slots[1])).toEqual(['1:0', '1:1', '1:2', '1:3']);
    expect(slotBlankKeys(level.slots[0])).toEqual(['0:1', '0:2']);
    expect(slotBlankKeys(level.slots[1])).toEqual(['1:0', '1:3']);

    const solution = solutionMap(level);
    expect(solution.size).toBe(8);
    expect(solution.get('0:0')).toBe('一');
    expect(solution.get('1:3')).toBe('八');

    const blanks = blankKeySet(level);
    expect([...blanks].sort()).toEqual(['0:1', '0:2', '1:0', '1:3']);
  });

  it('垂直 slot 的 key 計算正確', () => {
    const level = makeLevel({
      cells: makeCells(['一', '二', '三', '四']),
      slots: [{ idiomId: 'v', row: 0, col: 0, dir: 'v', blanks: [1, 3] }],
      bank: ['二', '四'],
    });
    expect(slotCellKeys(level.slots[0])).toEqual(['0:0', '1:0', '2:0', '3:0']);
    expect(slotBlankKeys(level.slots[0])).toEqual(['1:0', '3:0']);
  });
});
