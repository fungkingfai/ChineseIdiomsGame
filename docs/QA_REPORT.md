# 《貓咪成語大冒險》QA 報告（QA_REPORT）

> 測試執行：**2026-10-28（Issue #1）＋ 2026-10-30 00:12–00:24（GitHub Issue #2 200 關／20 章最終迴歸，全套重跑）**｜執行者：qa-tester
> 測試對象（Issue #2 最終定稿版：733 條成語、200 關、20 章）：
> - `src/data/idioms.json` — **733 條**（tier 70/110/208/200/145；**粵拼 733/733**），sha256 `3cb32f861d40caafa765b168557774666925a7e63f137a648ab4dafa6ed7c950`
> - `src/data/levels.json` — **200 關**（fill 162／chain 38），sha256 `12bba215b2fb0b4611232b5162975b1592354cb5ecb397f27bf0e6eca60cbc58`（game-designer 定稿版）
> - `src/data/chapters.json` — **20 章**（基礎 1–10＋進階 11–20），sha256 `aa87f7a9a1a0cb9adaa43fb1143f118a810db34c8cdc98706bd418591dc5b6cf`
> 測試計劃：`docs/TEST_PLAN.md`｜Issue #1 專項驗收：見 §13｜**Issue #2 專項驗收：見 §14**

---

## 1. 結論摘要

**全部驗收測試通過，0 高／中嚴重程度 bug，可進入部署流程。**

| 測試項目 | 結果 | 通過率 |
| --- | --- | --- |
| `npm run check`（tsc strict） | ✅ PASS | — |
| `npm run build`（tsc＋Vite build） | ✅ PASS | — |
| `npm test`（Vitest：資料／引擎／存檔／場景） | ✅ **73 / 73**（5 檔案；含粵拼、200 關、20 場景） | 100% |
| `node scripts/verify-levels.mjs`（獨立關卡驗證，200 關） | ✅ **18 / 18 檢查 PASS，0 警告** | 100% |
| `node scripts/verify-idioms.mjs`（成語契約） | ✅ PASS（**733/733 條、粵拼 733/733、接龍 332 筆**；11 項低風險 sourceBook 警告） | 100% |
| `node scripts/qa-testids.mjs`（PLAN §7.4 testid 契約） | ✅ **43 / 43**（掃到 51 個 testid 字串） | 100% |
| `npm run test:e2e`（Playwright：桌面＋手機） | ✅ **30 / 30 步驟**（desktop 15＋mobile 15；含 Issue #1／#2 斷言）；最終重跑 107.5s | 100% |
| 截圖 | ✅ **40 張**（基礎 22＋進階 18：進階地圖／第 11 章故事／Level 101／chain 6／chain 7／Level 200 等） | — |

