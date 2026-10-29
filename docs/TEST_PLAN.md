# 《貓咪成語大冒險》測試計劃（Test Plan）

> 擁有者：**qa-tester**｜最後更新：2026-10-30（Issue #2：200 關／20 章）
> 規格來源：`docs/PLAN.md` §4（玩法）、§5（資料契約）、§6（核心 API）、§7（UI/testid）、§9（測試要求）
> 本文件描述測試策略、覆蓋範圍、指令、案例清單及已知限制；執行結果與 bug 清單見 `docs/QA_REPORT.md`。
> **現況（2026-10-30 00:24 最終）**：成語 **733** 條（粵拼 733/733）、**200 關／20 章**最終版已寫入；unit **73/73**、E2E **30/30**、verify-levels **18/18**、qa-testids 43/43、截圖 40 張全綠；Issue #1／#2 均已驗收（詳見 QA_REPORT §13／§14）。

## 1. 目標與範圍

驗證《貓咪成語大冒險》符合以下交付條件（PLAN §12 DoD 的測試部分）：

| # | 驗收目標 | 對應測試 |
| --- | --- | --- |
| 1 | 成語資料 ≥ 420 條，欄位、拼音、長度、唯一性、tier 分佈、接龍連通性合格 | `tests/unit/idioms.test.ts` |
| 2 | 200 關／20 章資料結構正確、幾何一致、接龍正確、bank 足夠、難度趨勢上升；基礎篇 1–100 凍結 | `tests/unit/levels.test.ts`＋`scripts/verify-levels.mjs` |
| 3 | 核心引擎（放字／判定／提示／星級／鎖定）行為正確 | `tests/unit/puzzle.test.ts` |
| 4 | 進度存檔（解鎖、最高星、重置、設定、圖鑑）正確 | `tests/unit/progress.test.ts` |
| 5 | **200 關全部可解**：用解答字自動填滿 → `isSolved()` 為 true | `tests/unit/levels.test.ts`「全關卡可解性模擬」 |
| 6 | 20 個章節場景 key 齊全、`chapterSceneSVG` 全部有效 | `tests/unit/scenes.test.ts` |
| 6 | 桌面＋手機 E2E 全流程可玩、無 console error、手機無橫向溢出 | `e2e/run.mjs` |
| 7 | 六大畫面截圖齊全（desktop＋mobile） | E2E 自動輸出至 `screenshots/` |

不在本計劃範圍：Cloudflare 部署驗證、GitHub push（由 Lead 負責）；成語出處考證（idiom-scholar）；關卡生成器內部實作（game-designer）。

## 2. 測試層級與工具

| 層級 | 工具 | 位置 | 說明 |
| --- | --- | --- | --- |
| 單元／整合測試 | Vitest 5（`environment: node`） | `tests/unit/*.test.ts` | 直接 import `src/core/**`、`src/data/**`；不啟動瀏覽器 |
| 資料獨立驗證 | Node 24（無第三方依賴） | `scripts/verify-levels.mjs` | 唔 import 生成器，獨立重新實作驗證；可交 CI／人手跑 |
| testid 契約檢查 | Node 24（靜態掃描 src） | `scripts/qa-testids.mjs` | 檢查 PLAN §7.4 全部 testid 仍存在；UI 改動後快速回歸 |
| E2E | Playwright 1.64（Chromium） | `e2e/run.mjs`＋`e2e/specs.mjs`＋`e2e/lib.mjs` | 自行 `vite build` ＋ `vite preview --port 4390`，桌面 1280×800／手機 390×844 |
| 視覺檢查 | Playwright 截圖 | `screenshots/**` | 人手 review 貓貓風格、繁中無亂碼、版面無爆格 |

單元測試以**最終規格**為準（≥ 688 條成語、200 關／20 章、進階篇規則、難度曲線），而非以 interim 資料為準；資料未定稿時嘅失敗會喺 `docs/QA_REPORT.md` 標明「待資料定稿」。

## 3. 單元測試覆蓋範圍

### 3.1 成語資料（`tests/unit/idioms.test.ts`）

