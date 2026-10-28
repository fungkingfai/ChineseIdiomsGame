#!/usr/bin/env node
/**
 * 驗證 src/data/idioms.json 是否符合 docs/PLAN.md §5.1 的成語資料契約。
 *
 * 用法：
 *   node scripts/verify-idioms.mjs                 # 完整驗收（總數下限 420）
 *   IDIOM_MIN_TOTAL=150 node scripts/verify-idioms.mjs   # 開發期暫時放寬總數下限
 *
 * 檢查項目：
 *   1. JSON 語法、頂層 array
 *   2. 每筆必需欄位、id/word 唯一、id 與拼音一致
 *   3. word 正好 4 個繁體漢字（黑名單擋簡體字）
 *   4. pinyin 4 個音節、每節有且只有一個聲調符號
 *   5. meaning / origin 的漢字數（15–60 / 15–90）
 *   6. sourceBook 格式《…》、tier 1–5、tags 1–3 個
 *   7. 總數、tier 分佈
 *   8. 接龍連通性：可接龍成語數、接龍鏈數、常用連接字覆蓋
 *
 * 全部通過 → exit 0；任何錯誤 → 列出後 exit 1。
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_PATH = resolve(ROOT, 'src/data/idioms.json');

// ---- 驗收門檻（可由環境變數放寬總數，其餘固定） ----
const MIN_TOTAL = Number(process.env.IDIOM_MIN_TOTAL ?? 420);
const MIN_TIER = { 1: 70, 2: 100, 3: 100, 4: 80, 5: 50 };
const MIN_CHAINED = 150; // 尾字＝另一成語首字的成語數下限
const MEANING_MIN = 15;
const MEANING_MAX = 60;
const ORIGIN_MIN = 15;
const ORIGIN_MAX = 90;

const HAN_SINGLE = /[\u3400-\u4dbf\u4e00-\u9fff]/u;
const HAN_ONLY = /^[\u3400-\u4dbf\u4e00-\u9fff]+$/u;
const TONE_FOLD = {
  ā: 'a', á: 'a', ǎ: 'a', à: 'a',
  ē: 'e', é: 'e', ě: 'e', è: 'e',
  ī: 'i', í: 'i', ǐ: 'i', ì: 'i',
  ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
  ū: 'u', ú: 'u', ǔ: 'u', ù: 'u',
  ǖ: 'v', ǘ: 'v', ǚ: 'v', ǜ: 'v',
  ü: 'v',
};
const TONE_MARKS = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/gu;
// 常見「只作簡體／異體」用字黑名單（用來擋誤用簡體字，非窮舉）
const SIMPLIFIED_ONLY = new Set(Array.from(
  '为说这个来对时过还进实业经发学习书车马门东长见贝页风飞国图应务员汉与变让认识语词读听写机会义题难杀气断点画龙电买卖张开关万师归当尽将尔尘尝弃庄庆戏战执扫扬护报担择拥挥损换据掷摄敌斗旧显术机权条杨树样检楼欢欧汇汤沟没泪洁浅测济浑浓涂润涨渐湾满渔灭灯灵烦烧热爱爷牵犹独猎猪猫获现环畅疗监盘矿码础确礼祷离种积称稳穷窃笔筑简类粮紧红约级纪纯纸线练组织终绍结给统绝继绩缘网罗罚联职肃胜脑腾脏脚脸腊舰艰艺节芦苍苏荐药营蓝虽补装观规视觉览触计订认讨让训议记讲论设访证评识诉词译试话询详误请诸读课谁调谈谋谎谜谢谦负财责贤败货质购贯资赏赖赶趋轮转轻载较辆输农连进远违迟适选递逻邮邻郑释钟钢钱铁银铺销错键闭问闲间闻阁队阳阴阶际陆陈险随隐难雾顶项顺须顿领颜题额饭饮饰骑验鱼鲜鸟鸡鸣鹅鹤鹰黄龙龟齿齐斋龄庞党'));

const CONNECTORS = [
  '一', '不', '人', '心', '天', '大', '小', '山', '水', '風',
  '日', '月', '目', '口', '手', '足', '馬', '龍', '虎', '金',
  '玉', '正', '堂', '行', '里', '中', '上', '下', '有', '無',
  '生', '死', '成', '明', '清', '花', '春', '秋', '雲', '海',
  '火', '石', '書', '言', '語', '事', '理', '道', '德',
];
// 「里」作連接字時，繁體標準寫法為「裡」（如：裡應外合），驗證時視為等價。
const CONNECTOR_ALIASES = { 里: ['裡'] };
// 極少（或沒有）四字成語以這些字收尾，接龍時只要求有以它開頭的成語。
const NO_TAIL_REQUIRED = new Set(['不', '小']);

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);
const cjkCount = (s) => Array.from(String(s)).filter((ch) => HAN_SINGLE.test(ch)).length;

// ---- 讀檔 ----
let raw;
try {
  raw = readFileSync(DATA_PATH, 'utf8');
} catch (err) {
  console.error(`✗ 讀不到 ${DATA_PATH}：${err.message}`);
  process.exit(1);
}
let idioms;
try {
  idioms = JSON.parse(raw);
} catch (err) {
  console.error(`✗ src/data/idioms.json JSON 語法錯誤：${err.message}`);
  process.exit(1);
}
if (!Array.isArray(idioms)) {
  console.error('✗ src/data/idioms.json 頂層必須是 JSON array');
  process.exit(1);
}

// ---- 工具 ----
const stripTones = (pinyin) =>
  Array.from(String(pinyin).trim().split(/\s+/))
    .map((syllable) => Array.from(syllable).map((ch) => TONE_FOLD[ch] ?? ch).join(''))
    .join('-');
const hanBase = (syllable) =>
  Array.from(syllable).map((ch) => (ch in TONE_FOLD ? TONE_FOLD[ch].toUpperCase() === 'V' ? 'v' : TONE_FOLD[ch] : ch)).join('');

// ---- 逐筆檢查 ----
const idSeen = new Map();
const wordSeen = new Map();
const tiers = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
const REQUIRED_FIELDS = ['id', 'word', 'pinyin', 'meaning', 'origin', 'sourceBook', 'tier', 'tags'];
const byChar = new Map(); // 字 → { heads: [idiom], tails: [idiom] }

idioms.forEach((item, index) => {
  const at = `第 ${index + 1} 筆${item && typeof item === 'object' && item.word ? `（${item.word}）` : ''}`;
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    fail(`${at}：必須是 object`);
    return;
  }
  for (const field of REQUIRED_FIELDS) {
    if (!(field in item) || item[field] === null || item[field] === undefined) {
      fail(`${at}：缺少欄位 ${field}`);
    }
  }

  // id
  if (typeof item.id !== 'string' || !/^[a-z]+(?:-[a-z]+){3}$/.test(item.id)) {
    fail(`${at}：id 必須是 4 段拼音 kebab-case（例 ri-xing-qian-li），實際：${JSON.stringify(item.id)}`);
  } else if (idSeen.has(item.id)) {
    fail(`${at}：id 重複（${item.id}），與第 ${idSeen.get(item.id) + 1} 筆撞 id`);
  } else {
    idSeen.set(item.id, index);
  }

  // word
  if (typeof item.word !== 'string') {
    fail(`${at}：word 必須是字串`);
  } else {
    if (Array.from(item.word).length !== 4) fail(`${at}：word 必須正好 4 個字，實際 ${Array.from(item.word).length}：${item.word}`);
    if (!HAN_ONLY.test(item.word)) fail(`${at}：word 只可以有漢字：${item.word}`);
    const bad = Array.from(item.word).filter((ch) => SIMPLIFIED_ONLY.has(ch));
    if (bad.length) fail(`${at}：word 含簡體／非標準字「${bad.join('、')}」：${item.word}`);
    if (wordSeen.has(item.word)) fail(`${at}：word 重複（${item.word}），與第 ${wordSeen.get(item.word) + 1} 筆撞詞`);
    else wordSeen.set(item.word, index);
    for (const ch of item.word) {
      const bucket = byChar.get(ch) ?? { heads: [], tails: [] };
      if (ch === item.word[0]) bucket.heads.push(item);
      if (ch === item.word[3]) bucket.tails.push(item);
      byChar.set(ch, bucket);
    }
  }

  // pinyin
  if (typeof item.pinyin !== 'string') {
    fail(`${at}：pinyin 必須是字串`);
  } else {
    const syllables = item.pinyin.trim().split(/\s+/);
    if (syllables.length !== 4) fail(`${at}：pinyin 必須有 4 個音節，實際 ${syllables.length}：${item.pinyin}`);
    for (const syllable of syllables) {
      const marks = syllable.match(TONE_MARKS) ?? [];
      if (marks.length !== 1) {
        fail(`${at}：音節「${syllable}」要有且只有一個聲調符號：${item.pinyin}`);
        continue;
      }
      const base = Array.from(syllable)
        .map((ch) => {
          const folded = TONE_FOLD[ch];
          if (folded === undefined) return ch;
          return folded === 'v' ? 'ü' : folded;
        })
        .join('');
      if (!/^[a-zü]+$/.test(base)) fail(`${at}：音節「${syllable}」含非拼音字母：${item.pinyin}`);
      else if (!/[aeiouü]/.test(base)) fail(`${at}：音節「${syllable}」沒有元音：${item.pinyin}`);
    }
    if (typeof item.id === 'string' && stripTones(item.pinyin) !== item.id) {
      fail(`${at}：id 應由 pinyin 去掉聲調得出（期望 ${stripTones(item.pinyin)}，實際 ${item.id}）`);
    }
    if (/[\s]{2,}|^\s|\s$/.test(item.pinyin)) fail(`${at}：pinyin 音節之間只可以有一個空格`);
  }

  // meaning / origin
  if (typeof item.meaning !== 'string') fail(`${at}：meaning 必須是字串`);
  else {
    const n = cjkCount(item.meaning);
    if (n < MEANING_MIN || n > MEANING_MAX) fail(`${at}：meaning 漢字數 ${n} 不在 ${MEANING_MIN}–${MEANING_MAX} 之間`);
    if (item.meaning.includes('\n')) fail(`${at}：meaning 不可以有換行`);
  }
  if (typeof item.origin !== 'string') fail(`${at}：origin 必須是字串`);
  else {
    const n = cjkCount(item.origin);
    if (n < ORIGIN_MIN || n > ORIGIN_MAX) fail(`${at}：origin 漢字數 ${n} 不在 ${ORIGIN_MIN}–${ORIGIN_MAX} 之間`);
    if (item.origin.includes('\n')) fail(`${at}：origin 不可以有換行`);
  }

  // sourceBook
  if (typeof item.sourceBook !== 'string' || !/^《[^《》]+》$/.test(item.sourceBook.trim())) {
    fail(`${at}：sourceBook 必須是《書名·篇名》格式，實際：${JSON.stringify(item.sourceBook)}`);
  } else if (!item.sourceBook.includes('·')) {
    warn(`${at}：sourceBook 未含「·」篇名（${item.sourceBook}）`);
  }

  // tier
  if (!Number.isInteger(item.tier) || !(item.tier >= 1 && item.tier <= 5)) {
    fail(`${at}：tier 必須是 1–5 的整數，實際：${JSON.stringify(item.tier)}`);
  } else {
    tiers[item.tier] += 1;
  }

  // tags
  if (!Array.isArray(item.tags)) {
    fail(`${at}：tags 必須是 array`);
  } else if (item.tags.length < 1 || item.tags.length > 3) {
    fail(`${at}：tags 必須有 1–3 個分類，實際 ${item.tags.length} 個`);
  } else {
    const seen = new Set();
    for (const tag of item.tags) {
      if (typeof tag !== 'string' || !HAN_ONLY.test(tag) || Array.from(tag).length > 4) {
        fail(`${at}：tag 必須是 1–4 個漢字，實際：${JSON.stringify(tag)}`);
      } else if (seen.has(tag)) fail(`${at}：tag 重複（${tag}）`);
      seen.add(tag);
    }
  }

  // 選填 example
  if ('example' in item && item.example !== undefined) {
    if (typeof item.example !== 'string' || item.example.trim() === '') fail(`${at}：example 若有就必須是非空字串`);
  }
});

// ---- 總數與 tier 分佈 ----
if (idioms.length < MIN_TOTAL) fail(`成語總數 ${idioms.length} 少於下限 ${MIN_TOTAL}`);
for (const tier of [1, 2, 3, 4, 5]) {
  if (tiers[tier] < MIN_TIER[tier]) fail(`tier ${tier} 只有 ${tiers[tier]} 筆，少於下限 ${MIN_TIER[tier]}`);
}

// ---- 接龍連通性 ----
const outgoing = new Map(); // idiom -> [next idioms]
let linkCount = 0;
let chainedCount = 0;
const participants = new Set();
for (const idiom of idioms) {
  const tail = idiom.word?.[3];
  const nexts = (byChar.get(tail)?.heads ?? []).filter((other) => other !== idiom);
  if (nexts.length > 0) {
    outgoing.set(idiom, nexts);
    chainedCount += 1;
    linkCount += nexts.length;
    participants.add(idiom);
    for (const next of nexts) participants.add(next);
  }
}
if (chainedCount < MIN_CHAINED) fail(`可接龍成語只有 ${chainedCount} 筆，少於下限 ${MIN_CHAINED}`);

// 最長接龍（DFS，容許環，深度上限 30；只作統計參考）
const longestMemo = new Map();
function longestFrom(idiom, depth = 0) {
  if (depth >= 30) return 1;
  const nexts = outgoing.get(idiom) ?? [];
  let best = 1;
  for (const next of nexts) {
    let rest = longestMemo.get(next);
    if (rest === undefined) {
      rest = longestFrom(next, depth + 1);
      longestMemo.set(next, rest);
    }
    best = Math.max(best, 1 + rest);
  }
  return best;
}
let longestChain = 0;
for (const idiom of idioms) longestChain = Math.max(longestChain, longestFrom(idiom));

// 常用連接字覆蓋：字本身要有成語做「首字」，亦要有成語做「尾字」，才算真正接得通。
const connectorReport = [];
let jointCovered = 0;
for (const char of CONNECTORS) {
  const aliases = [char, ...(CONNECTOR_ALIASES[char] ?? [])];
  const heads = aliases.flatMap((ch) => byChar.get(ch)?.heads ?? []).filter(Boolean);
  const tails = aliases.flatMap((ch) => byChar.get(ch)?.tails ?? []).filter(Boolean);
  const needsTail = !NO_TAIL_REQUIRED.has(char);
  const ok = heads.length >= 1 && (!needsTail || tails.length >= 1);
  if (heads.length === 0) fail(`連接字「${char}」沒有任何成語以它開頭，無法接龍`);
  if (needsTail && tails.length === 0) fail(`連接字「${char}」沒有任何成語以它結尾，無法接龍`);
  if (ok) jointCovered += 1;
  connectorReport.push({ char, heads: heads.length, tails: tails.length, ok });
}

// ---- 統計輸出 ----
const line = (ch = '─') => console.log(ch.repeat(58));
console.log('《貓咪成語大冒險》成語資料驗證（scripts/verify-idioms.mjs）');
line();
console.log(`資料檔：src/data/idioms.json`);
console.log(`成語總數：${idioms.length} 筆（下限 ${MIN_TOTAL}）`);
console.log(`tier 分佈：${[1, 2, 3, 4, 5].map((t) => `tier${t} ${tiers[t]}/${MIN_TIER[t]}`).join('、')}`);
console.log(`id／word 唯一：${idSeen.size} 個 id、${wordSeen.size} 個成語`);
line();
console.log(`接龍統計：${chainedCount} 筆可接龍（下限 ${MIN_CHAINED}）、${linkCount} 條接龍鏈接`);
console.log(`參與接龍的成語：${participants.size} 筆；最長接龍（估算）：${longestChain} 步`);
console.log(`常用連接字：${jointCovered}/${CONNECTORS.length} 個兩端齊備`);
const missing = connectorReport.filter((row) => !row.ok);
if (missing.length) {
  console.log(`覆蓋不足：${missing.map((row) => `${row.char}（首${row.heads}／尾${row.tails}）`).join('、')}`);
}
line();
if (warnings.length) {
  console.log(`⚠ 警告 ${warnings.length} 項`);
  for (const message of warnings.slice(0, 25)) console.log(`  - ${message}`);
  if (warnings.length > 25) console.log(`  …還有 ${warnings.length - 25} 項`);
} else {
  console.log('⚠ 警告：無');
}
if (errors.length) {
  console.log(`✗ 驗證失敗，共 ${errors.length} 項錯誤：`);
  for (const message of errors.slice(0, 80)) console.log(`  - ${message}`);
  if (errors.length > 80) console.log(`  …還有 ${errors.length - 80} 項錯誤`);
  console.log('');
  console.log('結果：FAIL');
  process.exit(1);
}
console.log('✓ 全部資料契約檢查通過');
console.log('');
console.log('結果：PASS');
process.exit(0);
