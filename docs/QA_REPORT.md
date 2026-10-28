# 《貓咪成語大冒險》QA 報告（QA_REPORT）

> 測試執行：**2026-10-28 20:32–20:38（全量）＋ 22:12–22:20（GitHub Issue #1 粵拼迴歸，全套重跑）**｜執行者：qa-tester
> 測試對象（Issue #1 粵拼定稿版；含 ui-dev 3 個 low bug 修正）：
> - `src/data/idioms.json` — 488 條，**每筆含 `cantonese` 粵拼（488/488）**，sha256 `9ba371d48c3269e0464344b5b57a1400c3ff62ff6d3e5f9b75690f49a713d0a7`
> - `src/data/levels.json` — 100 關，sha256 `99a286b9ba0618bf438260d334e13a54c10c1ecde0769c094a670e9591cadea6`（game-designer 定稿版）
> - `src/data/chapters.json` — 10 章
> 測試計劃：`docs/TEST_PLAN.md`｜Issue #1 專項驗收：見 §13

---

## 1. 結論摘要

**全部驗收測試通過，0 高／中嚴重程度 bug，可進入部署流程。**

| 測試項目 | 結果 | 通過率 |
| --- | --- | --- |
| `npm run check`（tsc strict） | ✅ PASS | — |
| `npm run build`（tsc＋Vite build） | ✅ PASS | — |
| `npm test`（Vitest：資料／引擎／存檔） | ✅ **63 / 63**（4 檔案；含粵拼驗證） | 100% |
| `node scripts/verify-levels.mjs`（獨立關卡驗證） | ✅ **17 / 17 檢查 PASS，0 警告** | 100% |
| `node scripts/verify-idioms.mjs`（成語契約） | ✅ PASS（**粵拼 488/488**；10 項低風險 sourceBook 警告） | 100% |
| `node scripts/qa-testids.mjs`（PLAN §7.4 testid 契約） | ✅ **43 / 43** | 100% |
| `npm run test:e2e`（Playwright：桌面＋手機） | ✅ **22 / 22 步驟**（desktop 11＋mobile 11；含 Issue #1 粵拼斷言）；最終重跑 34.2s | 100% |
| 截圖 | ✅ **22 張**（12 張主畫面×2＋4 組 overlay×2＋粵拼搜尋×2） | — |

- 全關卡可解性：**100 / 100 關**用真引擎 `createGame → placeChar(正解) → isSolved() === true`、全部 3 星、零失誤。
- E2E 用 `?debug=1` 讀正解，**真實點擊** `cell-<r>-<c>`＋`bank-<index>` 完成 Level 1；桌面與手機流程完全通過，全程**無 console error／pageerror／request failed**。
- 手機 390×844：每個主要畫面 `document.documentElement.scrollWidth <= innerWidth`（無橫向溢出）。
- 首屏**零外部網路請求**（所有 request 同源，`?debug=1` 只用本地資料）。
- **GitHub Issue #1（粵拼）**：488/488 成語有 `cantonese`（4 音節、`^[a-z]+[1-6]$`）；過關成語卡與圖鑑詳情同時顯示普通話拼音＋粵拼（「普」／「粵」徽章）；圖鑑支援粵拼搜尋（帶聲調／無聲調／連寫）；E2E desktop＋mobile 全部斷言 PASS，手機雙拼音版面無 overflow（見 §13）。
- 剩餘問題：**0 個未修 UI bug**——3 個低嚴重程度 UI bug（圖鑑拼音搜尋、圖鑑 0 結果 stale DOM、deep-link 提示 toast 被清走）已由 ui-dev 全部修正，QA 已加回歸斷言並重跑全綠（詳見 §8.2–8.4、§8.8）；另有 10 項成語 `sourceBook` 格式 warning（idiom-scholar，低）及 1 項不可達引擎邊界觀察（§8.6）。

---

## 2. 測試環境

| 項目 | 版本 |
| --- | --- |
| OS | Linux（Windows 側 WSL 環境），Node.js **v24.21.0**／npm **11.19.0** |
| 瀏覽器 | Playwright Chromium **1.64.1**（headless） |
| 測試框架 | Vitest **5.0.5**（environment: node） |
| 建置 | Vite **8.3.5**、TypeScript **7.0.2** |
| 螢幕 | 桌面 1280×800；手機 390×844（deviceScaleFactor 2、isMobile、hasTouch） |
| 測試 URL | `http://127.0.0.1:4390/?debug=1#/...`（E2E 自行 build＋`vite preview --port 4390 --strictPort`） |

### 2.1 資料規模摘要

