# 《貓咪成語大冒險》— UI / UX 設計文件

> 擁有者：ui-dev。實作範圍：`src/app.ts`、`src/router.ts`、`src/screens/**`、`src/ui/**`、`src/styles/**`（`cats.css` 除外）。
> 對應契約：`docs/PLAN.md` §6（core API）、§7（UI/UX 契約）、§7.4（必需 testid）。
> 最後更新：ui-dev（2026-10-29，v1.0.1 雙拼音）。狀態：**全部畫面已實作並通過 Playwright 本機驗證（100 關／488 成語）**；Issue #1 加入普通話拼音＋粵拼（Jyutping）顯示與搜尋。

---

## 1. 設計方向

| 項目 | 決定 |
| --- | --- |
| 世界觀 | 店長貓「阿墨」（黑貓、綠圍巾、冷靜博學）＋小貓「糰子」（橘虎斑、粉圍巾、好動好奇），喺和風櫻花×玉綠庭園收集成語靈珠。 |
| 語氣 | 親切貓貓語氣、香港用語（「喵」、「唔該」、「一齊」、「過關喇」），唔用簡體字。 |
| 視覺關鍵詞 | 玉綠庭園、櫻花粉、奶油紙感、柔和圓角、貓爪印、櫻花花瓣、金色星星、手繪卡片感。 |
| 排版 | Mobile-first；字體只用系統繁中 stack（`--font-main`／`--font-serif`），唔載入外部字體、唔 fetch 外部資源（貓貓／場景 SVG 由 `src/cats/**` inline 提供）。 |
| 動畫原則 | 短（120–600ms）、有目的（回饋／引導），尊重 `prefers-reduced-motion` 同 `ctx.save.settings.reducedMotion`。 |
| 資料驅動 | **唔 hardcode 關卡數／成語內容**：所有畫面由 `ctx.levels`（100 關，含 fill／chain）＋`ctx.chapters`（10 章）＋`ctx.idioms`（488 條，含 `pinyin` 普通話拼音＋`cantonese` 粵拼）動態產生；棋盤 cell size 會依 `level.rows/cols` 自動收縮（最大 7×7），任何關卡都唔會爆 layout。 |

### 1.1 Color tokens（`src/styles/tokens.css`）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--jade` | `#78a878` | 主要品牌綠、按鈕、進度 |
| `--jade-dark` | `#4f7a58` | 按鈕深色漸層、hover |
| `--jade-deep` | `#2f4a38` | 標題、主要文字強調 |
| `--pink` | `#f4a7bb` | 櫻花、highlight、當前關卡 |
| `--pink-deep` | `#e88aa8` | 櫻花深色、錯誤次要色 |
| `--pink-deeper` | `#cf6f8e` | 粉紅 CTA／文字（對比度用） |
| `--cream` | `#fdf6ec` | 頁面底色 |
| `--cream-2` | `#f7e9df` | 卡背、分隔、disabled |
| `--card` | `#fffdf8` | 卡片／棋盤格白 |
| `--ink` | `#2f3a2f` | 正文墨綠 |
| `--gold` | `#e8b64c` | 星星、提示、成就 |
| `--jade-tint` / `--pink-tint` / `--gold-tint` | 淺色底 | 選中、鎖定成語、提示格底色 |

紙感：`body` 用多層 radial-gradient（右上玉綠光、左下櫻花粉光）＋極細點狀 grain（`.app-bg::after`）；卡片加內高光 `inset 0 1px 0 #fff`。

### 1.2 Typography

- 標題：`--font-serif`，字距 `0.04–0.12em`，`clamp()` 響應式大細。
- 內文：`--font-main`，`1rem`／行高 1.7；輔助字 `0.72–0.86rem`。
- 漢字（棋盤／字卡／成語）：`--font-serif`，字重 600，`letter-spacing: 0.06–0.12em`。
- 數字（星數、提示、錯誤）：`font-variant-numeric: tabular-nums`。

---

## 2. 資訊架構與畫面流程

```
                    ┌──────────────┐
                    │  #/home 首頁  │
                    └──────┬───────┘
     開始冒險 ┌─────────────┼──────────────┐ 圖鑑        ┌──────────┐
              ▼             │              ├────────────▶│ #/codex  │
        ┌──────────┐        │ 繼續第 N 關   │             └────┬─────┘
        │ #/map 地圖│        ▼              │ 設定             ▼
        └────┬─────┘  ┌──────────────┐     └──────────▶┌────────────┐
             │        │ #/game/<id>  │                  │ #/settings │
             │        └──────┬───────┘                  └────────────┘
             │ 點關卡（已解鎖）│
             └──────────────▶│
                             │ 首次入本章 → chapter-intro overlay
                             │ 首次入 Level 1 → tutorial overlay
                             │ 過關 → result overlay
                             ▼
                  ┌──────────────────────┐
                  │ 下一關 / 重玩 / 地圖  │
                  └──────────────────────┘
```

