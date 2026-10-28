/**
 * 成語資料庫驗證（src/data/idioms.json）— 按 docs/PLAN.md §5.1 最終規格。
 * 資料未達 420 條時呢組測試會 FAIL，屬「待資料定稿」，詳見 docs/QA_REPORT.md。
 */
import { describe, expect, it } from 'vitest';
import { idioms } from '../../src/data/index';
import type { Idiom } from '../../src/core/types';
import { cjkCount } from './data-helpers';

/* ------------------------------------------------------------------ */
/* 拼音工具（獨立於 src 實作）                                          */
/* ------------------------------------------------------------------ */
const TONE_FOLD: Record<string, string> = {
  ā: 'a', á: 'a', ǎ: 'a', à: 'a',
  ē: 'e', é: 'e', ě: 'e', è: 'e',
  ī: 'i', í: 'i', ǐ: 'i', ì: 'i',
  ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
  ū: 'u', ú: 'u', ǔ: 'u', ù: 'u',
  ǖ: 'v', ǘ: 'v', ǚ: 'v', ǜ: 'v',
  ü: 'v',
};
const TONE_MARKS = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/gu;

const pinyinSyllables = (pinyin: string): string[] => pinyin.trim().split(/\s+/);
const foldSyllable = (syllable: string): string =>
  Array.from(syllable)
    .map((ch) => TONE_FOLD[ch] ?? ch)
    .join('');
const idFromPinyin = (pinyin: string): string => pinyinSyllables(pinyin).map(foldSyllable).join('-');

/* ------------------------------------------------------------------ */
/* 接龍連通性規格（PLAN §5.1）                                          */
/* ------------------------------------------------------------------ */
const CONNECTORS = [
  '一', '不', '人', '心', '天', '大', '小', '山', '水', '風',
  '日', '月', '目', '口', '手', '足', '馬', '龍', '虎', '金',
  '玉', '正', '堂', '行', '里', '中', '上', '下', '有', '無',
  '生', '死', '成', '明', '清', '花', '春', '秋', '雲', '海',
  '火', '石', '書', '言', '語', '事', '理', '道', '德',
];
const NO_TAIL_REQUIRED = new Set(['不', '小']);
const CONNECTOR_ALIASES: Record<string, string[]> = { 里: ['裡'] };

const words = idioms.map((idiom) => idiom.word);
const headsByChar = new Map<string, string[]>();
const tailsByChar = new Map<string, string[]>();
for (const word of words) {
  const head = word[0];
  const tail = word[3];
  headsByChar.set(head, [...(headsByChar.get(head) ?? []), word]);
  tailsByChar.set(tail, [...(tailsByChar.get(tail) ?? []), word]);
}

/** 可接龍成語：尾字可接去另一成語首字 */
function chainedIdioms(list: Idiom[]): Idiom[] {
  return list.filter((idiom) => {
    const tails = headsByChar.get(idiom.word[3]) ?? [];
    return tails.some((word) => word !== idiom.word);
  });
}

