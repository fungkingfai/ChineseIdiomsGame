#!/usr/bin/env node
/**
 * 《貓咪成語大冒險》100 關生成器（deterministic）
 * =================================================================
 * 讀取 src/data/idioms.json + src/data/chapters.json，生成
 * src/data/levels.json（100 關，10 章 × 10 關）。
 *
 * 特性：
 * - 完全可重現：所有隨機數用 mulberry32；seed 由關卡 id（＋重試次數）
 *   決定，同一份 idioms.json 跑兩次結果逐位元組一致。
 * - fill（填字）：2–4 個成語交叉；每個新成語必須同前面至少一個成語共用
 *   一格，交叉位答案字一致。
 * - chain（接龍）：id >= 11 且 id % 5 === 0（共 18 關）；3–6 個成語首尾
 *   相接；rows = 成語數、cols = 4、每行 dir:"h"、col:0。
 * - 難度曲線：d = (id-1)/99；成語數、空格比例、提示次數、誘餌字、
 *   成語 tier 全部跟 d 上升（見 docs/LEVEL_DESIGN.md）。
 * - 內建驗證：幾何一致、交叉字一致、chain 接龍、blanks 合法、bank
 *   multiset 足夠、100 關唯一、可解性模擬、難度趨勢。驗證失敗唔會寫檔。
 * - 輸出統計：可加 --stats / --stats=json / --stats=md。
 *
 * 用法：
 *   node scripts/generate-levels.mjs                 # 生成 100 關並寫入 levels.json
 *   node scripts/generate-levels.mjs --dry-run       # 生成＋驗證，但唔寫檔
 *   node scripts/generate-levels.mjs --stats         # 額外印出統計
 *   node scripts/generate-levels.mjs --stats=md      # 印出 Markdown 統計表
 *   node scripts/generate-levels.mjs --stats=json    # 印出 JSON 統計
 *   node scripts/generate-levels.mjs --levels=6 --out=/tmp/levels-test.json
 *   node scripts/generate-levels.mjs --idioms=/tmp/synth.json --levels=100 --out=/tmp/x.json
 *
 * 注意：`npm run generate:levels` 會直接覆寫 src/data/levels.json；
 * 生成器只擁有 src/data/{levels,chapters}.json，唔會改 idioms.json。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_IDIOMS_PATH = resolve(ROOT, 'src/data/idioms.json');
const DEFAULT_CHAPTERS_PATH = resolve(ROOT, 'src/data/chapters.json');
const DEFAULT_OUTPUT_PATH = resolve(ROOT, 'src/data/levels.json');

/* ------------------------------------------------------------------ */
/* 設計常數（與 docs/GAME_DESIGN.md、docs/LEVEL_DESIGN.md 同步）        */
/* ------------------------------------------------------------------ */

const TOTAL_LEVELS = 200;
const BASE_LEVELS = 100; // 基礎篇 Level 1–100（生成時會沿用已存在嘅基礎關卡，保證不變）
const LEVELS_PER_CHAPTER = 10;
const CHAPTER_COUNT = 20;
const CHAIN_START_LEVEL = 11;
const CHAIN_EVERY = 5;
const MIN_FILL_WORDS = 2;
const MAX_FILL_WORDS = 4;
const MAX_ADVANCED_FILL_WORDS = 5;
const MIN_CHAIN_WORDS = 3;
const MAX_CHAIN_WORDS = 7;
const MAX_FILL_DIM = 9;
const MAX_FILL_DIM_RELAXED = 11;
const MAX_ADVANCED_FILL_DIM = 10; // 進階篇棋盤上限；優先 ≤9×9
const BANK_MAX_ADVANCED = 22; // 進階篇字庫上限（空格＋誘餌）
const BLANK_RATIO_START = 0.3;
const BLANK_RATIO_END = 0.65;
const TIER_TARGET_START = 1.7;
const TIER_TARGET_SPAN = 3.1;
/** chain 關溫和 tier 曲線（受接龍連通＋錨限制，見 docs/LEVEL_DESIGN.md §9.5） */
const CHAIN_TIER_TARGET_START = 2.6;
const CHAIN_TIER_TARGET_SPAN = 1.4;
/** 進階篇 tier 曲線：fill 3.8 → 4.6；chain 3.9 → 4.6（每關錨 tier ≤3） */
const ADV_FILL_TIER_TARGET_START = 3.8;
const ADV_FILL_TIER_TARGET_SPAN = 0.8;
const ADV_CHAIN_TIER_TARGET_START = 3.9;
const ADV_CHAIN_TIER_TARGET_SPAN = 0.7;

/**
 * 每章提示次數。
 * 基礎篇（1–10 章）：3 → 1；進階篇（11–20 章）：2（第 11 章）→ 1（第 16–20 章）。
 * 進階篇開頭補回少少提示，令新玩家面對冷僻成語時唔會卡死。
 */
