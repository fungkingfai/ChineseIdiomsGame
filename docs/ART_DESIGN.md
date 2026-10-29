# 《貓咪成語大冒險》美術設計文件（ART_DESIGN）

> 擁有者：**cat-animator**（`src/cats/**`、`src/styles/cats.css`、`public/art/**`、本文件）
> 版本：v1.1（2026-10-30）— Issue #2 新增進階篇 10 個場景（第 11–20 章）
> 對象：ui-dev（整合）、qa-tester（驗收）、Lead（review）
> 相關契約：`docs/PLAN.md` §8「貓貓角色／場景／2D 動畫契約」、Issue #2「加多 100 關」

---

## 1. 美術方向總覽

- **風格**：日系和風 × 玉綠庭園 × 櫻花 × 奶油色系；chibi 可愛比例、柔和手繪感、無外部字體／圖片。
- **主角**：黑貓店長**阿墨**（amo）＋橘虎斑小貓**糰子**（dango），一冷一熱、一眼分得出。
- **世界觀**：成語靈珠散落喺貓貓世界二十個場景；每章一個場景，通關時貓貓會開心／慶祝。
- **篇章**：基礎篇第 1–10 章（garden…summit）＋進階篇第 11–20 章（library…zenith，Issue #2）。
- **技術原則**：
  - 全部角色／場景／裝飾都係 **inline SVG 字串**或本地檔案，零外部網路請求。
  - 動畫只用 `transform` / `opacity`（GPU 友善），唔觸發 layout reflow。
  - 一切動態尊重 `prefers-reduced-motion: reduce` 及 `<html class="reduced-motion">`。
  - 輸出 **deterministic**（唔用 `Math.random()` 畫場景），re-render 唔會閃、截圖穩定。

### 檔案結構

```
src/cats/
  catAssets.ts   ← 角色 SVG（2 角色 × 7 情緒）、updateCatSVG helper
  scenes.ts      ← 10 章場景 SVG（含 seeded RNG、共用裝飾 helper、sceneCatSilhouette）
  animate.ts     ← 2D 動畫／特效小工具（花瓣、彩紙、螢火蟲、雪、雨、星光、過關演出）
src/styles/
  cats.css       ← 所有角色／場景／特效 keyframes、reduced-motion、手機效能調節
docs/
  ART_DESIGN.md  ← 本文件
```

`src/styles/index.css`（ui-dev 擁有）提供顏色變數；`cats.css` 只用固定色票，唔依賴 CSS 變數，避免載入次序問題。

---

## 2. 角色設定

### 2.1 阿墨（`amo`）— 黑貓店長

| 項目 | 設定 |
| --- | --- |
| 性格 | 冷靜、溫柔、博學；成語私塾店長，講嘢慢而有分寸 |
| 物種 | 黑貓（帶墨綠調嘅炭黑毛） |
| 招牌 | **金絲圓眼鏡**、**玉綠圍巾**、金色小鈴鐺 |
| 眼睛 | 琥珀金，平時半垂眼（溫柔、穩重），傷心時會變圓眼 |
| 身體 | 頭大身細 chibi 比例、奶油色肚／嘴邊、深色腳掌 |
| 動作節奏 | 呼吸慢、尾巴擺幅細、眨眼慢；慶祝時先會跳 |

### 2.2 糰子（`dango`）— 橘虎斑小貓

| 項目 | 設定 |
| --- | --- |
| 性格 | 好動、好奇、有話直說；成日跟住阿墨問問題 |
| 物種 | 橘色虎斑貓（額頭三劃虎斑＋頭頂**呆毛**） |
| 招牌 | **粉紅圍巾＋蝴蝶結**、**白襪腳**、玉綠色大眼 |
| 眼睛 | 玉綠、大眼汪汪、兩點高光（好奇感） |
| 身體 | 圓潤、肚／嘴邊奶油白、腮紅 |
| 動作節奏 | 尾巴擺得快、呆毛搖、耳仔易彈；情緒起伏大 |

### 2.3 色票（hex）

**阿墨 amo**