| 項目 | 數值 |
| --- | --- |
| 成語總數 | **488** 條（PLAN 下限 420） |
| tier 分佈 | tier1 **70**／tier2 **107**／tier3 **165**／tier4 **96**／tier5 **50**（全部達 PLAN §5.1 下限） |
| 粵拼（`cantonese`） | **488 / 488** 條（4 音節、帶聲調數字 1–6，例 `syut3 zung1 sung3 taan3`） |
| 可接龍成語 | **174** 筆（下限 150）；578 條接龍鏈接；341 筆參與；最長接龍估算 **37 步** |
| 常用連接字覆蓋 | **49 / 49** 兩端齊備 |
| 關卡 | **100** 關（fill **82**／chain **18**）；10 章 × 10 關 |
| slot 總數 | **329** 個成語欄位；使用到 **257** 條不同成語 |
| 空格格數（去重） | **630** 格；字庫總卡數 **930** 張 |
| 每關平均 | 成語 3.29 個、空格 6.30 格、空格比例 0.465（PLAN 公式分母） |
| 盤面最大 | fill 7×7；chain k×4（k=3–6） |
| chain 長度階梯 | 15→3；20–50→4；55–80→5；85–100→**6**（完全符合 GAME_DESIGN §10.1） |
| 提示次數 | 章 1–3＝3、章 4–6＝2、章 7–10＝1 |
| 誘餌字 | 每章 0,1,1,2,3,3,4,5,5,6（合計 300 張） |

### 2.2 難度曲線（獨立驗證實測）

| 章 | 關卡 | fill | chain | 平均成語 | 平均空格 | 空格比例 | 提示 | 誘餌 | tier 使用 1/2/3/4/5 | 平均 tier | chain k |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1–10 | 10 | 0 | 2.00 | 2.60 | 0.325 | 3 | 0 | 10/8/2/0/0 | 1.60 | — |
| 2 | 11–20 | 8 | 2 | 2.30 | 3.40 | 0.371 | 3 | 1 | 8/6/9/0/0 | 2.04 | 3,4 |
| 3 | 21–30 | 8 | 2 | 2.80 | 4.40 | 0.392 | 3 | 1 | 3/11/10/3/1 | 2.57 | 4,4 |
| 4 | 31–40 | 8 | 2 | 3.20 | 5.40 | 0.421 | 2 | 2 | 5/10/13/4/0 | 2.50 | 4,4 |
| 5 | 41–50 | 8 | 2 | 3.20 | 5.80 | 0.454 | 2 | 3 | 6/4/17/5/0 | 2.66 | 4,4 |
| 6 | 51–60 | 8 | 2 | 3.40 | 6.60 | 0.490 | 2 | 3 | 6/4/11/10/3 | 3.00 | 5,5 |
| 7 | 61–70 | 8 | 2 | 3.40 | 6.60 | 0.490 | 1 | 4 | 2/10/8/12/2 | 3.06 | 5,5 |
| 8 | 71–80 | 8 | 2 | 3.80 | 8.20 | 0.548 | 1 | 5 | 3/7/8/13/7 | 3.37 | 5,5 |
| 9 | 81–90 | 8 | 2 | 4.40 | 9.80 | 0.567 | 1 | 5 | 2/10/4/16/12 | 3.59 | 6,6 |
| 10 | 91–100 | 8 | 2 | 4.40 | 10.20 | 0.592 | 1 | 6 | 1/9/7/10/17 | 3.75 | 6,6 |

- 章節平均單調遞進；Pearson 相關性：**r(空格比例)=0.891**、**r(成語數)=0.755**、**r(平均 tier)=0.884**（門檻 ≥ 0.6）。
- 每關至少 2 個成語、至少一個 tier ≤ 2 錨（100/100 通過）；標題／故事 100 個全唯一、無穿橋答案。
- 去重棋盤格空格比例總計 0.542（另列，供設計參考）。

---

## 3. 單元／整合測試（Vitest，62 tests）

指令：`npm test` ｜結果：**4 files passed，62/62 tests passed，991 ms**

| 檔案 | 測試數 | 覆蓋範圍 |
| --- | --- | --- |
| `tests/unit/idioms.test.ts` | **11** | 數量 ≥420、id kebab-case 唯一且等於拼音去聲調、word 4 漢字唯一、拼音 4 音節＋聲調、**粵拼 `cantonese`：每筆必有、4 音節、`^[a-z]+[1-6]$`、488/488（Issue #1）**、meaning 15–60／origin 15–90 漢字、sourceBook《…》格式、tier 1–5＋分佈下限、tags、接龍連通性（≥150、最長 ≥6）、49 個常用連接字兩端齊備 |
| `tests/unit/levels.test.ts` | 19 | 資料 API、章節資料、100 關 id/chapter、模式分佈、每關成語數、幾何／無遊離格、交叉字一致、chain 接龍、blanks 規則、bank multiset＋誘餌曲線、hintLimit 曲線、難度公式、tier 錨、標題／故事無穿橋、100 關與成語組合唯一、難度趨勢（章節單調＋Pearson r ≥0.6）、**全關卡可解性模擬（真引擎，100/100 → isSolved、3 星、零錯誤、chain row0 自動鎖定）** |
| `tests/unit/puzzle.test.ts` | 15 | `createGame` 初始狀態、放字／退回／鎖定、正確判定、錯誤清空＋mistakes、已鎖定交叉格不被錯誤清走、given 格保留、`useHint`（正解／鎖定／hintsUsed／bankIndex）、完成後 hint 回 null、星級 3/2/1、`solved` 只發一次、`keyOf`／`slotCellKeys`／`slotBlankKeys`／`solutionMap`／`blankKeySet`、垂直 slot、chain row0 auto locked |
| `tests/unit/progress.test.ts` | 18 | localStorage mock：預設值、roundtrip、損壞 JSON／版本不符回退、非法紀錄過濾／星級 clamp／collected 去重、quota 寫入失敗不拋錯、無 localStorage 環境、reset、解鎖／`nextPlayableLevel`、`recordLevelClear`（自動儲存／最高星／最少錯誤／收集成語）、統計、`updateSettings`／`markChapterSeen`／`markTutorialSeen` 冪等 |

