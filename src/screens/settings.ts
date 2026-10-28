/** 設定：音效、減少動態效果、重置進度（二次確認）、版本／credit。 */

import type { AppContext } from '../core/context';
import { resetProgress } from '../core/progress';
import { navigate, ROUTE_HOME } from '../router';
import { catSVG } from '../cats/catAssets';
import { fromHtml, qs } from '../ui/dom';
import { icon } from '../ui/icons';
import { confirmDialog, type OverlayHandle } from '../ui/modal';
import {
  applyMotionPreference,
  setReducedMotionEnabled,
  setSoundEnabled,
} from '../ui/prefs';
import type { Screen } from '../ui/screen';
import { showToast } from '../ui/toast';

export function createSettingsScreen(ctx: AppContext): Screen {
  let confirmHandle: OverlayHandle | null = null;
  const soundOn = ctx.save.settings.sound;
  const motionOn = ctx.save.settings.reducedMotion;

  const el = fromHtml(`
    <main class="screen settings" data-testid="settings-screen">
      <header class="topbar">
        <button type="button" class="icon-btn" data-testid="settings-back" aria-label="返回首頁">
          ${icon.back}
        </button>
        <h1 class="topbar__title">設定</h1>
        <div class="topbar__side"></div>
      </header>
      <div class="settings__wrap">
        <section class="card settings__card card--paper" aria-label="遊戲設定">
          <div class="setting-row">
            <div class="setting-row__label">
              <h2>音效</h2>
              <p>貓貓叫聲、放字、提示同過關音樂（用 WebAudio 即時合成）。</p>
            </div>
            <label class="switch">
              <input type="checkbox" data-testid="settings-sound" ${
                soundOn ? 'checked' : ''
              } aria-label="音效開關" />
              <span class="switch__track" aria-hidden="true"></span>
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-row__label">
              <h2>減少動態效果</h2>
              <p>關閉櫻花花瓣、彈跳、彩紙同平滑捲動，適合容易暈浪嘅貓奴喵。</p>
            </div>
            <label class="switch">
              <input type="checkbox" data-testid="settings-motion" ${
                motionOn ? 'checked' : ''
              } aria-label="減少動態效果開關" />
              <span class="switch__track" aria-hidden="true"></span>
            </label>
          </div>
          <div class="setting-row setting-row--danger">
            <div class="setting-row__label">
              <h2>重置進度</h2>
              <p>清除晒所有星星、已過關卡同成語圖鑑收藏，冇得返轉頭喵。</p>
            </div>
            <button type="button" class="btn btn--danger btn--sm" data-testid="settings-reset">
              ${icon.trash} 重置進度
            </button>
          </div>
        </section>

        <section class="card settings__about card--paper" aria-label="關於">
          <h2>關於貓貓</h2>
          <div class="settings__cats" aria-hidden="true">
            ${catSVG('amo', 'wink', { size: 68 })}
            ${catSVG('dango', 'happy', { size: 68 })}
          </div>
          <p>《貓咪成語大冒險》— 跟住店長貓阿墨同小貓糰子，透過成語填字同接龍，收集一百關嘅成語靈珠。</p>
          <p>所有資料同音效都喺你部機度產生，唔會連去任何伺服器，搭地鐵冇網絡都玩到喵。</p>
          <div class="settings__version">
            <span class="badge badge--gold">v1.0.1</span>
            <span class="badge badge--muted">單機 · 離線可玩</span>
          </div>
          <p class="credit">貓貓角色：阿墨（黑貓店長）· 糰子（橘虎斑）｜由 DSH Agent Team 用愛心同成語整成。</p>
        </section>
      </div>
    </main>
  `);

  const soundInput = qs<HTMLInputElement>(el, '[data-testid="settings-sound"]');
  const motionInput = qs<HTMLInputElement>(el, '[data-testid="settings-motion"]');

  soundInput.addEventListener('change', () => {
    setSoundEnabled(ctx, soundInput.checked);
    if (soundInput.checked) ctx.audio.play('click');
    showToast(soundInput.checked ? '音效開咗喇喵～' : '音效熄咗喇喵～', {
      tone: soundInput.checked ? 'success' : 'info',
    });
  });

  motionInput.addEventListener('change', () => {
    setReducedMotionEnabled(ctx, motionInput.checked);
    showToast(
      motionInput.checked ? '已減少動態效果，耳仔舒服啲喵～' : '動態效果返嚟喇喵～',
      { tone: 'success' },
    );
  });

  qs<HTMLButtonElement>(el, '[data-testid="settings-reset"]').addEventListener('click', () => {
    ctx.audio.play('click');
    confirmHandle?.close();
    confirmHandle = confirmDialog({
      title: '重置所有進度？',
      message: '所有星星、已過關卡同成語圖鑑收藏都會清空，冇得返轉頭喵。你真係確定？',
      confirmLabel: '確定重置',
      cancelLabel: '唔好住',
      confirmTestId: 'reset-confirm',
      cancelTestId: 'reset-cancel',
      danger: true,
      onConfirm: () => {
        const fresh = resetProgress();
        Object.assign(ctx.save, fresh);
        ctx.persist();
        ctx.audio.setEnabled(fresh.settings.sound);
        applyMotionPreference(ctx);
        soundInput.checked = fresh.settings.sound;
        motionInput.checked = fresh.settings.reducedMotion;
        showToast('進度已重置，返首頁開始新冒險喵！', { tone: 'success' });
        confirmHandle = null;
      },
    });
    confirmHandle.el.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('[data-cancel], [data-confirm]')) {
        confirmHandle = null;
      }
    });
  });

  qs<HTMLButtonElement>(el, '[data-testid="settings-back"]').addEventListener('click', () => {
    ctx.audio.play('click');
    navigate(ROUTE_HOME);
  });

  return {
    el,
    destroy() {
      confirmHandle?.close();
      confirmHandle = null;
    },
  };
}