| 用途 | Hex |
| --- | --- |
| 主毛色 | `#454f48` |
| 深毛色（線條／陰影） | `#333b36` |
| 淺毛色（頭頂高光） | `#5e6a60` |
| 肚 | `#f6ecdd` |
| 嘴邊奶油 | `#f9f1e4` |
| 腳掌 | `#4d5850` |
| 肉球粉 | `#eda9b7` |
| 圍巾主色 | `#6f9c76` |
| 圍巾深色 | `#4f7a58` |
| 圍巾淺色 | `#8fb995` |
| 耳內粉 | `#e5a6b4` |
| 眼珠（琥珀金） | `#e8b64c` |
| 眼珠深色 | `#c9932f` |
| 眼鏡金 | `#e8b64c` |
| 鬍鬚 | `#f3ead9` |
| 五官墨線 | `#26302a` |
| 腮紅 | `#f4a7bb` |
| 影子 | `#2f3a2f` @ 16% |

**糰子 dango**

| 用途 | Hex |
| --- | --- |
| 主毛色 | `#eda964` |
| 虎斑紋／深毛色 | `#cd8340` |
| 淺毛色 | `#f6c58c` |
| 肚／白襪 | `#fff3e2` |
| 嘴邊奶油 | `#fff6ea` |
| 肉球粉 | `#f2a9b6` |
| 圍巾主色 | `#ef9fb6` |
| 圍巾深色（蝴蝶結） | `#e07e9c` |
| 圍巾淺色 | `#ffc2d2` |
| 耳內粉 | `#f7b7cb` |
| 眼珠（玉綠） | `#74a87c` |
| 眼珠深色 | `#4f7a58` |
| 鬍鬚 | `#fff8ec` |
| 五官墨線（暖棕） | `#5b4634` |
| 腮紅 | `#f4a7bb` |
| 影子 | `#8a5a33` @ 16% |

### 2.4 共用造型規格

- `viewBox="0 0 240 240"`，正方形；`width` / `height` 由 `opts.size` 控制（預設 160）。
- 頭部比例約佔畫面 58%，身體約 40%（chibi）。
- 必有元素：一對耳（外耳＋粉色內耳）、尾巴、鬍鬚、圍巾、腳掌。
- 阿墨額外有：金絲眼鏡、金鈴鐺；糰子額外有：呆毛、虎斑、圍巾蝴蝶結、白襪。
- 唔使用 SVG `<text>`（避免字體差異）；所有表情用 path／circle 畫。

---

## 3. 表情（7 種 mood）與動畫

`CatMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wink' | 'sleep'`

| mood | 眼睛 | 口／鼻 | 耳朵／身體 | 額外特效 | 主要 CSS 動畫 |
| --- | --- | --- | --- | --- | --- |
| `idle` | 阿墨半垂眼／糰子大眼、會眨眼 | 貓嘴 ω | 正常企定、呼吸、尾擺 | — | `cat-breathe`、`cat-blink`、`cat-tail-wag`、`cat-ear-twitch-*` |
| `happy` | `^ ^` 笑眼 | 張口笑＋舌頭＋小尖牙 | 輕彈跳、尾快擺 | 愛心＋金色星光 | `cat-happy-bounce`、`cat-heart-float`、`cat-sparkle-pop` |
| `sad` | 圓眼汪汪（阿墨都變圓眼）＋傷心眉 | 波浪嘴 | **垂耳**、垂尾、頭微側、身體震 | **眼淚 2 滴** | `cat-tear-drop`、`cat-sad-tremble`、`cat-sad-head` |
| `think` | 瞳孔望天、托腮 | 細細聲「嗯」嘴 | 頭歪、一手托腮 | 思考氣泡（三個點） | `cat-head-tilt`、`cat-bubble-float`、`cat-chin-tap` |
| `celebrate` | `^ ^` 笑眼 | 張口笑 | **舉爪跳起**、尾狂擺、圍巾飛 | 金光＋彩點＋愛心（`celebrate` 無愛心，有彩點） | `cat-hop`、`cat-paw-wave`、`cat-sparkle-pop`、`cat-dot-pop` |
| `wink` | 左眼開、右眼 `^` 閉＋睫毛 | 俏皮斜笑 | 尾快擺 | 星光＋小愛心 | `cat-sparkle-pop`、`cat-heart-float` |
| `sleep` | 下垂閉眼弧＋睫毛 | 細細聲呼 | 頭點、耳仔放鬆、尾曲埋 | **Zzz ×3** | `cat-sleep-nod`、`cat-zzz-float` |

補充：
- 眨眼動畫只會喺 **眼張開** 嘅 mood（`idle`、`think`）出現：根 svg 會加 `cat-eyes-open` class。
- 阿墨嘅金絲眼鏡永遠戴住（連睡覺都戴），係角色 signature。
- 表情直接畫入 SVG；`catMood(el, mood)` **只切換情緒動畫 class**，唔會重畫五官。要換表情請重新 `catSVG(character, mood)`（或用 `updateCatSVG`）。