### 3.1 全關卡可解性模擬（重點）

`createGame(level)` → 依 `solutionMap()` 逐格 `placeChar()`（由 `bank` multiset 分配字卡 index）→ 斷言：

- 100/100 關 `isSolved() === true`、`getStars() === 3`、`mistakes === 0`；
- 每次 `word-correct` 數＝該關有空格成語數、全部 `word.locked === true`；
- 無任何 `word-wrong`；`solved` 事件恰好 1 次；
- 18 關 chain row0 一開始即由引擎自動鎖定。

---

## 4. E2E 測試（Playwright，22 步驟）

指令：`npm run test:e2e` ｜結果：**22/22 步驟 PASS，34.2 秒**（Issue #1 粵拼最終重跑；含 build＋preview）。
Runner 自行 `npm run build`、開 `vite preview --port 4390 --strictPort` 子進程、跑完自動 kill；桌面／手機各自獨立 browser context（localStorage 隔離）。

| # | 步驟 | 桌面 | 手機 |
| --- | --- | --- | --- |
| 1 | 首頁載入、`?debug=1` 資料（100 關／10 章／488 成語）、主 CTA、進度 0/100 | ✅ | ✅ |
| 2 | 地圖：10 章、100 個關卡按鈕、Level 1 當前、Level 2 未解鎖、總星數 0/300 | ✅ | ✅ |
| 3 | Level 1：`chapter-intro`＋`tutorial-overlay` 處理、棋盤格數／字庫卡數／提示次數／錯誤數、截圖 | ✅ | ✅ |
| 4 | 真實點 `cell`＋`bank` 完成 Level 1 → `result-overlay` 3 星、成語卡齊全、**每張卡「普」＋「粵」雙拼音（`result-idiom-jyutping-<id>`、aria-label／文字＝資料值）**、手機 overlay 無 overflow | ✅ | ✅ |
| 5 | `next-level-btn` → Level 2（hash `#/game/2`），已看過教學／章節故事唔再彈 | ✅ | ✅ |
| 6 | 返回地圖（桌面用 `Esc`、手機用 `game-back`）：Level 1 3 星、總星數 3/300、Level 3 未解鎖 | ✅ | ✅ |
| 7 | 首頁「繼續第 2 關」、已過 1/100、總星數 3/300；**reload 後保留**（localStorage 驗證） | ✅ | ✅ |
| 8 | 圖鑑：收集數 `/488`、已收集成語顯示（含 `.codex-card__jyut` 粵拼細字）、詳情 modal（釋義／出處＋**普通話拼音＋`codex-detail-jyutping`**）、**中文／帶聲調／無聲調拼音／粵拼（帶聲調／無聲調）搜尋**、**0 結果空狀態＋grid DOM 清空**、清空搜尋恢復全部卡、返回 | ✅ | ✅ |
| 9 | 設定：音效關／減少動態開 → `html.reduced-motion` → **reload 後仍保留**、localStorage 驗證 | ✅ | ✅ |
| 10 | 重置進度：`reset-confirm` 取消唔清、確認後關卡／圖鑑清空、設定回復預設 | ✅ | ✅ |
| 11 | 錯誤路由／未解鎖關卡：`#/game/2`（重置後）→ 地圖＋**提示 toast**；`#/game/999` → 地圖＋**提示 toast**；`#/unknown-route` → 首頁 | ✅ | ✅ |

- 每步驟後檢查 **console.error／pageerror／requestfailed**：**0 個**；全程**零外部網路請求**。
- 手機每步驟另外驗證 **無橫向溢出**（`scrollWidth <= innerWidth`）；Issue #1 另加過關 overlay／圖鑑詳情 panel 內橫向溢出檢查。
- 所有畫面文字檢查唔會出現 `undefined`／`null`（粵拼 fallback 回歸）。
- 截圖自動輸出至 `screenshots/`（見 §7）。

---

## 5. 獨立關卡驗證（`scripts/verify-levels.mjs`）

唔 import 生成器，獨立重新實作 docs/PLAN.md §5.3 契約。`npm run verify:levels` → **17/17 檢查 PASS，0 警告，exit 0**。

