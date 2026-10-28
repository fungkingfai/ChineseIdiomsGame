/**
 * 遊戲畫面 orchestrator：
 *  - 用 core/puzzle 引擎建局、放字、判定、提示
 *  - UI 管理字庫使用狀態（usedBank）＋每格用咗邊張字卡（cellBank）
 *  - word-correct / word-wrong / solved 事件 → 動畫、音效、貓貓反應、過關 overlay
 */

import type { AppContext } from '../core/context';
import type { GameEvent, GameState, Level } from '../core/types';
import { createGame, placeChar, removeChar, useHint } from '../core/puzzle';
import { markChapterSeen, markTutorialSeen, recordLevelClear } from '../core/progress';
import { navigate, ROUTE_MAP, routeGame } from '../router';
import { catSVG, type CatCharacter, type CatMood } from '../cats/catAssets';
import { createBank, type BankView } from '../ui/bank';
import { createBoard, type BoardView } from '../ui/board';
import { catBubbleHtml } from '../ui/catBubble';
import { esc, fromHtml, qs, TimerBag } from '../ui/dom';
import { icon } from '../ui/icons';
import { isOverlayOpen, type OverlayHandle } from '../ui/modal';
import { playSfx, toggleSoundEnabled } from '../ui/prefs';
import type { Screen } from '../ui/screen';
import { showToast } from '../ui/toast';
import { openChapterIntroOverlay } from './chapterIntro';
import { showResultOverlay } from './result';
import { openTutorialOverlay } from './tutorial';

type WordCorrectEvent = Extract<GameEvent, { type: 'word-correct' }>;
type WordWrongEvent = Extract<GameEvent, { type: 'word-wrong' }>;