---

## 4. 角色 SVG 結構與 class hook

```html
<svg class="cat-svg cat-amo mood-idle cat-eyes-open" viewBox="0 0 240 240"
     width="160" height="160" role="img" aria-label="黑貓店長阿墨，神情平靜"
     data-character="amo" data-mood="idle">
  <ellipse class="cat-shadow" .../>                    <!-- 地面影子 -->
  <g class="cat-body">                                 <!-- 情緒動畫層（跳／震／前傾） -->
    <g class="cat-tail">…</g>                          <!-- 搖尾 -->
    <g class="cat-breathe">                             <!-- 呼吸 -->
      <ellipse …/> 身體、<ellipse …/> 肚
      <g class="cat-paw cat-paw--l / --r / --raised / --chin">…</g>
      <g class="cat-head">
        <g class="cat-ear cat-ear--l / --r">…</g>       <!-- 耳動／垂耳 -->
        <ellipse …/> 頭
        <g class="cat-stripes">…</g>                    <!-- 糰子虎斑 -->
        <path class="cat-ahoge" …/>                     <!-- 糰子呆毛 -->
        <g class="cat-face">
          <g class="cat-blink">眼睛</g>                  <!-- 眨眼 -->
          <g class="cat-glasses">…</g>                  <!-- 阿墨眼鏡 -->
          <g class="cat-whiskers">…</g>
          <g class="cat-blush">…</g>
        </g>
      </g>
      <g class="cat-scarf">…<g class="cat-scarf-end">…</g>…</g>
    </g>
    <!-- 情緒特效：cat-heart / cat-sparkle / cat-confetti-dot / cat-tear / cat-think / cat-zzz -->
  </g>
</svg>
```

### class hook 一覽（俾 CSS／QA 用）

| Class | 位置 | 用途 |
| --- | --- | --- |
| `cat-svg` | 根 | 基本尺寸／`max-width:100%` |
| `cat-amo` / `cat-dango` | 根 | 角色識別 |
| `mood-<mood>` | 根（或 wrapper） | 情緒動畫開關 |
| `cat-eyes-open` | 根 | 有眨眼動畫 |
| `cat-shadow` | 根 | 跟呼吸微縮 |
| `cat-body` | 內層 | 跳／震動／彈跳 |
| `cat-breathe` | 內層 | 呼吸縮放 |
| `cat-tail` | 內層 | 搖尾 |
| `cat-head` | 內層 | 歪頭／點頭／傷心側頭 |
| `cat-ear` / `cat-ear--l` / `cat-ear--r` | 內層 | 耳動；sad 時垂耳 |
| `cat-blink` | 內層 | 眨眼 |
| `cat-glasses` | 內層 | 阿墨眼鏡（唔跟眨眼） |
| `cat-stripes` | 內層 | 糰子虎斑 |
| `cat-ahoge` | 內層 | 糰子呆毛搖擺 |
| `cat-whiskers` / `cat-blush` | 內層 | 鬍鬚／腮紅（靜態） |
| `cat-scarf` / `cat-scarf-end` | 內層 | 圍巾／巾尾飄動 |
| `cat-paw` / `--l` / `--r` / `--raised` / `--chin` | 內層 | 腳掌；celebrate 舉爪、think 托腮 |
| `cat-heart` / `cat-sparkle` / `cat-confetti-dot` | 內層 | happy／celebrate／wink 特效 |
| `cat-tear` / `cat-tear--2` | 內層 | sad 眼淚 |
| `cat-think` | 內層 | think 思考氣泡 |
| `cat-zzz` | 內層 | sleep Zzz |

### 貓貓 keyframes（定義喺 `cats.css`）

`cat-breathe`、`cat-tail-wag`、`cat-tail-wag-fast`、`cat-ear-twitch-l/r`、`cat-blink`、`cat-ahoge-sway`、`cat-scarf-sway`、`cat-shadow-breathe`、`cat-happy-bounce`、`cat-heart-float`、`cat-sparkle-pop`、`cat-hop`、`cat-paw-wave`、`cat-dot-pop`、`cat-sad-tremble`、`cat-sad-head`、`cat-tear-drop`、`cat-head-tilt`、`cat-bubble-float`、`cat-chin-tap`、`cat-sleep-nod`、`cat-zzz-float`。

---

## 5. 二十個章節場景