檢查項：章節資料（10 章／scene key）、關卡數量與 id、章節對應、模式分佈、棋盤幾何（無遊離格）、交叉／接龍幾何、blanks 合法、bank multiset＋誘餌、提示次數曲線、誘餌字曲線、成語數／空格數公式、每關 ≥2 成語＋tier 錨、標題／故事（唯一、無穿橋）、100 關唯一（完整＋成語組合 **0 重複**）、難度趨勢（單調＋Pearson）、資料角可解性、成語接龍連通性（488 條／174 可接龍／最長 ≥8）。
輸出包含逐章統計表（平均成語數、空格比例、tier 分佈、chain 長度等）。

## 6. 其他驗證

- `node scripts/qa-testids.mjs`：PLAN §7.4 全部 **43/43 testid**（36 固定＋7 動態）靜態存在，掃到 47 個 testid 字串。E2E 亦動態驗證實際可用。
- `node scripts/verify-idioms.mjs`：**PASS**——488 條成語、**粵拼（cantonese）488/488 條（4 音節、帶聲調數字）**；10 項 warning（sourceBook 篇名，見 §8 DATA-WARN-1）。
- `npm run check`：tsc strict **exit 0**。
- `npm run build`：成功（Vite build 267 ms）。

---

## 7. 截圖清單（`screenshots/`，22 張；Issue #1 後重生成）

| 檔案 | 尺寸 | 說明 |
| --- | --- | --- |
| `home-desktop.png` / `home-mobile.png` | 1280×800 / 780×1688 | 首頁：貓貓 hero、標題、進度、主 CTA、圖鑑／設定入口 |
| `map-desktop.png` / `map-mobile.png` | 1280×2380 / 780×7260 | 地圖：10 章卡片、關卡腳印、星星與鎖定狀態 |
| `game-desktop.png` / `game-mobile.png` | 1280×800 / 780×1688 | 遊戲：HUD、貓貓旁白、成語棋盤、字庫 |
| `result-desktop.png` / `result-mobile.png` | 1280×800 / 780×1688 | 過關 overlay：3 星、成語卡（成語／**普通話拼音＋粵拼雙行**／釋義／出處）、下一關 |
| `codex-desktop.png` / `codex-mobile.png` | 1280×800 / 780×1688 | 圖鑑：收集進度（2/488）、已收集／未收集卡片 |
| `settings-desktop.png` / `settings-mobile.png` | 1280×800 / 780×1688 | 設定：音效、減少動態、重置、關於 |
| `tutorial-desktop.png` / `tutorial-mobile.png` | 1280×800 / 780×1688 | 新手教學 overlay |
| `chapter-intro-desktop.png` / `chapter-intro-mobile.png` | 1280×800 / 780×1688 | 章節故事 overlay |
| `codex-detail-desktop.png` / `codex-detail-mobile.png` | 1280×800 / 780×1688 | 成語詳情 modal：**「普」＋「粵」雙拼音**、釋義、出處 |
| `codex-search-jyutping-desktop.png` / `codex-search-jyutping-mobile.png` | 1280×800 / 780×1688 | **Issue #1 新增**：圖鑑以無聲調粵拼（`syut zung sung taan`）搜尋，命中「雪中送炭」並顯示雙拼音 |
| `reset-confirm-desktop.png` / `reset-confirm-mobile.png` | 1280×800 / 780×1688 | 重置進度二次確認 |

> 手機截圖為 DPR 2（390×844 CSS px → 780×1688 實體 px）。人手檢視（含 Issue #1 雙拼音）：繁中無亂碼、貓貓風格一致、無爆版、粵拼音節完整顯示。

---

## 8. Bug 清單

### 8.1 總覽

| ID | 嚴重程度 | 標題 | Owner | 狀態 |
| --- | --- | --- | --- | --- |
| BUG-QA-1 | 低 | 圖鑑拼音搜尋唔支援無聲調輸入（`yu gong` 搵唔到 `yú gōng`） | ui-dev | ✅ **已修＋QA 回歸通過** |
| BUG-QA-2 | 低 | 圖鑑 0 結果時 grid hidden 但仍保留舊 DOM（stale cards） | ui-dev | ✅ **已修＋QA 回歸通過** |
| BUG-QA-3 | 低 | Deep-link 到未解鎖／不存在關卡時，提示 toast 被 route render 清走 | ui-dev | ✅ **已修＋QA 回歸通過** |
| DATA-WARN-1 | 低（資料品質 warning） | 10 條成語 `sourceBook` 只有書名、缺篇名（`《老子》` 等） | idiom-scholar | 已知／verify-idioms 只警告（不阻塞） |
| ENGINE-OBS-1 | 觀察（不可達） | `createGame()` 若整關所有 slot 都冇空格，唔會自動 `solved` | Lead（core） | 記錄備查；現有資料契約不可能出現 |

**統計：0 個高／中嚴重程度 bug；3 個低 bug 已全部修正並回歸通過；1 個低資料 warning 待 idiom-scholar 決定；1 個不可達邊界觀察。**

