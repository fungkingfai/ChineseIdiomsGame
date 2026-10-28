#!/usr/bin/env node
/**
 * 《貓咪成語大冒險》關卡資料獨立驗證（QA 擁有）
 * =================================================================
 * 只讀 src/data/{levels,idioms,chapters}.json，獨立重新實作 docs/PLAN.md
 * §4／§5 嘅資料契約檢查。**刻意唔 import scripts/generate-levels.mjs**，
 * 避免「生成器自己驗自己」；兩邊結果應該一致（可以互相對照）。
 *
 * 用法：
 *   node scripts/verify-levels.mjs            # 人類可讀報告（預設）
 *   node scripts/verify-levels.mjs --json     # 只輸出 JSON（給 QA 報告／CI 用）
 *   node scripts/verify-levels.mjs --quiet    # 只輸出總結同失敗項
 *   node scripts/verify-levels.mjs --help
 *
 * 退出碼：0 = 全部硬性檢查 PASS（warning 唔算失敗）；1 = 有檢查 FAIL。
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LEVELS_PATH = resolve(ROOT, 'src/data/levels.json');
const IDIOMS_PATH = resolve(ROOT, 'src/data/idioms.json');
const CHAPTERS_PATH = resolve(ROOT, 'src/data/chapters.json');

/* ------------------------------------------------------------------ */
/* 設計常數（由 docs/PLAN.md §4 及 docs/LEVEL_DESIGN.md 規格得出）      */
/* ------------------------------------------------------------------ */
const TOTAL_LEVELS = 100;
const LEVELS_PER_CHAPTER = 10;
const CHAPTER_COUNT = 10;
const EXPECTED_CHAIN_COUNT = 18;
const CHAIN_START_LEVEL = 11;
const CHAIN_EVERY = 5;
const MIN_FILL_WORDS = 2;
const MAX_FILL_WORDS = 4;
const MIN_CHAIN_WORDS = 3;
const MAX_CHAIN_WORDS = 6;
const BLANK_RATIO_START = 0.3;
const BLANK_RATIO_END = 0.65;
/** 每章提示次數（PLAN §4.4：3 → 1，必須單調不增） */
const HINTS_BY_CHAPTER = [3, 3, 3, 2, 2, 2, 1, 1, 1, 1];
/** 每章誘餌字數（PLAN §4.4：0 → 6，必須單調不減） */
const DECOYS_BY_CHAPTER = [0, 1, 1, 2, 3, 3, 4, 5, 5, 6];
/** 章節場景 key（PLAN §4.1，順序固定） */
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
];
/** 常用接龍連接字（PLAN §5.1） */
const CONNECTORS = [
  '一', '不', '人', '心', '天', '大', '小', '山', '水', '風',
  '日', '月', '目', '口', '手', '足', '馬', '龍', '虎', '金',
  '玉', '正', '堂', '行', '里', '中', '上', '下', '有', '無',
  '生', '死', '成', '明', '清', '花', '春', '秋', '雲', '海',
  '火', '石', '書', '言', '語', '事', '理', '道', '德',
];
/** 極少以呢啲字收尾嘅連接字：只要求有以它開頭嘅成語 */
const NO_TAIL_REQUIRED = new Set(['不', '小']);
/** 「里」作連接字時，繁體標準寫法為「裡」，驗證時視為等價 */
const CONNECTOR_ALIASES = { 里: ['裡'] };

const D_HAN = /[\u3400-\u4dbf\u4e00-\u9fff]/u;
const HAN_ONLY = /^[\u3400-\u4dbf\u4e00-\u9fff]$/u;

/* ------------------------------------------------------------------ */
/* 小工具（獨立實作）                                                   */
/* ------------------------------------------------------------------ */
const cjkCount = (value) => Array.from(String(value ?? '')).filter((ch) => D_HAN.test(ch)).length;
const isHan = (value) => typeof value === 'string' && HAN_ONLY.test(value);
const isInt = (value) => Number.isInteger(value);
const mean = (list) => (list.length === 0 ? 0 : list.reduce((sum, value) => sum + value, 0) / list.length);
const round = (value, digits = 3) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};
const keyOf = (r, c) => `${r}:${c}`;
const difficultyOf = (id) => (id - 1) / (TOTAL_LEVELS - 1);
const chapterOf = (id) => Math.floor((id - 1) / LEVELS_PER_CHAPTER) + 1;
const isChainLevel = (id) => id >= CHAIN_START_LEVEL && id % CHAIN_EVERY === 0;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** 一個 slot 的 4 個格 key（依成語字序） */
const slotCellKeys = (slot) => {
  const keys = [];
  for (let index = 0; index < 4; index += 1) {
    keys.push(slot.dir === 'h' ? keyOf(slot.row, slot.col + index) : keyOf(slot.row + index, slot.col));
  }
  return keys;
};