const HINTS_BY_CHAPTER = [3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
/** 每章誘餌字數：基礎篇 0 → 6；進階篇 6 → 10（受 bank 上限再截） */
const DECOYS_BY_CHAPTER = [0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

const CHAPTER_SCENES = [
  'garden',
  'bamboo',
  'moon',
  'snow',
  'sea',
  'stars',
  'festival',
  'rain',
  'cloud',
  'summit',
  // 進階篇（Issue #2，第 11–20 章）
  'library',
  'volcano',
  'desert',
  'aurora',
  'underwater',
  'skycastle',
  'shrine',
  'harbor',
  'firefly',
  'zenith',
];

const MAX_BUILD_ATTEMPTS = 180; // 每關內部重試（換幾何／換字）
const MAX_LEVEL_ATTEMPTS = 40; // 每關外層重試（換 seed，保證關卡唯一）
const MAX_SALT_RETRIES = 10; // 200 關完整驗證失敗時，自動換 salt 重試（deterministic）

/* ------------------------------------------------------------------ */
/* 關卡標題（每章 10 個，配合場景；唔可以包含任何成語本字，驗證會查）     */
/* ------------------------------------------------------------------ */

const CHAPTER_TITLES = [
  [
    '花下尋字',
    '春風識字',
    '櫻語初開',
    '石徑藏書',
    '貓爪點墨',
    '花瓣拼字',
    '樹下聽課',
    '粉櫻書聲',
    '庭前對句',
    '小徑通文',
  ],
  [
    '竹影排字',
    '風過竹林',
    '迷宮聽風',
    '竹節接龍',
    '青竹點頭',
    '筍尖露字',
    '竹林深處',
    '葉響成句',
    '竹籬尋章',
    '迷宮出口',
  ],
  [
    '月下翻書',
    '銀漢無聲',
    '書齋夜讀',
    '月照靈珠',
    '墨香伴月',
    '窗前一課',
    '月華解字',
    '古籍微光',
    '夜闌成語',
    '月圓珠現',
  ],
  [
    '雪落溫泉',
    '白雪山碑',
    '霧中辨字',
    '溫泉暖語',
    '雪花拼句',
    '山頂石碑',
    '熱湯書聲',
    '雪徑貓蹤',
    '冰晶文字',
    '雪融珠明',
  ],
  [
    '燈塔照字',
    '海浪接句',
    '漁火夜話',
    '潮聲誦文',
    '海風翻頁',
    '燈塔守句',
    '貝殼藏書',
    '浪花成章',
    '海鷗傳語',
    '燈明珠現',
  ],
  [
    '星光排句',
    '夜空吟詩',
    '星軌成章',
    '草坪詩會',
    '流星許願',
    '銀河對句',
    '星垂平野',
    '星語連珠',
    '繁星入卷',
    '星聚珠成',
  ],
  [
    '燈謎猜字',
    '紅燈高掛',
    '市集尋章',
    '花燈造句',
    '舞獅聽文',
    '糖葫蘆字',
    '燈會聯句',
    '猜謎貓群',
    '燈影書香',
    '元宵珠圓',
  ],
  [
    '雨後青苔',
    '石巷聽雨',
    '滴答成句',
    '傘下讀書',
    '雨簾藏字',
    '屋簷水聲',
    '濕石刻文',
    '雨停尋句',
    '苔痕成語',
    '雨霽珠明',
  ],
  [
    '雲海書樓',
    '翻雲閱卷',
    '雲端對句',
    '書樓高處',
    '雲梯拾字',
    '霧海藏書',
    '雲上課堂',
    '書頁生雲',
    '雲開見句',
    '雲深珠亮',
  ],
  [
    '成語之巔',
    '頂峰一課',
    '靈珠綻放',
    '山高句長',
    '最後考驗',
    '雲端決戰',
    '集句成山',
    '珠光滿路',
    '登頂對句',
    '貓語成章',
  ],
  // ── 進階篇（第 11–20 章，Issue #2）──
  [
    '閣中尋卷',
    '古卷生輝',
    '層樓疊字',
    '經閣夜燈',
    '書脊藏謎',
    '翻頁聞香',
    '樓高卷密',
    '字裡藏珠',
    '萬卷歸心',
    '經閣試煉',
  ],
  [
    '火舌煉字',
    '岩漿旁讀',
    '熱風翻書',
    '火山口訣',
    '烈焰拾句',
    '熔岩刻文',
    '灰燼尋章',
    '火中取字',
    '熱浪對句',
    '火山之試',
  ],
  [
    '沙丘藏字',
    '駝鈴誦文',
    '孤煙直上',
    '風沙揭碑',
    '綠洲書聲',
    '烈日考驗',
    '沙海尋章',
    '古城殘卷',
    '流沙解句',
    '大漠通關',
  ],
  [
    '極光映字',
    '冰封古卷',
    '雪原夜課',
    '冰川尋句',
    '融冰取字',
    '極夜燈火',
    '冰晶文字',
    '寒風對句',
    '光幕藏章',
    '冰原之試',
  ],
  [
    '龍宮探字',
    '珊瑚碑文',
    '水底書聲',
    '珍珠串句',
    '龍王考題',
    '海藻藏書',
    '浪底尋章',
    '貝殼傳文',
    '深宮解句',
    '龍宮之試',
  ],
  [
    '雲城拾階',
    '空中樓閣',
    '風車翻頁',
    '天臺對句',
    '雲端書聲',
    '飛橋尋字',
    '城堡鐘鳴',
    '高空考驗',
    '雲海藏章',
    '天空之試',
  ],
  [
    '古廟籤文',
    '香火問字',
    '貓神低語',
    '籤筒藏句',
    '廟前石階',
    '鐘聲誦文',
    '神龕燈明',
    '籤詩解字',
    '古井對句',
    '貓神之試',
  ],
  [
    '碼頭燈火',
    '船帆寫字',
    '夜航書聲',
    '纜繩接句',
    '燈塔引路',
    '船長考題',
    '浪聲翻頁',
    '貨箱藏章',
    '夜海尋句',
    '夜航之試',
  ],
  [
    '螢光點字',
    '竹節藏文',
    '夜竹書聲',
    '流螢引路',
    '竹影對句',
    '螢火成句',
    '靜夜考驗',
    '竹林深處',
    '螢飛滿卷',
    '螢火之試',
  ],
  [
    '蒼穹啟程',
    '星海拾珠',
    '天梯對句',
    '靈珠共鳴',
    '雲端決意',
    '二十景成',
    '星軌接龍',
    '極頂書聲',
    '靈珠齊明',
    '蒼穹終試',
  ],
];

/* ------------------------------------------------------------------ */
/* 貓貓故事（每章 3 個 fill 版＋3 個 chain 版；唔可以穿橋提及本關成語）  */
/* ------------------------------------------------------------------ */

const CHAPTER_STORIES = {
  1: {
    fill: [
      '櫻花樹下，阿墨用尾巴掃開落花，露出刻字的石板。糰子發現有幾個位置空着，正等人補上喵。',
      '春風吹過小徑，花瓣在石板上排成奇怪的形狀。糰子歪着頭問：「呢啲空缺，要填咩字先啱呀？」',
      '阿墨把字卡撒在草地上，笑說：「填字好似拼花，一筆一畫都要對位。」糰子已經伸出貓爪。',
    ],
    chain: [
      '石板上的字連成一條發光小路，糰子要沿住字尾接字頭，一步一步向前喵。',
      '風把花瓣吹成一串，阿墨說：「接龍就係咁，上一句尾字，就係下一句開頭。」',
      '糰子咬着字卡跑過小徑，每次接得啱，石板就多亮一格喵。',
    ],
  },
  2: {
    fill: [
      '竹林迷宮裏，竹葉沙沙作響，石筍上浮現一行行缺字的句子。糰子要靜下心，逐個字補回去。',
      '阿墨撥開竹枝，指着地面：「呢度每塊石都藏住一句成語，填啱晒先過得去喵。」',
      '陽光穿過竹葉灑成點點光斑，糰子追着光點跑，差點忘了手上還有字卡。',
    ],
    chain: [
      '竹節一節接一節，阿墨說接龍都一樣：尾字連首字，先至行得通喵。',
      '迷宮深處傳來竹笛聲，每吹一下，就有一句成語排好隊等糰子接上。',
      '糰子把字卡排在竹葉上，一條接一條，總算看見出口的亮光。',
    ],
  },
  3: {
    fill: [
      '月下書齋，古籍自動翻頁，書頁間浮起點點靈光。糰子趴在桌邊，替阿墨補上缺去的字。',
      '月光把硯台照成銀色，阿墨執筆輕點：「字要放啱位，句先會通順喵。」',
      '窗外蟲鳴陣陣，糰子打了個呵欠，又被書頁上的亮字吸引住。',
    ],
    chain: [
      '書齋的書架一層接一層，成語在架上排成一條龍，等糰子接上尾巴。',
      '阿墨翻開古卷，靈珠的光沿着文字流動：一句接一句，光芒就越來越盛。',
      '夜深了，糰子把最後一張字卡放好，書齋的燈忽然亮得似白天。',
    ],
  },
  4: {
    fill: [
      '雪山溫泉冒着白煙，石碑上結了一層薄霜。糰子用肉球抹開霜花，露出缺字的碑文。',
      '阿墨捧着熱茶，指着霧氣中的石碑：「字就藏在雪裏，慢慢睇就見到喵。」',
      '溫泉邊的水聲答答，糰子把字卡排在石頭上，一邊抖一邊填。',
    ],
    chain: [
      '雪地上有一串腳印，每步都連住上一步。阿墨說：「呢條路同接龍一樣，要一環扣一環喵。」',
      '山風吹過，溫泉的霧氣散開，露出刻滿字的石階，一級接一級通上山頂。',
      '糰子把凍僵的貓爪呵暖，繼續把成語一句一句接落去。',
    ],
  },
  5: {
    fill: [
      '海邊燈塔一閃一閃，漁夫貓在岸邊補網，順便考糰子幾個成語。糰子盯着濕漉漉的石板努力想。',
      '浪花拍上石灘，帶來幾張濕透的字卡。阿墨說：「睇清楚字嘅位置，先擺得啱喵。」',
      '燈塔的光掃過海面，糰子數着浪聲，一筆一筆把字填好。',
    ],
    chain: [
      '漁夫貓教糰子：「成語好似海浪，一波接一波，尾字連住下句頭字先至順喵。」',
      '燈塔下的石階濕滑，糰子小心翼翼，把成語一句接一句排上階梯。',
      '海風把燈籠吹得搖搖晃晃，阿墨按住紙鎮，讓糰子繼續接龍。',
    ],
  },
  6: {
    fill: [
      '星空詩會開始了，貓貓圍坐草地，天上星星排成缺字的句子，等大家一齊補完。',
      '阿墨仰頭數星，說每顆星都係一個字：「擺啱位，滿天就係一篇好文章喵。」',
      '流星劃過，糰子連忙許願：「希望今晚啲字都乖乖歸位！」惹得眾貓笑起來。',
    ],
    chain: [
      '星星一顆接一顆，連成一條銀河。糰子要順住星軌，把成語一句接一句串起來。',
      '詩會上，眾貓輪流吟句，尾字一落，下一隻貓就接住，熱鬧得像星光流動。',
      '夜風微涼，糰子把最後一顆星接回位，天上的銀河忽然亮了幾分喵。',
    ],
  },
  7: {
    fill: [
      '燈會市集人山人海，猜燈謎的貓貓排成長龍。糰子擠到最前面，發現謎面是一句缺字的成語。',
      '紅燈籠高掛，阿墨在攤位前挑字卡，笑說：「猜燈謎同填字一樣，要眼利心細喵。」',
      '糖葫蘆的甜味飄過來，糰子一邊流口水，一邊努力把字放回燈謎紙上。',
    ],
    chain: [
      '花燈一盞接一盞，燈謎一句接一句。糰子沿着燈串走，把成語逐句接好。',
      '舞獅經過市集，鼓聲一響，眾貓齊聲接龍，聲浪蓋過整條街喵。',
      '阿墨舉起燈籠照亮謎紙，糰子把尾字連首字，總算解開了整串燈謎。',
    ],
  },
  8: {
    fill: [
      '雨後石巷反着光，屋簷滴水答答。青苔爬滿牆角，石板上的字卻格外清楚。',
      '糰子撐着小傘，跳過水氹，替阿墨把濕石板上的字卡擺好。',
      '阿墨說：「成語要似雨後青苔，慢慢浸出來先記得住喵。」糰子似懂非懂地點頭。',
    ],
    chain: [
      '雨點一串串落下來，阿墨指着屋簷：「水珠連水珠，成語都係一句接一句喵。」',
      '石巷盡頭有塊老石碑，刻住一疊成語，尾字連住下一句開頭，一直延伸到巷口。',
      '雨停了，糰子收起傘，把最後一句接好，石巷上空現出一道彩虹。',
    ],
  },
  9: {
    fill: [
      '雲端書樓浮在雲海之上，書頁被風吹得獵獵作響。糰子踏着雲梯，一層一層往上填字。',
      '阿墨翻着書樓的目錄說：「呢度收埋你一路學過嘅成語，今日要好好溫習喵。」',
      '白雲從窗外飄過，糰子伸手想捉，卻只捉到一張字卡。',
    ],
    chain: [
      '書樓每一層都有成語排成階梯，糰子要沿着尾字接首字，一路行到最高層。',
      '雲海翻湧，阿墨扶穩書架：「接龍要穩，唔好急，一句接好先想下一句喵。」',
      '書頁疊成雲梯，糰子把成語接成一條長長的雲路，直通樓頂。',
    ],
  },
  10: {
    fill: [
      '穿過雲層，成語之巔就在眼前。山風很大，糰子按住帽子，把最後幾塊石碑上的字補好。',
      '頂峰的石碑刻滿一路走來的成語，阿墨說：「填好呢幾句，靈珠就會醒喵。」',
      '雲在腳下流動，糰子深吸一口氣，覺得自己好像長高了一點。',
    ],
    chain: [
      '最後一段山路是成語砌成的階梯，每級都以尾字連住下一級，一直通往山頂。',
      '阿墨與糰子並肩站在山道，成語靈珠在前面發光，等着最後的接龍喵。',
      '山風把紙卡吹得啪啪作響，糰子咬緊牙關，一句一句把成語接上頂峰。',
    ],
  },
  // ── 進階篇（第 11–20 章）──
  11: {
    fill: [
      '藏經閣的門一開，古老書卷的氣味撲面而來。糰子踩着書梯往上爬，發現每一頁都缺了幾個字，等着有人補回去喵。',
      '阿墨把油燈掛在書架上，輕聲說：「呢度嘅成語比外面深好多，慢慢睇，唔好急。」糰子點點頭，爪子已經按在字卡上。',
      '經閣深處傳來翻頁聲，一本古書自動攤開，露出缺字的句子。糰子湊近一聞，滿鼻子都是墨香。',
    ],
    chain: [
      '藏經閣的書脊排成一條長梯，阿墨說：「接龍就似爬書梯，一級接一級，唔可以斷喵。」',
      '古卷在桌上鋪開，字與字首尾相連，像一條沉睡的紙龍，等糰子把牠接醒。',
      '夜深了，經閣只剩一盞燈。糰子把成語一句一句接好，書架上的靈珠也一顆一顆亮起。',
    ],
  },
  12: {
    fill: [
      '熱風捲着火星撲面而來，火山口的岩石上卻刻滿了字。糰子抹一抹額頭的汗，把字卡按進發燙的石縫裏。',
      '阿墨用尾巴擋住飛濺的火屑：「呢度嘅成語都係喺火裏煉出嚟嘅，要夠定先填得到喵。」',
      '熔岩在腳下緩緩流動，糰子盯着石碑上的缺字，忽然覺得自己嘅貓爪都燙熱起來。',
    ],
    chain: [
      '岩漿沿着石溝流成一條紅線，阿墨說：「一環扣一環，火先會順住路走，接龍都係一樣喵。」',
      '火山深處的回聲一下接一下，像有隻大火貓在唸成語，糰子要跟住節奏一句一句接落去。',
      '火光映紅了糰子的臉，她把最後一句接好，火山口忽然噴出一串金色火花。',
    ],
  },
  13: {
    fill: [
      '大漠的風沙一陣一陣，把古老石碑吹得若隱若現。糰子用尾巴掃開沙粒，露出缺字的碑文。',
      '阿墨遞來一壺水：「沙漠裏最緊要係耐性，字同水一樣，慢慢等就會出現喵。」',
      '夕陽把沙丘染成金色，糰子蹲在石碑前，把一張張字卡排在沙上。',
    ],
    chain: [
      '駝鈴一聲接一聲，在空曠嘅大漠傳得好遠。阿墨說：「鈴聲唔會斷，成語都唔可以斷喵。」',
      '沙丘上留着長長嘅腳印，每一步都接住上一步，糰子順住腳印把成語接落去。',
      '入夜後沙漠凍得刺骨，糰子縮成一團毛球，總算把最後一句接好，遠方出現咗綠洲嘅燈光。',
    ],
  },
  14: {
    fill: [
      '極光在天上流動，冰原上嘅冰塊封住一個又一個成語。糰子踮起腳，用肉球融化冰面。',
      '阿墨指住冰川深處：「冰入面嘅字睇落好遠，其實伸手就摸得到，慢慢試喵。」',
      '寒風吹過，糰子嘅鬍鬚結咗霜，但佢仍然盯住冰中嘅缺字，一張一張咁對。',
    ],
    chain: [
      '極光一浪接一浪掠過天際，阿墨說：「光會一直接落去，成語都係咁，尾字連首字喵。」',
      '冰原上嘅腳印喺極光下發亮，糰子順住光路，把一句又一句成語接埋一齊。',
      '融冰嘅水滴滴答答，糰子把最後一句接好，冰原中央嘅巨大冰晶忽然透出七彩光芒。',
    ],
  },
  15: {
    fill: [
      '海水從四面八方湧來，龍宮嘅珊瑚牆上卻乾乾淨淨咁刻住字。糰子屏住呼吸，把字卡放進珊瑚縫。',
      '龍王貓擺擺尾：「龍宮收藏嘅成語都有幾百年歷史，你要用心睇清楚每一筆喵。」',
      '氣泡一串串升起，糰子喺水底慢慢移動，生怕一用力就把字卡沖走。',
    ],
    chain: [
      '龍宮嘅珍珠串成一條長鏈，阿墨說：「珍珠一顆接一顆，成語都係一句接一句喵。」',
      '水底嘅光一閃一閃，照住龍柱上嘅成語，糰子順住光線把字句接埋一齊。',
      '龍王貓滿意咁點頭，糰子把最後一句接好，龍宮頂上嘅水柱忽然衝出水面。',
    ],
  },
  16: {
    fill: [
      '天空之城浮在雲海之上，風車轉得好快，城牆上嘅成語卻一個字都冇吹走。糰子抓緊字卡，一步步走近。',
      '阿墨望向遠方：「呢度離地好高，但字同地面一樣，都要一筆一筆放啱位喵。」',
      '雲從腳邊飄過，糰子覺得自己好似企喺棉花上面，小心翼翼咁填住字。',
    ],
    chain: [
      '天空之城嘅飛橋一段接一段，阿墨說：「橋要接得穩先行得到，成語都一樣喵。」',
      '風車轉一圈，就有一句成語喺城牆上亮起，糰子要順住風把字句一句一句接住。',
      '鐘聲喺雲端迴響，糰子把最後一句接好，成座天空之城都亮起溫柔嘅藍光。',
    ],
  },
  17: {
    fill: [
      '貓神古廟香火裊裊，籤筒裏嘅籤文寫滿成語。糰子恭恭敬敬咁抽出一支，發現上面缺了字。',
      '阿墨合掌行禮：「問貓神之前，先要自己諗清楚。呢啲字，其實你已經學過喵。」',
      '廟前石階長滿青苔，糰子坐喺階上，把字卡一張一張排好，個心都靜落嚟。',
    ],
    chain: [
      '古廟嘅籤文一句接一句，像貓神喺耳邊低語。糰子要專心聽，先接得落去喵。',
      '鐘聲一響接一響，香火嘅煙一縷接一縷，阿墨說：「呢啲都係提醒你，接龍要心定。」',
      '神龕前嘅燈忽然明亮，糰子把最後一句接好，籤筒裏嘅籤文化成点点金光。',
    ],
  },
  18: {
    fill: [
      '夜航碼頭燈火點點，船帆上寫滿成語。船長貓叉住腰：「解唔開帆上嘅字，今晚就出唔到海喵。」',
      '阿墨蹲喺碼頭邊，指着水面倒影：「睇清楚啲，字有時會喺水入面出現。」',
      '浪聲拍住岸邊，糰子把字卡排在貨箱上，海風一吹，差點連貓都吹走。',
    ],
    chain: [
      '船纜一條接一條綁喺碼頭柱上，阿墨說：「纜要接得實，成語要接得順喵。」',
      '碼頭嘅燈塔一閃一接一閃，為夜航嘅貓船引路，糰子順住燈光把成語接好。',
      '汽笛聲響起，糰子把最後一句接好，貓船慢慢駛離碼頭，向住星光出發。',
    ],
  },
  19: {
    fill: [
      '螢火竹林嘅夜晚特別靜，點點螢光落喺竹節上，照亮缺字嘅成語。糰子伸手去捉，螢火卻調皮咁飛走。',
      '阿墨笑住話：「螢火蟲鍾意安靜嘅貓，你慢慢嚟，佢哋自然會停喺你爪邊喵。」',
      '竹葉沙沙作響，糰子屏住呼吸，把字卡輕輕放上竹節。',
    ],
    chain: [
      '螢火一點接一點，連成一條光帶。阿墨說：「光帶唔會斷，成語都唔可以斷喵。」',
      '竹節一節接一節，糰子順住竹身往上，把成語一句一句接喺竹葉之間。',
      '夜深到連蟲聲都靜咗，糰子把最後一句接好，成片竹林忽然亮起萬點螢光。',
    ],
  },
  20: {
    fill: [
      '蒼穹之巔，星空近得好像伸手就摸到。二十個場景嘅靈珠圍成一圈，中間嘅石碑上寫住最後幾句成語。',
      '阿墨同糰子並肩而立：「由櫻花小徑行到呢度，你學識嘅每一句，今日都會用得着喵。」',
      '流星一顆一顆劃過，糰子深吸一口氣，把最後幾張字卡放上石碑。',
    ],
    chain: [
      '星軌一道接一道掠過蒼穹，阿墨說：「最後一段路，要一口氣接到尾喵。」',
      '二十顆靈珠依次亮起，光連住光，成語接住成語，整片蒼穹都在輕輕震動。',
      '糰子把最後一句接好，成語靈珠同時綻放，貓貓世界嘅星空亮得比任何時候都要璀璨。',
    ],
  },
};

/** 章末考驗專屬故事（每章 1 段；level 100 用 FINAL_STORY） */
const BOSS_STORIES = [
  '櫻花小徑盡頭立着一塊大石碑，阿墨說這是第一章最後的考驗。糰子深吸一口氣，把學過的字都想了出來喵。',
  '竹林迷宮最深處，竹節排成一道大門，門上滿是缺字。過了這關，就能走出迷宮喵。',
  '月下書齋最深一層，古籍圍成一圈，中間的靈珠微微發亮。阿墨說：「呢個係月下最後一課喵。」',
  '雪山溫泉的山頂，石碑被雪覆蓋，只露出幾個字。糰子要用一路所學，把碑文補完先落得山。',
  '燈塔最頂層的房間，漁夫貓留下的最後一道謎題就刻在牆上。海風從窗口灌入，糰子抓緊字卡喵。',
  '星空詩會的最後一首詩還未完成，眾貓都望着糰子。阿墨笑說：「今晚嘅壓軸，交畀你喵。」',
  '燈會尾聲，最大的一盞花燈仍未亮起，燈謎紙上滿是空白。阿墨說解開它就係今晚嘅壓軸喵。',
  '雨後石巷的盡頭，老石碑上的字被雨水沖得模糊。糰子要用一路記住的成語，把碑文重新填好。',
  '雲端書樓最高一層，書架圍成圓環，阿墨把最後一本書放到糰子面前：「溫習完就可以上山頂喵。」',
  '成語之巔的考驗就在眼前，靈珠懸在半空，等着最後幾句成語歸位喵。',
  '藏經閣最高一層，古卷圍成圓環，最後一頁仍然空白，等住糰子把成語填回去喵。',
  '火山口邊緣，烈焰圍成一圈，最後一塊石碑喺熱浪中浮現。呢關考驗嘅係膽量同記性喵。',
  '大漠盡頭嘅古城遺址，風沙掩住最後一道碑文，糰子要用一路所學，把字句吹開。',
  '極光最亮嘅一刻，冰原中央嘅巨冰開始融化，最後一串成語就封喺入面喵。',
  '龍宮正殿，龍王貓端坐寶座，最後一道考驗化成珍珠陣，要逐顆解開先可以返上水面。',
  '天空之城最高塔頂，風大得幾乎站唔穩，最後嘅成語刻喺隨風轉動嘅風車上。',
  '貓神古廟大殿，籤筒只餘最後一支籤。解開籤文，就可以得到貓神嘅祝福喵。',
  '夜航碼頭最遠嘅泊位，船長貓升起主帆，帆上嘅最後一句成語等住糰子補完。',
  '螢火竹林最深處，成千上萬螢火蟲排成一句成語，要喺熄滅之前記住佢喵。',
  '蒼穹之巔嘅最後一道考驗，二十顆靈珠懸浮半空，等住最後一串成語歸位喵。',
];

const FINAL_STORY =
  '穿過雲層，阿墨與糰子終於站在成語之巔。十個場景的靈珠在腳下亮起，最後一串成語接好，整個貓貓世界都會亮起來喵！';

const ADVANCED_FINAL_STORY =
  '蒼穹之巔，二十顆成語靈珠同時亮起，星光灑落整個貓貓世界。阿墨與糰子並肩而坐，看着一路走來的字句化成星河——成語冒險，圓滿落幕喵！';

/* ------------------------------------------------------------------ */
/* 通用工具（deterministic RNG / shuffle / 驗證小工具）                 */
/* ------------------------------------------------------------------ */

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const isHanzi = (char) => /^[\u3400-\u4dbf\u4e00-\u9fff]$/.test(char);
const mean = (list) => (list.length === 0 ? 0 : list.reduce((a, b) => a + b, 0) / list.length);
const round2 = (value) => Math.round(value * 100) / 100;

/** mulberry32：回傳 [0, 1) 的 deterministic PRNG */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 由關卡 id、重試次數、salt 決定 seed（同資料下完全可重現） */
function seedForLevel(id, attempt, salt) {
  let h = 0x811c9dc5;
  for (const value of [id, attempt + 1, salt + 1]) {
    h = Math.imul(h ^ (value >>> 0), 0x01000193);
    h = (h ^ (h >>> 13)) >>> 0;
  }
  return (h ^ 0x9e3779b9) >>> 0;
}

function shuffle(list, rng) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickOne(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

/* ------------------------------------------------------------------ */
/* 資料載入                                                            */
/* ------------------------------------------------------------------ */

function loadIdioms(path) {
  let raw;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`讀取成語資料失敗（${path}）：${error.message}`);
  }
  if (!Array.isArray(raw)) throw new Error(`${path} 必須係 JSON array`);

  const idioms = [];
  const byId = new Map();
  const byWord = new Map();
  for (let index = 0; index < raw.length; index += 1) {
    const entry = raw[index] ?? {};
    const id = String(entry.id ?? '').trim();
    const word = String(entry.word ?? '').trim();
    const chars = Array.from(word);
    const tier = Number(entry.tier);
    if (!id) throw new Error(`idioms.json 第 ${index + 1} 條缺少 id`);
    if (chars.length !== 4 || !chars.every(isHanzi)) {
      throw new Error(`成語「${word || id}」唔係正好 4 個漢字（第 ${index + 1} 條）`);
    }
    if (!Number.isInteger(tier) || tier < 1 || tier > 5) {
      throw new Error(`成語「${word}」tier 唔係 1–5 整數（第 ${index + 1} 條）`);
    }
    if (byId.has(id)) throw new Error(`成語 id 重複：${id}`);
    if (byWord.has(word)) throw new Error(`成語 word 重複：${word}`);
    const idiom = { id, word, chars, tier };
    idioms.push(idiom);
    byId.set(id, idiom);
    byWord.set(word, idiom);
  }
  if (idioms.length < 6) {
    throw new Error(`idioms.json 只有 ${idioms.length} 條成語，不足以生成關卡（最少 6 條）`);
  }
  return { idioms, byId, byWord };
}

function loadChapters(path) {
  let raw;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`讀取章節資料失敗（${path}）：${error.message}`);
  }
  if (!Array.isArray(raw) || raw.length !== CHAPTER_COUNT) {
    throw new Error(`${path} 必須係 ${CHAPTER_COUNT} 章嘅 JSON array`);
  }
  const chapters = raw
    .map((entry) => ({
      id: Number(entry?.id),
      name: String(entry?.name ?? ''),
      scene: String(entry?.scene ?? ''),
      blurb: String(entry?.blurb ?? ''),
    }))
    .sort((a, b) => a.id - b.id);
  chapters.forEach((chapter, index) => {
    if (chapter.id !== index + 1) throw new Error(`chapters.json id 必須 1–${CHAPTER_COUNT} 連續`);
    if (!CHAPTER_SCENES.includes(chapter.scene)) {
      throw new Error(`第 ${chapter.id} 章 scene「${chapter.scene}」唔喺允許清單`);
    }
    if (!chapter.name) throw new Error(`第 ${chapter.id} 章缺少 name`);
  });
  return chapters;
}

