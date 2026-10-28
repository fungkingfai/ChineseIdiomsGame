# 部署與上線驗證（Deployment Verification）

## 部署資訊

| 項目 | 內容 |
| --- | --- |
| 線上網址 | <https://chineseidiomsgame.fungkingfai.workers.dev/> |
| GitHub | <https://github.com/fungkingfai/ChineseIdiomsGame>（`main`） |
| 部署平台 | Cloudflare Workers Static Assets（worker name: `chineseidiomsgame`） |
| 部署方式 | Push 到 `main` → Cloudflare Workers Builds 自動 `npx wrangler deploy` |
| 上線 commit | 見 GitHub `main` 最新 commit（Release v1.0.0） |
| 上線時間 | 2026-10-28（香港時間） |
| 產物 | `dist/index.html`＋`dist/assets/index-BxkCMGQ3.js`＋`dist/assets/index-DyDH7Mg3.css` |

> Workers Builds 冇獨立 build step，因此 repo 用 `npm postinstall`（`scripts/ci-build.mjs`）自動建置 `dist/`；
> 同時 repo 已 commit 最新 `dist/` 作 fallback（production-only 安裝時仍然有嘢可部署）。

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
| 7 | 下一關 → `#/game/2` | ✅ |
| 8 | 成語圖鑑載入＋已收集成語 | ✅ |
| 9 | 手機首頁（390×844） | ✅ |
| 10 | 手機無橫向溢出（首頁） | ✅ |
| 11 | 手機遊戲畫面無橫向溢出＋字庫可見 | ✅ |

- HTTP：首頁 `200`、JS asset `200`
- Console／page error：**0**
- 外部網路請求：**0**（全部同源、無外部字體／圖片／CDN）
- 截圖：`/tmp/lead-prod/`（本機驗證用，不 commit）

## 完整本地驗收（部署前）

| 項目 | 結果 |
| --- | --- |
| `npm run check` | ✅ |
| `npm test` | ✅ **62/62** |
| `npm run test:e2e` | ✅ **22/22**（desktop＋mobile） |
| `node scripts/verify-idioms.mjs` | ✅ PASS |
| `node scripts/verify-levels.mjs` | ✅ **17/17，0 警告** |
| `node scripts/qa-testids.mjs` | ✅ **43/43** |
| `npm run build` | ✅ JS 404 kB（gzip 125 kB）、CSS 75 kB（gzip 15 kB） |
| 全關卡可解性 | ✅ **100/100** 關（真引擎模擬，全部 3 星） |

## 備註

- 如需重新部署：commit＋push 到 `main` 即可；本機手動部署用 `npm run deploy`（需先 `wrangler login`）。
- 更新資料流程：`npm run verify:data` → `npm run generate:levels` → `npm run verify:data` → `npm test`。