- 數量 ≥ **688**（Issue #2；基礎 488＋進階 ≥200 冷僻成語）；JSON array。
- `id`：kebab-case、全庫唯一、等於拼音去聲調（`ü/ǖǘǚǜ` → `v`）。
- `word`：正好 4 個漢字（CJK 擴充 A＋基本區）、全庫唯一、不含常見簡體字黑名單。
- `pinyin`：4 個音節、每節有且只有一個聲調符號、只含 `a-zü` 與元音。
- **`cantonese`（Issue #1 粵拼）**：每筆必須存在且非空；正好 4 個音節（空格分隔、單空格）；每音節符合 `^[a-z]+[1-6]$`（帶聲調數字，例 `jat1 nok6 cin1 gam1`）；覆蓋率 **733/733**（最終資料）。
- `meaning` 漢字數 15–60；`origin` 漢字數 15–90；`sourceBook` 為 `《…》` 格式。
- `tier` 為 1–5 整數；tier 分佈下限（Issue #2）：tier1 ≥ 70、tier2 ≥ 110、tier3 ≥ 185、tier4 ≥ 185、tier5 ≥ 120。
- `tags`（如有）1–3 個、漢字。
- 接龍連通性（Issue #2）：可接龍成語（尾字＝另一成語首字）≥ **250**；最長簡單接龍 ≥ **7**（支援進階篇 chain 7）；常用連接字覆蓋（首／尾字齊備，`不`／`小` 只要求首字；`里` 與 `裡` 視為等價）。

### 3.2 章節資料（`src/data/chapters.json`）

- **20 章**、`id` 1–20 連續；`scene` 必須為 PLAN §4.1 指定 20 個 key（基礎 `garden`…`summit`＋進階 `library`…`zenith`）且不重複；`name`／`blurb` 為繁中非空。

### 3.3 關卡資料（`tests/unit/levels.test.ts`，200 關）

- **200 關**、`id` 1–200 連續、`chapter = ceil(id/10)`（1–20）；章節存在。
- 模式分佈：`chain` 只出現於 `id >= 11 && id % 5 === 0`（共 **38 關**：15…100、105…200）；Level 1–10 全部 `fill`；fill 162／chain 38。
- 成語數：基礎 fill 2–4／chain 3–6；**進階 fill 4–5／chain 6–7**；進階確實存在 5 成語 fill 與 7 句 chain 關。
- 幾何：`cells` 座標整數且唯一、單一漢字、無遊離格、`rows/cols` 等於實際最大範圍；chain 關 `rows = 成語數`、`cols = 4`；進階 fill 盤面 **≤10×10**。
- 交叉：fill 每個 slot 的答案字與 `idioms[idiomId].word` 逐字一致；第 2 個起每個成語至少與前面成語共用一格。
- 接龍：chain slot `row = index`、`col = 0`、`dir = "h"`；相鄰成語「上一句尾字＝下一句首字」。
- `blanks`：整數 0–3、遞增、不重複；基礎 fill 每句 1–3 空格；**進階 fill 每句 1–4 空格＋每關 ≥2 個 given**；chain row0 全顯示、row>0 首字保留、非最後一句尾字保留。
- `bank`：全部漢字；每個空格答案字 multiset 數量足夠；**基礎誘餌逐章精確（0,1,1,2,3,3,4,5,5,6）；進階誘餌＝min(章節目標 6,6,7,7,8,8,9,9,10,10, 22−空格)、bank ≤22**；誘餌唔等於任何空格答案字。
- `hintLimit`：1–3；基礎 3→1（章 1–3＝3、4–6＝2、7–10＝1）；進階 2→1（章 11–15＝2、16–20＝1）；各自非遞增。
- 錨：每關至少 2 個成語；**基礎每關 tier ≤2 錨、進階每關 tier ≤3 錨**。
- 進階 tier：平均 ≥3.8、章節平均 3.6–4.8、tier4/5 佔 ≥50%。
- 唯一性：200 關完整內容兩兩不同；成語組合（mode＋排序後 idiomId 集合）不重複（含基礎／進階互不重複）。
- **基礎篇凍結**：Level 1–100 與 v1.1 baseline（`tests/unit/fixtures/levels-v1.1-baseline.json`）逐關完全相同。
- 標題／故事：非空繁中、200 個標題全站唯一、故事長度合理、**不得穿橋提及本關答案成語**。
- 難度趨勢：20 章平均成語數、空格比例、平均 tier 單調上升（容差 1e-9／0.02／0.2）；基礎誘餌逐章不減、提示各自非遞增；進階誘餌受 bank ≤22 限制容許回落；Pearson r ≥ 0.6（空格比例／成語數／平均 tier vs 整體難度 0–1）。
- 生成參數：基礎 `min(4, 2+round(2d))`／`min(6, 3+round(3d))`；進階 `min(5, 4+round(d2))`／`min(7, 6+round(d2))`；空格數符合公式（fill ±1、chain 0）；`hintLimit` 符合章節曲線。
- **全關卡可解性模擬**：對每關 `createGame()` → 依 `solutionMap()` 逐格 `placeChar()`（由 bank multiset 分配字卡 index）→ 斷言最後 `isSolved() === true`、`getStars() === 3`、每個 slot 都有 `word-correct` 事件、chain row0 一開始已 locked（**200/200**）。

