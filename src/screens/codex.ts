/** 成語圖鑑：收集進度、搜尋／篩選、詳情 modal。 */

import type { AppContext } from '../core/context';
import type { Idiom } from '../core/types';
import { navigate, ROUTE_HOME } from '../router';
import { catSVG } from '../cats/catAssets';
import { esc, fromHtml, normalizeSearch, qs, qsa } from '../ui/dom';
import { icon } from '../ui/icons';
import { openOverlay, type OverlayHandle } from '../ui/modal';
import { playSfx } from '../ui/prefs';
import { progressHtml } from '../ui/progress';
import type { Screen } from '../ui/screen';
import { showToast } from '../ui/toast';

type Filter = 'all' | 'collected' | 'locked';

const FILTER_LABELS: Record<Filter, string> = {
  all: '全部',
  collected: '已收集',
  locked: '未收集',
};

function tierDots(tier: number): string {
  const filled = Math.max(0, Math.min(5, Math.round(tier)));
  return `${'●'.repeat(filled)}${'○'.repeat(5 - filled)}`;
}

function cardHtml(idiom: Idiom, isCollected: boolean): string {
  const tags = idiom.tags ?? [];
  const firstTag = tags.length > 0 ? tags[0] : '';
  return `
    <button type="button" class="codex-card${isCollected ? '' : ' codex-card--locked'}" data-testid="codex-item-${
      idiom.id
    }" data-idiom-id="${esc(idiom.id)}" aria-label="${
      isCollected ? `成語 ${esc(idiom.word)}，睇詳情` : '未收集成語，過關後解鎖'
    }">
      <span class="codex-card__word">${isCollected ? esc(idiom.word) : '？？？？'}</span>
      <span class="codex-card__pinyin">${isCollected ? esc(idiom.pinyin) : '未解鎖'}</span>
      ${
        isCollected
          ? `<span class="codex-card__meaning">${esc(idiom.meaning)}</span>`
          : `<span class="codex-card__lock">${icon.lock} 過關後解鎖</span>`
      }
      <span class="codex-card__foot">
        <span class="codex-card__tier" aria-hidden="true">${tierDots(idiom.tier)}</span>
        ${isCollected && firstTag ? `<span class="codex-card__tag">${esc(firstTag)}</span>` : ''}
      </span>
    </button>
  `;
}

function detailHtml(idiom: Idiom): string {
  const tags = (idiom.tags ?? [])
    .map((tag) => `<span class="idiom-card__tag">${esc(tag)}</span>`)
    .join('');
  return `
    <div class="codex-detail">
      <div class="codex-detail__head">
        <div>
          <div class="codex-detail__word">${esc(idiom.word)}</div>
          <div class="codex-detail__pinyin">${esc(idiom.pinyin)}</div>
        </div>
        <span class="codex-detail__stamp">${icon.paw} 已收集</span>
      </div>
      <div class="codex-detail__section">
        <h3>${icon.book} 釋義</h3>
        <p>${esc(idiom.meaning)}</p>
      </div>
      <div class="codex-detail__section">
        <h3>${icon.bookOpen} 出處</h3>
        <p class="codex-detail__source">${esc(idiom.origin || '出處待考')}${
          idiom.sourceBook ? `<br />${esc(idiom.sourceBook)}` : ''
        }</p>
      </div>
      ${
        idiom.example
          ? `<div class="codex-detail__section"><h3>${icon.sparkle} 例句</h3><p class="codex-detail__example">${esc(
              idiom.example,
            )}</p></div>`
          : ''
      }
      <div class="codex-detail__tags">
        ${tags}
        <span class="badge badge--muted">難度 ${idiom.tier}</span>
      </div>
      <p class="codex-detail__tip">已收入成語圖鑑 · 繼續冒險可以收集更多成語喵～</p>
      <button type="button" class="btn btn--primary btn--wide" data-close data-autofocus>
        ${icon.check} 知道喇喵
      </button>
    </div>
  `;
}