**Issue #1（粵拼）驗收：0 個產品 bug。** 資料（488/488）與 UI（雙拼音顯示、粵拼搜尋）一次過 PASS；QA 過程只修正自己 E2E 嘅 selector（`result-idiom-*` 前綴撞到新 `result-idiom-jyutping-*`，已改用 `article[data-testid^="result-idiom-"]`），並喺一次合併流程中撞到 mobile context 偶發首屏 timeout（單獨重跑及之後多次全套均 PASS，已加 failure 診斷輸出；見 §10 第 10 點）。

### 8.2 BUG-QA-1：圖鑑拼音搜尋唔支援無聲調輸入（低）

- **重現步驟**：
  1. 開 `?debug=1#/codex`；
  2. 搜尋框輸入 `yu gong` → 顯示「搵唔到相關成語，試下其他關鍵字喵～」；
  3. 改為輸入 `yú gōng` → 正確顯示「愚公移山」；輸入中文「愚公」亦正常。
- **預期**：搜尋框 placeholder 寫「搵成語、拼音或意思……」，一般玩家唔會輸入聲調符號；`yu gong` 應可命中。
- **實際**：只有帶聲調拼音或中文命中；無聲調拼音 0 結果。
- **原因**：`src/ui/dom.ts` `normalizeSearch()` 只 `trim().toLowerCase()`，未去除拼音聲調。
- **建議**：`value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')`（保留 `ü` 處理）後再比對。
- **修正（ui-dev）**：`src/ui/dom.ts` `normalizeSearch()` 已加 NFD 去 combining marks；placeholder 改為「搵成語、拼音（唔使聲調）或意思……」。
- **QA 回歸**：E2E 圖鑑步驟新增「中文／帶聲調拼音／**無聲調拼音**」三種搜尋斷言，全部命中已收集成語 → **PASS**。

### 8.3 BUG-QA-2：圖鑑 0 結果時 grid hidden 但仍保留舊 DOM（低）

- **重現步驟**：`#/codex` 初次顯示 488 張卡 → 搜尋 `zzzz` → `document.querySelector('[data-grid]').hidden === true`，但 `childElementCount === 488`（仍保留上次渲染節點）。
- **預期**：0 結果時 grid 內容清空（或至少唔好令 DOM 查詢／自動化誤判）。
- **實際**：畫面正確顯示 empty state，但 grid 仍有 stale 488 個 card 節點。
- **原因**：`src/screens/codex.ts` `renderGrid()` 0 結果分支只 `grid.hidden = true; empty.hidden = false; renderEmpty(); return;`，冇 `grid.replaceChildren()`。
- **影響**：正常玩家無感；DOM 浪費、E2E／DOM 查詢會數到隱藏 stale 卡（QA 用 script 驗證時撞到）。
- **建議**：0 結果分支加 `grid.replaceChildren()`。
- **修正（ui-dev）**：`src/screens/codex.ts` `renderGrid()` 0 結果分支已加 `grid.replaceChildren()`。
- **QA 回歸**：E2E 搜尋 `zzzzzz-no-such-idiom` 後斷言 `[data-grid]` hidden、空狀態顯示、`childElementCount === 0`，清空搜尋後恢復 488 張卡 → **PASS**。

### 8.4 BUG-QA-3：Deep-link 提示 toast 被 route render 清走（低）

- **重現步驟**：重置進度清空存檔 → 網址直接去 `?debug=1#/game/2`（未解鎖）→ 安全去到地圖，但**冇任何提示**；`#/game/999`（唔存在）同樣冇提示。
- **預期**：PLAN §7.1「`#/game/999` → 地圖／提示」：應見到「呢關仲未解鎖喎…」／「搵唔到呢一關喎…」toast。
- **實際**：靜靜被帶返地圖，玩家唔知原因。
- **原因**：`src/app.ts` renderRoute 嘅錯誤分支先 `showToast(...)` 再 `replaceRoute(ROUTE_MAP)`；`replaceRoute` 同步 dispatch `hashchange` → `renderRoute()` 開頭 `clearToasts()` 即時清走個 toast。
- **影響**：正常 UI 流程（地圖撳未解鎖關卡）提示正常；只有 deep-link／重新整理／外部連結受影響。
- **建議**：兩個錯誤分支改成先 `replaceRoute(ROUTE_MAP)`、後 `showToast(...)`（route render 完成後才落 toast）。
- **修正（ui-dev）**：`src/app.ts` 兩個錯誤分支已改成先 `replaceRoute(ROUTE_MAP)`、後 `showToast(...)`。
- **QA 回歸**：E2E 該步加回 toast 斷言：`#/game/2`（未解鎖）→ 見到「未解鎖」toast；`#/game/999` → 見到「搵唔到」toast → **PASS**。

### 8.5 DATA-WARN-1：10 條成語 sourceBook 缺篇名（低）