- 全關卡可解性：**100 / 100 關**用真引擎 `createGame → placeChar(正解) → isSolved() === true`、全部 3 星、零失誤。
- E2E 用 `?debug=1` 讀正解，**真實點擊** `cell-<r>-<c>`＋`bank-<index>` 完成 Level 1；桌面與手機流程完全通過，全程**無 console error／pageerror／request failed**。
- 手機 390×844：每個主要畫面 `document.documentElement.scrollWidth <= innerWidth`（無橫向溢出）。
- 首屏**零外部網路請求**（所有 request 同源，`?debug=1` 只用本地資料）。
- **GitHub Issue #1（粵拼）**：733/733 成語有 `cantonese`（4 音節、`^[a-z]+[1-6]$`）；過關成語卡與圖鑑詳情同時顯示普通話拼音＋粵拼（「普」／「粵」徽章）；圖鑑支援粵拼搜尋（帶聲調／無聲調／連寫）；E2E desktop＋mobile 全部斷言 PASS（見 §13）。
- **GitHub Issue #2（200 關／20 章進階篇）**：**200 關全部可解（200/200）**、20 章場景齊（10 個新進階場景 `library`…`zenith`）、進階 fill 4–5 成語／chain 6–7 句、進階每句 1–4 空格＋每關 ≥2 given、bank ≤22、誘餌＝min(章節目標, 22−空格)、錨 tier≤3；**基礎篇 Level 1–100 與 v1.1 逐關完全相同（freeze PASS）**；E2E seed 100 關後首頁「繼續第 101 關」、地圖 20 章、第 11 章新場景故事、Level 101／105／155／200 全流程 PASS（見 §14）。
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
| 成語總數 | **733** 條（Issue #2 下限 688） |
| tier 分佈 | tier1 **70**／tier2 **110**／tier3 **208**／tier4 **200**／tier5 **145**（全部達 PLAN §5.1 下限） |
| 粵拼（`cantonese`） | **733 / 733** 條（4 音節、帶聲調數字 1–6，例 `syut3 zung1 sung3 taan3`） |
| 可接龍成語 | **332** 筆（下限 250）；1144 條接龍鏈接；534 筆參與；最長簡單接龍 **12 步**（下限 7） |
| 常用連接字覆蓋 | **49 / 49** 兩端齊備 |
| 關卡 | **200** 關（fill **162**／chain **38**）；**20 章** × 10 關（基礎 1–100＋進階 101–200） |
| slot 總數 | **819** 個成語欄位；使用到 **538** 條不同成語 |
| 空格格數（去重） | **1,822** 格；字庫總卡數 **2,872** 張 |
| 每關平均 | 成語 4.09 個、空格 9.11 格、空格比例 0.542（PLAN 公式分母） |
| 進階篇平均 | 成語 4.90 個、空格比例 0.619、平均 tier **4.00**、tier4/5 佔 **70.2%**、bank 上限 **22** |
| 盤面最大 | fill 8×8（上限 10×10）；chain k×4（k=3–7） |
| chain 長度階梯 | 15→3；20–50→4；55–80→5；85–150→6；155–200→**7**（完整階梯，38 關） |
| 提示次數 | 基礎章 1–3＝3、4–6＝2、7–10＝1；進階章 11–15＝2、16–20＝1 |
| 誘餌字 | 基礎 0→6；進階目標 6,6,7,7,8,8,9,9,10,10，實際＝min(目標, 22−空格)（後期 8–9） |

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
| 11 | 101–110 | 8 | 2 | 4.40 | 10.20 | 0.592 | 2 | 6 | 0/0/18/15/11 | 3.84 | 6,6 |
| 12 | 111–120 | 8 | 2 | 4.40 | 10.20 | 0.592 | 2 | 6 | 0/0/16/20/8 | 3.82 | 6,6 |
| 13 | 121–130 | 8 | 2 | 4.40 | 10.20 | 0.592 | 2 | 7 | 1/0/12/22/9 | 3.86 | 6,6 |
| 14 | 131–140 | 8 | 2 | 4.40 | 10.20 | 0.592 | 2 | 7 | 0/0/16/17/11 | 3.89 | 6,6 |
| 15 | 141–150 | 8 | 2 | 4.40 | 10.40 | 0.604 | 2 | 8 | 0/0/15/18/11 | 3.91 | 6,6 |
| 16 | 151–160 | 8 | 2 | 5.40 | 13.00 | 0.613 | 1 | 8 | 0/0/16/19/19 | 4.06 | 7,7 |
| 17 | 161–170 | 8 | 2 | 5.40 | 13.60 | 0.643 | 1 | 8.4 | 1/0/13/24/16 | 4.00 | 7,7 |
| 18 | 171–180 | 8 | 2 | 5.40 | 13.80 | 0.653 | 1 | 8.2 | 0/0/11/21/22 | 4.20 | 7,7 |
| 19 | 181–190 | 8 | 2 | 5.40 | 13.80 | 0.653 | 1 | 8.2 | 0/2/10/20/22 | 4.15 | 7,7 |
| 20 | 191–200 | 8 | 2 | 5.40 | 13.80 | 0.653 | 1 | 8.2 | 0/0/15/14/25 | 4.19 | 7,7 |

- 20 章平均單調遞進（進階篇由第 11 章起持續上升）；Pearson 相關性：**r(空格比例)=0.790**、**r(成語數)=0.793**、**r(平均 tier)=0.870**（門檻 ≥ 0.6）。
- 每關至少 2 個成語；基礎 100/100 有 tier ≤ 2 錨、進階 100/100 有 tier ≤ 3 錨；標題／故事 200 個全唯一、無穿橋答案。
- 進階篇平均 tier **4.00**、tier 4/5 佔 **70.2%**；chain 長度完整階梯（15→3、20–50→4、55–80→5、85–150→6、155–200→7）。
- 誘餌實際數受 bank ≤22 上限約束（第 17–20 章平均 8.2–8.4，屬設計允許回落）。

---

## 3. 單元／整合測試（Vitest，73 tests）

指令：`npm test` ｜結果：**5 files passed，73/73 tests passed，~1 s**

