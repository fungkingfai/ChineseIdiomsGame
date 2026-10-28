# 貓咪成語大冒險 🐾

> 跟住黑貓店長**阿墨**同橘虎斑小貓**糰子**，一邊穿梭櫻花庭園、竹林、月夜書齋、雪山、海邊同星空，一邊玩**成語填字**同**成語接龍**，挑戰 **100 關**，收集成語靈珠同成語圖鑑。

**貓貓風格・成語填字／接龍・100 關・繁體中文（香港）・PC＋手機**  
🌐 線上玩：<https://chineseidiomsgame.fungkingfai.workers.dev/>  
📦 原始碼：<https://github.com/fungkingfai/ChineseIdiomsGame>

> 截圖（跑完 QA 自動生成）：`screenshots/`

| 首頁 | 遊戲畫面 | 手機版 |
| --- | --- | --- |
| ![首頁](screenshots/home-desktop.png) | ![遊戲畫面](screenshots/game-desktop.png) | ![手機版首頁](screenshots/home-mobile.png) |

---

## 玩法

### 成語填字（fill）
棋盤上有 2–4 個互相交叉嘅成語，部分字留空。點一下空格，再點字庫入面嘅字卡放字。
- 當一個成語填滿，遊戲會**自動判定**：
  - ✅ 正確 → 成語鎖定，貓貓開心、音效慶祝；
  - ❌ 錯誤 → 成語震動、清空呢個成語嘅字、貓貓傷心（記一次錯誤）。
- 卡住可以按「提示」，隨機揭示一個字（會影響星級）。
- 全部成語完成 → 過關，按錯誤／提示次數獲 1–3 星。

### 成語接龍（chain）
每 5 關（第 15、20、25……100 關）會玩接龍：3–6 個成語首尾相接（上一個成語尾字＝下一個成語首字），保留連接字，其餘留空，同樣由字庫揀字填滿。

### 進度與收集
- 100 關／10 章，難度隨章節上升：成語更多、空格更多、提示更少、誘餌字更多。
- 自動儲存進度（localStorage），重玩取最高星。
- 過關成語自動收入**成語圖鑑**：可搜尋、睇**普通話拼音＋粵拼（廣東話）**、釋義、出處（sourceBook）同例句。
- 首次進入第 1 關有新手教學；每章第一次進入有貓貓章節故事。

### 章節
| 章 | 場景 | 主題 |
| --- | --- | --- |
| 1 | 櫻花小徑 | 春日櫻花下，成語私塾開課 |
| 2 | 竹林迷宮 | 風吹竹葉，靜心接句 |
| 3 | 月下書齋 | 月光翻書，靈珠閃亮 |
| 4 | 雪山溫泉 | 雪山石碑，細看每一筆 |
| 5 | 海邊燈塔 | 燈塔照路，成語指路 |
| 6 | 星空詩會 | 星星排成成語詩句 |
| 7 | 燈會市集 | 猜燈謎，成語最受歡迎 |
| 8 | 雨後石巷 | 雨後青苔，慢慢浸出成語 |
| 9 | 雲端書樓 | 雲海書樓，溫習所學 |
| 10 | 成語之巔 | 頂峰最後考驗 |

---

## 畫面

（跑完 QA 後補上 `docs/screenshots/` 截圖）

- **首頁**：阿墨＋糰子 hero、櫻花花瓣、繼續冒險、圖鑑、設定。
- **關卡地圖**：10 章卡片（場景插畫＋星星進度）、100 個關卡腳印、自動定位當前章。
- **遊戲**：棋盤＋字庫（手機 sticky bottom）、提示、重玩、音效；逐成語判定動畫。
- **過關**：星星動畫、成語卡（成語／普通話拼音／粵拼／釋義／出處）、下一關。
- **成語圖鑑**：收集進度、搜尋、成語詳情。
- **設定**：音效、減少動態效果、重置進度。

---

## 技術

- **Vite 8 + TypeScript（strict）+ 原生 DOM**（無 UI 框架、零 runtime 依賴）。
- **Vitest** 單元測試＋資料驗證；**Playwright** 桌面／手機 E2E＋截圖。
- **Cloudflare Workers** 靜態資產部署（`wrangler.jsonc`，SPA fallback）。
- 所有美術（貓貓角色、10 個章節場景、花瓣／彩紙）都係**原創 inline SVG＋CSS 動畫**，無外部圖片、字體或網路請求。
- 音效用 **WebAudio** 即時合成（無音檔）。

### 專案結構
```
src/
  main.ts            # bootstrap：載入資料、存檔、AppContext、debug 資料
  app.ts             # hash router + App shell
  router.ts
  screens/           # home / map / game / codex / settings
  ui/                # 共用元件（棋盤、字庫、modal、星星…）
  styles/            # 主題、畫面、動畫（cats.css 由美術模組提供）
  cats/              # 貓貓角色 SVG、10 章場景、2D 動畫小工具
  core/
    types.ts         # 全站型別契約
    puzzle.ts        # 填字／接龍引擎（判定、提示、星級）
    progress.ts      # localStorage 存檔（星級、解鎖、圖鑑、設定）
    audio.ts         # WebAudio 音效合成
    context.ts       # AppContext
  data/
    idioms.json      # 成語資料庫（含普通話拼音、粵拼、釋義、出處）
    chapters.json    # 10 章設定
    levels.json      # 100 關（由生成器產生）
    index.ts         # 資料存取 API
scripts/
  generate-levels.mjs  # deterministic 關卡生成器
  verify-idioms.mjs    # 成語資料驗證
  verify-levels.mjs    # 關卡資料驗證
  ci-build.mjs         # Cloudflare Workers Builds 兼容 build
tests/ e2e/            # Vitest 單元測試 / Playwright E2E
docs/                  # 設計文件、QA 報告、截圖
```