`scripts/verify-idioms.mjs` 警告 10 項，例如「畫龍點睛」`《歷代名畫記》`、「無中生有」`《老子》`、「川流不息」`《千字文》`—只有書名、無 `·篇名`。PLAN §5.1 期望 `《書名·篇名》`，但部分典籍本身無清晰篇名；屬資料品質 warning，**唔影響功能／build／E2E**。建議 idiom-scholar 補篇名或於 `docs/IDIOM_SOURCES.md` 標註原因。

### 8.6 ENGINE-OBS-1：全關卡無空格邊界（觀察，現有資料不可達）

`src/core/puzzle.ts` `createGame()` 會將 `blanks=[]` 的成語設為 locked，但唔會喺建立時呼叫 `checkSolved()`；若一關所有 slot 都冇空格（例如「全部顯示」的關卡），`solved` 會永遠 false。現有資料契約（fill 每句 1–3 空格、chain row0 全顯示但其他行有空格）令人工關卡不可能出現此情況；屬防禦性邊界，記錄備查、不阻塞。

### 8.7 QA 測試自身修正記錄（非產品 bug）

開發期間修正咗自己測試入面嘅 3 個錯誤，記錄以免誤會為產品問題：

1. `puzzle.test.ts`「given 格鎖定」原本錯將 `1:1` 當空格（slot B blanks=[0,3] → `1:1`、`1:2` 係 given）；已改為驗證 `1:0`／`1:3`。
2. `idioms.test.ts` 拼音元音檢查原本用「刪除聲調符號」而非「還原基礎元音」，令 `shé` 被誤判冇元音；已改為 fold 後檢查（與 `verify-idioms.mjs` 一致）。
3. `progress.test.ts` `seenChapters` 測試輸入 `2.5`（會被過濾）導致預期錯誤；已修正輸入。

另外：開發早期 `levels.json` 係 interim（172 條 idioms）造成 16 關成語組合重複、chain k 縮短；game-designer 用最終 488 條重生成後**全部消失（0 warning）**，該等測試現已全綠。

### 8.8 修正後回歸測試摘要（ui-dev，20:36）

| 回歸項目 | 斷言 | 結果 |
| --- | --- | --- |
| BUG-QA-1 | 圖鑑：中文 `風花雪月`、帶聲調 `fēng huā xuě yuè`、無聲調 `feng hua xue yue` 都命中對應成語 | ✅ desktop＋mobile |
| BUG-QA-2 | 圖鑑 0 結果：grid hidden、empty state 顯示「搵唔到」、`[data-grid].childElementCount === 0`；清空搜尋後恢復全部 488 張卡 | ✅ desktop＋mobile |
| BUG-QA-3 | deep link `#/game/2`（未解鎖）→ 地圖＋「未解鎖」toast；`#/game/999` → 地圖＋「搵唔到」toast | ✅ desktop＋mobile |
| 全體回歸 | `npm test` 62/62、`verify-levels` 17/17、`qa-testids` 43/43、`npm run check`、`npm run test:e2e` 22/22 | ✅ 全綠 |

> 修正後 E2E 全套重跑：**22/22 PASS，32.2 s**；`npm run shots`（截圖 wrapper）亦驗證可正常產出 20 張截圖。

---

## 9. 效能備註

| 指標 | 數值 | 備註 |
| --- | --- | --- |
| `npm run build` 耗時 | **230 ms** | tsc＋Vite，本機 |
| JS bundle | **422.91 kB**（gzip 132.56 kB） | 含 488 條成語（普通話拼音＋粵拼）＋100 關＋UI 全部程式；無 code splitting |
| CSS bundle | **76.21 kB**（gzip 15.50 kB） | 全部畫面＋貓貓／場景動畫＋雙拼音徽章樣式 |
| index.html | 0.87 kB（gzip 0.59 kB） | — |
| 外部網路請求 | **0** | E2E 收集全部 request，全部同源；WebAudio 即時合成、無音檔／字體／圖片外部載入 |
| 首次內容載入（本機 preview） | 首頁畫面 < 1.5 s（E2E 步驟含等待動畫） | 靜態資源、無 API |
| 單元測試 | ~1 s（63 tests） | — |
| 獨立關卡驗證 | ~0.1 s（100 關＋統計） | — |
| E2E 全套 | 34.2 s（build＋preview＋desktop＋mobile＋22 截圖） | — |

- Bundle 由 interim（283 kB）增至 404 kB（成語 172 → 488 條），Issue #1 再加粵拼後為 **422.91 kB（gzip 132.56 kB）**；gzip 後仍屬合理（< 150 kB），Cloudflare 會自動 Brotli/gzip。若日後要再瘦身：可將 idioms 詳情（origin/example/cantonese）改 lazy chunk，但現階段無必要。
- 動畫只用 `transform`／`opacity`，並支援 `prefers-reduced-motion` 及遊戲內「減少動態效果」設定（E2E 已驗證持久化及 `html.reduced-motion`）。E2E 全程無 long task 相關 console warning。

---

## 10. 已知限制