`chapterSceneSVG(scene)`：`viewBox="0 0 800 450"`、`preserveAspectRatio="xMidYMid slice"`、`aria-hidden="true"`、`focusable="false"`。全部 deterministic（seeded RNG），同一頁 20 張都唔會撞 `<defs>` id（全部加 `scene-<key>-` 前綴）。

`SCENE_KEYS` 已擴充到 20 個；`BASE_SCENE_KEYS`（第 1–10 章）同 `ADVANCED_SCENE_KEYS`（第 11–20 章）亦已 export，俾 UI 分辨篇章／做主題 styling。未知 key 一律 fallback `garden`。

### 5.1 基礎篇（第 1–10 章）

| key | 章節名 | 主色調 | 背景 | 中景 | 前景／貓貓細節 | 環境動畫 |
| --- | --- | --- | --- | --- | --- | --- |
| `garden` | 櫻花小徑 | 櫻粉 × 奶油 × 玉綠 | 粉紅天空、和煦陽光、遠丘 | 鳥居、兩棵櫻花樹、石燈籠、池塘錦鯉 | 石板小徑、長椅、小貓剪影、腳印、散落花瓣、前景垂枝櫻花 | 花瓣飄落（`scene-petal`） |
| `bamboo` | 竹林迷宮 | 玉綠 × 米白 | 淺綠天光、林間光柱 | 三層竹林、竹葉、石燈籠、石頭 | 蜿蜒石徑、**石貓守護像**（紅圍巾）、落葉、腳印、蕨葉 | 竹葉飄落（`scene-leaf`）、螢火蟲（`scene-firefly`） |
| `moon` | 月下書齋 | 靛藍 × 暖黃 | 夜空、大滿月、薄雲、流星 | 書齋屋頂、發光障子窗、窗內貓影、緣側 | 緣側書卷、紙鶴、**看書的貓店長剪影**、參道石階、石燈籠 | 星星閃（`scene-star--twinkle`）、雲飄、燈籠搖、螢火蟲 |
| `snow` | 雪山溫泉 | 冰藍 × 雪白 × 暖橙 | 雪山、松樹、淡日 | 溫泉池、池邊石、木欄杆、紅燈籠 | **雪人貓**、丹頂鶴、腳印、蒸氣、木桶、雪叢 | 落雪（`scene-snowflake`）、蒸氣（`scene-steam`）、燈籠搖 |
| `sea` | 海邊燈塔 | 日落橙 × 海藍 | 夕陽、雲、海鷗、遠島 | 海面、紅白燈塔（光柱＋光暈）、帆船、崖 | 木碼頭、**看海的貓剪影**、貝殼海星、腳印、浪花 | 海浪（`scene-wave`）、燈塔光柱脈動（`scene-beam`）、雲飄 |
| `stars` | 星空詩會 | 深藍 × 星白 | 銀河、彎月、星座、流星 | 山丘、**兩隻看星貓剪影**（綠／粉圍巾）、詩會卷軸架 | 天燈、螢火蟲、草叢、星空光點 | 星星閃、流星、天燈上升（`scene-float-lantern`）、星座呼吸 |
| `festival` | 燈會市集 | 暖夜紅 × 燈籠橙 | 夜空、遠景屋頂、煙花 | 兩排燈籠串、**貓臉大燈籠**、三個屋台攤位（布簾、櫃檯、小食） | 地面燈光倒影、腳印、小燈籠 | 燈籠搖、煙花綻放（`scene-firework`）、星星閃 |
| `rain` | 雨後石巷 | 霧灰綠 × 暖燈 | 陰天、雲、雨絲 | 一點透視石牆、巷尾神社暖光、牆上燈籠 | 油紙傘、濕地水窪倒影、漣漪、盆栽青苔、腳印 | 落雨（`scene-raindrop`）、漣漪（`scene-ripple`） |
| `cloud` | 雲端書樓 | 薰衣草紫 × 奶油白 | 紫調天空、暖陽、星星 | 雲海、漂浮書樓（三層、暖窗、書架、雲梯）、浮空島 | 漂浮書本、紙鶴、**雲上讀書小貓**、遠島 | 雲飄（`scene-cloud-puff`）、書本浮沉（`scene-float-book`）、紙鶴飛（`scene-crane`）、星星閃 |
| `summit` | 成語之巔 | 曙光藍 × 暖金 | 曙光射線、雲海、群山 | 山頂平台、石階、旗杆 | **成語靈珠**（發光寶珠）、粉紅旗幟、**兩隻登頂貓剪影**、腳印、飛鳥 | 旗幟飄揚（`scene-flag`）、光點閃（`scene-sparkle`）、雲飄 |

