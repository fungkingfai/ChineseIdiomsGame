/**
 * Lead 用：線上／本機成品 smoke test + 截圖。
 *
 * 用法：
 *   node scripts/lead-live-check.mjs                      # 預設打 production
 *   BASE_URL=http://127.0.0.1:4280 node scripts/lead-live-check.mjs
 *   node scripts/lead-live-check.mjs --out=/tmp/live      # 截圖輸出資料夾
 *
 * 流程：首頁 → 繼續遊戲 → 關閉章節／教學 overlay → 用 ?debug=1 正解完成 Level 1
 *       → 過關 overlay → 下一關 → 圖鑑；再用手機 viewport 檢查首頁與遊戲畫面。
 * 任何 console error / pageerror / 關鍵斷言失敗 → exit 1。
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'https://chineseidiomsgame.fungkingfai.workers.dev';
const outArg = process.argv.find((arg) => arg.startsWith('--out='));
const OUT = outArg ? outArg.slice('--out='.length) : '/tmp/cat-idiom-live-check';
mkdirSync(OUT, { recursive: true });

const errors = [];
const failures = [];
let checks = 0;

function check(name, ok, detail = '') {
  checks += 1;
  console.log(`${ok ? '✅' : '❌'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
}

async function dismissOverlays(page) {
  // 章節故事同新手教學會分先後出現（有時相隔幾百 ms），要 loop 到全部消失為止。
  for (let attempt = 0; attempt < 8; attempt += 1) {
    let clicked = false;
    for (const testId of ['tutorial-ok', 'chapter-intro-ok']) {
      const button = page.locator(`[data-testid="${testId}"]`);
      if ((await button.count()) === 0) continue;
      const visible = await button.first().isVisible().catch(() => false);
      if (!visible) continue;
      await button.first().click({ timeout: 3000 }).catch(() => undefined);
      await page.waitForTimeout(400);
      clicked = true;
    }
    const remaining = await page
      .locator('[data-testid="tutorial-ok"], [data-testid="chapter-intro-ok"]')
      .count();
    if (remaining === 0) return;
    if (!clicked) await page.waitForTimeout(250);
  }
}

async function solveCurrentLevel(page) {
  const level = await page.evaluate(() => {
    const debug = window.__CAT_IDIOM_DEBUG__;
    if (!debug) return null;
    const match = window.location.hash.match(/#\/game\/(\d+)/);
    const id = match ? Number(match[1]) : 1;
    return debug.levels.find((item) => item.id === id) ?? null;
  });
  if (!level) throw new Error('讀唔到 __CAT_IDIOM_DEBUG__／關卡資料');

  const solution = new Map(level.cells.map((cell) => [`${cell.r}:${cell.c}`, cell.char]));
  const usedBank = new Set();
  const processedCells = new Set();
  for (const slot of level.slots) {
    for (const blankIndex of slot.blanks) {
      const r = slot.dir === 'h' ? slot.row : slot.row + blankIndex;
      const c = slot.dir === 'h' ? slot.col + blankIndex : slot.col;
      const cellKey = `${r}:${c}`;
      // 5 成語 fill 關可能有交叉空格：同一格只可以填一次
      if (processedCells.has(cellKey)) continue;
      processedCells.add(cellKey);
      const expected = solution.get(cellKey);
      if (!expected) continue;
      let bankIndex = -1;
      for (let i = 0; i < level.bank.length; i += 1) {
        if (!usedBank.has(i) && level.bank[i] === expected) {
          bankIndex = i;
          break;
        }
      }
      if (bankIndex < 0) throw new Error(`字庫欠缺「${expected}」`);
      usedBank.add(bankIndex);
      const cell = page.locator(`[data-testid="cell-${r}-${c}"]`);
      if (!(await cell.count())) throw new Error(`搵唔到 cell-${r}-${c}`);
      await cell.click();
      await page.waitForTimeout(80);
      await page.locator(`[data-testid="bank-${bankIndex}"]`).click();
      await page.waitForTimeout(140);
    }
  }
  return level;
}

async function desktopFlow(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[desktop console] ${msg.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`[desktop pageerror] ${String(error)}`));

  await page.goto(`${BASE}/?debug=1#/home`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
  check('桌面首頁載入', true, await page.title());
  await page.screenshot({ path: `${OUT}/desktop-home.png` });

  await page.locator('[data-testid="home-continue"]').click();
  await page.waitForSelector('[data-testid="game-screen"]', { timeout: 15000 });
  await page.waitForTimeout(400);
  await dismissOverlays(page);
  await page.waitForTimeout(300);
  check('進入遊戲畫面', true, page.url());
  await page.screenshot({ path: `${OUT}/desktop-game.png` });

  const level = await solveCurrentLevel(page);
  await page.waitForSelector('[data-testid="result-overlay"]', { timeout: 15000 });
  await page.waitForTimeout(500);
  const stars = (await page.locator('[data-testid="result-stars"]').getAttribute('data-stars')) ?? '0';
  check('完成 Level 1 過關', Number(stars) >= 1, `stars=${stars}`);
  check(
    '過關成語卡',
    (await page.locator('article[data-testid^="result-idiom-"]').count()) === level.slots.length,
  );
  check(
    '過關成語卡粵拼（Issue #1）',
    (await page.locator('[data-testid^="result-idiom-jyutping-"]').count()) === level.slots.length,
  );
  await page.screenshot({ path: `${OUT}/desktop-result.png` });

  await page.locator('[data-testid="next-level-btn"]').click();
  await page.waitForTimeout(800);
  check('下一關載入', /#\/game\/2$/.test(page.url()), page.url());

  await page.goto(`${BASE}/?debug=1#/codex`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="codex-screen"]', { timeout: 15000 });
  check('圖鑑載入', true);
  const collectedCard = page.locator('[data-testid^="codex-item-"][aria-label*="睇詳情"]').first();
  check('圖鑑有已收集成語', (await collectedCard.count()) > 0);
  if (await collectedCard.count()) {
    await collectedCard.click();
    await page.waitForSelector('[data-testid="codex-detail-jyutping"]', { timeout: 5000 });
    const jyutping = await page
      .locator('[data-testid="codex-detail-jyutping"]')
      .textContent()
      .catch(() => '');
    check('圖鑑詳情粵拼（Issue #1）', (jyutping ?? '').trim().length > 0, (jyutping ?? '').trim().slice(0, 48));
    await page.screenshot({ path: `${OUT}/desktop-codex-detail.png` });
    await page.keyboard.press('Escape');
  }
  await page.screenshot({ path: `${OUT}/desktop-codex.png` });

  await context.close();
}

async function mobileFlow(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[mobile console] ${msg.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`[mobile pageerror] ${String(error)}`));

  await page.goto(`${BASE}/?debug=1#/home`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
  check('手機首頁載入', true);
  await page.screenshot({ path: `${OUT}/mobile-home.png` });

  const width = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    inner: window.innerWidth,
  }));
  check('手機首頁無橫向溢出', width.scroll <= width.inner, `${width.scroll} <= ${width.inner}`);

  await page.goto(`${BASE}/?debug=1#/game/1`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="game-screen"]', { timeout: 15000 });
  await page.waitForTimeout(500);
  await dismissOverlays(page);
  await page.waitForTimeout(400);
  const gameWidth = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    inner: window.innerWidth,
  }));
  check('手機遊戲畫面無橫向溢出', gameWidth.scroll <= gameWidth.inner, `${gameWidth.scroll} <= ${gameWidth.inner}`);
  check('手機字庫可見', (await page.locator('[data-testid^="bank-"]').count()) > 0);
  await page.screenshot({ path: `${OUT}/mobile-game.png` });
  await context.close();
}

async function advancedFlow(browser) {
  // Issue #2：seed 進度到 Level 104，檢查 200 關地圖、進階篇 Level 101（fill 5）同 Level 105（chain 7）。
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const seed = {
    version: 1,
    levels: {},
    collected: [],
    settings: { sound: false, reducedMotion: false },
    seenChapters: [1],
    tutorialSeen: true,
  };
  for (let id = 1; id <= 104; id += 1) {
    seed.levels[String(id)] = { stars: 3, mistakes: 0, hints: 0, clearedAt: 1700000000000 + id };
  }
  await context.addInitScript((data) => {
    try {
      localStorage.setItem('cat-idioms-save-v1', JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, seed);

  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[advanced console] ${msg.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`[advanced pageerror] ${String(error)}`));

  await page.goto(`${BASE}/?debug=1#/home`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('[data-testid="home-screen"]', { timeout: 15000 });
  const continueText = (await page.locator('[data-testid="home-continue"]').textContent()) ?? '';
  check('首頁繼續第 105 關（seed 進度）', continueText.includes('105'), continueText.trim());

  await page.goto(`${BASE}/?debug=1#/map`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="map-screen"]', { timeout: 15000 });
  await page.waitForTimeout(900);
  const chapterCount = await page.locator('[data-testid^="chapter-"]').count();
  check('地圖 20 章', chapterCount === 20, `chapters=${chapterCount}`);
  const levelButtonCount = await page.locator('[data-testid^="level-btn-"]').count();
  check('地圖 200 關', levelButtonCount === 200, `levels=${levelButtonCount}`);
  await page.screenshot({ path: `${OUT}/desktop-map-200.png` });

  // Level 101：進階篇第一章，fill 4–5 成語
  await page.goto(`${BASE}/?debug=1#/game/101`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="game-screen"]', { timeout: 15000 });
  await page.waitForTimeout(700);
  const hadAdvancedIntro = (await page.locator('[data-testid="chapter-intro"]').count()) > 0;
  check('第 11 章章節故事（新場景）', hadAdvancedIntro);
  await dismissOverlays(page);
  const level101 = await solveCurrentLevel(page);
  await page.waitForSelector('[data-testid="result-overlay"]', { timeout: 15000 });
  await page.waitForTimeout(400);
  const stars101 = (await page.locator('[data-testid="result-stars"]').getAttribute('data-stars')) ?? '0';
  check('完成進階 Level 101', Number(stars101) >= 1, `slots=${level101.slots.length}, stars=${stars101}`);
  await page.screenshot({ path: `${OUT}/desktop-level101-result.png` });

  // Level 105：chain 7 行
  await page.goto(`${BASE}/?debug=1#/game/105`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="game-screen"]', { timeout: 15000 });
  await page.waitForTimeout(700);
  await dismissOverlays(page);
  const level105 = await solveCurrentLevel(page);
  await page.waitForSelector('[data-testid="result-overlay"]', { timeout: 15000 });
  await page.waitForTimeout(400);
  const stars105 = (await page.locator('[data-testid="result-stars"]').getAttribute('data-stars')) ?? '0';
  check('完成進階 chain Level 105（k=6–7）', Number(stars105) >= 1 && level105.slots.length >= 6, `k=${level105.slots.length}, stars=${stars105}`);
  await page.screenshot({ path: `${OUT}/desktop-level105-result.png` });

  await page.goto(`${BASE}/?debug=1#/codex`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="codex-screen"]', { timeout: 15000 });
  const codexCountText = (await page.locator('[data-testid="codex-count"]').textContent()) ?? '';
  check('成語圖鑑總數 ≥ 688（Issue #2）', /688|[7-9]\d\d/.test(codexCountText), codexCountText.trim());

  await context.close();
}

const browser = await chromium.launch({ headless: true });
try {
  await desktopFlow(browser);
  await mobileFlow(browser);
  await advancedFlow(browser);
} catch (error) {
  failures.push(`流程中斷：${String(error)}`);
  console.error(error);
} finally {
  await browser.close();
}

console.log(`\n結果：${checks - failures.length}/${checks} 檢查通過；截圖：${OUT}`);
if (errors.length > 0) {
  console.log(`console/page errors (${errors.length}):`);
  for (const error of errors.slice(0, 12)) console.log('  -', error);
}
if (failures.length > 0 || errors.length > 0) {
  console.log('\n❌ FAIL');
  process.exitCode = 1;
} else {
  console.log('\n✅ PASS');
}
