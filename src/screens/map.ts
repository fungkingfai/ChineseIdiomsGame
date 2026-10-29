/**
 * 成語地圖：20 章 × 10 關（Issue #2）。分兩個 section：
 *   基礎篇（第 1–10 章）／進階篇（第 11–20 章，附「進階」badge）
 * - 章節場景 SVG 用 IntersectionObserver + `.is-static`，只為可見章節開環境動畫
 * - 總星數／字幕／下一關全部由 ctx.chapters／ctx.levels 動態計
 * - 自動捲到當前章（包括第 11–20 章）
 */

import type { AppContext } from '../core/context';
import type { Chapter, Level } from '../core/types';
import { clearedRecord, isLevelUnlocked, totalStars } from '../core/progress';
import { navigate, ROUTE_HOME, routeGame } from '../router';
import { chapterSceneSVG } from '../cats/scenes';
import { esc, fromHtml, qs } from '../ui/dom';
import { icon } from '../ui/icons';
import { playSfx, scrollBehavior } from '../ui/prefs';
import { starGlyphs } from '../ui/stars';
import { showToast } from '../ui/toast';
import type { Screen } from '../ui/screen';

/** 第 1–10 章＝基礎篇，第 11–20 章＝進階篇（Issue #2） */
const BASIC_CHAPTER_MAX = 10;

const ZH_NUM: Record<number, string> = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十',
  100: '一百',
  200: '二百',
};

function zhNumber(value: number): string {
  return ZH_NUM[value] ?? String(value);
}

interface ChapterEntry {
  chapter: Chapter;
  levels: Level[];
}

function groupLevels(ctx: AppContext): Map<number, Level[]> {
  const map = new Map<number, Level[]>();
  for (const chapter of ctx.chapters) map.set(chapter.id, []);
  for (const level of ctx.levels) {
    const list = map.get(level.chapter);
    if (list) list.push(level);
  }
  for (const list of map.values()) list.sort((a, b) => a.id - b.id);
  return map;
}

function findCurrentLevelId(ctx: AppContext): number {
  for (const level of ctx.levels) {
    if (isLevelUnlocked(ctx.save, level.id) && !clearedRecord(ctx.save, level.id)) {
      return level.id;
    }
  }
  return ctx.levels.length > 0 ? ctx.levels[ctx.levels.length - 1].id : 1;
}

function chapterStars(chapterLevels: Level[], ctx: AppContext): number {
  let stars = 0;
  for (const level of chapterLevels) stars += clearedRecord(ctx.save, level.id)?.stars ?? 0;
  return stars;
}

function levelButtonHtml(level: Level, currentLevelId: number, ctx: AppContext): string {
  const record = clearedRecord(ctx.save, level.id);
  const unlocked = isLevelUnlocked(ctx.save, level.id);
  const cleared = (record?.stars ?? 0) > 0;
  const current = level.id === currentLevelId && !cleared;

  const classes = ['level-btn'];
  if (cleared) classes.push('level-btn--cleared');
  else if (current) classes.push('level-btn--current');
  else if (!unlocked) classes.push('level-btn--locked');

  const statusLabel = cleared
    ? `已過關，獲得 ${record?.stars ?? 0} 星`
    : current
      ? '當前關卡'
      : unlocked
        ? '已解鎖'
        : '未解鎖';

  return `
    <button type="button" class="${classes.join(' ')}" data-testid="level-btn-${level.id}" data-level-id="${
      level.id
    }" data-level-chapter="${level.chapter}" data-level-mode="${level.mode}" aria-label="第 ${
      level.id
    } 關 ${esc(level.title)}，${statusLabel}">
      <span class="level-btn__num">${level.id}</span>
      ${
        cleared
          ? `<span class="level-btn__stars" aria-hidden="true">${starGlyphs(record?.stars ?? 0)}</span>`
          : current
            ? `<span class="level-btn__paw" aria-hidden="true">${icon.paw}</span>`
            : `<span class="level-btn__lock" aria-hidden="true">${icon.lock}</span>`
      }
    </button>
  `;
}