### 5.2 進階篇（第 11–20 章，Issue #2 新增）

| key | 章節名 | 主色調 | 背景 | 中景 | 前景／貓貓細節 | 環境動畫 |
| --- | --- | --- | --- | --- | --- | --- |
| `library` | 藏經閣 | 深木棕 × 暖金光 | 拱窗夜空、月光、後牆書架剪影、掛軸 | 三座高書架（逐本彩色書脊）、吊燈籠、拉梯、拱窗 | 書枱上的書卷與書疊、蠟燭、**坐在書枱的店長貓**、飛書、塵光 | 燈籠搖、燭火、浮書、塵光閃 |
| `volcano` | 烈焰火山 | 暗紫黑 × 熔岩橙 | 火山煙雲、暗紅天光、遠山剪影 | 火山錐、發光火山口、雙熔岩流、山腳熔岩湖、黑曜石 | **熔岩前的小貓剪影**（粉圍巾背光）、餘燼 | 餘燼上升、熔岩脈動、煙雲飄 |
| `desert` | 大漠孤煙 | 暖沙金 × 落日橙 | 落日、薄雲、三座金字塔 | 沙丘層次、三隻駱駝商隊（有貓騎手）、**大漠孤煙** | 營地帳篷＋營火＋小貓、沙草、石、鷹、腳印 | 孤煙、營火、光點 |
| `aurora` | 極光冰原 | 極夜藍 × 極光綠／紫 | 星空、彎月、三層極光緞帶 | 雪山、冰原、冰晶尖柱、極光倒影 | **望極光的貓**（玉綠圍巾）、雪丘、腳印、冰面閃光 | 極光擺動、星星閃、冰光閃 |
| `underwater` | 海底龍宮 | 深海青 × 珊瑚色 | 水面光柱、深海漸層、遠魚群 | 紅金龍宮（兩層金頂、暖窗、龍珠塔尖）、珊瑚礁、海草 | 巨蚌珍珠、海星、貝殼、**潛水貓**（粉圍巾＋頭盔氣泡）、氣泡 | 氣泡上升、海草擺、水母脈動、魚游、光柱 |
| `skycastle` | 天空之城 | 天空藍 × 晚霞粉 × 雲白 | 晚霞天空、暖陽、熱氣球、飛鳥 | 浮空岩石島＋三塔城堡（城牆、旗幟、暖窗、雲橋） | 城堡瀑布、雲海、**雲上小貓**、腳印 | 雲飄、旗飄、瀑布流、熱氣球浮 |
| `shrine` | 貓神古廟 | 暮紫 × 朱紅 × 暖黃 | 暮色山景、杉林剪影、薄雲 | 三重鳥居參道、本殿屋頂、石燈籠、繪馬 | **貓神石像**（發光眼＋紅圍巾）、注連繩紙垂、賽錢箱、螢火蟲 | 燈籠搖、繪馬擺、螢火蟲 |
| `harbor` | 夜航碼頭 | 深夜藍 × 暖燈橙 | 滿月、星空、遠岸小鎮燈光、遠方燈塔 | 月光倒影、大帆船、兩艘小艇、木碼頭 | 燈柱燈籠、貓船長、木箱木桶、纜繩、腳印 | 船搖晃、燈籠搖、月光倒影閃、浪 |
| `firefly` | 螢火竹林 | 墨綠 × 螢光黃 | 月亮、星空、三層竹林剪影 | 竹林、霧氣、小溪石階、石燈籠、苔石 | **賞螢火蟲的小貓**、螢火蟲群、落葉 | 螢火蟲飛、竹葉、水光 |
| `zenith` | 蒼穹之巔 | 深空紫 × 星白 × 靈珠金 | 銀河、星海、星雲、流星 | 巨大成語靈珠（光環＋光柱）、浮空石階、星光海 | **兩隻登頂貓剪影**、山頂平台、石階、腳印、光點 | 星星閃、流星、浮石、靈珠光環呼吸 |

### 場景 SVG 結構

```html
<svg class="chapter-scene scene-garden" viewBox="0 0 800 450"
     preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="scene-garden-sky">…</linearGradient>
    <linearGradient id="scene-garden-ground">…</linearGradient>
    <radialGradient id="scene-garden-sun">…</radialGradient>
  </defs>
  <rect width="800" height="450" fill="url(#scene-garden-sky)"/>
  <!-- 背景層：天空、日／月、遠山、星星 -->
  <!-- 中景層：建築、樹木、燈籠、攤位 -->
  <!-- 前景層：路徑、水池、腳印、花草、特效元素 -->
</svg>
```