### 3.4 章節場景 SVG（`tests/unit/scenes.test.ts`）

- `SCENE_KEYS` 有 **20 個 key**（基礎 10＋進階 `library`/`volcano`/`desert`/`aurora`/`underwater`/`skycastle`/`shrine`/`harbor`/`firefly`/`zenith`），順序正確、無重複。
- `chapters.json` 每個章節 `scene` 依序對應 `SCENE_KEYS`。
- `chapterSceneSVG(key)` 對每個 key 回傳有效 SVG（`<svg`／`viewBox="0 0 800 450"`／`aria-hidden`／`scene-<key>` class／正確閉合／無 `undefined`／`NaN`／長度合理）。
- deterministic（連續兩次輸出相同）；defs `id` 全部有 `scene-<key>-` 前綴且不重複；未知 scene fallback 去 `garden`。

### 3.5 核心引擎（`tests/unit/puzzle.test.ts`）

以合成關卡（可控制答案）＋真實關卡（Level 1、chain Level 15）測試：

- `createGame`：given 格鎖定、空格未填、無空格成語自動 locked、分數／錯誤／提示歸零。
- `placeChar`：放字事件、重複放／放 given／放鎖定格回傳空事件；完成正確成語 → `word-correct`＋鎖定（格不可再改）。
- 錯誤成語：`word-wrong`＋`mistakes+1`＋清空玩家字（保留 given 及已鎖定交叉格）；清空格可重新放字。
- `removeChar`：回傳字卡 index、清空格、鎖定／given 回傳 `null`。
- `useHint`：揭示正確字、`source="hint"`、鎖定、`hintsUsed+1`、`bankIndex` 有效（或 -1 由 UI 補）；完成後回傳 `null`。
- 星級：0 錯 0 提示＝3 星；單項 >0＝2 星；兩項都 >0＝1 星；未完成＝0；`solved` 只發一次事件。
- 工具函數：`keyOf`、`slotCellKeys`、`slotBlankKeys`、`solutionMap`、`blankKeySet`。

### 3.6 進度存檔（`tests/unit/progress.test.ts`）

以 localStorage mock（Vitest `stubGlobal`）測試：

- `loadProgress`：預設值、損壞 JSON／版本不符安全回退、非法紀錄過濾、星級 clamp 1–3、collected 去重。
- `saveProgress`／`loadProgress` roundtrip；localStorage 寫入失敗（quota）不拋錯。
- `resetProgress`：清除儲存並回傳預設值。
- 解鎖：Level 1 永遠解鎖；Level N 需 N-1 有星；`nextPlayableLevel` 邊界（無進度／部分清關／全清）。
- `recordLevelClear`：寫入＋自動儲存、重玩保留最高星、保留最少錯誤次數、收集成語 id。
- `collectIdioms` 去重；`updateSettings` 部分更新＋持久化；`markChapterSeen`／`markTutorialSeen` 冪等。
- `totalStars`／`clearedCount`／`clearedRecord`。

## 4. 獨立關卡驗證腳本（`scripts/verify-levels.mjs`，200 關）

- 只讀 `src/data/{levels,idioms,chapters}.json`，**唔 import** `scripts/generate-levels.mjs`，獨立重新實作所有檢查。
- 檢查項（18 項；全部 fail 會令 exit code 非 0）：
  1. 章節資料（20 章／20 scene key）
  2. 關卡數量／id 連續（200）
  3. 章節對應（1–20）
  4. 模式分佈（38 關 chain、Level 1–10 fill）
  5. 棋盤幾何（cells 唯一、無遊離格、rows/cols、chain 盤面、進階 fill ≤10×10）
  6. 成語存在、交叉字一致、fill 交叉、chain 接龍
  7. blanks 合法（基礎 fill 1–3／進階 1–4、進階每關 ≥2 given、chain 連接位保留）
  8. bank multiset 足夠、基礎誘餌精確／進階 min(目標,22−空格)、bank ≤22
  9. 提示次數曲線（基礎 3→1、進階 2→1）
  10. 誘餌字曲線（目標非遞減；進階實際受上限回落屬設計）
  11. 成語數／空格數公式（基礎 d、進階 d2）
  12. 每關 ≥2 成語＋錨（基礎 tier≤2／進階 tier≤3）
  13. 進階 tier 水平（平均 ≥3.8、tier4/5 ≥50%）
  14. 標題／故事（唯一、繁中、無穿橋）
  15. 200 關唯一（完整內容＋成語組合）
  16. 難度趨勢（20 章單調＋Pearson r ≥ 0.6）
  17. 可解性（資料角度：答案字一致、每個空格所需字都在 bank、fill 每句有空格、chain 連接位保留）
  18. 成語接龍連通性（733 條／332 可接龍、最長 ≥7）