/** 最長接龍步數（DFS，上限 8 步足夠檢查 6 步 chain） */
function longestChain(list: Idiom[], cap = 8): number {
  const byHead = new Map<string, string[]>();
  for (const idiom of list) {
    byHead.set(idiom.word[0], [...(byHead.get(idiom.word[0]) ?? []), idiom.word]);
  }
  let best = 1;
  const walk = (word: string, used: Set<string>, depth: number): void => {
    best = Math.max(best, depth);
    if (depth >= cap || best >= cap) return;
    for (const next of byHead.get(word[3]) ?? []) {
      if (used.has(next)) continue;
      used.add(next);
      walk(next, used, depth + 1);
      used.delete(next);
    }
  };
  for (const word of words) {
    walk(word, new Set([word]), 1);
    if (best >= cap) break;
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* 測試                                                                */
/* ------------------------------------------------------------------ */
describe('成語資料（idioms.json）', () => {
  it('數量 ≥ 420 條（PLAN §5.1）', () => {
    expect(idioms.length).toBeGreaterThanOrEqual(420);
  });

  it('id 為 kebab-case、全庫唯一，且等於拼音去聲調', () => {
    const issues: string[] = [];
    const seen = new Set<string>();
    for (const [index, idiom] of idioms.entries()) {
      const at = `第 ${index + 1} 條（${idiom.word}）`;
      if (typeof idiom.id !== 'string' || !/^[a-z]+(?:-[a-z]+){3}$/.test(idiom.id)) {
        issues.push(`${at} id 唔係 4 節 kebab-case：${JSON.stringify(idiom.id)}`);
      } else if (seen.has(idiom.id)) {
        issues.push(`${at} id 重複：${idiom.id}`);
      } else {
        seen.add(idiom.id);
      }
      if (typeof idiom.pinyin === 'string') {
        const expected = idFromPinyin(idiom.pinyin);
        if (expected !== idiom.id) {
          issues.push(`${at} id「${idiom.id}」應由拼音得出「${expected}」`);
        }
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('word 正好 4 個漢字、全庫唯一', () => {
    const issues: string[] = [];
    const seen = new Set<string>();
    for (const [index, idiom] of idioms.entries()) {
      const at = `第 ${index + 1} 條（${idiom.id}）`;
      const chars = Array.from(idiom.word ?? '');
      if (chars.length !== 4) {
        issues.push(`${at} word「${idiom.word}」唔係 4 個字（${chars.length} 個）`);
        continue;
      }
      if (chars.some((ch) => !/[\u3400-\u4dbf\u4e00-\u9fff]/u.test(ch))) {
        issues.push(`${at} word「${idiom.word}」含非漢字字元`);
      }
      if (seen.has(idiom.word)) issues.push(`${at} word 重複：${idiom.word}`);
      seen.add(idiom.word);
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('pinyin 為 4 個帶聲調音節', () => {
    const issues: string[] = [];
    for (const [index, idiom] of idioms.entries()) {
      const at = `第 ${index + 1} 條（${idiom.word}）`;
      if (typeof idiom.pinyin !== 'string' || idiom.pinyin.trim() === '') {
        issues.push(`${at} 缺少拼音`);
        continue;
      }
      if (/\s{2,}|^\s|\s$/.test(idiom.pinyin)) {
        issues.push(`${at} 拼音音節之間只可以有一個空格：${idiom.pinyin}`);
      }
      const syllables = pinyinSyllables(idiom.pinyin);
      if (syllables.length !== 4) {
        issues.push(`${at} 拼音應有 4 個音節，實際 ${syllables.length} 個：${idiom.pinyin}`);
        continue;
      }
      for (const syllable of syllables) {
        const marks = syllable.match(TONE_MARKS) ?? [];
        if (marks.length !== 1) {
          issues.push(`${at} 音節「${syllable}」要有且只有一個聲調符號：${idiom.pinyin}`);
          continue;
        }
        // 聲調符號要還原做基礎元音先可以檢查拼音字母（例如 shé → she）
        const base = Array.from(syllable)
          .map((ch) => {
            const folded = TONE_FOLD[ch];
            if (folded === undefined) return ch;
            return folded === 'v' ? 'ü' : folded;
          })
          .join('');
        if (!/^[a-zü]+$/.test(base)) {
          issues.push(`${at} 音節「${syllable}」含非拼音字母：${idiom.pinyin}`);
        } else if (!/[aeiouü]/.test(base)) {
          issues.push(`${at} 音節「${syllable}」冇元音：${idiom.pinyin}`);
        }
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('meaning 15–60 漢字、origin 15–90 漢字', () => {
    const issues: string[] = [];
    for (const idiom of idioms) {
      const at = `（${idiom.word}）`;
      const meaningLength = cjkCount(idiom.meaning);
      const originLength = cjkCount(idiom.origin);
      if (typeof idiom.meaning !== 'string' || meaningLength < 15 || meaningLength > 60) {
        issues.push(`${at} meaning 漢字數 ${meaningLength} 唔喺 15–60`);
      }
      if (typeof idiom.origin !== 'string' || originLength < 15 || originLength > 90) {
        issues.push(`${at} origin 漢字數 ${originLength} 唔喺 15–90`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('sourceBook 為《書名·篇名》格式', () => {
    const issues: string[] = [];
    for (const idiom of idioms) {
      if (typeof idiom.sourceBook !== 'string' || !/^《[^《》]+》$/.test(idiom.sourceBook.trim())) {
        issues.push(`（${idiom.word}）sourceBook 格式唔啱：${JSON.stringify(idiom.sourceBook)}`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('tier 為 1–5 整數，分佈達標', () => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const issues: string[] = [];
    for (const idiom of idioms) {
      if (!Number.isInteger(idiom.tier) || idiom.tier < 1 || idiom.tier > 5) {
        issues.push(`（${idiom.word}）tier 非法：${JSON.stringify(idiom.tier)}`);
        continue;
      }
      counts[idiom.tier] += 1;
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);

    const minimum: Record<number, number> = { 1: 70, 2: 100, 3: 100, 4: 80, 5: 50 };
    const distribution = [1, 2, 3, 4, 5].map((tier) => ({
      tier,
      count: counts[tier],
      minimum: minimum[tier],
    }));
    const unmet = distribution.filter((item) => item.count < item.minimum);
    expect(
      unmet,
      `tier 分佈未達 PLAN §5.1 建議下限：${distribution
        .map((item) => `tier${item.tier} ${item.count}/${item.minimum}`)
        .join('、')}`,
    ).toEqual([]);
  });

  it('tags 如有提供，須為 1–3 個漢字分類', () => {
    const issues: string[] = [];
    for (const idiom of idioms) {
      if (idiom.tags === undefined) continue;
      if (!Array.isArray(idiom.tags) || idiom.tags.length < 1 || idiom.tags.length > 3) {
        issues.push(`（${idiom.word}）tags 數量唔啱：${JSON.stringify(idiom.tags)}`);
        continue;
      }
      for (const tag of idiom.tags) {
        if (typeof tag !== 'string' || !/^[\u3400-\u4dbf\u4e00-\u9fff]{1,4}$/u.test(tag)) {
          issues.push(`（${idiom.word}）tag「${tag}」唔係 1–4 個漢字`);
        }
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('接龍連通性：可接龍成語 ≥ 150、最長 ≥ 6', () => {
    const chained = chainedIdioms(idioms);
    expect(chained.length).toBeGreaterThanOrEqual(150);
    expect(longestChain(idioms)).toBeGreaterThanOrEqual(6);
  });

  it('接龍連通性：常用連接字兩端齊備（PLAN §5.1）', () => {
    const issues: string[] = [];
    for (const char of CONNECTORS) {
      const aliases = [char, ...(CONNECTOR_ALIASES[char] ?? [])];
      const heads = aliases.flatMap((alias) => headsByChar.get(alias) ?? []);
      const tails = aliases.flatMap((alias) => tailsByChar.get(alias) ?? []);
      if (heads.length === 0) issues.push(`連接字「${char}」冇任何成語以它開頭`);
      if (!NO_TAIL_REQUIRED.has(char) && tails.length === 0) {
        issues.push(`連接字「${char}」冇任何成語以它結尾`);
      }
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });
});