- **id 規則**：`scene-<key>-<用途>`，例如 `scene-garden-sky`、`scene-moon-windowGlow`。
- 場景動畫元素 class 一覽：
  - 基礎篇：`scene-petal`、`scene-star--twinkle`、`scene-firefly`、`scene-snowflake`、`scene-raindrop`、`scene-steam`、`scene-lantern`、`scene-cloud-puff`、`scene-wave`、`scene-flag`、`scene-float-book`、`scene-crane`、`scene-firework`、`scene-ripple`、`scene-shooting`、`scene-leaf`、`scene-float-lantern`、`scene-sparkle`、`scene-constellation`、`scene-beam`。
  - 進階篇：`scene-ember`、`scene-bubble`、`scene-aurora`、`scene-seaweed`、`scene-jelly`、`scene-fish`、`scene-waterfall`、`scene-balloon`、`scene-charm`、`scene-boat`、`scene-lava`、`scene-candle`、`scene-float-rock`、`scene-shimmer`（另沿用上面部分 class）。
- **命名注意**：裝飾元素刻意叫 `scene-cloud-puff` / `scene-snowflake` / `scene-raindrop`，避免同場景根 class（`scene-cloud`、`scene-snow`、`scene-rain`）撞名。
- **動畫節點預算**：每張場景 6–19 個 CSS 動畫節點（進階篇 7–18；基礎篇個別 20–27），其餘全部靜態；地圖縮圖可用自動暫停機制（見 §7）令同時動畫數量再少一截。
- 未知 scene key → fallback `garden`（唔會 throw）。

---

## 6. 動畫／特效 API（`src/cats/animate.ts`）

所有函式向後兼容（原本 4 個 API 簽名無改），另外新增下列 optional 工具：

```ts
// 原有 API
spawnPetals(container: HTMLElement | null, count = 14): void
burstConfetti(container: HTMLElement | null): void
catMood(el: Element | null, mood: AnimatedCatMood): void
prefersReducedMotion(): boolean

// 新增（optional）
spawnFireflies(container, count = 10): void
spawnSnow(container, count = 22): void
spawnRain(container, count = 34): void
spawnStars(container, count = 14): void
spawnEmbers(container, count = 18): void       // 進階篇：火山餘燼
spawnBubbles(container, count = 18): void      // 進階篇：海底氣泡
spawnSceneFx(container, scene: string): void   // 跟 20 個章節場景自動配環境效果
autoPauseOffscreenScenes(root?, opts?): () => void
                                               // offscreen 場景自動加 .is-static 暫停動畫
playClearCinematic(container): void            // 過關星光＋彩紙小演出（約 2.6s）
clearFx(container): void                       // 清走所有特效 layer
setReducedMotion(enabled: boolean): void       // 切換 <html class="reduced-motion">
```

`scenes.ts` 另外 export：`SceneKey`（20 個 key）、`SCENE_KEYS`、`BASE_SCENE_KEYS`（第 1–10）、`ADVANCED_SCENE_KEYS`（第 11–20）、`sceneCatSilhouette()`（場景小貓剪影 helper，方便加筆）。

行為約定：
- 特效 layer 由 `animate.ts` 自動建立（`petal-layer` / `confetti-layer` / …），全部 `aria-hidden="true"`、`pointer-events: none`；容器會自動加 `.fx-host`（`position: relative`）。
- **每個容器每種效果最多一層**：重複呼叫唔會無限疊加；`spawnPetals` 第二次呼叫會直接 return。
- `burstConfetti` 約 2.4 秒後自動清走 DOM；同層最多同時 ~90 個節點。
- 節點預算：花瓣 14、螢火蟲 10、雪 22、雨 34、星光 14、餘燼 18、氣泡 18、彩紙 30（手機 CSS 再隱藏部分）。
- `spawnSceneFx` 對 20 個場景都有 mapping：garden→花瓣、bamboo→螢火蟲、volcano→餘燼、underwater→氣泡、firefly→螢火蟲、zenith→星光…（詳見源碼 switch）。
- 系統 `prefers-reduced-motion` **或** `.reduced-motion` class 任何一個成立 → 全部特效唔建立、CSS 動畫停用；`playClearCinematic` 直接 no-op。
- `catMood(el, mood)` 會移除舊 `mood-*` class、加新 class，並設 `data-cat-mood`；可以套喺包住 `.cat-svg` 嘅 wrapper（CSS 同時支援 wrapper 同 svg 自身 class）。