| 檔案 | 測試數 | 覆蓋範圍 |
| --- | --- | --- |
| `tests/unit/idioms.test.ts` | **11** | 數量 ≥420、id kebab-case 唯一且等於拼音去聲調、word 4 漢字唯一、拼音 4 音節＋聲調、**粵拼 `cantonese`：每筆必有、4 音節、`^[a-z]+[1-6]$`、488/488（Issue #1）**、meaning 15–60／origin 15–90 漢字、sourceBook《…》格式、tier 1–5＋分佈下限、tags、接龍連通性（≥150、最長 ≥6）、49 個常用連接字兩端齊備 |
| `tests/unit/levels.test.ts` | **23** | 資料 API、章節資料（20 章／10 新場景）、200 關 id/chapter、模式分佈（38 chain）、基礎／進階成語數、幾何／無遊離格、交叉字一致、chain 接龍、blanks 規則（基礎 1–3／進階 1–4＋≥2 given）、bank multiset＋基礎誘餌精確／進階 min(目標,22−空格)、hintLimit 曲線、難度公式（基礎 d／進階 d2）、錨（基礎 tier≤2／進階 tier≤3）、標題／故事無穿橋、200 關與成語組合唯一、**基礎篇 v1.1 freeze 逐關比對**、難度趨勢（20 章單調＋Pearson r ≥0.6）、進階 tier 目標、**全關卡可解性模擬（真引擎，200/200 → isSolved、3 星、零錯誤、chain row0 自動鎖定）** |
| `tests/unit/puzzle.test.ts` | 15 | `createGame` 初始狀態、放字／退回／鎖定、正確判定、錯誤清空＋mistakes、已鎖定交叉格不被錯誤清走、given 格保留、`useHint`（正解／鎖定／hintsUsed／bankIndex）、完成後 hint 回 null、星級 3/2/1、`solved` 只發一次、`keyOf`／`slotCellKeys`／`slotBlankKeys`／`solutionMap`／`blankKeySet`、垂直 slot、chain row0 auto locked |
| `tests/unit/scenes.test.ts` | **6** | `SCENE_KEYS` 20 個（基礎 10＋進階 10，順序正確、無重複）；`chapters.json` scene 依序對應；`chapterSceneSVG` 每個 key 回傳有效 800×450 SVG（aria-hidden、scene-<key> class、閉合、無 undefined／NaN）；deterministic、defs id `scene-<key>-` 前綴及唯一；未知 scene fallback garden |
| `tests/unit/progress.test.ts` | 18 | localStorage mock：預設值、roundtrip、損壞 JSON／版本不符回退、非法紀錄過濾／星級 clamp／collected 去重、quota 寫入失敗不拋錯、無 localStorage 環境、reset、解鎖／`nextPlayableLevel`、`recordLevelClear`（自動儲存／最高星／最少錯誤／收集成語）、統計、`updateSettings`／`markChapterSeen`／`markTutorialSeen` 冪等 |

### 3.1 全關卡可解性模擬（重點，200 關）

`createGame(level)` → 依 `solutionMap()` 逐格 `placeChar()`（由 `bank` multiset 分配字卡 index）→ 斷言：

- **200/200 關** `isSolved() === true`、`getStars() === 3`、`mistakes === 0`；
- 每次 `word-correct` 數＝該關有空格成語數、全部 `word.locked === true`；
- 無任何 `word-wrong`；`solved` 事件恰好 1 次；
- 38 關 chain row0 一開始即由引擎自動鎖定。

---

## 4. E2E 測試（Playwright，30 步驟）

指令：`npm run test:e2e` ｜結果：**30/30 步驟 PASS，107.5 秒**（Issue #2 最終重跑；含 build＋preview）。
Runner 自行 `npm run build`、開 `vite preview --port 4390 --strictPort` 子進程、跑完自動 kill；桌面／手機各自獨立 browser context（localStorage 隔離）。進階篇測試用 `localStorage` seed 存檔模擬已通關進度。

| # | 步驟 | 桌面 | 手機 |
| --- | --- | --- | --- |
| 1 | 首頁載入、`?debug=1` 資料（**200 關／20 章／733 成語**）、主 CTA、進度 0/200 | ✅ | ✅ |
| 2 | 地圖：**20 章、200 個關卡按鈕**、`map-section-basic`／`map-section-advanced` 分區、Level 1 當前、Level 2 未解鎖、總星數 0/600 | ✅ | ✅ |
| 3 | Level 1：`chapter-intro`＋`tutorial-overlay` 處理、棋盤格數／字庫卡數／提示次數／錯誤數、截圖 | ✅ | ✅ |
| 4 | 真實點 `cell`＋`bank` 完成 Level 1 → `result-overlay` 3 星、成語卡齊全、**每張卡「普」＋「粵」雙拼音（`result-idiom-jyutping-<id>`）**、**非最終關唔會顯示 `result-final-all`**、手機 overlay 無 overflow | ✅ | ✅ |
| 5 | `next-level-btn` → Level 2（hash `#/game/2`），已看過教學／章節故事唔再彈 | ✅ | ✅ |
| 6 | 返回地圖（桌面用 `Esc`、手機用 `game-back`）：Level 1 3 星、總星數 **3/600**、Level 3 未解鎖 | ✅ | ✅ |
| 7 | 首頁「繼續第 2 關」、已過 **1/200**、總星數 3/600；**reload 後保留**（localStorage 驗證） | ✅ | ✅ |
| 8 | 圖鑑：收集數 `/733`、已收集成語顯示（含 `.codex-card__jyut` 粵拼細字）、詳情 modal（釋義／出處＋普通話拼音＋`codex-detail-jyutping`）、中文／帶聲調／無聲調拼音／粵拼搜尋、0 結果 DOM 清空、返回 | ✅ | ✅ |
| 9 | 設定：音效關／減少動態開 → `html.reduced-motion` → **reload 後仍保留**、localStorage 驗證 | ✅ | ✅ |
| 10 | 重置進度：`reset-confirm` 取消唔清、確認後關卡／圖鑑清空、設定回復預設 | ✅ | ✅ |
| 11 | 錯誤路由／未解鎖關卡：`#/game/2`（重置後）→ 地圖＋提示 toast；`#/game/999` → 地圖＋提示 toast；`#/unknown-route` → 首頁 | ✅ | ✅ |
| 12 | **Issue #2**：seed Level 1–100 全 3 星 → 首頁「繼續第 101 關」、已過 100/200、地圖 20 章、`map-section-advanced` 含 `chapter-11`（藏經閣）、總星數 300/600；截圖 `map-advanced` | ✅ | ✅ |
| 13 | **Level 101（進階 fill）**：第 11 章 `chapter-intro`（新場景 `scene-library`、章名）→ 完成 4 成語 fill → 3 星過關 → 下一關 102；截圖 `chapter-intro-11`／`game-101`／`result-101` | ✅ | ✅ |
| 14 | **Level 105（進階 chain 6）**：完成 6 句接龍 → 3 星過關；截圖 `chain-6`／`result-105` | ✅ | ✅ |
| 15 | **chain 7＋第 200 關完成**：Level 155（進階 7 句 chain）截圖 `chain-7`；seed 到 199 → 完成 Level 200 → 過關按鈕「全部完成！返回地圖」＋`result-final-all`「恭喜完成全部 200 關！你係成語大師喵～」、localStorage 記錄 3 星；截圖 `game-200`／`result-200` | ✅ | ✅ |

