/**
 * 棋盤 view：fill（填字交叉）用 CSS grid；chain（接龍）用逐行 + 行間 connector。
 * 只負責顯示同 cell 狀態；所有遊戲邏輯喺 screens/game.ts。
 */

import type { GameState, Level } from '../core/types';
import { keyOf, slotCellKeys } from '../core/puzzle';
import { TimerBag, esc } from './dom';

export interface BoardView {
  el: HTMLElement;
  /** 掛上 DOM 後再 fit 一次（cell 大小依容器寬度收縮） */
  fit(): void;
  /** 依 GameState 重畫所有格；selectedKey 為目前選中格。 */
  render(g: GameState, selectedKey: string | null): void;
  /** 錯誤震動動畫 */
  shake(keys: string[]): void;
  /** 金色閃光（提示／正確） */
  flash(keys: string[]): void;
  destroy(): void;
}

interface CellRefs {
  button: HTMLButtonElement;
  char: HTMLElement;
}

export function createBoard(level: Level, onCellClick: (key: string) => void): BoardView {
  const timers = new TimerBag();
  const cells = new Map<string, CellRefs>();
  const solution = new Map<string, string>();
  for (const cell of level.cells) solution.set(keyOf(cell.r, cell.c), cell.char);

  // 交叉格（fill 用嚟做 junction 記號）
  const junctionKeys = new Set<string>();
  const seenKeys = new Set<string>();
  for (const slot of level.slots) {
    for (const key of slotCellKeys(slot)) {
      if (seenKeys.has(key)) junctionKeys.add(key);
      else seenKeys.add(key);
    }
  }

  const boardEl = document.createElement('div');
  if (level.mode === 'chain') {
    boardEl.className = 'chain-board';
  } else {
    boardEl.className = 'board';
    boardEl.style.setProperty('--rows', String(Math.max(1, level.rows)));
    boardEl.style.setProperty('--cols', String(Math.max(1, level.cols)));
    // 進階篇棋盤可以去到 10×10：密啲嘅 gap，等手機都放得落
    if (level.cols >= 7) boardEl.classList.add('board--dense');
    if (level.cols >= 10) boardEl.classList.add('board--ultra');
  }
  boardEl.setAttribute('role', 'group');
  boardEl.setAttribute(
    'aria-label',
    level.mode === 'chain' ? '成語接龍棋盤' : '成語填字棋盤',
  );

  function makeCell(r: number, c: number): HTMLButtonElement | null {
    const key = keyOf(r, c);
    const solutionChar = solution.get(key);
    if (solutionChar === undefined) return null;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cell cell--blank';
    button.dataset.key = key;
    button.dataset.testid = `cell-${r}-${c}`;
    button.setAttribute('aria-label', `第 ${r + 1} 行第 ${c + 1} 格`);

    const charSpan = document.createElement('span');
    charSpan.className = 'cell-char';
    charSpan.setAttribute('aria-hidden', 'true');
    charSpan.textContent = solutionChar;

    const paw = document.createElement('span');
    paw.className = 'cell-paw';
    paw.setAttribute('aria-hidden', 'true');

    button.append(charSpan, paw);
    button.addEventListener('click', () => onCellClick(key));
    cells.set(key, { button, char: charSpan });
    return button;
  }

  if (level.mode === 'chain') {
    const rows = [...level.slots].sort((a, b) => a.row - b.row);
    rows.forEach((slot, rowIndex) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'chain-row';
      for (let i = 0; i < 4; i += 1) {
        const r = slot.dir === 'h' ? slot.row : slot.row + i;
        const c = slot.dir === 'h' ? slot.col + i : slot.col;
        const button = makeCell(r, c);
        if (!button) continue;
        // 每行嘅首／尾字係接龍共用字，加高亮
        const isFirst = i === 0 && rowIndex > 0;
        const isLast = i === 3 && rowIndex < rows.length - 1;
        if (isFirst || isLast) button.classList.add('cell--chain-shared');
        rowEl.append(button);
      }
      boardEl.append(rowEl);

      if (rowIndex < rows.length - 1) {
        const nextSlot = rows[rowIndex + 1];
        const nextFirstKey =
          nextSlot.dir === 'h' ? keyOf(nextSlot.row, nextSlot.col) : keyOf(nextSlot.row, nextSlot.col);
        const thisLastKey =
          slot.dir === 'h' ? keyOf(slot.row, slot.col + 3) : keyOf(slot.row + 3, slot.col);
        const sharedChar = solution.get(nextFirstKey) ?? solution.get(thisLastKey) ?? '';
        const join = document.createElement('div');
        join.className = 'chain-join';
        join.setAttribute('aria-hidden', 'true');
        join.innerHTML = `<span class="chain-join__line"></span><span class="chain-join__arrow">↓</span><span class="chain-join__char">${esc(
          sharedChar,
        )}</span><span class="chain-join__line"></span>`;
        boardEl.append(join);
      }
    });
  } else {
    for (let r = 0; r < level.rows; r += 1) {
      for (let c = 0; c < level.cols; c += 1) {
        const button = makeCell(r, c);
        if (!button) continue;
        button.style.gridRow = String(r + 1);
        button.style.gridColumn = String(c + 1);
        if (junctionKeys.has(keyOf(r, c))) button.classList.add('cell--junction');
        boardEl.append(button);
      }
    }
  }

  /** 依實際可用寬度收縮 cell，支援最多 8 行 × 7 欄嘅填字關（手機唔會爆橫） */
  const MIN_CELL = 26;
  let fittedCell = 0;
  let idealCell = 0;
  let resizeObserver: ResizeObserver | null = null;

  function fitCellSize(): void {
    // 約束闊度係 .board-panel（唔係 board 嘅 wrapper，wrapper 會被 board 撐大）
    const host =
      boardEl.closest<HTMLElement>('.board-panel') ??
      boardEl.parentElement;
    if (!host) return;
    const hostStyle = getComputedStyle(host);
    const hostWidth =
      host.clientWidth -
      (parseFloat(hostStyle.paddingLeft) || 0) -
      (parseFloat(hostStyle.paddingRight) || 0);
    if (hostWidth <= 0) return;
    const cols = level.mode === 'chain' ? 4 : Math.max(1, level.cols);
    const boardStyle = getComputedStyle(boardEl);
    const gap = parseFloat(boardStyle.columnGap || boardStyle.gap) || 6;
    // 由 CSS token 量返「理想 cell 大細」（唔係字串 clamp，直接量第一格）；
    // 只量一次，之後視窗放大返都唔會永久縮細
    if (idealCell <= 0) {
      const probe = boardEl.querySelector<HTMLElement>('.cell');
      const baseCell = probe ? parseFloat(getComputedStyle(probe).width) || 0 : 0;
      idealCell = baseCell > 0 ? Math.min(baseCell, 82) : 66;
    }
    const ideal = idealCell;
    const fit = Math.floor((hostWidth - gap * (cols - 1)) / cols);
    let cell = Math.max(MIN_CELL, Math.min(ideal, fit));

    // 桌面：高身棋盤（最多 8 行）都要放得落 HUD 同字庫之間，唔好要捲頁
    if (window.innerWidth >= 900) {
      const rows = level.mode === 'chain' ? Math.max(1, level.slots.length) : Math.max(1, level.rows);
      const hud = document.querySelector<HTMLElement>('.game__hud');
      const bank = document.querySelector<HTMLElement>('.game__bank-zone');
      const reserved =
        (hud?.offsetHeight ?? 66) +
        (bank?.offsetHeight ?? 150) +
        96; // layout padding + 棋盤 label + 少少呼吸位
      const byHeight = Math.floor((window.innerHeight - reserved - gap * (rows - 1)) / rows);
      // 太矮就唔好夾硬縮：寧願頁面捲，都要保住可讀性
      if (byHeight >= 38) cell = Math.max(MIN_CELL, Math.min(cell, byHeight));
    }
    if (cell === fittedCell) return;
    fittedCell = cell;
    boardEl.style.setProperty('--cell', `${cell}px`);
  }

  function scheduleFit(): void {
    requestAnimationFrame(() => {
      fitCellSize();
      // 第二次 call 係因為字型／場景 lazy layout 可能改變闊度
      requestAnimationFrame(fitCellSize);
    });
  }

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => fitCellSize());
    // observe boardEl 本身：佢一入 DOM 有尺寸就會 trigger，parent 亦已存在
    resizeObserver.observe(boardEl);
  }
  const onWindowResize = (): void => fitCellSize();
  window.addEventListener('resize', onWindowResize);
  scheduleFit();

  function render(g: GameState, selectedKey: string | null): void {
    const lockedWordKeys = new Set<string>();
    for (const word of g.words) {
      if (word.locked) for (const key of word.cells) lockedWordKeys.add(key);
    }

    for (const [key, refs] of cells) {
      const cell = g.cells[key];
      if (!cell) continue;
      const { button, char } = refs;
      const [r, c] = key.split(':').map(Number) as [number, number];

      button.classList.toggle('cell--given', cell.source === 'given');
      button.classList.toggle('cell--blank', cell.char === '' && !cell.locked);
      button.classList.toggle('cell--filled', cell.char !== '' && cell.source === 'word');
      button.classList.toggle('cell--hint', cell.source === 'hint');
      button.classList.toggle('cell--locked', cell.locked);
      button.classList.toggle('cell--word-locked', lockedWordKeys.has(key));
      button.classList.toggle('cell--selected', selectedKey === key);
      // 唔用 disabled／aria-disabled：鎖定格仍然收到 click（no-op），避免 E2E 自動化被 block
      button.setAttribute(
        'aria-label',
        `第 ${r + 1} 行第 ${c + 1} 格：${cell.char || '空格'}${cell.locked ? '（已鎖定）' : ''}`,
      );

      if (char.textContent !== cell.char) char.textContent = cell.char;
    }
  }

  function addTempClass(keys: string[], className: string, duration: number): void {
    for (const key of keys) {
      const refs = cells.get(key);
      if (!refs) continue;
      refs.button.classList.remove(className);
      // 強制 reflow 令動畫可以重播
      void refs.button.offsetWidth;
      refs.button.classList.add(className);
    }
    timers.after(duration, () => {
      for (const key of keys) cells.get(key)?.button.classList.remove(className);
    });
  }

  return {
    el: boardEl,
    fit() {
      fitCellSize();
    },
    render,
    shake(keys) {
      addTempClass(keys, 'cell--shake', 520);
    },
    flash(keys) {
      addTempClass(keys, 'cell--flash', 640);
    },
    destroy() {
      timers.clear();
      resizeObserver?.disconnect();
      resizeObserver = null;
      window.removeEventListener('resize', onWindowResize);
    },
  };
}