- 輸出：逐項 PASS／FAIL、警告、總體統計（總關卡、fill/chain 數、平均成語數、平均空格比例、tier 分佈、chain 長度），以及 20 章統計表。
- 用法：`npm run verify:levels`（或 `node scripts/verify-levels.mjs`）；`--json` 輸出機器可讀統計。

## 5. E2E 測試（Playwright）
## 5. E2E 測試（Playwright）

### 5.1 執行方式

- `npm run test:e2e` → `node e2e/run.mjs`
- runner 自行：`npm run build` → 子進程 `vite preview --port 4390 --strictPort` → 等 server ready → 開 Chromium → 跑 desktop（1280×800）＋mobile（390×844, isMobile/hasTouch）→ 收集結果 → 關 browser／kill server。
- 每個 viewport 使用**獨立 browser context**（localStorage 互不污染），並喺測試前 `localStorage.clear()`。
- 測試 URL 一律加 `?debug=1`，用 `window.__CAT_IDIOM_DEBUG__` 讀 `levels`／`idioms`／`chapters`／`getSave()`；**唔會**直接操作遊戲 state，所有放字都係真實點擊 `cell-<r>-<c>`＋`bank-<index>`。

### 5.2 桌面流程（1280×800，15 步）

1. 首頁：`home-screen`、`home-start`、`home-continue`（開始第 1 關）、`home-progress`（0/200）；截圖 `home-desktop.png`。
2. 地圖：`map-screen`、`chapter-1`…`chapter-20`、200 個 `level-btn-*`、基礎篇／進階篇分區、`map-stars-total` 0/600；截圖 `map-desktop.png`。
3. 入 Level 1：處理 `chapter-intro`（`chapter-intro-ok`）→ `tutorial-overlay`（`tutorial-ok`）；棋盤／字庫出現；截圖 `game-desktop.png`。
4. 由 `?debug=1` 讀 Level 1 正解 → 逐格點 `cell` 再點對應 `bank` → `result-overlay` 3 星、成語卡數量正確、**雙拼音（普通話＋粵拼）**；截圖 `result-desktop.png`。
5. 點 `next-level-btn` → Level 2 `game-screen`（hash `#/game/2`），教學／章節故事唔再彈。
6. 返回地圖（`Esc`）：Level 1 3 星、總星數 3/600、Level 3 未解鎖。
7. 首頁：`home-continue`「繼續第 2 關」、已過 1/200；reload 後進度保留。
8. 圖鑑：收集數 `/733`、已收集成語（含粵拼細字）、詳情（普＋粵雙拼音）、中文／拼音／粵拼搜尋、0 結果 DOM 清空。
9. 設定：音效／減少動態 toggle → reload 後保留。
10. 重置：取消唔清、確認後清空。
11. 錯誤路由：`#/game/2`（重置後）→ 地圖＋toast；`#/game/999` → 地圖＋toast；未知路由 → 首頁。
12. **Issue #2 seed**：`localStorage` seed Level 1–100 全 3 星 → 首頁「繼續第 101 關」、已過 100/200、地圖 20 章、第 11 章解鎖、總星數 300/600；截圖 `map-advanced-desktop.png`。
13. **Level 101（進階 fill）**：第 11 章 `chapter-intro`（新場景 `scene-library`＋章名）→ 4 成語 fill → 3 星過關 → 下一關 102；截圖 `chapter-intro-11`／`game-101`／`result-101`。
14. **Level 105（進階 chain 6）**：完成 6 句接龍 → 3 星過關；截圖 `chain-6`／`result-105`。
15. **chain 7＋第 200 關完成**：Level 155（7 句 chain）截圖 `chain-7`；seed 到 199 → 完成 Level 200 → 「全部完成！返回地圖」＋「恭喜完成全部 200 關」、localStorage 3 星；截圖 `game-200`／`result-200`。
16. 全程：每個畫面收集 `console.error`、`pageerror`、failed request；0 個＝PASS。

### 5.3 手機流程（390×844, isMobile）