- 每步驟後檢查 **console.error／pageerror／requestfailed**：**0 個**；全程**零外部網路請求**。
- 手機每步驟另外驗證 **無橫向溢出**（`scrollWidth <= innerWidth`）：20 章地圖、4–5 成語棋盤、6–7 行 chain、過關 overlay panel 都涵蓋。
- 所有畫面文字檢查唔會出現 `undefined`／`null`（粵拼 fallback 回歸）。
- 截圖自動輸出至 `screenshots/`（見 §7）；`npm run shots` 可一鍵重新生成 40 張。

## 5. 獨立關卡驗證（`scripts/verify-levels.mjs`，200 關）

唔 import 生成器，獨立重新實作 docs/PLAN.md §4（含 §4.5 進階篇）／§5.3 契約。`node scripts/verify-levels.mjs` → **18/18 檢查 PASS，0 警告，exit 0**。

檢查項：章節資料（20 章／20 scene key）、關卡數量與 id（200）、章節對應、模式分佈（38 chain）、棋盤幾何（無遊離格、進階 fill ≤10×10）、交叉／接龍幾何、blanks 合法（基礎 1–3／進階 1–4、進階每關 ≥2 given）、bank multiset＋誘餌（基礎精確／進階 min(目標,22−空格)、bank ≤22）、提示次數曲線（基礎 3→1、進階 2→1）、誘餌曲線、成語數／空格數公式（基礎 d／進階 d2）、每關 ≥2 成語＋錨（基礎 tier≤2／進階 tier≤3）、進階 tier 水平（平均 ≥3.8、tier4/5 ≥50%）、標題／故事（唯一、無穿橋）、200 關唯一（完整＋成語組合 **0 重複**）、難度趨勢（20 章單調＋Pearson）、資料角可解性、成語接龍連通性（733 條／332 可接龍／最長 ≥7）。
輸出包含 20 章統計表（平均成語數、空格比例、tier 分佈、chain 長度等）。

## 6. 其他驗證

- `node scripts/qa-testids.mjs`：PLAN §7.4 全部 **43/43 testid**（36 固定＋7 動態）靜態存在，掃到 **51 個 testid 字串**。E2E 另外動態斷言 ui-dev 新增嘅 `map-section-basic`／`map-section-advanced`（地圖分區）同 `result-final-all`（第 200 關祝賀 banner）。
- `node scripts/verify-idioms.mjs`：**PASS**——**733 條成語、粵拼 733/733、332 筆可接龍（最長簡單接龍 12 步）**；11 項 warning（sourceBook 篇名，見 §8 DATA-WARN-1）。
- `npm run check`：tsc strict **exit 0**。
- `npm run build`：成功（Vite build 470 ms）。

---

## 7. 截圖清單（`screenshots/`，40 張；Issue #2 後重生成）