export function createCodexScreen(ctx: AppContext): Screen {
  const total = ctx.idioms.length;
  const collected = new Set(ctx.save.collected);
  let filter: Filter = 'all';
  let query = '';
  let detailHandle: OverlayHandle | null = null;

  const el = fromHtml(`
    <main class="screen codex" data-testid="codex-screen">
      <header class="topbar">
        <button type="button" class="icon-btn" data-back aria-label="返回首頁">${icon.back}</button>
        <h1 class="topbar__title">成語圖鑑</h1>
        <div class="topbar__side">
          <span class="badge badge--pink">${icon.book} 收集</span>
        </div>
      </header>
      <div class="codex__toolbar">
        <div class="codex__search">
          <span class="codex__search-icon" aria-hidden="true">${icon.search}</span>
          <input type="search" data-testid="codex-search" placeholder="搵成語、拼音（唔使聲調）或意思……" aria-label="搜尋成語" autocomplete="off" />
          <button type="button" class="codex__clear" data-clear hidden aria-label="清除搜尋">
            ${icon.close}
          </button>
        </div>
        <div class="codex__filters" role="group" aria-label="篩選成語">
          ${(Object.keys(FILTER_LABELS) as Filter[])
            .map(
              (key) =>
                `<button type="button" class="chip${
                  key === 'all' ? ' is-active' : ''
                }" data-filter="${key}" aria-pressed="${key === 'all'}">${FILTER_LABELS[key]}</button>`,
            )
            .join('')}
        </div>
      </div>
      <div class="codex__count-card card card--paper">
        <div class="codex__count-row">
          <span class="codex__count" data-testid="codex-count">已收集 ${collected.size} / ${total} 條成語</span>
          <span class="codex__count-hint">過關自動收藏喵～</span>
        </div>
        ${progressHtml({
          value: total > 0 ? collected.size / total : 0,
          jade: true,
          ariaLabel: `圖鑑收集進度 ${collected.size} / ${total}`,
        })}
      </div>
      <div class="codex__grid" data-grid></div>
      <div class="empty-state" data-empty hidden></div>
    </main>
  `);

  const grid = qs<HTMLElement>(el, '[data-grid]');
  const empty = qs<HTMLElement>(el, '[data-empty]');
  const search = qs<HTMLInputElement>(el, '[data-testid="codex-search"]');
  const clearBtn = qs<HTMLButtonElement>(el, '[data-clear]');
  const filterWrap = qs<HTMLElement>(el, '.codex__filters');

  function matches(idiom: Idiom): boolean {
    const isCollected = collected.has(idiom.id);
    if (filter === 'collected' && !isCollected) return false;
    if (filter === 'locked' && isCollected) return false;
    const normalized = normalizeSearch(query);
    if (!normalized) return true;
    const haystack = isCollected
      ? `${idiom.word} ${idiom.pinyin} ${idiom.meaning} ${(idiom.tags ?? []).join(' ')}`
      : `${idiom.word} ${idiom.pinyin}`;
    return normalizeSearch(haystack).includes(normalized);
  }

  function renderEmpty(): void {
    const message =
      filter === 'collected'
        ? '仲未有收藏到成語喎，去過關收集啦喵～'
        : filter === 'locked'
          ? '全部成語都收集晒喇，你好叻呀喵！'
          : '搵唔到相關成語，試下其他關鍵字喵～';
    empty.innerHTML = `
      <div class="empty-state__cat" aria-hidden="true">${catSVG('dango', 'think')}</div>
      <p>${esc(message)}</p>
    `;
  }

  function renderGrid(): void {
    const filtered = ctx.idioms.filter(matches);
    // 已收集排前面，等玩家一眼睇到收藏成果
    const items = [
      ...filtered.filter((idiom) => collected.has(idiom.id)),
      ...filtered.filter((idiom) => !collected.has(idiom.id)),
    ];
    if (items.length === 0) {
      grid.hidden = true;
      grid.replaceChildren(); // 清走舊卡，避免 stale DOM／E2E count 誤判
      empty.hidden = false;
      renderEmpty();
      return;
    }
    empty.hidden = true;
    grid.hidden = false;
    grid.innerHTML = items
      .map((idiom) => cardHtml(idiom, collected.has(idiom.id)))
      .join('');
  }

  function openDetail(idiom: Idiom): void {
    playSfx(ctx, 'flip');
    detailHandle?.close();
    detailHandle = openOverlay({
      testId: 'codex-detail',
      ariaLabel: `成語詳情：${idiom.word}`,
      dismissible: true,
      closeButton: false,
      content: detailHtml(idiom),
      onClose: () => {
        detailHandle = null;
      },
    });
    detailHandle.el.querySelector('[data-close]')?.addEventListener('click', () => {
      detailHandle?.close();
    });
  }

  qs<HTMLButtonElement>(el, '[data-back]').addEventListener('click', () => {
    playSfx(ctx, 'click');
    navigate(ROUTE_HOME);
  });

  search.addEventListener('input', () => {
    query = search.value;
    clearBtn.hidden = query.length === 0;
    renderGrid();
  });

  clearBtn.addEventListener('click', () => {
    search.value = '';
    query = '';
    clearBtn.hidden = true;
    renderGrid();
    search.focus();
  });

  filterWrap.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('[data-filter]');
    if (!button) return;
    const next = button.dataset.filter as Filter | undefined;
    if (!next || !(next in FILTER_LABELS)) return;
    filter = next;
    for (const chip of qsa<HTMLButtonElement>(filterWrap, '[data-filter]')) {
      const active = chip === button;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    playSfx(ctx, 'click');
    renderGrid();
  });

  grid.addEventListener('click', (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-idiom-id]');
    if (!card) return;
    const idiom = ctx.idioms.find((item) => item.id === card.dataset.idiomId);
    if (!idiom) return;
    if (!collected.has(idiom.id)) {
      playSfx(ctx, 'click');
      showToast('過關就會收集到呢個成語喵～', { tone: 'info' });
      return;
    }
    openDetail(idiom);
  });

  renderGrid();

  return {
    el,
    destroy() {
      detailHandle?.close();
      detailHandle = null;
    },
  };
}
