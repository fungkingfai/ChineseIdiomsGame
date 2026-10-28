# 《貓咪成語大冒險》測試計劃（Test Plan）

> 擁有者：**qa-tester**｜最後更新：2026-10-28（Phase 2）
> 規格來源：`docs/PLAN.md` §4（玩法）、§5（資料契約）、§6（核心 API）、§7（UI/testid）、§9（測試要求）
> 本文件描述測試策略、覆蓋範圍、指令、案例清單及已知限制；執行結果與 bug 清單見 `docs/QA_REPORT.md`。
> **現況（2026-10-28 定稿）**：成語 488 條、100 關最終版已寫入，全套測試全綠；早期 interim 資料限制已消除（詳見 QA_REPORT）。

## 1. 目標與範圍

驗證《貓咪成語大冒險》符合以下交付條件（PLAN §12 DoD 的測試部分）：

| # | 驗收目標 | 對應測試 |
| --- | --- | --- |
| 1 | 成語資料 ≥ 420 條，欄位、拼音、長度、唯一性、tier 分佈、接龍連通性合格 | `tests/unit/idioms.test.ts` |
| 2 | 100 關資料結構正確、幾何一致、接龍正確、bank 足夠、難度趨勢上升 | `tests/unit/levels.test.ts`＋`scripts/verify-levels.mjs` |
| 3 | 核心引擎（放字／判定／提示／星級／鎖定）行為正確 | `tests/unit/puzzle.test.ts` |
| 4 | 進度存檔（解鎖、最高星、重置、設定、圖鑑）正確 | `tests/unit/progress.test.ts` |
| 5 | **100 關全部可解**：用解答字自動填滿 → `isSolved()` 為 true | `tests/unit/levels.test.ts`「全關卡可解性模擬」 |
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

單元測試以**最終規格**為準（≥ 420 條成語、100 關、難度曲線），而非以目前 interim 資料為準；資料未定稿時嘅失敗會喺 `docs/QA_REPORT.md` 標明「待資料定稿」。

## 3. 單元測試覆蓋範圍

### 3.1 成語資料（`tests/unit/idioms.test.ts`）

- 數量 ≥ 420；JSON array。
- `id`：kebab-case、全庫唯一、等於拼音去聲調（`ü/ǖǘǚǜ` → `v`）。
- `word`：正好 4 個漢字（CJK 擴充 A＋基本區）、全庫唯一、不含常見簡體字黑名單。
- `pinyin`：4 個音節、每節有且只有一個聲調符號、只含 `a-zü` 與元音。
- `meaning` 漢字數 15–60；`origin` 漢字數 15–90；`sourceBook` 為 `《…》` 格式。
- `tier` 為 1–5 整數；tier 分佈下限：tier1 ≥ 70、tier2 ≥ 100、tier3 ≥ 100、tier4 ≥ 80、tier5 ≥ 50。
- `tags`（如有）1–3 個、漢字。
- 接龍連通性：可接龍成語（尾字＝另一成語首字）≥ 150；最長接龍 ≥ 6（支援第 10 章 chain）；常用連接字覆蓋（首／尾字齊備，`不`／`小` 只要求首字；`里` 與 `裡` 視為等價）。

### 3.2 章節資料（`src/data/chapters.json`）

- 10 章、`id` 1–10 連續；`scene` 必須為 PLAN §4.1 指定 10 個 key（`garden`…`summit`）且不重複；`name`／`blurb` 為繁中非空。

### 3.3 關卡資料（`tests/unit/levels.test.ts`）

- 100 關、`id` 1–100 連續、`chapter = ceil(id/10)`；章節存在。
- 模式分佈：`chain` 只出現於 `id >= 11 && id % 5 === 0`（共 18 關）；Level 1–10 全部 `fill`。
- 幾何：`cells` 座標整數且唯一、單一漢字、無遊離格（cell 聯集＝slot 覆蓋格）、`rows/cols` 等於實際最大範圍；chain 關 `rows = 成語數`、`cols = 4`。
- 交叉：fill 每個 slot 的答案字與 `idioms[idiomId].word` 逐字一致；第 2 個起每個成語至少與前面成語共用一格。
- 接龍：chain slot `row = index`、`col = 0`、`dir = "h"`；相鄰成語「上一句尾字＝下一句首字」。
- `blanks`：整數 0–3、遞增、不重複；fill 每句 1–3 個空格；chain row0 全顯示、row>0 首字保留、非最後一句尾字保留。
- `bank`：全部漢字；每個空格答案字 multiset 數量足夠；`bank.length ≥ 空格數`（差額＝誘餌字）；誘餌字數量逐章非遞減、第 1 章 0、第 10 章 6。
- `hintLimit`：1–3；第 1 章 3 → 第 10 章 1；章節平均非遞增。
- 每關至少 2 個成語；每關至少一個 tier ≤ 2 錨（PLAN §4.4）。
- 唯一性：100 關完整內容兩兩不同；成語組合（mode＋排序後 idiomId 集合）不重複。
- 標題／故事：非空繁中、標題全站唯一、故事長度合理、**不得穿橋提及本關答案成語**。
- 難度趨勢：章節平均成語數、空格比例、平均 tier 單調上升（容差 1e-9／0.02／0.2），提示次數、誘餌字單調；逐關 Pearson 相關係數 r ≥ 0.6（空格比例／成語數／平均 tier vs `d=(id-1)/99`）。
- 生成參數：fill 成語數 = `min(4, 2 + round(2d))`；chain 長度 3–6；空格數符合 `clamp(round(ratio×4k), …)`（fill ±1、chain 0）；`hintLimit` 符合章節曲線。
- **全關卡可解性模擬**：對每關 `createGame()` → 依 `solutionMap()` 逐格 `placeChar()`（由 bank multiset 分配字卡 index）→ 斷言最後 `isSolved() === true`、`getStars() === 3`、每個 slot 都有 `word-correct` 事件、chain row0 一開始已 locked。

