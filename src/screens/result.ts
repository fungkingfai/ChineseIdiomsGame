/** 過關 overlay：星星動畫、本關成語卡、下一關／重玩／返回地圖。 */

import type { AppContext } from '../core/context';
import type { Level } from '../core/types';
import { burstConfetti } from '../cats/animate';
import { catSVG } from '../cats/catAssets';
import { idiomCardHtml } from '../ui/idiomCard';
import { icon } from '../ui/icons';
import { openOverlay, type OverlayHandle } from '../ui/modal';
import { effectiveReducedMotion, playSfx } from '../ui/prefs';
import { resultStarsHtml } from '../ui/stars';
import { clearToasts } from '../ui/toast';

export interface ResultData {
  stars: number;
  mistakes: number;
  hints: number;
  /** 今次新收集到嘅成語 id */
  newIdiomIds: Set<string>;
}

export interface ResultCallbacks {
  onNext: () => void;
  onRetry: () => void;
  onMap: () => void;
}

export function showResultOverlay(
  ctx: AppContext,
  level: Level,
  data: ResultData,
  callbacks: ResultCallbacks,
): OverlayHandle {
  const reduced = effectiveReducedMotion(ctx);
  const nextLevel = ctx.levels.find((item) => item.id === level.id + 1);
  const idiomCards = level.slots
    .map((slot) => ctx.idioms.find((idiom) => idiom.id === slot.idiomId))
    .filter((idiom): idiom is NonNullable<typeof idiom> => Boolean(idiom))
    .map((idiom) =>
      idiomCardHtml(idiom, {
        testId: `result-idiom-${idiom.id}`,
        compact: true,
        collected: true,
        isNew: data.newIdiomIds.has(idiom.id),
      }),
    )
    .join('');

  const nextLabel = nextLevel ? `下一關：第 ${nextLevel.id} 關` : '全部完成！返回地圖';

  // 過關 overlay 打開前清走遊戲期間嘅 toast，唔好遮住星星／標題
  clearToasts();

  const handle = openOverlay({
    testId: 'result-overlay',
    ariaLabel: `${level.title} 過關`,
    className: 'overlay--result',
    wide: true,
    dismissible: false,
    content: `
      <div class="result">
        <div class="result__head">
          <p class="result__kicker">${icon.sparkle} 關卡完成 ${icon.sparkle}</p>
          <h2 class="result__title">${level.title}</h2>
          ${resultStarsHtml(data.stars, reduced)}
          <p class="result__meta">獲得 <b>${data.stars}</b> 星 · 錯誤 <b>${data.mistakes}</b> 次 · 提示 <b>${data.hints}</b> 次</p>
          <p class="result__collect">${icon.book} 本關 ${level.slots.length} 個成語已收入圖鑑</p>
        </div>
        <div class="result__cat" aria-hidden="true">
          ${catSVG('dango', 'celebrate', { size: 96 })}
        </div>
        <div class="result__idioms">
          ${idiomCards}
        </div>
        <div class="result__actions">
          <button type="button" class="btn btn--primary btn--lg" data-next data-testid="next-level-btn">
            ${icon.forward}<span>${nextLabel}</span>
          </button>
          <button type="button" class="btn btn--ghost" data-testid="retry-btn">
            ${icon.restart}<span>再玩一次</span>
          </button>
          <button type="button" class="btn btn--ghost" data-testid="result-map-btn">
            ${icon.map}<span>返回地圖</span>
          </button>
        </div>
      </div>
    `,
  });

  handle.el.querySelector('[data-next]')?.addEventListener('click', () => {
    playSfx(ctx, 'click');
    callbacks.onNext();
  });
  handle.el.querySelector('[data-testid="retry-btn"]')?.addEventListener('click', () => {
    playSfx(ctx, 'click');
    callbacks.onRetry();
  });
  handle.el.querySelector('[data-testid="result-map-btn"]')?.addEventListener('click', () => {
    playSfx(ctx, 'click');
    callbacks.onMap();
  });

  // 星星音效：逐粒彈
  const starTimers: number[] = [];
  if (!reduced) {
    for (let i = 0; i < data.stars; i += 1) {
      starTimers.push(
        window.setTimeout(() => {
          playSfx(ctx, 'star');
        }, 120 + i * 150),
      );
    }
    if (typeof burstConfetti === 'function') {
      window.setTimeout(() => {
        if (handle.isOpen()) burstConfetti(handle.panel);
      }, 80);
    }
  }

  const originalOnClose = handle.close;
  const clearTimers = (): void => {
    for (const timer of starTimers) window.clearTimeout(timer);
  };
  handle.close = (): void => {
    clearTimers();
    originalOnClose();
  };

  return handle;
}