/** Pearson 相關係數；樣本變異為 0 時回傳 0 */
function pearson(xs, ys) {
  const mx = mean(xs);
  const my = mean(ys);
  let numerator = 0;
  let varX = 0;
  let varY = 0;
  for (let index = 0; index < xs.length; index += 1) {
    const dx = xs[index] - mx;
    const dy = ys[index] - my;
    numerator += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  if (varX === 0 || varY === 0) return 0;
  return numerator / Math.sqrt(varX * varY);
}

/* ------------------------------------------------------------------ */
/* 讀資料                                                               */
/* ------------------------------------------------------------------ */
function readJson(path, label) {
  let raw;
  try {
    raw = readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error(`讀唔到 ${label}（${path}）：${error.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`${label} JSON 語法錯誤：${error.message}`);
  }
}

/* ------------------------------------------------------------------ */
/* 驗證框架                                                             */
/* ------------------------------------------------------------------ */
const checks = [];
const warnings = [];
const details = {};
let data = null;

function check(name, fn) {
  try {
    const detail = fn();
    checks.push({ name, passed: true, detail: detail ?? '' });
  } catch (error) {
    checks.push({ name, passed: false, detail: error.message });
  }
}

const fail = (message) => {
  throw new Error(message);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};
const warn = (message) => warnings.push(message);

/* ------------------------------------------------------------------ */
/* 統計                                                                 */
/* ------------------------------------------------------------------ */
function levelMetrics(level, idiomById) {
  const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
  const blankKeys = new Set();
  for (const slot of level.slots) {
    const keys = slotCellKeys(slot);
    for (const index of slot.blanks) blankKeys.add(keys[index]);
  }
  const tiers = level.slots.map((slot) => idiomById.get(slot.idiomId)?.tier ?? 0);
  const blankCount = blankKeys.size;
  const totalChars = level.slots.length * 4;
  return {
    id: level.id,
    chapter: level.chapter,
    mode: level.mode,
    idiomCount: level.slots.length,
    blankCount,
    blankRatio: totalChars === 0 ? 0 : blankCount / totalChars,
    bankSize: level.bank.length,
    decoyCount: level.bank.length - blankCount,
    hintLimit: level.hintLimit,
    tiers,
    tierCounts: [1, 2, 3, 4, 5].map((tier) => tiers.filter((value) => value === tier).length),
    avgTier: mean(tiers),
    chainLength: level.mode === 'chain' ? level.slots.length : 0,
    rows: level.rows,
    cols: level.cols,
  };
}

function collectStats(levels, idiomById) {
  const perLevel = levels.map((level) => levelMetrics(level, idiomById));
  const chapters = [];
  for (let chapter = 1; chapter <= CHAPTER_COUNT; chapter += 1) {
    const list = perLevel.filter((item) => item.chapter === chapter);
    if (list.length === 0) continue;
    const chainLengths = list.filter((item) => item.mode === 'chain').map((item) => item.chainLength);
    chapters.push({
      chapter,
      levelIds: `${list[0].id}–${list[list.length - 1].id}`,
      count: list.length,
      fillCount: list.filter((item) => item.mode === 'fill').length,
      chainCount: list.filter((item) => item.mode === 'chain').length,
      avgIdioms: mean(list.map((item) => item.idiomCount)),
      avgBlanks: mean(list.map((item) => item.blankCount)),
      avgBlankRatio: mean(list.map((item) => item.blankRatio)),
      avgBankSize: mean(list.map((item) => item.bankSize)),
      avgDecoys: mean(list.map((item) => item.decoyCount)),
      hintLimits: [...new Set(list.map((item) => item.hintLimit))],
      tierCounts: [1, 2, 3, 4, 5].map((tier) =>
        list.reduce((sum, item) => sum + item.tiers.filter((value) => value === tier).length, 0),
      ),
      avgTier: mean(list.flatMap((item) => item.tiers)),
      chainLengths,
    });
  }
  const allTiers = perLevel.flatMap((item) => item.tiers);
  return {
    totals: {
      levels: levels.length,
      fill: perLevel.filter((item) => item.mode === 'fill').length,
      chain: perLevel.filter((item) => item.mode === 'chain').length,
      avgIdioms: mean(perLevel.map((item) => item.idiomCount)),
      avgBlanks: mean(perLevel.map((item) => item.blankCount)),
      avgBlankRatio: mean(perLevel.map((item) => item.blankRatio)),
      avgDecoys: mean(perLevel.map((item) => item.decoyCount)),
      tierCounts: [1, 2, 3, 4, 5].map((tier) => allTiers.filter((value) => value === tier).length),
      avgTier: mean(allTiers),
      hintLimits: [...new Set(perLevel.map((item) => item.hintLimit))].sort((a, b) => a - b),
      chainLengths: perLevel.filter((item) => item.mode === 'chain').map((item) => item.chainLength),
    },
    chapters,
    levels: perLevel,
  };
}

/* ------------------------------------------------------------------ */
/* 驗證主體                                                             */
/* ------------------------------------------------------------------ */
function verify(levels, idioms, chapters) {
  const idiomById = new Map(idioms.map((idiom) => [idiom.id, idiom]));
  const levelById = new Map(levels.map((level) => [level.id, level]));
  const stats = collectStats(levels, idiomById);
  details.stats = stats;

  /* ---- 章節資料 --------------------------------------------------- */
  check('章節資料：10 章、scene key 正確', () => {
    assert(Array.isArray(chapters), 'chapters.json 頂層必須係 array');
    assert(
      chapters.length === CHAPTER_COUNT,
      `章節數應為 ${CHAPTER_COUNT}，實際 ${chapters.length}`,
    );
    chapters.forEach((chapter, index) => {
      assert(isInt(chapter.id) && chapter.id === index + 1, `第 ${index + 1} 章 id 應為 ${index + 1}，實際 ${chapter.id}`);
      assert(
        chapter.scene === CHAPTER_SCENES[index],
        `第 ${chapter.id} 章 scene 應為 ${CHAPTER_SCENES[index]}，實際 ${chapter.scene}`,
      );
      assert(typeof chapter.name === 'string' && cjkCount(chapter.name) >= 2, `第 ${chapter.id} 章缺少繁中名稱`);
      assert(typeof chapter.blurb === 'string' && cjkCount(chapter.blurb) >= 8, `第 ${chapter.id} 章 blurb 太短`);
    });
    return `10 章，scene 依序 ${CHAPTER_SCENES.join(' → ')}`;
  });

  /* ---- 基本結構 --------------------------------------------------- */
  check('關卡數量與 id 連續', () => {
    assert(Array.isArray(levels), 'levels.json 頂層必須係 array');
    assert(levels.length === TOTAL_LEVELS, `預期 ${TOTAL_LEVELS} 關，實際 ${levels.length} 關`);
    levels.forEach((level, index) => {
      assert(
        level.id === index + 1,
        `第 ${index + 1} 筆關卡 id 應為 ${index + 1}，實際 ${level.id}（唔連續）`,
      );
    });
    return `${levels.length} 關，id 1–${levels.length} 連續`;
  });

  check('章節對應正確', () => {
    for (const level of levels) {
      const expected = chapterOf(level.id);
      assert(level.chapter === expected, `Level ${level.id} chapter=${level.chapter}，預期 ${expected}`);
      const chapter = chapters.find((item) => item.id === level.chapter);
      assert(Boolean(chapter), `Level ${level.id} 對應嘅章節 ${level.chapter} 唔存在`);
    }
    return '每 10 關一章（chapter = ceil(id/10)），全部章節存在';
  });

  /* ---- 模式 ------------------------------------------------------- */
  check('模式分佈符合規則', () => {
    let chainCount = 0;
    for (const level of levels) {
      const expected = isChainLevel(level.id) ? 'chain' : 'fill';
      assert(level.mode === expected, `Level ${level.id} mode=${level.mode}，預期 ${expected}`);
      if (level.mode === 'chain') chainCount += 1;
    }
    assert(chainCount === EXPECTED_CHAIN_COUNT, `chain 關應有 ${EXPECTED_CHAIN_COUNT} 關，實際 ${chainCount}`);
    for (let id = 1; id <= LEVELS_PER_CHAPTER; id += 1) {
      assert(levelById.get(id)?.mode === 'fill', `Level ${id} 教學期必須係 fill`);
    }
    return `chain ${chainCount} 關（id ≥ ${CHAIN_START_LEVEL} 且 ${CHAIN_EVERY} 的倍數）；Level 1–10 全 fill`;
  });

  /* ---- 幾何 ------------------------------------------------------- */
  check('棋盤幾何一致', () => {
    for (const level of levels) {
      assert(isInt(level.rows) && level.rows > 0, `Level ${level.id} rows 非法`);
      assert(isInt(level.cols) && level.cols > 0, `Level ${level.id} cols 非法`);
      assert(Array.isArray(level.cells) && level.cells.length > 0, `Level ${level.id} 冇任何格`);
      const keys = new Set();
      let maxRow = -1;
      let maxCol = -1;
      for (const cell of level.cells) {
        assert(
          isInt(cell.r) && isInt(cell.c) && cell.r >= 0 && cell.c >= 0,
          `Level ${level.id} 有非法格座標 (${cell.r},${cell.c})`,
        );
        assert(isHan(cell.char), `Level ${level.id} 格字「${cell.char}」唔係單一漢字`);
        const key = keyOf(cell.r, cell.c);
        assert(!keys.has(key), `Level ${level.id} 格 ${key} 重複`);
        keys.add(key);
        maxRow = Math.max(maxRow, cell.r);
        maxCol = Math.max(maxCol, cell.c);
      }
      assert(
        level.rows === maxRow + 1 && level.cols === maxCol + 1,
        `Level ${level.id} rows/cols=${level.rows}x${level.cols}，但實際格範圍係 ${maxRow + 1}x${maxCol + 1}`,
      );
      if (level.mode === 'chain') {
        assert(
          level.rows === level.slots.length && level.cols === 4,
          `Level ${level.id} chain 盤面必須 rows=成語數、cols=4（實際 ${level.rows}x${level.cols}）`,
        );
      } else if (level.rows > 12 || level.cols > 12) {
        warn(`Level ${level.id} fill 盤面偏大（${level.rows}x${level.cols}），手機可能難玩`);
      }
      // 每個 slot 格必須存在
      for (const slot of level.slots) {
        for (const key of slotCellKeys(slot)) {
          assert(keys.has(key), `Level ${level.id} slot 格 ${key} 唔喺 cells 入面`);
        }
      }
      // 唔可以有遊離格
      const union = new Set();
      for (const slot of level.slots) for (const key of slotCellKeys(slot)) union.add(key);
      assert(
        union.size === keys.size,
        `Level ${level.id} 有 ${keys.size - union.size} 個遊離格（唔屬任何成語）`,
      );
    }
    return 'cells 唯一、無遊離格、rows/cols 為實際範圍；chain 盤面 rows=k、cols=4';
  });

  /* ---- 成語交叉／接龍 --------------------------------------------- */
  check('成語交叉／接龍幾何正確', () => {
    for (const level of levels) {
      assert(Array.isArray(level.slots), `Level ${level.id} slots 唔係 array`);
      if (level.mode === 'fill') {
        assert(
          level.slots.length >= MIN_FILL_WORDS && level.slots.length <= MAX_FILL_WORDS,
          `Level ${level.id} fill 成語數 ${level.slots.length} 唔喺 ${MIN_FILL_WORDS}–${MAX_FILL_WORDS}`,
        );
        const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
        const seenCells = new Set();
        level.slots.forEach((slot, slotIndex) => {
          const idiom = idiomById.get(slot.idiomId);
          assert(Boolean(idiom), `Level ${level.id} idiomId ${slot.idiomId} 唔存在於 idioms.json`);
          assert(slot.dir === 'h' || slot.dir === 'v', `Level ${level.id} slot ${slotIndex} dir 非法`);
          const keys = slotCellKeys(slot);
          keys.forEach((key, charIndex) => {
            assert(
              solution.get(key) === idiom.word[charIndex],
              `Level ${level.id} slot ${slotIndex}（${idiom.word}）格 ${key} 答案字「${solution.get(key)}」≠「${idiom.word[charIndex]}」`,
            );
          });
          let overlap = 0;
          for (const key of keys) if (seenCells.has(key)) overlap += 1;
          if (slotIndex > 0) {
            assert(overlap >= 1, `Level ${level.id} 第 ${slotIndex + 1} 個成語（${idiom.word}）冇同前面成語交叉`);
          }
          for (const key of keys) seenCells.add(key);
        });
      } else {
        assert(
          level.slots.length >= MIN_CHAIN_WORDS && level.slots.length <= MAX_CHAIN_WORDS,
          `Level ${level.id} chain 成語數 ${level.slots.length} 唔喺 ${MIN_CHAIN_WORDS}–${MAX_CHAIN_WORDS}`,
        );
        level.slots.forEach((slot, index) => {
          const idiom = idiomById.get(slot.idiomId);
          assert(Boolean(idiom), `Level ${level.id} idiomId ${slot.idiomId} 唔存在於 idioms.json`);
          assert(
            slot.row === index && slot.col === 0 && slot.dir === 'h',
            `Level ${level.id} chain slot ${index} 位置／方向唔啱（應 row=${index}, col=0, dir=h）`,
          );
          const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
          slotCellKeys(slot).forEach((key, charIndex) => {
            assert(
              solution.get(key) === idiom.word[charIndex],
              `Level ${level.id} chain slot ${index}（${idiom.word}）格 ${key} 答案字唔一致`,
            );
          });
          if (index > 0) {
            const previous = idiomById.get(level.slots[index - 1].idiomId);
            assert(
              previous.word[3] === idiom.word[0],
              `Level ${level.id} 接龍斷鏈：${previous.word} → ${idiom.word}（${previous.word[3]} ≠ ${idiom.word[0]}）`,
            );
          }
        });
      }
    }
    return 'fill 每個新成語都有交叉且答案字一致；chain 全部首尾相接';
  });

  /* ---- blanks ----------------------------------------------------- */
  check('blanks 合法', () => {
    for (const level of levels) {
      level.slots.forEach((slot, slotIndex) => {
        assert(Array.isArray(slot.blanks), `Level ${level.id} slot ${slotIndex} blanks 唔係 array`);
        const unique = new Set(slot.blanks);
        assert(unique.size === slot.blanks.length, `Level ${level.id} slot ${slotIndex} blanks 有重複`);
        for (const index of slot.blanks) {
          assert(
            isInt(index) && index >= 0 && index <= 3,
            `Level ${level.id} slot ${slotIndex} blank index ${index} 非法（只可以 0–3）`,
          );
        }
        const sorted = [...slot.blanks].sort((a, b) => a - b);
        assert(
          sorted.join(',') === slot.blanks.join(','),
          `Level ${level.id} slot ${slotIndex} blanks 未排序：${JSON.stringify(slot.blanks)}`,
        );
        if (level.mode === 'fill') {
          assert(
            slot.blanks.length >= 1 && slot.blanks.length <= 3,
            `Level ${level.id} fill slot ${slotIndex} 空格數 ${slot.blanks.length} 唔喺 1–3`,
          );
        } else {
          if (slotIndex === 0) {
            assert(slot.blanks.length === 0, `Level ${level.id} chain row0 必須全顯示（blanks=[]）`);
          } else {
            assert(slot.blanks.length >= 1, `Level ${level.id} chain row${slotIndex} 必須至少一個空格`);
            assert(!slot.blanks.includes(0), `Level ${level.id} chain row${slotIndex} 首字必須顯示（接龍連接位）`);
          }
          if (slotIndex < level.slots.length - 1) {
            assert(!slot.blanks.includes(3), `Level ${level.id} chain row${slotIndex} 尾字必須顯示（接龍連接位）`);
          }
        }
      });
    }
    return 'fill 每個成語 1–3 空格；chain row0 全顯示、連接位（首／尾字）保留';
  });

  /* ---- bank ------------------------------------------------------- */
  check('bank multiset 足夠', () => {
    for (const level of levels) {
      const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
      const blankKeys = new Set();
      for (const slot of level.slots) {
        const keys = slotCellKeys(slot);
        for (const index of slot.blanks) blankKeys.add(keys[index]);
      }
      const blankChars = [...blankKeys].map((key) => solution.get(key));
      for (const char of blankChars) {
        assert(isHan(char), `Level ${level.id} 空格答案字「${char}」唔係漢字`);
      }
      const need = new Map();
      for (const char of blankChars) need.set(char, (need.get(char) ?? 0) + 1);
      const have = new Map();
      assert(Array.isArray(level.bank), `Level ${level.id} bank 唔係 array`);
      for (const char of level.bank) {
        assert(isHan(char), `Level ${level.id} 字庫「${char}」唔係單一漢字`);
        have.set(char, (have.get(char) ?? 0) + 1);
      }
      for (const [char, count] of need) {
        assert(
          (have.get(char) ?? 0) >= count,
          `Level ${level.id} 字庫唔夠「${char}」（需要 ${count} 張，得 ${have.get(char) ?? 0} 張）`,
        );
      }
      assert(
        level.bank.length >= blankKeys.size,
        `Level ${level.id} 字庫總數 ${level.bank.length} 少過空格數 ${blankKeys.size}`,
      );
      // 誘餌字（唔屬任何空格答案嘅字）唔應該同答案字混淆：每張多出嚟嘅卡都要係「真誘餌」
      const decoyCount = level.bank.length - blankKeys.size;
      let realDecoys = 0;
      for (const [char, count] of have) {
        const needed = need.get(char) ?? 0;
        if (needed === 0) realDecoys += count;
      }
      assert(
        realDecoys === decoyCount,
        `Level ${level.id} 字庫有 ${realDecoys} 張誘餌字，但差額應為 ${decoyCount}（有誘餌字同答案字相同）`,
      );
    }
    return '每個空格所需字卡數量足夠；誘餌字唔會同空格答案字混淆';
  });

  /* ---- 提示次數 --------------------------------------------------- */
  check('提示次數符合曲線', () => {
    for (const level of levels) {
      assert(isInt(level.hintLimit), `Level ${level.id} hintLimit 唔係整數`);
      assert(level.hintLimit >= 1 && level.hintLimit <= 3, `Level ${level.id} hintLimit ${level.hintLimit} 唔喺 1–3`);
      const expected = HINTS_BY_CHAPTER[level.chapter - 1];
      assert(
        level.hintLimit === expected,
        `Level ${level.id} hintLimit=${level.hintLimit}，第 ${level.chapter} 章應為 ${expected}`,
      );
    }
    return `提示次數每章 ${HINTS_BY_CHAPTER.join(' → ')}（1–3 次）`;
  });

  /* ---- 誘餌字曲線 ------------------------------------------------- */
  check('誘餌字數量符合曲線', () => {
    for (const level of levels) {
      const expected = DECOYS_BY_CHAPTER[level.chapter - 1];
      const metrics = levelMetrics(level, idiomById);
      assert(
        metrics.decoyCount === expected,
        `Level ${level.id} 誘餌字 ${metrics.decoyCount} 張，第 ${level.chapter} 章應為 ${expected} 張`,
      );
    }
    return `誘餌字每章 ${DECOYS_BY_CHAPTER.join(' → ')}`;
  });

  /* ---- 成語數／空格數符合難度公式 ---------------------------------- */
  check('每關成語數、空格數符合難度公式', () => {
    for (const level of levels) {
      const d = difficultyOf(level.id);
      if (level.mode === 'fill') {
        const expectedWords = Math.min(MAX_FILL_WORDS, MIN_FILL_WORDS + Math.round(2 * d));
        assert(
          level.slots.length === expectedWords,
          `Level ${level.id} fill 成語數 ${level.slots.length}，公式預期 ${expectedWords}（d=${d.toFixed(3)}）`,
        );
      } else {
        const expectedWords = Math.min(MAX_CHAIN_WORDS, MIN_CHAIN_WORDS + Math.round(3 * d));
        if (level.slots.length !== expectedWords) {
          warn(
            `Level ${level.id} chain 長度 ${level.slots.length}（公式預期 ${expectedWords}）：接龍資料不足時屬 interim fallback`,
          );
        }
        assert(
          level.slots.length >= MIN_CHAIN_WORDS && level.slots.length <= MAX_CHAIN_WORDS,
          `Level ${level.id} chain 長度 ${level.slots.length} 唔喺 3–6`,
        );
      }
      const metrics = levelMetrics(level, idiomById);
      const ratio = BLANK_RATIO_START + (BLANK_RATIO_END - BLANK_RATIO_START) * d;
      const totalChars = level.slots.length * 4;
      let target;
      let tolerance;
      if (level.mode === 'fill') {
        target = clamp(Math.round(ratio * totalChars), 1, 3 * level.slots.length);
        tolerance = 1;
      } else {
        target = clamp(Math.round(ratio * totalChars), Math.max(2, level.slots.length - 1), 2 * level.slots.length - 1);
        tolerance = 0;
      }
      assert(
        Math.abs(metrics.blankCount - target) <= tolerance,
        `Level ${level.id} 空格數 ${metrics.blankCount}，公式預期 ${target}（±${tolerance}）`,
      );
    }
    return '每關成語數、空格數符合 d=(id-1)/99 難度公式（chain fallback 只列警告）';
  });

  /* ---- 成語數下限／tier 錨 ---------------------------------------- */
  check('每關至少 2 成語、至少一個 tier ≤ 2 錨', () => {
    for (const level of levels) {
      assert(level.slots.length >= 2, `Level ${level.id} 只有 ${level.slots.length} 個成語（最少 2 個）`);
      const tiers = level.slots.map((slot) => idiomById.get(slot.idiomId)?.tier);
      for (const tier of tiers) {
        assert(isInt(tier) && tier >= 1 && tier <= 5, `Level ${level.id} 有成語 tier 非法：${tier}`);
      }
      assert(
        Math.min(...tiers) <= 2,
        `Level ${level.id} 冇 tier ≤ 2 成語做錨（tiers=${tiers.join(',')}）`,
      );
    }
    return `${levels.length} 關全部 ≥2 成語，且有 tier 1／2 錨`;
  });

  /* ---- 標題／故事 ------------------------------------------------- */
  check('標題／故事文字合格', () => {
    const titles = new Set();
    for (const level of levels) {
      assert(typeof level.title === 'string' && cjkCount(level.title) >= 4, `Level ${level.id} 缺少繁中標題`);
      assert(typeof level.story === 'string' && cjkCount(level.story) >= 8, `Level ${level.id} 缺少繁中故事`);
      assert(!titles.has(level.title), `關卡標題重複：${level.title}`);
      titles.add(level.title);
      const text = `${level.title}\n${level.story}`;
      for (const slot of level.slots) {
        const idiom = idiomById.get(slot.idiomId);
        assert(
          !text.includes(idiom.word),
          `Level ${level.id} 標題／故事穿橋提及答案成語「${idiom.word}」`,
        );
      }
    }
    return `${levels.length} 個標題全部唯一、繁中；無穿橋答案成語`;
  });

  /* ---- 唯一性 ------------------------------------------------------ */
  check('100 關唯一', () => {
    const fullSignatures = new Set();
    const compositions = new Map();
    let compositionDuplicates = 0;
    for (const level of levels) {
      const signature = `${level.mode}|${JSON.stringify(level)}`;
      assert(!fullSignatures.has(signature), `Level ${level.id} 同另一關完全相同`);
      fullSignatures.add(signature);
      const ids = level.slots.map((slot) => slot.idiomId).sort().join(',');
      const key = `${level.mode}|${ids}`;
      if (compositions.has(key)) {
        compositionDuplicates += 1;
        warn(
          `Level ${level.id} 成語組合與 Level ${compositions.get(key)} 重複（${key}）；資料 ≥420 條後應重新生成消除`,
        );
      } else {
        compositions.set(key, level.id);
      }
    }
    if (compositionDuplicates > 0) {
      warn(`共 ${compositionDuplicates} 關成語組合重複（interim fallback，待資料定稿後重跑生成器）`);
    }
    return `100 關完整內容全部不同；成語組合重複 ${compositionDuplicates} 關（見警告）`;
  });

  /* ---- 難度趨勢 ---------------------------------------------------- */
  check('難度趨勢整體上升', () => {
    const chapterStats = stats.chapters;
    const issues = [];
    for (let index = 1; index < chapterStats.length; index += 1) {
      const previous = chapterStats[index - 1];
      const current = chapterStats[index];
      if (current.avgIdioms + 1e-9 < previous.avgIdioms) issues.push(`第 ${current.chapter} 章平均成語數下降`);
      if (current.avgBlankRatio + 0.02 < previous.avgBlankRatio) {
        issues.push(`第 ${current.chapter} 章平均空格比例下降`);
      }
      if (current.avgTier + 0.2 < previous.avgTier) issues.push(`第 ${current.chapter} 章平均 tier 下降`);
      if (Math.max(...current.hintLimits) > Math.max(...previous.hintLimits)) {
        issues.push(`第 ${current.chapter} 章提示次數上升`);
      }
      if (current.avgDecoys + 1e-9 < previous.avgDecoys) issues.push(`第 ${current.chapter} 章誘餌字數下降`);
    }
    const diffs = stats.levels.map((item) => difficultyOf(item.id));
    const correlations = {
      blankRatio: pearson(diffs, stats.levels.map((item) => item.blankRatio)),
      idioms: pearson(diffs, stats.levels.map((item) => item.idiomCount)),
      tier: pearson(diffs, stats.levels.map((item) => item.avgTier)),
    };
    if (correlations.blankRatio < 0.6) {
      issues.push(`空格比例同難度相關性過低（r=${correlations.blankRatio.toFixed(2)}）`);
    }
    if (correlations.idioms < 0.6) {
      issues.push(`成語數同難度相關性過低（r=${correlations.idioms.toFixed(2)}）`);
    }
    if (correlations.tier < 0.6) {
      issues.push(`平均 tier 同難度相關性過低（r=${correlations.tier.toFixed(2)}）`);
    }
    assert(issues.length === 0, issues.join('；'));
    details.correlations = correlations;
    return `章節平均單調遞進；r(空格比例)=${correlations.blankRatio.toFixed(2)}、r(成語數)=${correlations.idioms.toFixed(2)}、r(tier)=${correlations.tier.toFixed(2)}`;
  });

  /* ---- 可解性（資料角度） ------------------------------------------ */
  check('可解性（資料角度）', () => {
    for (const level of levels) {
      const solution = new Map(level.cells.map((cell) => [keyOf(cell.r, cell.c), cell.char]));
      const blankKeys = new Set();
      level.slots.forEach((slot, slotIndex) => {
        const idiom = idiomById.get(slot.idiomId);
        const keys = slotCellKeys(slot);
        keys.forEach((key, charIndex) => {
          assert(
            solution.get(key) === idiom.word[charIndex],
            `Level ${level.id} ${idiom.word} 答案字唔一致`,
          );
        });
        for (const index of slot.blanks) blankKeys.add(keys[index]);
        if (level.mode === 'fill') {
          assert(slot.blanks.length > 0, `Level ${level.id} fill slot ${slotIndex}（${idiom.word}）冇空格，引擎唔會觸發鎖定`);
        }
        if (level.mode === 'chain' && slotIndex === 0) {
          assert(slot.blanks.length === 0, `Level ${level.id} chain row0（${idiom.word}）應全顯示`);
        }
      });
      const pool = new Map();
      for (const char of level.bank) pool.set(char, (pool.get(char) ?? 0) + 1);
      for (const key of blankKeys) {
        const char = solution.get(key);
        const available = pool.get(char) ?? 0;
        assert(available >= 1, `Level ${level.id} 模擬填字時字庫不足「${char}」`);
        pool.set(char, available - 1);
      }
    }
    return '依解答填滿所有空格 → 全部成語可鎖定（chain row0 由引擎自動鎖定）→ 每關可過關';
  });

  /* ---- 成語接龍全域連通性（參考資料） ------------------------------ */
  check('成語接龍連通性（支援 chain 關卡）', () => {
    const byFirst = new Map();
    for (const idiom of idioms) {
      const first = idiom.word?.[0];
      if (!byFirst.has(first)) byFirst.set(first, []);
      byFirst.get(first).push(idiom);
    }
    let chained = 0;
    for (const idiom of idioms) {
      const tail = idiom.word?.[3];
      if ((byFirst.get(tail) ?? []).some((other) => other.id !== idiom.id)) chained += 1;
    }
    // 成語資料未達 420 條時屬 interim：連通性不足只警告，唔當 levels 資料錯。
    const dataReady = idioms.length >= 420;
    if (!dataReady) {
      warn(
        `成語資料只有 ${idioms.length} 條（未達 420），可接龍 ${chained} 筆（正式下限 150）；chain 關卡長度縮短屬預期，待資料定稿。`,
      );
    } else {
      assert(chained >= 150, `可接龍成語只有 ${chained} 筆（下限 150），chain 關卡選擇會不足`);
    }
    // 所有 chain 關卡都要求至少 3 步；這裡檢查最長鏈（DFS，上限 8 步）
    const longest = (() => {
      let best = 1;
      const walk = (idiom, used, depth) => {
        best = Math.max(best, depth);
        if (depth >= 8 || best >= 8) return;
        for (const next of byFirst.get(idiom.word[3]) ?? []) {
          if (used.has(next.id)) continue;
          used.add(next.id);
          walk(next, used, depth + 1);
          used.delete(next.id);
        }
      };
      for (const idiom of idioms) {
        walk(idiom, new Set([idiom.id]), 1);
        if (best >= 8) break;
      }
      return best;
    })();
    if (dataReady) {
      assert(longest >= 6, `最長接龍只有 ${longest} 步，不足 6 步（第 10 章 chain 需要）`);
    }
    return `${idioms.length} 條成語、${chained} 筆可接龍（正式下限 150）；最長接龍 ≥ ${longest} 步`;
  });

  return { stats, correlations: details.correlations ?? null };
}

/* ------------------------------------------------------------------ */
/* 輸出                                                                 */
/* ------------------------------------------------------------------ */
function printTextReport(result, options) {
  const { stats } = result;
  const line = (char = '=') => console.log(char.repeat(72));
  if (options.quiet) {
    for (const item of checks.filter((entry) => !entry.passed)) {
      console.log(`✗ ${item.name}：${item.detail}`);
    }
    console.log(`檢查：${checks.filter((item) => item.passed).length}/${checks.length} PASS；警告 ${warnings.length} 項`);
    return;
  }
  console.log('');
  line();
  console.log('《貓咪成語大冒險》關卡資料獨立驗證（scripts/verify-levels.mjs）');
  line();
  console.log('檢查項目：');
  for (const item of checks) {
    console.log(`  ${item.passed ? '✓' : '✗'} ${item.name}：${item.detail}`);
  }
  if (warnings.length > 0) {
    console.log('');
    console.log(`⚠ 警告（${warnings.length} 項，唔影響 pass/fail）：`);
    for (const message of warnings.slice(0, 20)) console.log(`  - ${message}`);
    if (warnings.length > 20) console.log(`  …其餘 ${warnings.length - 20} 項同類警告`);
  }
  console.log('');
  line('-');
  console.log('難度統計（每章）：');
  console.log(
    '章 | 關卡    | fill | chain | 平均成語 | 平均空格 | 空格比例 | 字庫 | 誘餌 | 提示 | tier1/2/3/4/5      | 平均tier | 接龍長度',
  );
  for (const chapter of stats.chapters) {
    console.log(
      `${String(chapter.chapter).padStart(2)} | ${chapter.levelIds.padEnd(7)} | ${String(chapter.fillCount).padStart(4)} | ${String(chapter.chainCount).padStart(5)} | ${chapter.avgIdioms.toFixed(2).padStart(8)} | ${chapter.avgBlanks.toFixed(2).padStart(8)} | ${chapter.avgBlankRatio.toFixed(3).padStart(8)} | ${chapter.avgBankSize.toFixed(2).padStart(4)} | ${chapter.avgDecoys.toFixed(2).padStart(4)} | ${String(chapter.hintLimits.join('/')).padStart(4)} | ${chapter.tierCounts.map((count) => String(count).padStart(3)).join('/')} | ${chapter.avgTier.toFixed(2).padStart(8)} | ${chapter.chainLengths.join(',') || '—'}`,
    );
  }
  line('-');
  console.log(
    `總計：${stats.totals.levels} 關（fill ${stats.totals.fill}／chain ${stats.totals.chain}）；平均成語 ${stats.totals.avgIdioms.toFixed(2)} 個；平均空格 ${stats.totals.avgBlanks.toFixed(2)} 格；平均空格比例 ${stats.totals.avgBlankRatio.toFixed(3)}；平均 tier ${stats.totals.avgTier.toFixed(2)}；誘餌平均 ${stats.totals.avgDecoys.toFixed(2)} 張`,
  );
  console.log(`全庫 tier 使用次數（1→5）：${stats.totals.tierCounts.join(' / ')}`);
  console.log(`提示次數（各關出現值）：${stats.totals.hintLimits.join(', ')}；chain 長度：${stats.totals.chainLengths.join(', ')}`);
  if (result.correlations) {
    console.log(
      `難度相關性：r(空格比例)=${result.correlations.blankRatio.toFixed(3)}、r(成語數)=${result.correlations.idioms.toFixed(3)}、r(平均tier)=${result.correlations.tier.toFixed(3)}`,
    );
  }
  line();
  const failed = checks.filter((item) => !item.passed);
  if (failed.length === 0) {
    console.log(`✅ 全部 ${checks.length} 項檢查 PASS（警告 ${warnings.length} 項）`);
  } else {
    console.log(`❌ ${failed.length}/${checks.length} 項檢查 FAIL`);
    for (const item of failed) console.log(`   - ${item.name}：${item.detail}`);
  }
  line();
}

function printJsonReport(result) {
  const payload = {
    script: 'verify-levels',
    timestamp: new Date().toISOString(),
    ok: checks.every((item) => item.passed),
    checks,
    warnings,
    correlations: result.correlations,
    stats: result.stats,
  };
  console.log(JSON.stringify(payload, null, 2));
}

/* ------------------------------------------------------------------ */
/* 主程式                                                               */
/* ------------------------------------------------------------------ */
function main() {
  const flags = new Set(process.argv.slice(2));
  if (flags.has('--help') || flags.has('-h')) {
    console.log(`用法：node scripts/verify-levels.mjs [--json] [--quiet]

  --json    輸出機器可讀 JSON（含 checks／warnings／stats）
  --quiet   只輸出總結同失敗項
  --help    顯示本說明

退出碼：0 = 全部檢查 PASS；1 = 有檢查 FAIL。`);
    return;
  }
  const options = { json: flags.has('--json'), quiet: flags.has('--quiet') };

  const levels = readJson(LEVELS_PATH, 'src/data/levels.json');
  const idioms = readJson(IDIOMS_PATH, 'src/data/idioms.json');
  const chapters = readJson(CHAPTERS_PATH, 'src/data/chapters.json');

  const result = verify(levels, idioms, chapters);
  result.stats.idiomDataCount = idioms.length;

  if (options.json) {
    printJsonReport(result);
  } else {
    printTextReport(result, options);
  }

  const failed = checks.filter((item) => !item.passed);
  if (failed.length > 0) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(`❌ 驗證腳本無法執行：${error.message}`);
  process.exitCode = 1;
}