### 3.4 核心引擎（`tests/unit/puzzle.test.ts`）

以合成關卡（可控制答案）＋真實關卡（Level 1、chain Level 15）測試：

- `createGame`：given 格鎖定、空格未填、無空格成語自動 locked、分數／錯誤／提示歸零。
- `placeChar`：放字事件、重複放／放 given／放鎖定格回傳空事件；完成正確成語 → `word-correct`＋鎖定（格不可再改）。
- 錯誤成語：`word-wrong`＋`mistakes+1`＋清空玩家字（保留 given 及已鎖定交叉格）；清空格可重新放字。
- `removeChar`：回傳字卡 index、清空格、鎖定／given 回傳 `null`。
- `useHint`：揭示正確字、`source="hint"`、鎖定、`hintsUsed+1`、`bankIndex` 有效（或 -1 由 UI 補）；完成後回傳 `null`。
- 星級：0 錯 0 提示＝3 星；單項 >0＝2 星；兩項都 >0＝1 星；未完成＝0；`solved` 只發一次事件。
- 工具函數：`keyOf`、`slotCellKeys`、`slotBlankKeys`、`solutionMap`、`blankKeySet`。

### 3.5 進度存檔（`tests/unit/progress.test.ts`）

以 localStorage mock（Vitest `stubGlobal`）測試：

- `loadProgress`：預設值、損壞 JSON／版本不符安全回退、非法紀錄過濾、星級 clamp 1–3、collected 去重。
- `saveProgress`／`loadProgress` roundtrip；localStorage 寫入失敗（quota）不拋錯。
- `resetProgress`：清除儲存並回傳預設值。
- 解鎖：Level 1 永遠解鎖；Level N 需 N-1 有星；`nextPlayableLevel` 邊界（無進度／部分清關／全清）。
- `recordLevelClear`：寫入＋自動儲存、重玩保留最高星、保留最少錯誤次數、收集成語 id。
- `collectIdioms` 去重；`updateSettings` 部分更新＋持久化；`markChapterSeen`／`markTutorialSeen` 冪等。
- `totalStars`／`clearedCount`／`clearedRecord`。

## 4. 獨立關卡驗證腳本（`scripts/verify-levels.mjs`）

- 只讀 `src/data/{levels,idioms,chapters}.json`，**唔 import** `scripts/generate-levels.mjs`，獨立重新實作所有檢查。
- 檢查項（全部 fail 會令 exit code 非 0）：
  1. 關卡數量／id 連續／章節對應
  2. 模式分佈（18 關 chain、Level 1–10 fill）
  3. 棋盤幾何（cells 唯一、無遊離格、rows/cols、chain 盤面）
  4. 成語存在、交叉字一致、fill 交叉、chain 接龍
  5. blanks 合法（排序、範圍、fill/chain 規則）
  6. bank multiset 足夠、誘餌字規則
  7. 提示次數曲線
  8. 標題／故事（唯一、繁中、無穿橋）
  9. tier 錨（每關至少一個 tier ≤ 2）
  10. 100 關唯一（完整內容；成語組合重複列警告）
  11. 難度趨勢（章節單調＋Pearson r ≥ 0.6）
  12. 可解性（資料角度：答案字一致、每個空格所需字都在 bank、fill 每句有空格、chain 連接位保留）
- 輸出：逐項 PASS／FAIL、警告（interim 資料 fallback）、總體統計（總關卡、fill/chain 數、平均成語數、平均空格比例、tier 分佈、chain 長度），以及每章統計表。
- 用法：`npm run verify:levels`（或 `node scripts/verify-levels.mjs`）；`--json` 輸出機器可讀統計。

