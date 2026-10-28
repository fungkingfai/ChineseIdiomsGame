/**
 * E2E 共用工具：build、preview server、Playwright 輔助、截圖、錯誤收集、結果報告。
 * 由 e2e/run.mjs 及 e2e/specs.mjs 使用。
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const E2E_DIR = dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = resolve(E2E_DIR, '..');
export const PORT = Number(process.env.E2E_PORT ?? 4390);
export const BASE_URL = `http://127.0.0.1:${PORT}`;
export const SCREENSHOT_DIR = resolve(PROJECT_ROOT, 'screenshots');
export const SAVE_KEY = 'cat-idioms-save-v1';

export const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/* ------------------------------------------------------------------ */
/* 截圖                                                                */
/* ------------------------------------------------------------------ */
export function ensureScreenshotDir() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

/** 儲存截圖；名稱自動加 viewport 後綴（由 spec 提供完整 name） */
export async function screenshot(page, name, options = {}) {
  ensureScreenshotDir();
  const path = resolve(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path, fullPage: options.fullPage === true, animations: 'disabled' });
  return path;
}

/* ------------------------------------------------------------------ */
/* Build + preview server                                              */
/* ------------------------------------------------------------------ */
export function runBuild() {
  if (process.env.E2E_SKIP_BUILD === '1') {
    console.log('• E2E_SKIP_BUILD=1：略過 npm run build（使用現有 dist/）');
    return;
  }
  console.log('• 執行 npm run build …');
  const started = Date.now();
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(npm, ['run', 'build'], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
    env: { ...process.env, CI: '1' },
  });
  const elapsed = Date.now() - started;
  if (result.status !== 0) {
    const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
    throw new Error(`npm run build 失敗（exit ${result.status}）：\n${output.slice(-4000)}`);
  }
  console.log(`  ✓ build 成功（${elapsed} ms）`);
}

/**
 * 啟動 vite preview 子進程（固定 port 4390，strictPort）。
 * 回傳 { url, stop(), getOutput() }。
 */
export async function startPreviewServer() {
  const viteBin = resolve(PROJECT_ROOT, 'node_modules/.bin/vite');
  const child = spawn(
    viteBin,
    ['preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    { cwd: PROJECT_ROOT, stdio: ['ignore', 'pipe', 'pipe'] },
  );
  let output = '';
  const capture = (chunk) => {
    output += String(chunk);
    if (process.env.E2E_VERBOSE === '1') process.stdout.write(`  [preview] ${chunk}`);
  };
  child.stdout.on('data', capture);
  child.stderr.on('data', capture);
  let exited = false;
  let exitInfo = null;
  child.on('exit', (code, signal) => {
    exited = true;
    exitInfo = { code, signal };
  });

  async function waitReady(timeoutMs = 30_000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      if (exited) {
        throw new Error(
          `vite preview 提早結束（code=${exitInfo?.code}, signal=${exitInfo?.signal}）\n${output.slice(-3000)}`,
        );
      }
      try {
        const response = await fetch(`${BASE_URL}/`, { redirect: 'manual' });
        if (response.status >= 200 && response.status < 400) return;
      } catch {
        /* server 未起身，繼續等 */
      }
      await sleep(150);
    }
    throw new Error(`vite preview 30 秒內未 ready（port ${PORT}）\n${output.slice(-3000)}`);
  }

  async function stop() {
    if (exited) return;
    child.kill('SIGTERM');
    for (let attempt = 0; attempt < 20; attempt += 1) {
      if (exited) return;
      await sleep(100);
    }
    child.kill('SIGKILL');
  }

  await waitReady();
  console.log(`  ✓ vite preview ready：${BASE_URL}`);
  return { url: BASE_URL, stop, getOutput: () => output, child };
}

