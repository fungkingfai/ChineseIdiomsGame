/** 新手教學 overlay（第一次入 Level 1 時顯示）。 */

import type { AppContext } from '../core/context';
import { catSVG } from '../cats/catAssets';
import { icon } from '../ui/icons';
import { openOverlay, type OverlayHandle } from '../ui/modal';
import { playSfx } from '../ui/prefs';

export function openTutorialOverlay(ctx: AppContext, onDone: () => void): OverlayHandle {
  const handle = openOverlay({
    testId: 'tutorial-overlay',
    ariaLabel: '新手教學：點樣玩《貓咪成語大冒險》',
    dismissible: false,
    content: `
      <div class="tutorial">
        <div class="tutorial__cats" aria-hidden="true">
          ${catSVG('amo', 'happy', { size: 112 })}
          ${catSVG('dango', 'wink', { size: 98 })}
        </div>
        <h2 class="tutorial__title">點樣玩喵？</h2>
        <p class="tutorial__sub">阿墨同糰子會教你三個步驟，好簡單㗎喵～</p>
        <ol class="tutorial__steps">
          <li class="tutorial__step">
            <span class="tutorial__num" aria-hidden="true">1</span>
            <span class="tutorial__text">點棋盤上面嘅<b>空格</b>，再點下面字庫嘅<b>字卡</b>放字。</span>
          </li>
          <li class="tutorial__step">
            <span class="tutorial__num" aria-hidden="true">2</span>
            <span class="tutorial__text">一個成語填晒就會自動檢查：啱晒會<b>變綠鎖定</b>，錯咗會清空再嚟過。</span>
          </li>
          <li class="tutorial__step">
            <span class="tutorial__num" aria-hidden="true">3</span>
            <span class="tutorial__text">唔識可以用<b>提示</b>偷睇一個字，不過會少一粒星喵。</span>
          </li>
        </ol>
        <button type="button" class="btn btn--primary btn--lg btn--wide" data-testid="tutorial-ok">
          ${icon.paw} 明白喇，開始玩！
        </button>
      </div>
    `,
  });

  handle.el.querySelector('[data-testid="tutorial-ok"]')?.addEventListener('click', () => {
    playSfx(ctx, 'click');
    handle.close();
    onDone();
  });

  return handle;
}
