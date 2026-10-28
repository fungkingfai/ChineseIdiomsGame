import type { AppContext } from './core/context';

/**
 * UI 入口（ui-dev 擁有，會由 placeholder 改寫為完整 App）。
 * 合約：main.ts 會呼叫 mountApp(root, ctx)；UI 自行用 hash router 管理畫面。
 */
export function mountApp(root: HTMLElement, ctx: AppContext): void {
  root.innerHTML = `
    <main class="boot-placeholder">
      <h1>貓咪成語大冒險</h1>
      <p>載入中……（UI 建置中）</p>
      <p class="boot-hint">目前載入 ${ctx.levels.length} 關、${ctx.idioms.length} 條成語。</p>
    </main>
  `;
}
