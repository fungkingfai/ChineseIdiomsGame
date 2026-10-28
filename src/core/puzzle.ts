import type {
  CellState,
  GameEvent,
  GameState,
  Level,
  Slot,
  WordState,
} from './types';

export const keyOf = (r: number, c: number): string => `${r}:${c}`;

export function parseKey(key: string): [number, number] {
  const [r, c] = key.split(':').map(Number);
  return [r, c];
}

/** 某 slot 覆蓋的所有格 key（依成語字序） */
export function slotCellKeys(slot: Slot): string[] {
  const keys: string[] = [];
  for (let i = 0; i < 4; i += 1) {
    keys.push(slot.dir === 'h' ? keyOf(slot.row, slot.col + i) : keyOf(slot.row + i, slot.col));
  }
  return keys;
}

/** 該 slot 要玩家填的格 key（依成語字序） */
export function slotBlankKeys(slot: Slot): string[] {
  const all = slotCellKeys(slot);
  return slot.blanks.map((i) => all[i]);
}

/** 由 level.cells 建立解答格 map */
export function solutionMap(level: Level): Map<string, string> {
  const map = new Map<string, string>();
  for (const cell of level.cells) map.set(keyOf(cell.r, cell.c), cell.char);
  return map;
}

/** 哪些格要玩家填（跨 slot 取聯集） */
export function blankKeySet(level: Level): Set<string> {
  const set = new Set<string>();
  for (const slot of level.slots) for (const key of slotBlankKeys(slot)) set.add(key);
  return set;
}

function allFilled(g: GameState, keys: string[]): boolean {
  return keys.every((key) => (g.cells[key]?.char ?? '') !== '');
}

function isCorrect(g: GameState, slot: Slot): boolean {
  const solution = solutionMap(g.level);
  return slotCellKeys(slot).every((key) => g.cells[key]?.char === solution.get(key));
}

function checkSolved(g: GameState, events: GameEvent[]): void {
  if (g.solved) return;
  const solved = g.words.every((w) => w.locked);
  if (!solved) return;
  g.solved = true;
  g.stars = starsFor(g.mistakes, g.hintsUsed);
  events.push({ type: 'solved', stars: g.stars });
}

/** 完成一個成語後判定：正確 → 鎖定；錯誤 → 清空該成語玩家填入的字並記錯。 */
function settleWords(g: GameState, touchedKeys: Set<string>, events: GameEvent[]): void {
  // 兩階段：先鎖定正確成語，再處理錯誤成語。
  // 咁樣交叉格屬於已正確成語時，就唔會被錯誤成語清走。
  const complete: Array<{ index: number; word: WordState; correct: boolean }> = [];
  for (let i = 0; i < g.words.length; i += 1) {
    const word = g.words[i];
    if (word.locked) continue;
    if (!word.cells.some((key) => touchedKeys.has(key))) continue;
    if (!allFilled(g, word.cells)) continue;
    complete.push({ index: i, word, correct: isCorrect(g, word.slot) });
  }

  for (const item of complete) {
    if (!item.correct) continue;
    for (const key of item.word.cells) {
      const cell = g.cells[key];
      if (cell) cell.locked = true;
    }
    item.word.locked = true;
    events.push({
      type: 'word-correct',
      slotIndex: item.index,
      idiomId: item.word.slot.idiomId,
      cells: [...item.word.cells],
    });
  }

  for (const item of complete) {
    if (item.correct) continue;
    g.mistakes += 1;
    const cleared: string[] = [];
    for (const key of item.word.cells) {
      const cell = g.cells[key];
      if (!cell || cell.source === 'given' || cell.locked) continue;
      if (cell.char !== '') {
        cell.char = '';
        cell.source = 'word';
        delete cell.bankIndex;
        cleared.push(key);
      }
    }
    events.push({
      type: 'word-wrong',
      slotIndex: item.index,
      idiomId: item.word.slot.idiomId,
      cells: cleared,
      mistakes: g.mistakes,
    });
  }

  checkSolved(g, events);
}