/* ------------------------------------------------------------------ */
/* 錯誤收集（console error / pageerror / request failed）               */
/* ------------------------------------------------------------------ */
export function collectPageErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[console.error] ${message.text()}`);
  });
  page.on('pageerror', (error) => {
    errors.push(`[pageerror] ${error.message}`);
  });
  page.on('requestfailed', (request) => {
    const failure = request.failure();
    errors.push(`[requestfailed] ${request.url()} — ${failure?.errorText ?? 'unknown'}`);
  });
  return {
    errors,
    reset() {
      errors.length = 0;
    },
    assertClean(label = '') {
      if (errors.length > 0) {
        throw new Error(`${label ? `${label}：` : ''}發現 ${errors.length} 個錯誤\n${errors.join('\n')}`);
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* 斷言輔助                                                            */
/* ------------------------------------------------------------------ */
export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export async function waitForVisible(page, selector, timeout = 8_000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

export async function waitForHidden(page, selector, timeout = 8_000) {
  await page.waitForSelector(selector, { state: 'detached', timeout }).catch(() => {});
}

export async function textOf(page, selector) {
  const text = await page.textContent(selector);
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

export async function innerTextOf(page, selector) {
  const text = await page.locator(selector).innerText();
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

export async function isVisible(page, selector) {
  const locator = page.locator(selector).first();
  if ((await locator.count()) === 0) return false;
  return locator.isVisible().catch(() => false);
}

/** 手機／桌面：檢查頁面冇橫向溢出 */
export async function assertNoHorizontalOverflow(page, label = '') {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
    innerWidth: window.innerWidth,
  }));
  const worst = Math.max(metrics.scrollWidth, metrics.bodyScrollWidth);
  assert(
    worst <= metrics.innerWidth + 1,
    `${label ? `${label}：` : ''}橫向溢出（scrollWidth=${worst} > innerWidth=${metrics.innerWidth}）`,
  );
  return metrics;
}

/**
 * 檢查某個元素（例如 overlay panel）內容冇橫向溢出。
 * 用於手機上「多一行粵拼」後嘅結算卡／圖鑑詳情 layout 回歸。
 */
export async function assertNoHorizontalOverflowIn(page, selector, label = '') {
  const metrics = await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return null;
    return { scrollWidth: element.scrollWidth, clientWidth: element.clientWidth };
  }, selector);
  assert(metrics, `${label ? `${label}：` : ''}搵唔到元素 ${selector}`);
  assert(
    metrics.scrollWidth <= metrics.clientWidth + 1,
    `${label ? `${label}：` : ''}${selector} 橫向溢出（scrollWidth=${metrics.scrollWidth} > clientWidth=${metrics.clientWidth}）`,
  );
  return metrics;
}

/* ------------------------------------------------------------------ */
/* 遊戲畫面操作輔助                                                    */
/* ------------------------------------------------------------------ */
export async function readDebug(page) {
  return page.evaluate(() => {
    const debug = window.__CAT_IDIOM_DEBUG__;
    if (!debug) return null;
    return {
      version: debug.version,
      levelCount: debug.levels.length,
      idiomCount: debug.idioms.length,
      chapterCount: debug.chapters.length,
      save: debug.getSave(),
    };
  });
}

export async function readDebugLevel(page, levelId) {
  return page.evaluate((id) => {
    const debug = window.__CAT_IDIOM_DEBUG__;
    const level = debug?.levels?.find((item) => item.id === id);
    return level ? JSON.parse(JSON.stringify(level)) : null;
  }, levelId);
}

/** 由 localStorage 直接讀存檔（驗證持久化） */
export async function readStoredSave(page) {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, SAVE_KEY);
}

/**
 * 處理首次入關嘅章節故事／新手教學 overlay（可能同時出現）。
 * 會自動截圖 chapter-intro-<label> / tutorial-<label>。
 */
export async function dismissIntroOverlays(page, label) {
  await waitForVisible(page, '[data-testid="game-screen"]');
  // 入場 overlay 喺 90ms 後才出現；等一等，見到就截圖
  await page
    .waitForSelector('[data-testid="chapter-intro"], [data-testid="tutorial-overlay"]', {
      state: 'visible',
      timeout: 3_000,
    })
    .catch(() => {});

  if (await isVisible(page, '[data-testid="chapter-intro"]')) {
    await screenshot(page, `chapter-intro-${label}`);
    await page.click('[data-testid="chapter-intro-ok"]');
    await waitForHidden(page, '[data-testid="chapter-intro"]');
  }
  await page
    .waitForSelector('[data-testid="tutorial-overlay"]', { state: 'visible', timeout: 3_000 })
    .catch(() => {});
  if (await isVisible(page, '[data-testid="tutorial-overlay"]')) {
    await screenshot(page, `tutorial-${label}`);
    await page.click('[data-testid="tutorial-ok"]');
    await waitForHidden(page, '[data-testid="tutorial-overlay"]');
  }
  assert(
    !(await isVisible(page, '[data-testid="chapter-intro"]')) &&
      !(await isVisible(page, '[data-testid="tutorial-overlay"]')),
    'overlay 未能關閉',
  );
}

/** 由 URL hash 取得目前 level id */
export async function currentLevelId(page) {
  return page.evaluate(() => {
    const match = /^#\/game\/(\d+)$/.exec(window.location.hash);
    return match ? Number(match[1]) : 0;
  });
}

/**
 * 用 ?debug=1 嘅正解，真實點擊 cell-<r>-<c> + bank-<index> 完成目前關卡。
 * 回傳 { levelId, level, filled }。
 */
export async function solveCurrentLevel(page) {
  const levelId = await currentLevelId(page);
  assert(levelId > 0, `目前唔係遊戲畫面（hash=${await page.evaluate(() => location.hash)}）`);
  const level = await readDebugLevel(page, levelId);
  assert(level, `debug 資料搵唔到 Level ${levelId}`);

  const solution = new Map();
  for (const cell of level.cells) solution.set(`${cell.r}:${cell.c}`, cell.char);

  const blankKeys = [];
  const seen = new Set();
  for (const slot of level.slots) {
    for (let index = 0; index < 4; index += 1) {
      const r = slot.dir === 'h' ? slot.row : slot.row + index;
      const c = slot.dir === 'h' ? slot.col + index : slot.col;
      const key = `${r}:${c}`;
      if (slot.blanks.includes(index) && !seen.has(key)) {
        seen.add(key);
        blankKeys.push(key);
      }
    }
  }
  assert(blankKeys.length > 0, `Level ${levelId} 冇空格，唔需要填`);

  const usedBank = new Set();
  const plan = [];
  for (const key of blankKeys) {
    const char = solution.get(key);
    assert(char, `Level ${levelId} 空格 ${key} 冇解答字`);
    const bankIndex = level.bank.findIndex((card, index) => card === char && !usedBank.has(index));
    assert(bankIndex >= 0, `Level ${levelId} 字庫冇「${char}」可用字卡`);
    usedBank.add(bankIndex);
    plan.push({ key, char, bankIndex });
  }

  for (const step of plan) {
    const [r, c] = step.key.split(':').map(Number);
    const cellSelector = `[data-testid="cell-${r}-${c}"]`;
    // 遊戲會自動選下一格；如果目標格已被選中，再點會取消選擇 → 最多試 3 次確保選中
    let selected = false;
    for (let attempt = 0; attempt < 3 && !selected; attempt += 1) {
      selected = await page
        .locator(cellSelector)
        .evaluate((el) => el.classList.contains('cell--selected'));
      if (selected) break;
      await page.click(cellSelector);
    }
    assert(selected, `Level ${levelId} 格 ${step.key} 點擊後未被選中`);
    await page.click(`[data-testid="bank-${step.bankIndex}"]`);
    const placed = await page.textContent(`${cellSelector} .cell-char`);
    assert(
      (placed ?? '').trim() === step.char,
      `Level ${levelId} 格 ${step.key} 應放入「${step.char}」，實際「${(placed ?? '').trim()}」`,
    );
  }
  return { levelId, level, filled: plan.length };
}

/** 等過關 overlay（動畫延遲約 700ms） */
export async function waitForResult(page, timeout = 15_000) {
  await page.waitForSelector('[data-testid="result-overlay"]', { state: 'visible', timeout });
  await sleep(350); // 等星星動畫／彩紙穩定先截圖
}

/* ------------------------------------------------------------------ */
/* 報告                                                                */
/* ------------------------------------------------------------------ */
export class Reporter {
  constructor() {
    this.passed = [];
    this.failed = [];
    this.startedAt = Date.now();
  }

  section(title) {
    console.log('');
    console.log(`━━ ${title} ━━`);
  }

  async step(name, fn) {
    const started = Date.now();
    try {
      await fn();
      const elapsed = Date.now() - started;
      this.passed.push({ name, ms: elapsed });
      console.log(`  ✓ ${name}（${elapsed} ms）`);
    } catch (error) {
      const elapsed = Date.now() - started;
      const message = error instanceof Error ? error.message : String(error);
      this.failed.push({ name, ms: elapsed, message, stack: error instanceof Error ? error.stack : undefined });
      console.log(`  ✗ ${name}（${elapsed} ms）`);
      console.log(
        message
          .split('\n')
          .map((line) => `      ${line}`)
          .join('\n'),
      );
      throw error;
    }
  }

  summary() {
    const durationMs = Date.now() - this.startedAt;
    const total = this.passed.length + this.failed.length;
    return {
      total,
      passed: this.passed.length,
      failed: this.failed.length,
      ok: this.failed.length === 0,
      durationMs,
      failures: this.failed,
      steps: this.passed,
    };
  }

  printSummary() {
    const result = this.summary();
    console.log('');
    console.log('════════════════════════════════════════════════════════════');
    console.log(
      `E2E 結果：${result.passed}/${result.total} 通過（${result.failed} 失敗），耗時 ${(result.durationMs / 1000).toFixed(1)}s`,
    );
    if (result.failures.length > 0) {
      console.log('失敗項目：');
      for (const failure of result.failures) console.log(`  ✗ ${failure.name}：${failure.message.split('\n')[0]}`);
    }
    console.log(`截圖目錄：screenshots/`);
    console.log('════════════════════════════════════════════════════════════');
    return result;
  }
}
