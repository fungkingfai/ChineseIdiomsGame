/**
 * E2E 測試案例（Playwright）：桌面 1280×800 及手機 390×844 共用同一流程。
 * 由 e2e/run.mjs 呼叫 runSuite()。
 *
 * 流程：首頁 → 地圖 → Level 1（章節故事／教學）→ 真實點 cell＋bank 過關 →
 *       下一關 → 地圖星數 → 首頁進度 → reload 保留 → 圖鑑 → 設定持久化 → 重置。
 * 每個步驟後都會檢查 console error／pageerror；手機另外檢查無橫向溢出。
 */
import {
  assert,
  assertNoHorizontalOverflow,
  assertNoHorizontalOverflowIn,
  BASE_URL,
  currentLevelId,
  dismissIntroOverlays,
  innerTextOf,
  isVisible,
  readDebug,
  readDebugLevel,
  readStoredSave,
  SAVE_KEY,
  screenshot,
  sleep,
  solveCurrentLevel,
  textOf,
  waitForHidden,
  waitForResult,
  waitForVisible,
} from './lib.mjs';

/** 粵拼去聲調數字（jat1 nok6 → jat nok），模擬玩家一般輸入 */
function stripJyutpingTones(cantonese) {
  return cantonese
    .replace(/[1-6]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** 拼音去聲調（NFD 去 combining marks；ü → u），模擬玩家一般輸入 */
function stripPinyinTones(pinyin) {
  return pinyin
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'u')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** 20 章 id（基礎 1–10＋進階 11–20） */
const ALL_CHAPTER_IDS = Array.from({ length: 20 }, (_, index) => index + 1);

/**
 * 直接 seed localStorage 存檔，模擬玩家已通關進度（Level 1..N 全部 3 星），
 * 然後 reload 令 app 由存檔重新載入（AppContext.save 係載入時讀取）。
 */
async function seedProgress(page, { clearedThrough = 0, seenChapters = [], tutorialSeen = true } = {}) {
  await page.evaluate(
    ({ clearedThrough: count, seenChapters: seen, tutorialSeen: seenTutorial, saveKey }) => {
      const levels = {};
      for (let id = 1; id <= count; id += 1) {
        levels[String(id)] = { stars: 3, mistakes: 0, hints: 0, clearedAt: Date.now() };
      }
      const save = {
        version: 1,
        levels,
        collected: [],
        settings: { sound: true, reducedMotion: false },
        seenChapters: seen,
        tutorialSeen: seenTutorial,
      };
      localStorage.setItem(saveKey, JSON.stringify(save));
    },
    { clearedThrough, seenChapters, tutorialSeen, saveKey: SAVE_KEY },
  );
  await page.reload();
  await page.waitForSelector(
    '[data-testid="home-screen"], [data-testid="map-screen"], [data-testid="game-screen"], [data-testid="settings-screen"], [data-testid="codex-screen"]',
    { state: 'visible', timeout: 10_000 },
  );
  await page.goto(`${BASE_URL}/?debug=1#/home`);
  await waitForVisible(page, '[data-testid="home-screen"]');
}

export async function runSuite({ page, errors, reporter, label, isMobile }) {
  const shot = (name, options) => screenshot(page, `${name}-${label}`, options);
  const checkConsole = (where) => errors.assertClean(`${label}／${where}`);
  const checkOverflow = async (where) => {
    if (isMobile) await assertNoHorizontalOverflow(page, `${label}／${where}`);
  };

  reporter.section(`E2E ${label}（${isMobile ? '390×844 手機' : '1280×800 桌面'}）`);

  let level1 = null;
  let level2 = null;
  let level1IdiomIds = [];
  let level1IdiomWords = [];
  let level1Idioms = []; // { word, pinyin }

  /* ---------------------------------------------------------------- */
  /* 1. 首頁                                                           */
  /* ---------------------------------------------------------------- */
  await reporter.step('首頁：載入、debug 資料、主 CTA、進度', async () => {
    await page.goto(`${BASE_URL}/?debug=1#/home`);
    await waitForVisible(page, '[data-testid="home-screen"]');

    const debug = await readDebug(page);
    assert(debug, '?debug=1 未暴露 window.__CAT_IDIOM_DEBUG__');
    assert(debug.version >= 1, `debug version 唔合理：${debug.version}`);
    assert(debug.levelCount === 200, `關卡數應為 200，實際 ${debug.levelCount}`);
    assert(debug.chapterCount === 20, `章節數應為 20，實際 ${debug.chapterCount}`);
    assert(debug.idiomCount > 0, '成語資料未載入');

    for (const testId of ['home-start', 'home-continue', 'home-codex', 'home-settings', 'home-progress']) {
      await waitForVisible(page, `[data-testid="${testId}"]`);
    }
    const continueText = await innerTextOf(page, '[data-testid="home-continue"]');
    assert(continueText.includes('開始第 1 關'), `新存檔首頁 CTA 應為「開始第 1 關」，實際「${continueText}」`);
    const progressText = await innerTextOf(page, '[data-testid="home-progress"]');
    assert(progressText.includes('已過 0 / 200 關'), `首頁進度應為「已過 0 / 200 關」，實際「${progressText}」`);

    await sleep(450);
    await shot('home', { fullPage: true });
    await checkOverflow('首頁');
    checkConsole('首頁');
  });

  /* ---------------------------------------------------------------- */
  /* 2. 地圖                                                           */
  /* ---------------------------------------------------------------- */
  await reporter.step('地圖：20 章、200 個關卡、Level 1 可玩、Level 2 未解鎖', async () => {
    await page.click('[data-testid="home-start"]');
    await waitForVisible(page, '[data-testid="map-screen"]');

    for (let chapter = 1; chapter <= 20; chapter += 1) {
      await waitForVisible(page, `[data-testid="chapter-${chapter}"]`);
    }
    const levelButtons = page.locator('[data-testid^="level-btn-"]');
    assert((await levelButtons.count()) === 200, `地圖應有 200 個關卡按鈕，實際 ${await levelButtons.count()}`);

    const level1Label = (await page.getAttribute('[data-testid="level-btn-1"]', 'aria-label')) ?? '';
    assert(level1Label.includes('當前關卡'), `Level 1 應為當前關卡，aria-label「${level1Label}」`);
    const level2Label = (await page.getAttribute('[data-testid="level-btn-2"]', 'aria-label')) ?? '';
    assert(level2Label.includes('未解鎖'), `Level 2 應未解鎖，aria-label「${level2Label}」`);
    const starsTotal = await textOf(page, '[data-testid="map-stars-total"]');
    assert(starsTotal === '★ 0 / 600', `總星數應為「★ 0 / 600」，實際「${starsTotal}」`);
    const mapText = await innerTextOf(page, '[data-testid="map-screen"]');
    assert(mapText.includes('基礎篇'), '地圖應有「基礎篇」分區');
    assert(mapText.includes('進階篇'), '地圖應有「進階篇」分區（Issue #2 20 章）');
    assert(
      (await page.locator('[data-testid="map-section-basic"]').count()) === 1,
      '地圖缺少 map-section-basic（第 1–10 章分區）',
    );
    assert(
      (await page.locator('[data-testid="map-section-advanced"]').count()) === 1,
      '地圖缺少 map-section-advanced（第 11–20 章分區）',
    );

    await sleep(600); // 等自動捲到當前章
    await shot('map', { fullPage: true });
    await checkOverflow('地圖');
    checkConsole('地圖');
  });

  /* ---------------------------------------------------------------- */
  /* 3. 入 Level 1（章節故事＋新手教學）                               */
  /* ---------------------------------------------------------------- */
  await reporter.step('Level 1：章節故事＋新手教學、棋盤／字庫／HUD 正確', async () => {
    await page.click('[data-testid="level-btn-1"]');
    await waitForVisible(page, '[data-testid="game-screen"]');
    level1 = await readDebugLevel(page, 1);
    assert(level1, 'debug 資料搵唔到 Level 1');
    assert(level1.id === 1 && level1.chapter === 1, 'Level 1 資料唔正確');
    level1IdiomIds = level1.slots.map((slot) => slot.idiomId);
    level1Idioms = await page.evaluate((ids) => {
      const debug = window.__CAT_IDIOM_DEBUG__;
      return ids.map((id) => {
        const idiom = debug.idioms.find((item) => item.id === id);
        return idiom ? { word: idiom.word, pinyin: idiom.pinyin, cantonese: idiom.cantonese } : null;
      });
    }, level1IdiomIds);
    assert(
      level1Idioms.every(Boolean),
      `Level 1 成語喺 idioms.json 搵唔到：${level1IdiomIds.join(',')}`,
    );
    level1IdiomWords = level1Idioms.map((idiom) => idiom.word);

    await dismissIntroOverlays(page, label);

    const title = await textOf(page, '[data-testid="game-title"]');
    assert(title === level1.title, `關卡標題應為「${level1.title}」，實際「${title}」`);

    const cellCount = await page.locator('[data-testid^="cell-"]').count();
    assert(cellCount === level1.cells.length, `棋盤格數應為 ${level1.cells.length}，實際 ${cellCount}`);
    const bankCount = await page.locator('[data-testid^="bank-"]').count();
    assert(bankCount === level1.bank.length, `字庫卡數應為 ${level1.bank.length}，實際 ${bankCount}`);

    const hintCount = await textOf(page, '[data-testid="hint-count"]');
    assert(hintCount === String(level1.hintLimit), `提示次數應為 ${level1.hintLimit}，實際 ${hintCount}`);
    const mistakeCount = await textOf(page, '[data-testid="mistake-count"]');
    assert(mistakeCount === '0', `初始錯誤次數應為 0，實際 ${mistakeCount}`);
    await waitForVisible(page, '[data-testid="hint-btn"]');
    await waitForVisible(page, '[data-testid="restart-btn"]');
    await waitForVisible(page, '[data-testid="sound-btn"]');

    await shot('game');
    await checkOverflow('遊戲畫面');
    checkConsole('Level 1');
  });

  /* ---------------------------------------------------------------- */
  /* 4. 真實點擊完成 Level 1 → 3 星過關                                */
  /* ---------------------------------------------------------------- */
  await reporter.step('完成 Level 1：真實點 cell＋bank → result-overlay 3 星', async () => {
    const solved = await solveCurrentLevel(page);
    assert(solved.levelId === 1, `應喺 Level 1 解題，實際 Level ${solved.levelId}`);
    await waitForResult(page);

    const stars = await page.getAttribute('[data-testid="result-stars"]', 'data-stars');
    assert(stars === '3', `零錯誤零提示應獲 3 星，實際 ${stars} 星`);
    // 用 article 限定成語卡 root；唔好撞到 Issue #1 嘅 result-idiom-jyutping-* 元素
    const idiomCards = page.locator('article[data-testid^="result-idiom-"]');
    assert(
      (await idiomCards.count()) === level1.slots.length,
      `過關 overlay 應有 ${level1.slots.length} 張成語卡，實際 ${await idiomCards.count()}`,
    );
    for (const idiomId of level1IdiomIds) {
      assert(
        (await page.locator(`[data-testid="result-idiom-${idiomId}"]`).count()) === 1,
        `過關 overlay 缺少成語卡 ${idiomId}`,
      );
    }
    const overlayText = await innerTextOf(page, '[data-testid="result-overlay"]');
    assert(overlayText.includes('關卡完成'), '過關 overlay 缺少「關卡完成」標題');
    assert(!/undefined|null/.test(overlayText), `過關 overlay 出現 undefined／null 文字：「${overlayText.slice(0, 120)}」`);
    for (const word of level1IdiomWords) {
      assert(overlayText.includes(word), `過關 overlay 未顯示成語「${word}」`);
    }
    // Issue #1：過關成語卡要同時顯示普通話拼音＋粵拼
    const jyutpingCards = page.locator('[data-testid^="result-idiom-jyutping-"]');
    assert(
      (await jyutpingCards.count()) === level1.slots.length,
      `過關 overlay 粵拼元素應有 ${level1.slots.length} 個，實際 ${await jyutpingCards.count()}`,
    );
    for (let index = 0; index < level1IdiomIds.length; index += 1) {
      const idiomId = level1IdiomIds[index];
      const expectedPinyin = level1Idioms[index].pinyin;
      const expectedJyutping = level1Idioms[index].cantonese;
      assert(expectedJyutping, `Level 1 成語 ${idiomId} 喺 debug 資料冇 cantonese`);

      // 粵拼行：testid 喺 <p>，內含「粵」徽章 + .pron-text
      const jyutpingCard = page.locator(`[data-testid="result-idiom-jyutping-${idiomId}"]`);
      assert((await jyutpingCard.count()) === 1, `過關 overlay 缺少粵拼元素 ${idiomId}`);
      const jyutAria = (await jyutpingCard.getAttribute('aria-label')) ?? '';
      assert(jyutAria === `粵拼：${expectedJyutping}`, `過關粵拼 aria-label「${jyutAria}」唔啱`);
      const jyutText = (
        (await page.textContent(`[data-testid="result-idiom-jyutping-${idiomId}"] .pron-text`)) ?? ''
      ).trim();
      assert(jyutText === expectedJyutping, `過關粵拼「${jyutText}」應為「${expectedJyutping}」`);

      // 普通話拼音行（排除粵拼行，因為兩者共用 .idiom-card__pinyin class）
      const pinyinText = (
        (await page.textContent(
          `[data-testid="result-idiom-${idiomId}"] .idiom-card__pinyin:not(.idiom-card__pinyin--jyut) .pron-text`,
        )) ?? ''
      ).trim();
      assert(pinyinText === expectedPinyin, `過關普通話拼音「${pinyinText}」應為「${expectedPinyin}」`);
    }
    await waitForVisible(page, '[data-testid="next-level-btn"]');
    await waitForVisible(page, '[data-testid="retry-btn"]');
    await waitForVisible(page, '[data-testid="result-map-btn"]');

    assert(
      (await page.locator('[data-testid="result-final-all"]').count()) === 0,
      '未完成全部 200 關前唔應該顯示 result-final-all 祝賀 banner',
    );
    await shot('result');
    if (isMobile) {
      await assertNoHorizontalOverflowIn(
        page,
        '[data-testid="result-overlay"] .overlay__panel',
        `${label}／過關 overlay（雙拼音）`,
      );
    }
    checkConsole('過關 overlay');
  });

  /* ---------------------------------------------------------------- */
  /* 5. 下一關                                                         */
  /* ---------------------------------------------------------------- */
  await reporter.step('下一關 → Level 2（唔會再彈教學／章節故事）', async () => {
    await page.click('[data-testid="next-level-btn"]');
    await waitForVisible(page, '[data-testid="game-screen"]');
    level2 = await readDebugLevel(page, 2);
    assert(level2, 'debug 資料搵唔到 Level 2');
    const levelId = await currentLevelId(page);
    assert(levelId === 2, `next-level 應去 Level 2，實際 Level ${levelId}`);
    await page.waitForFunction(
      (expected) => document.querySelector('[data-testid="game-title"]')?.textContent === expected,
      level2.title,
      { timeout: 5_000 },
    );
    await sleep(500);
    assert(
      !(await isVisible(page, '[data-testid="tutorial-overlay"]')),
      '已看過新手教學，但 Level 2 再彈出 tutorial-overlay',
    );
    assert(
      !(await isVisible(page, '[data-testid="chapter-intro"]')),
      '已看過第 1 章故事，但 Level 2 再彈出 chapter-intro',
    );
    await checkOverflow('Level 2');
    checkConsole('Level 2');
  });

  /* ---------------------------------------------------------------- */
  /* 6. 返回地圖：星星／總星數                                         */
  /* ---------------------------------------------------------------- */
  await reporter.step('返回地圖：Level 1 有 3 星、總星數 3/600、Level 3 未解鎖', async () => {
    if (isMobile) {
      await page.click('[data-testid="game-back"]');
    } else {
      await page.keyboard.press('Escape'); // 桌面版順便驗證 Esc 返回地圖
    }
    await waitForVisible(page, '[data-testid="map-screen"]');

    const level1Label = (await page.getAttribute('[data-testid="level-btn-1"]', 'aria-label')) ?? '';
    assert(level1Label.includes('已過關'), `Level 1 應顯示已過關，aria-label「${level1Label}」`);
    assert(level1Label.includes('3 星'), `Level 1 應顯示 3 星，aria-label「${level1Label}」`);
    const starsTotal = await textOf(page, '[data-testid="map-stars-total"]');
    assert(starsTotal === '★ 3 / 600', `總星數應為「★ 3 / 600」，實際「${starsTotal}」`);
    const level2Label = (await page.getAttribute('[data-testid="level-btn-2"]', 'aria-label')) ?? '';
    assert(level2Label.includes('當前關卡'), `Level 2 應為當前關卡，aria-label「${level2Label}」`);
    const level3Label = (await page.getAttribute('[data-testid="level-btn-3"]', 'aria-label')) ?? '';
    assert(level3Label.includes('未解鎖'), `Level 3 應未解鎖，aria-label「${level3Label}」`);

    await checkOverflow('地圖（過關後）');
    checkConsole('地圖（過關後）');
  });

  /* ---------------------------------------------------------------- */
  /* 7. 首頁進度 + reload 保留                                         */
  /* ---------------------------------------------------------------- */
  await reporter.step('首頁「繼續第 2 關」；reload 後進度保留', async () => {
    await page.click('[data-testid="map-back"]');
    await waitForVisible(page, '[data-testid="home-screen"]');
    const continueText = await innerTextOf(page, '[data-testid="home-continue"]');
    assert(continueText.includes('繼續第 2 關'), `首頁 CTA 應為「繼續第 2 關」，實際「${continueText}」`);
    const progressText = await innerTextOf(page, '[data-testid="home-progress"]');
    assert(progressText.includes('已過 1 / 200 關'), `首頁進度應為「已過 1 / 200 關」，實際「${progressText}」`);

    await page.reload();
    await waitForVisible(page, '[data-testid="home-screen"]');
    const continueAfter = await innerTextOf(page, '[data-testid="home-continue"]');
    assert(continueAfter.includes('繼續第 2 關'), `reload 後 CTA 應為「繼續第 2 關」，實際「${continueAfter}」`);
    const progressAfter = await innerTextOf(page, '[data-testid="home-progress"]');
    assert(
      progressAfter.includes('已過 1 / 200 關') && progressAfter.includes('總星數 3 / 600'),
      `reload 後進度冇保留：「${progressAfter}」`,
    );
    const stored = await readStoredSave(page);
    assert(stored?.levels?.['1']?.stars === 3, `localStorage 未記錄 Level 1 3 星：${JSON.stringify(stored?.levels)}`);

    await checkOverflow('首頁（reload）');
    checkConsole('首頁 reload');
  });

  /* ---------------------------------------------------------------- */
  /* 8. 圖鑑                                                           */
  /* ---------------------------------------------------------------- */
  await reporter.step('圖鑑：收集數、已收集成語、詳情、搜尋', async () => {
    await page.click('[data-testid="home-codex"]');
    await waitForVisible(page, '[data-testid="codex-screen"]');
    await waitForVisible(page, '[data-testid="codex-search"]');

    const debug = await readDebug(page);
    const countText = await innerTextOf(page, '[data-testid="codex-count"]');
    const countMatch = /^已收集 (\d+) \/ (\d+) 條成語/.exec(countText);
    assert(countMatch, `圖鑑收集進度格式唔啱：「${countText}」`);
    const collectedCount = Number(countMatch[1]);
    assert(collectedCount >= level1IdiomIds.length, `已收集數量應 ≥ ${level1IdiomIds.length}，實際 ${collectedCount}`);
    assert(
      countText.includes(`/ ${debug.idiomCount} 條成語`),
      `圖鑑總數應為 idioms.json 的 ${debug.idiomCount} 條，實際「${countText}」`,
    );

    for (let index = 0; index < level1IdiomIds.length; index += 1) {
      const card = page.locator(`[data-testid="codex-item-${level1IdiomIds[index]}"]`);
      assert((await card.count()) === 1, `圖鑑缺少成語卡 ${level1IdiomIds[index]}`);
      const cardText = (await card.innerText()).replace(/\s+/g, ' ');
      assert(
        cardText.includes(level1IdiomWords[index]),
        `圖鑑卡應顯示已收集成語「${level1IdiomWords[index]}」，實際「${cardText}」`,
      );
      assert(!cardText.includes('？？？？'), `已收集成語仍顯示「？？？？」：${level1IdiomWords[index]}`);
      assert(!/undefined|null/.test(cardText), `圖鑑卡出現 undefined／null：${level1IdiomWords[index]}`);
      // Issue #1：已收集圖鑑卡要有細字粵拼
      const cardJyut = page.locator(`[data-testid="codex-item-${level1IdiomIds[index]}"] .codex-card__jyut`);
      assert((await cardJyut.count()) === 1, `圖鑑卡 ${level1IdiomIds[index]} 缺少粵拼細字`);
      assert(
        ((await cardJyut.innerText()) ?? '').includes(level1Idioms[index].cantonese),
        `圖鑑卡粵拼細字應包含「${level1Idioms[index].cantonese}」`,
      );
    }

    await sleep(350);
    // 圖鑑有 488 條成語，fullPage 會是幾萬像素嘅巨圖；截 viewport 已足夠睇版面
    await shot('codex');

    // 詳情 modal
    const firstId = level1IdiomIds[0];
    await page.click(`[data-testid="codex-item-${firstId}"]`);
    await waitForVisible(page, '[data-testid="codex-detail"]');
    const detailText = await innerTextOf(page, '[data-testid="codex-detail"]');
    assert(detailText.includes(level1IdiomWords[0]), '成語詳情未顯示成語');
    assert(detailText.includes('釋義'), '成語詳情未顯示釋義');
    assert(detailText.includes('出處'), '成語詳情未顯示出處');
    assert(!/undefined|null/.test(detailText), '成語詳情出現 undefined／null 文字');
    // Issue #1：詳情要同時顯示普通話拼音＋粵拼
    assert(
      detailText.includes(level1Idioms[0].pinyin),
      `成語詳情未顯示普通話拼音「${level1Idioms[0].pinyin}」`,
    );
    const jyutpingDetail = page.locator('[data-testid="codex-detail-jyutping"]');
    assert((await jyutpingDetail.count()) === 1, '成語詳情缺少 codex-detail-jyutping 元素');
    const expectedJyutping = level1Idioms[0].cantonese;
    const jyutAria = (await jyutpingDetail.getAttribute('aria-label')) ?? '';
    assert(jyutAria === `粵拼：${expectedJyutping}`, `成語詳情粵拼 aria-label「${jyutAria}」唔啱`);
    const jyutpingDetailText = ((await jyutpingDetail.innerText()) ?? '').replace(/\s+/g, ' ').trim();
    assert(
      jyutpingDetailText.includes(expectedJyutping),
      `成語詳情粵拼「${jyutpingDetailText}」應包含「${expectedJyutping}」`,
    );
    await shot('codex-detail');
    if (isMobile) {
      await assertNoHorizontalOverflowIn(
        page,
        '[data-testid="codex-detail"] .overlay__panel',
        `${label}／圖鑑詳情（雙拼音）`,
      );
    }
    await page.click('[data-testid="codex-detail"] [data-close]');
    await waitForHidden(page, '[data-testid="codex-detail"]');

    // 搜尋（中文）——BUG-QA-1 回歸：中文搜尋要命中
    await page.fill('[data-testid="codex-search"]', level1IdiomWords[0]);
    await sleep(200);
    assert(
      (await page.locator(`[data-testid="codex-item-${level1IdiomIds[0]}"]`).count()) === 1,
      `圖鑑中文搜尋「${level1IdiomWords[0]}」後搵唔到對應成語`,
    );

    // 搜尋（帶聲調拼音）
    await page.fill('[data-testid="codex-search"]', level1Idioms[0].pinyin);
    await sleep(200);
    assert(
      (await page.locator(`[data-testid="codex-item-${level1IdiomIds[0]}"]`).count()) === 1,
      `圖鑑帶聲調拼音搜尋「${level1Idioms[0].pinyin}」後搵唔到對應成語`,
    );

    // 搜尋（無聲調拼音）——BUG-QA-1 回歸：玩家通常唔打聲調符號
    const plainPinyin = stripPinyinTones(level1Idioms[0].pinyin);
    assert(plainPinyin.length > 0, '拼音去除聲調後為空');
    await page.fill('[data-testid="codex-search"]', plainPinyin);
    await sleep(200);
    assert(
      (await page.locator(`[data-testid="codex-item-${level1IdiomIds[0]}"]`).count()) === 1,
      `圖鑑無聲調拼音搜尋「${plainPinyin}」後搵唔到對應成語（BUG-QA-1 回歸）`,
    );

    // 搜尋（粵拼帶聲調）——Issue #1
    await page.fill('[data-testid="codex-search"]', level1Idioms[0].cantonese);
    await sleep(200);
    assert(
      (await page.locator(`[data-testid="codex-item-${level1IdiomIds[0]}"]`).count()) === 1,
      `圖鑑粵拼搜尋「${level1Idioms[0].cantonese}」後搵唔到對應成語（Issue #1）`,
    );

    // 搜尋（粵拼無聲調數字）——Issue #1：玩家通常唔打聲調數字
    const plainJyutping = stripJyutpingTones(level1Idioms[0].cantonese);
    assert(plainJyutping.length > 0, '粵拼去除聲調數字後為空');
    await page.fill('[data-testid="codex-search"]', plainJyutping);
    await sleep(200);
    assert(
      (await page.locator(`[data-testid="codex-item-${level1IdiomIds[0]}"]`).count()) === 1,
      `圖鑑無聲調粵拼搜尋「${plainJyutping}」後搵唔到對應成語（Issue #1）`,
    );
    // Issue #1 截圖：粵拼搜尋結果（桌面＋手機各一張）
    await shot('codex-search-jyutping');

    // 0 結果：顯示空狀態、grid 隱藏且 DOM 無 stale 卡——BUG-QA-2 回歸
    await page.fill('[data-testid="codex-search"]', 'zzzzzz-no-such-idiom');
    await sleep(250);
    const emptyState = await page.evaluate(() => {
      const grid = document.querySelector('[data-grid]');
      const empty = document.querySelector('[data-empty]');
      return {
        gridHidden: Boolean(grid?.hidden),
        gridChildCount: grid?.childElementCount ?? -1,
        emptyHidden: Boolean(empty?.hidden),
        emptyText: empty?.innerText?.replace(/\s+/g, ' ').trim() ?? '',
      };
    });
    assert(emptyState.gridHidden, '圖鑑 0 結果時 grid 應該隱藏');
    assert(emptyState.emptyHidden === false, '圖鑑 0 結果時應顯示空狀態');
    assert(emptyState.emptyText.includes('搵唔到'), `空狀態文案唔啱：「${emptyState.emptyText}」`);
    assert(
      emptyState.gridChildCount === 0,
      `圖鑑 0 結果時 grid 仍有 ${emptyState.gridChildCount} 個 stale 卡（BUG-QA-2 回歸）`,
    );

    // 清空搜尋 → 恢復全部成語
    await page.fill('[data-testid="codex-search"]', '');
    await sleep(250);
    assert(
      (await page.locator('[data-testid^="codex-item-"]').count()) === debug.idiomCount,
      `清空搜尋後應恢復 ${debug.idiomCount} 張成語卡`,
    );

    await page.click('[data-testid="codex-screen"] [aria-label="返回首頁"]');
    await waitForVisible(page, '[data-testid="home-screen"]');

    await checkOverflow('圖鑑');
    checkConsole('圖鑑');
  });

  /* ---------------------------------------------------------------- */
  /* 9. 設定持久化                                                     */
  /* ---------------------------------------------------------------- */
  await reporter.step('設定：音效／減少動態 toggle，reload 後仍保留', async () => {
    await page.click('[data-testid="home-settings"]');
    await waitForVisible(page, '[data-testid="settings-screen"]');
    const sound = page.locator('[data-testid="settings-sound"]');
    const motion = page.locator('[data-testid="settings-motion"]');
    assert(await sound.isChecked(), '預設音效應為開啟');
    assert(!(await motion.isChecked()), '預設減少動態應為關閉');

    await sleep(350);
    await shot('settings', { fullPage: true });
    await checkOverflow('設定');

    await sound.click();
    assert(!(await sound.isChecked()), '點擊後音效應關閉');
    await motion.click();
    assert(await motion.isChecked(), '點擊後減少動態應開啟');
    const htmlClass = await page.evaluate(() => document.documentElement.className);
    assert(htmlClass.includes('reduced-motion'), `開啟減少動態後 html 應有 reduced-motion class，實際「${htmlClass}」`);

    await page.reload();
    await waitForVisible(page, '[data-testid="settings-screen"]');
    assert(
      !(await page.locator('[data-testid="settings-sound"]').isChecked()),
      'reload 後音效關閉設定冇保留',
    );
    assert(
      await page.locator('[data-testid="settings-motion"]').isChecked(),
      'reload 後減少動態設定冇保留',
    );
    const htmlClassAfter = await page.evaluate(() => document.documentElement.className);
    assert(htmlClassAfter.includes('reduced-motion'), 'reload 後 html 冇 reduced-motion class');
    const stored = await readStoredSave(page);
    assert(
      stored?.settings?.sound === false && stored?.settings?.reducedMotion === true,
      `localStorage 設定未持久化：${JSON.stringify(stored?.settings)}`,
    );

    checkConsole('設定');
  });

  /* ---------------------------------------------------------------- */
  /* 10. 重置進度（二次確認）                                          */
  /* ---------------------------------------------------------------- */
  await reporter.step('重置進度：取消唔會清、確認會清空', async () => {
    await page.click('[data-testid="settings-reset"]');
    await waitForVisible(page, '[data-testid="reset-confirm"]');
    await shot('reset-confirm');
    await page.click('[data-testid="reset-cancel"]');
    await waitForHidden(page, '[data-testid="reset-confirm"]');
    assert(await isVisible(page, '[data-testid="settings-reset"]'), '取消重置後 settings-reset 按鈕應該仍在');
    let stored = await readStoredSave(page);
    assert(stored?.levels?.['1']?.stars === 3, '取消重置後進度唔應該清空');

    await page.click('[data-testid="settings-reset"]');
    await waitForVisible(page, '[data-testid="reset-confirm"]');
    await page.click('[data-testid="reset-confirm"]');
    await waitForHidden(page, '[data-testid="reset-confirm"]');

    stored = await readStoredSave(page);
    assert(stored, '重置後應有預設存檔寫入 localStorage');
    assert(Object.keys(stored.levels ?? {}).length === 0, '重置後關卡進度未清空');
    assert((stored.collected ?? []).length === 0, '重置後圖鑑收藏未清空');
    assert(stored.settings?.sound === true, '重置後音效應回復預設開啟');
    assert(await page.locator('[data-testid="settings-sound"]').isChecked(), '重置後設定開關應同步回預設');

    checkConsole('重置進度');
  });

  /* ---------------------------------------------------------------- */
  /* 11. 錯誤路由／未解鎖關卡：安全引導回地圖或首頁                     */
  /* ---------------------------------------------------------------- */
  await reporter.step('錯誤路由／未解鎖關卡：安全引導＋提示 toast（BUG-QA-3 回歸）', async () => {
    // 重置後 Level 2 未解鎖：直接入 #/game/2 應引導返地圖＋見到提示 toast
    await page.goto(`${BASE_URL}/?debug=1#/game/2`);
    await waitForVisible(page, '[data-testid="map-screen"]');
    await waitForVisible(page, '#toast-root .toast');
    const lockedToast = (await page.locator('#toast-root').innerText()).replace(/\s+/g, ' ');
    assert(
      lockedToast.includes('未解鎖'),
      `未解鎖關卡應有提示 toast（BUG-QA-3 回歸），實際「${lockedToast}」`,
    );

    // 唔存在嘅關卡 #/game/999 → 地圖＋提示 toast
    await page.goto(`${BASE_URL}/?debug=1#/game/999`);
    await waitForVisible(page, '[data-testid="map-screen"]');
    await waitForVisible(page, '#toast-root .toast');
    const missingToast = (await page.locator('#toast-root').innerText()).replace(/\s+/g, ' ');
    assert(
      missingToast.includes('搵唔到'),
      `不存在關卡應有提示 toast（BUG-QA-3 回歸），實際「${missingToast}」`,
    );

    // 未知路由 → 首頁
    await page.goto(`${BASE_URL}/?debug=1#/unknown-route`);
    await waitForVisible(page, '[data-testid="home-screen"]');
    checkConsole('錯誤路由');
  });

  /* ---------------------------------------------------------------- */
  /* 12. Issue #2：seed 100 關 → 首頁繼續第 101 關、地圖 20 章          */
  /* ---------------------------------------------------------------- */
  await reporter.step('Issue #2 seed 100 關：首頁繼續第 101 關、地圖 20 章／第 11 章解鎖', async () => {
    await seedProgress(page, { clearedThrough: 100, seenChapters: ALL_CHAPTER_IDS.slice(0, 10) });

    const continueText = await innerTextOf(page, '[data-testid="home-continue"]');
    assert(continueText.includes('繼續第 101 關'), `首頁 CTA 應為「繼續第 101 關」，實際「${continueText}」`);
    const progressText = await innerTextOf(page, '[data-testid="home-progress"]');
    assert(progressText.includes('已過 100 / 200 關'), `首頁進度應為「已過 100 / 200 關」，實際「${progressText}」`);
    assert(progressText.includes('總星數 300 / 600'), `首頁總星數應為 300 / 600，實際「${progressText}」`);

    await page.click('[data-testid="home-start"]');
    await waitForVisible(page, '[data-testid="map-screen"]');
    for (let chapter = 1; chapter <= 20; chapter += 1) {
      await waitForVisible(page, `[data-testid="chapter-${chapter}"]`);
    }
    const starsTotal = await textOf(page, '[data-testid="map-stars-total"]');
    assert(starsTotal === '★ 300 / 600', `地圖總星數應為「★ 300 / 600」，實際「${starsTotal}」`);
    const level101Label = (await page.getAttribute('[data-testid="level-btn-101"]', 'aria-label')) ?? '';
    assert(level101Label.includes('當前關卡'), `Level 101 應為當前關卡，aria-label「${level101Label}」`);
    const level102Label = (await page.getAttribute('[data-testid="level-btn-102"]', 'aria-label')) ?? '';
    assert(level102Label.includes('未解鎖'), `Level 102 應未解鎖，aria-label「${level102Label}」`);
    const chapter11Locked = await page.locator('[data-testid="chapter-11"] .level-btn--locked').count();
    assert(chapter11Locked === 9, `第 11 章應已解鎖（只有 102–110 等 9 關鎖定），實際 locked=${chapter11Locked}`);
    const mapText = await innerTextOf(page, '[data-testid="map-screen"]');
    assert(mapText.includes('基礎篇'), '地圖應有「基礎篇」分區標題');
    assert(mapText.includes('進階篇'), '地圖應有「進階篇」分區標題（Issue #2）');
    const advancedSection = page.locator('[data-testid="map-section-advanced"]');
    assert((await advancedSection.count()) === 1, '地圖缺少 map-section-advanced');
    assert(
      (await advancedSection.locator('[data-testid="chapter-11"]').count()) === 1,
      '進階篇 section 應包含 chapter-11（藏經閣）',
    );

    await sleep(800); // 等自動捲到第 11 章
    await shot('map-advanced');
    await checkOverflow('進階篇地圖');
    checkConsole('進階篇地圖');
  });

  /* ---------------------------------------------------------------- */
  /* 13. Level 101（進階 fill）＋第 11 章新場景故事                     */
  /* ---------------------------------------------------------------- */
  await reporter.step('Level 101（進階 fill）：第 11 章新場景故事＋完成過關', async () => {
    await page.click('[data-testid="level-btn-101"]');
    await waitForVisible(page, '[data-testid="game-screen"]');
    const level101 = await readDebugLevel(page, 101);
    assert(level101, 'debug 資料搵唔到 Level 101');
    assert(level101.mode === 'fill', `Level 101 應為 fill，實際 ${level101.mode}`);
    assert(
      level101.slots.length >= 4 && level101.slots.length <= 5,
      `Level 101 進階 fill 應有 4–5 個成語，實際 ${level101.slots.length}`,
    );

    // 第 11 章 chapter-intro（seed 只見到第 10 章）＋新場景 SVG
    await waitForVisible(page, '[data-testid="chapter-intro"]');
    await shot('chapter-intro-11');
    const introHtml = await page.locator('[data-testid="chapter-intro"]').innerHTML();
    const chapter11 = await page.evaluate(
      () => window.__CAT_IDIOM_DEBUG__.chapters.find((chapter) => chapter.id === 11) ?? null,
    );
    assert(chapter11, 'debug 資料搵唔到第 11 章');
    assert(
      introHtml.includes(`scene-${chapter11.scene}`),
      `第 11 章故事應顯示新場景 SVG（scene-${chapter11.scene}）`,
    );
    assert(introHtml.includes(chapter11.name), `第 11 章故事應顯示章名「${chapter11.name}」`);
    await page.click('[data-testid="chapter-intro-ok"]');
    await waitForHidden(page, '[data-testid="chapter-intro"]');
    await sleep(300);
    assert(
      !(await isVisible(page, '[data-testid="tutorial-overlay"]')),
      'seed 已標記 tutorialSeen，唔應該再彈新手教學',
    );

    const cellCount = await page.locator('[data-testid^="cell-"]').count();
    assert(cellCount === level101.cells.length, `Level 101 棋盤格數應為 ${level101.cells.length}，實際 ${cellCount}`);
    const bankCount = await page.locator('[data-testid^="bank-"]').count();
    assert(bankCount === level101.bank.length, `Level 101 字庫卡數應為 ${level101.bank.length}，實際 ${bankCount}`);
    await shot('game-101');
    await checkOverflow('Level 101');

    const solved = await solveCurrentLevel(page);
    assert(solved.levelId === 101, `應喺 Level 101 解題，實際 Level ${solved.levelId}`);
    await waitForResult(page);
    const stars = await page.getAttribute('[data-testid="result-stars"]', 'data-stars');
    assert(stars === '3', `Level 101 應獲 3 星，實際 ${stars} 星`);
    const idiomCards = await page.locator('article[data-testid^="result-idiom-"]').count();
    assert(
      idiomCards === level101.slots.length,
      `Level 101 過關 overlay 應有 ${level101.slots.length} 張成語卡，實際 ${idiomCards}`,
    );
    await shot('result-101');
    if (isMobile) {
      await assertNoHorizontalOverflowIn(
        page,
        '[data-testid="result-overlay"] .overlay__panel',
        `${label}／Level 101 過關 overlay`,
      );
    }

    await page.click('[data-testid="next-level-btn"]');
    await waitForVisible(page, '[data-testid="game-screen"]');
    assert((await currentLevelId(page)) === 102, 'Level 101 下一關應為 Level 102');
    if (isMobile) await page.click('[data-testid="game-back"]');
    else await page.keyboard.press('Escape');
    await waitForVisible(page, '[data-testid="map-screen"]');
    checkConsole('Level 101');
  });

  /* ---------------------------------------------------------------- */
  /* 14. Level 105（進階 chain 6–7 句）                                 */
  /* ---------------------------------------------------------------- */
  await reporter.step('Level 105（進階 chain）：完成 6–7 句接龍過關', async () => {
    await seedProgress(page, { clearedThrough: 104, seenChapters: ALL_CHAPTER_IDS.slice(0, 11) });
    await page.goto(`${BASE_URL}/?debug=1#/game/105`);
    await waitForVisible(page, '[data-testid="game-screen"]');
    const level105 = await readDebugLevel(page, 105);
    assert(level105, 'debug 資料搵唔到 Level 105');
    assert(level105.mode === 'chain', `Level 105 應為 chain，實際 ${level105.mode}`);
    assert(
      level105.slots.length >= 6 && level105.slots.length <= 7,
      `Level 105 進階 chain 應有 6–7 句，實際 ${level105.slots.length} 句`,
    );
    assert(
      level105.rows === level105.slots.length && level105.cols === 4,
      `Level 105 chain 盤面應為 ${level105.slots.length}×4，實際 ${level105.rows}×${level105.cols}`,
    );
    const chainRows = level105.slots.length;
    const chainCells = await page.locator('[data-testid^="cell-"]').count();
    assert(chainCells === chainRows * 4, `Level 105 chain 格數應為 ${chainRows * 4}，實際 ${chainCells}`);
    await shot(`chain-${chainRows}`);
    await checkOverflow(`Level 105 chain ${chainRows}`);

    await solveCurrentLevel(page);
    await waitForResult(page);
    const stars = await page.getAttribute('[data-testid="result-stars"]', 'data-stars');
    assert(stars === '3', `Level 105 應獲 3 星，實際 ${stars} 星`);
    await shot('result-105');
    if (isMobile) {
      await assertNoHorizontalOverflowIn(
        page,
        '[data-testid="result-overlay"] .overlay__panel',
        `${label}／Level 105 過關 overlay`,
      );
    }
    await page.click('[data-testid="result-map-btn"]');
    await waitForVisible(page, '[data-testid="map-screen"]');
    checkConsole('Level 105');
  });

  /* ---------------------------------------------------------------- */
  /* 15. chain 7 關卡＋第 200 關完成（全部完成文案）                    */
  /* ---------------------------------------------------------------- */
  await reporter.step('chain 7 關卡＋第 200 關完成（全部完成文案）', async () => {
    const chain7Level = await page.evaluate(() => {
      const levels = window.__CAT_IDIOM_DEBUG__.levels;
      return levels.find((level) => level.mode === 'chain' && level.slots.length === 7) ?? null;
    });
    assert(chain7Level, 'debug 資料冇 7 句 chain 關卡（Issue #2 進階篇應有）');
    assert(chain7Level.id > 100, `7 句 chain 應屬進階篇，實際 Level ${chain7Level.id}`);

    // 截圖 7 句 chain 棋盤
    await seedProgress(page, { clearedThrough: chain7Level.id - 1, seenChapters: ALL_CHAPTER_IDS });
    await page.goto(`${BASE_URL}/?debug=1#/game/${chain7Level.id}`);
    await waitForVisible(page, '[data-testid="game-screen"]');
    const loadedChain7 = await readDebugLevel(page, chain7Level.id);
    assert(loadedChain7.slots.length === 7, 'chain 7 關卡應有 7 句');
    assert(loadedChain7.rows === 7 && loadedChain7.cols === 4, `chain 7 盤面應為 7×4，實際 ${loadedChain7.rows}×${loadedChain7.cols}`);
    const chain7Cells = await page.locator('[data-testid^="cell-"]').count();
    assert(chain7Cells === 28, `chain 7 棋盤應有 28 格，實際 ${chain7Cells}`);
    await shot('chain-7');
    await checkOverflow('chain 7 棋盤');

    // 第 200 關（seed 到 199 → 全部完成文案）
    await seedProgress(page, { clearedThrough: 199, seenChapters: ALL_CHAPTER_IDS });
    await page.goto(`${BASE_URL}/?debug=1#/game/200`);
    await waitForVisible(page, '[data-testid="game-screen"]');
    const level200 = await readDebugLevel(page, 200);
    assert(level200, 'debug 資料搵唔到 Level 200');
    assert(level200.mode === 'chain', `Level 200 應為 chain，實際 ${level200.mode}`);
    assert(level200.slots.length === 7, `Level 200 chain 應有 7 句，實際 ${level200.slots.length} 句`);
    await shot('game-200');
    await checkOverflow('Level 200 chain 7');

    await solveCurrentLevel(page);
    await waitForResult(page);
    const stars = await page.getAttribute('[data-testid="result-stars"]', 'data-stars');
    assert(stars === '3', `Level 200 應獲 3 星，實際 ${stars} 星`);
    const nextLabel = await innerTextOf(page, '[data-testid="next-level-btn"]');
    assert(
      nextLabel.includes('全部完成'),
      `第 200 關過關按鈕應顯示「全部完成！返回地圖」，實際「${nextLabel}」`,
    );
    const overlayText = await innerTextOf(page, '[data-testid="result-overlay"]');
    assert(!/undefined|null/.test(overlayText), '第 200 關過關 overlay 出現 undefined／null 文字');
    const finalBanner = page.locator('[data-testid="result-final-all"]');
    assert((await finalBanner.count()) === 1, '第 200 關過關缺少 result-final-all 祝賀 banner');
    const finalBannerText = ((await finalBanner.innerText()) ?? '').replace(/\s+/g, ' ');
    assert(
      finalBannerText.includes('恭喜完成全部 200 關'),
      `result-final-all 應顯示「恭喜完成全部 200 關！你係成語大師喵～」，實際「${finalBannerText}」`,
    );
    await shot('result-200');
    if (isMobile) {
      await assertNoHorizontalOverflowIn(
        page,
        '[data-testid="result-overlay"] .overlay__panel',
        `${label}／第 200 關過關 overlay`,
      );
    }
    await page.click('[data-testid="next-level-btn"]');
    await waitForVisible(page, '[data-testid="map-screen"]');
    const stored = await readStoredSave(page);
    assert(stored?.levels?.['200']?.stars === 3, 'localStorage 應記錄 Level 200 3 星');
    checkConsole('第 200 關');
  });
}