function createContext(idiomData, chapters, salt) {
  const idioms = idiomData.idioms;
  const byChar = new Map();
  const byFirst = new Map();
  const byTier = new Map();
  for (let tier = 1; tier <= 5; tier += 1) byTier.set(tier, []);

  for (const idiom of idioms) {
    const seen = new Set();
    for (const char of idiom.chars) {
      if (seen.has(char)) continue;
      seen.add(char);
      if (!byChar.has(char)) byChar.set(char, []);
      byChar.get(char).push(idiom);
    }
    const first = idiom.chars[0];
    if (!byFirst.has(first)) byFirst.set(first, []);
    byFirst.get(first).push(idiom);
    byTier.get(idiom.tier).push(idiom);
  }

  const maxChainLength = computeMaxChainLength(idioms, byFirst);

  return {
    idioms,
    idiomById: idiomData.byId,
    chapters,
    byChar,
    byFirst,
    byTier,
    allChars: [...byChar.keys()],
    usage: new Map(idioms.map((idiom) => [idiom.id, 0])),
    signatures: new Set(),
    fullSignatures: new Set(),
    allowSimilarUsed: false,
    maxChainLength,
    warnings: [],
    salt,
  };
}

/**
 * 全資料庫可達嘅最長接龍長度（上限 6）。
 * 用途：當 idioms.json 未夠接龍連接字時，提早知道要 fallback 到較短 chain，
 * 避免白白重試。
 */
function computeMaxChainLength(idioms, byFirst) {
  let best = 1;
  let expansions = 0;
  const dfs = (idiom, used, depth) => {
    best = Math.max(best, depth);
    if (best >= MAX_CHAIN_WORDS || depth >= MAX_CHAIN_WORDS || expansions > 400000) return;
    for (const next of byFirst.get(idiom.chars[3]) ?? []) {
      if (used.has(next.id)) continue;
      if (expansions > 400000) return;
      expansions += 1;
      used.add(next.id);
      dfs(next, used, depth + 1);
      used.delete(next.id);
    }
  };
  for (const idiom of idioms) {
    if (best >= MAX_CHAIN_WORDS) break;
    dfs(idiom, new Set([idiom.id]), 1);
  }
  return Math.min(best, MAX_CHAIN_WORDS);
}

/* ------------------------------------------------------------------ */
/* 難度曲線公式（單一事實來源）                                          */
/* ------------------------------------------------------------------ */

const chapterForLevel = (id) => Math.floor((id - 1) / LEVELS_PER_CHAPTER) + 1;
/** 基礎篇難度 d = (id-1)/99（PLAN §4.4） */
const difficultyForLevel = (id) => (id - 1) / (BASE_LEVELS - 1);
/** 進階篇難度 d2 = (id-101)/99（PLAN §4.5） */
const advancedDifficultyForLevel = (id) =>
  (id - (BASE_LEVELS + 1)) / (TOTAL_LEVELS - BASE_LEVELS - 1);
/** 全 200 關嘅整體進度（統計／Pearson 用） */
const progressForLevel = (id) => (id - 1) / (TOTAL_LEVELS - 1);
const isAdvancedLevel = (id) => id > BASE_LEVELS;
const isChainLevel = (id) => id >= CHAIN_START_LEVEL && id % CHAIN_EVERY === 0;

function fillWordCountForLevel(id) {
  if (isAdvancedLevel(id)) {
    return Math.min(MAX_ADVANCED_FILL_WORDS, 4 + Math.round(advancedDifficultyForLevel(id)));
  }
  return Math.min(MAX_FILL_WORDS, MIN_FILL_WORDS + Math.round(2 * difficultyForLevel(id)));
}

function chainWordCountForLevel(id) {
  if (isAdvancedLevel(id)) {
    return Math.min(MAX_CHAIN_WORDS, 6 + Math.round(advancedDifficultyForLevel(id)));
  }
  return Math.min(6, MIN_CHAIN_WORDS + Math.round(3 * difficultyForLevel(id)));
}

function blankRatioForLevel(id) {
  if (isAdvancedLevel(id)) {
    return 0.6 + 0.12 * advancedDifficultyForLevel(id);
  }
  return BLANK_RATIO_START + (BLANK_RATIO_END - BLANK_RATIO_START) * difficultyForLevel(id);
}

function hintLimitForLevel(id) {
  return HINTS_BY_CHAPTER[chapterForLevel(id) - 1];
}

function decoyCountForLevel(id) {
  return DECOYS_BY_CHAPTER[chapterForLevel(id) - 1];
}

/**
 * 進階篇誘餌字數：目標跟章節曲線，但受 bank 上限（≤22 張）約束。
 * bank = 空格格數（去重） + 誘餌；所以誘餌 = min(章節目標, 22 - 空格數)。
 */
function decoyCountWithBudget(id, blankCount) {
  const target = decoyCountForLevel(id);
  if (!isAdvancedLevel(id)) return target;
  return Math.max(0, Math.min(target, BANK_MAX_ADVANCED - blankCount));
}

/**
 * 目標空格數。
 * - 基礎篇分母＝所有 slot 字數（4 × 成語數，PLAN §4.4）。
 * - 進階篇分母相同，空格比例 0.60 → 0.72（PLAN §4.5）；因每個成語最多 4 格、
 *   棋盤格數 = 3n+1，實際上限會 clamp（見 docs/LEVEL_DESIGN.md 進階篇章節）。
 * - chain 關因「row0 全顯示、row i≥1 首字顯示、row i<尾 尾字顯示」嘅
 *   結構限制，空格數上限 = 2k-1。
 */
function targetBlankCountForLevel(id, mode, wordCount) {
  const totalChars = wordCount * 4;
  const ratio = blankRatioForLevel(id);
  if (mode === 'chain') {
    const minBlanks = Math.max(2, wordCount - 1);
    const maxBlanks = 2 * wordCount - 1;
    return clamp(Math.round(ratio * totalChars), minBlanks, maxBlanks);
  }
  if (isAdvancedLevel(id)) {
    // 進階篇：棋盤格數 3n+1；最少保留 2 個 given（其餘可以空）
    const maxBlanks = Math.max(1, 3 * wordCount + 1 - 2);
    return clamp(Math.round(ratio * totalChars), 2, maxBlanks);
  }
  return clamp(Math.round(ratio * totalChars), 1, 3 * wordCount);
}

function tierTargetForLevel(id) {
  if (isAdvancedLevel(id)) {
    return ADV_FILL_TIER_TARGET_START + ADV_FILL_TIER_TARGET_SPAN * advancedDifficultyForLevel(id);
  }
  return TIER_TARGET_START + TIER_TARGET_SPAN * difficultyForLevel(id);
}

/**
 * chain 關專用嘅溫和 tier 目標。
 * 基礎篇：2.6 → 4.0（接龍要保留 tier≤2 錨，實際平均上限約 3.5）。
 * 進階篇：3.9 → 4.6（錨放寬到 tier≤3，用較冷僻成語；見 LEVEL_DESIGN）。
 */
function chainTierTargetForLevel(id) {
  if (isAdvancedLevel(id)) {
    return (
      ADV_CHAIN_TIER_TARGET_START +
      ADV_CHAIN_TIER_TARGET_SPAN * advancedDifficultyForLevel(id)
    );
  }
  return CHAIN_TIER_TARGET_START + CHAIN_TIER_TARGET_SPAN * difficultyForLevel(id);
}

/** 每關錨點 tier 上限：基礎篇 ≤2；進階篇 ≤3（避免全冷僻） */
function anchorTierLimitForLevel(id) {
  return isAdvancedLevel(id) ? 3 : 2;
}

function sampleTargetTier(id, rng) {
  if (isAdvancedLevel(id)) {
    const jitter = (rng() + rng() + rng() - 1.5) * 1.35;
    const floor = advancedDifficultyForLevel(id) > 0.55 ? 4 : 3;
    return clamp(Math.round(tierTargetForLevel(id) + jitter), floor, 5);
  }
  const d = difficultyForLevel(id);
  const jitter = (rng() + rng() + rng() - 1.5) * 1.35;
  // 後段非錨成語唔應該跌返落 tier 1／2（錨已經保證有一個低 tier）
  const floor = d > 0.72 ? 3 : d > 0.4 ? 2 : 1;
  return clamp(Math.round(tierTargetForLevel(id) + jitter), floor, 5);
}

function pickAnchorTier(id, rng) {
  if (isAdvancedLevel(id)) {
    // 進階篇：錨統一用 tier 3（符合「錨 tier ≤3」＋推高章節平均 tier）
    return 3;
  }
  const d = difficultyForLevel(id);
  if (d < 0.2) return 1; // 第 1–2 章：tier 1 錨帶路
  if (d < 0.55) return rng() < 0.5 ? 1 : 2;
  return rng() < 0.2 ? 1 : 2; // 後段盡量用 tier 2 錨，等整體平均 tier 上得去
}

/* ------------------------------------------------------------------ */
/* 成語選擇                                                            */
/* ------------------------------------------------------------------ */

const useCount = (ctx, idiom) => ctx.usage.get(idiom.id) ?? 0;

function markUsage(ctx, usedIdioms) {
  for (const idiom of usedIdioms) {
    ctx.usage.set(idiom.id, (ctx.usage.get(idiom.id) ?? 0) + 1);
  }
}

