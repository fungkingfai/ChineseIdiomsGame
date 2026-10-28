/**
 * UI 入口：app shell + hash router + 全域事件（audio 解鎖、skip link）。
 * main.ts 呼叫 mountApp(root, ctx)；所有 screen 喺 router 切換時銷毀／重建。
 */

import type { AppContext } from './core/context';
import { isLevelUnlocked } from './core/progress';
import { replaceRoute, Router, ROUTE_MAP, type Route } from './router';
import { createHomeScreen } from './screens/home';
import { createMapScreen } from './screens/map';
import { createGameScreen } from './screens/game';
import { createCodexScreen } from './screens/codex';
import { createSettingsScreen } from './screens/settings';
import { fromHtml, qs } from './ui/dom';
import { closeAllOverlays, setOverlayRoot } from './ui/modal';
import { applyMotionPreference } from './ui/prefs';
import type { Screen } from './ui/screen';
import { clearToasts, setToastRoot, showToast } from './ui/toast';

const APP_TITLE = '貓咪成語大冒險';

const SHELL_HTML = `
  <div class="app">
    <div class="app-bg" aria-hidden="true">
      <span class="bg-blob bg-blob--pink"></span>
      <span class="bg-blob bg-blob--jade"></span>
      <span class="bg-hill"></span>
    </div>
    <a class="skip-link" href="#screen-root" data-skip-link>跳去主要內容</a>
    <div id="screen-root" class="screen-root" tabindex="-1"></div>
    <div id="overlay-root" class="overlay-root"></div>
    <div id="toast-root" class="toast-root" role="status" aria-live="polite" aria-atomic="true"></div>
  </div>
`;

export function mountApp(root: HTMLElement, ctx: AppContext): void {
  root.replaceChildren(fromHtml(SHELL_HTML));

  const screenRoot = qs<HTMLElement>(root, '#screen-root');
  const overlayRoot = qs<HTMLElement>(root, '#overlay-root');
  const toastRoot = qs<HTMLElement>(root, '#toast-root');
  setOverlayRoot(overlayRoot);
  setToastRoot(toastRoot);

  applyMotionPreference(ctx);

  let current: Screen | null = null;

  function setDocumentTitle(route: Route, extra?: string): void {
    switch (route.name) {
      case 'home':
        document.title = `${APP_TITLE} · 貓貓成語填字接龍`;
        break;
      case 'map':
        document.title = `成語地圖 · ${APP_TITLE}`;
        break;
      case 'codex':
        document.title = `成語圖鑑 · ${APP_TITLE}`;
        break;
      case 'settings':
        document.title = `設定 · ${APP_TITLE}`;
        break;
      case 'game':
        document.title = `${extra ?? '遊戲'} · ${APP_TITLE}`;
        break;
    }
  }

  function mountScreen(next: Screen): void {
    current = next;
    screenRoot.replaceChildren(next.el);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderRoute(route: Route): void {
    // 先清乾淨上一個 screen（timer / listener / overlay / toast）
    closeAllOverlays();
    clearToasts();
    if (current) {
      current.destroy();
      current = null;
    }
    screenRoot.replaceChildren();

    switch (route.name) {
      case 'home':
        setDocumentTitle(route);
        mountScreen(createHomeScreen(ctx));
        break;
      case 'map':
        setDocumentTitle(route);
        mountScreen(createMapScreen(ctx));
        break;
      case 'codex':
        setDocumentTitle(route);
        mountScreen(createCodexScreen(ctx));
        break;
      case 'settings':
        setDocumentTitle(route);
        mountScreen(createSettingsScreen(ctx));
        break;
      case 'game': {
        const level = ctx.levels.find((item) => item.id === route.levelId);
        // 先轉地圖、後出 toast：renderRoute 開頭會 clearToasts()，
        // 倒轉次序會令 deep link 提示永遠未畫出嚟。
        if (!level) {
          replaceRoute(ROUTE_MAP);
          showToast('搵唔到呢一關喎，帶你返地圖喵～', { tone: 'warn' });
          return;
        }
        if (!isLevelUnlocked(ctx.save, level.id)) {
          replaceRoute(ROUTE_MAP);
          showToast('呢關仲未解鎖喎，完成前一關先啦喵～', { tone: 'warn' });
          return;
        }
        setDocumentTitle(route, level.title);
        mountScreen(createGameScreen(ctx, level));
        break;
      }
    }
  }

  const router = new Router(renderRoute);
  router.start();

  // 首次使用者手勢解鎖 WebAudio
  const unlockAudio = (): void => {
    ctx.audio.init();
    window.removeEventListener('pointerdown', unlockAudio, true);
    window.removeEventListener('keydown', unlockAudio, true);
  };
  window.addEventListener('pointerdown', unlockAudio, true);
  window.addEventListener('keydown', unlockAudio, true);

  // skip link：避免改 hash 觸發 router，直接 focus main
  const skipLink = qs<HTMLAnchorElement>(root, '[data-skip-link]');
  skipLink.addEventListener('click', (event) => {
    event.preventDefault();
    const main = screenRoot.querySelector<HTMLElement>('main');
    if (main) {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    } else {
      screenRoot.focus({ preventScroll: true });
    }
  });
}