- 流程同桌面（含 Issue #2 進階 seed／Level 101／105／155／200），另加：
  - 每個畫面斷言 `document.documentElement.scrollWidth <= window.innerWidth + 1`（無橫向溢出）；另加過關 overlay／圖鑑詳情 panel 內無溢出；特別覆蓋 **20 章地圖（fullPage 14792px）、4–5 成語棋盤、6–7 行 chain**。
  - 截圖 `home-mobile.png`、`map-mobile.png`、`game-mobile.png`、`result-mobile.png`、`codex-mobile.png`、`settings-mobile.png`、`map-advanced-mobile.png`、`chain-6-mobile.png`、`chain-7-mobile.png`、`result-200-mobile.png` 等。
- 手機版 overlays（章節故事／教學／過關）要可點擊、不被畫面裁切。

### 5.3 手機流程（390×844, isMobile）

- 流程同桌面（首頁→地圖→Level 1→過關→下一關→地圖→首頁→圖鑑→設定→reload 持久化），另加：
  - 每個畫面斷言 `document.documentElement.scrollWidth <= window.innerWidth + 1`（無橫向溢出）；Issue #1 另加過關 overlay／圖鑑詳情 panel 內無橫向溢出（雙拼音行）。
  - 截圖 `home-mobile.png`、`map-mobile.png`、`game-mobile.png`、`result-mobile.png`、`codex-mobile.png`、`settings-mobile.png`、`codex-search-jyutping-mobile.png`。
- 手機版 overlays（章節故事／教學）要可點擊、不被畫面裁切。

### 5.4 回歸斷言（低 bug 修正後加入）

- **Issue #1 粵拼**：過關成語卡需有普通話拼音全文＋`result-idiom-jyutping-<idiomId>`（數量＝關卡成語數、內容等於資料 `cantonese`）；圖鑑詳情需有 `codex-detail-jyutping` 且等於資料值；圖鑑搜尋以粵拼（帶／無聲調）命中；手機無 overflow、0 console error。
- **Issue #2 進階篇**：地圖 20 章／200 個 `level-btn-*`；seed Level 1–100 後首頁繼續 101、第 11 章解鎖；Level 101 fill（4–5 成語）／105（chain 6–7）／155（chain 7）／200（chain 7，全部完成文案）真實完成並 3 星；第 11 章 chapter-intro 顯示新場景 SVG；200 關地圖／進階棋盤／chain 7 手機無 overflow；0 console error。

- **BUG-QA-1**：圖鑑搜尋需同時支援中文、帶聲調拼音、無聲調拼音。
- **BUG-QA-2**：圖鑑 0 結果時 grid hidden、empty state 顯示、`[data-grid].childElementCount === 0`，清空搜尋恢復全部卡。
- **BUG-QA-3**：deep link 未解鎖／不存在關卡 → 安全引導地圖並顯示對應 toast。

### 5.5 截圖清單（自動生成）

`screenshots/home-desktop.png`、`map-desktop.png`、`game-desktop.png`、`result-desktop.png`、`codex-desktop.png`、`settings-desktop.png`，以及同名 `-mobile` 版本；overlay 補充：`tutorial-*`、`chapter-intro-*`、`reset-confirm-*`、`codex-detail-*`；Issue #1 補充：`codex-search-jyutping-*`；**Issue #2 補充：`map-advanced-*`、`chapter-intro-11-*`、`game-101-*`、`result-101-*`、`chain-6-*`、`result-105-*`、`chain-7-*`、`game-200-*`、`result-200-*`**。共 **40 張**，由 `npm run shots` 自動生成。

## 6. 指令

```bash
npm test                     # Vitest 單元／整合測試（73 tests）
npm run test:e2e             # E2E（會先 npm run build，再 vite preview:4390，跑完自動關 server；30 步約 108 秒）
npm run shots                # 只出截圖（薄 wrapper：跑 E2E 流程後列出 screenshots/ 成果，40 張約 110 秒）
npm run verify:levels        # 獨立關卡驗證腳本（統計＋pass/fail）
node scripts/qa-testids.mjs  # PLAN §7.4 testid 契約靜態檢查（43 項）
npm run verify:idioms        # 成語驗證（idiom-scholar 提供）
node scripts/generate-levels.mjs --dry-run   # 生成器自帶驗證（參考用，非 QA 交付）
```

E2E 環境變數（可選）：`E2E_HEADED=1` 開有頭瀏覽器、`E2E_SKIP_BUILD=1` 略過 build（用現有 dist）、`E2E_ONLY=desktop|mobile` 只跑一邊。

## 7. 測試案例清單（摘要）

