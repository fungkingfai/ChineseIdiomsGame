/** 章節故事 intro overlay（每章第一次入關卡時顯示）。 */

import type { AppContext } from '../core/context';
import type { Chapter, Level } from '../core/types';
import { catSVG } from '../cats/catAssets';
import { chapterSceneSVG } from '../cats/scenes';
import { esc } from '../ui/dom';
import { icon } from '../ui/icons';
import { openOverlay, type OverlayHandle } from '../ui/modal';
import { playSfx } from '../ui/prefs';

export function openChapterIntroOverlay(
  ctx: AppContext,
  chapter: Chapter,
  level: Level,
  onDone: () => void,
): OverlayHandle {
  const isAdvanced = chapter.id > 10;
  const handle = openOverlay({
    testId: 'chapter-intro',
    ariaLabel: `第 ${chapter.id} 章：${chapter.name}`,
    dismissible: false,
    flush: true,
    content: `
      <div class="chapter-intro">
        <div class="chapter-intro__scene">
          ${chapterSceneSVG(chapter.scene)}
          <span class="chapter-intro__badge${isAdvanced ? ' chapter-intro__badge--advanced' : ''}">第 ${chapter.id} 章${isAdvanced ? ' · 進階篇' : ''}</span>
        </div>
        <div class="chapter-intro__body">
          <h2 class="chapter-intro__name">${esc(chapter.name)}</h2>
          <p class="chapter-intro__blurb">${esc(chapter.blurb)}</p>
          <div class="chapter-intro__story">
            <div class="chapter-intro__story-cat" aria-hidden="true">
              ${catSVG('dango', 'think', { size: 54 })}
            </div>
            <p>${esc(level.story)}</p>
          </div>
          <button type="button" class="btn btn--primary btn--lg btn--wide" data-testid="chapter-intro-ok">
            ${icon.paw} 出發去第 ${level.id} 關！
          </button>
        </div>
      </div>
    `,
  });

  handle.el.querySelector('[data-testid="chapter-intro-ok"]')?.addEventListener('click', () => {
    playSfx(ctx, 'click');
    handle.close();
    onDone();
  });

  return handle;
}