| 檔案 | 尺寸 | 說明 |
| --- | --- | --- |
| `home-desktop.png` / `home-mobile.png` | 1280×800 / 780×1694 | 首頁：貓貓 hero、標題、進度（0/200）、主 CTA |
| `map-desktop.png` / `map-mobile.png` | 1280×4698 / 780×14792 | 地圖：**20 章卡片**（基礎篇＋進階篇兩個 section）、星星與鎖定狀態 |
| `game-desktop.png` / `game-mobile.png` | 1280×800 / 780×1688 | Level 1 遊戲：HUD、貓貓旁白、成語棋盤、字庫 |
| `result-desktop.png` / `result-mobile.png` | 1280×800 / 780×1688 | Level 1 過關：3 星、成語卡（普＋粵雙拼音） |
| `codex-desktop.png` / `codex-mobile.png` | 1280×800 / 780×1688 | 圖鑑：收集進度（2/733）、已收集／未收集卡片 |
| `settings-desktop.png` / `settings-mobile.png` | 1280×800 / 780×1688 | 設定：音效、減少動態、重置、關於 |
| `tutorial-desktop.png` / `tutorial-mobile.png` | 1280×800 / 780×1688 | 新手教學 overlay |
| `chapter-intro-desktop.png` / `chapter-intro-mobile.png` | 1280×800 / 780×1688 | 第 1 章章節故事 overlay |
| `codex-detail-desktop.png` / `codex-detail-mobile.png` | 1280×800 / 780×1688 | 成語詳情 modal：「普」＋「粵」雙拼音、釋義、出處 |
| `codex-search-jyutping-desktop.png` / `codex-search-jyutping-mobile.png` | 1280×800 / 780×1688 | Issue #1：無聲調粵拼搜尋命中「雪中送炭」 |
| `reset-confirm-desktop.png` / `reset-confirm-mobile.png` | 1280×800 / 780×1688 | 重置進度二次確認 |
| **`map-advanced-desktop.png` / `map-advanced-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：進階篇地圖（第 11 章藏經閣解鎖、第 11–20 章列表） |
| **`chapter-intro-11-desktop.png` / `chapter-intro-11-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：第 11 章藏經閣章節故事（新場景 `library`） |
| **`game-101-desktop.png` / `game-101-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：Level 101 進階 fill（4 成語、5 成語 chip、提示 2） |
| **`result-101-desktop.png` / `result-101-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：Level 101 過關 3 星 |
| **`chain-6-desktop.png` / `chain-6-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：Level 105 進階接龍 6 句 |
| **`result-105-desktop.png` / `result-105-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：Level 105 過關 3 星 |
| **`chain-7-desktop.png` / `chain-7-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：第 16 章 Level 155 接龍 7 句（最長 chain） |
| **`game-200-desktop.png` / `game-200-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：Level 200 最終關（chain 7） |
| **`result-200-desktop.png` / `result-200-mobile.png`** | 1280×800 / 780×1688 | **Issue #2**：第 200 關完成（「恭喜完成全部 200 關」＋「全部完成！返回地圖」） |

> 手機截圖為 DPR 2（390×844 CSS px → 780×1688 實體 px；首頁 1694、地圖 14792 為 fullPage）。人手檢視：20 章地圖、進階篇場景、4–5 成語棋盤、7 句 chain、第 200 關結局文案全部正常、無橫向溢出、繁中無亂碼。
> 合計 40 張、約 25.0 MB；`npm run shots` 可一鍵重新生成。

## 8. Bug 清單

### 8.1 總覽

| ID | 嚴重程度 | 標題 | Owner | 狀態 |
| --- | --- | --- | --- | --- |
| BUG-QA-1 | 低 | 圖鑑拼音搜尋唔支援無聲調輸入（`yu gong` 搵唔到 `yú gōng`） | ui-dev | ✅ **已修＋QA 回歸通過** |
| BUG-QA-2 | 低 | 圖鑑 0 結果時 grid hidden 但仍保留舊 DOM（stale cards） | ui-dev | ✅ **已修＋QA 回歸通過** |
| BUG-QA-3 | 低 | Deep-link 到未解鎖／不存在關卡時，提示 toast 被 route render 清走 | ui-dev | ✅ **已修＋QA 回歸通過** |
| DATA-WARN-1 | 低（資料品質 warning） | **11 條**成語 `sourceBook` 只有書名、缺篇名（`《老子》`、`《過庭錄》` 等） | idiom-scholar | 已知／verify-idioms 只警告（不阻塞） |
| ENGINE-OBS-1 | 觀察（不可達） | `createGame()` 若整關所有 slot 都冇空格，唔會自動 `solved` | Lead（core） | 記錄備查；現有資料契約不可能出現 |

**統計：0 個高／中嚴重程度 bug；3 個低 bug 已全部修正並回歸通過；1 個低資料 warning（11 項 sourceBook）待 idiom-scholar 決定；1 個不可達邊界觀察；Issue #1／#2 各 0 個產品 bug。**

**Issue #2（200 關／20 章）驗收：0 個產品 bug。** 最終 733 條成語＋200 關一次過 PASS；開發期 4 項 verifier FAIL 全部屬「規則未同步」而非資料錯，已按 game-designer／Lead 定案更新：
1. 進階 fill 每句空格上限由 1–3 放寬到 **1–4**（+ 每關 ≥2 given）；
2. 誘餌改為 **min(章節目標, 22−空格)**，唔再要求實際章節平均誘餌單調上升；
3. 進階篇平均 tier ≥3.8 要等最終 ≥688 冷僻成語資料（interim 3.74 已預期，最終 4.00 PASS）；
4. 難度 trend 第 11 章 tier／第 18 章誘餌按上列規則對齊後 PASS。
另外新增 **基礎篇 v1.1 freeze 測試**（Level 1–100 逐關與 baseline JSON 完全相同）、**scenes.test.ts**（20 場景 SVG 契約），以及 ui-dev 新 testid 回歸（`map-section-basic`／`map-section-advanced`／`result-final-all`，E2E 30/30 重跑 PASS）。

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
| `npm run build` 耗時 | **470 ms** | tsc＋Vite，本機 |
| JS bundle | **693.77 kB**（gzip 205.41 kB） | 含 733 條成語（普＋粵拼）＋200 關＋20 場景＋UI 全部程式；無 code splitting |
| CSS bundle | **83.04 kB**（gzip 16.68 kB） | 全部畫面＋20 場景／貓貓動畫＋雙拼音徽章樣式 |
| index.html | 0.89 kB（gzip 0.61 kB） | — |
| 外部網路請求 | **0** | E2E 收集全部 request，全部同源；WebAudio 即時合成、無音檔／字體／圖片外部載入 |
| 首次內容載入（本機 preview） | 首頁畫面 < 1.5 s | 靜態資源、無 API |
| 單元測試 | ~1 s（73 tests） | — |
| 獨立關卡驗證 | ~0.2 s（200 關＋統計） | — |
| E2E 全套 | **107.5 s**（build＋preview＋desktop＋mobile＋40 截圖、30 步驟） | 進階遊玩步驟佔多數時間 |
| `npm run shots` | ~110 s（跑 E2E 流程＋列出 40 張截圖） | 截圖合計約 25.0 MB |