### 2.1 路由表（hash router，`src/router.ts`）

| hash | 畫面 | 備註 |
| --- | --- | --- |
| `#/home`（或空 hash） | 首頁 | 預設；未知路由一律 fallback 呢度 |
| `#/map` | 關卡地圖 | 自動捲到當前章 |
| `#/game/<id>` | 遊戲 | 驗證關卡存在＋已解鎖；否則 toast＋`replaceRoute('#/map')` |
| `#/codex` | 成語圖鑑 | |
| `#/settings` | 設定 | |

- `parseRoute()` 純函數；`Router` 監聽 `hashchange`，每次切換先 `closeAllOverlays()`＋`clearToasts()`＋`screen.destroy()`＋清空 screen root，再 mount 新 screen。
- 導航保留 `?debug=1` query（hash 切換唔影響 query）。
- 每個畫面更新 `document.title`（例：`第一課：花下尋字 · 貓咪成語大冒險`）。
- 未知路由／`#/game/999`（唔存在）／未解鎖關卡：showToast 提示後轉 `#/map`。

### 2.2 頁面狀態機（遊戲）

```
enter game
  │
  ├─ chapter not seen? ──▶ chapter-intro overlay ──(出發)──▶ markChapterSeen
  ├─ level 1 && !tutorialSeen? ──▶ tutorial overlay ──(明白)──▶ markTutorialSeen
  ▼
PLAYING（可放字／退字／提示／重玩）
  │ 每個成語填滿自動判定（引擎）
  ├─ word-correct ──▶ 鎖定格＋綠＋音效＋貓貓開心＋toast
  ├─ word-wrong ──▶ 震動＋清空格＋字卡返字庫＋mistakes+1＋貓貓傷心
  ├─ hint ──▶ 揭示一格（鎖定）＋hintLimit-1＋對應字卡標記已用
  └─ solved ──▶ recordLevelClear（自動 collectIdioms＋save）→ result overlay
                 → 下一關 / 重玩 / 返回地圖
```

> 註：core/puzzle 會將 `blanks.length === 0` 嘅成語（例如 chain 第一行全顯示）一開始就標記 `locked`；UI 會當佢係已完成成語顯示（綠色 + ✓）。

---

## 3. Wireframe 描述

### 3.1 首頁（`#/home`，testid `home-screen`）

**手機（≤600px，390×844 基準）**
```
┌──────────────────────────────┐
│ ╭ 櫻花庭園場景（chapterSceneSVG garden）╮│
│ │  🌸 花瓣 layer（spawnPetals）          ││
│ │  ╭────────╮   ╭────────╮             ││
│ │  │ 阿墨 SVG │   │糰子 wink│             ││
│ │  ╰────────╯   ╰────────╯             ││
│ │  「喵～歡迎嚟到…」bubble                ││
│ ╰──────────────────────────────╯│
│  喵～歡迎嚟到（kicker）           │
│  貓咪成語大冒險（serif 大標題，粉紅強調）│
│  跟住阿墨同糰子，收集百關成語……       │
│  ⭐ 已過 0/100 關   冒險進度 bar      │ ← home-progress
│  總星數 0 / 300     下一站 第 1 關    │
│  ┌────────────────────────┐  │
│  │  🐾 開始第 1 關（粉紅 CTA）│  │ ← home-continue
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  🗺 開始冒險            │  │ ← home-start（→ 地圖）
│  └────────────────────────┘  │
│  [📖 成語圖鑑]  [⚙ 設定]      │ ← home-codex / home-settings
│  v1.0.1 · 貓貓製作 · 100% 離線可玩 │
└──────────────────────────────┘
```
**桌面（≥900px）**：hero 左（garden 場景卡 560px 高）／資訊面板右，內容 max-width 1120px。

- hero 貓貓：`catSVG('amo','happy')` 大、`catSVG('dango','wink')` 細並微微重疊；`spawnPetals(hero, 12)`（reduced motion 時跳過）。
- `home-progress`：總星數／總關數／已過關數／下一關＋進度條（`totalStars / (TOTAL_LEVELS*3)`）。
- `home-continue` 文字：有進度 → `繼續第 N 關`，新玩家 → `開始第 1 關`；→ 直接入 `#/game/<nextPlayableLevel>`。
- `home-start` 固定「開始冒險」→ `#/map`。

### 3.2 地圖（`#/map`，testid `map-screen`）

