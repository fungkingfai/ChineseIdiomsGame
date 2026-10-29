/**
 * 字庫 view：每張字卡永遠存在（DOM 穩定，方便 E2E），
 * 已用狀態由 game screen 嘅 `usedBank: Set<number>` 同步。
 */

import type { Level } from '../core/types';
import { esc } from './dom';
import { icon } from './icons';

export interface BankView {
  el: HTMLElement;
  /** 同步字卡使用狀態。 */
  sync(used: Set<number>): void;
  destroy(): void;
}

export function createBank(level: Level, onPick: (index: number) => void): BankView {
  const used = new Set<number>();
  const cards: HTMLButtonElement[] = [];
  const timers = new Set<number>();

  const el = document.createElement('div');
  // 進階篇 bank 可以多達 22 張：compact layout 免得字庫佔半個畫面
  el.className = level.bank.length > 14 ? 'bank bank--compact' : 'bank';

  const head = document.createElement('div');
  head.className = 'bank__head';
  head.innerHTML = `
    <span class="bank__title">${icon.paw} 字庫</span>
    <span class="bank__hint">點字卡放入選中嘅空格</span>
  `;
  el.append(head);

  const grid = document.createElement('div');
  grid.className = 'bank__grid';
  el.append(grid);

  level.bank.forEach((char, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'bank-card';
    card.dataset.testid = `bank-${index}`;
    card.dataset.index = String(index);
    card.textContent = char;
    card.setAttribute('aria-label', `字卡「${char}」`);

    card.addEventListener('click', () => {
      if (used.has(index)) {
        // 已經用咗：輕輕搖一下，唔放字
        card.classList.remove('bank-card--nudge');
        void card.offsetWidth;
        card.classList.add('bank-card--nudge');
        const timer = window.setTimeout(() => {
          card.classList.remove('bank-card--nudge');
          timers.delete(timer);
        }, 380);
        timers.add(timer);
        return;
      }
      onPick(index);
    });

    grid.append(card);
    cards.push(card);
  });

  return {
    el,
    sync(nextUsed: Set<number>) {
      used.clear();
      for (const index of nextUsed) used.add(index);
      cards.forEach((card, index) => {
        const isUsed = used.has(index);
        card.classList.toggle('is-used', isUsed);
        // 唔用 disabled／aria-disabled：已用卡仍然收到 click（會輕輕搖一下），E2E 較穩定
        card.setAttribute(
          'aria-label',
          `字卡「${esc(level.bank[index])}」${isUsed ? '（已使用）' : ''}`,
        );
      });
    },
    destroy() {
      for (const timer of timers) window.clearTimeout(timer);
      timers.clear();
    },
  };
}
