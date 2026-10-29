# 部署與上線驗證（Deployment Verification）

## 部署資訊

| 項目 | 內容 |
| --- | --- |
| 線上網址 | <https://chineseidiomsgame.fungkingfai.workers.dev/> |
| GitHub | <https://github.com/fungkingfai/ChineseIdiomsGame>（`main`） |
| 部署平台 | Cloudflare Workers Static Assets（worker name: `chineseidiomsgame`） |
| 部署方式 | Push 到 `main` → Cloudflare Workers Builds 自動 `npx wrangler deploy` |
| 目前版本 | **v1.1.0**（GitHub Issue #2：200 關進階篇、733 條成語） |
| 上線 commit | 見 GitHub `main` 最新 commit |
| 產物 | `dist/index.html`＋`dist/assets/index-CK1I9Yk6.js`＋`dist/assets/index-3Dp1kC32.css` |

> Workers Builds 冇獨立 build step，因此 repo 用 `npm postinstall`（`scripts/ci-build.mjs`）自動建置 `dist/`；
> 同時 repo 已 commit 最新 `dist/` 作 fallback（production-only 安裝時仍然有嘢可部署）。

## v1.1.0：Issue #2（加多 100 關／更多變化／更冷僻成語／加難度）

- **200 關／20 章**：基礎篇 1–10 章（100 關，完全凍結不變）＋進階篇 11–20 章（Level 101–200，10 個新場景）。
- **733 條成語**（+245，以 tier 4/5 冷僻成語為主；tier 70/110/208/200/145；粵拼 733/733；332 條可接龍、最長 12 步）。
- **進階難度**：fill 4–5 個成語、chain 6–7（105–150 k=6、155–200 k=7）、空格比例 0.60→0.72、提示 2→1、誘餌 6–10（bank ≤22）、平均 tier 4.00（tier 4/5 佔 70.2%）。
- **新場景**：藏經閣、烈焰火山、大漠孤煙、極光冰原、海底龍宮、天空之城、貓神古廟、夜航碼頭、螢火竹林、蒼穹之巔。
- 基礎篇 Level 1–100 與 v1.0.1 **逐關完全相同**（凍結回歸測試）；200 關全部唯一、全部可解。
- 文件：`docs/LEVEL_DESIGN.md` Part B／`docs/GAME_DESIGN.md` §19／`docs/QA_REPORT.md` §14。

## 上線後驗證（Production Smoke Test）

指令：`npm run verify:live`（`scripts/lead-live-check.mjs`，Playwright Chromium，真實 production URL）

| # | 檢查（基礎流程） | 結果 |
| --- | --- | --- |
| 1 | 桌面首頁載入（1280×800） | ✅ |
| 2 | 進入遊戲畫面（`#/game/1`） | ✅ |
| 3 | 章節故事＋新手教學可關閉 | ✅ |
| 4 | 真實點 `cell-<r>-<c>`＋`bank-<index>` 完成 Level 1（3 星） | ✅ |
| 5 | 過關成語卡＋普通話拼音／粵拼 | ✅ |
| 6 | 下一關 → `#/game/2` | ✅ |
| 7 | 成語圖鑑＋詳情（雙拼音） | ✅ |
| 8 | 手機首頁／遊戲畫面（390×844）無橫向溢出 | ✅ |
| 9 | 手機字庫可見 | ✅ |

| # | 檢查（Issue #2 進階篇：seed 進度到 Level 104） | 結果 |
| --- | --- | --- |
| 10 | 首頁「繼續第 105 關」 | ✅ |
| 11 | 地圖 20 章 | ✅ |
| 12 | 地圖 200 關 | ✅ |
| 13 | 第 11 章章節故事（藏經閣新場景） | ✅ |
| 14 | 完成進階 Level 101（4 成語 fill） | ✅ |
| 15 | 完成進階 chain Level 105（k=6） | ✅ |
| 16 | 成語圖鑑總數 733 條 | ✅ |

- HTTP：首頁 `200`、JS／CSS assets `200`、SPA fallback `200`
- Console／page error：**0**
- 外部網路請求：**0**（全部同源、無外部字體／圖片／CDN）

## 完整驗收（部署前，v1.1.0）

| 項目 | 結果 |
| --- | --- |
| `npm run check` | ✅ |
| `npm test` | ✅ **73/73**（新增 scenes 測試＋基礎篇凍結 baseline） |
| `npm run test:e2e` | ✅ **30/30**（desktop 15＋mobile 15） |
| `node scripts/verify-idioms.mjs` | ✅ PASS（733 條、粵拼 733/733、接龍 332／最長 12；11 項舊有 sourceBook 低風險 warning） |
| `node scripts/verify-levels.mjs` | ✅ **18/18，0 警告** |
| `node scripts/qa-testids.mjs` | ✅ **43/43** |
| `npm run build` | ✅ JS 693.85 kB（gzip 205.44 kB）、CSS 83.43 kB（gzip 16.74 kB） |
| 全關卡可解性 | ✅ **200/200** 關（真引擎模擬，全部 3 星） |
| 截圖 | ✅ 40 張（基礎＋進階篇 desktop／mobile） |

## 備註

- 重新部署：commit＋push 到 `main`；本機手動部署用 `npm run deploy`（需先 `wrangler login`）。
- 更新資料流程：`npm run verify:data` → `npm run generate:levels` → `npm run verify:data` → `npm test`。
- 已知非阻塞：11 項成語 `sourceBook` 缺篇名 warning；粵語文白異讀按香港通行讀音取捨（見 IDIOM_SOURCES §11）。
- 效能：20 章地圖場景用 IntersectionObserver 自動暫停 offscreen 動畫（手機 p95 ≈16.7ms）；bundle gzip ≈205 kB。