```
┌──────────────────────────────────┐
│ ← map-back │ 成語地圖 │ ★ 0/300 map-stars-total │
├──────────────────────────────────┤
│ 十個和風場景、100 個關卡……（動態）  │
│ ╔══════════════════════════════╗ │
│ ║ [chapterSceneSVG 16:9 縮圖]  ║ │
│ ║ 第 1 章 · 櫻花小徑   ★ 0/30  ║ │ ← chapter-1
│ ║ blurb……                       ║ │
│ ║ ①🐾 ②🔒 ③🔒 ④🔒 ⑤🔒         ║ │ ← level-btn-<id>
│ ║ ⑥🔒 ⑦🔒 ⑧🔒 ⑨🔒 ⑩🔒         ║ │
│ ╚══════════════════════════════╝ │
│ ╔══════════════════════════════╗ │
│ ║ 第 2 章 · 竹林迷宮（鎖定）    ║ │
│ ╚══════════════════════════════╝ │
└──────────────────────────────────┘
```
- 每章一張 `chapter-<id>` 卡：場景 SVG、章號、章名、章內星數、blurb、該章所有關卡按鈕（由 `ctx.levels` 分組，現時每章 10 關）。
- 關卡狀態：`已過關`（玉綠底＋★★☆）、`當前關`（櫻花粉光圈 pulse＋貓爪）、`未解鎖`（奶油灰＋鎖頭）。未解鎖關卡仍存在 DOM 並可點（顯示 toast），唔用 `disabled`。
- 載入後 `scrollIntoView` 到當前章（reduced motion 時即時跳）。
- 桌面 ≥900px：章節卡兩欄；第一章跨兩欄，10 個關卡同一行。

### 3.3 遊戲（`#/game/<id>`，testid `game-screen`）

**手機**
```
┌──────────────────────────────────┐
│ ←  game-title（可摺 2 行）  💡3 ↻ 🔊 0 │ ← HUD sticky top
├──────────────────────────────────┤
│ ╭ 糰子 SVG ╮ 「我哋一齊搵晒…」        │ ← cat bubble（互動回饋）
│ 成語小劇場：level.story（narration）   │
│ 成語 ▢▢▢▢  ▢▢▢▢（解鎖後顯示成語+✓）   │
├──────────────────────────────────┤
│        第 1 章 · 櫻花小徑           │
│   ┌───┬───┬───┬───┐              │
│   │畫 │蛇 │添 │足 │  棋盤（cell）   │
│   ├───┼───┼───┼───┤              │
│   │龍 │   │   │   │              │
│   └───┴───┴───┴───┘              │
├──────────────────────────────────┤
│ 字庫（sticky bottom，safe-area）    │
│ [蛇][添][足][龍][點][睛]  bank-<index>│
└──────────────────────────────────┘
```
**桌面 ≥900px**：兩欄 `aside 336px | main`：
- 左：貓貓對話框、story、成語進度 chip。
- 右：棋盤面板（fit-content 置中）＋字庫（非 sticky）。

**HUD**
- `game-back`（← 返回地圖）、`game-title`（關卡 title；上方細字「第 N 章 · 章名」）。
- `hint-btn` 內 `hint-count` = 剩餘提示數（`hintLimit - hintsUsed`）；用完變灰＋toast。
- `restart-btn`（即時重開本關）、`sound-btn`（`aria-pressed`＋icon 切換寫入存檔）、`mistake-count`（純數字，出錯時彈跳）。
- 手機（≤600px）：隱藏章節細字、標題可 2 行、icon 掣縮到 40px；所有 testid 保留。

**棋盤 cell 狀態**

| 狀態 | class | 外觀 |
| --- | --- | --- |
| given 字 | `.cell--given` | 玉綠 tint 底、墨綠字、不可編輯 |
| 空格 | `.cell--blank` | 白底＋虛線玉綠邊＋淡貓爪印 |
| 選中 | `.cell--selected` | 櫻花粉光圈＋輕微升起＋虛線外框 |
| 已放入（玩家） | `.cell--filled` | 白底墨綠字、粉邊 |
| 提示字 | `.cell--hint` | 金色底＋✦ 閃光、鎖定、不可退 |
| 成語正確鎖定 | `.cell--word-locked` | 玉綠漸層＋白字＋金 ✓ 角標＋彈跳 |
| 錯誤震動 | `.cell--shake`（暫態 520ms） | 左右震動＋粉紅閃 |
| chain 共用字 | `.cell--chain-shared` | 粉色 connector 關係；given／已鎖定用金色底線highlight |

**chain（接龍）關卡**：逐行直向排列（每行 4 格），行與行之間有「↓ + 共用字泡泡」connector（`.chain-join`），每行首尾共用字加高亮；已鎖定行顯示成語詞。共用字由 `level.cells` 實際字讀取，唔靠猜。