/** 依關卡資料建立遊戲狀態 */
export function createGame(level: Level): GameState {
  const solution = solutionMap(level);
  const blank = blankKeySet(level);
  const cells: Record<string, CellState> = {};
  for (const cell of level.cells) {
    const key = keyOf(cell.r, cell.c);
    const isBlank = blank.has(key);
    cells[key] = isBlank
      ? { char: '', locked: false, source: 'word' }
      : { char: solution.get(key) ?? '', locked: true, source: 'given' };
  }

  const words: WordState[] = level.slots.map((slot, index) => ({
    slotIndex: index,
    slot,
    cells: slotCellKeys(slot),
    // 冇空格嘅成語（例如接龍第一句全顯示）一開始就當已完成
    locked: slot.blanks.length === 0,
  }));

  return {
    level,
    cells,
    words,
    mistakes: 0,
    hintsUsed: 0,
    solved: false,
    stars: 0,
  };
}

/**
 * 玩家由字庫揀字放入空格。
 * @returns 事件序列（place / word-correct / word-wrong / solved）
 */
export function placeChar(
  g: GameState,
  key: string,
  char: string,
  bankIndex: number,
): GameEvent[] {
  const events: GameEvent[] = [];
  if (g.solved) return events;
  const cell = g.cells[key];
  if (!cell || cell.locked || cell.char !== '') return events;

  cell.char = char;
  cell.source = 'word';
  cell.bankIndex = bankIndex;
  events.push({ type: 'place', key, char });
  settleWords(g, new Set([key]), events);
  return events;
}

/** 玩家按已放入的字卡，將該格退回字庫。已鎖定格不可退。 */
export function removeChar(g: GameState, key: string): number | null {
  if (g.solved) return null;
  const cell = g.cells[key];
  if (!cell || cell.locked || cell.char === '') return null;
  const bankIndex = cell.bankIndex ?? null;
  cell.char = '';
  cell.source = 'word';
  delete cell.bankIndex;
  return bankIndex;
}

export interface HintResult {
  key: string;
  char: string;
  bankIndex: number;
  events: GameEvent[];
}

/** 揭示一個空格（優先未填格；全部已填但仍未完成時揭示一個未鎖定格） */
export function useHint(g: GameState): HintResult | null {
  if (g.solved) return null;
  const blanks = blankKeySet(g.level);
  const candidates = [...blanks].filter((key) => {
    const cell = g.cells[key];
    return !!cell && !cell.locked;
  });
  if (candidates.length === 0) return null;
  // 只揭示未填嘅格；若有格已填但成語未完成，代表同一個成語仲有空格，呢度一定搵到未填格。
  const pool = candidates.filter((key) => g.cells[key].char === '');
  if (pool.length === 0) return null;
  const key = pool[Math.floor(Math.random() * pool.length)];

  const solution = solutionMap(g.level);
  const answer = solution.get(key) ?? '';
  if (!answer) return null;

  const cell = g.cells[key];
  cell.char = answer;
  cell.locked = true;
  cell.source = 'hint';
  g.hintsUsed += 1;

  const bankIndex = currentBankIndexFor(g, key);
  if (bankIndex >= 0) cell.bankIndex = bankIndex;
  const events: GameEvent[] = [{ type: 'hint', key, char: answer }];
  settleWords(g, new Set([key]), events);
  return { key, char: answer, bankIndex, events };
}

/**
 * 提示用：在未使用的字庫卡中找一張與答案同字的索引。
 * UI 會用 bankIndex 將該卡標記為已用；若 UI 未同步，提示字仍以引擎為準。
 */
export function currentBankIndexFor(g: GameState, key: string): number {
  const solution = solutionMap(g.level);
  const answer = solution.get(key) ?? '';
  const used = new Set<number>();
  for (const cell of Object.values(g.cells)) {
    if (cell.bankIndex !== undefined) used.add(cell.bankIndex);
  }
  for (let i = 0; i < g.level.bank.length; i += 1) {
    if (g.level.bank[i] === answer && !used.has(i)) return i;
  }
  return -1;
}

/** 玩家目前已放入但未鎖定的格（含 bankIndex） */
export function placements(g: GameState): Array<{ key: string; char: string; bankIndex?: number }> {
  return Object.entries(g.cells)
    .filter(([, cell]) => cell.source === 'word' && !cell.locked && cell.char !== '')
    .map(([key, cell]) => ({ key, char: cell.char, bankIndex: cell.bankIndex }));
}

export function starsFor(mistakes: number, hintsUsed: number): number {
  const penalties = (mistakes > 0 ? 1 : 0) + (hintsUsed > 0 ? 1 : 0);
  return Math.max(1, 3 - penalties);
}

export function isSolved(g: GameState): boolean {
  return g.solved;
}

export function getStars(g: GameState): number {
  return g.solved ? starsFor(g.mistakes, g.hintsUsed) : 0;
}