| ID | 類別 | 案例 | 預期 |
| --- | --- | --- | --- |
| IDI-01 | 成語 | 總數（Issue #2） | ≥ 688（最終 733） |
| IDI-02 | 成語 | 4 字漢字、唯一 word | 全部合格 |
| IDI-03 | 成語 | id 由拼音去聲調、唯一 | 全部合格 |
| IDI-04 | 成語 | 拼音 4 音節＋聲調 | 全部合格 |
| IDI-05 | 成語 | meaning 15–60／origin 15–90 漢字 | 全部合格 |
| IDI-06 | 成語 | tier 1–5 及分佈下限（70/110/185/185/120） | 全部合格 |
| IDI-07 | 成語 | 接龍連通性 ≥250、最長 ≥7、連接字覆蓋（Issue #2） | 全部合格 |
| IDI-08 | 成語 | 粵拼 `cantonese`：每筆必有、4 音節、`^[a-z]+[1-6]$`、733/733（Issue #1／#2） | 全部合格 |
| CHA-01 | 章節 | 20 章、20 個 scene key 正確 | PASS |
| LVL-01 | 關卡 | 200 關、id/chapter 連續（1–20） | PASS |
| LVL-02 | 關卡 | 模式分佈（38 chain、1–10 fill） | PASS |
| LVL-03 | 關卡 | 幾何一致、無遊離格 | PASS |
| LVL-04 | 關卡 | 交叉字一致、chain 接龍 | PASS |
| LVL-05 | 關卡 | blanks 規則（基礎 1–3／進階 1–4＋≥2 given） | PASS |
| LVL-06 | 關卡 | bank multiset 足夠；進階 bank ≤22、誘餌 min(目標,22−空格) | PASS |
| LVL-07 | 關卡 | 每關 ≥2 成語、錨（基礎 tier≤2／進階 tier≤3） | PASS |
| LVL-08 | 關卡 | 200 關唯一（含成語組合、基礎／進階互不重複） | PASS |
| LVL-09 | 關卡 | 20 章難度趨勢上升（單調＋r ≥ 0.6）；進階 tier 平均 ≥3.8 | PASS |
| LVL-10 | 關卡 | 全關卡可解性模擬（引擎） | **200/200** |
| LVL-11 | 關卡 | 基礎篇 Level 1–100 與 v1.1 baseline 逐關完全相同 | PASS |
| SCN-01 | 場景 | 20 個 SCENE_KEYS、chapterSceneSVG 全部有效＋deterministic | PASS |
| PZL-01 | 引擎 | 建立遊戲初始狀態 | PASS |
| PZL-02 | 引擎 | 放字／退回／鎖定 | PASS |
| PZL-03 | 引擎 | 正確成語鎖定 | PASS |
| PZL-04 | 引擎 | 錯誤成語清空＋mistakes | PASS |
| PZL-05 | 引擎 | 交叉鎖定格不被清走 | PASS |
| PZL-06 | 引擎 | 提示揭示＋hintsUsed | PASS |
| PZL-07 | 引擎 | 星級規則（3/2/1） | PASS |
| PRG-01 | 存檔 | 讀寫 roundtrip／損壞回退 | PASS |
| PRG-02 | 存檔 | 解鎖、下一關 | PASS |
| PRG-03 | 存檔 | 最高星保留、最少錯誤 | PASS |
| PRG-04 | 存檔 | 重置、設定、章節/教學標記 | PASS |
| PRG-05 | 存檔 | 圖鑑收集去重 | PASS |
| TID-01 | 契約 | PLAN §7.4 全部 43 項 testid（36 固定＋7 動態）靜態存在 | PASS |
| E2E-D-* | E2E | 桌面流程 1–15（含 Issue #2 進階 seed／101／105／155／200） | 全 PASS |
| E2E-M-* | E2E | 手機流程＋無橫向溢出 | 全 PASS |
| E2E-R-* | E2E | 錯誤路由／未解鎖關卡安全引導 | PASS |
| E2E-J-01 | E2E | 過關成語卡同時顯示普通話拼音＋粵拼（`result-idiom-jyutping-<id>` 數量＝關卡成語數） | 全 PASS |
| E2E-J-02 | E2E | 圖鑑詳情顯示普通話拼音＋粵拼（`codex-detail-jyutping`） | 全 PASS |
| E2E-J-03 | E2E | 圖鑑以粵拼搜尋（帶聲調數字／無聲調數字）可命中 | 全 PASS |
| E2E-A-01 | E2E | 地圖 20 章／200 個 level-btn、基礎篇／進階篇分區、總星數 0/600 | PASS |
| E2E-A-02 | E2E | seed 100 關 → 首頁繼續第 101 關、第 11 章解鎖、Level 101 當前 | PASS |
| E2E-A-03 | E2E | Level 101 第 11 章 chapter-intro 新場景＋進階 fill 完成 3 星 | PASS |
| E2E-A-04 | E2E | Level 105 進階 chain 完成 3 星；Level 155 chain 7 棋盤截圖 | PASS |
| E2E-A-05 | E2E | 第 200 關完成「全部完成！返回地圖」＋「恭喜完成全部 200 關」 | PASS |
| E2E-A-06 | E2E | 手機 20 章地圖／4–5 成語棋盤／chain 7 無橫向溢出、0 console error | PASS |

