# 部署與上線驗證（Deployment Verification）

## 部署資訊

| 項目 | 內容 |
| --- | --- |
| 線上網址 | <https://chineseidiomsgame.fungkingfai.workers.dev/> |
| GitHub | <https://github.com/fungkingfai/ChineseIdiomsGame>（`main`） |
| 部署平台 | Cloudflare Workers Static Assets（worker name: `chineseidiomsgame`） |
| 部署方式 | Push 到 `main` → Cloudflare Workers Builds 自動 `npx wrangler deploy` |
| 目前版本 | **v1.0.1**（GitHub Issue #1：普通話拼音＋粵拼） |
| 上線 commit | 見 GitHub `main` 最新 commit |
| 產物 | `dist/index.html`＋`dist/assets/index-CnRFiox4.js`＋`dist/assets/index-CAX0hyzX.css` |

> Workers Builds 冇獨立 build step，因此 repo 用 `npm postinstall`（`scripts/ci-build.mjs`）自動建置 `dist/`；
> 同時 repo 已 commit 最新 `dist/` 作 fallback（production-only 安裝時仍然有嘢可部署）。

## v1.0.1：Issue #1（普通話拼音＋粵拼）

- 488/488 條成語新增粵拼（Jyutping，4 音節、帶聲調數字），資料驗證 PASS。
- 過關成語卡、成語圖鑑卡／詳情同時顯示普通話拼音＋粵拼；圖鑑搜尋支援粵拼（帶／無聲調）。
- 新增 2 個 testid（`result-idiom-jyutping-<idiomId>`、`codex-detail-jyutping`），E2E 斷言覆蓋。
- 粵拼方法／授權／修正清單見 [`docs/IDIOM_SOURCES.md`](IDIOM_SOURCES.md) §11；Issue 驗收見 [`docs/QA_REPORT.md`](QA_REPORT.md) §13。

## 上線後驗證（Production Smoke Test）

指令：`npm run verify:live`（`scripts/lead-live-check.mjs`，Playwright Chromium，真實 production URL）

| # | 檢查 | 結果 |
| --- | --- | --- |
| 1 | 桌面首頁載入（1280×800） | ✅ |
| 2 | 進入遊戲畫面（`#/game/1`） | ✅ |
| 3 | 章節故事＋新手教學可關閉 | ✅ |
| 4 | 由 `?debug=1` 讀正解，真實點 `cell-<r>-<c>`＋`bank-<index>` 完成 Level 1 | ✅ |
| 5 | 過關 overlay＋3 星 | ✅ |
| 6 | 過關成語卡（成語／拼音／釋義／出處） | ✅ |
| 7 | 過關成語卡粵拼（Issue #1） | ✅ |
| 8 | 下一關 → `#/game/2` | ✅ |
| 9 | 成語圖鑑載入＋已收集成語 | ✅ |
| 10 | 圖鑑詳情粵拼（Issue #1） | ✅ |
| 11 | 手機首頁（390×844） | ✅ |
| 12 | 手機無橫向溢出（首頁） | ✅ |
| 13 | 手機遊戲畫面無橫向溢出＋字庫可見 | ✅ |

- HTTP：首頁 `200`、JS／CSS assets `200`、SPA fallback `200`
- Console／page error：**0**
- 外部網路請求：**0**（全部同源、無外部字體／圖片／CDN）

## 完整驗收（部署前，v1.0.1）

| 項目 | 結果 |
| --- | --- |
| `npm run check` | ✅ |
| `npm test` | ✅ **63/63** |
| `npm run test:e2e` | ✅ **22/22**（desktop＋mobile） |
| `node scripts/verify-idioms.mjs` | ✅ PASS（粵拼 488/488；10 項 sourceBook 低風險 warning） |
| `node scripts/verify-levels.mjs` | ✅ **17/17，0 警告** |
| `node scripts/qa-testids.mjs` | ✅ **43/43**（新增 2 個粵拼 testid） |
| `npm run build` | ✅ JS 422.91 kB（gzip 132.56 kB）、CSS 76.21 kB（gzip 15.50 kB） |
| 全關卡可解性 | ✅ **100/100** 關（真引擎模擬，全部 3 星） |

## 備註

- 重新部署：commit＋push 到 `main`；本機手動部署用 `npm run deploy`（需先 `wrangler login`）。
- 更新資料流程：`npm run verify:data` → `npm run generate:levels` → `npm run verify:data` → `npm test`。
- 已知非阻塞：10 項成語 `sourceBook` 缺篇名 warning；粵語文白異讀按香港通行讀音取捨（見 IDIOM_SOURCES §11）。