1. E2E 只跑 **Chromium**（Playwright 快取版本）；WebKit／Firefox 未安裝，未納入本輪。
2. **WebAudio 音質／音效**無法自動驗證；只驗證設定持久化、無 JS 錯誤。需人手試聽。
3. **視覺美感**屬人手 review：截圖已確認無亂碼、無爆版、貓貓風格一致；細節配色由 ui-dev／Lead 決定。
4. **50/50 成語出處考證**由 idiom-scholar 負責（`docs/IDIOM_SOURCES.md`）；QA 只驗證格式與必要欄位。
5. E2E 依賴 `?debug=1` 暴露正解；正式版 URL 不含參數，除錯資料唔會曝光。
6. E2E 依賴 PLAN §7.4 testid 契約；任何 testid 改名／移除會令 E2E 失敗（屬契約破壞，需通知 ui-dev）。
7. 手機 E2E 以 390×844 CSS px 模擬；未涵蓋超窄（320px）／平板／橫向模式。
8. 未做長時間 soak test／大量重玩壓力測試（目前存檔資料量細、localStorage 足夠）。
9. 修正記錄：BUG-QA-1/2/3 已由 ui-dev 於 20:36 修正，QA 已加回歸斷言並重跑全綠（§8.8）；DATA-WARN-1（sourceBook 篇名）仍待 idiom-scholar 決定，屬低風險資料 warning。
10. E2E 偶發 flake：一次合併流程（desktop 先失敗中止後）mobile context 首屏 `home-screen` 8 秒 timeout，單獨重跑及之後 6+ 次全套均 PASS；已加強 failure 時輸出 console/page error 及自動清理 `failure-*.png`，未再復現。
11. **粵拼讀音約定**：個別文白異讀採「香港通行讀音」（例：坐井觀天 `co5`、車水馬龍 `ce1`、後生可畏 `saang1`），記錄於 `docs/IDIOM_SOURCES.md` §11；QA E2E 一律由 `?debug=1` 讀資料值做預期，**冇 hardcode 任何粵拼**，避免測試與資料來源分歧。

---

## 11. 重現指令

```bash
cd ChineseIdiomsGame

# 型別＋建置
npm run check
npm run build

# 單元／整合測試（63 tests；含粵拼驗證）
npm test

# 獨立關卡驗證（17 項檢查＋逐章統計，exit 0）
node scripts/verify-levels.mjs          # 或 npm run verify:levels
node scripts/verify-levels.mjs --json   # 機器可讀

# 成語資料驗證（idiom-scholar 提供）
node scripts/verify-idioms.mjs

# testid 契約靜態檢查（43 項）
node scripts/qa-testids.mjs

# E2E（自動 build＋preview:4390＋桌面＋手機＋截圖；約 33 秒）
npm run test:e2e

# 只出截圖（薄 wrapper：跑 E2E 流程後列出 screenshots/ 成果）
npm run shots

# E2E 選項
E2E_ONLY=desktop npm run test:e2e
E2E_ONLY=mobile npm run test:e2e
E2E_HEADED=1 npm run test:e2e
E2E_SKIP_BUILD=1 npm run test:e2e
```

### 11.1 QA 交付檔案（本次新增／修改，全部喺 QA scope）

- `tests/unit/idioms.test.ts`、`levels.test.ts`、`puzzle.test.ts`、`progress.test.ts`、`data-helpers.ts`
- `scripts/verify-levels.mjs`（獨立關卡驗證）、`scripts/qa-testids.mjs`（testid 契約檢查）、`scripts/qa-screenshots.mjs`（`npm run shots` 截圖 wrapper）
- `e2e/run.mjs`、`e2e/lib.mjs`、`e2e/specs.mjs`（含 Issue #1 雙拼音／粵拼搜尋／overlay overflow 斷言）
- `docs/TEST_PLAN.md`、`docs/QA_REPORT.md`（本文件）
- `screenshots/*.png`（22 張；Issue #1 後重生成，含 `codex-search-jyutping-*`）

---

## 12. 附錄

### 12.1 測試結果原始數據（摘要）

```
npm test                     → Test Files 4 passed (4) / Tests 63 passed (63) / ~1 s
npm run shots               → E2E 22/22 通過（0 失敗）/ 34.2s ／ 22 張截圖（14.2 MB）
verify-levels                → 17/17 檢查 PASS，警告 0 項，exit 0
verify-idioms                → PASS（粵拼 488/488；警告 10 項：sourceBook 篇名）
qa-testids                   → 43/43 testid 齊全（掃到 49 個 testid 字串；新增 2 個粵拼 testid）
npm run check                → exit 0
npm run build                → ✓ built in 230ms（JS 422.91 kB / gzip 132.56 kB；CSS 76.21 kB / gzip 15.50 kB）
```

### 12.2 資料指紋（測試對象）

| 檔案 | sha256 |
| --- | --- |
| `src/data/idioms.json`（Issue #1 粵拼版） | `9ba371d48c3269e0464344b5b57a1400c3ff62ff6d3e5f9b75690f49a713d0a7` |
| `src/data/levels.json` | `99a286b9ba0618bf438260d334e13a54c10c1ecde0769c094a670e9591cadea6` |