function chapterHtml(
  entry: ChapterEntry,
  currentLevelId: number,
  ctx: AppContext,
): string {
  const { chapter, levels } = entry;
  const unlocked = levels.some((level) => isLevelUnlocked(ctx.save, level.id));
  const clearedInChapter = levels.filter(
    (level) => (clearedRecord(ctx.save, level.id)?.stars ?? 0) > 0,
  ).length;
  const stars = chapterStars(levels, ctx);
  const maxStars = levels.length * 3;
  const isAdvanced = chapter.id > BASIC_CHAPTER_MAX;

  return `
    <section class="chapter card${unlocked ? '' : ' chapter--locked'}${
      isAdvanced ? ' chapter--advanced' : ''
    }" data-testid="chapter-${chapter.id}" data-chapter-id="${chapter.id}" data-chapter-advanced="${
      isAdvanced ? 'true' : 'false'
    }">
      <div class="chapter__scene">
        ${chapterSceneSVG(chapter.scene)}
        <span class="chapter__scene-badge">第 ${chapter.id} 章${
          isAdvanced ? ' · 進階' : ''
        }</span>
        ${
          unlocked
            ? `<span class="chapter__scene-stars" aria-label="章節星數 ${stars} / ${maxStars}">★ ${stars} / ${maxStars}</span>`
            : `<span class="chapter__badge-lock" aria-hidden="true">${icon.lock}</span>`
        }
      </div>
      <div class="chapter__body">
        <div class="chapter__head">
          <h2 class="chapter__name">${esc(chapter.name)}</h2>
          <span class="chapter__meta">已過 ${clearedInChapter} / ${levels.length} 關</span>
        </div>
        <p class="chapter__blurb">${esc(chapter.blurb)}</p>
        <div class="chapter__levels">
          ${levels.map((level) => levelButtonHtml(level, currentLevelId, ctx)).join('')}
        </div>
      </div>
    </section>
  `;
}

interface SectionOptions {
  key: 'basic' | 'advanced';
  title: string;
  subtitle: string;
  badge?: string;
  entries: ChapterEntry[];
  currentLevelId: number;
  ctx: AppContext;
}

function sectionHtml(options: SectionOptions): string {
  const { key, title, subtitle, badge, entries, currentLevelId, ctx } = options;
  return `
    <section class="map__section map__section--${key}" data-testid="map-section-${key}">
      <div class="map__section-head">
        <h2 class="map__section-title">${esc(title)}</h2>
        ${badge ? `<span class="badge badge--pink map__section-badge">${icon.sparkle} ${esc(badge)}</span>` : ''}
        <p class="map__section-sub">${esc(subtitle)}</p>
      </div>
      <div class="map__list">
        ${entries.map((entry) => chapterHtml(entry, currentLevelId, ctx)).join('')}
      </div>
    </section>
  `;
}

function rangeSubtitle(entries: ChapterEntry[]): string {
  if (entries.length === 0) return '';
  const first = entries[0];
  const last = entries[entries.length - 1];
  const from = first.chapter.id;
  const to = last.chapter.id;
  return `第 ${from}–${to} 章 · ${first.chapter.name} → ${last.chapter.name}`;
}

/**
 * 場景動畫 lazy：所有章節 SVG 先標 `.is-static`（cats.css 會停環境動畫），
 * 只有進入 viewport 附近嘅章節先移除，避免手機一次過 animate 20 個場景。
 */
function setupSceneLazy(root: HTMLElement): () => void {
  const svgs = Array.from(root.querySelectorAll<SVGElement>('.chapter__scene > svg'));
  for (const svg of svgs) svg.classList.add('is-static');

  if (typeof IntersectionObserver === 'undefined') {
    for (const svg of svgs) svg.classList.remove('is-static');
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // 未解鎖章節保持 static（少啲動畫節點，鎖定章節本身都冇互動）
        if (entry.target.classList.contains('chapter--locked')) continue;
        const svg = entry.target.querySelector<SVGElement>('.chapter__scene > svg');
        if (!svg) continue;
        svg.classList.toggle('is-static', !entry.isIntersecting);
      }
    },
    // rootMargin 0 + threshold 0.12：只為真正露面嘅章節開動畫，減少同時 animate 嘅場景數
    { root: null, rootMargin: '0px 0px', threshold: 0.12 },
  );
  for (const chapterEl of root.querySelectorAll<HTMLElement>('.chapter:not(.chapter--locked)')) {
    observer.observe(chapterEl);
  }
  return () => observer.disconnect();
}