- Bundle 演進：interim 283 kB → Issue #1 422.91 kB（488 成語＋粵拼）→ **Issue #2 693.77 kB（gzip 205.41 kB）**（733 成語＋200 關＋20 場景）。gzip 205 kB 對單機離線遊戲仍屬可接受；若日後要瘦身可考慮：(a) 將 idioms／levels 詳情改 lazy chunk／動態 import；(b) 場景 SVG 按需載入（地圖已用 IntersectionObserver lazy 動畫）。現階段功能優先、無必要。
- 20 章地圖 fullPage（手機 780×14792 px）仍低於 Chromium 單張截圖上限（16384 px），`npm run shots` 正常。
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
9. 修正記錄：BUG-QA-1/2/3 已由 ui-dev 修正，QA 已加回歸斷言並重跑全綠（§8.8）；DATA-WARN-1（sourceBook 篇名，11 項）仍待 idiom-scholar 決定，屬低風險資料 warning。
10. E2E 偶發 flake：一次合併流程（desktop 先失敗中止後）mobile context 首屏 `home-screen` 8 秒 timeout，單獨重跑及之後多次全套均 PASS；已加強 failure 時輸出 console/page error 及自動清理 `failure-*.png`，未再復現。
11. **粵拼讀音約定**：個別文白異讀採「香港通行讀音」（例：坐井觀天 `co5`、車水馬龍 `ce1`、後生可畏 `saang1`），記錄於 `docs/IDIOM_SOURCES.md` §11；QA E2E 一律由 `?debug=1` 讀資料值做預期，**冇 hardcode 任何粵拼**。
12. **Issue #2 進階規則**：進階 fill 每句可 1–4 空格（基礎仍 1–3）、每關最少 2 個 given；bank 硬上限 22 令後期實際誘餌 8–9（低於章節目標 9–10），屬設計允許，QA 以 `min(目標, 22−空格)` 精確驗證。
13. **Level 101／105 實際結構**：依 PLAN §4.5 公式，Level 101 係 **4 成語 fill**（唔係 5）、Level 105 係 **chain 6**（chain 7 由 Level 155 起）；E2E 已分開驗證 Level 155 的 7 句 chain 並截圖 `chain-7`。需求文件早期描述「101 5 成語／105 chain 7」為概括講法，以公式為準。
14. **基礎篇凍結**：Level 1–100 與 v1.1 逐關完全相同（`tests/unit/fixtures/levels-v1.1-baseline.json` 比對）；未來任何生成器改動若影響基礎篇會即時 FAIL。

---

## 11. 重現指令