const SPEECH_START = [
  '我哋一齊搵晒呢關嘅成語靈珠啦喵！',
  '點空格、再點字卡，就可以放字上去喇喵～',
];
const SPEECH_CORRECT = [
  '好叻呀！呢句成語啱晒喵～',
  '叮！又收集到一個成語喇喵！',
  '阿墨都讚你：呢句好準喵！',
];
const SPEECH_WRONG = [
  '哎呀，呢句唔啱喎⋯再睇清楚啲喵～',
  '唔緊要，貓貓都會撳錯掣，再試過喵！',
];
const SPEECH_SOLVED = '全部成語都搵晒喇！我哋成功咗喇喵～';

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function createGameScreen(ctx: AppContext, level: Level): Screen {
  const chapter = ctx.chapters.find((item) => item.id === level.chapter);
  const hintLimit = Math.max(0, level.hintLimit);
  const idiomById = new Map(ctx.idioms.map((idiom) => [idiom.id, idiom]));

  let state: GameState = createGame(level);
  let selectedKey: string | null = null;
  let isFinished = false;
  let destroyed = false;
  const usedBank = new Set<number>();
  const cellBank = new Map<string, number>();
  const timers = new TimerBag();

  let resultHandle: OverlayHandle | null = null;
  let chapterHandle: OverlayHandle | null = null;
  let tutorialHandle: OverlayHandle | null = null;

  const initialSound = ctx.save.settings.sound;
  const el = fromHtml(`
    <main class="screen game" data-testid="game-screen" data-level-id="${level.id}" data-mode="${
      level.mode
    }">
      <header class="game__hud">
        <button type="button" class="icon-btn game__hud-back" data-testid="game-back" aria-label="返回成語地圖">
          ${icon.back}
        </button>
        <div class="game__hud-title">
          <span class="game__hud-chapter">第 ${level.chapter} 章 · ${esc(chapter?.name ?? '')}</span>
          <h1 data-testid="game-title">${esc(level.title)}</h1>
        </div>
        <div class="game__hud-actions">
          <button type="button" class="hint-btn" data-testid="hint-btn" aria-label="用提示">
            ${icon.hint}
            <span class="hint-btn__count" data-testid="hint-count">${hintLimit}</span>
          </button>
          <button type="button" class="icon-btn" data-testid="restart-btn" aria-label="重新開始呢一關">
            ${icon.restart}
          </button>
          <button type="button" class="icon-btn" data-testid="sound-btn" aria-label="${
            initialSound ? '關閉音效' : '開啟音效'
          }" aria-pressed="${initialSound}">
            ${initialSound ? icon.soundOn : icon.soundOff}
          </button>
          <span class="game__hud-stat game__hud-stat--mistakes">
            <b data-testid="mistake-count">0</b><span class="game__hud-stat__label">錯</span>
          </span>
        </div>
      </header>

      <div class="game__layout">
        <aside class="game__aside">
          <div class="game__cat" data-cat-slot></div>
          <div class="game__story">
            <strong>成語小劇場</strong>
            ${esc(level.story)}
          </div>
          <div class="game__words" data-word-chips aria-label="成語進度"></div>
        </aside>

        <div class="game__main">
          <div class="board-panel">
            <span class="board-panel__label">${
              level.mode === 'chain' ? '成語接龍' : '成語填字'
            }</span>
            <div class="board-mount" data-board></div>
          </div>
        </div>

        <div class="game__bank-zone">
          <div class="game__bank">
            <div data-bank></div>
            <p class="game__tip">
              點空格 → 點字卡 · 再點已填格可以攞返字卡 · <kbd>Esc</kbd> 返地圖
            </p>
          </div>
        </div>
      </div>
    </main>
  `);

  const boardMount = qs<HTMLElement>(el, '[data-board]');
  const bankMount = qs<HTMLElement>(el, '[data-bank]');
  const catSlot = qs<HTMLElement>(el, '[data-cat-slot]');
  const wordChips = qs<HTMLElement>(el, '[data-word-chips]');
  const hintBtn = qs<HTMLButtonElement>(el, '[data-testid="hint-btn"]');
  const hintCount = qs<HTMLElement>(el, '[data-testid="hint-count"]');
  const mistakeCount = qs<HTMLElement>(el, '[data-testid="mistake-count"]');
  const mistakeStat = mistakeCount.closest<HTMLElement>('.game__hud-stat');
  const soundBtn = qs<HTMLButtonElement>(el, '[data-testid="sound-btn"]');

  const boardView: BoardView = createBoard(level, handleCellClick);
  const bankView: BankView = createBank(level, handleBankPick);
  boardMount.append(boardView.el);
  bankMount.append(bankView.el);
  boardView.fit();

  /* ---------------------------------------------------------------- */
  /* 顯示同步                                                          */
  /* ---------------------------------------------------------------- */

  function setSpeech(text: string, mood: CatMood = 'idle', character: CatCharacter = 'dango'): void {
    catSlot.innerHTML = catBubbleHtml({ character, mood, text });
  }

  function updateHud(): void {
    const hintLeft = Math.max(0, hintLimit - state.hintsUsed);
    hintCount.textContent = String(hintLeft);
    hintBtn.classList.toggle('is-empty', hintLeft <= 0);
    hintBtn.setAttribute(
      'aria-label',
      hintLeft > 0 ? `用提示，仲有 ${hintLeft} 次` : '提示已經用晒',
    );
    mistakeCount.textContent = String(state.mistakes);
  }

  function bumpMistakes(): void {
    if (!mistakeStat) return;
    mistakeStat.classList.remove('is-bumped');
    void mistakeStat.offsetWidth;
    mistakeStat.classList.add('is-bumped');
    timers.after(500, () => mistakeStat.classList.remove('is-bumped'));
  }

  function updateSoundButton(): void {
    const enabled = ctx.save.settings.sound;
    soundBtn.innerHTML = enabled ? icon.soundOn : icon.soundOff;
    soundBtn.setAttribute('aria-label', enabled ? '關閉音效' : '開啟音效');
    soundBtn.setAttribute('aria-pressed', String(enabled));
    soundBtn.classList.toggle('is-active', enabled);
  }

  function renderWordChips(): void {
    wordChips.innerHTML = state.words
      .map((word, index) => {
        const idiom = idiomById.get(word.slot.idiomId);
        if (word.locked) {
          return `
            <button type="button" class="word-chip is-locked" data-word-index="${index}" aria-label="成語 ${
              index + 1
            } 已解鎖：${esc(idiom?.word ?? '')}">
              <span class="word-chip__num" aria-hidden="true">${index + 1}</span>
              ${esc(idiom?.word ?? '????')}
              <span class="word-chip__check" aria-hidden="true">${icon.check}</span>
            </button>
          `;
        }
        return `
          <button type="button" class="word-chip" data-word-index="${index}" aria-label="成語 ${
            index + 1
          }，未完成">
            <span class="word-chip__num" aria-hidden="true">${index + 1}</span>
            ▢▢▢▢
          </button>
        `;
      })
      .join('');
  }

  function syncAll(): void {
    boardView.render(state, selectedKey);
    bankView.sync(usedBank);
    updateHud();
    renderWordChips();
  }

  /* ---------------------------------------------------------------- */
  /* 引擎互動                                                          */
  /* ---------------------------------------------------------------- */

  function isPlaceable(key: string): boolean {
    const cell = state.cells[key];
    return Boolean(cell && !cell.locked && cell.char === '');
  }

  function firstEmptyBlank(): string | null {
    for (const word of state.words) {
      if (word.locked) continue;
      for (const key of word.cells) {
        if (isPlaceable(key)) return key;
      }
    }
    return null;
  }

  function nextBlankInSameWord(placedKey: string): string | null {
    const word = state.words.find((item) => !item.locked && item.cells.includes(placedKey));
    if (!word) return null;
    for (const key of word.cells) {
      if (isPlaceable(key)) return key;
    }
    return null;
  }

  function handleCellClick(key: string): void {
    if (isFinished || destroyed) return;
    const cell = state.cells[key];
    if (!cell) return;

    if (cell.locked) {
      playSfx(ctx, 'click');
      return;
    }

    if (cell.char !== '') {
      // 退字：把字卡放回字庫
      const released = removeChar(state, key);
      if (released === null) return;
      usedBank.delete(released);
      cellBank.delete(key);
      selectedKey = key;
      playSfx(ctx, 'flip');
      syncAll();
      return;
    }

    // 已經選中嘅格再點一次：保持選中（唔好 toggle 熄），
    // 避免「放完一格自動選中下一格 → 玩家/E2E 再點同一格 → 取消選中 → 字卡放錯位」
    if (selectedKey !== key) {
      selectedKey = key;
      boardView.render(state, selectedKey);
    }
    playSfx(ctx, 'click');
  }

  function handleBankPick(index: number): void {
    if (isFinished || destroyed) return;
    if (usedBank.has(index)) return;
    const char = level.bank[index];
    if (!char) return;

    let target = selectedKey && isPlaceable(selectedKey) ? selectedKey : firstEmptyBlank();
    if (!target) {
      showToast('冇空格可以放字喇喵～', { tone: 'info' });
      return;
    }

    const events = placeChar(state, target, char, index);
    if (!events.some((event) => event.type === 'place')) {
      return;
    }
    usedBank.add(index);
    cellBank.set(target, index);
    playSfx(ctx, 'place');
    selectedKey = nextBlankInSameWord(target);
    syncAll();
    handleEvents(events);
  }

  function handleHint(): void {
    if (isFinished || destroyed) return;
    if (state.hintsUsed >= hintLimit) {
      playSfx(ctx, 'click');
      showToast('提示用晒喇喵，靠你喇！', { tone: 'info' });
      return;
    }
    const result = useHint(state);
    if (!result) {
      showToast('而家冇位需要提示喎喵～', { tone: 'info' });
      return;
    }
    if (result.bankIndex >= 0) usedBank.add(result.bankIndex);
    cellBank.delete(result.key);
    selectedKey = null;
    playSfx(ctx, 'hint');
    setSpeech(`阿墨偷偷話你知：呢個字係「${result.char}」喵～`, 'think', 'amo');
    showToast(`提示：呢格係「${result.char}」喵！`, { tone: 'gold', duration: 2000 });
    syncAll();
    boardView.flash([result.key]);
    handleEvents(result.events);
  }

  /* ---------------------------------------------------------------- */
  /* 引擎事件                                                          */
  /* ---------------------------------------------------------------- */

  function onWordCorrect(event: WordCorrectEvent): void {
    const idiom = idiomById.get(event.idiomId);
    playSfx(ctx, 'correct');
    setSpeech(
      idiom ? `「${idiom.word}」啱晒！${pick(SPEECH_CORRECT)}` : pick(SPEECH_CORRECT),
      'happy',
    );
    boardView.render(state, selectedKey);
    boardView.flash(event.cells);
    renderWordChips();
    if (idiom) {
      showToast(`『${idiom.word}』啱晒喵！`, { tone: 'success', duration: 1900 });
    }
  }

  function onWordWrong(event: WordWrongEvent): void {
    playSfx(ctx, 'wrong');
    for (const key of event.cells) {
      const released = cellBank.get(key);
      if (released !== undefined) {
        usedBank.delete(released);
        cellBank.delete(key);
      }
    }
    selectedKey = null;
    boardView.render(state, null);
    boardView.shake(event.cells);
    bankView.sync(usedBank);
    updateHud();
    renderWordChips();
    bumpMistakes();
    setSpeech(pick(SPEECH_WRONG), 'sad');
    showToast('唔啱喎，個成語清空咗，再試過喵～', { tone: 'warn', duration: 2100 });
  }

  function onSolved(stars: number): void {
    if (isFinished) return;
    isFinished = true;
    selectedKey = null;
    boardView.render(state, null);
    renderWordChips();
    updateHud();

    const idiomIds = level.slots.map((slot) => slot.idiomId);
    const newIdiomIds = new Set(idiomIds.filter((id) => !ctx.save.collected.includes(id)));
    recordLevelClear(ctx.save, level.id, stars, state.mistakes, state.hintsUsed, idiomIds);
    ctx.persist();

    playSfx(ctx, 'clear');
    setSpeech(SPEECH_SOLVED, 'celebrate');
    showToast(`過關喇喵！獲得 ${stars} 星！`, { tone: 'success', duration: 1800 });

    timers.after(700, () => {
      if (destroyed) return;
      ctx.audio.fanfare();
      resultHandle = showResultOverlay(
        ctx,
        level,
        {
          stars,
          mistakes: state.mistakes,
          hints: state.hintsUsed,
          newIdiomIds,
        },
        {
          onNext: () => {
            resultHandle?.close();
            resultHandle = null;
            const nextLevel = ctx.levels.find((item) => item.id === level.id + 1);
            if (nextLevel) navigate(routeGame(nextLevel.id));
            else navigate(ROUTE_MAP);
          },
          onRetry: () => {
            resultHandle?.close();
            resultHandle = null;
            restartGame(true);
            showToast('再嚟一次喵！', { tone: 'info' });
          },
          onMap: () => {
            resultHandle?.close();
            resultHandle = null;
            navigate(ROUTE_MAP);
          },
        },
      );
    });
  }

  function handleEvents(events: GameEvent[]): void {
    for (const event of events) {
      switch (event.type) {
        case 'word-correct':
          onWordCorrect(event);
          break;
        case 'word-wrong':
          onWordWrong(event);
          break;
        case 'solved':
          onSolved(event.stars);
          break;
        default:
          break;
      }
    }
  }

  /* ---------------------------------------------------------------- */
  /* 其他操作                                                          */
  /* ---------------------------------------------------------------- */

  function restartGame(silent: boolean): void {
    resultHandle?.close();
    resultHandle = null;
    timers.clear();
    state = createGame(level);
    usedBank.clear();
    cellBank.clear();
    selectedKey = null;
    isFinished = false;
    playSfx(ctx, 'click');
    setSpeech(pick(SPEECH_START), 'idle');
    syncAll();
    if (!silent) showToast('重新開始呢一關喵！', { tone: 'info' });
  }

  function toggleSound(): void {
    const enabled = toggleSoundEnabled(ctx);
    updateSoundButton();
    if (enabled) playSfx(ctx, 'click');
    showToast(enabled ? '音效開咗喵～' : '音效熄咗喵～', { tone: 'info' });
  }

  /* ---------------------------------------------------------------- */
  /* 首次進入：章節故事 → 新手教學                                      */
  /* ---------------------------------------------------------------- */

  function maybeTutorial(): void {
    if (ctx.save.tutorialSeen || level.id !== 1 || destroyed) return;
    tutorialHandle = openTutorialOverlay(ctx, () => {
      markTutorialSeen(ctx.save);
      ctx.persist();
      tutorialHandle = null;
      setSpeech(pick(SPEECH_START), 'happy');
    });
  }

  function maybeChapterIntro(): void {
    if (destroyed) return;
    if (!chapter || ctx.save.seenChapters.includes(chapter.id)) {
      maybeTutorial();
      return;
    }
    chapterHandle = openChapterIntroOverlay(ctx, chapter, level, () => {
      markChapterSeen(ctx.save, chapter.id);
      ctx.persist();
      chapterHandle = null;
      maybeTutorial();
    });
  }

  /* ---------------------------------------------------------------- */
  /* 監聽                                                              */
  /* ---------------------------------------------------------------- */

  qs<HTMLButtonElement>(el, '[data-testid="game-back"]').addEventListener('click', () => {
    playSfx(ctx, 'click');
    navigate(ROUTE_MAP);
  });
  qs<HTMLButtonElement>(el, '[data-testid="restart-btn"]').addEventListener('click', () => {
    if (isFinished) {
      resultHandle?.close();
      resultHandle = null;
    }
    restartGame(false);
  });
  hintBtn.addEventListener('click', handleHint);
  soundBtn.addEventListener('click', toggleSound);

  wordChips.addEventListener('click', (event) => {
    if (isFinished) return;
    const chip = (event.target as HTMLElement).closest<HTMLElement>('[data-word-index]');
    if (!chip) return;
    const index = Number(chip.dataset.wordIndex);
    const word = state.words[index];
    if (!word || word.locked) return;
    const target = word.cells.find((key) => isPlaceable(key));
    if (!target) return;
    selectedKey = target;
    boardView.render(state, selectedKey);
    playSfx(ctx, 'click');
  });

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return;
    if (isOverlayOpen()) return; // 交俾 modal 處理
    navigate(ROUTE_MAP);
  };
  document.addEventListener('keydown', onKeyDown);

  /* ---------------------------------------------------------------- */
  /* 初始化                                                            */
  /* ---------------------------------------------------------------- */

  updateSoundButton();
  setSpeech(pick(SPEECH_START), 'idle');
  renderWordChips();
  boardView.render(state, null);
  bankView.sync(usedBank);
  updateHud();

  // 入場：先顯示章節故事，再顯示新手教學
  timers.after(90, maybeChapterIntro);

  return {
    el,
    destroy() {
      destroyed = true;
      timers.clear();
      document.removeEventListener('keydown', onKeyDown);
      resultHandle?.close();
      resultHandle = null;
      chapterHandle?.close();
      chapterHandle = null;
      tutorialHandle?.close();
      tutorialHandle = null;
      boardView.destroy();
      bankView.destroy();
    },
  };
}

/* 免得 unused import（catSVG 喺 catBubbleHtml 內使用；呢個 export 只為 tree-shake 安全） */
export { catSVG };