### 建議整合寫法

```ts
import { catSVG, updateCatSVG, CAT_MOODS } from '../cats/catAssets';
import { chapterSceneSVG } from '../cats/scenes';
import { spawnPetals, burstConfetti, spawnSceneFx } from '../cats/animate';

// 首頁 hero：場景 + 花瓣
heroArt.innerHTML = chapterSceneSVG('garden');
spawnPetals(heroArt, 12);

// 首頁貓貓（大圖）
amoEl.innerHTML = catSVG('amo', 'happy', { size: 260, className: 'cat-hero-amo' });
dangoEl.innerHTML = catSVG('dango', 'wink', { size: 200 });

// 遊戲旁白貓貓（細圖，對話框用 aria-hidden）
bubbleCat.innerHTML = catSVG('dango', 'sad', { size: 96, decorative: true });

// 唔想每次重畫：保留容器，換表情
updateCatSVG(wrapper, 'amo', 'celebrate', { size: 180 });
// 或者只切換情緒動畫（表情唔變）
catMood(wrapper, 'celebrate');

// 地圖章節縮圖（20 章）
cardScene.innerHTML = chapterSceneSVG(chapter.scene);
// 效能：scenes.ts 載入時已自動啟動 offscreen 暫停（IntersectionObserver）。
// 亦可以自己控制生命週期：
// const stop = autoPauseOffscreenScenes(); 之後 unmount 前 stop();

// 進階篇場景環境效果（可選）
spawnSceneFx(heroArt, chapter.scene); // 自動揀花瓣／雪／雨／餘燼／氣泡／螢火蟲／星光

// 過關
burstConfetti(panel);
// 想更華麗：playClearCinematic(panel)
```

### 場景容器尺寸

`cats.css` 提供兩個 helper（可選用）：

```css
.scene-frame { position: relative; aspect-ratio: 16 / 9; overflow: hidden; border-radius: 16px; }
.chapter-scene { display: block; width: 100%; height: 100%; }
```

- 直接用 `<div class="home__scene">${chapterSceneSVG('garden')}</div>` 亦得，只需父容器有固定高度（現有 UI 已係咁做）。
- **20 章地圖效能（重點）**：`scenes.ts` 載入時會自動 call `autoPauseOffscreenScenes()`，
  用 IntersectionObserver 為離開畫面嘅 `.chapter-scene` 加 `is-static`（CSS `animation: none`），
  捲返入畫面自動移除、動畫繼續；MutationObserver 亦會處理 SPA 換頁新加入嘅場景。
  UI 唔需要改動；如想自己控制，可呼叫 `const stop = autoPauseOffscreenScenes(root)` 並喺 unmount 時 `stop()`。
  應急亦可手動為個別場景加 `is-static` class（例如截圖／低電量模式）。

### 減少動態效果

ui-dev 嘅 `applyMotionPreference()` 會喺 `<html>` 加／除 `reduced-motion`，`cats.css` 已支援：

- `prefers-reduced-motion: reduce` → 停所有貓貓／場景／特效動畫，隱藏特效 layer。
- `.reduced-motion` class（html／body／任何祖先都可以）→ 同上。
- 停用動畫後貓貓仍然有完整靜態表情（垂耳、眼淚、舉爪等靜態 transform 保留）。

---

## 7. 效能、可及性與 QA checklist

### 效能

- 角色每隻 SVG 約 40–90 個節點；20 張場景共約 4,700 個 SVG 節點（大部分靜態），單張約 80–350 個。
- 動畫節點：每張場景 6–19 個 CSS 動畫（進階篇 7–18）；20 張全部同時播放都只係 ~300 個，
  而且 `autoPauseOffscreenScenes()` 會將畫面外場景嘅動畫完全暫停，實際上同時只會有 1–3 張場景喺動。
- **20 章地圖建議**：唔需要特別處理；autopilot 已內建。如自行 render 到非 document 容器，可傳 root。
- CSS 動畫只改 `transform` / `opacity`；`transform-box: fill-box` 用嚟令 SVG 元素以自身中心做 origin。
- 場景 `defs` id 全部有 `scene-<key>-` 前綴，20 張同一頁 100 個 id 零衝突（已自動化測試）。
- 手機（≤600px）會自動隱藏部分特效節點、放慢場景雲／花瓣，減少 compositing 壓力。
- 所有效果都係本地 inline SVG，零 network request。

