/** 首頁：貓貓 hero、主 CTA、進度、圖鑑／設定入口。 */

import type { AppContext } from '../core/context';
import { clearedCount, nextPlayableLevel, totalStars } from '../core/progress';
import { navigate, ROUTE_CODEX, ROUTE_MAP, ROUTE_SETTINGS, routeGame } from '../router';
import { catSVG } from '../cats/catAssets';
import { spawnPetals } from '../cats/animate';
import { chapterSceneSVG } from '../cats/scenes';
import { fromHtml, qs } from '../ui/dom';
import { icon } from '../ui/icons';
import { effectiveReducedMotion, playSfx } from '../ui/prefs';
import { progressHtml } from '../ui/progress';
import type { Screen } from '../ui/screen';

const HERO_LINES = [
  '今日都一齊嚟收集成語靈珠喵～',
  '阿墨話，識多啲成語就會變聰明啲喵！',
  '準備好未？我哋出發去櫻花小徑啦喵～',
];

export function createHomeScreen(ctx: AppContext): Screen {
  const totalLevels = ctx.levels.length;
  const stars = totalStars(ctx.save);
  const cleared = clearedCount(ctx.save);
  const next = nextPlayableLevel(ctx.save, totalLevels);
  const percent = totalLevels > 0 ? stars / (totalLevels * 3) : 0;
  const started = cleared > 0;
  // Issue #2：20 章／200 關之後換成進階篇文案（資料未 ready 時保持舊文案）
  const scenePhrase = ctx.chapters.length >= 20 ? '二十個和風／奇幻場景' : '十個和風庭園';
  const levelPhrase = ctx.levels.length >= 200 ? '二百關' : '一百關';
  const heroLine = HERO_LINES[Math.floor(Math.random() * HERO_LINES.length)];

  const el = fromHtml(`
    <main class="screen home" data-testid="home-screen">
      <div class="home__layout">
        <section class="home__hero" aria-label="店長貓阿墨同小貓糰子喺櫻花庭園等你">
          <div class="home__hero-art" aria-hidden="true">
            <div class="home__scene">${chapterSceneSVG('garden')}</div>
            <span class="home__paw-trail"><span></span><span></span><span></span></span>
          </div>
          <p class="home__bubble">${heroLine}</p>
          <div class="home__cats">
            <div class="home__cat home__cat--amo">${catSVG('amo', 'happy', { className: 'cat-hero-amo' })}</div>
            <div class="home__cat home__cat--dango">${catSVG('dango', 'wink', { className: 'cat-hero-dango' })}</div>
          </div>
        </section>
        <section class="home__panel">
          <div>
            <p class="kicker kicker--pink">${icon.paw} 喵～歡迎嚟到</p>
            <h1 class="home__title">貓咪成語<span class="home__title-accent">大冒險</span></h1>
            <p class="home__tagline">跟住店長貓阿墨同小貓糰子，喺${scenePhrase}收集成語靈珠，一齊挑戰${levelPhrase}喵。</p>
          </div>
          <div class="home__progress card card--paper" data-testid="home-progress">
            <div class="home__progress-head">
              <span class="home__progress-title">${icon.star} 冒險進度</span>
              <span class="badge badge--gold">已過 ${cleared} / ${totalLevels} 關</span>
            </div>
            ${progressHtml({ value: percent, ariaLabel: `總星數進度 ${stars} / ${totalLevels * 3}` })}
            <div class="home__progress-stats">
              <span>總星數 <strong>${stars}</strong> / ${totalLevels * 3}</span>
              <span>下一站 <strong>第 ${next} 關</strong></span>
            </div>
          </div>
          <div class="home__actions">
            <button type="button" class="btn btn--pink btn--lg" data-testid="home-continue">
              ${icon.paw}<span>${started ? `繼續第 ${next} 關` : '開始第 1 關'}</span>
            </button>
            <button type="button" class="btn btn--ghost btn--lg" data-testid="home-start">
              ${icon.map}<span>開始冒險</span>
            </button>
            <div class="home__links">
              <button type="button" class="btn btn--soft" data-testid="home-codex">
                ${icon.book}<span>成語圖鑑</span>
              </button>
              <button type="button" class="btn btn--soft" data-testid="home-settings">
                ${icon.settings}<span>設定</span>
              </button>
            </div>
          </div>
          <p class="home__credit">v1.1.0 · 貓貓製作 · 100% 離線可玩</p>
        </section>
      </div>
    </main>
  `);

  const go = (hash: string): void => {
    playSfx(ctx, 'click');
    navigate(hash);
  };

  qs<HTMLButtonElement>(el, '[data-testid="home-continue"]').addEventListener('click', () => {
    go(routeGame(next));
  });
  qs<HTMLButtonElement>(el, '[data-testid="home-start"]').addEventListener('click', () => {
    go(ROUTE_MAP);
  });
  qs<HTMLButtonElement>(el, '[data-testid="home-codex"]').addEventListener('click', () => {
    go(ROUTE_CODEX);
  });
  qs<HTMLButtonElement>(el, '[data-testid="home-settings"]').addEventListener('click', () => {
    go(ROUTE_SETTINGS);
  });

  const hero = qs<HTMLElement>(el, '.home__hero');
  if (!effectiveReducedMotion(ctx)) spawnPetals(hero, 12);

  return {
    el,
    destroy() {
      /* 冇 timer / listener 需要清 */
    },
  };
}