## 7.1 Issue #1 專項驗收（粵拼 / 廣東話拼音）

GitHub Issue #1：成語同時提供**普通話拼音**與**粵拼（Jyutping）**，過關成語卡、成語圖鑑及搜尋均支援兩種。

| 驗收項 | 測試位置 | 標準 | 結果（2026-10-28） |
| --- | --- | --- | --- |
| 資料欄位 | `tests/unit/idioms.test.ts`「cantonese 粵拼」 | 488/488 筆有 `cantonese`、4 音節、`^[a-z]+[1-6]$`、無空值、無多餘空格 | ✅ PASS（488/488） |
| 契約檢查 | `node scripts/verify-idioms.mjs`（idiom-scholar） | 粵拼格式／4 音節檢查 PASS | ✅ PASS（粵拼 488/488） |
| 過關成語卡 | `e2e/specs.mjs` 完成 Level 1 步驟 | 每張卡同時有普通話拼音＋粵拼；`result-idiom-jyutping-<idiomId>` 數量＝成語數、內容等於 `cantonese` | ✅ desktop＋mobile |
| 圖鑑詳情 | `e2e/specs.mjs` 圖鑑詳情步驟 | 同時顯示普通話拼音＋`codex-detail-jyutping`（內容等於 `cantonese`） | ✅ desktop＋mobile |
| 圖鑑卡細字 | `e2e/specs.mjs` 圖鑑清單步驟 | 已收集卡 `.codex-card__jyut` 含 `cantonese` | ✅ desktop＋mobile |
| 圖鑑搜尋 | `e2e/specs.mjs` 圖鑑搜尋步驟 | 粵拼帶聲調數字、無聲調數字都能命中 | ✅ 兩種都命中（另截圖） |
| 響應式／穩定性 | E2E 每步 | 手機 390×844 無橫向溢出；0 console error／pageerror／failed request | ✅（overlay panel 亦無溢出） |
| 截圖 | `npm run shots` | 過關／圖鑑詳情／粵拼搜尋截圖可見雙拼音 | ✅ 22 張（含 2 張粵拼搜尋） |

> 最終狀態：資料與 UI 已 ready，全套 PASS；失敗分類（資料未 ready／UI 未 ready）只作開發期指引，最終冇殘留失敗。詳見 `docs/QA_REPORT.md` §13。
> **Issue #2 後更新**：成語由 488→733、關卡 100→200，粵拼覆蓋 733/733；本節斷言全部保留並已重跑 PASS（E2E 30 步）。

## 7.2 Issue #2 專項驗收（200 關／20 章進階篇）

GitHub Issue #2：加多 100 關、更多變化、更少見成語、加難度。

| 驗收項 | 測試位置 | 標準 | 結果（2026-10-30） |
| --- | --- | --- | --- |
| 成語規模 | `tests/unit/idioms.test.ts`／`verify-idioms.mjs` | ≥688 條、tier 70/110/185/185/120、粵拼 733/733、接龍 ≥250／最長 ≥7 | ✅ PASS（733／332 可接龍／最長 12） |
| 關卡規模 | `tests/unit/levels.test.ts` | 200 關、id 1–200、chapter 1–20、fill 162／chain 38 | ✅ PASS |
| 進階規則 | `tests/unit/levels.test.ts`／`verify-levels.mjs` | 進階 fill 4–5、chain 6–7、每句 1–4 空格＋≥2 given、bank ≤22、誘餌 min(目標,22−空格)、錨 tier≤3、平均 tier ≥3.8 | ✅ PASS（進階平均 tier 4.00、tier4/5 70.2%） |
| 基礎篇凍結 | `tests/unit/levels.test.ts`（fixture baseline） | Level 1–100 與 v1.1 逐關完全相同 | ✅ PASS |
| 場景 | `tests/unit/scenes.test.ts` | 20 場景 key、SVG 有效、deterministic、id 前綴 | ✅ PASS |
| 可解性 | `tests/unit/levels.test.ts`（真引擎） | 200/200 `isSolved()`、全部 3 星、零錯誤 | ✅ PASS |
| 進階 E2E | `e2e/specs.mjs` steps 12–15 | 地圖 20 章／200 關、首頁繼續 101、第 11 章故事、Level 101／105／155／200、全部完成文案、手機無 overflow、0 console error | ✅ desktop＋mobile |
| 截圖 | `npm run shots` | 進階地圖／第 11 章故事／Level 101／chain 6／chain 7／Level 200 | ✅ 40 張（新增 18 張） |