> 若 `levels.json`／`idioms.json` 在部署前再有改動，請通知 QA 重跑 §11 全套（資料指紋會變，本報告數字需同步更新）。

---

## 13. Issue #1 驗收：粵拼（Jyutping / 廣東話拼音）

> GitHub Issue #1：「拼音 可否同時提供 廣東話和普通話拼音。」
> 需求：488 條成語全部加 `cantonese`（粵拼、4 音節、帶聲調數字）；過關成語卡／成語圖鑑詳情同時顯示普通話拼音＋粵拼；圖鑑搜尋支援粵拼。
> 驗收日期：2026-10-28 22:12–22:20（資料 sha256 `9ba371d4…`）

### 13.1 資料驗證（`npm test`）

- `tests/unit/idioms.test.ts` 新增「cantonese 粵拼」測試（第 11 個測試）：
  - 488/488 每筆都有非空 `cantonese`；
  - 正好 4 個音節（空格分隔、單空格）；
  - 每音節符合 `^[a-z]+[1-6]$`（帶聲調數字）；
  - 覆蓋率統計斷言 `withCantonese === idioms.length`（488/488）。
- `node scripts/verify-idioms.mjs`：**PASS**，輸出「粵拼（cantonese）：488/488 條（4 音節、帶聲調數字）」；另有 10 項 sourceBook 篇名 warning（與 Issue #1 無關）。
- 樣例：`雪中送炭` → `xuě zhōng sòng tàn` / `syut3 zung1 sung3 taan3`；`風花雪月` → `fēng huā xuě yuè` / `fung1 faa1 syut3 jyut6`；`畫蛇添足` → `huà shé tiān zú` / `waak6 se4 tim1 zuk1`。

### 13.2 UI／E2E 驗證（`npm run test:e2e`，desktop＋mobile 各 11 步）

| 驗收點 | E2E 斷言（讀 `?debug=1` 資料值作預期，冇 hardcode） | 結果 |
| --- | --- | --- |
| 過關成語卡雙拼音 | `result-idiom-jyutping-<idiomId>` 數量＝本關成語數；每個 aria-label＝`粵拼：<cantonese>`、`.pron-text` 文字＝`cantonese`；普通話拼音行（排除 `--jyut` class）文字＝`pinyin` | ✅ desktop＋mobile |
| 圖鑑詳情雙拼音 | `codex-detail-jyutping` aria-label＝`粵拼：<cantonese>`、內文包含 `cantonese`；詳情文字包含普通話拼音 | ✅ desktop＋mobile |
| 圖鑑卡粵拼細字 | 已收集卡 `.codex-card__jyut` 存在且包含 `cantonese` | ✅ desktop＋mobile |
| 粵拼搜尋（帶聲調） | 以 `cantonese` 原文搜尋 → 命中對應成語 | ✅ desktop＋mobile |
| 粵拼搜尋（無聲調） | 以去聲調數字版本（例 `syut zung sung taan`）搜尋 → 命中 | ✅ desktop＋mobile |
| 舊功能保持 | 中文／普通話拼音（帶／無聲調）搜尋仍然正常；0 結果 stale DOM 回歸 | ✅ desktop＋mobile |
| 響應式 | 手機 390×844 無橫向溢出；過關 overlay／圖鑑詳情 panel 內亦無橫向溢出 | ✅ mobile |
| 穩定性 | 0 console error／pageerror／failed request；畫面無 `undefined`／`null` 文字（粵拼 fallback 正常） | ✅ desktop＋mobile |
| 視覺 | `result-*`／`codex-detail-*`／`codex-search-jyutping-*` 截圖可見「普」綠徽章＋「粵」粉徽章雙行，粵拼音節完整 | ✅ 人手檢視 |

### 13.3 截圖（Issue #1 相關）

- `screenshots/result-desktop.png`、`screenshots/result-mobile.png`：過關成語卡雙拼音（雪中送炭 普／粵）。
- `screenshots/codex-detail-desktop.png`、`screenshots/codex-detail-mobile.png`：圖鑑詳情雙拼音。
- `screenshots/codex-search-jyutping-desktop.png`、`screenshots/codex-search-jyutping-mobile.png`：以無聲調粵拼搜尋「雪中送炭」畫面。

### 13.4 結論

**Issue #1 驗收 PASS：0 個產品 bug。** 資料（488/488、格式正確）、UI（過關卡／圖鑑詳情／圖鑑卡雙拼音）、搜尋（粵拼帶／無聲調）及 mobile layout 全部通過；全套迴歸（unit 63/63、verify-idioms、verify-levels 17/17、qa-testids 43/43、build、E2E 22/22、22 張截圖）全綠。

> 已知非阻塞：10 項 `sourceBook` 篇名 warning（idiom-scholar）；粵拼文白異讀採香港通行讀音（`docs/IDIOM_SOURCES.md` §11），QA 以資料值為準。