**字卡 bank 狀態**：`data-testid="bank-<index>"`（index = `level.bank` 索引，**永遠存在**，包含已用卡）；未用＝奶油卡＋玉綠邊＋微旋轉；已用＝淡化＋✓ 印章；**唔用 `disabled`/`aria-disabled`**，click 已用卡只會輕搖，唔會放字，保持自動化穩定。
- 點已填但未鎖定格 → `removeChar` 回傳 bankIndex，字卡即時回可用。
- `word-wrong` 清空格 → 用 `cellBank` map 搵返被清格用過嘅 bankIndex，逐張放回字庫。
- `useHint().bankIndex ≥ 0` → 標記該卡已用（core 亦會記入 cell）。

**互動規則（實作摘要）**
1. 點空格 → 選中；點字卡 → 放入，字卡變已用，自動選中同一成語下一個未填空格（連續放字順手）。
2. 再點同一格**保持選中**（唔會 toggle 熄；避免放錯位）。
3. 點已填入未鎖定格 → 退字回字庫。
4. 冇選格時點字卡 → 自動放入第一個未填空格（鍵盤／單手友善）。
5. 點鎖定／given 格 → no-op（唔會 disabled，方便自動化）。
6. 提示：`useHint` 隨機揭示一格、扣次數、標記字卡、提示字鎖定；若提示令成語完成，照樣觸發 word-correct/wrong 流程。
7. 重玩：state 重設，HUD／貓貓／棋盤／字庫全部 refresh。
8. 棋盤自適應：`board.ts` 用 `ResizeObserver` 依 `.board-panel` 可用闊度收縮 `--cell`（下限 30px；桌面再依 viewport 高度收縮），支援最多 7 欄 × 7 列／8 行嘅關卡；390px／320px 都唔會橫向溢出。

### 3.4 過關 overlay（testid `result-overlay`）

```
╔══════════════════════════════════╗
║   ✦ 關卡完成 ✦                    ║
║   第一課：花下尋字                 ║
║        ★ ★ ★   （逐粒彈出）       ║ ← result-stars（data-stars）
║   獲得 3 星 · 錯誤 0 次 · 提示 0 次 ║
║   本關 3 個成語已收入圖鑑           ║
║          🐱 celebrate              ║
║   ┌─ 成語卡：愚公移山（可捲動區）─┐ ║
║   │ yú gōng yí shān                │ ║ ← result-idiom-<idiomId>
║   │ 釋義／出處／典籍／tags + 新收集 │ ║
║   └────────────────────────────────┘ ║
║  [下一關 →]  [再玩一次]  [返回地圖]  ║ ← next-level-btn / retry-btn / result-map-btn
╚══════════════════════════════════╝
```
- Panel 用 flex column：head（星星／統計）固定、成語列表可捲、按鈕永遠可見（唔會被推到 fold 以下）。
- 背景 backdrop blur＋半透明墨綠；彩紙 `burstConfetti`（reduced motion 時停用）。
- 星星逐粒 delay 0.1s、`star-pop`＋`audio.play('star')`；入 overlay 前清走遊戲期間 toast；`fanfare()`。
- 成語卡顯示 word／**普通話拼音（「普」徽章）＋粵拼（「粵」徽章）**／meaning／origin／sourceBook／tags，新收集有「新收集」徽章；粵拼元素 `data-testid="result-idiom-jyutping-<idiomId>"`，資料未有 `cantonese` 時整行唔顯示。
- 最後一關：`next-level-btn` 文字變「全部完成！返回地圖」，仍存在並導航地圖。
- 過關即 `recordLevelClear(ctx.save, ...)`＋`ctx.persist()`，圖鑑自動更新（重玩取最高星）。

### 3.5 教學 overlay（`tutorial-overlay`）／章節故事（`chapter-intro`）

- 教學：阿墨＋糰子 SVG、3 個步驟（點空格→字卡／自動判定／提示），`tutorial-ok` 關閉並 `markTutorialSeen`。首次入 Level 1 時出現。
- 章節故事：`chapterSceneSVG(chapter.scene)` 場景大圖（flush panel）、`第 N 章 · 章名`、blurb、糰子＋level.story 對話卡、`chapter-intro-ok` 出發；每章第一次入關卡時出現，`markChapterSeen`。
- 兩者都係 modal（不可 Esc／backdrop 關，必須按掣），順序：chapter-intro → tutorial。

### 3.6 圖鑑（`#/codex`，testid `codex-screen`）