> 詳見 `docs/QA_REPORT.md` §14。進階篇 Level 101 實際係 4 成語 fill、Level 105 係 chain 6（依 PLAN §4.5 公式）；chain 7 由 Level 155 起，E2E 已覆蓋並截圖。

## 8. 通過標準

- `npm test`：0 failed（73/73；資料定稿後）。
- `npm run verify:levels`：exit code 0，18/18 檢查 PASS（200 關；warning 允許）。
- `npm run test:e2e`：desktop＋mobile 全 PASS（30 步）；任何 console error／pageerror＝FAIL。
- `screenshots/` 12 張主截圖（共 40 張，含 Issue #1 粵拼搜尋 2 張＋Issue #2 進階 18 張）齊全且人手檢查無亂碼、無爆版、雙拼音無截字。

## 9. 已知限制與風險

1. **資料狀態**：`idioms.json`（733 條）、`levels.json`（200 關）與 `chapters.json`（20 章）已定稿，全套測試全綠；早期 interim（172／488 條、chain 縮短、成語組合重複）問題已消除。若部署前資料再改動，需重跑全套並更新 QA 報告（記住比對資料 sha256：levels `12bba215…`）。
2. **testid 契約**：`scripts/qa-testids.mjs` 只做靜態掃描；動態實際可用性由 E2E 驗證。
3. **難度「曲線」屬統計驗證**：以章節平均單調＋Pearson 相關係數檢查，非逐關嚴格遞增（設計允許章節內微調）。
4. **E2E 只跑 Chromium**：Playwright 依快取 Chromium；WebKit／Firefox 未安裝、不納入本輪。
5. **WebAudio 唔可自動驗證**：只斷言設定持久化及無 console error；音質需人手檢查。
6. **截圖屬「有冇爆版」檢查**，視覺美感由 Lead／ui-dev 人手 review。
7. **E2E 依賴 testid 契約**（PLAN §7.4）：任何 testid 改名／移除會令 E2E 失敗，屬 UI 契約破壞，需通知 ui-dev。
8. E2E 完成 Level 1 依賴 `?debug=1` 暴露正解；唔會喺正式版 URL 使用。
9. **Issue #2 進階規則**：進階 fill 每句可 1–4 空格（基礎 1–3）、每關 ≥2 given；bank 硬上限 22 令後期實際誘餌 8–9（低於章節目標 9–10），屬設計允許，測試以 `min(目標, 22−空格)` 精確驗證。
10. **Level 101／105 實際結構**：依 PLAN §4.5 公式，Level 101 係 4 成語 fill（唔係 5）、Level 105 係 chain 6（chain 7 由 Level 155 起）；E2E 已分別覆蓋 155 的 7 句 chain 並截圖。
11. **基礎篇凍結**：Level 1–100 與 v1.1 逐關相同（fixture 比對）；生成器改動若影響基礎篇會即時 FAIL。
12. **Bundle 增長**：Issue #2 後 JS gzip 約 205 kB（733 成語＋200 關＋20 場景），仍可接受；未來可考慮 lazy data／code splitting。
13. E2E 曾出現一次 mobile context 首屏偶發 timeout（合併流程、desktop 先中止後）；單獨重跑及之後多次全套均 PASS，runner 已加 failure 診斷輸出及自動清理舊 `failure-*.png`。
9. **粵拼讀音約定**：文白異讀採「香港通行讀音」（例 坐井觀天 `co5`、車水馬龍 `ce1`、後生可畏 `saang1`），記錄於 `docs/IDIOM_SOURCES.md` §11；E2E 由 debug 資料讀預期值，不 hardcode 粵拼。
10. E2E 曾出現一次 mobile context 首屏偶發 timeout（合併流程、desktop 先中止後）；單獨重跑及之後多次全套均 PASS，runner 已加 failure 診斷輸出及自動清理舊 `failure-*.png`。