## 5. E2E 測試（Playwright）

### 5.1 執行方式

- `npm run test:e2e` → `node e2e/run.mjs`
- runner 自行：`npm run build` → 子進程 `vite preview --port 4390 --strictPort` → 等 server ready → 開 Chromium → 跑 desktop（1280×800）＋mobile（390×844, isMobile/hasTouch）→ 收集結果 → 關 browser／kill server。
- 每個 viewport 使用**獨立 browser context**（localStorage 互不污染），並喺測試前 `localStorage.clear()`。
- 測試 URL 一律加 `?debug=1`，用 `window.__CAT_IDIOM_DEBUG__` 讀 `levels`／`idioms`／`chapters`／`getSave()`；**唔會**直接操作遊戲 state，所有放字都係真實點擊 `cell-<r>-<c>`＋`bank-<index>`。

### 5.2 桌面流程（1280×800）

1. 首頁：`home-screen`、`home-start`、`home-continue`（開始第 1 關）、`home-progress`；截圖 `home-desktop.png`。
2. 地圖：`map-screen`、`chapter-1`…`chapter-10`、`level-btn-1` 可用、`level-btn-2` 未解鎖、`map-stars-total` 0/300；截圖 `map-desktop.png`。
3. 入 Level 1：處理 `chapter-intro`（`chapter-intro-ok`）→ `tutorial-overlay`（`tutorial-ok`）；`game-screen`／`game-title`／`cell-*`／`bank-*` 出現；截圖 `game-desktop.png`。
4. 由 `?debug=1` 讀 Level 1 正解 → 逐格點 `cell` 再點對應 `bank`（字卡 index 依 multiset 分配）→ `result-overlay` 出現、`result-stars` 3 星、`result-idiom-<id>` 數量 = 本關成語數；截圖 `result-desktop.png`。
5. 點 `next-level-btn` → Level 2 `game-screen`（hash `#/game/2`）。
6. `game-back` → 地圖：`level-btn-1` 有星（aria-label「已過關，獲得 3 星」）、`map-stars-total` 3/300。
7. `map-back` → 首頁：`home-continue` 顯示「繼續第 2 關」、`home-progress` 顯示已過 1/100。
8. reload（`?debug=1#/home`）→ 進度保留（已過 1 關、3 星）。
9. 圖鑑：`home-codex` → `codex-screen`、`codex-count` 顯示已收集 ≥ Level 1 成語數、`codex-item-<已收集 id>` 文字為成語（非「？？？？」）；中文／帶聲調／**無聲調拼音**搜尋都要命中（BUG-QA-1 回歸）；0 結果時空狀態＋`[data-grid]` DOM 清空（BUG-QA-2 回歸）；截圖 `codex-desktop.png`；點卡片開 `codex-detail`；關閉。
10. 設定：`home-settings` → `settings-screen`；切換 `settings-sound` 取消、`settings-motion` 開啟 → reload → 兩個 toggle 狀態保留；截圖 `settings-desktop.png`。
11. 重置：`settings-reset` → `reset-confirm` 出現 → `reset-cancel` 取消 → 再開 → `reset-confirm` 確認 → localStorage 進度清空。
12. 錯誤路由：`#/game/2`（未解鎖，重置後）→ 地圖＋提示 toast；`#/game/999`（不存在）→ 地圖＋提示 toast；`#/unknown-route` → 首頁（BUG-QA-3 回歸）。
13. 全程：每個畫面收集 `console.error`、`pageerror` 及 failed request，任何一項都當 FAIL。

### 5.3 手機流程（390×844, isMobile）

- 流程同桌面（首頁→地圖→Level 1→過關→下一關→地圖→首頁→圖鑑→設定→reload 持久化），另加：
  - 每個畫面斷言 `document.documentElement.scrollWidth <= window.innerWidth + 1`（無橫向溢出）。
  - 截圖 `home-mobile.png`、`map-mobile.png`、`game-mobile.png`、`result-mobile.png`、`codex-mobile.png`、`settings-mobile.png`。
- 手機版 overlays（章節故事／教學）要可點擊、不被畫面裁切。

### 5.4 回歸斷言（低 bug 修正後加入）

- **BUG-QA-1**：圖鑑搜尋需同時支援中文、帶聲調拼音、無聲調拼音。
- **BUG-QA-2**：圖鑑 0 結果時 grid hidden、empty state 顯示、`[data-grid].childElementCount === 0`，清空搜尋恢復全部卡。
- **BUG-QA-3**：deep link 未解鎖／不存在關卡 → 安全引導地圖並顯示對應 toast。

### 5.5 截圖清單（自動生成）

`screenshots/home-desktop.png`、`map-desktop.png`、`game-desktop.png`、`result-desktop.png`、`codex-desktop.png`、`settings-desktop.png`，以及同名 `-mobile` 版本；另外 overlay 補充：`tutorial-*`、`chapter-intro-*`、`reset-confirm-*`。