```
┌──────────────────────────────────┐
│ ← │ 成語圖鑑 │ 📖 收集            │
│ [🔍 搵成語、拼音或意思……      ]   │ ← codex-search
│ [全部] [已收集] [未收集]           │
│ 已收集 2 / 172 條成語     進度 bar │ ← codex-count
│ ┌───────┐ ┌───────┐ ┌───────┐   │
│ │愚公移山│ │葉公好龍│ │ ？？？？│   │ ← codex-item-<idiomId>
│ │yú…    │ │yè…    │ │ 過關後解鎖│  │
│ └───────┘ └───────┘ └───────┘   │
└──────────────────────────────────┘
```
- 收集進度：`已收集 X / Y 條`（`codex-count`）＋進度條。
- **已收集成語排最前**；卡片：已收集 = 成語＋普通話拼音＋細字粵拼（「粵」徽章，空間許可）＋釋義摘要＋tier 點＋tag，點擊開詳情；未收集 = 「？？？？」＋鎖頭，點擊 toast「過關就會收集到呢個成語喵～」。
- `codex-search` 即時過濾（成語／普通話拼音／粵拼／釋義／tags；未收集只用成語／拼音／粵拼比對，唔劇透）；**拼音唔使打聲調**（`normalizeSearch` 做 NFD 去調，`yu gong` 都搵到「愚公移山」）；**粵拼聲調數字可有可無**（`normalizeJyutping` 去 1–6 同空格：`jat1 nok6`／`jat nok`／`jat1nok6` 都搵到）；無結果顯示貓貓空狀態，同時清空 grid 舊 DOM（避免 stale nodes）。
- 詳情 modal `codex-detail`：成語、**普通話拼音（「普」）＋粵拼（「粵」，`data-testid="codex-detail-jyutping"`）**、釋義、出處＋典籍、例句、tags、難度；Esc／backdrop／「知道喇喵」可關。
- 桌面 ≥900px 4 欄；600–899px 3 欄；手機 2 欄。

### 3.7 設定（`#/settings`，testid `settings-screen`）

```
┌──────────────────────────────────┐
│ ← settings-back │ 設定            │
│ ┌ 音效            [開 ●───] ┐    │ ← settings-sound（checkbox）
│ │ 貓貓叫聲、放字、過關音樂    │    │
│ │ 減少動態效果      [關 ───●] │    │ ← settings-motion
│ │ 關閉花瓣、彈跳、彩紙動畫    │    │
│ │ 重置進度          [重置]   │    │ ← settings-reset → confirm modal
│ └────────────────────────────┘    │
│ 關於貓貓：阿墨＋糰子、v1.0.1、離線可玩 │
└──────────────────────────────────┘
```
- 開關即時生效＋寫入存檔；音效同步 `audio.setEnabled`；減少動態同步 `html.reduced-motion` class。
- 重置：`settings-reset` → confirm modal（`reset-confirm` / `reset-cancel`，Esc／backdrop 可取消）；確認後 `resetProgress()` 清 localStorage、覆寫 `ctx.save` 內容、重設 audio/motion、更新開關狀態、toast；停留設定頁。
- 版本／credit 卡：v1.0.1、角色 credit、「所有資料同音效都喺你部機度產生」。

### 3.8 共用元件（`src/ui/**`）

| 檔案 | 元件／職責 |
| --- | --- |
| `dom.ts` | `el()` 建 DOM、`fromHtml()`、`esc()`、`qs/qsa/on()`、`TimerBag`（screen destroy 時清 timer）、`normalizeSearch`（拼音去聲調）、`normalizeJyutping`（粵拼去聲調數字／空格） |
| `icons.ts` | inline SVG icon set（back／hint／restart／sound／star／lock／close／paw…）；全部自帶 `width="1em" height="1em"`，任何 inline 位置都唔會撐爆 layout |
| `buttons.ts` | `btnHtml` / `iconBtnHtml` 工廠（variant、size、testId、aria-label） |
| `stars.ts` | `starsHtml`、`resultStarsHtml`（`data-testid=result-stars`＋`data-stars`）、`starGlyphs` |
| `progress.ts` | `progressHtml`（role=progressbar＋aria-valuenow） |
| `modal.ts` | overlay stack、focus trap、Esc、backdrop、scroll lock、`confirmDialog`、`closeAllOverlays` |
| `toast.ts` | `showToast`（role=status aria-live=polite，最多 3 個）＋`clearToasts`（轉畫面／開過關 overlay 時清） |
| `idiomCard.ts` | 成語卡（word／普通話拼音+粵拼雙行（「普」「粵」徽章）／meaning／origin／sourceBook／example／tags／新收集章）；`jyutpingOf()` 安全讀 cantonese（fallback undefined） |
| `catBubble.ts` | 貓貓對話框（角色＋mood＋對白） |
| `board.ts` | 棋盤 view（fill grid／chain 逐行）、cell 狀態、震動／閃光；只用 `render(g, selected)` 重畫 |
| `bank.ts` | 字庫 grid、每張卡固定 testid、使用狀態同步、已用卡輕搖 |
| `prefs.ts` | 音效開關、reduced-motion 判斷／套用、`playSfx`、scroll behavior |

---

## 4. 響應式斷點

