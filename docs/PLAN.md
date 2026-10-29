# 《貓咪成語大冒險》— 專案總規劃與協作契約（v1）

> 本文件係全隊的單一事實來源（single source of truth）。所有 Agent 開工前先讀本文件；
> 如需改動契約（型別、檔案擁有權、API 簽名、testid），必須先通知 Lead。
> 最後更新：Lead（2026-10-28，Phase 0）

## 1. 目標與交付

- 作品：**《貓咪成語大冒險》**— 貓貓風格成語**填字／接龍**網頁遊戲，繁體中文（香港用語），**200 關**（20 章 × 10 關；基礎篇 1–10 章、進階篇 11–20 章），難度遞增。
- 玩法：成語填字（成語交叉）＋成語接龍（首尾相接），逐個成語自動判定；完成關卡獲星、解锁下一關、收集成語圖鑑（釋義＋出處）。
- 平台：靜態 SPA（Vite + TypeScript，無框架、無 runtime 依賴、無外部網路請求），響應式支援手機及電腦。
- 部署：Cloudflare Workers，worker 名稱 `chineseidiomsgame`，目標網址
  <https://chineseidiomsgame.fungkingfai.workers.dev/>。
- 原始碼：<https://github.com/fungkingfai/ChineseIdiomsGame>（`main` 分支，push 後由 Cloudflare Workers Builds 自動部署）。
- 本機專案路徑：`/home/fung/Documents/deepseek-harness/default-workspace/ChineseIdiomsGame`。

## 2. 環境、指令、工具鏈

- Node 24 / npm 11；依賴已安裝（**唔好加新依賴、唔好改 package.json**）。
- 指令（在專案根目錄執行）：
  - `npm run dev` — Vite dev server，<http://localhost:5280>
  - `npm run check` — `tsc --noEmit`（TypeScript strict）
  - `npm test` — Vitest 單元測試
  - `npm run build` — 型別檢查＋Vite build 到 `dist/`
  - `npm run preview` — 預覽 build 成品，<http://localhost:4280>
  - `npm run generate:levels` — 由 idioms.json + chapters.json 生成 200 關 levels.json
  - `npm run test:e2e` — Playwright E2E（QA 提供）
- Playwright：`playwright@1.64.1`，Chromium 已 cache（唔需要下載）。
- Cloudflare / GitHub push / 部署：**只由 Lead 執行**，其他 Agent 一律唔准 `git push`、`wrangler deploy`。
- 開發用 dev server 由誰開都可以，但**唔好佔用固定 port 起長期 server**；截圖由 QA/Lead 負責。

## 3. 檔案擁有權（Write Scope，嚴格遵守）

