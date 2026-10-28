/** 成語地圖：10 章 × 每章關卡，章節場景、星星、鎖定狀態，自動捲到當前章。 */

import type { AppContext } from '../core/context';
import type { Chapter, Level } from '../core/types';
import {
  clearedRecord,
  isLevelUnlocked,
  totalStars,
} from '../core/progress';
import { navigate, ROUTE_HOME, routeGame } from '../router';
import { chapterSceneSVG } from '../cats/scenes';
import { esc, fromHtml, qs } from '../ui/dom';
import { icon } from '../ui/icons';
import { playSfx, scrollBehavior } from '../ui/prefs';
import { starGlyphs } from '../ui/stars';
import { showToast } from '../ui/toast';
import type { Screen } from '../ui/screen';

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
    }" aria-label="第 ${level.id} 關 ${esc(level.title)}，${statusLabel}">
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
  chapter: Chapter,
  chapterLevels: Level[],
  currentLevelId: number,
  ctx: AppContext,
): string {
  const unlocked = chapterLevels.some((level) => isLevelUnlocked(ctx.save, level.id));
  const clearedInChapter = chapterLevels.filter(
    (level) => (clearedRecord(ctx.save, level.id)?.stars ?? 0) > 0,
  ).length;
  const stars = chapterStars(chapterLevels, ctx);
  const maxStars = chapterLevels.length * 3;

  return `
    <section class="chapter card${unlocked ? '' : ' chapter--locked'}" data-testid="chapter-${
      chapter.id
    }" data-chapter-id="${chapter.id}">
      <div class="chapter__scene">
        ${chapterSceneSVG(chapter.scene)}
        <span class="chapter__scene-badge">第 ${chapter.id} 章</span>
        ${
          unlocked
            ? `<span class="chapter__scene-stars" aria-label="章節星數 ${stars} / ${maxStars}">★ ${stars} / ${maxStars}</span>`
            : `<span class="chapter__badge-lock" aria-hidden="true">${icon.lock}</span>`
        }
      </div>
      <div class="chapter__body">
        <div class="chapter__head">
          <h2 class="chapter__name">${esc(chapter.name)}</h2>
          <span class="chapter__meta">已過 ${clearedInChapter} / ${chapterLevels.length} 關</span>
        </div>
        <p class="chapter__blurb">${esc(chapter.blurb)}</p>
        <div class="chapter__levels">
          ${chapterLevels.map((level) => levelButtonHtml(level, currentLevelId, ctx)).join('')}
        </div>
      </div>
    </section>
  `;
}

export function createMapScreen(ctx: AppContext): Screen {
  const grouped = groupLevels(ctx);
  const currentLevelId = findCurrentLevelId(ctx);
  const chapters = [...ctx.chapters].sort((a, b) => a.id - b.id);
  const stars = totalStars(ctx.save);
  const maxStars = ctx.levels.length * 3;
  const currentChapter =
    ctx.levels.find((level) => level.id === currentLevelId)?.chapter ?? chapters[0]?.id;

  const el = fromHtml(`
    <main class="screen map" data-testid="map-screen">
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
        <p>十個和風場景、${ctx.levels.length} 個關卡，等住你同貓貓一齊探索喵～</p>
      </div>
      <div class="map__list">
        ${chapters
          .map((chapter) => chapterHtml(chapter, grouped.get(chapter.id) ?? [], currentLevelId, ctx))
          .join('')}
      </div>
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

  // 自動捲到當前章
  const scrollRoot = el;
  requestAnimationFrame(() => {
    const chapterEl = scrollRoot.querySelector<HTMLElement>(
      `[data-testid="chapter-${currentChapter}"]`,
    );
    chapterEl?.scrollIntoView({ block: 'center', behavior: scrollBehavior(ctx) });
  });

  return {
    el,
    destroy() {
      /* 捲動唔需要清理 */
    },
  };
}