| 斷點 | 佈局 | 其他 |
| --- | --- | --- |
| 基準（≤599px） | 單欄；`--gutter: 16px`；HUD sticky top、字庫 sticky bottom（grid item sticky，內容再長都釘住）；safe-area padding | cell `clamp(52px, 16.6vw, 74px)`；390px 4 欄棋盤 285px；320px 亦無橫向溢出 |
| 600–899px（平板） | 單欄加闊（max 720–900px）；首頁 hero／面板並排；地圖 2 欄區塊；字庫非 sticky | cell 60–78px |
| ≥900px（桌面） | 遊戲雙欄（aside 336px＋棋盤）；首頁雙欄；地圖章節 2 欄（第一章全寬）；圖鑑 4 欄；內容 max-width 1120px | cell 78–82px；HUD 顯示章節細字 |
| 細機（≤380px） | HUD 更精簡、隱藏底部操作提示行 | 地圖/圖鑑仍 2 欄 |
| 矮螢幕（height ≤560 & 手機） | 貓貓縮細、story 隱藏、word chip 縮細 | 保持所有 testid |

- 所有 screen：`width:100%; max-width; margin-inline:auto; padding-inline: var(--gutter)`；`.app` `overflow-x:hidden`。
- HUD `position: sticky; top: 0`＋safe-area top；字庫 `.game__bank-zone` `position: sticky; bottom: 0`（desktop 重設 static）。
- 直向 390×844、320×720、鏈 3–6 行、11 張字卡都實測無橫向溢出。

---

## 5. 動態效果清單

| 效果 | 位置 | 時長／曲線 | reduced motion |
| --- | --- | --- | --- |
| 櫻花花瓣飄落 | 首頁 hero | 8–16s infinite（cats.css） | 停用（`spawnPetals` + CSS） |
| 貓貓呼吸／眨眼／搖尾 | `cats.css`（cat-animator） | 2–4s infinite | cats.css 停用 |
| 貓貓 mood 轉換 | 遊戲／首頁 | SVG 重繪＋class transition | 只換表情 |
| Cell 放入／選中 | 棋盤 | 140–200ms scale／ring | opacity 即時 |
| 成語正確鎖定 | 棋盤 cells | 440ms 綠閃＋彈跳 | 淨變色 |
| 成語錯誤震動 | 棋盤 cells | 460ms shake | 淨變粉紅邊 |
| 提示字閃光 | cell | 640ms gold flash＋✦ | 淨變金底 |
| 星星逐粒彈出 | result overlay | 420ms ×3，delay 0.1/0.2s | 全部即時顯示 |
| 彩紙 | result overlay | 2.4s 後移除 | 停用 |
| 按鈕 hover／press | 全站 | 140–200ms ease | 只變色 |
| 畫面進場 | 每次路由 | 360ms fade-up | 即時 |
| 當前關卡 pulse | 地圖 | 2.6s 低頻 | 停用 |

`prefers-reduced-motion: reduce` 或 `html.reduced-motion` 時：CSS animation／transition 縮到 0.001ms、`scroll-behavior:auto`；JS 花瓣／彩紙／平滑捲動由 `prefs.effectiveReducedMotion()` 跳過。設定頁 toggle 會即時加／移除 `html.reduced-motion`。

---

## 6. 無障礙（a11y）

- 語意：每畫面一個 `<main>`；`<header>` topbar／HUD；標題層級 h1→h2/h3；所有互動用 `<button>`／`<input>`。
- 鍵盤：所有按鈕可 Tab、Enter／Space 觸發；modal focus trap、開時 focus 第一個可聚焦元素（破壞性 confirm 預設 focus 取消）、關時還原 focus；Esc 關 dismissible overlay／遊戲內返回地圖；skip-link 跳去 main；用 `:focus-visible` 金色 3px outline。
- ARIA：icon-only 掣有 `aria-label`；音效 `aria-pressed`；設定用原生 checkbox＋label；overlay `role=dialog aria-modal=true aria-label`；toast `role=status aria-live=polite`；棋盤 `role=group aria-label`；cell `aria-label="第 r 行第 c 格：字／空格（已鎖定）"`；字卡 `aria-label="字卡「字」（已使用）"`；裝飾 SVG `aria-hidden`；progressbar 有 aria-valuenow。
- 對比：正文墨綠 on 奶油 ≥10:1；玉綠按鈕用 `--jade-dark` 底白字 ≥4.5:1；唔靠顏色單獨傳達狀態（✓、鎖頭、文字）。
- 觸控目標 ≥44×44px（cell、字卡、關卡掣）；字卡字級 ≥1.24rem。

---

## 7. Testid 對照表（PLAN §7.4，全部實作並經 Playwright 檢查）