/** 揀錨（tier ≤ 2）；早期優先 tier 1，後期交替 1/2；用量越低越優先 */
function chooseAnchorIdiom(ctx, id, rng, excludeIds) {
  const wantTier = pickAnchorTier(id, rng);
  const pool = [
    ...(ctx.byTier.get(1) ?? []),
    ...(ctx.byTier.get(2) ?? []),
    ...(isAdvancedLevel(id) ? ctx.byTier.get(3) ?? [] : []),
  ].filter((idiom) => !excludeIds || !excludeIds.has(idiom.id));
  if (pool.length === 0) return null;
  const scored = pool
    .map((idiom) => ({
      idiom,
      score: Math.abs(idiom.tier - wantTier) * 2 + Math.min(useCount(ctx, idiom), 8) * 0.8 + rng() * 2.2,
    }))
    .sort((a, b) => a.score - b.score);
  return scored[0].idiom;
}

/** 由棋盤現有字搵可以交叉嘅成語（未用過） */
function collectCrossingCandidates(ctx, board, usedIds) {
  const found = new Map();
  for (const cell of board.values()) {
    for (const idiom of ctx.byChar.get(cell.char) ?? []) {
      if (usedIds.has(idiom.id) || found.has(idiom.id)) continue;
      found.set(idiom.id, idiom);
    }
  }
  return [...found.values()];
}

