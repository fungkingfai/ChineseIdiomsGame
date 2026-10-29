/**
 * 章節場景 SVG 驗證（src/cats/scenes.ts）— Issue #2：20 個場景 key。
 * 規格：docs/PLAN.md §4.1（20 章場景 keys）、§8（chapterSceneSVG 契約）。
 */
import { describe, expect, it } from 'vitest';
import { chapters } from '../../src/data/index';
import { SCENE_KEYS, chapterSceneSVG } from '../../src/cats/scenes';

/** PLAN §4.1：20 個場景 key（順序＝章節順序） */
const EXPECTED_SCENE_KEYS = [
  // 基礎篇
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
  // 進階篇（Issue #2）
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

const ADVANCED_SCENE_KEYS = EXPECTED_SCENE_KEYS.slice(10);

function idsIn(svg: string): string[] {
  return [...svg.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
}

describe('章節場景 SVG（20 場景，Issue #2）', () => {
  it('SCENE_KEYS 有 20 個 key、順序正確、無重複', () => {
    expect(SCENE_KEYS).toHaveLength(20);
    expect([...SCENE_KEYS]).toEqual(EXPECTED_SCENE_KEYS);
    expect(new Set(SCENE_KEYS).size).toBe(20);
  });

  it('10 個進階篇新場景 key 齊全', () => {
    for (const key of ADVANCED_SCENE_KEYS) {
      expect(SCENE_KEYS, `SCENE_KEYS 缺少進階場景 ${key}`).toContain(key);
    }
  });

  it('chapters.json 的 scene 依序對應 SCENE_KEYS（20 章）', () => {
    expect(chapters).toHaveLength(20);
    const scenes = chapters.map((chapter) => chapter.scene);
    expect(scenes).toEqual(EXPECTED_SCENE_KEYS);
  });

  it('chapterSceneSVG 對每個 key 回傳有效 800×450 SVG', () => {
    const issues: string[] = [];
    for (const key of SCENE_KEYS) {
      let svg = '';
      try {
        svg = chapterSceneSVG(key);
      } catch (error) {
        issues.push(`chapterSceneSVG('${key}') 拋錯：${(error as Error).message}`);
        continue;
      }
      if (typeof svg !== 'string' || !svg.trimStart().startsWith('<svg')) {
        issues.push(`chapterSceneSVG('${key}') 唔係 SVG 字串`);
        continue;
      }
      if (!svg.includes('viewBox="0 0 800 450"')) issues.push(`${key} 缺少 viewBox="0 0 800 450"`);
      if (!svg.includes(`scene-${key}`)) issues.push(`${key} 缺少 scene-${key} class／id 前綴`);
      if (!svg.includes('aria-hidden="true"')) issues.push(`${key} 缺少 aria-hidden="true"（純裝飾）`);
      if (!svg.trimEnd().endsWith('</svg>')) issues.push(`${key} 未正確閉合 </svg>`);
      if ((svg.match(/<svg/g) ?? []).length !== 1) issues.push(`${key} 內含多個 <svg> root`);
      if (/undefined|NaN|\[object Object\]/.test(svg)) issues.push(`${key} SVG 含 undefined／NaN`);
      if (svg.length < 800) issues.push(`${key} SVG 太短（${svg.length} chars），可能內容缺失`);
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('chapterSceneSVG deterministic、defs id 有 scene-<key>- 前綴且唯一', () => {
    const issues: string[] = [];
    for (const key of SCENE_KEYS) {
      const first = chapterSceneSVG(key);
      const second = chapterSceneSVG(key);
      if (first !== second) issues.push(`${key} 兩次輸出唔一致（非 deterministic）`);
      const ids = idsIn(first);
      const unique = new Set(ids);
      if (unique.size !== ids.length) issues.push(`${key} 有重複 SVG id`);
      for (const id of ids) {
        if (!id.startsWith(`scene-${key}-`)) issues.push(`${key} 的 id「${id}」冇 scene-${key}- 前綴`);
      }
      // 不同場景之間 id 唔會撞（前綴已保證，這裡再抽樣核對）
      if (ids.length === 0) issues.push(`${key} 冇任何 defs id（可能缺少漸變／濾鏡定義）`);
    }
    expect(issues, issues.slice(0, 12).join('\n')).toEqual([]);
  });

  it('未知 scene key fallback 去 garden，仍然係有效 SVG', () => {
    expect(chapterSceneSVG('not-a-scene')).toBe(chapterSceneSVG('garden'));
    expect(chapterSceneSVG('')).toBe(chapterSceneSVG('garden'));
    const fallback = chapterSceneSVG('not-a-scene');
    expect(fallback.startsWith('<svg')).toBe(true);
    expect(fallback.trimEnd().endsWith('</svg>')).toBe(true);
    expect(fallback.includes('scene-garden')).toBe(true);
  });
});