### 可及性

- 角色預設 `role="img"`＋`aria-label="<角色>，<情緒>"`，例如「黑貓店長阿墨，神情平靜」。
- `decorative: true` 時改為 `aria-hidden="true"`（適合對話框內重複裝飾貓）。
- 場景永遠 `aria-hidden="true"`（純裝飾），唔會干擾 screen reader。
- 動畫尊重 `prefers-reduced-motion`；花紋對比足夠（奶油底 × 墨綠線）。

### QA checklist

1. `catSVG('amo' | 'dango', …7 種 mood…)` 全部 render，一頁 14 隻 + 38 隻亦無 id 衝突。
2. `opts.size` 64 / 96 / 160 / 240 縮放正常；`className` 會 append；`decorative` 有 aria-hidden。
3. `chapterSceneSVG()` 20 個 key 都 render（基礎篇 10＋進階篇 10）；未知 key fallback garden；同一頁 20 張無重複 id。
4. `catMood(wrapper, mood)` 會 toggle class；wrapper 同 svg 自身 mood class 都觸發動畫。
5. 首頁有花瓣、遊戲過關有彩紙、錯誤答案有傷心貓（垂耳＋眼淚）。
6. 進階篇 10 個場景氣氛分明、每張有貓貓世界細節；場景動畫節點 6–19 個、只動 transform／opacity。
7. offscreen 場景自動暫停：捲離地圖後 `.chapter-scene` 有 `.is-static`，捲返去自動恢復動畫。
8. 系統 reduced-motion 或設定頁開關 → 動畫全停、特效 layer 消失、貓貓靜態表情仍正確。
9. 手機 390×844 無橫向溢出、無 console error。
10. `npm run check`、`npm run build` 綠。

---

## 8. 已知限制 / 備註

- `catMood()` **唔會**重畫五官；換表情要重新 `catSVG` / `updateCatSVG`。
- 場景為固定 800×450，用 `slice` 裁切；極端長闊比（例如 6:1 橫幅）會裁走較多上下內容。
- 場景輸出用 seeded RNG，同一 build 內每次都一樣；改 seed 會令星／花瓣位置改變，屬預期。
- 未使用任何外部字體、圖片、CDN；`public/art/` 目前未有額外大圖（角色／場景全部由 TS 生成）。
- 動畫假設瀏覽器支援 CSS `transform-box: fill-box`（Chrome / Edge / Safari / Firefox 現代版本均支援）。

---

## 9. 版本紀錄

- **v1.1（2026-10-30）**：Issue #2 進階篇美術。
  - `SceneKey` / `SCENE_KEYS` 擴充到 20 個；新增 `BASE_SCENE_KEYS`／`ADVANCED_SCENE_KEYS`。
  - 新增 10 個進階篇場景：library、volcano、desert、aurora、underwater、skycastle、shrine、harbor、firefly、zenith（全部 800×450、分層、貓貓世界細節、`scene-<key>-` id、deterministic）。
  - `cats.css` 新增 14 組場景點綴 keyframes（餘燼、氣泡、極光、海草、水母、魚、瀑布、熱氣球、繪馬、船、熔岩、蠟燭、浮石、倒影閃爍）＋ DOM 餘燼／氣泡粒子，全部只動 transform／opacity，reduced-motion 全停。
  - `animate.ts` 新增 `spawnEmbers`／`spawnBubbles`、20 場景 `spawnSceneFx` mapping、`autoPauseOffscreenScenes()`（IntersectionObserver＋MutationObserver，offscreen 自動 `is-static`）；`scenes.ts` 載入時自動啟動，UI 零改動。
  - 進階篇每張場景動畫節點控制喺 7–18 個；20 張同頁 100 個 defs id 零衝突。
- **v1.0（2026-10-28）**：首版完整美術。
  - 兩隻角色 × 7 情緒、阿墨金絲眼鏡＋玉綠圍巾、糰子虎斑＋呆毛＋粉圍巾。
  - 10 個章節場景（分層＋貓貓世界細節＋環境動畫、id 全部有前綴）。
  - `animate.ts` 保留舊 API，新增螢火蟲／雪／雨／星光／場景 FX／過關演出／清理。
  - `cats.css` 完整 keyframes、reduced-motion（系統＋`.reduced-motion`）、手機效能調節。