function rankFillCandidates(ctx, candidates, targetTier, rng) {
  return candidates
    .map((idiom) => ({
      idiom,
      score:
        Math.abs(idiom.tier - targetTier) * 2.6 +
        Math.min(useCount(ctx, idiom), 10) * 0.22 +
        rng() * 0.9,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 120)
    .map((item) => item.idiom);
}

/* ------------------------------------------------------------------ */
/* fill：幾何生成（成語交叉擺位）                                        */
/* ------------------------------------------------------------------ */

const keyOf = (row, col) => `${row}:${col}`;

/**
 * 計算一個成語可以擺喺棋盤邊個位置。
 * strict：必須同現有棋盤「剛好 1 格」重疊（乾淨十字交叉）。
 * relaxed：容許 1–3 格重疊（資料非常稀疏時 fallback），重疊字必須一致。
 */
function placementOptions(idiom, board, relaxed, rng) {
  const boardCells = [...board.values()];
  if (boardCells.length === 0) return [];
  let minRow = Infinity;
  let maxRow = -Infinity;
  let minCol = Infinity;
  let maxCol = -Infinity;
  for (const cell of boardCells) {
    minRow = Math.min(minRow, cell.r);
    maxRow = Math.max(maxRow, cell.r);
    minCol = Math.min(minCol, cell.c);
    maxCol = Math.max(maxCol, cell.c);
  }
  const area = (maxRow - minRow + 1) * (maxCol - minCol + 1);
  const options = [];

  for (const dir of ['h', 'v']) {
    for (const anchorCell of boardCells) {
      for (let index = 0; index < 4; index += 1) {
        if (idiom.chars[index] !== anchorCell.char) continue;
        const startRow = dir === 'h' ? anchorCell.r : anchorCell.r - index;
        const startCol = dir === 'h' ? anchorCell.c - index : anchorCell.c;
        const coords = [];
        let overlap = 0;
        let ok = true;
        for (let offset = 0; offset < 4; offset += 1) {
          const row = dir === 'h' ? startRow : startRow + offset;
          const col = dir === 'h' ? startCol + offset : startCol;
          coords.push([row, col]);
          const existing = board.get(keyOf(row, col));
          if (existing) {
            overlap += 1;
            if (existing.char !== idiom.chars[offset]) {
              ok = false;
              break;
            }
          }
        }
        if (!ok) continue;
        if (relaxed ? overlap < 1 || overlap >= 4 : overlap !== 1) continue;
        let nextMinRow = minRow;
        let nextMaxRow = maxRow;
        let nextMinCol = minCol;
        let nextMaxCol = maxCol;
        for (const [row, col] of coords) {
          nextMinRow = Math.min(nextMinRow, row);
          nextMaxRow = Math.max(nextMaxRow, row);
          nextMinCol = Math.min(nextMinCol, col);
          nextMaxCol = Math.max(nextMaxCol, col);
        }
        const nextArea = (nextMaxRow - nextMinRow + 1) * (nextMaxCol - nextMinCol + 1);
        options.push({ dir, row: startRow, col: startCol, growth: nextArea - area, tie: rng() });
      }
    }
  }
  return options;
}

function addWordToBoard(board, slots, usedIds, idiom, option) {
  for (let offset = 0; offset < 4; offset += 1) {
    const row = option.dir === 'h' ? option.row : option.row + offset;
    const col = option.dir === 'h' ? option.col + offset : option.col;
    const key = keyOf(row, col);
    if (!board.has(key)) board.set(key, { r: row, c: col, char: idiom.chars[offset] });
  }
  slots.push({ idiomId: idiom.id, row: option.row, col: option.col, dir: option.dir });
  usedIds.add(idiom.id);
}

function normalizeGeometry(board, slots, limit) {
  const cells = [...board.values()];
  const minRow = Math.min(...cells.map((cell) => cell.r));
  const minCol = Math.min(...cells.map((cell) => cell.c));
  const maxRow = Math.max(...cells.map((cell) => cell.r));
  const maxCol = Math.max(...cells.map((cell) => cell.c));
  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;
  if (rows > limit || cols > limit) return null;
  const normalizedCells = cells
    .map((cell) => ({ r: cell.r - minRow, c: cell.c - minCol, char: cell.char }))
    .sort((a, b) => a.r - b.r || a.c - b.c);
  const normalizedSlots = slots.map((slot) => ({
    idiomId: slot.idiomId,
    row: slot.row - minRow,
    col: slot.col - minCol,
    dir: slot.dir,
  }));
  return { rows, cols, cells: normalizedCells, slots: normalizedSlots };
}

function attemptFillGeometry(ctx, id, wordCount, rng, relaxed, dimLimit) {
  const board = new Map();
  const slots = [];
  const usedIds = new Set();

  const anchor = chooseAnchorIdiom(ctx, id, rng, usedIds);
  if (!anchor) return null;
  const anchorDir = rng() < 0.5 ? 'h' : 'v';
  addWordToBoard(board, slots, usedIds, anchor, { dir: anchorDir, row: 0, col: 0 });

  for (let index = 1; index < wordCount; index += 1) {
    const targetTier = sampleTargetTier(id, rng);
    const candidates = collectCrossingCandidates(ctx, board, usedIds);
    if (candidates.length === 0) return null;
    const ranked = rankFillCandidates(ctx, candidates, targetTier, rng);
    let placed = false;
    for (const idiom of ranked) {
      const options = placementOptions(idiom, board, relaxed, rng);
      if (options.length === 0) continue;
      options.sort((a, b) => a.growth - b.growth || a.tie - b.tie);
      const top = options.slice(0, Math.min(3, options.length));
      const chosen = pickOne(top, rng);
      addWordToBoard(board, slots, usedIds, idiom, chosen);
      placed = true;
      break;
    }
    if (!placed) return null;
  }
  const geometry = normalizeGeometry(board, slots, dimLimit);
  if (!geometry) return null;
  // 避免出現 1×7 或 7×1 嘅「直線棋盤」：填字關一定要有橫有直先似填字
  if (!geometry.slots.some((slot) => slot.dir === 'h')) return null;
  if (!geometry.slots.some((slot) => slot.dir === 'v')) return null;
  return geometry;
}

function slotCellKeys(slot) {
  const keys = [];
  for (let index = 0; index < 4; index += 1) {
    keys.push(slot.dir === 'h' ? keyOf(slot.row, slot.col + index) : keyOf(slot.row + index, slot.col));
  }
  return keys;
}

/* ------------------------------------------------------------------ */
/* fill：空格選擇（每成語保留 1–3 個空格，即最少 1 個 given 提示字）     */
/* ------------------------------------------------------------------ */

/**
 * 由棋盤格之中揀「given 顯示字」，其餘做空格。
 * 目標：given 數 = 總格數 - targetBlanks；每個 slot 至少 1 個 given
 * （避免整個成語全空），最多 3 個 given（即每句至少 1 個空格，引擎先會
 * 有判定事件；同時保持可讀性）。
 */
function chooseGivens(geometry, targetBlanks, rng, options = {}) {
  const maxBlanksPerSlot = options.maxBlanksPerSlot ?? 3;
  // 每句最多 3 個 given（即每句最少 1 個空格，引擎先會有判定事件）
  const maxGivenPerSlot = 3;
  const allowPartialCoverage = options.allowPartialCoverage === true;
  const minGivenCells = options.minGivenCells ?? 1;
  const cellKeys = geometry.cells.map((cell) => keyOf(cell.r, cell.c));
  const cellSlots = new Map();
  const slotKeys = geometry.slots.map(slotCellKeys);
  slotKeys.forEach((keys, slotIndex) => {
    for (const key of keys) {
      if (!cellSlots.has(key)) cellSlots.set(key, []);
      const list = cellSlots.get(key);
      if (!list.includes(slotIndex)) list.push(slotIndex);
    }
  });
  const totalCells = cellKeys.length;
  const wantedGiven = totalCells - targetBlanks;
  if (wantedGiven < minGivenCells || wantedGiven >= totalCells) return null;

  for (let attempt = 0; attempt < 90; attempt += 1) {
    const given = new Set();
    const givenCount = slotKeys.map(() => 0);
    const addGiven = (key) => {
      given.add(key);
      for (const slotIndex of cellSlots.get(key)) givenCount[slotIndex] += 1;
    };
    const uncovered = new Set(slotKeys.map((_, slotIndex) => slotIndex));
    let stuck = false;

    // 第一步：set cover —— 用最少 given 覆蓋所有 slot（優先交叉格）。
    // 進階篇 given 太少時容許部分成語冇 given（難度高，但引擎照樣可解）。
    while (uncovered.size > 0) {
      let best = null;
      for (const key of cellKeys) {
        if (given.has(key)) continue;
        const slotsOf = cellSlots.get(key);
        if (!slotsOf.every((slotIndex) => givenCount[slotIndex] < maxGivenPerSlot)) continue;
        let cover = 0;
        for (const slotIndex of slotsOf) if (uncovered.has(slotIndex)) cover += 1;
        if (cover === 0) continue;
        const tie = rng();
        if (!best || cover > best.cover || (cover === best.cover && tie < best.tie)) {
          best = { key, cover, tie };
        }
      }
      if (!best) {
        if (allowPartialCoverage && given.size >= minGivenCells) break;
        stuck = true;
        break;
      }
      addGiven(best.key);
      for (const slotIndex of cellSlots.get(best.key)) uncovered.delete(slotIndex);
      if (given.size > wantedGiven) {
        stuck = true;
        break;
      }
      if (given.size === wantedGiven && allowPartialCoverage) break;
    }
    if (stuck) continue;
    if (!allowPartialCoverage && uncovered.size > 0) continue;

    // 第二步：補 given 到目標數量（每 slot 最多 3 個 given）
    for (const key of shuffle(cellKeys, rng)) {
      if (given.size >= wantedGiven) break;
      if (given.has(key)) continue;
      if (!cellSlots.get(key).every((slotIndex) => givenCount[slotIndex] < maxGivenPerSlot)) continue;
      addGiven(key);
    }
    if (given.size !== wantedGiven) continue;

    const blankKeys = cellKeys.filter((key) => !given.has(key));
    if (blankKeys.length !== targetBlanks) continue;
    const blanksPerSlot = slotKeys.map((keys) => keys.filter((key) => !given.has(key)).length);
    if (!blanksPerSlot.every((count) => count >= 1 && count <= maxBlanksPerSlot)) continue;
    return { given, blankKeys };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* bank 字庫                                                           */
/* ------------------------------------------------------------------ */

function buildBank(blankChars, decoyCount, ctx, rng) {
  const usedChars = new Set(blankChars);
  const pool = ctx.allChars.filter((char) => !usedChars.has(char));
  const decoys = shuffle(pool, rng).slice(0, decoyCount);
  // 極端細嘅資料庫（例如 6–12 條成語）先用重複字補夠數
  while (decoys.length < decoyCount) {
    decoys.push(pickOne(ctx.allChars, rng));
  }
  return shuffle([...blankChars, ...decoys], rng);
}

/* ------------------------------------------------------------------ */
/* 標題／故事                                                          */
/* ------------------------------------------------------------------ */

function buildMeta(ctx, id, mode, rng) {
  const chapter = chapterForLevel(id);
  const local = ((id - 1) % LEVELS_PER_CHAPTER) + 1;
  const title = `第 ${local} 課：${CHAPTER_TITLES[chapter - 1][local - 1]}`;
  let story;
  if (id === BASE_LEVELS) {
    // 基礎篇結局（Level 100 內容保持不變）
    story = FINAL_STORY;
  } else if (id === TOTAL_LEVELS) {
    // 進階篇最終結局
    story = ADVANCED_FINAL_STORY;
  } else if (local === LEVELS_PER_CHAPTER) {
    story = BOSS_STORIES[chapter - 1];
  } else {
    const pool = CHAPTER_STORIES[chapter]?.[mode] ?? CHAPTER_STORIES[chapter].fill;
    story = pickOne(pool, rng);
  }
  return { title, story };
}

/* ------------------------------------------------------------------ */
/* 關卡生成：fill                                                      */
/* ------------------------------------------------------------------ */

function finishFillLevel(ctx, id, geometry, rng, baseBlanks, blankCandidates, attemptIndex) {
  const chapter = chapterForLevel(id);
  const hintLimit = hintLimitForLevel(id);
  const advanced = isAdvancedLevel(id);
  const maxBlanksPerSlot = advanced ? 4 : 3;
  const givenOptions = advanced
    ? { allowPartialCoverage: true, maxBlanksPerSlot: 4, minGivenCells: 2 }
    : undefined;
  const solution = new Map(geometry.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
  const targetList = attemptIndex < 30 ? [baseBlanks] : blankCandidates;
  for (const targetBlanks of targetList) {
    const chosen = chooseGivens(geometry, targetBlanks, rng, givenOptions);
    if (!chosen) continue;
    const slots = geometry.slots.map((slot) => {
      const keys = slotCellKeys(slot);
      const blanks = [];
      keys.forEach((key, index) => {
        if (!chosen.given.has(key)) blanks.push(index);
      });
      return {
        idiomId: slot.idiomId,
        row: slot.row,
        col: slot.col,
        dir: slot.dir,
        blanks,
      };
    });
    if (!slots.every((slot) => slot.blanks.length >= 1 && slot.blanks.length <= maxBlanksPerSlot)) continue;
    const signature = `fill|${slots
      .map((slot) => slot.idiomId)
      .sort()
      .join(',')}`;
    const blankChars = chosen.blankKeys.map((key) => solution.get(key));
    const decoyCount = decoyCountWithBudget(id, chosen.blankKeys.length);
    const bank = buildBank(blankChars, decoyCount, ctx, rng);
    const meta = buildMeta(ctx, id, 'fill', rng);
    return {
      level: {
        id,
        chapter,
        mode: 'fill',
        title: meta.title,
        story: meta.story,
        rows: geometry.rows,
        cols: geometry.cols,
        cells: geometry.cells,
        slots,
        bank,
        hintLimit,
      },
      signature,
      usedIdioms: [...new Set(slots.map((slot) => ctx.idiomById.get(slot.idiomId)))],
      fallbackNote:
        Math.abs(chosen.blankKeys.length - baseBlanks) > 1
          ? `Level ${id}: 空格數由 ${baseBlanks} 調整為 ${chosen.blankKeys.length}（幾何／資料 fallback）`
          : null,
    };
  }
  return null;
}

function buildFillLevel(ctx, id, rng, forbiddenSignatures) {
  const advanced = isAdvancedLevel(id);
  const wordCount = fillWordCountForLevel(id);
  const baseBlanks = targetBlankCountForLevel(id, 'fill', wordCount);
  const blankCandidates = [baseBlanks, baseBlanks + 1, baseBlanks - 1].filter(
    (count) => count >= 1,
  );
  const d = difficultyForLevel(id);
  const targetMean = tierTargetForLevel(id);
  let best = null;

  for (let attempt = 0; attempt < MAX_BUILD_ATTEMPTS; attempt += 1) {
    const relaxed = advanced ? attempt >= 80 : attempt >= 60;
    // 基礎篇維持原本 9×9（fallback 11×11）；進階篇優先 ≤9×9，必要時放寬到 10×10。
    const dimLimit = advanced
      ? attempt < 40
        ? MAX_FILL_DIM
        : MAX_ADVANCED_FILL_DIM
      : relaxed
        ? MAX_FILL_DIM_RELAXED
        : MAX_FILL_DIM;
    const geometry = attemptFillGeometry(ctx, id, wordCount, rng, relaxed, dimLimit);
    if (!geometry) continue;
    // 品質閘：成語難度平均要貼近目標，否則換幾何再試（後段唔好變返低 tier）。
    // 若真係達唔到，最後用「最佳 tier 平均值」嘅幾何做 fallback。
    const tiers = geometry.slots.map((slot) => ctx.idiomById.get(slot.idiomId).tier);
    const tierAverage = mean(tiers);
    const highTierCount = tiers.filter((tier) => tier >= 4).length;
    const compositionSignature = `fill|${geometry.slots
      .map((slot) => slot.idiomId)
      .sort()
      .join(',')}`;
    const duplicate = forbiddenSignatures && forbiddenSignatures.has(compositionSignature);
    const meetsTier =
      !duplicate &&
      (advanced
        ? tierAverage + 0.5 >= targetMean && highTierCount >= Math.max(2, wordCount - 2)
        : tierAverage + 0.85 >= targetMean &&
          (d <= 0.72 || wordCount < 3 || highTierCount >= 2));
    if (!meetsTier) {
      if (!duplicate && (!best || tierAverage > best.tierAverage)) best = { geometry, tierAverage };
      continue;
    }
    const built = finishFillLevel(ctx, id, geometry, rng, baseBlanks, blankCandidates, attempt);
    if (built) return built;
  }
  if (best) {
    ctx.warnings.push(`Level ${id}: 成語 tier 未完全達標（交叉限制／資料 fallback，平均 tier ${best.tierAverage.toFixed(2)}）`);
    return finishFillLevel(ctx, id, best.geometry, rng, baseBlanks, blankCandidates, 30);
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* 關卡生成：chain                                                     */
/* ------------------------------------------------------------------ */

/** 隨機化深度優先搜尋接龍路徑（尾字 = 下一句首字） */
function dfsChain(ctx, start, length, targetTier, rng, noiseScale = 1.1) {
  const path = [start];
  const used = new Set([start.id]);
  let expansions = 0;

  const step = () => {
    if (path.length === length) return true;
    const last = path[path.length - 1].chars[3];
    const nexts = (ctx.byFirst.get(last) ?? []).filter((idiom) => !used.has(idiom.id));
    const ranked = nexts
      .map((idiom) => ({
        idiom,
        score:
          Math.abs(idiom.tier - targetTier) * 1.8 +
          Math.min(useCount(ctx, idiom), 10) * 0.3 +
          rng() * noiseScale,
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 12);
    for (const item of ranked) {
      if (expansions > 2600) return false;
      expansions += 1;
      path.push(item.idiom);
      used.add(item.idiom.id);
      if (step()) return true;
      path.pop();
      used.delete(item.idiom.id);
    }
    return false;
  };

  return step() ? [...path] : null;
}

function findChainPath(ctx, id, length, rng, forbiddenSignatures) {
  const targetTier = chainTierTargetForLevel(id);
  const signatureOf = (path) =>
    `chain|${path
      .map((idiom) => idiom.id)
      .sort()
      .join(',')}`;
  // 有 forbidden 組合時要探索得多啲（提高隨機性），避免所有起點都收斂去同一條鏈。
  const noiseScale = forbiddenSignatures ? 3.0 : 1.1;

  let best = null;
  const starts = shuffle(ctx.idioms, rng)
    .map((idiom) => ({
      idiom,
      score:
        Math.abs(idiom.tier - targetTier) * 1.0 +
        Math.min(useCount(ctx, idiom), 8) * 0.3 +
        rng() * 1.6,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 72)
    .map((item) => item.idiom);

  for (const start of starts) {
    const path = dfsChain(ctx, start, length, targetTier, rng, noiseScale);
    if (!path) continue;
    if (!path.some((idiom) => idiom.tier <= anchorTierLimitForLevel(id))) continue; // 每關要有錨
    const signature = signatureOf(path);
    if (forbiddenSignatures && forbiddenSignatures.has(signature)) continue;
    const tierAverage = mean(path.map((idiom) => idiom.tier));
    const usageAverage = mean(path.map((idiom) => useCount(ctx, idiom)));
    const score = Math.abs(tierAverage - targetTier) + usageAverage * 0.06;
    if (!best || score < best.score) best = { path, score, tierAverage };
    if (best.tierAverage >= targetTier - (isAdvancedLevel(id) ? 0.25 : 0.35)) break; // 夠好就收
  }
  return best ? best.path : null;
}

/** 分配 chain 每行空格；row0 全顯示，中段保留 index0/index3，尾行保留 index0 */
function allocateChainBlanks(length, targetBlanks, rng) {
  const caps = Array.from({ length }, (_, row) => {
    if (row === 0) return 0;
    if (row === length - 1) return 3;
    return 2;
  });
  const allowed = Array.from({ length }, (_, row) => {
    if (row === 0) return [];
    if (row === length - 1) return [1, 2, 3];
    return [1, 2];
  });
  const blanks = Array.from({ length }, () => []);
  let remaining = Math.max(targetBlanks, length - 1);

  // 每行（row ≥ 1）最少一個空格
  for (let row = 1; row < length; row += 1) {
    const index = pickOne(allowed[row], rng);
    blanks[row].push(index);
    remaining -= 1;
  }
  // 剩餘空格分配到未滿嘅行
  let guard = 0;
  while (remaining > 0 && guard < 100) {
    guard += 1;
    const candidates = [];
    for (let row = 1; row < length; row += 1) {
      for (const index of allowed[row]) {
        if (blanks[row].length >= caps[row]) break;
        if (!blanks[row].includes(index)) candidates.push([row, index]);
      }
    }
    if (candidates.length === 0) break;
    const [row, index] = pickOne(candidates, rng);
    blanks[row].push(index);
    remaining -= 1;
  }
  return blanks.map((list) => [...list].sort((a, b) => a - b));
}

function finishChainLevel(ctx, id, path, length, targetLength, rng) {
  const chapter = chapterForLevel(id);
  const hintLimit = hintLimitForLevel(id);
  const blanksByRow = allocateChainBlanks(
    length,
    targetBlankCountForLevel(id, 'chain', length),
    rng,
  );
  const slots = [];
  const cells = [];
  for (let row = 0; row < length; row += 1) {
    const idiom = path[row];
    slots.push({ idiomId: idiom.id, row, col: 0, dir: 'h', blanks: blanksByRow[row] });
    for (let index = 0; index < 4; index += 1) {
      cells.push({ r: row, c: index, char: idiom.chars[index] });
    }
  }
  const blankChars = [];
  for (let row = 0; row < length; row += 1) {
    for (const index of blanksByRow[row]) blankChars.push(path[row].chars[index]);
  }
  const decoyCount = decoyCountWithBudget(id, blankChars.length);
  const bank = buildBank(blankChars, decoyCount, ctx, rng);
  const meta = buildMeta(ctx, id, 'chain', rng);
  return {
    level: {
      id,
      chapter,
      mode: 'chain',
      title: meta.title,
      story: meta.story,
      rows: length,
      cols: 4,
      cells,
      slots,
      bank,
      hintLimit,
    },
    signature: `chain|${path
      .map((idiom) => idiom.id)
      .sort()
      .join(',')}`,
    usedIdioms: [...path],
    fallbackNote:
      length !== targetLength
        ? `Level ${id}: 接龍長度由 ${targetLength} 縮短為 ${length}（資料 fallback）`
        : null,
  };
}

function buildChainLevel(ctx, id, rng, forbiddenSignatures) {
  const targetLength = chainWordCountForLevel(id);
  // 資料嘅接龍連通性未夠時，用全庫可達長度做上限；逐級 fallback 只會喺
  // 「連目標長度嘅路徑都搵唔到」先發生。
  const usableLength = Math.max(MIN_CHAIN_WORDS, Math.min(targetLength, ctx.maxChainLength));

  for (let attempt = 0; attempt < MAX_BUILD_ATTEMPTS; attempt += 1) {
    const length =
      attempt < 150 ? usableLength : Math.max(MIN_CHAIN_WORDS, usableLength - 1);
    const path = findChainPath(ctx, id, length, rng, forbiddenSignatures);
    if (!path) continue;
    if (!path.some((idiom) => idiom.tier <= anchorTierLimitForLevel(id))) continue;
    return finishChainLevel(ctx, id, path, length, targetLength, rng);
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* 全關卡生成                                                          */
/* ------------------------------------------------------------------ */

function generateOneLevel(ctx, id) {
  const mode = isChainLevel(id) ? 'chain' : 'fill';
  for (let outer = 0; outer < MAX_LEVEL_ATTEMPTS; outer += 1) {
    const rng = mulberry32(seedForLevel(id, outer, ctx.salt));
    // 正常資料：只接受未用過嘅成語組合；interim 資料極端情況先放寬（outer >= 10）。
    const forbidden = outer < 10 ? ctx.signatures : null;
    const built =
      mode === 'chain'
        ? buildChainLevel(ctx, id, rng, forbidden)
        : buildFillLevel(ctx, id, rng, forbidden);
    if (!built) continue;
    const count = mode === 'chain' ? chainWordCountForLevel(id) : fillWordCountForLevel(id);
    if (built.level.slots.length !== count && mode === 'fill') continue;
    const fullSignature = `${built.level.mode}|${JSON.stringify(built.level)}`;
    if (!ctx.signatures.has(built.signature)) {
      ctx.signatures.add(built.signature);
      ctx.fullSignatures.add(fullSignature);
      markUsage(ctx, built.usedIdioms);
      if (built.fallbackNote) ctx.warnings.push(built.fallbackNote);
      return built.level;
    }
    // 成語組合重複：只有喺資料不足、重試多次後先接受「內容唔一樣」嘅關卡
    // （interim fallback；正式 ≥420 條成語時正常唔會觸發）。
    if (outer >= 10 && !ctx.fullSignatures.has(fullSignature)) {
      ctx.allowSimilarUsed = true;
      ctx.signatures.add(built.signature);
      ctx.fullSignatures.add(fullSignature);
      markUsage(ctx, built.usedIdioms);
      ctx.warnings.push(
        `Level ${id}: 成語組合與前面關卡重複（成語／接龍資料不足，interim fallback）`,
      );
      if (built.fallbackNote) ctx.warnings.push(built.fallbackNote);
      return built.level;
    }
  }
  throw new Error(`關卡 ${id}（${mode}）生成失敗：可能係成語資料不足或接龍連通性不足`);
}

const compositionSignatureOf = (level) =>
  `${level.mode}|${level.slots
    .map((slot) => slot.idiomId)
    .sort()
    .join(',')}`;

/**
 * 讀取現有 levels.json 嘅 Level 1–100 基礎篇（Issue #2 要求基礎篇不變）。
 * 回傳 null 表示檔案唔存在／格式唔啱；由 main 決定報錯或重新生成。
 */
function loadBaseLevels(path) {
  let raw;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
  if (!Array.isArray(raw)) return null;
  const byId = new Map(raw.map((level) => [level.id, level]));
  const baseLevels = [];
  for (let id = 1; id <= BASE_LEVELS; id += 1) {
    const level = byId.get(id);
    if (!level) return null;
    if (level.chapter !== chapterForLevel(id)) return null;
    if (level.mode !== (isChainLevel(id) ? 'chain' : 'fill')) return null;
    if (!Array.isArray(level.cells) || !Array.isArray(level.slots) || !Array.isArray(level.bank)) return null;
    baseLevels.push(level);
  }
  return baseLevels;
}

/** 把基礎篇嘅成語組合／用量種入 context，等進階篇唔會撞組合、並優先使用未用過嘅成語 */
function seedContextFromBase(ctx, baseLevels) {
  for (const level of baseLevels) {
    ctx.signatures.add(compositionSignatureOf(level));
    ctx.fullSignatures.add(`${level.mode}|${JSON.stringify(level)}`);
    const used = level.slots
      .map((slot) => ctx.idiomById.get(slot.idiomId))
      .filter((idiom) => idiom);
    markUsage(ctx, used);
  }
}

function generateAllLevels(ctx, count, baseLevels, quiet = false) {
  const levels = [];
  const log = (message) => {
    if (!quiet) process.stdout.write(message);
  };
  if (baseLevels && baseLevels.length > 0) {
    for (let id = 1; id <= Math.min(count, BASE_LEVELS); id += 1) {
      levels.push(baseLevels[id - 1]);
    }
    log(`  基礎篇 Level 1–${Math.min(count, BASE_LEVELS)}：沿用現有 levels.json（不變）\n`);
    if (count > BASE_LEVELS) seedContextFromBase(ctx, levels);
  }
  const startId = baseLevels && baseLevels.length > 0 ? BASE_LEVELS + 1 : 1;
  for (let id = startId; id <= count; id += 1) {
    levels.push(generateOneLevel(ctx, id));
    if (id % LEVELS_PER_CHAPTER === 0) {
      log(`  已生成 ${id}/${count} 關\n`);
    }
  }
  return levels;
}

/* ------------------------------------------------------------------ */
/* 統計                                                                */
/* ------------------------------------------------------------------ */

function levelMetrics(ctx, level) {
  const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
  const blankKeys = new Set();
  for (const slot of level.slots) {
    const keys = slotCellKeys(slot);
    for (const index of slot.blanks) blankKeys.add(keys[index]);
  }
  const tiers = level.slots.map((slot) => ctx.idiomById.get(slot.idiomId).tier);
  const blankChars = [...blankKeys].map((key) => solution.get(key));
  const blankCount = blankKeys.size;
  const totalChars = level.slots.length * 4;
  return {
    blankCount,
    blankRatio: blankCount / totalChars,
    blankRatioCells: blankCount / level.cells.length,
    blankChars,
    decoyCount: level.bank.length - blankCount,
    tiers,
    avgTier: mean(tiers),
    minTier: Math.min(...tiers),
    idiomCount: level.slots.length,
    mode: level.mode,
    hintLimit: level.hintLimit,
    rows: level.rows,
    cols: level.cols,
    totalCells: level.cells.length,
  };
}

function collectStats(ctx, levels) {
  const perLevel = levels.map((level) => ({
    id: level.id,
    chapter: level.chapter,
    title: level.title,
    mode: level.mode,
    ...levelMetrics(ctx, level),
  }));
  const chapters = [];
  for (let chapter = 1; chapter <= CHAPTER_COUNT; chapter += 1) {
    const chapterLevels = perLevel.filter((item) => item.chapter === chapter);
    if (chapterLevels.length === 0) continue;
    const fillCount = chapterLevels.filter((item) => item.mode === 'fill').length;
    const chainCount = chapterLevels.filter((item) => item.mode === 'chain').length;
    const tierCounts = [1, 2, 3, 4, 5].map(
      (tier) => chapterLevels.reduce((sum, item) => sum + item.tiers.filter((value) => value === tier).length, 0),
    );
    chapters.push({
      chapter,
      levelIds: `${chapterLevels[0].id}–${chapterLevels[chapterLevels.length - 1].id}`,
      count: chapterLevels.length,
      fillCount,
      chainCount,
      avgIdioms: mean(chapterLevels.map((item) => item.idiomCount)),
      minIdioms: Math.min(...chapterLevels.map((item) => item.idiomCount)),
      maxIdioms: Math.max(...chapterLevels.map((item) => item.idiomCount)),
      avgBlankCount: mean(chapterLevels.map((item) => item.blankCount)),
      avgBlankRatio: mean(chapterLevels.map((item) => item.blankRatio)),
      avgBlankRatioCells: mean(chapterLevels.map((item) => item.blankRatioCells)),
      minBlankRatio: Math.min(...chapterLevels.map((item) => item.blankRatio)),
      maxBlankRatio: Math.max(...chapterLevels.map((item) => item.blankRatio)),
      hintLimit: chapterLevels[0].hintLimit,
      decoyCount: chapterLevels[0].decoyCount,
      tierCounts,
      avgTier: mean(chapterLevels.flatMap((item) => item.tiers)),
      anchorLevels: chapterLevels.filter(
        (item) => item.minTier <= anchorTierLimitForLevel(item.id),
      ).length,
      chainLengths: [...new Set(chapterLevels.filter((item) => item.mode === 'chain').map((item) => item.idiomCount))],
    });
  }
  const allTiers = perLevel.flatMap((item) => item.tiers);
  const tierCounts = [1, 2, 3, 4, 5].map(
    (tier) => allTiers.filter((value) => value === tier).length,
  );
  return {
    totals: {
      levels: perLevel.length,
      fill: perLevel.filter((item) => item.mode === 'fill').length,
      chain: perLevel.filter((item) => item.mode === 'chain').length,
      avgBlankRatio: mean(perLevel.map((item) => item.blankRatio)),
      avgBlankRatioCells: mean(perLevel.map((item) => item.blankRatioCells)),
      avgIdioms: mean(perLevel.map((item) => item.idiomCount)),
      avgTier: mean(allTiers),
      tierCounts,
    },
    chapters,
    levels: perLevel,
  };
}

function printStatsText(ctx, stats) {
  const lines = [];
  lines.push('');
  lines.push('=== 每章統計（分母：所有 slot 字數 = 4 × 成語數）===');
  lines.push(
    '章 | 關卡    | fill | chain | 平均成語 | 平均空格 | 空格比例 | 提示 | 誘餌 | tier 1/2/3/4/5          | 平均tier | 接龍長度',
  );
  for (const chapter of stats.chapters) {
    const tiers = chapter.tierCounts.map((count) => String(count).padStart(3)).join(' /');
    lines.push(
      `${String(chapter.chapter).padStart(2)} | ${chapter.levelIds.padEnd(7)} | ${String(chapter.fillCount).padStart(4)} | ${String(chapter.chainCount).padStart(5)} | ${chapter.avgIdioms.toFixed(2).padStart(8)} | ${chapter.avgBlankCount.toFixed(2).padStart(8)} | ${chapter.avgBlankRatio.toFixed(3).padStart(8)} | ${String(chapter.hintLimit).padStart(4)} | ${String(chapter.decoyCount).padStart(4)} | ${tiers} | ${chapter.avgTier.toFixed(2).padStart(8)} | ${chapter.chainLengths.join(',') || '-'}`,
    );
  }
  lines.push('');
  lines.push(
    `總計：${stats.totals.levels} 關（fill ${stats.totals.fill}／chain ${stats.totals.chain}）；平均成語 ${stats.totals.avgIdioms.toFixed(2)} 個；平均空格比例 ${stats.totals.avgBlankRatio.toFixed(3)}（去重棋盤格 ${stats.totals.avgBlankRatioCells.toFixed(3)}）；平均 tier ${stats.totals.avgTier.toFixed(2)}`,
  );
  lines.push(`全庫 tier 使用次數（1→5）：${stats.totals.tierCounts.join(' / ')}`);
  lines.push('');
  lines.push('=== 逐關參數 ===');
  lines.push('關 | 章 | 模式  | 成語 | 空格 | 空格比例 | 提示 | 誘餌 | tier(用) | 平均tier | 盤面 | 標題');
  for (const item of stats.levels) {
    lines.push(
      `${String(item.id).padStart(2)} | ${String(item.chapter).padStart(2)} | ${item.mode.padEnd(5)} | ${String(item.idiomCount).padStart(4)} | ${String(item.blankCount).padStart(4)} | ${item.blankRatio.toFixed(3).padStart(8)} | ${String(item.hintLimit).padStart(4)} | ${String(item.decoyCount).padStart(4)} | ${item.tiers.join(',')} | ${item.avgTier.toFixed(2).padStart(8)} | ${item.rows}x${item.cols} | ${item.title}`,
    );
  }
  console.log(lines.join('\n'));
}

function statsToMarkdown(stats) {
  const lines = [];
  lines.push('### 每章難度參數統計（生成器實測）');
  lines.push('');
  lines.push(
    '| 章 | 關卡 | fill | chain | 平均成語數 | 平均空格數 | 平均空格比例 | 提示次數 | 誘餌字數 | tier 1/2/3/4/5 | 平均 tier | 接龍長度 |',
  );
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const chapter of stats.chapters) {
    lines.push(
      `| ${chapter.chapter} | ${chapter.levelIds} | ${chapter.fillCount} | ${chapter.chainCount} | ${chapter.avgIdioms.toFixed(2)} | ${chapter.avgBlankCount.toFixed(2)} | ${chapter.avgBlankRatio.toFixed(3)} | ${chapter.hintLimit} | ${chapter.decoyCount} | ${chapter.tierCounts.join(' / ')} | ${chapter.avgTier.toFixed(2)} | ${chapter.chainLengths.join(', ') || '—'} |`,
    );
  }
  lines.push('');
  lines.push('### 逐關參數表');
  lines.push('');
  lines.push('| 關 | 章 | 模式 | 成語數 | 空格數 | 空格比例 | 提示 | 誘餌 | 使用 tier | 盤面 | 標題 |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const item of stats.levels) {
    lines.push(
      `| ${item.id} | ${item.chapter} | ${item.mode} | ${item.idiomCount} | ${item.blankCount} | ${item.blankRatio.toFixed(3)} | ${item.hintLimit} | ${item.decoyCount} | ${item.tiers.join(',')} | ${item.rows}×${item.cols} | ${item.title} |`,
    );
  }
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* 驗證                                                                */
/* ------------------------------------------------------------------ */

/**
 * 內建驗證：任何一項 fail 都唔會寫 levels.json。
 * 獨立於生成邏輯（盡量由輸出資料重新推導），方便 QA 對照。
 */
function validateLevels(ctx, levels, options) {
  const checks = [];
  const warnings = [];
  const stats = collectStats(ctx, levels);
  const run = (name, fn) => {
    try {
      const detail = fn();
      checks.push({ name, passed: true, detail });
    } catch (error) {
      checks.push({ name, passed: false, detail: error.message });
    }
  };
  const levelById = new Map(levels.map((level) => [level.id, level]));
  const fullRun = options.count === TOTAL_LEVELS;

  run('關卡數量與 id 連續', () => {
    if (levels.length !== options.count) {
      throw new Error(`預期 ${options.count} 關，實際 ${levels.length} 關`);
    }
    levels.forEach((level, index) => {
      if (level.id !== index + 1) throw new Error(`第 ${index + 1} 筆 id 係 ${level.id}，唔連續`);
    });
    return `${levels.length} 關，id 1–${levels.length} 連續`;
  });

  run('章節對應正確', () => {
    for (const level of levels) {
      const expected = chapterForLevel(level.id);
      if (level.chapter !== expected) {
        throw new Error(`Level ${level.id} chapter=${level.chapter}，預期 ${expected}`);
      }
    }
    return `每 10 關一章（chapter = ceil(id/10)），共 ${CHAPTER_COUNT} 章`;
  });

  run('模式分佈符合規則', () => {
    let chainCount = 0;
    for (const level of levels) {
      const expected = isChainLevel(level.id) ? 'chain' : 'fill';
      if (level.mode !== expected) {
        throw new Error(`Level ${level.id} mode=${level.mode}，預期 ${expected}`);
      }
      if (level.mode === 'chain') chainCount += 1;
    }
    if (fullRun) {
      if (chainCount !== 38) throw new Error(`chain 關應有 38 關，實際 ${chainCount}`);
      for (let id = 1; id <= 10; id += 1) {
        if (levelById.get(id).mode !== 'fill') throw new Error(`Level ${id} 教學期必須係 fill`);
      }
    }
    return `chain ${chainCount} 關（id ≥ 11 且 5 的倍數）；Level 1–10 全 fill`;
  });

  run('棋盤幾何一致', () => {
    for (const level of levels) {
      const advanced = isAdvancedLevel(level.id);
      const keys = new Set();
      let maxRow = -1;
      let maxCol = -1;
      for (const cell of level.cells) {
        if (!Number.isInteger(cell.r) || !Number.isInteger(cell.c) || cell.r < 0 || cell.c < 0) {
          throw new Error(`Level ${level.id} 有非法格座標 (${cell.r},${cell.c})`);
        }
        if (!isHanzi(cell.char)) throw new Error(`Level ${level.id} 格字「${cell.char}」唔係漢字`);
        const key = keyOf(cell.r, cell.c);
        if (keys.has(key)) throw new Error(`Level ${level.id} 格 ${key} 重複`);
        keys.add(key);
        maxRow = Math.max(maxRow, cell.r);
        maxCol = Math.max(maxCol, cell.c);
      }
      if (level.cells.length === 0) throw new Error(`Level ${level.id} 冇任何格`);
      if (level.rows !== maxRow + 1 || level.cols !== maxCol + 1) {
        throw new Error(
          `Level ${level.id} rows/cols=${level.rows}x${level.cols}，但格範圍係 ${maxRow + 1}x${maxCol + 1}`,
        );
      }
      if (level.mode === 'fill') {
        const limit = advanced ? MAX_ADVANCED_FILL_DIM : MAX_FILL_DIM_RELAXED;
        if (level.rows > limit || level.cols > limit) {
          throw new Error(`Level ${level.id} 填字盤面過大（${level.rows}x${level.cols}，上限 ${limit}）`);
        }
      }
      if (level.mode === 'chain') {
        if (level.rows !== level.slots.length || level.cols !== 4) {
          throw new Error(`Level ${level.id} chain 盤面必須 rows=成語數、cols=4`);
        }
      }
      for (const slot of level.slots) {
        for (const key of slotCellKeys(slot)) {
          if (!keys.has(key)) throw new Error(`Level ${level.id} slot 格 ${key} 唔喺 cells`);
        }
      }
      const union = new Set();
      for (const slot of level.slots) for (const key of slotCellKeys(slot)) union.add(key);
      if (union.size !== keys.size) {
        throw new Error(`Level ${level.id} 有 ${keys.size - union.size} 個遊離格`);
      }
      if (advanced && level.mode === 'fill') {
        const expectedCells = [
          { n: 4, cells: 13 },
          { n: 5, cells: 16 },
        ];
        const match = expectedCells.find((item) => item.n === level.slots.length);
        if (match && level.cells.length !== match.cells) {
          throw new Error(
            `Level ${level.id} fill ${level.slots.length} 句應該有 ${match.cells} 格（實際 ${level.cells.length}）`,
          );
        }
      }
    }
    return `cells 唯一、無遊離格；基礎篇 fill ≤${MAX_FILL_DIM_RELAXED}×${MAX_FILL_DIM_RELAXED}／進階篇 ≤${MAX_ADVANCED_FILL_DIM}×${MAX_ADVANCED_FILL_DIM}；chain rows=k、cols=4`;
  });

  run('成語交叉／接龍幾何正確', () => {
    for (const level of levels) {
      const idiomById = ctx.idiomById;
      const advanced = isAdvancedLevel(level.id);
      if (level.mode === 'fill') {
        const minWords = advanced ? 4 : MIN_FILL_WORDS;
        const maxWords = advanced ? MAX_ADVANCED_FILL_WORDS : MAX_FILL_WORDS;
        if (level.slots.length < minWords || level.slots.length > maxWords) {
          throw new Error(`Level ${level.id} fill 成語數 ${level.slots.length} 唔喺 ${minWords}–${maxWords}`);
        }
        if (!level.slots.some((slot) => slot.dir === 'h') || !level.slots.some((slot) => slot.dir === 'v')) {
          throw new Error(`Level ${level.id} fill 盤面必須橫直混合（避免 1×N 直線盤面）`);
        }
        const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
        const seenCells = new Set();
        level.slots.forEach((slot, slotIndex) => {
          const idiom = idiomById.get(slot.idiomId);
          if (!idiom) throw new Error(`Level ${level.id} idiomId ${slot.idiomId} 唔存在`);
          if (slot.dir !== 'h' && slot.dir !== 'v') throw new Error(`Level ${level.id} slot dir 非法`);
          const keys = slotCellKeys(slot);
          keys.forEach((key, index) => {
            if (solution.get(key) !== idiom.chars[index]) {
              throw new Error(`Level ${level.id} slot ${slotIndex} 格 ${key} 答案字唔一致`);
            }
          });
          let overlap = 0;
          for (const key of keys) if (seenCells.has(key)) overlap += 1;
          if (slotIndex > 0 && overlap < 1) {
            throw new Error(`Level ${level.id} 第 ${slotIndex + 1} 個成語冇同前面交叉`);
          }
          for (const key of keys) seenCells.add(key);
        });
      } else {
        const minChain = advanced ? 6 : MIN_CHAIN_WORDS;
        const maxChain = advanced ? MAX_CHAIN_WORDS : 6;
        if (level.slots.length < minChain || level.slots.length > maxChain) {
          throw new Error(`Level ${level.id} chain 成語數 ${level.slots.length} 唔喺 ${minChain}–${maxChain}`);
        }
        level.slots.forEach((slot, index) => {
          const idiom = idiomById.get(slot.idiomId);
          if (!idiom) throw new Error(`Level ${level.id} idiomId ${slot.idiomId} 唔存在`);
          if (slot.row !== index || slot.col !== 0 || slot.dir !== 'h') {
            throw new Error(`Level ${level.id} chain slot ${index} 位置／方向唔啱`);
          }
          if (index > 0) {
            const prev = idiomById.get(level.slots[index - 1].idiomId);
            if (prev.chars[3] !== idiom.chars[0]) {
              throw new Error(
                `Level ${level.id} 接龍斷鏈：${prev.word} → ${idiom.word}（${prev.chars[3]} ≠ ${idiom.chars[0]}）`,
              );
            }
          }
        });
      }
    }
    return 'fill 每個新成語都有交叉且答案字一致；chain 全部首尾相接';
  });

  run('blanks 合法', () => {
    for (const level of levels) {
      const advanced = isAdvancedLevel(level.id);
      const fillMaxBlanks = advanced ? 4 : 3;
      const blankCellKeys = new Set();
      for (let slotIndex = 0; slotIndex < level.slots.length; slotIndex += 1) {
        const slot = level.slots[slotIndex];
        const blanks = slot.blanks;
        if (!Array.isArray(blanks)) throw new Error(`Level ${level.id} slot ${slotIndex} blanks 唔係 array`);
        const unique = new Set(blanks);
        if (unique.size !== blanks.length) throw new Error(`Level ${level.id} slot ${slotIndex} blanks 重複`);
        for (const index of blanks) {
          if (!Number.isInteger(index) || index < 0 || index > 3) {
            throw new Error(`Level ${level.id} slot ${slotIndex} blank index ${index} 非法`);
          }
        }
        const sorted = [...blanks].sort((a, b) => a - b);
        if (sorted.join(',') !== blanks.join(',')) {
          throw new Error(`Level ${level.id} slot ${slotIndex} blanks 未排序`);
        }
        if (level.mode === 'fill') {
          if (blanks.length < 1 || blanks.length > fillMaxBlanks) {
            throw new Error(
              `Level ${level.id} fill slot ${slotIndex} 空格數 ${blanks.length} 唔喺 1–${fillMaxBlanks}`,
            );
          }
          const keys = slotCellKeys(slot);
          for (const index of blanks) blankCellKeys.add(keys[index]);
        } else {
          if (slotIndex === 0 && blanks.length !== 0) {
            throw new Error(`Level ${level.id} chain row0 必須全顯示（blanks=[]）`);
          }
          if (slotIndex > 0 && blanks.length < 1) {
            throw new Error(`Level ${level.id} chain row${slotIndex} 必須至少一個空格`);
          }
          if (slotIndex > 0 && blanks.includes(0)) {
            throw new Error(`Level ${level.id} chain row${slotIndex} 首字必須顯示（接龍連接位）`);
          }
          if (slotIndex < level.slots.length - 1 && blanks.includes(3)) {
            throw new Error(`Level ${level.id} chain row${slotIndex} 尾字必須顯示（接龍連接位）`);
          }
        }
      }
      if (level.mode === 'fill' && advanced) {
        const givenCount = level.cells.length - blankCellKeys.size;
        if (givenCount < 2) {
          throw new Error(`Level ${level.id} 進階 fill 至少保留 2 個 given（實際 ${givenCount}）`);
        }
      }
    }
    return `fill 空格：基礎 1–3／進階 1–4（最少 2 個 given）；chain row0 全顯示、連接位保留`;
  });

  run('bank multiset 足夠', () => {
    for (const level of levels) {
      const advanced = isAdvancedLevel(level.id);
      const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
      const blankKeys = new Set();
      for (const slot of level.slots) {
        const keys = slotCellKeys(slot);
        for (const index of slot.blanks) blankKeys.add(keys[index]);
      }
      const blankChars = [...blankKeys].map((key) => solution.get(key));
      for (const char of blankChars) {
        if (!isHanzi(char)) throw new Error(`Level ${level.id} 空格答案字「${char}」唔係漢字`);
      }
      const need = new Map();
      for (const char of blankChars) need.set(char, (need.get(char) ?? 0) + 1);
      const have = new Map();
      for (const char of level.bank) {
        if (!isHanzi(char)) throw new Error(`Level ${level.id} 字庫「${char}」唔係漢字`);
        have.set(char, (have.get(char) ?? 0) + 1);
      }
      for (const [char, count] of need) {
        if ((have.get(char) ?? 0) < count) {
          throw new Error(`Level ${level.id} 字庫唔夠「${char}」（需要 ${count}，得 ${have.get(char) ?? 0}）`);
        }
      }
      const extra = level.bank.length - blankChars.length;
      const expectedExtra = decoyCountWithBudget(level.id, blankChars.length);
      if (extra !== expectedExtra) {
        throw new Error(`Level ${level.id} 誘餌字數 ${extra}，預期 ${expectedExtra}`);
      }
      if (advanced && level.bank.length > BANK_MAX_ADVANCED) {
        throw new Error(`Level ${level.id} 字庫 ${level.bank.length} 張超過上限 ${BANK_MAX_ADVANCED}`);
      }
      let realDecoys = 0;
      for (const [char, count] of have) {
        if (!need.has(char)) realDecoys += count;
      }
      if (realDecoys !== expectedExtra) {
        throw new Error(`Level ${level.id} 有誘餌字同空格答案字相同（誘餌 ${realDecoys}/${expectedExtra}）`);
      }
    }
    return `每個空格所需字足夠；誘餌跟曲線（進階篇受 bank ≤${BANK_MAX_ADVANCED} 截）；誘餌唔同答案字混淆`;
  });

  run('提示次數符合曲線', () => {
    for (const level of levels) {
      const expected = hintLimitForLevel(level.id);
      if (level.hintLimit !== expected) {
        throw new Error(`Level ${level.id} hintLimit=${level.hintLimit}，預期 ${expected}`);
      }
      if (level.hintLimit < 1 || level.hintLimit > 3) {
        throw new Error(`Level ${level.id} hintLimit 唔喺 1–3`);
      }
    }
    return `提示次數：基礎 3→1；進階 2→1（每章值 ${HINTS_BY_CHAPTER.join('、')}）`;
  });

  run('標題／故事文字合格', () => {
    const titles = new Set();
    for (const level of levels) {
      if (!level.title || !level.story) throw new Error(`Level ${level.id} 缺 title／story`);
      if (titles.has(level.title)) throw new Error(`關卡標題重複：${level.title}`);
      titles.add(level.title);
      if (!level.title.startsWith('第 ') || !level.title.includes('課：')) {
        throw new Error(`Level ${level.id} 標題格式唔啱：${level.title}`);
      }
      const text = `${level.title}\n${level.story}`;
      for (const slot of level.slots) {
        const idiom = ctx.idiomById.get(slot.idiomId);
        if (text.includes(idiom.word)) {
          throw new Error(`Level ${level.id} 標題／故事穿橋提及答案成語「${idiom.word}」`);
        }
      }
      if (level.story.length < 12 || level.story.length > 140) {
        throw new Error(`Level ${level.id} story 長度 ${level.story.length} 唔合理`);
      }
    }
    return `${levels.length} 個標題全部唯一、繁中；無穿橋答案成語`;
  });

  run('每關有低 tier 錨', () => {
    for (const level of levels) {
      const limit = anchorTierLimitForLevel(level.id);
      const tiers = level.slots.map((slot) => ctx.idiomById.get(slot.idiomId).tier);
      if (Math.min(...tiers) > limit) {
        throw new Error(`Level ${level.id} 冇 tier ≤ ${limit} 成語做錨（tiers=${tiers.join(',')}）`);
      }
    }
    return '基礎篇每關 tier ≤2 錨；進階篇每關 tier ≤3 錨';
  });

  run('200 關唯一', () => {
    const fullSignatures = new Set();
    const compositionSignatures = new Set();
    let compositionDuplicates = 0;
    for (const level of levels) {
      const fullSignature = `${level.mode}|${JSON.stringify(level)}`;
      if (fullSignatures.has(fullSignature)) {
        throw new Error(`Level ${level.id} 同另一關完全相同`);
      }
      fullSignatures.add(fullSignature);
      const compositionSignature = compositionSignatureOf(level);
      if (compositionSignatures.has(compositionSignature)) compositionDuplicates += 1;
      compositionSignatures.add(compositionSignature);
    }
    if (compositionDuplicates > 0) {
      if (!ctx.allowSimilarUsed) {
        throw new Error(`${compositionDuplicates} 關成語組合重複（非 fallback 情況唔容許）`);
      }
      warnings.push(
        `有 ${compositionDuplicates} 關成語組合重複：資料不足，屬 interim fallback；資料 ≥688 條後重跑會消除。`,
      );
      return `${levels.length} 關內容全部不同；${compositionDuplicates} 關組合重複（interim fallback，已警告）`;
    }
    return `${levels.length} 關成語組合＋模式全部唯一（基礎篇與進階篇無重複）`;
  });

  run('難度趨勢整體上升', () => {
    if (!fullRun) {
      return `小規模測試（${options.count} 關，非 ${TOTAL_LEVELS} 關完整曲線），略過完整趨勢檢查`;
    }
    const chapterStats = stats.chapters;
    const interimData = ctx.idioms.length < 688;
    const issues = [];
    const interimTierIssues = [];
    for (let index = 1; index < chapterStats.length; index += 1) {
      const previous = chapterStats[index - 1];
      const current = chapterStats[index];
      if (current.avgIdioms + 1e-9 < previous.avgIdioms) {
        issues.push(`第 ${current.chapter} 章平均成語數下降（${previous.avgIdioms.toFixed(2)}→${current.avgIdioms.toFixed(2)}）`);
      }
      if (current.avgBlankRatio + 0.03 < previous.avgBlankRatio) {
        issues.push(`第 ${current.chapter} 章平均空格比例下降（${previous.avgBlankRatio.toFixed(3)}→${current.avgBlankRatio.toFixed(3)}）`);
      }
      const tierDrop = `第 ${current.chapter} 章平均 tier 下降（${previous.avgTier.toFixed(2)}→${current.avgTier.toFixed(2)}）`;
      if (current.avgTier + 0.2 < previous.avgTier) {
        if (interimData && current.chapter > BASE_LEVELS / LEVELS_PER_CHAPTER) {
          interimTierIssues.push(tierDrop);
        } else {
          issues.push(tierDrop);
        }
      }
      // 提示次數：基礎篇、進階篇各自非遞增（進階篇開頭由 2 重新開始，屬設計）
      if (current.chapter <= BASE_LEVELS / LEVELS_PER_CHAPTER || previous.chapter > BASE_LEVELS / LEVELS_PER_CHAPTER) {
        if (current.hintLimit > previous.hintLimit) {
          issues.push(`第 ${current.chapter} 章提示次數上升`);
        }
      }
      // 誘餌目標（未計 bank 上限）非遞減
      const previousTarget = decoyCountForLevel(previous.levelIds ? previous.levelIds : previous.chapter * 10);
      const currentTarget = decoyCountForLevel(current.chapter * 10);
      if (currentTarget < previousTarget) {
        issues.push(`第 ${current.chapter} 章誘餌目標下降`);
      }
    }
    const diffs = stats.levels.map((item) => progressForLevel(item.id));
    const pearson = (values) => {
      const dx = mean(diffs);
      const dy = mean(values);
      let numerator = 0;
      let varX = 0;
      let varY = 0;
      for (let index = 0; index < values.length; index += 1) {
        const x = diffs[index] - dx;
        const y = values[index] - dy;
        numerator += x * y;
        varX += x * x;
        varY += y * y;
      }
      return varX === 0 || varY === 0 ? 0 : numerator / Math.sqrt(varX * varY);
    };
    const correlations = {
      blankRatio: pearson(stats.levels.map((item) => item.blankRatio)),
      idioms: pearson(stats.levels.map((item) => item.idiomCount)),
      tier: pearson(stats.levels.map((item) => item.avgTier)),
    };
    if (correlations.blankRatio < 0.6) issues.push(`空格比例同難度相關性過低（r=${correlations.blankRatio.toFixed(2)}）`);
    if (correlations.idioms < 0.6) issues.push(`成語數同難度相關性過低（r=${correlations.idioms.toFixed(2)}）`);
    if (correlations.tier < 0.6) issues.push(`平均 tier 同難度相關性過低（r=${correlations.tier.toFixed(2)}）`);
    if (interimTierIssues.length > 0) {
      warnings.push(
        `interim 資料（${ctx.idioms.length} 條）下進階篇 tier 章節未完全單調：${interimTierIssues.join('；')}；` +
          `等 idioms ≥688（多 200 條冷僻成語）重跑最終版會改善，QA 到時用嚴格標準。`,
      );
    }
    if (issues.length > 0) throw new Error(issues.join('；'));
    return `20 章平均單調；r(空格比例)=${correlations.blankRatio.toFixed(2)}、r(成語數)=${correlations.idioms.toFixed(2)}、r(tier)=${correlations.tier.toFixed(2)}${interimTierIssues.length ? '（interim tier 章節警告）' : ''}`;
  });

  run('生成參數符合設計公式', () => {
    for (const level of levels) {
      const advanced = isAdvancedLevel(level.id);
      const expectedWords = isChainLevel(level.id)
        ? chainWordCountForLevel(level.id)
        : fillWordCountForLevel(level.id);
      if (level.mode === 'chain' && ctx.maxChainLength < expectedWords) {
        const minChain = advanced ? 6 : MIN_CHAIN_WORDS;
        if (level.slots.length < minChain || level.slots.length > expectedWords) {
          throw new Error(
            `Level ${level.id} chain 長度 ${level.slots.length} 唔喺 ${minChain}–${expectedWords}（資料 fallback）`,
          );
        }
      } else if (level.slots.length !== expectedWords) {
        throw new Error(`Level ${level.id} 成語數 ${level.slots.length}，公式預期 ${expectedWords}`);
      }
      const expectedBlanks = targetBlankCountForLevel(level.id, level.mode, level.slots.length);
      const metrics = levelMetrics(ctx, level);
      const tolerance = level.mode === 'chain' ? 0 : 1;
      if (Math.abs(metrics.blankCount - expectedBlanks) > tolerance) {
        throw new Error(
          `Level ${level.id} 空格數 ${metrics.blankCount}，以實際成語數計預期 ${expectedBlanks}（±${tolerance}）`,
        );
      }
      const expectedDecoys = decoyCountWithBudget(level.id, metrics.blankCount);
      if (metrics.decoyCount !== expectedDecoys) {
        throw new Error(`Level ${level.id} 誘餌數 ${metrics.decoyCount}，預期 ${expectedDecoys}`);
      }
    }
    return ctx.maxChainLength < MAX_CHAIN_WORDS
      ? '成語數、空格數、誘餌數符合基礎篇／進階篇公式（chain 因資料限制縮短，interim）'
      : '200 關成語數、空格數、誘餌數符合基礎篇／進階篇公式';
  });

  run('可解性模擬（引擎角度）', () => {
    for (const level of levels) {
      const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
      const blankKeys = new Set();
      for (const slot of level.slots) {
        const idiom = ctx.idiomById.get(slot.idiomId);
        const keys = slotCellKeys(slot);
        keys.forEach((key, index) => {
          if (solution.get(key) !== idiom.chars[index]) {
            throw new Error(`Level ${level.id} ${idiom.word} 答案字唔一致`);
          }
        });
        for (const index of slot.blanks) blankKeys.add(keys[index]);
        if (level.mode === 'fill' && slot.blanks.length === 0) {
          throw new Error(`Level ${level.id} 有成語冇空格，引擎唔會觸發鎖定`);
        }
        if (level.mode === 'chain' && slot.row === 0 && slot.blanks.length !== 0) {
          throw new Error(`Level ${level.id} chain row0 應全顯示`);
        }
      }
      const pool = new Map();
      for (const char of level.bank) pool.set(char, (pool.get(char) ?? 0) + 1);
      for (const key of blankKeys) {
        const char = solution.get(key);
        const available = pool.get(char) ?? 0;
        if (available < 1) throw new Error(`Level ${level.id} 模擬填字時字庫不足「${char}」`);
        pool.set(char, available - 1);
      }
    }
    return '依解答填滿所有空格 → 全部成語可鎖定（chain row0 依引擎自動鎖定）→ 可過關';
  });

  run('難度參數統計一致性', () => {
    if (stats.chapters.length !== CHAPTER_COUNT) {
      throw new Error(`統計章數 ${stats.chapters.length}，預期 ${CHAPTER_COUNT}`);
    }
    for (const chapter of stats.chapters) {
      if (chapter.anchorLevels !== chapter.count) {
        throw new Error(`第 ${chapter.chapter} 章有 ${chapter.count - chapter.anchorLevels} 關冇低 tier 錨`);
      }
      if (chapter.fillCount + chapter.chainCount !== chapter.count) {
        throw new Error(`第 ${chapter.chapter} 章 fill/chain 統計唔一致`);
      }
    }
    return `${CHAPTER_COUNT} 章統計加總一致，錨覆蓋率 100%`;
  });

  run('基礎篇／進階篇分界', () => {
    if (levels.length <= BASE_LEVELS) return '未包含進階篇（小規模測試）';
    for (const level of levels) {
      if (isAdvancedLevel(level.id) && level.chapter <= BASE_LEVELS / LEVELS_PER_CHAPTER) {
        throw new Error(`Level ${level.id} 屬進階篇但 chapter=${level.chapter}`);
      }
      if (!isAdvancedLevel(level.id) && level.chapter > BASE_LEVELS / LEVELS_PER_CHAPTER) {
        throw new Error(`Level ${level.id} 屬基礎篇但 chapter=${level.chapter}`);
      }
    }
    const advancedLevels = levels.filter((level) => isAdvancedLevel(level.id));
    if (fullRun) {
      if (advancedLevels.length !== TOTAL_LEVELS - BASE_LEVELS) {
        throw new Error(`進階篇應有 ${TOTAL_LEVELS - BASE_LEVELS} 關，實際 ${advancedLevels.length}`);
      }
      const advancedChain = advancedLevels.filter((level) => level.mode === 'chain').length;
      if (advancedChain !== 20) throw new Error(`進階篇 chain 應有 20 關，實際 ${advancedChain}`);
    }
    return `Level 1–${BASE_LEVELS} 基礎篇／Level ${BASE_LEVELS + 1}–${TOTAL_LEVELS} 進階篇（第 11–20 章）`;
  });

  if (ctx.warnings.length > 0) warnings.push(...ctx.warnings);
  if (fullRun && ctx.idioms.length < 688) {
    warnings.push(
      `目前 idioms.json 只有 ${ctx.idioms.length} 條成語（Issue #2 正式版目標 ≥688；進階篇需要 ≥200 條冷僻成語），今次結果視為 interim。`,
    );
  }

  return { ok: checks.every((check) => check.passed), checks, warnings, stats };
}

/* ------------------------------------------------------------------ */
/* 輸出格式化                                                          */
/* ------------------------------------------------------------------ */

function formatLevel(level) {
  const cells = level.cells
    .map((cell) => `      { "r": ${cell.r}, "c": ${cell.c}, "char": "${cell.char}" }`)
    .join(',\n');
  const slots = level.slots
    .map(
      (slot) =>
        `      { "idiomId": "${slot.idiomId}", "row": ${slot.row}, "col": ${slot.col}, "dir": "${slot.dir}", "blanks": [${slot.blanks.join(', ')}] }`,
    )
    .join(',\n');
  const bank = level.bank.map((char) => `"${char}"`).join(', ');
  return `  {
    "id": ${level.id},
    "chapter": ${level.chapter},
    "mode": "${level.mode}",
    "title": ${JSON.stringify(level.title)},
    "story": ${JSON.stringify(level.story)},
    "rows": ${level.rows},
    "cols": ${level.cols},
    "cells": [
${cells}
    ],
    "slots": [
${slots}
    ],
    "bank": [${bank}],
    "hintLimit": ${level.hintLimit}
  }`;
}

function formatLevels(levels) {
  return `[\n${levels.map(formatLevel).join(',\n')}\n]\n`;
}

/* ------------------------------------------------------------------ */
/* CLI                                                                 */
/* ------------------------------------------------------------------ */

function printHelp() {
  console.log(`《貓咪成語大冒險》關卡生成器

用法：node scripts/generate-levels.mjs [選項]

選項：
  --levels=N        生成 N 關（預設 ${TOTAL_LEVELS}；非 ${TOTAL_LEVELS} 時必須配 --out）
  --out=PATH        輸出路徑（預設 src/data/levels.json）
  --idioms=PATH     成語資料路徑（預設 src/data/idioms.json）
  --chapters=PATH   章節資料路徑（預設 src/data/chapters.json）
  --dry-run         生成＋驗證，但唔寫檔
  --stats           印出文字統計（每章＋逐關）
  --stats=text      同上
  --stats=json      印出 JSON 統計
  --stats=md        印出 Markdown 統計表（方便貼入 LEVEL_DESIGN.md）
  --base=PATH       基礎篇來源（預設 src/data/levels.json；生成 200 關時沿用其 Level 1–100）
  --regenerate-base 連基礎篇 Level 1–100 都重新生成（不建議；會令基礎篇內容改變）
  --salt=N          RNG salt 起點（預設 0；一般唔需要改）
  --no-retry        驗證失敗時唔自動換 salt 重試（預設會自動重試，最多 ${MAX_SALT_RETRIES} 次）
  --help            顯示本說明

退出碼：0 = 生成＋驗證成功；1 = 資料不足／驗證失敗（唔會寫檔）。`);
}

function parseArgs(argv) {
  const options = {
    count: TOTAL_LEVELS,
    out: null,
    basePath: DEFAULT_OUTPUT_PATH,
    regenerateBase: false,
    idiomsPath: DEFAULT_IDIOMS_PATH,
    chaptersPath: DEFAULT_CHAPTERS_PATH,
    dryRun: false,
    stats: null,
    salt: 0,
    retryOnFail: true,
    help: false,
  };
  for (const token of argv) {
    if (token === '--help' || token === '-h') {
      options.help = true;
    } else if (token === '--dry-run') {
      options.dryRun = true;
    } else if (token === '--stats') {
      options.stats = options.stats ?? 'text';
    } else if (token.startsWith('--stats=')) {
      const mode = token.slice('--stats='.length);
      if (!['text', 'json', 'md'].includes(mode)) throw new Error(`--stats 只支援 text / json / md`);
      options.stats = mode;
    } else if (token.startsWith('--levels=')) {
      const value = Number(token.slice('--levels='.length));
      if (!Number.isInteger(value) || value < 1 || value > TOTAL_LEVELS) {
        throw new Error(`--levels 必須係 1–${TOTAL_LEVELS} 嘅整數`);
      }
      options.count = value;
    } else if (token === '--regenerate-base') {
      options.regenerateBase = true;
    } else if (token === '--no-retry') {
      options.retryOnFail = false;
    } else if (token.startsWith('--out=')) {
      options.out = resolve(process.cwd(), token.slice('--out='.length));
    } else if (token.startsWith('--base=')) {
      options.basePath = resolve(process.cwd(), token.slice('--base='.length));
    } else if (token.startsWith('--idioms=')) {
      options.idiomsPath = resolve(process.cwd(), token.slice('--idioms='.length));
    } else if (token.startsWith('--chapters=')) {
      options.chaptersPath = resolve(process.cwd(), token.slice('--chapters='.length));
    } else if (token.startsWith('--salt=')) {
      const value = Number(token.slice('--salt='.length));
      if (!Number.isInteger(value)) throw new Error('--salt 必須係整數');
      options.salt = value;
    } else {
      throw new Error(`唔認識嘅參數：${token}（用 --help 睇用法）`);
    }
  }
  if (options.out === null) {
    options.out = options.count === TOTAL_LEVELS ? DEFAULT_OUTPUT_PATH : null;
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (options.count !== TOTAL_LEVELS && !options.out) {
    throw new Error(`--levels=${options.count} 需要同時用 --out=PATH 指定輸出（避免覆寫正式 levels.json）`);
  }

  const idiomData = loadIdioms(options.idiomsPath);
  const chapters = loadChapters(options.chaptersPath);
  const minimumIdioms = options.count === TOTAL_LEVELS ? 300 : options.count === BASE_LEVELS ? 60 : 6;
  if (idiomData.idioms.length < minimumIdioms) {
    throw new Error(
      `idioms.json 只有 ${idiomData.idioms.length} 條成語；要生成 ${options.count} 關最少需要 ${minimumIdioms} 條。` +
        `\n（等 idiom-scholar 擴充資料後再跑；小規模測試可用 --levels=N --out=/tmp/levels.json）`,
    );
  }

  console.log(`《貓咪成語大冒險》關卡生成器`);
  console.log(
    `  成語資料：${idiomData.idioms.length} 條；章節：${chapters.length} 章；生成 ${options.count} 關；salt=${options.salt}`,
  );
  const finalIdiomTarget = options.count === TOTAL_LEVELS ? 688 : 420;
  if (idiomData.idioms.length < finalIdiomTarget && options.count === TOTAL_LEVELS) {
    console.log(`  ⚠ 成語資料未達 ${finalIdiomTarget} 條（Issue #2 正式版目標），今次生成結果視為 interim。`);
  }

  // 生成 200 關時，Level 1–100 基礎篇直接沿用現有 levels.json，保證基礎篇不變。
  let baseLevels = null;
  if (options.count === TOTAL_LEVELS && !options.regenerateBase) {
    baseLevels = loadBaseLevels(options.basePath);
    if (!baseLevels) {
      throw new Error(
        `搵唔到可用嘅基礎篇 Level 1–100（${options.basePath}）。` +
          `\n生成 200 關時會沿用現有基礎篇；如果真係要由頭生成，請加 --regenerate-base（會改變 Level 1–100 內容）。`,
      );
    }
  }

  const started = Date.now();
  let ctx = null;
  let levels = null;
  let validation = null;
  let usedSalt = options.salt;
  const maxRetries =
    options.count === TOTAL_LEVELS && options.retryOnFail ? MAX_SALT_RETRIES : 0;
  for (let retry = 0; retry <= maxRetries; retry += 1) {
    usedSalt = options.salt + retry;
    ctx = createContext(idiomData, chapters, usedSalt);
    levels = generateAllLevels(ctx, options.count, baseLevels, retry > 0);
    validation = validateLevels(ctx, levels, options);
    if (validation.ok) break;
    if (retry < maxRetries) {
      const failedNames = validation.checks
        .filter((check) => !check.passed)
        .map((check) => check.name)
        .join('、');
      console.log(`  ↻ 驗證未過（${failedNames}），用 salt=${usedSalt + 1} 重試（deterministic）…`);
    }
  }
  if (usedSalt !== options.salt) {
    console.log(`  ℹ️ 最終採用 salt=${usedSalt}（驗證驅動自動重試）`);
  }
  const elapsed = Date.now() - started;

  console.log('');
  console.log(`=== 驗證結果（${elapsed} ms）===`);
  for (const check of validation.checks) {
    console.log(`  ${check.passed ? '✓' : '✗'} ${check.name}：${check.detail}`);
  }
  if (validation.warnings.length > 0) {
    console.log('  ⚠ 警告：');
    const shown = validation.warnings.slice(0, 12);
    for (const warning of shown) console.log(`    - ${warning}`);
    if (validation.warnings.length > shown.length) {
      console.log(`    - …其餘 ${validation.warnings.length - shown.length} 條同類警告（--stats 可睇完整統計）`);
    }
  }

  if (options.stats) {
    if (options.stats === 'json') {
      console.log(JSON.stringify(validation.stats, null, 2));
    } else if (options.stats === 'md') {
      console.log(statsToMarkdown(validation.stats));
    } else {
      printStatsText(ctx, validation.stats);
    }
  }

  if (!validation.ok) {
    console.error('');
    console.error('❌ 關卡驗證失敗，唔會寫入 levels.json');
    for (const check of validation.checks.filter((item) => !item.passed)) {
      console.error(`   - ${check.name}：${check.detail}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log(`  → 全部 ${validation.checks.length} 項驗證 PASS`);

  if (options.dryRun) {
    console.log('');
    console.log('ℹ️  --dry-run：唔寫入檔案');
    return;
  }
  const json = formatLevels(levels);
  // 安全檢查：確保輸出係合法 JSON 先寫
  JSON.parse(json);
  writeFileSync(options.out, json, 'utf8');
  console.log('');
  console.log(`✅ 已寫入 ${options.out}（${levels.length} 關，${(json.length / 1024).toFixed(1)} KB）`);
}

try {
  main();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exitCode = 1;
}