| 畫面 | testid | 元素 | 備註 |
| --- | --- | --- | --- |
| 首頁 | `home-screen` | `<main>` | |
| | `home-start` | 開始冒險按鈕 | → `#/map` |
| | `home-continue` | 開始／繼續第 N 關 | → `#/game/<nextPlayableLevel>`；永遠存在 |
| | `home-codex` / `home-settings` | 圖鑑／設定按鈕 | |
| | `home-progress` | 進度卡 | 文字含總星數／已過關數／下一站 |
| 地圖 | `map-screen` | `<main>` | |
| | `chapter-<chapterId>` | 章節卡 | 1–10 全部存在 |
| | `level-btn-<levelId>` | 關卡按鈕 | 1–100 全部存在（鎖定亦可點→toast） |
| | `map-back` | 返回掣 | → `#/home` |
| | `map-stars-total` | 總星數 | `★ X / Y` |
| 遊戲 | `game-screen` | `<main>` | `data-level-id` / `data-mode` |
| | `game-back` | 返回地圖 | |
| | `game-title` | 關卡標題 | 文字 = `level.title` |
| | `cell-<r>-<c>` | 棋盤格 button | 只 render `level.cells` 存在嘅格 |
| | `bank-<index>` | 字庫字卡 | index = `level.bank` 索引；已用卡仍存在 |
| | `hint-btn` / `hint-count` | 提示掣／剩餘次數 | `hint-count` 純數字 |
| | `restart-btn` | 重玩 | |
| | `sound-btn` | 音效開關 | `aria-pressed` |
| | `mistake-count` | 錯誤次數 | 純數字 |
| 過關 | `result-overlay` | overlay root | `role=dialog`，不可 Esc/backdrop 關 |
| | `result-stars` | 星星容器 | `data-stars="0-3"`＋★ |
| | `next-level-btn` | 下一關 | 最後一關仍存在（文字變「全部完成」→ 地圖） |
| | `retry-btn` / `result-map-btn` | 重玩／返回地圖 | |
| | `result-idiom-<idiomId>` | 本關成語卡 | 每 slot 一張 |
| | `result-idiom-jyutping-<idiomId>` | 成語卡粵拼行 | Issue #1；有 `cantonese` 先出現 |
| 教學／故事 | `tutorial-overlay` / `tutorial-ok` | 教學 modal／明白掣 | 首次 Level 1 |
| | `chapter-intro` / `chapter-intro-ok` | 章節故事／出發掣 | 每章第一次 |
| 圖鑑 | `codex-screen` / `codex-search` | 畫面／搜尋框 | |
| | `codex-item-<idiomId>` | 成語卡 | 全庫每條一個（未收集顯示 ????） |
| | `codex-count` | 收集進度 | `已收集 X / Y 條成語` |
| | `codex-detail` | 詳情 modal | 點已收集卡後出現 |
| | `codex-detail-jyutping` | 詳情粵拼行 | Issue #1；有 `cantonese` 先出現 |
| 設定 | `settings-screen` / `settings-back` | 畫面／返回 | |
| | `settings-sound` / `settings-motion` | 開關 checkbox | 原生 checkbox，reload 保留 |
| | `settings-reset` | 重置掣 | |
| | `reset-confirm` / `reset-cancel` | 確認 modal 掣 | Esc／backdrop 亦可取消 |

> 所有 testid 以 `data-testid` attribute 輸出，命名完全依 PLAN §7.4，冇前綴、冇改名。鎖定／已用元素唔用 `disabled`/`aria-disabled`，確保 Playwright click 唔會被 block。

---

## 8. 實作檔案結構（ui-dev scope）

```
src/
  app.ts                 # mountApp：app shell、router 接駁、audio 解鎖、motion class、route → screen、清 overlay/toast
  router.ts              # parseRoute / navigate / replaceRoute / Router class
  screens/
    home.ts              # 首頁（garden scene hero + petals + 進度）
    map.ts               # 章節地圖（ctx.chapters × ctx.levels 動態分組）
    game.ts              # 遊戲 orchestrator（引擎、字庫同步、事件、overlay 流程）
    codex.ts             # 圖鑑 + 搜尋／篩選 + 詳情 modal
    settings.ts          # 設定 + 重置確認
    tutorial.ts          # 新手教學 overlay
    chapterIntro.ts      # 章節故事 overlay
    result.ts            # 過關 overlay
  ui/
    dom.ts icons.ts buttons.ts stars.ts progress.ts
    modal.ts toast.ts idiomCard.ts catBubble.ts board.ts bank.ts prefs.ts screen.ts
  styles/
    index.css            # @import entry（tokens/base/components/screens/game）
    tokens.css base.css components.css screens.css game.css
    cats.css             # cat-animator 擁有，唔改（會後載入覆寫 petal/confetti fallback）
```

---

## 9. 測試與驗證（本機）

指令：

```
npm run check          # tsc strict，綠
npm run build          # tsc + vite build，綠
npx vite preview --port 4301   # 用 dist 實測
node screenshots-local/qa-ui-v2.mjs   # 全流程
node screenshots-local/qa-ui-v3.mjs   # polish（level 10 / reduced motion / 320px / keyboard）
node screenshots-local/qa-extreme.mjs # level 100 + 極端 layout
```