export function createMapScreen(ctx: AppContext): Screen {
  const grouped = groupLevels(ctx);
  const currentLevelId = findCurrentLevelId(ctx);
  const chapters = [...ctx.chapters].sort((a, b) => a.id - b.id);
  const entries: ChapterEntry[] = chapters.map((chapter) => ({
    chapter,
    levels: grouped.get(chapter.id) ?? [],
  }));
  const basicEntries = entries.filter((entry) => entry.chapter.id <= BASIC_CHAPTER_MAX);
  const advancedEntries = entries.filter((entry) => entry.chapter.id > BASIC_CHAPTER_MAX);
  const stars = totalStars(ctx.save);
  const maxStars = ctx.levels.length * 3;
  const currentChapter =
    ctx.levels.find((level) => level.id === currentLevelId)?.chapter ?? chapters[0]?.id;

  const sceneCountLabel = `${zhNumber(ctx.chapters.length)}個場景`;
  const levelCountLabel = `${ctx.levels.length} 個關卡`;

  let sceneLazyCleanup: () => void = () => undefined;
  let scrollFrame = 0;

  const el = fromHtml(`
    <main class="screen map" data-testid="map-screen" data-chapter-count="${
      ctx.chapters.length
    }" data-level-count="${ctx.levels.length}">
      <header class="topbar">
        <button type="button" class="icon-btn" data-testid="map-back" aria-label="返回首頁">
          ${icon.back}
        </button>
        <h1 class="topbar__title">成語地圖</h1>
        <div class="topbar__side">
          <span class="badge badge--gold" data-testid="map-stars-total" aria-label="總星數 ${stars} / ${maxStars}">
            ★ ${stars} / ${maxStars}
          </span>
        </div>
      </header>
      <div class="map__intro">
        <p>${sceneCountLabel}、${levelCountLabel}，等住你同貓貓一齊探索喵～</p>
      </div>
      ${
        basicEntries.length > 0
          ? sectionHtml({
              key: 'basic',
              title: '基礎篇',
              subtitle: rangeSubtitle(basicEntries),
              entries: basicEntries,
              currentLevelId,
              ctx,
            })
          : ''
      }
      ${
        advancedEntries.length > 0
          ? sectionHtml({
              key: 'advanced',
              title: '進階篇',
              subtitle: rangeSubtitle(advancedEntries),
              badge: '進階',
              entries: advancedEntries,
              currentLevelId,
              ctx,
            })
          : ''
      }
    </main>
  `);

  qs<HTMLButtonElement>(el, '[data-testid="map-back"]').addEventListener('click', () => {
    playSfx(ctx, 'click');
    navigate(ROUTE_HOME);
  });

  el.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-level-id]');
    if (!target) return;
    const levelId = Number(target.dataset.levelId);
    if (!Number.isInteger(levelId)) return;
    if (!isLevelUnlocked(ctx.save, levelId)) {
      playSfx(ctx, 'click');
      showToast('呢關仲未解鎖喎，完成前一關先啦喵～', { tone: 'warn' });
      return;
    }
    playSfx(ctx, 'click');
    navigate(routeGame(levelId));
  });

  // 場景 lazy：入 DOM 後先開 observer（初始全部 is-static）
  sceneLazyCleanup = setupSceneLazy(el);

  // 自動捲到當前章（包括進階篇第 11–20 章）
  scrollFrame = requestAnimationFrame(() => {
    const chapterEl = el.querySelector<HTMLElement>(`[data-testid="chapter-${currentChapter}"]`);
    chapterEl?.scrollIntoView({ block: 'center', behavior: scrollBehavior(ctx) });
  });

  return {
    el,
    destroy() {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      sceneLazyCleanup();
    },
  };
}
