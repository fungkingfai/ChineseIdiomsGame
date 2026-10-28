#!/usr/bin/env node
/**
 * E2E runner（Playwright Chromium）：桌面 1280×800 ＋ 手機 390×844。
 *
 * 流程：
 *   1. npm run build（E2E_SKIP_BUILD=1 可略過）
 *   2. 子進程 vite preview --port 4390 --strictPort（測試完自動 kill）
 *   3. 每個 viewport 開獨立 browser context，跑 e2e/specs.mjs 全流程
 *   4. 自動截圖到 screenshots/（home/map/game/result/codex/settings × desktop/mobile 等）
 *   5. 加總結果；任何 console error／pageerror＝失敗
 *
 * 用法：
 *   npm run test:e2e
 *   E2E_HEADED=1 npm run test:e2e        # 有頭瀏覽器（debug 用）
 *   E2E_ONLY=desktop npm run test:e2e    # 只跑桌面
 *   E2E_ONLY=mobile npm run test:e2e     # 只跑手機
 *   E2E_SKIP_BUILD=1 npm run test:e2e    # 唔重新 build（用現有 dist）
 */
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import {
  PROJECT_ROOT,
  Reporter,
  collectPageErrors,
  runBuild,
  sleep,
  startPreviewServer,
} from './lib.mjs';
import { runSuite } from './specs.mjs';

const VIEWPORTS = [
  {
    label: 'desktop',
    width: 1280,
    height: 800,
    context: { viewport: { width: 1280, height: 800 } },
  },
  {
    label: 'mobile',
    width: 390,
    height: 844,
    context: {
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    },
  },
];

async function runViewport(browser, reporter, viewportConfig) {
  const { label, context: contextOptions } = viewportConfig;
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  page.setDefaultTimeout(10_000);
  const errors = collectPageErrors(page);
  const result = { label, ok: true, error: null };
  try {
    await runSuite({
      page,
      errors,
      reporter,
      label,
      isMobile: label === 'mobile',
    });
  } catch (error) {
    result.ok = false;
    result.error = error instanceof Error ? error.message : String(error);
    console.log('');
    console.log(`  ⚠ ${label} 流程中止：${result.error.split('\n')[0]}`);
    if (errors.errors.length > 0) {
      console.log(`  ⚠ ${label} 期間收集到 ${errors.errors.length} 個 console／page error：`);
      for (const message of errors.errors.slice(0, 12)) console.log(`      ${message}`);
    }
    try {
      await page.screenshot({ path: `screenshots/failure-${label}.png`, fullPage: false });
    } catch {
      /* 截圖失敗不影響結果 */
    }
  } finally {
    await context.close().catch(() => {});
  }
  return result;
}

/** 清走上次失敗遺留嘅 failure-*.png（避免污染 screenshots/ 清單） */
function clearStaleFailureShots() {
  const dir = resolve(PROJECT_ROOT, 'screenshots');
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (name.startsWith('failure-') && name.endsWith('.png')) {
      rmSync(resolve(dir, name), { force: true });
    }
  }
}

async function main() {
  clearStaleFailureShots();
  const reporter = new Reporter();
  const results = [];
  let server = null;
  let browser = null;
  let cleanupDone = false;

  async function cleanup() {
    if (cleanupDone) return;
    cleanupDone = true;
    if (browser) await browser.close().catch(() => {});
    if (server) await server.stop().catch(() => {});
  }

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      console.log(`\n收到 ${signal}，清理 server／browser …`);
      cleanup().finally(() => process.exit(130));
    });
  }

  try {
    console.log('');
    console.log('════════════════════════════════════════════════════════════');
    console.log('《貓咪成語大冒險》E2E（Playwright Chromium）');
    console.log('════════════════════════════════════════════════════════════');
    runBuild();
    server = await startPreviewServer();

    const only = (process.env.E2E_ONLY ?? 'both').toLowerCase();
    const selected = VIEWPORTS.filter((item) => only === 'both' || item.label === only);
    if (selected.length === 0) throw new Error(`E2E_ONLY 只支援 desktop / mobile / both，實際：${only}`);

    browser = await chromium.launch({
      headless: process.env.E2E_HEADED !== '1',
    });
    console.log(`  ✓ Chromium 已啟動（${process.env.E2E_HEADED === '1' ? '有頭' : 'headless'}）`);

    for (const viewportConfig of selected) {
      results.push(await runViewport(browser, reporter, viewportConfig));
      await sleep(150);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('');
    console.error(`❌ E2E runner 失敗：${message}`);
    reporter.failed.push({ name: 'runner', ms: 0, message, stack: error instanceof Error ? error.stack : undefined });
  } finally {
    await cleanup();
  }

  const summary = reporter.printSummary();
  const aborted = results.filter((item) => !item.ok);
  if (aborted.length > 0) {
    console.log(`流程中止：${aborted.map((item) => item.label).join('、')}`);
  }
  if (!summary.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`❌ E2E 未預期錯誤：${error instanceof Error ? error.stack : error}`);
  process.exitCode = 1;
});