| 路徑 | 擁有者 | 說明 |
| --- | --- | --- |
| `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `wrangler.jsonc`, `index.html`, `.gitignore`, `README.md` | Lead | 任何 Agent 唔好改 |
| `docs/PLAN.md` | Lead | 本文件 |
| `src/main.ts`, `src/core/**`, `src/data/index.ts`, `src/data/idioms.json`, `src/data/chapters.json`, `src/data/levels.json`（Phase 0 placeholder） | Lead | 之後交棒（見下） |
| `scripts/**`（除 `scripts/generate-levels.mjs`, `scripts/verify-idioms.mjs`, `scripts/qa-*.mjs`, `scripts/verify-levels.mjs`） | Lead | |
| `public/favicon.svg`, `public/` 其他 Lead 資產 | Lead | 貓貓美術資產歸 cat-animator（見下） |
| `src/data/idioms.json` | **idiom-scholar** | 成語資料庫（由 Lead placeholder 接手全面改寫） |
| `src/data/chapters.json`, `src/data/levels.json` | **game-designer** | 章節及 200 關（由 placeholder 接手） |
| `docs/GAME_DESIGN.md`, `docs/LEVEL_DESIGN.md` | **game-designer** | 玩法／關卡設計文件 |
| `scripts/generate-levels.mjs` | **game-designer** | 關卡生成器（deterministic） |
| `docs/IDIOM_SOURCES.md` | **idiom-scholar** | 出處考證方法及已核對清單 |
| `scripts/verify-idioms.mjs` | **idiom-scholar** | 成語資料驗證腳本 |
| `docs/UI_DESIGN.md`, `src/app.ts`, `src/router.ts`, `src/screens/**`, `src/ui/**`, `src/styles/**`（除 `cats.css`）, `src/styles/index.css` | **ui-dev** | 介面設計及實作（PC＋手機） |
| `docs/ART_DESIGN.md`, `src/cats/**`, `src/styles/cats.css`, `public/art/**` | **cat-animator** | 貓貓角色、場景、2D 動畫 |
| `docs/TEST_PLAN.md`, `docs/QA_REPORT.md`, `tests/**`, `e2e/**`, `scripts/qa-*.mjs`, `scripts/verify-levels.mjs`, `screenshots/**` | **qa-tester** | 測試、截圖、QA 報告 |

規則：
- 只可以改自己 scope 內嘅檔案；需要跨 scope 改動（例如 core API 唔夠用）→ `send_message` 通知 Lead，由 Lead 決定或代改。
- Placeholder 交棒：`src/app.ts`、`src/styles/index.css`、`src/cats/*`、`src/data/*.json` 目前係 Lead 嘅最小可用 placeholder，擁有者可以**全面改寫**自己 scope 內嘅檔案。
- **唔好刪除或改寫他人 scope 內檔案**；發現 bug 寫落報告／通知 owner。
- UI 文案一律**繁體中文**；程式碼識別名用英文；可以寫繁中註解。

## 4. 遊戲設計規格（game-designer 深化，其他 Agent 跟隨）

### 4.1 世界觀
- 主角：店長貓**阿墨**（黑貓，冷靜博學，綠圍巾）＋小貓**糰子**（橘虎斑，好動好奇，粉圍巾）。
- 故事：成語靈珠散落喺貓貓世界二十個場景，糰子跟阿墨逐章收集；完成基礎篇十景後，仲要闖入「進階篇」十個更奇幻／凶險嘅場景，最後登上「蒼穹之巔」。
- **20 章場景 keys（必須用呢組 key）**：
  - 基礎篇（第 1–10 章）：`garden` 櫻花小徑、`bamboo` 竹林迷宮、`moon` 月下書齋、`snow` 雪山溫泉、`sea` 海邊燈塔、`stars` 星空詩會、`festival` 燈會市集、`rain` 雨後石巷、`cloud` 雲端書樓、`summit` 成語之巔。
  - 進階篇（第 11–20 章，Issue #2 新增）：`library` 藏經閣、`volcano` 烈焰火山、`desert` 大漠孤煙、`aurora` 極光冰原、`underwater` 海底龍宮、`skycastle` 天空之城、`shrine` 貓神古廟、`harbor` 夜航碼頭、`firefly` 螢火竹林、`zenith` 蒼穹之巔。

### 4.2 關卡模式（200 關）
- `fill`（填字）：基礎篇 2–4 個成語、進階篇 4–5 個成語互相交叉（共用字），部分字空格，玩家由字庫揀字填入。
- `chain`（接龍）：基礎篇 3–6 個、進階篇 6–7 個成語首尾相接（上一句尾字 = 下一句首字），以直向接龍呈現。
- 分配：`chain` 用於 `id >= 11 && id % 5 === 0` 嘅關卡（Level 15,20,…,100 及 105,110,…,200，共 38 關）；其餘 `fill`。Level 1–10 全部 `fill`（教學期）。
- 每關連續性：每關至少 2 個成語；fill 關每個新成語必須同前面至少一個成語共用一格（交叉）。

### 4.3 核心玩法
- 點空格 → 點字庫字卡放入；再點已填格可退回字卡（未鎖定前）。
- 當一個成語所有空格填滿，**自動判定**：
  - 正確 → 該成語鎖定（變綠、音效、貓貓開心）；該成語全部格唔可以再改。
  - 錯誤 → 該成語震動、清空該成語玩家填入嘅字（字卡返字庫）、`mistakes += 1`、貓貓傷心。
- 提示（每關有限次，`hintLimit`）：隨機揭示一個空格嘅正解字，`hintsUsed += 1`；提示字鎖定。
- 全部成語鎖定 → 過關，計星：
  - 3 星：0 錯誤且 0 提示
  - 2 星：錯誤或提示其中一項 > 0（另一項為 0）
  - 1 星：兩項都 > 0
  - 最少 1 星；重玩取最高星。
- 過關 overlay：星星、本關成語卡（成語、拼音、釋義、出處）、「下一關」「返回地圖」；成語自動收入圖鑑。
- 進度：localStorage 自動儲存（由 core/progress 提供）；解鎖下一關；首頁顯示「繼續第 N 關」。

### 4.4 難度曲線（可微調，但必須保留上升趨勢且寫入 LEVEL_DESIGN.md）
- 難度參數 `d = (id - 1) / 99`（0 → 1）。
- 成語數：fill `2 + round(2d)`（上限 4）；chain 長度 `3 + round(3d)`（上限 6）。
- 空格比例（每關空格數 / 所有 slot 字數）：約 `0.30 → 0.65` 線性上升。
- 提示次數：3（第 1 章）→ 1（第 10 章）。
- 誘餌字（bank 內非答案字）：0 → 6，逐章增加。
- 成語難度 tier：由 tier 1 為主 → tier 4/5 為主；每關至少有一個 tier ≤ 2 嘅成語做錨。
- 章節內亦要遞進（每章第 10 關最難）。

### 4.5 進階篇（Level 101–200，第 11–20 章，Issue #2）
- 承接第 100 關難度再上台階：`d2 = (id - 101) / 99`（0 → 1）。
- 成語數：fill `4 + round(d2)`（4–5 個；棋盤上限 10×10，優先 ≤ 9×9）；chain 長度 `6 + round(d2)`（6–7 個）。
- 空格比例：約 `0.60 → 0.72`（chain 因接龍連接位天然略低，靠成語 tier／誘餌補回難度）。
- 提示次數：2（第 11 章）→ 1（第 16–20 章）。
- 誘餌字：6 → 10（bank 上限 ≤ 22 張）。
- 成語 tier：以 tier 4/5 為主；進階篇平均 tier 約 3.8 → 4.6；每關至少 1 個 tier ≤ 3 錨（避免全冷僻）。
- 200 關全部唯一（成語組合及完整內容），並與 Level 1–100 不重複；難度指標（章節平均空格比例／成語數／tier）整體單調上升。
- 每關 `title`／`story` 繁中、全站唯一；進階篇故事語氣更冒險神秘，但不可穿橋提及答案。
- 變化要求：不同章節場景、模式（fill/chain）、盤面大小、成語題材（自然／人物／哲理／動物…）交錯；避免連續關卡用相同成語組合。

## 5. 資料契約

### 5.1 `src/data/idioms.json`（idiom-scholar）
JSON array，**≥ 688 筆**（Issue #2 後：基礎 488 筆＋進階新增 ≥ 200 筆，以 tier 4/5 冷僻成語為主），每筆符合 `Idiom`（見 `src/core/types.ts`）：
- `id`：拼音 kebab-case、全庫唯一（例：`ri-xing-qian-li`）
- `word`：**正好 4 個繁體漢字**，全庫唯一；唔好用異體字／簡體字
- `pinyin`：帶聲調，音節以空格分隔（例：`rì xíng qiān lǐ`）
- `cantonese`：粵拼（香港語言學學會 Jyutping，帶聲調數字），4 個音節以空格分隔（例：`jat1 nok6 cin1 gam1`）；全庫每筆都要有，唔可以留空
- `meaning`：繁中釋義 15–60 字，準確、易明
- `origin`：出處說明 15–90 字（引邊部古籍、咩故事）
- `sourceBook`：`《書名·篇名》` 格式（例：`《史記·項羽本紀》`）
- `tier`：1–5（1 = 小學常識；5 = 較冷僻）
- `tags`：可選 1–3 個分類（動物／自然／人物／學習／情感／寓言／做事／說話…）
- 分佈建議：tier1 ≥ 70、tier2 ≥ 110、tier3 ≥ 185、tier4 ≥ 185、tier5 ≥ 120（總數 ≥ 688）。
- **接龍連通性**：至少 250 筆成語嘅首字／尾字可以同其他成語接龍（例如尾字等於另一成語首字），最長鏈 ≥ 7 步（供進階篇 chain 關使用），並涵蓋常用連接字（一、不、人、心、天、大、小、山、水、風、日、月、目、口、手、足、馬、龍、虎、金、玉、正、堂、行、里…）。
- 出處考證：起碼 50 筆用 `web_search`／`web_fetch` 核對過，並在 `docs/IDIOM_SOURCES.md` 記錄方法、URL 及已核對清單；其餘用可靠古典典籍記憶，唔肯定就唔好亂寫（可用「出處待考」但唔建議）。
- 驗證：`node scripts/verify-idioms.mjs` 全部通過（4 字、唯一、欄位長度、普通話拼音格式、粵拼格式／4 音節、tier 範圍、數量 ≥ 688、接龍連通性）。
- 粵拼資料以 CanCLID `to-jyutping`（基於 rime-cantonese，CC BY 4.0）輔助產生基線，再經人手／Agent 逐條核對及修正，詳見 `docs/IDIOM_SOURCES.md`。

### 5.2 `src/data/chapters.json`（game-designer）
20 筆 `Chapter`，id 1–20（第 1–10 基礎篇、第 11–20 進階篇）、scene key 必須係 4.1 所列、name/blurb 為繁中；基礎篇名稱可沿用，進階篇名稱／blurb 由 game-designer 撰寫。

### 5.3 `src/data/levels.json`（game-designer，由生成器產生）
200 筆 `Level`（見 `src/core/types.ts`），id 1–200 連續、chapter 1–20（每章 10 關）；Level 101–200 依 §4.5 進階篇規則：
- `cells`：所有有字格（解答字），填字關交叉格只出現一次；chain 關 `rows = 成語數`、`cols = 4`，每行一個成語、`dir: "h"`、`col: 0`。
- `slots[].blanks`：0-based 字序（0–3）；fill 關交叉格可以係空格，但同一格喺所有 slot 嘅答案字必須一致。
- `bank`：multiset（可以有重複字），數量＝所有空格數＋誘餌字；**每個空格所需字嘅數量必須足夠**（同字多格就要多張）。
- 誘餌字唔可以同任何「已鎖定 given 字」混淆？冇所謂，但建議誘餌字唔好等於任何空格答案（避免玩家一次點錯字就必然錯晒——其實都可以，增加難度；以 generator 規則為準並寫入文件）。
- `hintLimit`：1–3，跟難度曲線。
- `title`／`story`：繁中，配合章節場景及貓貓世界觀。
- chain 關規則：row 0 全顯示（blanks 可為 []）；row i≥1 保留首字（index 0）顯示；row i<k-1 保留尾字（index 3）顯示，方便睇到接龍關係；其餘可空格。
- 生成器 `scripts/generate-levels.mjs`：Seeded RNG（mulberry32，seed 由 level id 決定）→ 可重現；reads `idioms.json` + `chapters.json`；輸出 `levels.json`；內建驗證（可重用 `scripts/verify-levels.mjs` 嘅檢查邏輯）；輸出統計（每章平均空格比例、成語數、tier 分佈）以便寫入 LEVEL_DESIGN.md。
- 品質：200 關全部唯一（唔好有兩關完全一樣，成語組合亦不可重複）、每關至少 2 個成語、全部可解、難度指標整體上升。

### 5.4 核心資料 API（Lead 提供，UI 用）
`src/data/index.ts` 匯出：`idioms`, `levels`, `chapters`, `idiomById`, `TOTAL_LEVELS`, `getLevel(id)`, `getIdiom(id)`, `getChapter(id)`, `getChapterForLevel(levelId)`, `levelsByChapter()`。

## 6. 核心引擎 API（Lead 已完成，UI 直接使用，唔好改）

### 6.1 `src/core/types.ts`
所有資料型別（Idiom / Level / Slot / Chapter / SaveData / GameState / GameEvent…）。

### 6.2 `src/core/puzzle.ts`
```ts
createGame(level: Level): GameState
placeChar(g, key, char, bankIndex): GameEvent[]   // key 格式 "r:c"
removeChar(g, key): number | null                 // 回傳字卡 index（可放回字庫）
useHint(g): { key, char, bankIndex, events } | null
isSolved(g): boolean
getStars(g): number
keyOf(r, c): string
slotCellKeys(slot): string[]
slotBlankKeys(slot): string[]
blankKeySet(level): Set<string>
solutionMap(level): Map<string, string>
```
事件：`place` / `word-correct` / `word-wrong` / `hint` / `solved`。UI 依事件做動畫／音效／同步字卡使用狀態。
- `word-wrong` 事件會清空該成語玩家填入嘅格（`cells` 回傳被清空嘅 key），UI 要將對應字卡放回字庫。
- 字庫使用狀態由 UI 管理：`placeChar` 傳入字庫 index；`removeChar` 回傳 index；提示用 `useHint().bankIndex`（如果係 -1，UI 自己搵一張同字未用卡）。

### 6.3 `src/core/progress.ts`
```ts
loadProgress(): SaveData
saveProgress(save): void
resetProgress(): SaveData
isLevelUnlocked(save, levelId): boolean
nextPlayableLevel(save, totalLevels): number
recordLevelClear(save, levelId, stars, mistakes, hints, idiomIds?): SaveData  // 會自動儲存
collectIdioms(save, ids)
updateSettings(save, patch)   // 會自動儲存
markChapterSeen(save, chapterId)
markTutorialSeen(save)
totalStars(save), clearedCount(save), clearedRecord(save, levelId)
```

### 6.4 `src/core/audio.ts`
`audio`：`init()`, `setEnabled(bool)`, `enabled`, `play(name)`（name: click/place/correct/wrong/hint/clear/star/flip）, `fanfare()`。
- 首次使用者互動（pointerdown）要呼叫 `audio.init()`；音效開關用 `ctx.save.settings.sound`。

### 6.5 `src/main.ts` 與 `AppContext`
`main.ts` 建立 `AppContext { idioms, levels, chapters, save, persist(), audio }` 並呼叫 `mountApp(root, ctx)`。
- 當 URL 帶 `?debug=1`，`window.__CAT_IDIOM_DEBUG__ = { version, levels, idioms, chapters, getSave() }`（QA 用）。

## 7. UI/UX 契約（ui-dev）

### 7.1 路由（hash router，SPA 刷新仍可運作）
- `#/home`（預設）— 首頁
- `#/map` — 關卡地圖（10 章）
- `#/game/<id>` — 遊戲畫面（1–100；未解鎖要引導回地圖）
- `#/codex` — 成語圖鑑
- `#/settings` — 設定
- 未知路由 → 首頁；`#/game/999` → 地圖／提示。

### 7.2 畫面要求
1. **首頁**：貓貓 hero（阿墨＋糰子，動畫）、標題、主 CTA「開始冒險／繼續第 N 關」、圖鑑、設定、進度（星數／已過關數）、櫻花花瓣背景。新手第一次入 Level 1 顯示教學 overlay。
2. **地圖**：20 章卡片（基礎篇 1–10／進階篇 11–20 兩個 section；章節場景 SVG 縮圖、章名、星星進度、10 個關卡腳印按鈕，狀態：已過關有星／當前關閃動／未解鎖鎖頭）；自動 scroll 到當前章；顯示總星數；20 個場景 SVG 需用 lazy／static 方式避免手機一次過動畫 20 個（p95 < 20ms）。
3. **遊戲**：HUD（返回、關卡標題、提示按鈕＋剩餘次數、重玩、音效）；貓貓旁白／關卡 story；棋盤（cell 大方格，given 字顯示、空格可選、選中高亮）；chain 關要有接龍箭頭／連接線效果；字庫（bank，每張卡有 testid，點擊放入）；過關 overlay（星星動畫、成語卡、下一關／返回地圖）。錯誤／正確／提示動畫用 cats + CSS。
4. **圖鑑**：已收集成語列表＋詳情（成語、拼音、釋義、出處、sourceBook、例句）；搜尋／篩選；顯示收集進度；未收集顯示「？」。
5. **設定**：音效開關、減少動態效果（reducedMotion）、重置進度（二次確認）、版本／credit。
6. **共用**：toast、確認 modal、章節故事卡（每章第一次進入）、鍵盤 Esc／Enter 支援、focus 樣式、`aria-label`。

### 7.3 視覺風格
- 顏色：玉綠（#78a878 / #4f7a58 / #2f4a38）、櫻花粉（#f4a7bb / #e88aa8）、奶油（#fdf6ec / #fffdf8）、墨綠（#2f3a2f）、金（#e8b64c）。
- 質感：柔和圓角（16–24px）、紙張微粒、花瓣飄落、貓爪印、和風／櫻花×jjade 庭園感（參考圖片的綠底＋櫻花＋貓貓）。
- 字體：系統繁中字體 stack（`--font-main` / `--font-serif`，已在 `src/styles/index.css` 定義）；唔准外部字體。
- 佈局：mobile-first；≤600px 單欄、字卡喺底部 sticky；≥900px 可雙欄（左貓貓／提示，右棋盤）；唔好有橫向 scroll；支援 safe-area-inset。
- 動畫：尊重 `prefers-reduced-motion` 及 `ctx.save.settings.reducedMotion`；唔好有無限 heavy 動畫影響效能。
- 效能：首屏唔好 fetch 任何外部資源；bundle 保持精簡。

### 7.4 必需 testid（E2E 依賴，必須全部有）
- 首頁：`home-screen`, `home-start`, `home-continue`, `home-codex`, `home-settings`, `home-progress`
- 地圖：`map-screen`, `chapter-<chapterId>`, `level-btn-<levelId>`, `map-back`, `map-stars-total`
- 遊戲：`game-screen`, `game-back`, `game-title`, `cell-<r>-<c>`, `bank-<index>`（index = level.bank 陣列索引）, `hint-btn`, `hint-count`, `restart-btn`, `sound-btn`, `mistake-count`
- 過關：`result-overlay`, `result-stars`, `next-level-btn`, `retry-btn`, `result-map-btn`, `result-idiom-<idiomId>`
- 教學／章節故事：`tutorial-overlay`, `tutorial-ok`, `chapter-intro`, `chapter-intro-ok`
- 圖鑑：`codex-screen`, `codex-search`, `codex-item-<idiomId>`, `codex-count`, `codex-detail`
- 設定：`settings-screen`, `settings-sound`, `settings-motion`, `settings-reset`, `reset-confirm`, `reset-cancel`, `settings-back`

## 8. 貓貓角色／場景／2D 動畫契約（cat-animator）

`src/cats/catAssets.ts`：
```ts
export type CatCharacter = 'amo' | 'dango';
export type CatMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wink' | 'sleep';
export function catSVG(character: CatCharacter, mood?: CatMood, opts?: { size?: number; className?: string }): string;
```
- 回傳 inline SVG（含 class 俾 CSS 做呼吸、眨眼、搖尾、耳朵、傷心垂耳、慶祝跳起等）；唔准外部圖片。
- 兩隻貓造型要一眼分得出（阿墨黑貓＋綠圍巾；糰子橘虎斑＋粉圍巾），可愛 chibi 比例。

`src/cats/scenes.ts`：
```ts
export type SceneKey = 'garden' | 'bamboo' | 'moon' | 'snow' | 'sea' | 'stars' | 'festival' | 'rain' | 'cloud' | 'summit';
export function chapterSceneSVG(scene: string): string; // 裝飾 SVG，viewBox 約 800×450
```
10 個場景要對應章節氣氛（櫻花庭園、竹林、月夜、雪山、海邊燈塔、星空、燈會、雨巷、雲海書樓、山頂）。

`src/cats/animate.ts`：
```ts
spawnPetals(container, count?): void
burstConfetti(container): void
catMood(el, mood): void
prefersReducedMotion(): boolean
```
- `src/styles/cats.css`：所有貓貓／場景／花瓣／彩紙 keyframes；必須支援 `prefers-reduced-motion` 及 `.reduced-motion` class。
- `docs/ART_DESIGN.md`：角色設定、色票、動畫清單、場景清單、檔案結構。

## 9. 測試與 QA（qa-tester）

- 單元測試（`tests/unit/*.test.ts`，Vitest）：
  - 成語資料驗證（欄位、4 字、唯一、拼音、tier、數量 ≥ 420、連通性統計）
  - 關卡資料驗證（100 關、id/chapter 連續、cells/slots 幾何一致、chain 接龍正確、blanks 合法、bank multiset 足夠、無重複、難度趨勢）
  - 引擎測試（放字／判定正確錯誤／提示／星級／完成判定）
  - 進度存檔測試（localStorage mock：解鎖、星級保留、重置、設定）
  - 全關卡可解性模擬：對每關用解答字自動填滿 → `isSolved()` 為 true
- E2E（Playwright，`e2e/`，Node script 或 test runner 均可）：
  - 桌面（1280×800）及手機（390×844）：首頁載入、開始關卡、教學、用 `?debug=1` 讀正解並點格＋字卡完成 Level 1、過關 overlay、下一關、地圖星數、圖鑑收集、設定開關持久化、reload 後進度保留
  - 每個畫面無 console error／page error；手機版無橫向溢出
  - 截圖存 `screenshots/`（home / map / game / result / codex / settings × desktop/mobile）
- 資料／質量報告寫入 `docs/QA_REPORT.md`（測試數、通過率、剩餘 bug、效能備註）。
- 發現 bug：通知 Lead + 對應 owner（`send_message`），列明重現步驟、預期／實際；唔好自己改 src。

## 10. 協作規則

- 用共享 task board：開工前 `team_task_get` → `team_task_update(claim)`；完成後 `complete`（帶 summary）。Lead 會開定 tasks。
- 里程碑／阻塞／需要跨 scope 改動 → `send_message(target: "lead")`，內容要簡潔：做咗咩、檔案、跑咗咩指令、結果、下一步／阻塞。
- 每人只改自己 scope；**唔好** `git commit`／`git push`／`git reset`／`git checkout`（Lead 統一處理 commit）。
- 唔好加 npm 依賴、唔好改 package.json／vite config／tsconfig／wrangler。
- 唔好將 token、secrets 寫入檔案或輸出。
- 用戶介面文字用**繁體中文（香港用語）**；程式碼用英文識別名。
- 回報要簡短，唔好貼大段 code；Lead 會 review 檔案。
- 目標係盡快出**可玩、可部署**版本，再迭代 polish。

## 11. 里程碑

- **M1（開局）**：核心引擎＋型別＋placeholder 完成；idiom-scholar 首批 ≥ 150 條；game-designer 設計文件＋生成器骨架；ui-dev 首頁／地圖／路由 shell；cat-animator 首版角色 SVG。
- **M2（可玩）**：idioms ≥ 420；100 關生成＋驗證；遊戲畫面可完整玩；貓貓＋場景整合；手機版可用。
- **M3（交付）**：unit + E2E 全綠、視覺 QA、README／文件、build、commit、push、Cloudflare 自動部署、live URL 驗證。

## 12. 完成定義（DoD）

1. `npm run check`、`npm test`、`npm run build` 全過。
2. 100 關資料全部通過驗證，每關可解；難度曲線有文件記錄。
3. 桌面＋手機 E2E 全過；無 console error；手機無橫向溢出。
4. 截圖顯示貓貓風格、正確美觀、繁體中文無亂碼。
5. `README.md`（繁中）＋ design docs 齊全。
6. push 到 GitHub `main`，Cloudflare Workers Builds 部署成功，<https://chineseidiomsgame.fungkingfai.workers.dev/> 可玩。