```bash
cd ChineseIdiomsGame

# 型別＋建置
npm run check
npm run build

# 單元／整合測試（73 tests；含粵拼、200 關、20 場景）
npm test

# 獨立關卡驗證（17 項檢查＋逐章統計，exit 0）
node scripts/verify-levels.mjs          # 或 npm run verify:levels
node scripts/verify-levels.mjs --json   # 機器可讀

# 成語資料驗證（idiom-scholar 提供）
node scripts/verify-idioms.mjs

# testid 契約靜態檢查（43 項）
node scripts/qa-testids.mjs

# E2E（自動 build＋preview:4390＋桌面＋手機＋40 張截圖；約 108 秒）
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

- `tests/unit/idioms.test.ts`、`levels.test.ts`、`puzzle.test.ts`、`progress.test.ts`、**`scenes.test.ts`**、`data-helpers.ts`、**`fixtures/levels-v1.1-baseline.json`**（基礎篇凍結 baseline）
- `scripts/verify-levels.mjs`（獨立關卡驗證）、`scripts/qa-testids.mjs`（testid 契約檢查）、`scripts/qa-screenshots.mjs`（`npm run shots` 截圖 wrapper）
- `e2e/run.mjs`、`e2e/lib.mjs`、`e2e/specs.mjs`（含 Issue #1 雙拼音／粵拼搜尋／overlay overflow 斷言）
- `docs/TEST_PLAN.md`、`docs/QA_REPORT.md`（本文件）
- `screenshots/*.png`（**40 張**；Issue #2 後重生成，新增 `map-advanced`、`chapter-intro-11`、`game-101`、`chain-6`、`chain-7`、`game-200`、`result-200` 等）

---

## 12. 附錄

### 12.1 測試結果原始數據（摘要）

```
npm test                     → Test Files 5 passed (5) / Tests 73 passed (73) / ~1 s
npm run test:e2e             → E2E 30/30 通過（0 失敗）/ 107.5s（desktop 15＋mobile 15）
npm run shots                → E2E 30/30 通過 / 40 張截圖（約 25.0 MB）
verify-levels                → 18/18 檢查 PASS，警告 0 項，exit 0
verify-idioms                → PASS（733/733 條、粵拼 733/733、332 可接龍；警告 11 項：sourceBook 篇名）
qa-testids                   → 43/43 testid 齊全（掃到 51 個 testid 字串）
npm run check                → exit 0
npm run build                → ✓ built in 470ms（JS 693.77 kB / gzip 205.41 kB；CSS 83.04 kB / gzip 16.68 kB）
```

### 12.2 資料指紋（測試對象）

| 檔案 | sha256 |
| --- | --- |
| `src/data/idioms.json`（Issue #2 最終版：733 條） | `3cb32f861d40caafa765b168557774666925a7e63f137a648ab4dafa6ed7c950` |
| `src/data/levels.json`（Issue #2 最終版：200 關） | `12bba215b2fb0b4611232b5162975b1592354cb5ecb397f27bf0e6eca60cbc58` |
| `src/data/chapters.json`（20 章） | `aa87f7a9a1a0cb9adaa43fb1143f118a810db34c8cdc98706bd418591dc5b6cf` |

> 若 `levels.json`／`idioms.json` 在部署前再有改動，請通知 QA 重跑 §11 全套（資料指紋會變，本報告數字需同步更新）。

---

## 13. Issue #1 驗收：粵拼（Jyutping / 廣東話拼音）

> GitHub Issue #1：「拼音 可否同時提供 廣東話和普通話拼音。」
> 需求：488 條成語全部加 `cantonese`（粵拼、4 音節、帶聲調數字）；過關成語卡／成語圖鑑詳情同時顯示普通話拼音＋粵拼；圖鑑搜尋支援粵拼。
> 驗收日期：2026-10-28 22:12–22:20（資料 sha256 `9ba371d4…`）
> **歷史註記**：本節係 Issue #1 首次驗收記錄（當時 488 條成語、100 關）；Issue #2 後最終資料為 733 條成語／200 關，粵拼覆蓋 **733/733**、E2E 30 步全部維持 PASS，已於 §14 覆核。

### 13.1 資料驗證（`npm test`）

- `tests/unit/idioms.test.ts` 新增「cantonese 粵拼」測試（第 11 個測試）：
  - 488/488 每筆都有非空 `cantonese`；
  - 正好 4 個音節（空格分隔、單空格）；
  - 每音節符合 `^[a-z]+[1-6]$`（帶聲調數字）；
  - 覆蓋率統計斷言 `withCantonese === idioms.length`（488/488）。
- `node scripts/verify-idioms.mjs`：**PASS**，輸出「粵拼（cantonese）：488/488 條（4 音節、帶聲調數字）」；另有 10 項 sourceBook 篇名 warning（與 Issue #1 無關）。
- 樣例：`雪中送炭` → `xuě zhōng sòng tàn` / `syut3 zung1 sung3 taan3`；`風花雪月` → `fēng huā xuě yuè` / `fung1 faa1 syut3 jyut6`；`畫蛇添足` → `huà shé tiān zú` / `waak6 se4 tim1 zuk1`。

### 13.2 UI／E2E 驗證（`npm run test:e2e`，Issue #1 時 desktop＋mobile 各 11 步；Issue #2 後為 15 步，斷言保留）

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

---

## 14. Issue #2 驗收：200 關／20 章（進階篇）

> GitHub Issue #2：「加多 100 關 / 更多變化 / 更少見成語 / 加難度」
> 需求：Level 101–200＝第 11–20 章進階篇（10 個新場景）；成語 ≥688；20 章／200 關；進階 fill 4–5 成語、chain 6–7 句、空格比例 0.60→0.72、誘餌 6→10（bank ≤22）、tier 以 4/5 為主（每關錨 tier≤3）；基礎篇 1–100 完全凍結。
> 驗收日期：2026-10-30 00:12–00:24（`levels.json` sha256 `12bba215…`、`idioms.json` `3cb32f86…`）

### 14.1 資料驗證（`npm test`／`verify-levels.mjs`／`verify-idioms.mjs`）

- **成語 733 條**（≥688）：tier 70/110/208/200/145（全部達 PLAN §5.1 下限）；4 漢字、唯一 id/word、拼音、粵拼 **733/733**、意義／出處長度、sourceBook 格式全部 PASS；接龍 **332 筆可接龍**（≥250）、最長簡單接龍 **12 步**（≥7）、49 個連接字齊。
- **200 關／20 章**：id 1–200 連續、chapter＝ceil(id/10)（1–20）；模式 **fill 162／chain 38**；chain 關 id 為 11 的倍數（15…200）；Level 1–10 全 fill。
- **進階篇規則**（第 11–20 章）：
  - fill 成語數 4–5（`4+round(d2)`）；chain 6–7 句（`6+round(d2)`，155 起 k=7）；幾何、交叉、接龍全 PASS。
  - 每句空格：基礎 1–3、**進階 1–4**；進階每關 **≥2 given**；空格數符合 `round(r2×4n)`（fill ±1）／chain clamp。
  - bank **≤22**；誘餌＝**min(章節目標 6,6,7,7,8,8,9,9,10,10, 22−空格)**（後期實際 8–9）；誘餌唔等於答案字。
  - 錨：基礎 tier≤2、進階 tier≤3；進階平均 tier **4.00**、tier 4/5 佔 **70.2%**（每章 3.82–4.20）。
  - 200 關完整內容＋成語組合 **strict 唯一**（0 重複）；200 個標題唯一、無穿橋。
- **基礎篇凍結**：Level 1–100 與 v1.1 baseline **逐關完全相同**（`tests/unit/levels.test.ts`「基礎篇凍結」）。
- **場景**：`SCENE_KEYS` 20 個（基礎 10＋進階 `library`/`volcano`/`desert`/`aurora`/`underwater`/`skycastle`/`shrine`/`harbor`/`firefly`/`zenith`）；`chapterSceneSVG` 全部回傳有效 800×450 SVG、deterministic、defs id 有 `scene-<key>-` 前綴；未知 key fallback garden（`tests/unit/scenes.test.ts` 6 tests）。
- **可解性**：真引擎 `createGame → placeChar(正解) → isSolved()` **200/200 PASS**、全部 3 星、零錯誤、38 關 chain row0 自動鎖定。
- `node scripts/verify-levels.mjs`：**18/18 PASS、0 警告**（20 章統計表、Pearson r=0.790/0.793/0.870）。

### 14.2 E2E 驗證（`npm run test:e2e`，desktop＋mobile 各 15 步）

| 驗收點 | E2E 斷言（seed localStorage／`?debug=1` 讀資料值，冇 hardcode） | 結果 |
| --- | --- | --- |
| 地圖 20 章／200 關 | `chapter-1`…`chapter-20`、`level-btn-*` 共 200 個、基礎篇／進階篇分區標題、總星數 0/600 | ✅ desktop＋mobile |
| seed 100 關 | 首頁「繼續第 101 關」、已過 100/200、總星數 300/600、Level 101 當前、Level 102 未解鎖、第 11 章已解鎖 | ✅ desktop＋mobile |
| 第 11 章 chapter-intro | overlay 包含新場景 SVG（`scene-library`）＋章名「藏經閣」 | ✅ desktop＋mobile |
| Level 101（進階 fill） | mode=fill、4 成語（PLAN §4.5 公式）、棋盤／字庫數正確、真實點擊完成 → 3 星、下一關 102 | ✅ desktop＋mobile |
| Level 105（進階 chain 6） | mode=chain、6 句、rows=6／cols=4、24 格、完成 → 3 星 | ✅ desktop＋mobile |
| chain 7（Level 155） | 7 句、rows=7／cols=4、28 格、截圖 `chain-7` | ✅ desktop＋mobile |
| 第 200 關完成文案 | seed 到 199 → Level 200 chain 7 完成 → 按鈕「全部完成！返回地圖」、`result-final-all` banner「恭喜完成全部 200 關！你係成語大師喵～」、localStorage 記錄 3 星；非最終關唔會顯示 banner | ✅ desktop＋mobile |
| 地圖分區 testid | `map-section-basic`／`map-section-advanced` 各 1 個；進階分區內含 `chapter-11` | ✅ desktop＋mobile |
| 響應式／穩定性 | 20 章地圖、4–5 成語棋盤、6–7 行 chain、結果 panel 手機無橫向溢出；0 console error／pageerror／failed request；畫面無 undefined | ✅ desktop＋mobile |

### 14.3 截圖（Issue #2 相關）

- `screenshots/map-advanced-desktop.png`、`-mobile.png`：進階篇地圖（第 11 章藏經閣解鎖、第 11–20 章）。
- `screenshots/chapter-intro-11-desktop.png`、`-mobile.png`：第 11 章章節故事（新場景）。
- `screenshots/game-101-desktop.png`、`-mobile.png`：Level 101 進階 fill（4 成語）。
- `screenshots/result-101-*`、`result-105-*`：進階關卡過關。
- `screenshots/chain-6-desktop.png`、`-mobile.png`：Level 105 chain 6；`chain-7-desktop.png`、`-mobile.png`：Level 155 chain 7。
- `screenshots/game-200-*`、`result-200-*`：第 200 關最終考驗 + 全部完成結局文案。
- 基礎截圖（home/map/game/result/codex/settings 等）已同步更新為 200 關版本。

### 14.4 結論

**Issue #2 驗收 PASS：0 個產品 bug。** 733 條成語、200 關／20 章、10 個新場景、進階規則、基礎篇凍結、200/200 可解性、30 步 E2E 與 40 張截圖全部通過；全套迴歸（unit 73/73、verify-idioms、verify-levels 18/18、qa-testids 43/43、build、E2E 30/30）全綠。

> 已知非阻塞：11 項 `sourceBook` 篇名 warning（idiom-scholar）；進階後期誘餌實際 8–9（bank ≤22 設計約束，已書面化）；Bundle 增至 gzip 205 kB（733 成語＋200 關，可接受，未來可 lazy load）。