## 6. 指令

```bash
npm test                     # Vitest 單元／整合測試（一次）
npm run test:e2e             # E2E（會先 npm run build，再 vite preview:4390，跑完自動關 server）
npm run shots                # 只出截圖（薄 wrapper：跑 E2E 流程後列出 screenshots/ 成果，約 33 秒）
npm run verify:levels        # 獨立關卡驗證腳本（統計＋pass/fail）
node scripts/qa-testids.mjs  # PLAN §7.4 testid 契約靜態檢查（43 項）
npm run verify:idioms        # 成語驗證（idiom-scholar 提供）
node scripts/generate-levels.mjs --dry-run   # 生成器自帶驗證（參考用，非 QA 交付）
```

E2E 環境變數（可選）：`E2E_HEADED=1` 開有頭瀏覽器、`E2E_SKIP_BUILD=1` 略過 build（用現有 dist）、`E2E_ONLY=desktop|mobile` 只跑一邊。

## 7. 測試案例清單（摘要）

| ID | 類別 | 案例 | 預期 |
| --- | --- | --- | --- |
| IDI-01 | 成語 | 總數 | ≥ 420 |
| IDI-02 | 成語 | 4 字漢字、唯一 word | 全部合格 |
| IDI-03 | 成語 | id 由拼音去聲調、唯一 | 全部合格 |
| IDI-04 | 成語 | 拼音 4 音節＋聲調 | 全部合格 |
| IDI-05 | 成語 | meaning 15–60／origin 15–90 漢字 | 全部合格 |
| IDI-06 | 成語 | tier 1–5 及分佈下限 | 全部合格 |
| IDI-07 | 成語 | 接龍連通性 ≥150、連接字覆蓋 | 全部合格 |
| CHA-01 | 章節 | 10 章、scene key 正確 | PASS |
| LVL-01 | 關卡 | 100 關、id/chapter 連續 | PASS |
| LVL-02 | 關卡 | 模式分佈（18 chain、1–10 fill） | PASS |
| LVL-03 | 關卡 | 幾何一致、無遊離格 | PASS |
| LVL-04 | 關卡 | 交叉字一致、chain 接龍 | PASS |
| LVL-05 | 關卡 | blanks 規則 | PASS |
| LVL-06 | 關卡 | bank multiset 足夠 | PASS |
| LVL-07 | 關卡 | 每關 ≥2 成語、tier ≤2 錨 | PASS |
| LVL-08 | 關卡 | 100 關唯一（含成語組合） | PASS |
| LVL-09 | 關卡 | 難度趨勢上升（單調＋r ≥ 0.6） | PASS |
| LVL-10 | 關卡 | 全關卡可解性模擬（引擎） | 100/100 |
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
| E2E-D-* | E2E | 桌面流程 1–11 | 全 PASS |
| E2E-M-* | E2E | 手機流程＋無橫向溢出 | 全 PASS |
| E2E-R-* | E2E | 錯誤路由／未解鎖關卡安全引導 | PASS |

## 8. 通過標準

- `npm test`：0 failed（資料定稿後）。
- `npm run verify:levels`：exit code 0，全部檢查 PASS（warning 允許）。
- `npm run test:e2e`：desktop＋mobile 全 PASS；任何 console error／pageerror＝FAIL。
- `screenshots/` 12 張主截圖齊全且人手檢查無亂碼、無爆版。

## 9. 已知限制與風險

1. **資料狀態**：`idioms.json`（488 條）與 `levels.json`（100 關）已定稿，全套測試全綠；早期 interim（172 條、chain 縮短、成語組合重複）問題已消除。若部署前資料再改動，需重跑全套並更新 QA 報告（記住比對資料 sha256）。
2. **testid 契約**：`scripts/qa-testids.mjs` 只做靜態掃描；動態實際可用性由 E2E 驗證。
3. **難度「曲線」屬統計驗證**：以章節平均單調＋Pearson 相關係數檢查，非逐關嚴格遞增（設計允許章節內微調）。
4. **E2E 只跑 Chromium**：Playwright 依快取 Chromium；WebKit／Firefox 未安裝、不納入本輪。
5. **WebAudio 唔可自動驗證**：只斷言設定持久化及無 console error；音質需人手檢查。
6. **截圖屬「有冇爆版」檢查**，視覺美感由 Lead／ui-dev 人手 review。
7. **E2E 依賴 testid 契約**（PLAN §7.4）：任何 testid 改名／移除會令 E2E 失敗，屬 UI 契約破壞，需通知 ui-dev。
8. E2E 完成 Level 1 依賴 `?debug=1` 暴露正解；唔會喺正式版 URL 使用。