Playwright 覆蓋（1280×800 及 390×844，?debug=1 讀正解，唔 hardcode 關卡）：
- 首頁 → 地圖（10 章／`level-btn-1`…`level-btn-100`）→ Level 1（chapter-intro + tutorial）→ 提示 → 完成過關（2 星）→ 下一關 title 正確。
- 錯誤判定（word-wrong mistakes +1、字卡返字庫、清空格）、重玩清零、退字卡、提示字卡同步。
- 4 成語關卡（Level 10）、chain 關（Level 15／Level 100，connector＋3–6 行、完成過關）、最後一關「全部完成」。
- 過關 overlay 星星數／成語卡／下一關／retry／返回地圖；未解鎖 `#/game/50` 帶返地圖。
- 圖鑑搜尋／詳情、設定音效 toggle＋reload 持久化、重置 cancel/confirm、首頁進度文字。
- reduced-motion（系統 prefers 及設定掣）：無花瓣、`html.reduced-motion`、動畫關閉。
- 320px 無橫向溢出；手機 390px 所有畫面無橫向溢出；sticky 字庫（短 viewport 捲動實測）。
- 極端棋盤：7 欄（Level 41/94/98）、8 行（Level 82）喺 390／320／1280 都完整顯示兼可完成過關；17 張字卡 bank 自動換行。
- 圖鑑拼音搜尋（無聲調 `yu gong`／帶聲調 `yú gōng`／中文／0 結果清 DOM）回歸測試。
- **Issue #1 雙拼音**：合成資料（debug 注入 `cantonese`）及最終 488 條真實資料下——過關 overlay 有「普」＋「粵」兩行及 `result-idiom-jyutping-<id>`；圖鑑卡細字粵拼；詳情 `codex-detail-jyutping`；粵拼搜尋 `jat1 nok6`／`jat nok`／`jat1nok6` 全中；中文／普通話搜尋唔受影響；`cantonese` undefined 時自動隱藏；desktop／mobile 390 無橫向溢出、0 console error。
- 全部 flow 0 console error／0 page error；鍵盤 Esc／Tab／skip-link 正常。
- 截圖：`screenshots-local/ui-dev/*.png`（home／map／game／chain／wrong／level10／level100／result／codex／codex-detail／settings／tutorial／chapter-intro／reset-confirm × desktop/mobile）。

---

## 10. 實作取捨備註

1. **字庫使用狀態由 UI 管理**：`usedBank: Set<number>`；place 成功加、`removeChar` 回傳 index 時刪、`word-wrong.cells` 對應格嘅 `cellBankIndex` 刪、`useHint().bankIndex ≥ 0` 加。字卡 element 永遠 render（DOM 穩定）。
2. **chain 關視覺**：逐行 + 行間 connector（flow layout，天然 responsive），唔用絕對定位 overlay 畫線，避免 resize 重算。
3. **自動選格**：放字後自動選中同一成語下一個空格；再點同一格保持選中（唔 toggle），令「點格→點卡」連續操作（真人及 E2E）唔會放錯位；冇選格時點字卡自動放入第一個空格。
4. **動畫 gating**：`prefs.effectiveReducedMotion(ctx)` 同時檢查系統 setting 同存檔設定；花瓣、彩紙、平滑 scroll 全部經呢個判斷；CSS 亦有 `html.reduced-motion` 全局降級。
5. **overlay stack**：modal 由 `ui/modal.ts` 統一管理（`#overlay-root`），focus trap、Esc、scroll lock；route 切換時 `closeAllOverlays()`＋`clearToasts()`，screen destroy 亦會關自己開嘅 overlay。
6. **toast 唔會遮住結算**：入過關 overlay 前 `clearToasts()`，避免遊戲期間「啱晒喵」toast 疊喺星星／標題上面。
7. **唔 hardcode 關卡數**：所有畫面用 `ctx.levels`／`ctx.chapters` 長度同內容；`levels.json` 由 2 關 → 100 關 → 最終版都唔需要改 UI。
8. **粵拼 fallback（Issue #1）**：`Idiom.cantonese` 資料未 ready 或空字串時，`jyutpingOf()` 回傳空字串，UI 完全唔顯示粵拼行／徽章；有值先顯示。搜尋 haystack 亦只加有值嘅粵拼。
9. **QA 回饋修正（2026-10-28）**：圖鑑拼音搜尋支援無聲調輸入（NFD 去調）；0 結果時清空 grid 舊 DOM（避免 E2E locator count 誤判）；deep link 到未解鎖／不存在關卡改成「先 `replaceRoute('#/map')`、後 `showToast`」，避免 toast 喺同一次 render 被 `clearToasts()` 清走（BUG-QA-3）。