### 本機開發
```bash
npm install
npm run dev        # http://localhost:5280
npm run check      # TypeScript 檢查
npm test           # Vitest
npm run build      # 產出 dist/
npm run preview    # http://localhost:4280
npm run test:e2e   # Playwright E2E（桌面＋手機）
```

### 資料更新
```bash
npm run verify:data             # 成語＋關卡資料一次過驗證
npm run generate:levels         # 由 idioms + chapters 重新生成 100 關
```

### 測試與品質（最新結果）

| 項目 | 結果 |
| --- | --- |
| `npm run check`（TypeScript strict） | ✅ |
| `npm test`（Vitest：成語／關卡資料、引擎、存檔） | ✅ **63 / 63** |
| `node scripts/verify-levels.mjs`（獨立關卡驗證） | ✅ **17 / 17，0 警告** |
| `node scripts/verify-idioms.mjs`（成語契約） | ✅ PASS |
| `node scripts/qa-testids.mjs`（testid 契約） | ✅ **43 / 43**（新增 2 個粵拼 testid） |
| `npm run test:e2e`（Playwright 桌面＋手機） | ✅ **22 / 22 步驟**，全程 0 console error |
| 全關卡可解性模擬 | ✅ **100 / 100 關**（真引擎填正解全部 3 星） |

詳見 [`docs/QA_REPORT.md`](docs/QA_REPORT.md)、[`docs/TEST_PLAN.md`](docs/TEST_PLAN.md)。

---

## 部署（Cloudflare Workers Builds）

Repo 已連接 Cloudflare Workers Builds：push 到 `main` 後自動執行 `npx wrangler deploy`。
Workers Builds 冇獨立 build step，因此：

- `npm postinstall` 會執行 `scripts/ci-build.mjs` 自動 `npm run build`；
- 若 CI 只安裝 production dependencies（build 失敗），會沿用 repo 內已 commit 嘅 `dist/` 作 fallback；
- worker 名稱：`chineseidiomsgame`，網址：<https://chineseidiomsgame.fungkingfai.workers.dev/>。

手動部署（已登入 wrangler 時）：`npm run deploy`。

---

## 成語資料與出處

- 成語資料庫收錄 **488 條**成語：每條均有**普通話拼音（漢語拼音）＋粵拼（Jyutping）**、繁中釋義、出處（sourceBook＋原文典故）、難度分級（tier 1–5）及分類標籤。
- 接龍資料：**174 條**成語可與其他成語首尾相接，共 578 條接龍連結，最長可接 37 步；常用連接字（一、不、人、心、天、金、玉、正、堂…）齊備。
- **粵拼（廣東話）**：以 CanCLID [to-jyutping](https://github.com/CanCLID/to-jyutping)（基於 [rime-cantonese](https://github.com/rime/rime-cantonese)，CC BY 4.0）自動標註作基線，再經逐條人手校對；詳見 [`docs/IDIOM_SOURCES.md`](docs/IDIOM_SOURCES.md)。
- 出處以**古典典籍原文**（《史記》《戰國策》《韓非子》《呂氏春秋》《孫子兵法》《世說新語》等）為主；開發時以漢典、教育部成語典、ctext、維基文庫等 **84 條逐條上網核對**（詳見 [`docs/IDIOM_SOURCES.md`](docs/IDIOM_SOURCES.md)）。
- 開發時亦參考坊間常用成語辭書（《成語辭海》《漢語成語源流大詞典》《漢語成語大詞典》《中國成語大辭典》《商務成語大詞典》《遠流活用成語辭典》）作對照；本專案唔會複製辭書內文。
- 部分成語有多種出處說法，已盡量採用學界常見版本；如有錯漏，歡迎開 GitHub issue 指正。

## 團隊

本專案由 **DeepSeek Harness Agent Team** 開發：
- **Lead**：整合、核心引擎、建置、部署
- **idiom-scholar**：成語資料庫、出處考證
- **game-designer**：玩法、關卡設計、100 關生成器
- **ui-dev**：PC／手機介面設計與實作
- **cat-animator**：貓貓角色、場景、2D 動畫
- **qa-tester**：單元測試、資料驗證、E2E、視覺 QA

詳細規劃見 [`docs/PLAN.md`](docs/PLAN.md)。

## 更新紀錄

### v1.0.1（2026-10-28）
- 🗣️ 處理 GitHub Issue #1：成語同時提供**普通話拼音**與**粵拼（廣東話 Jyutping）**；過關成語卡、成語圖鑑及搜尋均支援兩種拼音。
- 488 條成語全部加上粵拼，加入驗證腳本檢查、E2E 迴歸及文件。

### v1.0.0（2026-10-28）
- 首次上線：100 關、10 章、488 條成語、貓貓角色／場景／2D 動畫、PC＋手機介面。

## License

[MIT](LICENSE)
