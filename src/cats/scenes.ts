/**
 * 章節場景 SVG 美術（cat-animator 擁有）
 * ---------------------------------------------------------------
 * 20 個貓貓世界場景，全部 800×450、`preserveAspectRatio="xMidYMid slice"`、
 * `aria-hidden="true"` 的純裝飾 SVG：
 *
 * 基礎篇（第 1–10 章）：
 *   garden 櫻花庭園 / bamboo 竹林 / moon 月下書齋 / snow 雪山溫泉 / sea 海邊燈塔
 *   stars 星空詩會 / festival 燈會市集 / rain 雨後石巷 / cloud 雲端書樓 / summit 成語之巔
 * 進階篇（第 11–20 章，Issue #2）：
 *   library 藏經閣 / volcano 烈焰火山 / desert 大漠孤煙 / aurora 極光冰原 / underwater 海底龍宮
 *   skycastle 天空之城 / shrine 貓神古廟 / harbor 夜航碼頭 / firefly 螢火竹林 / zenith 蒼穹之巔
 *
 * 規格：
 *  - 每張圖有背景／中景／前景層次＋貓貓世界小細節（燈籠、腳印、書卷、雪人貓…）。
 *  - defs 內所有 id 都加 `scene-<key>-` 前綴，同一頁放 20 張都唔會撞 id。
 *  - 輸出完全 deterministic（用 seeded RNG，唔用 Math.random），re-render 唔會閃。
 *  - 環境動畫由 src/styles/cats.css 用 `.scene-*` class 控制；每張場景只有
 *    6–18 個動畫節點。地圖縮圖可用 `.is-static` 或
 *    `autoPauseOffscreenScenes()`（animate.ts）暫停 offscreen 場景動畫。
 */

import { autoPauseOffscreenScenes } from './animate';

export type SceneKey =
  | 'garden'
  | 'bamboo'
  | 'moon'
  | 'snow'
  | 'sea'
  | 'stars'
  | 'festival'
  | 'rain'
  | 'cloud'
  | 'summit'
  | 'library'
  | 'volcano'
  | 'desert'
  | 'aurora'
  | 'underwater'
  | 'skycastle'
  | 'shrine'
  | 'harbor'
  | 'firefly'
  | 'zenith';

export const SCENE_KEYS: readonly SceneKey[] = [
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

/** 基礎篇（第 1–10 章）場景 key */
export const BASE_SCENE_KEYS: readonly SceneKey[] = SCENE_KEYS.slice(0, 10);
/** 進階篇（第 11–20 章）場景 key */
export const ADVANCED_SCENE_KEYS: readonly SceneKey[] = SCENE_KEYS.slice(10);

/* ────────────────────────── 工具函數 ────────────────────────── */

function n(value: number): number {
  return Math.round(value * 10) / 10;
}

/** mulberry32：固定 seed 的偽隨機，確保每次 render 一樣 */
function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function linearGradient(
  id: string,
  stops: ReadonlyArray<readonly [offset: number, color: string, opacity?: number]>,
  vertical = true,
): string {
  const stopsXml = stops
    .map(
      ([offset, color, opacity]) =>
        `<stop offset="${offset}" stop-color="${color}"${opacity === undefined ? '' : ` stop-opacity="${opacity}"`}/>`,
    )
    .join('');
  return `<linearGradient id="${id}" x1="0" y1="${vertical ? 0 : 0.5}" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0.5}">${stopsXml}</linearGradient>`;
}

function radialGradient(
  id: string,
  stops: ReadonlyArray<readonly [offset: number, color: string, opacity?: number]>,
): string {
  const stopsXml = stops
    .map(
      ([offset, color, opacity]) =>
        `<stop offset="${offset}" stop-color="${color}"${opacity === undefined ? '' : ` stop-opacity="${opacity}"`}/>`,
    )
    .join('');
  return `<radialGradient id="${id}">${stopsXml}</radialGradient>`;
}

/** 只放喺 SVG 元素上的負延遲，令動畫錯開又唔會等到第一秒先出現 */
function delay(seconds: number): string {
  return ` style="animation-delay:-${n(Math.abs(seconds))}s"`;
}

/* ── 星星 ── */

interface StarFieldOptions {
  width?: number;
  height?: number;
  minY?: number;
  maxY?: number;
  color?: string;
  animated?: number;
  seed?: number;
  maxRadius?: number;
}

function starField(count: number, seed: number, opts: StarFieldOptions = {}): string {
  const rand = makeRng(seed);
  const width = opts.width ?? 800;
  const minY = opts.minY ?? 8;
  const maxY = opts.maxY ?? 300;
  const color = opts.color ?? '#fdf6ec';
  const animated = opts.animated ?? 0;
  const maxRadius = opts.maxRadius ?? 1.9;
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const x = n(rand() * width);
    const y = n(minY + rand() * (maxY - minY));
    const r = n(0.6 + rand() * (maxRadius - 0.6));
    const opacity = n(0.35 + rand() * 0.55);
    const isAnimated = i < animated;
    const cls = isAnimated ? 'scene-star scene-star--twinkle' : 'scene-star';
    const style = isAnimated ? delay(rand() * 5) : '';
    out += `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"${style}/>`;
  }
  return out;
}

/* ── 雲 ── */

function cloudPuff(
  x: number,
  y: number,
  s: number,
  fill: string,
  opacityV: number,
  cls = 'scene-cloud-puff',
  delaySeconds = 0,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${s})" opacity="${opacityV}">
      <g class="${cls}"${delay(delaySeconds)}>
        <ellipse cx="0" cy="0" rx="78" ry="24" fill="${fill}"/>
        <circle cx="-42" cy="-12" r="25" fill="${fill}"/>
        <circle cx="4" cy="-22" r="33" fill="${fill}"/>
        <circle cx="46" cy="-8" r="21" fill="${fill}"/>
      </g>
    </g>`;
}

/* ── 櫻花 ── */

function petal(x: number, y: number, rotate: number, fill: string, delaySeconds: number): string {
  return `
    <g transform="translate(${n(x)} ${n(y)}) rotate(${n(rotate)})">
      <path class="scene-petal" d="M0 0 C-4 -2 -5.2 -6 -2.6 -8.6 C-1 -9.6 0 -8 0 -8 C0 -8 1 -9.6 2.6 -8.6 C5.2 -6 4 -2 0 0 Z" fill="${fill}"${delay(delaySeconds)}/>
    </g>`;
}

interface SakuraTreeOptions {
  seed: number;
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  dense?: boolean;
}

function sakuraTree(opts: SakuraTreeOptions): string {
  const rand = makeRng(opts.seed);
  const scale = opts.scale ?? 1;
  const flip = opts.flip ? -1 : 1;
  const clusters = opts.dense ? 11 : 8;
  const blossomColors = ['#f7c1d0', '#f4a7bb', '#fce0e8', '#efb1c4', '#fbd3de'];
  const pickColor = (): string =>
    blossomColors[Math.floor(rand() * blossomColors.length)] ?? '#f4a7bb';
  let blossoms = '';
  for (let i = 0; i < clusters; i += 1) {
    const bx = n((rand() * 2 - 1) * (opts.dense ? 92 : 76));
    const by = n(-42 - rand() * (opts.dense ? 124 : 106));
    const br = n(13 + rand() * 15);
    // 主花叢＋幾朵重疊小花，做出雲朵感
    blossoms += `<circle cx="${bx}" cy="${by}" r="${br}" fill="${pickColor()}" opacity="${n(0.78 + rand() * 0.2)}"/>`;
    for (let j = 0; j < 3; j += 1) {
      const ox = n((rand() * 2 - 1) * br * 0.95);
      const oy = n((rand() * 2 - 1) * br * 0.62);
      blossoms += `<circle cx="${n(bx + ox)}" cy="${n(by + oy)}" r="${n(br * (0.4 + rand() * 0.3))}" fill="${pickColor()}" opacity="0.92"/>`;
    }
    blossoms += `<circle cx="${n(bx - br * 0.25)}" cy="${n(by - br * 0.3)}" r="${n(br * 0.2)}" fill="#fff4f7" opacity="0.7"/>`;
  }
  // 幾片散落花瓣圍住樹冠
  for (let i = 0; i < 4; i += 1) {
    const px = n((rand() * 2 - 1) * (opts.dense ? 110 : 92));
    const py = n(-20 - rand() * (opts.dense ? 130 : 110));
    blossoms += `<ellipse cx="${px}" cy="${py}" rx="4" ry="2.4" fill="${pickColor()}" transform="rotate(${n(rand() * 180)} ${px} ${py})" opacity="0.85"/>`;
  }
  return `
    <g transform="translate(${opts.x} ${opts.y}) scale(${scale * flip} ${scale})">
      <path d="M0 0 C-3 -34 -9 -62 -5 -88 C-2 -108 5 -118 13 -132" fill="none" stroke="#7c5a4d" stroke-width="11" stroke-linecap="round"/>
      <path d="M-4 -74 C-24 -88 -40 -94 -58 -100" fill="none" stroke="#7c5a4d" stroke-width="7" stroke-linecap="round"/>
      <path d="M2 -96 C18 -108 30 -118 44 -122" fill="none" stroke="#7c5a4d" stroke-width="7" stroke-linecap="round"/>
      <path d="M-1 -54 C-16 -60 -28 -62 -38 -58" fill="none" stroke="#7c5a4d" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M9 -118 C20 -128 32 -132 44 -132" fill="none" stroke="#7c5a4d" stroke-width="4" stroke-linecap="round"/>
      ${blossoms}
    </g>`;
}

/* ── 竹 ── */

function bambooStalk(
  x: number,
  height: number,
  width: number,
  color: string,
  opts: { lean?: number; nodes?: number; opacity?: number; highlight?: string } = {},
): string {
  const lean = opts.lean ?? 0;
  const nodes = opts.nodes ?? 7;
  const opacityV = opts.opacity ?? 1;
  const highlight = opts.highlight ?? '#dcebd0';
  let nodeLines = '';
  for (let i = 1; i < nodes; i += 1) {
    const y = -height + (height / nodes) * i;
    nodeLines += `<line x1="${-width / 2}" y1="${n(y)}" x2="${width / 2}" y2="${n(y)}" stroke="#5f7f5b" stroke-width="2.4" opacity="0.55"/>`;
  }
  return `
    <g transform="translate(${x} 452) rotate(${lean})" opacity="${opacityV}">
      <rect x="${-width / 2}" y="${-height}" width="${width}" height="${height}" rx="${width / 2}" fill="${color}"/>
      ${nodeLines}
      <rect x="${-width / 2 + 3}" y="${-height + 6}" width="${Math.max(2, width * 0.16)}" height="${height - 12}" rx="${width * 0.08}" fill="${highlight}" opacity="0.35"/>
    </g>`;
}

function bambooLeaves(
  x: number,
  y: number,
  scale: number,
  color: string,
  rotate = 0,
  opacityV = 0.9,
): string {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" fill="${color}" opacity="${opacityV}">
      <path d="M0 0 C20 -8 44 -10 64 -4 C42 4 20 6 0 0 Z"/>
      <path d="M-6 10 C8 22 26 30 44 30 C30 18 12 8 -6 10 Z"/>
      <path d="M-14 2 C-28 14 -38 28 -40 42 C-24 34 -14 20 -14 2 Z"/>
    </g>`;
}

/* ── 松樹（雪山用） ── */

function pineTree(
  x: number,
  y: number,
  scale: number,
  color: string,
  snow = '#f7fbff',
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <rect x="-5" y="-26" width="10" height="28" fill="#5d4a3e"/>
      <path d="M0 -118 L38 -54 L-38 -54 Z" fill="${color}"/>
      <path d="M0 -92 L46 -22 L-46 -22 Z" fill="${color}"/>
      <path d="M0 -64 L52 12 L-52 12 Z" fill="${color}"/>
      <path d="M0 -118 L24 -78 Q2 -70 -24 -78 Z" fill="${snow}" opacity="0.95"/>
      <path d="M0 -92 L29 -52 Q2 -44 -29 -52 Z" fill="${snow}" opacity="0.92"/>
      <path d="M0 -64 L32 -22 Q2 -14 -32 -22 Z" fill="${snow}" opacity="0.9"/>
    </g>`;
}

/* ── 石燈籠 ── */

function stoneLantern(x: number, y: number, scale = 1): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="2" rx="26" ry="7" fill="#5f6b5a" opacity="0.25"/>
      <rect x="-20" y="-14" width="40" height="14" rx="4" fill="#b9ae97"/>
      <rect x="-6" y="-46" width="12" height="34" rx="3" fill="#c8bda6"/>
      <rect x="-17" y="-70" width="34" height="26" rx="5" fill="#c8bda6"/>
      <rect x="-11" y="-64" width="22" height="15" rx="3" fill="#f7dd9a"/>
      <path d="M-27 -70 L0 -92 L27 -70 Z" fill="#a99e88"/>
      <circle cx="0" cy="-92" r="5" fill="#c8bda6"/>
      <path d="M-20 -76 L-27 -70 M20 -76 L27 -70" stroke="#a99e88" stroke-width="4"/>
    </g>`;
}

/* ── 和風燈籠 ── */

function paperLantern(
  x: number,
  y: number,
  scale: number,
  color: string,
  glow: string,
  delaySeconds = 0,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-lantern"${delay(delaySeconds)}>
        <line x1="0" y1="-18" x2="0" y2="-8" stroke="#6b4a35" stroke-width="2"/>
        <ellipse cx="0" cy="16" rx="26" ry="30" fill="${glow}" opacity="0.3"/>
        <rect x="-17" y="-8" width="34" height="6" rx="2" fill="#7a4a33"/>
        <ellipse cx="0" cy="14" rx="18" ry="21" fill="${color}"/>
        <path d="M-13 5 Q-16 14 -13 23 M-5 1 Q-8 14 -5 27 M5 1 Q8 14 5 27 M13 5 Q16 14 13 23" stroke="#b4653f" stroke-width="1.6" fill="none" opacity="0.5"/>
        <rect x="-17" y="26" width="34" height="6" rx="2" fill="#7a4a33"/>
        <line x1="0" y1="32" x2="0" y2="42" stroke="#7a4a33" stroke-width="2"/>
      </g>
    </g>`;
}

/* ── 鳥居 ── */

function torii(x: number, y: number, scale: number, color: string, dark: string): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-84 -8 Q-86 -52 -78 -54 L78 -54 Q86 -52 84 -8 L70 -8 Q72 -42 62 -42 L-62 -42 Q-72 -42 -70 -8 Z" fill="${dark}"/>
      <path d="M-96 -56 Q0 -76 96 -56 L92 -42 Q0 -60 -92 -42 Z" fill="${color}"/>
      <rect x="-86" y="-84" width="172" height="12" rx="5" fill="${dark}"/>
      <rect x="-62" y="-46" width="124" height="11" rx="4" fill="${color}"/>
      <rect x="-58" y="-42" width="12" height="94" rx="4" fill="${color}"/>
      <rect x="46" y="-42" width="12" height="94" rx="4" fill="${color}"/>
    </g>`;
}

/* ── 貓咪剪影 ── */

export interface CatSilhouetteOptions {
  x: number;
  y: number;
  scale?: number;
  fill?: string;
  scarf?: string;
  tailUp?: boolean;
}

/** 場景用嘅坐姿貓貓剪影（唔係主角，純裝飾） */
export function sceneCatSilhouette(opts: CatSilhouetteOptions): string {
  const scale = opts.scale ?? 1;
  const fill = opts.fill ?? '#2a3448';
  const scarf = opts.scarf ?? 'transparent';
  const tail = opts.tailUp
    ? 'M72 80 C94 78 104 60 96 44 C92 36 84 38 86 46'
    : 'M72 84 C92 92 102 104 96 116';
  return `
    <g transform="translate(${opts.x} ${opts.y}) scale(${scale})" fill="${fill}">
      <circle cx="50" cy="36" r="25"/>
      <path d="M30 22 L25 2 L44 14 Z"/>
      <path d="M70 22 L75 2 L56 14 Z"/>
      <ellipse cx="50" cy="82" rx="29" ry="27"/>
      <path d="${tail}" fill="none" stroke="${fill}" stroke-width="9" stroke-linecap="round"/>
      <path d="M33 56 Q50 66 67 56" fill="none" stroke="${scarf}" stroke-width="7" stroke-linecap="round"/>
    </g>`;
}

/* ── 腳印 ── */

function pawPrint(x: number, y: number, scale: number, fill: string, opacityV: number, rotate = 0): string {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" fill="${fill}" opacity="${opacityV}">
      <ellipse cx="0" cy="4" rx="6" ry="5"/>
      <circle cx="-7" cy="-5" r="3"/>
      <circle cx="0" cy="-8" r="3"/>
      <circle cx="7" cy="-5" r="3"/>
    </g>`;
}

/* ── 書本（雲端書樓／月下書齋） ── */

function floatingBook(
  x: number,
  y: number,
  scale: number,
  rotate: number,
  delaySeconds: number,
  color = '#6f9c76',
): string {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <g class="scene-float-book"${delay(delaySeconds)}>
        <path d="M-26 -16 L0 -12 L26 -16 L26 14 L0 18 L-26 14 Z" fill="${color}"/>
        <path d="M-22 -12 L0 -9 L22 -12 L22 10 L0 13 L-22 10 Z" fill="#fdf6ec"/>
        <path d="M0 -9 V13" stroke="${color}" stroke-width="2" opacity="0.6"/>
        <path d="M-18 -5 H-6 M-18 0 H-6 M6 -5 H18 M6 0 H18" stroke="#c9b79a" stroke-width="1.4"/>
      </g>
    </g>`;
}

/* ── 紙鶴 ── */

function paperCrane(x: number, y: number, scale: number, color: string, rotate = 0, delaySeconds = 0): string {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <g class="scene-crane"${delay(delaySeconds)} fill="${color}">
        <path d="M-30 4 L0 -8 L30 4 L0 12 Z" opacity="0.9"/>
        <path d="M0 -8 L-8 -26 L2 -12 Z"/>
        <path d="M0 -8 L10 -25 L12 -10 Z"/>
        <path d="M-30 4 L-42 -2 L-28 10 Z" opacity="0.75"/>
      </g>
    </g>`;
}

/* ── 煙花 ── */

function firework(x: number, y: number, scale: number, color: string, delaySeconds: number): string {
  let rays = '';
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    const inner = 14;
    const outer = 34 + (i % 3) * 8;
    const x1 = n(Math.cos(angle) * inner);
    const y1 = n(Math.sin(angle) * inner);
    const x2 = n(Math.cos(angle) * outer);
    const y2 = n(Math.sin(angle) * outer);
    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-firework"${delay(delaySeconds)}>
        <circle cx="0" cy="0" r="7" fill="${color}" opacity="0.9"/>
        ${rays}
        <circle cx="-30" cy="-18" r="2" fill="${color}" opacity="0.7"/>
        <circle cx="32" cy="-24" r="2.4" fill="${color}" opacity="0.65"/>
        <circle cx="24" cy="30" r="1.8" fill="${color}" opacity="0.6"/>
      </g>
    </g>`;
}

/* ── 攤位（燈會） ── */

function festivalStall(
  x: number,
  y: number,
  scale: number,
  curtain: string,
  accent: string,
): string {
  let cloth = '';
  for (let i = 0; i < 4; i += 1) {
    const sx = -76 + i * 38;
    const color = i % 2 === 0 ? curtain : accent;
    cloth += `<path d="M${sx} -84 H${sx + 36} V-50 Q${sx + 18} -42 ${sx} -50 Z" fill="${color}"/>`;
  }
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="12" rx="104" ry="11" fill="#2f2030" opacity="0.5"/>
      <!-- 支柱 -->
      <path d="M-86 8 V-98 M86 8 V-98" stroke="#4a3030" stroke-width="8" stroke-linecap="round"/>
      <!-- 屋頂 -->
      <rect x="-92" y="-120" width="184" height="9" rx="4" fill="#5a2f34"/>
      <path d="M-114 -94 Q-106 -114 -88 -114 H88 Q106 -114 114 -94 L106 -82 Q96 -100 80 -100 H-80 Q-96 -100 -106 -82 Z" fill="#7e3b3f"/>
      <path d="M-88 -114 H88 Q99 -114 107 -100 L99 -94 H-99 L-107 -100 Q-99 -114 -88 -114 Z" fill="#a15054"/>
      <path d="M-122 -90 Q-112 -100 -100 -90 M122 -90 Q112 -100 100 -90" fill="none" stroke="#c46a64" stroke-width="4" stroke-linecap="round"/>
      <!-- 暖光 -->
      <ellipse cx="0" cy="-80" rx="98" ry="15" fill="#ffd98a" opacity="0.24"/>
      <circle cx="-94" cy="-100" r="18" fill="#ffd98a" opacity="0.3"/>
      <circle cx="-94" cy="-100" r="5" fill="#f7dd9a"/>
      <circle cx="94" cy="-100" r="18" fill="#ffd98a" opacity="0.3"/>
      <circle cx="94" cy="-100" r="5" fill="#f7dd9a"/>
      <!-- 布簾＋貓爪紋 -->
      ${cloth}
      ${pawPrint(-2, -66, 0.9, '#fdf6ec', 0.95)}
      <!-- 櫃檯 -->
      <rect x="-96" y="-28" width="192" height="13" rx="4" fill="#c99a63"/>
      <rect x="-90" y="-16" width="180" height="28" rx="4" fill="#5a3a3c"/>
      <path d="M-74 -16 V12 M-52 -16 V12 M-30 -16 V12 M-8 -16 V12 M14 -16 V12 M36 -16 V12 M58 -16 V12" stroke="#7e3b3f" stroke-width="2" opacity="0.8"/>
      <!-- 櫃上小食 -->
      <g transform="translate(-52 -34)">
        <path d="M0 12 V-18" stroke="#d9c07a" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="0" cy="-8" r="4.6" fill="#f4a7bb"/>
        <circle cx="0" cy="-16" r="4.6" fill="#fdf6ec"/>
        <circle cx="0" cy="-24" r="4.6" fill="#f7c1d0"/>
      </g>
      <g transform="translate(38 -34)">
        <rect x="-10" y="-14" width="9" height="26" rx="3" fill="#7e5257"/>
        <rect x="2" y="-8" width="9" height="20" rx="3" fill="#9c7440"/>
        <rect x="-10" y="-16" width="9" height="4" rx="2" fill="#f7dd9a"/>
      </g>
      <g fill="#f7dd9a" opacity="0.9">
        <circle cx="-72" cy="-36" r="3.4"/>
        <circle cx="70" cy="-38" r="3"/>
        <circle cx="16" cy="-36" r="2.6"/>
      </g>
    </g>`;
}

/* ────────────────────────── 各場景 ────────────────────────── */

function gardenScene(): string {
  const key = 'garden';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#fde7ef'],
      [0.55, '#fdf1ea'],
      [1, '#fff8ec'],
    ])}
    ${linearGradient(`scene-${key}-ground`, [
      [0, '#c3dcb0'],
      [1, '#9cc38d'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#fffdf8', 0.85],
      [1, '#fff8e8', 0],
    ])}
    ${radialGradient(`scene-${key}-pond`, [
      [0, '#d3ece2'],
      [0.7, '#a9d3c6'],
      [1, '#8fc2b8'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="650" cy="86" r="128" fill="url(#scene-${key}-sun)"/>
  <circle cx="650" cy="86" r="48" fill="#fffdf8" opacity="0.72"/>

  <!-- 远景山丘 -->
  <path d="M0 306 Q140 246 300 272 T800 250 V450 H0 Z" fill="#d9e8c9"/>
  <path d="M0 336 Q180 292 360 316 T800 296 V450 H0 Z" fill="#c5dcb2"/>
  <path d="M0 372 Q220 332 420 350 T800 338 V450 H0 Z" fill="url(#scene-${key}-ground)"/>

  <!-- 鳥居 -->
  ${torii(400, 306, 0.92, '#d98d92', '#b96f75')}

  <!-- 櫻花樹（左／右） -->
  ${sakuraTree({ seed: 11, x: 86, y: 420, scale: 1.02, dense: true })}
  ${sakuraTree({ seed: 27, x: 726, y: 408, scale: 0.9, flip: true })}

  <!-- 小徑（由闊到窄，引向鳥居） -->
  <path d="M292 450 Q352 408 396 372 Q426 348 434 336 L464 336 Q474 354 510 392 Q544 422 566 450 Z" fill="#f4e8d2" opacity="0.95"/>
  <path d="M292 450 Q352 408 396 372 Q426 348 434 336 M464 336 Q474 354 510 392 Q544 422 566 450" fill="none" stroke="#e7d6b9" stroke-width="3" opacity="0.65"/>
  <g fill="#e9d8bc" opacity="0.8">
    <ellipse cx="424" cy="422" rx="30" ry="7"/>
    <ellipse cx="482" cy="394" rx="24" ry="6"/>
    <ellipse cx="448" cy="366" rx="18" ry="4.6"/>
    <ellipse cx="450" cy="346" rx="13" ry="3.6"/>
  </g>
  <g fill="#d9c4a4" opacity="0.55">
    <ellipse cx="360" cy="438" rx="22" ry="5"/>
    <ellipse cx="520" cy="432" rx="18" ry="4.4"/>
  </g>

  <!-- 池塘邊長椅 ＋ 小貓 -->
  <g transform="translate(280 400)">
    <ellipse cx="0" cy="20" rx="38" ry="6" fill="#a9b79a" opacity="0.5"/>
    <rect x="-30" y="2" width="60" height="7" rx="3" fill="#a98460"/>
    <rect x="-24" y="-8" width="48" height="6" rx="3" fill="#c99a63"/>
    <path d="M-24 9 v13 M24 9 v13" stroke="#8d6a4a" stroke-width="4" stroke-linecap="round"/>
  </g>
  ${sceneCatSilhouette({ x: 252, y: 358, scale: 0.42, fill: '#6b5a4d', scarf: '#6f9c76' })}

  <!-- 池塘 -->
  <ellipse cx="146" cy="399" rx="128" ry="42" fill="url(#scene-${key}-pond)"/>
  <ellipse cx="146" cy="399" rx="128" ry="42" fill="none" stroke="#f3ead7" stroke-width="6" opacity="0.75"/>
  <ellipse cx="104" cy="392" rx="26" ry="5" fill="#eaf6f0" opacity="0.6"/>
  <ellipse cx="196" cy="406" rx="18" ry="4" fill="#eaf6f0" opacity="0.5"/>
  <!-- 錦鯉 -->
  <g transform="translate(118 398) rotate(-8)">
    <ellipse cx="0" cy="0" rx="16" ry="6" fill="#f09a5c"/>
    <path d="M-14 0 L-26 -6 L-24 6 Z" fill="#f09a5c"/>
    <circle cx="9" cy="-1.5" r="1.4" fill="#5b4634"/>
  </g>
  <g transform="translate(186 408) rotate(12)">
    <ellipse cx="0" cy="0" rx="13" ry="5" fill="#fdf6ec"/>
    <path d="M-11 0 L-21 -5 L-19 5 Z" fill="#f7c1d0"/>
    <circle cx="7" cy="-1" r="1.2" fill="#5b4634"/>
  </g>

  <!-- 石燈籠同石頭 -->
  ${stoneLantern(600, 392, 1.05)}
  <ellipse cx="676" cy="412" rx="26" ry="9" fill="#a9b79a"/>
  <ellipse cx="704" cy="418" rx="17" ry="6" fill="#b8c4a9"/>
  <ellipse cx="266" cy="330" rx="20" ry="7" fill="#b8c4a9"/>

  <!-- 草地小花草 -->
  <g stroke="#7f9f6d" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.8">
    <path d="M48 436 q-4 -12 1 -18 M54 438 q4 -10 9 -13"/>
    <path d="M712 440 q-5 -12 0 -19 M719 441 q5 -10 10 -14"/>
    <path d="M450 424 q-4 -10 1 -15 M457 425 q5 -8 9 -11"/>
  </g>
  <g fill="#f4a7bb" opacity="0.85">
    <circle cx="44" cy="418" r="3.4"/><circle cx="58" cy="426" r="2.6"/>
    <circle cx="716" cy="424" r="3.2"/><circle cx="454" cy="412" r="2.8"/>
  </g>

  <!-- 腳印 -->
  ${pawPrint(348, 430, 0.9, '#d9c4a4', 0.8, 18)}
  ${pawPrint(384, 404, 0.85, '#d9c4a4', 0.75, 26)}
  ${pawPrint(412, 374, 0.8, '#d9c4a4', 0.7, 18)}

  <!-- 前景垂枝櫻花（框景） -->
  <g>
    <path d="M-10 18 C60 44 118 60 176 58" fill="none" stroke="#7c5a4d" stroke-width="7" stroke-linecap="round"/>
    <path d="M40 34 C34 52 28 66 20 76" fill="none" stroke="#7c5a4d" stroke-width="4" stroke-linecap="round"/>
    <path d="M118 54 C122 70 130 82 140 90" fill="none" stroke="#7c5a4d" stroke-width="4" stroke-linecap="round"/>
    <g>
      <circle cx="14" cy="12" r="24" fill="#f7c1d0"/><circle cx="42" cy="30" r="19" fill="#fce0e8"/><circle cx="72" cy="34" r="23" fill="#f4a7bb"/>
      <circle cx="104" cy="48" r="18" fill="#fbd3de"/><circle cx="132" cy="58" r="22" fill="#f7c1d0"/><circle cx="164" cy="52" r="16" fill="#fce0e8"/>
      <circle cx="24" cy="72" r="16" fill="#f4a7bb"/><circle cx="150" cy="88" r="15" fill="#f7c1d0"/>
      <circle cx="34" cy="20" r="9" fill="#fff4f7" opacity="0.75"/><circle cx="142" cy="48" r="8" fill="#fff4f7" opacity="0.7"/>
    </g>
    <path d="M800 30 C740 52 690 64 640 62" fill="none" stroke="#7c5a4d" stroke-width="6" stroke-linecap="round"/>
    <g>
      <circle cx="792" cy="20" r="20" fill="#fce0e8"/><circle cx="764" cy="34" r="17" fill="#f7c1d0"/><circle cx="730" cy="44" r="20" fill="#f4a7bb"/>
      <circle cx="700" cy="54" r="15" fill="#fbd3de"/><circle cx="664" cy="58" r="18" fill="#fce0e8"/>
      <circle cx="776" cy="44" r="8" fill="#fff4f7" opacity="0.7"/>
    </g>
  </g>

  <!-- 前景花草 -->
  <g stroke="#6f9568" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.85">
    <path d="M96 444 q-6 -18 2 -28 M108 448 q7 -16 14 -22 M118 446 q2 -14 8 -20"/>
    <path d="M624 440 q-6 -16 2 -24 M636 444 q7 -14 13 -19"/>
    <path d="M268 446 q-5 -14 2 -21 M278 449 q6 -12 12 -16"/>
  </g>
  <g fill="#fdf6ec" opacity="0.95">
    <circle cx="98" cy="414" r="4.2"/><circle cx="92" cy="420" r="3"/>
    <circle cx="630" cy="412" r="3.8"/>
  </g>
  <g fill="#f4a7bb" opacity="0.9">
    <circle cx="112" cy="424" r="3.4"/><circle cx="120" cy="430" r="2.6"/>
    <circle cx="644" cy="422" r="3.2"/><circle cx="272" cy="424" r="3"/>
  </g>

  <!-- 飄落櫻花 -->
  ${petal(180, 96, 12, '#f7c1d0', 0.4)}
  ${petal(252, 74, -22, '#f4a7bb', 2.1)}
  ${petal(330, 130, 44, '#fce0e8', 3.6)}
  ${petal(96, 200, 90, '#f7c1d0', 5.2)}
  ${petal(560, 120, 8, '#f4a7bb', 1.2)}
  ${petal(640, 180, -34, '#fce0e8', 4.4)}
  ${petal(700, 92, 52, '#f7c1d0', 2.8)}
  ${petal(470, 236, -12, '#f4a7bb', 6.1)}
  ${petal(760, 260, 30, '#fce0e8', 3.1)}
  ${petal(206, 178, -40, '#f4a7bb', 4.8)}
  <g fill="#f7c1d0" opacity="0.85">
    <ellipse cx="300" cy="420" rx="4" ry="2.4" transform="rotate(-18 300 420)"/>
    <ellipse cx="470" cy="438" rx="3.4" ry="2" transform="rotate(24 470 438)"/>
    <ellipse cx="640" cy="432" rx="4" ry="2.2" transform="rotate(-8 640 432)"/>
    <ellipse cx="536" cy="330" rx="3.6" ry="2.1" transform="rotate(-20 536 330)"/>
  </g>`;
}

function bambooScene(): string {
  const key = 'bamboo';
  let backStalks = '';
  const backRand = makeRng(101);
  for (let i = 0; i < 11; i += 1) {
    backStalks += bambooStalk(n(30 + i * 74 + backRand() * 30), n(300 + backRand() * 130), n(9 + backRand() * 8), '#b9d2a7', {
      lean: n((backRand() - 0.5) * 4),
      opacity: 0.55,
      nodes: 8,
    });
  }
  let midStalks = '';
  const midRand = makeRng(202);
  for (let i = 0; i < 7; i += 1) {
    midStalks += bambooStalk(n(60 + i * 118 + midRand() * 24), n(350 + midRand() * 90), n(16 + midRand() * 9), '#93b383', {
      lean: n((midRand() - 0.5) * 5),
      nodes: 9,
    });
  }
  let leaves = '';
  const leafRand = makeRng(303);
  for (let i = 0; i < 13; i += 1) {
    leaves += bambooLeaves(
      n(20 + leafRand() * 760),
      n(20 + leafRand() * 250),
      n(0.45 + leafRand() * 0.6),
      leafRand() > 0.5 ? '#7fa06f' : '#6f9568',
      n((leafRand() - 0.5) * 60),
      n(0.55 + leafRand() * 0.4),
    );
  }
  let fireflies = '';
  const ffRand = makeRng(404);
  for (let i = 0; i < 9; i += 1) {
    const fx = n(50 + ffRand() * 700);
    const fy = n(180 + ffRand() * 220);
    fireflies += `<g transform="translate(${fx} ${fy})">
      <circle cx="0" cy="0" r="8" fill="#f7e38a" opacity="0.16"/>
      <circle class="scene-firefly" cx="0" cy="0" r="2.6" fill="#f7e38a"${delay(ffRand() * 6)}/>
    </g>`;
  }
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#e4efdc'],
      [0.6, '#f2f8ea'],
      [1, '#fbfdf5'],
    ])}
    ${radialGradient(`scene-${key}-light`, [
      [0, '#fffef0', 0.9],
      [1, '#fffef0', 0],
    ])}
    ${linearGradient(`scene-${key}-path`, [
      [0, '#cfd8bd'],
      [1, '#aebd9c'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="150" cy="60" r="150" fill="url(#scene-${key}-light)"/>
  <!-- 林間光柱 -->
  <g fill="#fffef0" opacity="0.15">
    <path d="M126 34 L216 34 L468 450 L396 450 Z"/>
    <path d="M264 14 L322 14 L610 450 L552 450 Z"/>
    <path d="M38 104 L92 104 L288 450 L238 450 Z"/>
  </g>

  <!-- 背景竹 -->
  ${backStalks}
  <!-- 中景霧氣 -->
  <ellipse cx="400" cy="330" rx="480" ry="60" fill="#ffffff" opacity="0.34"/>
  <ellipse cx="220" cy="250" rx="360" ry="40" fill="#ffffff" opacity="0.22"/>
  <!-- 中景竹 -->
  ${midStalks}
  ${leaves}

  <!-- 小徑（闊→窄，帶石階） -->
  <path d="M286 450 Q352 410 404 366 Q440 336 452 318 L474 316 Q486 338 516 374 Q552 412 580 450 Z" fill="url(#scene-${key}-path)" opacity="0.92"/>
  <path d="M286 450 Q352 410 404 366 Q440 336 452 318 M474 316 Q486 338 516 374 Q552 412 580 450" fill="none" stroke="#c3cfae" stroke-width="3" opacity="0.6"/>
  <g fill="#b3c19d" opacity="0.9">
    <ellipse cx="432" cy="426" rx="26" ry="6"/>
    <ellipse cx="470" cy="398" rx="21" ry="5"/>
    <ellipse cx="442" cy="372" rx="17" ry="4.2"/>
    <ellipse cx="452" cy="350" rx="13" ry="3.5"/>
    <ellipse cx="458" cy="334" rx="10" ry="3"/>
  </g>

  <!-- 石燈籠與石頭 -->
  ${stoneLantern(620, 380, 1.1)}
  <ellipse cx="700" cy="408" rx="34" ry="12" fill="#8d9d7d"/>
  <ellipse cx="666" cy="420" rx="22" ry="8" fill="#a3b392"/>
  <ellipse cx="160" cy="404" rx="30" ry="10" fill="#94a483"/>
  <ellipse cx="128" cy="414" rx="18" ry="7" fill="#a3b392"/>

  <!-- 前景竹（左右框景） -->
  ${bambooStalk(22, 452, 30, '#6f9568', { nodes: 10, lean: 2 })}
  ${bambooStalk(70, 430, 22, '#7fa06f', { nodes: 9, lean: -2 })}
  ${bambooStalk(776, 452, 34, '#6f9568', { nodes: 10, lean: -2 })}
  ${bambooStalk(730, 424, 20, '#7fa06f', { nodes: 8, lean: 3 })}
  ${bambooLeaves(782, 54, 0.75, '#6f9568', 8, 0.95)}
  ${bambooLeaves(36, 36, 0.7, '#7fa06f', -12, 0.95)}
  ${bambooLeaves(750, 214, 0.55, '#6f9568', 26, 0.8)}
  <!-- 前景地面蕨葉 -->
  <g fill="#5f7f5b" opacity="0.75">
    <path d="M96 450 C118 424 150 414 178 418 C152 428 126 438 104 452 Z"/>
    <path d="M712 450 C690 426 660 418 634 422 C660 430 686 440 706 452 Z"/>
  </g>

  <!-- 石貓守護像 -->
  <g>
    <ellipse cx="556" cy="406" rx="42" ry="10" fill="#5f7f5b" opacity="0.32"/>
    <path d="M-28 34 H28 L22 18 H-22 Z" transform="translate(548 388)" fill="#aab89a"/>
    ${sceneCatSilhouette({ x: 526, y: 348, scale: 0.5, fill: '#9fae8d', scarf: '#d96f6f', tailUp: true })}
    <circle cx="540" cy="400" r="7" fill="#7fa06f" opacity="0.6"/>
    <circle cx="566" cy="404" r="5" fill="#7fa06f" opacity="0.5"/>
  </g>
  <!-- 青苔石與落葉 -->
  <ellipse cx="676" cy="430" rx="30" ry="9" fill="#7fa06f" opacity="0.55"/>
  <g fill="#d9c07a" opacity="0.85">
    <path d="M320 436 C330 432 342 434 350 438 C340 442 328 441 320 436 Z"/>
    <path d="M476 442 C486 438 498 440 506 444 C496 448 484 447 476 442 Z"/>
    <path d="M522 414 C530 411 540 413 546 417 C538 420 528 419 522 414 Z"/>
  </g>

  <!-- 飄落竹葉 + 螢火蟲 -->
  <g class="scene-leaf"${delay(1.4)}><path d="M210 120 C224 116 238 118 248 124 C234 130 220 128 210 120 Z" fill="#8fb083" opacity="0.85"/></g>
  <g class="scene-leaf"${delay(4.2)}><path d="M600 60 C614 56 628 58 638 64 C624 70 610 68 600 60 Z" fill="#7fa06f" opacity="0.8"/></g>
  ${fireflies}

  <!-- 腳印 -->
  ${pawPrint(430, 430, 0.85, '#8b9c7a', 0.55, 20)}
  ${pawPrint(450, 398, 0.8, '#8b9c7a', 0.5, 12)}
  ${pawPrint(468, 366, 0.7, '#8b9c7a', 0.45, 22)}`;
}

function moonScene(): string {
  const key = 'moon';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#1b2745'],
      [0.55, '#33426b'],
      [1, '#586a96'],
    ])}
    ${radialGradient(`scene-${key}-moonGlow`, [
      [0, '#fdf3d8', 0.55],
      [1, '#fdf3d8', 0],
    ])}
    ${radialGradient(`scene-${key}-windowGlow`, [
      [0, '#f7dd9a', 0.65],
      [1, '#f7dd9a', 0],
    ])}
    ${linearGradient(`scene-${key}-ground`, [
      [0, '#3c4868'],
      [1, '#2a3450'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  ${starField(46, 901, { maxY: 250, animated: 12 })}

  <!-- 月亮 -->
  <circle cx="612" cy="98" r="126" fill="url(#scene-${key}-moonGlow)"/>
  <circle cx="612" cy="98" r="58" fill="#fdf3d8"/>
  <circle cx="594" cy="82" r="9" fill="#efe3c2" opacity="0.8"/>
  <circle cx="628" cy="112" r="6" fill="#efe3c2" opacity="0.7"/>
  <circle cx="610" cy="126" r="4" fill="#efe3c2" opacity="0.6"/>

  <!-- 流星 -->
  <g class="scene-shooting"${delay(3.2)}>
    <path d="M120 70 L206 44" stroke="#fdf6ec" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>
    <path d="M206 44 L214 41" stroke="#fdf6ec" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- 薄雲 -->
  ${cloudPuff(180, 190, 1.5, '#7284ad', 0.22, 'scene-cloud-puff', 2.4)}
  ${cloudPuff(560, 240, 1.1, '#7284ad', 0.18, 'scene-cloud-puff', 5.1)}
  ${cloudPuff(420, 60, 0.8, '#7284ad', 0.14, 'scene-cloud-puff', 8.3)}

  <!-- 左側竹林剪影 -->
  <g opacity="0.95">
    ${bambooStalk(28, 452, 14, '#202a44', { nodes: 8, lean: -1.5, highlight: '#2b3a60' })}
    ${bambooStalk(66, 452, 10, '#202a44', { nodes: 9, lean: 1.2, highlight: '#2b3a60' })}
    ${bambooStalk(104, 452, 8, '#202a44', { nodes: 8, lean: -1, highlight: '#2b3a60' })}
    ${bambooLeaves(142, 130, 0.8, '#202a44', 6, 0.95)}
    ${bambooLeaves(76, 96, 0.7, '#202a44', -16, 0.9)}
    ${bambooLeaves(150, 240, 0.55, '#202a44', 28, 0.85)}
  </g>

  <!-- 書齋 -->
  <g>
    <path d="M430 254 Q470 172 606 162 Q742 154 800 238 L800 254 Z" fill="#222b45"/>
    <path d="M448 246 Q490 184 608 176 Q726 168 780 240" fill="none" stroke="#46557c" stroke-width="4" opacity="0.7"/>
    <path d="M470 254 Q500 200 600 192 Q710 184 762 250" fill="#2c3552"/>
    <rect x="470" y="252" width="330" height="130" fill="#2e3550"/>
    <rect x="470" y="252" width="330" height="12" fill="#232a43"/>

    <!-- 窗格暖光 -->
    <circle cx="536" cy="308" r="86" fill="url(#scene-${key}-windowGlow)"/>
    <circle cx="676" cy="308" r="86" fill="url(#scene-${key}-windowGlow)"/>
    <rect x="500" y="278" width="74" height="66" rx="4" fill="#f3d78b" opacity="0.92"/>
    <rect x="638" y="278" width="74" height="66" rx="4" fill="#f3d78b" opacity="0.88"/>
    <g stroke="#9c7440" stroke-width="2" opacity="0.75">
      <path d="M500 300 H574 M500 322 H574 M518 278 V344 M537 278 V344 M556 278 V344"/>
      <path d="M638 300 H712 M638 322 H712 M656 278 V344 M675 278 V344 M694 278 V344"/>
    </g>
    <!-- 窗內貓影 -->
    <g fill="#6b4a33" opacity="0.75">
      <circle cx="548" cy="316" r="12"/>
      <path d="M538 312 L534 298 L546 306 Z"/>
      <path d="M558 312 L562 298 L550 306 Z"/>
      <ellipse cx="548" cy="338" rx="16" ry="14"/>
    </g>

    <!-- 屋簷下燈籠 -->
    ${paperLantern(478, 268, 0.72, '#f2b45c', '#ffd98a', 1.8)}
    ${paperLantern(792, 262, 0.62, '#f2b45c', '#ffd98a', 4.4)}

    <!-- 緣側（木廊） -->
    <rect x="440" y="382" width="360" height="18" fill="#463c37"/>
    <rect x="440" y="400" width="360" height="8" fill="#332c29"/>
    <path d="M440 382 H800" stroke="#6b5a4d" stroke-width="2" opacity="0.7"/>
    <!-- 書卷 -->
    <g transform="translate(612 366)">
      <path d="M-26 -8 L-2 -4 L22 -8 L22 6 L-2 10 L-26 6 Z" fill="#fdf6ec"/>
      <path d="M-2 -4 V10" stroke="#c9b79a" stroke-width="2"/>
      <path d="M-20 -2 H-8 M-20 2 H-8 M6 -2 H18 M6 2 H18" stroke="#c9b79a" stroke-width="1.3"/>
    </g>
    <!-- 緣側上的貓 -->
    ${paperCrane(742, 340, 0.7, '#f4a7bb', -8, 2.2)}
    ${sceneCatSilhouette({ x: 712, y: 306, scale: 0.62, fill: '#1b2338', scarf: '#6f9c76', tailUp: true })}
  </g>

  <!-- 地面＋參道 -->
  <path d="M0 420 Q200 386 400 402 T800 388 V450 H0 Z" fill="url(#scene-${key}-ground)"/>
  <path d="M226 450 Q310 424 400 414 Q470 406 528 404 L570 404 Q530 426 450 438 Q340 454 226 450 Z" fill="#4a587c" opacity="0.45"/>
  <g fill="#5e6e94" opacity="0.7">
    <ellipse cx="306" cy="442" rx="26" ry="6"/>
    <ellipse cx="356" cy="430" rx="23" ry="5.4"/>
    <ellipse cx="410" cy="421" rx="20" ry="4.8"/>
    <ellipse cx="462" cy="415" rx="17" ry="4.2"/>
    <ellipse cx="510" cy="410" rx="14" ry="3.6"/>
  </g>
  <g fill="#4a587c" opacity="0.6">
    <ellipse cx="190" cy="432" rx="40" ry="8"/>
    <ellipse cx="640" cy="434" rx="52" ry="9"/>
  </g>
  <path d="M0 440 Q300 416 800 436" stroke="#6b7ba3" stroke-width="2" fill="none" opacity="0.4"/>
  <!-- 參道旁石燈籠 -->
  ${stoneLantern(268, 392, 0.72)}
  ${pawPrint(336, 440, 0.85, '#6b7ba3', 0.5, 16)}
  ${pawPrint(386, 424, 0.8, '#6b7ba3', 0.45, 2)}
  ${pawPrint(438, 414, 0.74, '#6b7ba3', 0.4, 18)}
  ${pawPrint(488, 410, 0.68, '#6b7ba3', 0.35, 4)}

  <!-- 螢火蟲 -->
  <g transform="translate(220 300)"><circle r="7" fill="#f7e38a" opacity="0.15"/><circle class="scene-firefly" r="2.4" fill="#f7e38a"${delay(0.8)}/></g>
  <g transform="translate(332 350)"><circle r="6" fill="#f7e38a" opacity="0.14"/><circle class="scene-firefly" r="2" fill="#f7e38a"${delay(3.1)}/></g>
  <g transform="translate(150 380)"><circle r="6" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2.2" fill="#f7e38a"${delay(5.4)}/></g>`;
}

function snowScene(): string {
  const key = 'snow';
  let flakes = '';
  const rand = makeRng(707);
  for (let i = 0; i < 14; i += 1) {
    const x = n(rand() * 800);
    const y = n(rand() * 340);
    const r = n(1.4 + rand() * 2.4);
    flakes += `<g transform="translate(${x} ${y})"><circle class="scene-snowflake" r="${r}" fill="#ffffff" opacity="${n(0.55 + rand() * 0.4)}"${delay(rand() * 8)}/></g>`;
  }
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#c7dcef'],
      [0.6, '#e8f3fb'],
      [1, '#f9fcff'],
    ])}
    ${linearGradient(`scene-${key}-water`, [
      [0, '#cfe9ea'],
      [1, '#a9d4d9'],
    ])}
    ${radialGradient(`scene-${key}-warm`, [
      [0, '#ffd98a', 0.8],
      [1, '#ffd98a', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="630" cy="82" r="120" fill="url(#scene-${key}-warm)" opacity="0.5"/>
  <circle cx="630" cy="82" r="40" fill="#fffdf8" opacity="0.85"/>

  <!-- 雪山 -->
  <path d="M0 300 L130 150 L236 250 L330 176 L470 306 L560 230 L700 322 L800 250 V450 H0 Z" fill="#b7cfe3"/>
  <path d="M130 150 L176 196 L150 204 L122 190 Z" fill="#f7fbff"/>
  <path d="M330 176 L372 216 L344 224 L318 210 Z" fill="#f7fbff"/>
  <path d="M560 230 L596 262 L572 268 L548 258 Z" fill="#f7fbff"/>
  <path d="M0 340 L120 250 L230 330 L340 270 L470 350 L600 292 L720 360 L800 320 V450 H0 Z" fill="#d8e8f2"/>

  <!-- 雪松 -->
  ${pineTree(120, 420, 0.95, '#5f7f6e')}
  ${pineTree(214, 438, 0.65, '#6b8b78')}
  ${pineTree(700, 430, 0.8, '#638372')}
  ${pineTree(76, 400, 0.55, '#6b8b78')}
  ${pineTree(766, 402, 0.62, '#5f7f6e')}
  ${pineTree(636, 322, 0.42, '#6b8b78')}
  <!-- 雪叢 -->
  <g fill="#fbfdff">
    <ellipse cx="330" cy="446" rx="44" ry="14"/>
    <circle cx="304" cy="438" r="18"/>
    <circle cx="342" cy="436" r="22"/>
    <circle cx="376" cy="442" r="15"/>
    <ellipse cx="822" cy="416" rx="34" ry="12"/>
  </g>
  <!-- 溫泉邊丹頂鶴 -->
  <g transform="translate(782 322)">
    <ellipse cx="0" cy="26" rx="18" ry="5" fill="#b7cfe3" opacity="0.5"/>
    <path d="M-8 4 V22 M8 4 V22" stroke="#8d6a4a" stroke-width="2.6"/>
    <ellipse cx="0" cy="0" rx="17" ry="11" fill="#fbfdff"/>
    <path d="M-10 -4 C-22 -16 -24 -34 -18 -44" stroke="#fbfdff" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <circle cx="-19" cy="-47" r="6.5" fill="#fbfdff"/>
    <path d="M-25 -47 l-9 3" stroke="#e8b64c" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="-19" cy="-51" r="2.6" fill="#d96f6f"/>
    <path d="M14 2 Q24 6 26 16" stroke="#fbfdff" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 溫泉池 -->
  <path d="M412 372 C446 344 518 334 590 338 C670 342 746 360 770 390 C788 412 758 432 698 440 C636 449 556 450 502 444 C448 438 412 420 406 400 C402 388 402 380 412 372 Z" fill="#eef7f9" opacity="0.95"/>
  <path d="M424 374 C456 352 522 344 590 348 C662 352 734 366 756 390 C772 408 746 424 694 432 C636 440 562 442 512 436 C464 430 430 414 424 398 C420 388 420 382 424 374 Z" fill="url(#scene-${key}-water)"/>
  <path d="M436 392 C464 372 524 364 592 366" fill="none" stroke="#e8f6f7" stroke-width="5" opacity="0.55" stroke-linecap="round"/>
  <ellipse cx="546" cy="386" rx="40" ry="7" fill="#e8f6f7" opacity="0.55"/>
  <ellipse cx="646" cy="414" rx="28" ry="5" fill="#e8f6f7" opacity="0.45"/>
  <ellipse cx="510" cy="424" rx="22" ry="4" fill="#e8f6f7" opacity="0.35"/>
  <!-- 池邊石頭 -->
  <g fill="#b7c3c6">
    <ellipse cx="414" cy="388" rx="24" ry="14"/>
    <ellipse cx="398" cy="404" rx="20" ry="12"/>
    <ellipse cx="410" cy="422" rx="18" ry="10"/>
    <ellipse cx="452" cy="434" rx="18" ry="9"/>
    <ellipse cx="506" cy="444" rx="20" ry="8"/>
    <ellipse cx="586" cy="448" rx="24" ry="8"/>
    <ellipse cx="664" cy="444" rx="20" ry="8"/>
    <ellipse cx="726" cy="432" rx="18" ry="9"/>
    <ellipse cx="762" cy="414" rx="20" ry="11"/>
    <ellipse cx="772" cy="392" rx="18" ry="12"/>
    <ellipse cx="466" cy="358" rx="20" ry="12"/>
    <ellipse cx="540" cy="346" rx="22" ry="11"/>
    <ellipse cx="626" cy="344" rx="20" ry="10"/>
    <ellipse cx="704" cy="350" rx="22" ry="12"/>
  </g>
  <g fill="#a9b8bd" opacity="0.8">
    <ellipse cx="430" cy="396" rx="12" ry="7"/>
    <ellipse cx="748" cy="376" rx="12" ry="8"/>
    <ellipse cx="610" cy="342" rx="10" ry="5"/>
  </g>
  <!-- 小木桶 -->
  <g transform="translate(474 428) rotate(-8)">
    <path d="M-13 -10 H13 L10 8 H-10 Z" fill="#b08055"/>
    <path d="M-13 -10 H13" stroke="#8d6a4a" stroke-width="3"/>
    <path d="M-11 -4 H11 M-10 2 H10" stroke="#8d6a4a" stroke-width="2" opacity="0.7"/>
  </g>
  <!-- 蒸氣 -->
  <g stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.6">
    <path class="scene-steam" d="M520 372 C510 348 530 332 522 312"${delay(0.4)}/>
    <path class="scene-steam" d="M592 364 C582 336 604 322 596 298"${delay(2.2)}/>
    <path class="scene-steam" d="M658 372 C650 348 668 334 660 314"${delay(4.1)}/>
  </g>
  <g stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.42">
    <path class="scene-steam" d="M466 370 C460 354 472 344 466 330"${delay(1.5)}/>
    <path class="scene-steam" d="M706 362 C700 346 712 336 706 322"${delay(3.4)}/>
    <path class="scene-steam" d="M560 360 C554 344 566 334 560 320"${delay(5.2)}/>
  </g>

  <!-- 雪人貓 -->
  <g transform="translate(150 356)">
    <ellipse cx="0" cy="58" rx="56" ry="14" fill="#b7cfe3" opacity="0.5"/>
    <circle cx="0" cy="18" r="46" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <circle cx="0" cy="-32" r="34" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <path d="M-22 -52 L-30 -78 L-6 -62 Z" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <path d="M22 -52 L30 -78 L6 -62 Z" fill="#fbfdff" stroke="#dce8f2" stroke-width="2"/>
    <path d="M-12 -72 L-16 -84 L-4 -76 Z" fill="#f7b7cb"/>
    <path d="M12 -72 L16 -84 L4 -76 Z" fill="#f7b7cb"/>
    <circle cx="-12" cy="-34" r="3.4" fill="#4a3a2c"/>
    <circle cx="12" cy="-34" r="3.4" fill="#4a3a2c"/>
    <path d="M-5 -24 L0 -20 L5 -24 Z" fill="#f09a5c"/>
    <path d="M-10 -14 Q0 -6 10 -14" stroke="#5b4634" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M-28 0 Q0 10 28 0 L26 14 Q0 24 -26 14 Z" fill="#ef9fb6"/>
    <path d="M-12 10 L-18 34 L-4 30 Z" fill="#e07e9c"/>
    <path d="M-34 -14 L-58 -26 M34 -14 L58 -26" stroke="#8d6a4a" stroke-width="4" stroke-linecap="round"/>
    <path d="M-58 -26 L-66 -38 M-58 -26 L-48 -40 M58 -26 L66 -38 M58 -26 L48 -40" stroke="#8d6a4a" stroke-width="3" stroke-linecap="round"/>
    <path d="M-26 -6 Q-40 -16 -44 -30" stroke="#ef9fb6" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 木欄杆與紅燈籠 -->
  <g stroke="#8d6a4a" stroke-width="7" stroke-linecap="round">
    <path d="M268 450 V336 M340 450 V348 M400 450 V360"/>
    <path d="M260 348 H408 M264 368 H400"/>
  </g>
  <circle cx="296" cy="344" r="46" fill="url(#scene-${key}-warm)" opacity="0.45"/>
  ${paperLantern(296, 318, 0.6, '#e8756b', '#ffb4a0', 2.6)}
  <!-- 雪堆 -->
  <ellipse cx="46" cy="438" rx="58" ry="18" fill="#f7fbff" opacity="0.9"/>
  <ellipse cx="236" cy="450" rx="46" ry="14" fill="#f7fbff" opacity="0.85"/>
  <ellipse cx="780" cy="444" rx="40" ry="16" fill="#f7fbff" opacity="0.8"/>

  <!-- 足跡 -->
  ${pawPrint(296, 432, 0.9, '#9fb8cf', 0.85, -8)}
  ${pawPrint(326, 412, 0.85, '#9fb8cf', 0.8, 12)}
  ${pawPrint(354, 394, 0.8, '#9fb8cf', 0.75, -14)}
  ${pawPrint(380, 378, 0.75, '#9fb8cf', 0.7, 8)}

  ${flakes}`;
}

function seaScene(): string {
  const key = 'sea';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#f9cfa8'],
      [0.45, '#fbe4c8'],
      [0.75, '#e9eef0'],
      [1, '#cfe6ee'],
    ])}
    ${linearGradient(`scene-${key}-sea`, [
      [0, '#a9cfd9'],
      [0.5, '#7fb3c7'],
      [1, '#4f86a0'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#fff4d6', 0.95],
      [1, '#ffd9a0', 0],
    ])}
    ${linearGradient(
      `scene-${key}-beam`,
      [
        [0, '#fff6d0', 0.04],
        [1, '#fff6d0', 0.72],
      ],
      false,
    )}
    ${linearGradient(`scene-${key}-sand`, [
      [0, '#f3e6ca'],
      [1, '#e5cf9f'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="600" cy="178" r="150" fill="url(#scene-${key}-sun)"/>
  <circle cx="600" cy="178" r="46" fill="#fff4d8" opacity="0.95"/>
  <!-- 燈塔光柱（在雲後面，較自然） -->
  <g>
    <path class="scene-beam" d="M688 116 Q580 74 396 58 L396 172 Q580 158 688 124 Z" fill="#fff6d0" fill-opacity="0.5"/>
    <path class="scene-beam" d="M724 116 Q820 82 990 70 L990 170 Q820 156 724 124 Z" fill="#fff6d0" fill-opacity="0.34"/>
  </g>

  <!-- 雲 -->
  ${cloudPuff(170, 96, 1.3, '#ffffff', 0.55, 'scene-cloud-puff', 3.2)}
  ${cloudPuff(660, 62, 0.9, '#ffffff', 0.45, 'scene-cloud-puff', 6.4)}
  ${cloudPuff(390, 130, 0.7, '#fff3e2', 0.4, 'scene-cloud-puff', 9.1)}

  <!-- 海 -->
  <rect x="0" y="248" width="800" height="202" fill="url(#scene-${key}-sea)"/>
  <path d="M0 248 H800" stroke="#fdf0d4" stroke-width="3" opacity="0.7"/>
  <!-- 遠島 -->
  <path d="M20 252 Q90 228 160 244 Q116 252 74 254 Q44 254 20 252 Z" fill="#6f95a0" opacity="0.6"/>
  <!-- 夕陽倒影 -->
  <g fill="#ffe3b0" opacity="0.7">
    <path d="M570 264 H626 M560 276 H636 M552 288 H644 M562 300 H634 M572 312 H624 M584 324 H612"/>
  </g>
  <g stroke="#d9eef2" stroke-width="2.4" fill="none" opacity="0.6">
    <path class="scene-wave" d="M40 286 q28 -8 56 0 t56 0 t56 0"${delay(1.2)}/>
    <path class="scene-wave" d="M420 306 q30 -8 60 0 t60 0"${delay(3.4)}/>
    <path class="scene-wave" d="M150 338 q34 -9 68 0 t68 0 t68 0"${delay(5.1)}/>
    <path class="scene-wave" d="M540 362 q36 -10 72 0 t72 0"${delay(2.2)}/>
  </g>
  <path d="M0 300 Q120 292 240 300 T480 298 T800 302 V450 H0 Z" fill="#5f96aa" opacity="0.35"/>

  <!-- 帆船 -->
  <g transform="translate(178 236)">
    <path d="M-34 0 H34 L24 14 H-24 Z" fill="#4a3f3a"/>
    <path d="M0 -2 V-64" stroke="#4a3f3a" stroke-width="4"/>
    <path d="M4 -60 L40 -6 L4 -6 Z" fill="#fdf6ec"/>
    <path d="M-2 -54 L-28 -8 L-2 -8 Z" fill="#f4a7bb" opacity="0.9"/>
    <path d="M-24 18 Q0 24 24 18" stroke="#fdf0d4" stroke-width="3" fill="none" opacity="0.6"/>
  </g>

  <!-- 海鷗 -->
  <g stroke="#4a3f3a" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.8">
    <path d="M300 104 q10 -10 20 0 q10 -10 20 0"/>
    <path d="M352 128 q8 -8 16 0 q8 -8 16 0"/>
    <path d="M246 140 q7 -7 14 0 q7 -7 14 0"/>
  </g>

  <!-- 崖＋燈塔 -->
  <path d="M600 450 L620 300 Q660 260 720 270 L800 262 V450 Z" fill="#54625a"/>
  <path d="M620 300 Q660 260 720 270 L800 262 V300 Q720 296 660 320 L640 450 H600 Z" fill="#66756a"/>
  <g stroke="#46534c" stroke-width="2" opacity="0.5" fill="none">
    <path d="M632 334 Q700 320 800 326 M622 372 Q710 356 800 362 M616 412 Q700 398 800 402"/>
  </g>
  <g fill="#7d927f" opacity="0.8">
    <path d="M652 300 Q680 282 716 288 Q700 300 670 306 Z"/>
    <path d="M742 282 Q772 272 800 278 Q780 290 754 292 Z"/>
  </g>
  <!-- 燈塔光暈 -->
  <circle cx="706" cy="100" r="90" fill="#fff3c4" opacity="0.18"/>
  <g transform="translate(706 250)">
    <path d="M-26 0 L-16 -128 H16 L26 0 Z" fill="#fdf6ec"/>
    <path d="M-24 -30 L24 -30 L24 -52 L-24 -52 Z" fill="#d97a78"/>
    <path d="M-21 -82 L21 -82 L22 -104 L-22 -104 Z" fill="#d97a78"/>
    <path d="M-14 -128 H14 L20 -150 H-20 Z" fill="#fdf6ec"/>
    <rect x="-13" y="-150" width="26" height="22" rx="4" fill="#f7dd9a"/>
    <path d="M-18 -150 L0 -166 L18 -150 Z" fill="#7e5257"/>
    <circle cx="0" cy="-140" r="26" fill="#fff3c4" opacity="0.5"/>
    <circle cx="0" cy="-140" r="6" fill="#fffdf8" opacity="0.9"/>
    <path d="M-16 -128 H-24 M16 -128 H24" stroke="#7e5257" stroke-width="2.4"/>
    <path d="M-22 -120 Q-130 -156 -300 -186 L-300 -86 Q-130 -94 -22 -102 Z" fill="#fff6d0" opacity="0.38" class="scene-beam"/>
    <path d="M22 -120 Q130 -156 300 -186 L300 -86 Q130 -94 22 -102 Z" fill="#fff6d0" opacity="0.22"/>
    <rect x="-30" y="-6" width="60" height="10" rx="4" fill="#8a7f70"/>
    <rect x="-20" y="-40" width="10" height="16" rx="3" fill="#7e5257" opacity="0.55"/>
    <rect x="10" y="-64" width="10" height="14" rx="3" fill="#7e5257" opacity="0.45"/>
  </g>

  <!-- 沙灘＋岸邊浪花 -->
  <path d="M0 386 Q140 356 300 380 T620 372 L800 392 V450 H0 Z" fill="url(#scene-${key}-sand)"/>
  <path d="M0 386 Q140 356 300 380 T620 372 L800 392" fill="none" stroke="#fff8e6" stroke-width="7" opacity="0.75"/>
  <path d="M0 396 Q140 368 300 390 T620 382 L800 402" fill="none" stroke="#e9f6f8" stroke-width="3" opacity="0.6"/>

  <!-- 木碼頭＋看海的貓 -->
  <g transform="translate(0 400)">
    <path d="M0 0 H190 L212 16 L0 20 Z" fill="#8a6a4c"/>
    <path d="M0 -8 H176 L158 2 H0 Z" fill="#a98460"/>
    <path d="M36 12 V52 M100 16 V58 M164 18 V50" stroke="#6b5138" stroke-width="7"/>
    <path d="M0 22 Q60 32 120 26 T212 20" stroke="#6b5138" stroke-width="3" fill="none" opacity="0.5"/>
    <path d="M0 6 H176" stroke="#c99a63" stroke-width="2" opacity="0.7"/>
  </g>
  ${sceneCatSilhouette({ x: 128, y: 356, scale: 0.58, fill: '#3d3230', scarf: '#f4a7bb', tailUp: true })}

  <!-- 貝殼海星 -->
  <g fill="#f4a7bb" opacity="0.9">
    <path d="M300 422 q10 -12 20 0 q-10 10 -20 0 Z"/>
    <circle cx="340" cy="434" r="3"/>
  </g>
  <g transform="translate(470 430)" fill="#f09a5c">
    <path d="M0 -14 L5 -4 L16 -4 L7 3 L11 14 L0 7 L-11 14 L-7 3 L-16 -4 L-5 -4 Z"/>
  </g>
  <g fill="#fdf6ec" opacity="0.9">
    <ellipse cx="398" cy="408" rx="9" ry="6" transform="rotate(-16 398 408)"/>
    <ellipse cx="560" cy="418" rx="7" ry="5" transform="rotate(14 560 418)"/>
  </g>

  <!-- 腳印 -->
  ${pawPrint(272, 428, 0.9, '#b99b6a', 0.8, 16)}
  ${pawPrint(308, 414, 0.85, '#b99b6a', 0.75, 2)}
  ${pawPrint(344, 404, 0.8, '#b99b6a', 0.7, 20)}
  ${pawPrint(382, 412, 0.75, '#b99b6a', 0.65, -6)}`;
}

function starsScene(): string {
  const key = 'stars';
  let floatLanterns = '';
  const rand = makeRng(1201);
  for (let i = 0; i < 6; i += 1) {
    const x = n(150 + rand() * 480);
    const y = n(220 + rand() * 120);
    floatLanterns += `
      <g transform="translate(${x} ${y})">
        <g class="scene-float-lantern"${delay(rand() * 8)}>
          <ellipse cx="0" cy="0" rx="22" ry="26" fill="#ffd98a" opacity="0.16"/>
          <rect x="-7" y="-10" width="14" height="20" rx="6" fill="#f7d98a"/>
          <rect x="-4" y="-7" width="8" height="14" rx="4" fill="#fff3c4" opacity="0.9"/>
          <line x1="0" y1="10" x2="0" y2="18" stroke="#e8b64c" stroke-width="1.4" opacity="0.6"/>
        </g>
      </g>`;
  }
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#141d38'],
      [0.5, '#243357'],
      [1, '#4a5a8c'],
    ])}
    ${linearGradient(`scene-${key}-millky`, [
      [0, '#7d8fc4', 0],
      [0.5, '#c9d4ef', 0.35],
      [1, '#7d8fc4', 0],
    ])}
    ${linearGradient(`scene-${key}-hill`, [
      [0, '#2b3a5e'],
      [1, '#182138'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>

  <!-- 銀河 -->
  <g transform="rotate(-16 400 240)">
    <ellipse cx="400" cy="240" rx="520" ry="96" fill="url(#scene-${key}-millky)"/>
    <ellipse cx="400" cy="240" rx="360" ry="46" fill="#c9d4ef" opacity="0.14"/>
    <ellipse cx="400" cy="240" rx="160" ry="22" fill="#e8eefc" opacity="0.12"/>
  </g>
  ${starField(52, 1501, { maxY: 300, animated: 14 })}
  ${starField(22, 1602, { maxY: 190, maxRadius: 1.3, color: '#c9d4ef' })}

  <!-- 彎月 -->
  <g>
    <circle cx="664" cy="84" r="46" fill="#fdf3d8"/>
    <circle cx="646" cy="70" r="42" fill="#243357"/>
    <circle cx="664" cy="84" r="70" fill="#fdf3d8" opacity="0.08"/>
  </g>

  <!-- 星座連線 -->
  <g class="scene-constellation" stroke="#c9d4ef" stroke-width="1.6" fill="none" opacity="0.7">
    <path d="M120 96 L156 132 L144 176 L186 200 L228 170"/>
    <path d="M186 200 L232 228"/>
  </g>
  <g fill="#fdf6ec">
    <circle cx="120" cy="96" r="2.6"/><circle cx="156" cy="132" r="2.2"/><circle cx="144" cy="176" r="2.6"/>
    <circle cx="186" cy="200" r="3"/><circle cx="228" cy="170" r="2.2"/><circle cx="232" cy="228" r="2"/>
  </g>

  <!-- 流星 -->
  <g class="scene-shooting"${delay(2.4)}>
    <path d="M300 70 L368 50" stroke="#fdf6ec" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  </g>
  <g class="scene-shooting"${delay(7.6)}>
    <path d="M560 130 L620 114" stroke="#fdf6ec" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- 山丘與看星的貓 -->
  <path d="M0 366 Q160 318 340 346 Q540 380 800 336 V450 H0 Z" fill="url(#scene-${key}-hill)"/>
  <path d="M0 404 Q220 372 430 396 T800 380 V450 H0 Z" fill="#16203a" opacity="0.85"/>
  <!-- 詩會卷軸架 -->
  <g transform="translate(232 330)">
    <path d="M-4 0 V58 M64 0 V58" stroke="#3d4c72" stroke-width="4"/>
    <rect x="-14" y="-10" width="88" height="9" rx="4.5" fill="#8a7a68"/>
    <rect x="-14" y="42" width="88" height="9" rx="4.5" fill="#8a7a68"/>
    <rect x="-6" y="-2" width="72" height="46" rx="2" fill="#fdf6ec"/>
    <path d="M0 8 H54 M0 16 H42 M0 24 H50 M0 32 H36 M0 40 H46" stroke="#b9a98c" stroke-width="1.5"/>
    <circle cx="52" cy="34" r="6" fill="#e8756b"/>
    <path d="M49 31 l6 6 M55 31 l-6 6" stroke="#fdf6ec" stroke-width="1.2"/>
    <circle cx="-14" cy="-10" r="3" fill="#e8b64c"/>
    <circle cx="74" cy="-10" r="3" fill="#e8b64c"/>
    <circle cx="-14" cy="42" r="3" fill="#e8b64c"/>
    <circle cx="74" cy="42" r="3" fill="#e8b64c"/>
  </g>
  ${sceneCatSilhouette({ x: 470, y: 330, scale: 0.95, fill: '#141d33', scarf: '#e07e9c', tailUp: true })}
  ${sceneCatSilhouette({ x: 540, y: 344, scale: 0.8, fill: '#1a2540', scarf: '#4f7a58' })}
  <!-- 草叢 -->
  <g stroke="#3a4c72" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.9">
    <path d="M340 404 q-6 -16 0 -24 M350 406 q6 -14 12 -18"/>
    <path d="M660 396 q-6 -16 0 -24 M670 398 q6 -14 12 -18"/>
  </g>
  ${floatLanterns}
  <!-- 螢火蟲 -->
  <g transform="translate(360 300)"><circle r="6" fill="#f7e38a" opacity="0.14"/><circle class="scene-firefly" r="2.2" fill="#f7e38a"${delay(1.1)}/></g>
  <g transform="translate(600 250)"><circle r="5" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2" fill="#f7e38a"${delay(3.9)}/></g>
  <g transform="translate(200 260)"><circle r="5" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2" fill="#f7e38a"${delay(6.2)}/></g>`;
}

function festivalScene(): string {
  const key = 'festival';
  const lanternColors: ReadonlyArray<readonly [string, string]> = [
    ['#f2b45c', '#ffd98a'],
    ['#e8756b', '#ffb4a0'],
    ['#f7d98a', '#fff3c4'],
    ['#ef9fb6', '#ffc9d8'],
  ];
  let lanternRow1 = '';
  for (let i = 0; i < 8; i += 1) {
    const [color, glow] = lanternColors[i % lanternColors.length] as readonly [string, string];
    lanternRow1 += paperLantern(64 + i * 96, 96 + Math.sin((i / 7) * Math.PI) * 34, 0.62, color, glow, i * 0.7);
  }
  let lanternRow2 = '';
  for (let i = 0; i < 6; i += 1) {
    const [color, glow] = lanternColors[(i + 2) % lanternColors.length] as readonly [string, string];
    lanternRow2 += paperLantern(150 + i * 108, 188 + Math.sin((i / 5) * Math.PI) * 22, 0.48, color, glow, 1.4 + i * 0.9);
  }
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#3a2434'],
      [0.55, '#6e3a45'],
      [1, '#a85a52'],
    ])}
    ${radialGradient(`scene-${key}-horizon`, [
      [0, '#ffb46b', 0.5],
      [1, '#ffb46b', 0],
    ])}
    ${linearGradient(`scene-${key}-ground`, [
      [0, '#5a3a42'],
      [1, '#3d2830'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <ellipse cx="400" cy="336" rx="420" ry="150" fill="url(#scene-${key}-horizon)"/>
  ${starField(30, 2101, { maxY: 200, color: '#ffe8c4', animated: 8, maxRadius: 1.5 })}

  <!-- 煙花 -->
  ${firework(650, 96, 1.05, '#ffd98a', 0.8)}
  ${firework(462, 62, 0.7, '#ffb4a0', 3.6)}
  ${firework(742, 180, 0.55, '#c9d4ef', 6.2)}

  <!-- 遠景屋頂 -->
  <g fill="#2f2030" opacity="0.9">
    <path d="M-20 340 L80 288 L180 340 Z"/>
    <path d="M620 344 L720 292 L820 344 Z"/>
    <path d="M230 350 L320 306 L410 350 Z"/>
  </g>

  <!-- 燈籠串 -->
  <path d="M-20 88 Q200 160 400 100 Q600 42 820 108" stroke="#3d2830" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M-20 210 Q220 268 420 222 Q620 178 820 232" stroke="#3d2830" stroke-width="2.4" fill="none" opacity="0.7"/>
  ${lanternRow1}
  ${lanternRow2}

  <!-- 中央貓貓大燈籠 -->
  <g transform="translate(400 190)">
    <g class="scene-lantern"${delay(2.2)}>
      <line x1="0" y1="-118" x2="0" y2="-68" stroke="#7a4a33" stroke-width="2.6"/>
      <circle cx="0" cy="-120" r="4" fill="none" stroke="#7a4a33" stroke-width="2.4"/>
      <ellipse cx="0" cy="6" rx="74" ry="82" fill="#ffd98a" opacity="0.22"/>
      <path d="M-30 -52 L-56 -90 L-8 -66 Z" fill="#f2b45c"/>
      <path d="M30 -52 L56 -90 L8 -66 Z" fill="#f2b45c"/>
      <path d="M-24 -56 L-44 -82 L-12 -66 Z" fill="#f7d98a"/>
      <path d="M24 -56 L44 -82 L12 -66 Z" fill="#f7d98a"/>
      <ellipse cx="0" cy="0" rx="54" ry="62" fill="#f2b45c"/>
      <ellipse cx="0" cy="0" rx="46" ry="54" fill="#f7d98a"/>
      <rect x="-26" y="-68" width="52" height="9" rx="4" fill="#7a4a33"/>
      <g fill="#7a4a33">
        <ellipse cx="-18" cy="-6" rx="5" ry="7"/>
        <ellipse cx="18" cy="-6" rx="5" ry="7"/>
        <path d="M-6 14 L0 20 L6 14 Z"/>
        <path d="M-12 26 Q0 34 12 26" stroke="#7a4a33" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M-24 2 H-13 M13 2 H24" stroke="#7a4a33" stroke-width="2" opacity="0.6"/>
      </g>
      <path d="M-40 -44 Q-14 -58 0 -60 Q14 -58 40 -44" stroke="#e8a84c" stroke-width="2" fill="none" opacity="0.6"/>
      <g stroke="#e8a84c" stroke-width="1.6" opacity="0.5">
        <path d="M-42 -18 H42 M-46 0 H46 M-42 18 H42"/>
      </g>
      <rect x="-20" y="56" width="40" height="8" rx="3" fill="#7a4a33"/>
      <path d="M0 64 v12" stroke="#7a4a33" stroke-width="2.4"/>
      <circle cx="0" cy="80" r="4" fill="#e8756b"/>
    </g>
  </g>

  <!-- 攤位 -->
  ${festivalStall(158, 386, 0.95, '#8f5a5e', '#f2b45c')}
  ${festivalStall(646, 390, 0.95, '#6a5a7e', '#ef9fb6')}
  ${festivalStall(404, 404, 0.95, '#7e3b3f', '#ffd98a')}

  <!-- 地面 -->
  <path d="M0 402 Q200 380 400 396 T800 386 V450 H0 Z" fill="url(#scene-${key}-ground)"/>
  <g fill="#f2b45c" opacity="0.14">
    <ellipse cx="170" cy="424" rx="70" ry="14"/>
    <ellipse cx="642" cy="430" rx="66" ry="13"/>
    <ellipse cx="404" cy="436" rx="90" ry="16"/>
  </g>
  <g fill="#f7d98a" opacity="0.6">
    <circle cx="280" cy="420" r="2.4"/>
    <circle cx="520" cy="428" r="2"/>
    <circle cx="360" cy="440" r="1.8"/>
    <circle cx="700" cy="416" r="2.2"/>
  </g>
  <!-- 腳印 -->
  ${pawPrint(300, 428, 0.9, '#2f2030', 0.6, 18)}
  ${pawPrint(338, 412, 0.85, '#2f2030', 0.55, 6)}
  ${pawPrint(376, 400, 0.8, '#2f2030', 0.5, 22)}`;
}

function rainScene(): string {
  const key = 'rain';
  let rains = '';
  const rand = makeRng(2601);
  for (let i = 0; i < 20; i += 1) {
    const x = n(rand() * 820);
    const y = n(rand() * 380 - 40);
    const len = n(14 + rand() * 18);
    rains += `<g transform="translate(${x} ${y})"><line class="scene-raindrop" x1="0" y1="0" x2="-4" y2="${len}" stroke="#eef6f4" stroke-width="1.8" stroke-linecap="round" opacity="${n(0.3 + rand() * 0.35)}"${delay(rand() * 2)}/></g>`;
  }

  // 左牆石砌橫縫（由近至遠收向消失點）
  const courses: ReadonlyArray<readonly [number, number]> = [
    [392, 314], [330, 298], [258, 278], [186, 259], [114, 239], [42, 220],
  ];
  let leftCourses = '';
  let rightCourses = '';
  for (const [nearY, farY] of courses) {
    leftCourses += `<path d="M0 ${nearY} L330 ${farY}" />`;
    rightCourses += `<path d="M800 ${nearY} L470 ${farY}" />`;
  }
  let leftJoints = '';
  let rightJoints = '';
  for (const x of [70, 140, 210, 280]) {
    const topY = n(-30 + (230 * x) / 330);
    const botY = n(450 - (120 * x) / 330);
    leftJoints += `<path d="M${x} ${topY} L${x} ${botY}"/>`;
  }
  for (const x of [730, 660, 590, 520]) {
    const topY = n(-30 + (230 * (800 - x)) / 330);
    const botY = n(450 - (120 * (800 - x)) / 330);
    rightJoints += `<path d="M${x} ${topY} L${x} ${botY}"/>`;
  }

  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#a9bbb7'],
      [0.55, '#cdd9d5'],
      [1, '#e9f1ee'],
    ])}
    ${linearGradient(`scene-${key}-wallL`, [
      [0, '#7f9187'],
      [1, '#a9b8ae'],
    ])}
    ${linearGradient(`scene-${key}-wallR`, [
      [0, '#75877d'],
      [1, '#9fafa5'],
    ])}
    ${linearGradient(`scene-${key}-ground`, [
      [0, '#8b9f96'],
      [1, '#6d8177'],
    ])}
    ${radialGradient(`scene-${key}-lanternGlow`, [
      [0, '#ffd98a', 0.8],
      [1, '#ffd98a', 0],
    ])}
    ${radialGradient(`scene-${key}-windowGlow`, [
      [0, '#ffe9b0', 0.7],
      [1, '#ffe9b0', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  ${cloudPuff(160, 46, 1.2, '#c8d5d1', 0.5, 'scene-cloud-puff', 2.8)}
  ${cloudPuff(640, 32, 1, '#c8d5d1', 0.42, 'scene-cloud-puff', 6.1)}
  ${cloudPuff(400, 96, 0.7, '#d5e0dc', 0.35, 'scene-cloud-puff', 9.4)}

  <!-- 巷尾神社（消失點） -->
  <g>
    <rect x="326" y="140" width="148" height="192" fill="#544f44"/>
    <rect x="340" y="152" width="120" height="180" fill="#625c4e"/>
    <path d="M300 156 L400 108 L500 156 L492 172 L400 132 L308 172 Z" fill="#6b6352"/>
    <path d="M310 152 L400 116 L490 152" fill="none" stroke="#7d7460" stroke-width="3" opacity="0.8"/>
    <rect x="352" y="214" width="96" height="76" rx="3" fill="#f2d590"/>
    <circle cx="400" cy="252" r="86" fill="url(#scene-${key}-windowGlow)" opacity="0.5"/>
    <g stroke="#a98a55" stroke-width="2" opacity="0.75">
      <path d="M352 238 H448 M352 262 H448 M376 214 V290 M400 214 V290 M424 214 V290"/>
    </g>
    <rect x="344" y="290" width="112" height="9" rx="3" fill="#7d7460"/>
    <rect x="352" y="302" width="96" height="8" rx="3" fill="#8d8268"/>
    <rect x="332" y="312" width="136" height="20" rx="3" fill="#6b6352"/>
    <!-- 神社前小燈籠 -->
    <circle cx="338" cy="196" r="36" fill="url(#scene-${key}-lanternGlow)" opacity="0.55"/>
    <circle cx="338" cy="196" r="9" fill="#f2b45c"/>
    <circle cx="462" cy="196" r="36" fill="url(#scene-${key}-lanternGlow)" opacity="0.55"/>
    <circle cx="462" cy="196" r="9" fill="#f2b45c"/>
  </g>

  <!-- 兩側石牆（一點透視） -->
  <path d="M0 -30 L330 200 L330 330 L0 450 Z" fill="url(#scene-${key}-wallL)"/>
  <path d="M800 -30 L470 200 L470 330 L800 450 Z" fill="url(#scene-${key}-wallR)"/>
  <g stroke="#5f7167" stroke-width="2" fill="none" opacity="0.42">
    ${leftCourses}
    ${rightCourses}
  </g>
  <g stroke="#5f7167" stroke-width="1.6" fill="none" opacity="0.3">
    ${leftJoints}
    ${rightJoints}
  </g>
  <!-- 牆腳青苔 -->
  <path d="M0 436 Q120 414 246 396 Q300 388 330 340 L330 360 Q296 402 250 414 Q120 436 0 450 Z" fill="#7d927f" opacity="0.5"/>
  <path d="M800 436 Q680 414 554 396 Q500 388 470 340 L470 360 Q504 402 550 414 Q680 436 800 450 Z" fill="#758a78" opacity="0.45"/>

  <!-- 地面（石板路） -->
  <path d="M0 450 L330 330 L470 330 L800 450 Z" fill="url(#scene-${key}-ground)"/>
  <g stroke="#5d7067" stroke-width="1.6" opacity="0.3" fill="none">
    <path d="M80 450 L386 342 M180 450 L392 346 M300 450 L398 352 M500 450 L402 352 M620 450 L408 346 M720 450 L414 342"/>
    <path d="M60 424 Q400 390 740 424" opacity="0.7"/>
    <path d="M150 450 Q400 412 650 450" opacity="0.7"/>
  </g>

  <!-- 水窪＋倒影 -->
  <g>
    <ellipse cx="400" cy="414" rx="126" ry="20" fill="#cdded7" opacity="0.55"/>
    <ellipse cx="400" cy="414" rx="126" ry="20" fill="none" stroke="#e8f2ee" stroke-width="1.4" opacity="0.6"/>
    <ellipse cx="400" cy="410" rx="26" ry="6" fill="#ffe9b0" opacity="0.45"/>
    <ellipse cx="262" cy="438" rx="62" ry="11" fill="#c6d8d1" opacity="0.45"/>
    <ellipse cx="560" cy="436" rx="48" ry="9" fill="#c6d8d1" opacity="0.4"/>
    <ellipse cx="690" cy="430" rx="30" ry="7" fill="#f2d590" opacity="0.3"/>
    <g fill="none" stroke="#eef6f2" stroke-width="1.4">
      <ellipse class="scene-ripple" cx="400" cy="414" rx="20" ry="5"${delay(0.6)}/>
      <ellipse class="scene-ripple" cx="262" cy="438" rx="13" ry="3.4"${delay(2.4)}/>
      <ellipse class="scene-ripple" cx="560" cy="436" rx="11" ry="3"${delay(4.1)}/>
    </g>
  </g>

  <!-- 牆邊油紙傘 -->
  <g transform="translate(148 372) rotate(-16)">
    <ellipse cx="0" cy="62" rx="34" ry="7" fill="#5d7067" opacity="0.35"/>
    <path d="M-52 0 Q0 -58 52 0 Q28 9 0 4 Q-28 9 -52 0 Z" fill="#d96f6f"/>
    <path d="M-52 0 Q-28 7 0 4 Q28 7 52 0" fill="none" stroke="#b45555" stroke-width="3"/>
    <path d="M-26 -2 Q-13 4 0 3 Q13 4 26 -2" fill="none" stroke="#f7b7cb" stroke-width="2" opacity="0.7"/>
    <path d="M0 -44 V0" stroke="#8d5a3a" stroke-width="3"/>
    <path d="M0 0 V62 Q0 72 -10 72" fill="none" stroke="#8d5a3a" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- 牆上燈籠 -->
  ${paperLantern(690, 306, 0.72, '#f2b45c', '#ffd98a', 1.6)}
  <circle cx="690" cy="336" r="54" fill="url(#scene-${key}-lanternGlow)" opacity="0.32"/>

  <!-- 盆栽青苔 -->
  <g transform="translate(252 436)">
    <path d="M-17 0 H17 L13 24 H-13 Z" fill="#7d6b56"/>
    <path d="M-8 0 C-14 -22 -2 -34 4 -46 C12 -30 16 -16 8 0 Z" fill="#6f8f68"/>
    <path d="M-2 0 C-6 -14 2 -22 6 -30 C10 -20 10 -10 6 0 Z" fill="#8aa87d"/>
  </g>
  <g stroke="#7f9b8b" stroke-width="2" stroke-linecap="round" opacity="0.75">
    <path d="M282 446 q-4 -10 2 -15 M290 448 q6 -8 10 -10"/>
    <path d="M738 446 q-4 -10 2 -15"/>
  </g>
  <ellipse cx="566" cy="446" rx="28" ry="7" fill="#9fb0a5" opacity="0.7"/>
  <ellipse cx="600" cy="444" rx="16" ry="5" fill="#a9b8ae" opacity="0.7"/>

  <!-- 貓腳印（走向神社） -->
  ${pawPrint(352, 436, 0.95, '#55655c', 0.45, 14)}
  ${pawPrint(380, 414, 0.9, '#55655c', 0.42, 2)}
  ${pawPrint(404, 394, 0.85, '#55655c', 0.38, 16)}
  ${pawPrint(424, 372, 0.78, '#55655c', 0.34, 4)}

  <!-- 霧氣 -->
  <ellipse cx="400" cy="352" rx="300" ry="26" fill="#e9f1ee" opacity="0.3"/>
  <ellipse cx="300" cy="430" rx="220" ry="20" fill="#e9f1ee" opacity="0.22"/>
  ${rains}`;
}

function cloudScene(): string {
  const key = 'cloud';
  const rand = makeRng(3101);
  let puffs = '';
  for (let i = 0; i < 9; i += 1) {
    puffs += cloudPuff(
      n(-40 + i * 110 + rand() * 40),
      n(340 + rand() * 110),
      n(0.9 + rand() * 0.8),
      i % 2 === 0 ? '#ffffff' : '#e9e2f8',
      n(0.55 + rand() * 0.35),
      'scene-cloud-puff',
      rand() * 10,
    );
  }
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#cfc6ea'],
      [0.5, '#e6ddf5'],
      [1, '#f8f2ff'],
    ])}
    ${linearGradient(`scene-${key}-tower`, [
      [0, '#8a7a68'],
      [1, '#5f5145'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#fff8e8', 0.9],
      [1, '#fff8e8', 0],
    ])}
    ${radialGradient(`scene-${key}-win`, [
      [0, '#f7dd9a', 0.7],
      [1, '#f7dd9a', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="640" cy="80" r="150" fill="url(#scene-${key}-sun)"/>
  <circle cx="640" cy="80" r="44" fill="#fffdf8" opacity="0.8"/>
  ${starField(24, 3102, { maxY: 220, color: '#fffdf8', animated: 6, maxRadius: 1.4 })}

  <!-- 浮空島（左） -->
  <g transform="translate(150 232)">
    <path d="M-74 0 Q0 -40 74 0 Q54 46 0 60 Q-54 46 -74 0 Z" fill="#b9a8d6"/>
    <path d="M-74 0 Q0 -40 74 0 L60 10 Q0 -24 -60 10 Z" fill="#cfc0e6"/>
    <path d="M-40 -4 L-4 -30 L32 -8 Z" fill="#6f8f7a"/>
    <path d="M-4 -30 V-64" stroke="#7d6b56" stroke-width="5"/>
    <path d="M-4 -58 Q-22 -74 -34 -70 M-4 -62 Q16 -82 34 -74" fill="none" stroke="#7d6b56" stroke-width="3" stroke-linecap="round"/>
    <g fill="#8aa87d">
      <circle cx="-34" cy="-76" r="16"/>
      <circle cx="-16" cy="-86" r="19"/>
      <circle cx="18" cy="-86" r="20"/>
      <circle cx="36" cy="-74" r="15"/>
      <circle cx="2" cy="-98" r="14" fill="#9dbb8e"/>
      <circle cx="-26" cy="-92" r="10" fill="#9dbb8e"/>
    </g>
    <circle cx="8" cy="-96" r="5" fill="#b8d0a6" opacity="0.8"/>
    <circle cx="-30" cy="-4" r="16" fill="#e9e2f8"/>
    <circle cx="20" cy="4" r="12" fill="#efeaf8"/>
  </g>

  <!-- 遠方小浮島 -->
  <g transform="translate(300 132)" opacity="0.7">
    <path d="M-26 0 Q0 -18 26 0 Q16 16 0 20 Q-16 16 -26 0 Z" fill="#c9bce2"/>
    <path d="M0 -2 V-20" stroke="#7d6b56" stroke-width="3"/>
    <circle cx="0" cy="-26" r="9" fill="#8aa87d"/>
  </g>

  <!-- 雲端書樓 -->
  <g transform="translate(556 132)">
    <ellipse cx="0" cy="286" rx="140" ry="34" fill="#b9a8d6" opacity="0.55"/>
    <!-- 基座浮石 -->
    <path d="M-112 240 Q0 206 112 240 Q84 292 0 310 Q-84 292 -112 240 Z" fill="#9d8cbe"/>
    <path d="M-112 240 Q0 206 112 240 L96 250 Q0 220 -96 250 Z" fill="#b9a8d6"/>
    <!-- 一樓 -->
    <rect x="-92" y="168" width="184" height="74" fill="url(#scene-${key}-tower)"/>
    <circle cx="0" cy="206" r="120" fill="url(#scene-${key}-win)" opacity="0.4"/>
    <rect x="-72" y="184" width="56" height="42" rx="3" fill="#f3d78b"/>
    <rect x="16" y="184" width="56" height="42" rx="3" fill="#f3d78b"/>
    <g stroke="#8a6a45" stroke-width="2" opacity="0.8">
      <path d="M-72 205 H-16 M-53 184 V226 M-34 184 V226 M16 205 H72 M35 184 V226 M54 184 V226"/>
    </g>
    <path d="M-108 168 L108 168 L92 148 L-92 148 Z" fill="#6f8f7a"/>
    <path d="M-108 168 L108 168 L104 176 L-104 176 Z" fill="#4f6a5c"/>
    <!-- 二樓 -->
    <rect x="-74" y="92" width="148" height="58" fill="url(#scene-${key}-tower)"/>
    <rect x="-56" y="106" width="42" height="32" rx="3" fill="#f3d78b"/>
    <rect x="14" y="106" width="42" height="32" rx="3" fill="#f3d78b"/>
    <g stroke="#8a6a45" stroke-width="2" opacity="0.8">
      <path d="M-56 122 H-14 M-40 106 V138 M14 122 H56 M30 106 V138"/>
    </g>
    <path d="M-90 92 L90 92 L74 74 L-74 74 Z" fill="#6f8f7a"/>
    <path d="M-90 92 L90 92 L86 100 L-86 100 Z" fill="#4f6a5c"/>
    <!-- 三樓塔尖 -->
    <rect x="-48" y="34" width="96" height="42" fill="url(#scene-${key}-tower)"/>
    <rect x="-30" y="46" width="60" height="22" rx="3" fill="#f3d78b"/>
    <path d="M-66 34 L66 34 L48 16 L-48 16 Z" fill="#6f8f7a"/>
    <path d="M-66 34 L66 34 L62 40 L-62 40 Z" fill="#4f6a5c"/>
    <path d="M0 16 V-14" stroke="#7d6b56" stroke-width="4"/>
    <circle cx="0" cy="-20" r="7" fill="#e8b64c"/>
    <!-- 窗內書架細節 -->
    <g opacity="0.9">
      <rect x="-70" y="192" width="6" height="26" fill="#d97a78"/>
      <rect x="-62" y="196" width="5" height="22" fill="#6f9c76"/>
      <rect x="-55" y="190" width="6" height="28" fill="#8f9fd6"/>
      <rect x="20" y="192" width="6" height="26" fill="#e8b64c"/>
      <rect x="28" y="196" width="5" height="22" fill="#d97a78"/>
    </g>
    <!-- 門前雲梯 -->
    <path d="M-112 246 Q-150 280 -168 330" stroke="#8d7f6a" stroke-width="4" fill="none"/>
    <path d="M-104 238 Q-142 272 -160 322" stroke="#8d7f6a" stroke-width="4" fill="none"/>
    <g stroke="#a89479" stroke-width="2.4">
      <path d="M-116 240 L-108 232 M-124 252 L-116 244 M-132 266 L-124 258 M-140 282 L-132 274 M-148 300 L-140 292"/>
    </g>
  </g>

  <!-- 漂浮書本與紙鶴 -->
  ${floatingBook(380, 150, 0.9, -12, 1.2, '#d97a78')}
  ${floatingBook(706, 300, 0.75, 14, 3.5, '#6f9c76')}
  ${floatingBook(300, 320, 0.6, -6, 5.8, '#8f9fd6')}
  ${floatingBook(660, 90, 0.55, 18, 7.4, '#e8b64c')}
  ${floatingBook(240, 190, 0.5, 10, 2.6, '#e8756b')}
  ${floatingBook(766, 236, 0.45, -16, 6.2, '#6f9c76')}
  ${paperCrane(430, 78, 0.9, '#f7c1d0', -6, 0.8)}
  ${paperCrane(362, 220, 0.6, '#ffffff', 10, 3.3)}
  ${paperCrane(712, 190, 0.55, '#c9d4ef', -14, 5.6)}
  ${paperCrane(196, 148, 0.5, '#ffffff', 18, 4.4)}

  <!-- 雲海 -->
  ${puffs}
  <g opacity="0.85">
    <ellipse cx="120" cy="430" rx="180" ry="40" fill="#ffffff" opacity="0.55"/>
    <ellipse cx="680" cy="440" rx="200" ry="44" fill="#ffffff" opacity="0.5"/>
    <ellipse cx="400" cy="464" rx="260" ry="46" fill="#f3edff" opacity="0.7"/>
  </g>
  <!-- 雲上讀成語的小貓 -->
  <g transform="translate(262 402)">
    <ellipse cx="0" cy="10" rx="92" ry="24" fill="#ffffff" opacity="0.9"/>
    <circle cx="-58" cy="-2" r="22" fill="#ffffff" opacity="0.9"/>
    <circle cx="52" cy="-4" r="26" fill="#ffffff" opacity="0.9"/>
  </g>
  ${sceneCatSilhouette({ x: 226, y: 344, scale: 0.56, fill: '#8a7a68', scarf: '#6f9c76' })}
  ${floatingBook(292, 388, 0.42, 8, 1.8, '#8f9fd6')}
  <!-- 遠島 -->
  <g transform="translate(400 350)" opacity="0.7">
    <path d="M-30 0 Q0 -24 30 0 Q14 18 0 22 Q-14 18 -30 0 Z" fill="#b9a8d6"/>
    <path d="M0 -2 V-26" stroke="#7d6b56" stroke-width="3"/>
  </g>`;
}

function summitScene(): string {
  const key = 'summit';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#8fb3de'],
      [0.5, '#d9c8d8'],
      [1, '#fbe6bd'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#fff6d8', 0.9],
      [1, '#ffd9a0', 0],
    ])}
    ${linearGradient(`scene-${key}-far`, [
      [0, '#a9c3df'],
      [1, '#c9d9ea'],
    ])}
    ${linearGradient(`scene-${key}-mid`, [
      [0, '#7f9fbd'],
      [1, '#a3bcd4'],
    ])}
    ${linearGradient(`scene-${key}-near`, [
      [0, '#5e7e98'],
      [1, '#46647c'],
    ])}
    ${radialGradient(`scene-${key}-pearl`, [
      [0, '#fff6d8', 0.85],
      [1, '#fff6d8', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="400" cy="238" r="190" fill="url(#scene-${key}-sun)"/>
  <circle cx="400" cy="238" r="62" fill="#fff6d8" opacity="0.95"/>
  <!-- 曙光射線 -->
  <g opacity="0.28" fill="#fff3c4">
    <path d="M400 238 L120 0 L210 0 Z"/>
    <path d="M400 238 L330 0 L390 0 Z"/>
    <path d="M400 238 L470 0 L530 0 Z"/>
    <path d="M400 238 L690 0 L780 0 Z"/>
  </g>

  <!-- 雲海 -->
  ${cloudPuff(150, 320, 1.7, '#fdf6ec', 0.7, 'scene-cloud-puff', 2.2)}
  ${cloudPuff(600, 330, 1.5, '#fdf6ec', 0.65, 'scene-cloud-puff', 5.4)}
  ${cloudPuff(380, 360, 1.9, '#fdf6ec', 0.6, 'scene-cloud-puff', 8.1)}

  <!-- 群山 -->
  <path d="M0 330 L120 200 L210 268 L320 170 L430 300 L540 210 L650 300 L760 224 L800 260 V450 H0 Z" fill="url(#scene-${key}-far)"/>
  <path d="M0 380 L110 284 L210 350 L330 246 L450 368 L570 286 L690 364 L800 300 V450 H0 Z" fill="url(#scene-${key}-mid)"/>
  <path d="M320 170 L366 218 L332 232 L306 208 Z" fill="#f2f7fc"/>
  <path d="M540 210 L578 250 L548 262 L520 246 Z" fill="#f2f7fc"/>

  <!-- 山頂平台 -->
  <path d="M226 450 L292 336 Q400 300 508 336 L574 450 Z" fill="url(#scene-${key}-near)"/>
  <path d="M292 336 Q400 300 508 336 L494 354 Q400 326 306 354 Z" fill="#6f8fa8"/>
  <!-- 石階 -->
  <g fill="#8a9fb2">
    <path d="M356 450 L368 420 H432 L444 450 Z"/>
    <path d="M372 416 L382 392 H418 L428 416 Z"/>
    <path d="M388 388 L396 368 H404 L412 388 Z"/>
  </g>
  <!-- 旗杆與旗 -->
  <g transform="translate(402 304)">
    <ellipse cx="0" cy="6" rx="34" ry="8" fill="#3f5a70" opacity="0.5"/>
    <path d="M0 0 V-126" stroke="#7d6b56" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="-132" r="6" fill="#e8b64c"/>
    <path class="scene-flag" d="M4 -120 Q52 -116 88 -102 Q54 -88 4 -86 Z" fill="#e88aa8"/>
    <circle cx="30" cy="-102" r="9" fill="#fdf6ec" opacity="0.9"/>
    <path d="M26 -102 q4 -5 8 0 q-4 5 -8 0 Z" fill="#e8b64c"/>
  </g>

  <!-- 成語靈珠 -->
  <circle cx="506" cy="150" r="58" fill="url(#scene-${key}-pearl)" opacity="0.85"/>
  <circle cx="506" cy="150" r="22" fill="#fff3c4" opacity="0.3"/>
  <circle cx="506" cy="150" r="10" fill="#fff3c4"/>
  <circle cx="503" cy="147" r="3.4" fill="#fffdf8"/>
  <ellipse cx="506" cy="150" rx="24" ry="8" fill="none" stroke="#e8b64c" stroke-width="1.6" opacity="0.55" transform="rotate(-18 506 150)"/>
  <circle class="scene-sparkle" cx="486" cy="124" r="2.6" fill="#fff6d8"${delay(1.4)}/>
  <circle class="scene-sparkle" cx="530" cy="176" r="2.2" fill="#fff6d8"${delay(4.2)}/>
  <!-- 成語之巔的貓貓 -->
  ${sceneCatSilhouette({ x: 458, y: 300, scale: 1.05, fill: '#2a3448', scarf: '#6f9c76', tailUp: true })}
  ${sceneCatSilhouette({ x: 330, y: 322, scale: 0.8, fill: '#33405a', scarf: '#e07e9c' })}
  <!-- 貓腳印石階 -->
  ${pawPrint(420, 414, 0.8, '#6f8fa8', 0.6, -6)}
  ${pawPrint(404, 390, 0.7, '#6f8fa8', 0.55, 8)}

  <!-- 飄浮光點 -->
  <g fill="#fff6d8">
    <circle class="scene-sparkle" cx="250" cy="300" r="2.6"${delay(0.8)}/>
    <circle class="scene-sparkle" cx="560" cy="270" r="2.2"${delay(2.3)}/>
    <circle class="scene-sparkle" cx="470" cy="240" r="2"${delay(3.9)}/>
    <circle class="scene-sparkle" cx="636" cy="190" r="2.4"${delay(5.2)}/>
    <circle class="scene-sparkle" cx="196" cy="220" r="1.8"${delay(6.6)}/>
  </g>
  <!-- 飛鳥 -->
  <g stroke="#46647c" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.7">
    <path d="M150 150 q9 -9 18 0 q9 -9 18 0"/>
    <path d="M660 120 q7 -7 14 0 q7 -7 14 0"/>
    <path d="M600 160 q6 -6 12 0 q6 -6 12 0"/>
  </g>`;
}

/* ────────────────────────── 進階篇共用小部件（第 11–20 章） ────────────────────────── */

function shootingStar(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  delaySeconds = 0,
  width = 2.4,
): string {
  return `
    <g class="scene-shooting"${delay(delaySeconds)}>
      <path d="M${n(x1)} ${n(y1)} L${n(x2)} ${n(y2)}" stroke="#fdf6ec" stroke-width="${width}" stroke-linecap="round" opacity="0.8"/>
      <circle cx="${n(x2)}" cy="${n(y2)}" r="${n(width * 1.5)}" fill="#fdf6ec" opacity="0.95"/>
    </g>`;
}

/** 火山餘燼（配合 .scene-ember 上升動畫） */
function ember(x: number, y: number, r: number, delaySeconds: number, color = '#ffb45c'): string {
  return `<g transform="translate(${n(x)} ${n(y)})"><circle class="scene-ember" r="${n(r)}" fill="${color}" opacity="0.9"${delay(delaySeconds)}/></g>`;
}

/** 海底氣泡（配合 .scene-bubble 上升動畫） */
function bubble(x: number, y: number, r: number, delaySeconds: number): string {
  return `
    <g transform="translate(${n(x)} ${n(y)})">
      <circle class="scene-bubble" r="${n(r)}" fill="none" stroke="#dff8ff" stroke-width="1.6" opacity="0.7"${delay(delaySeconds)}/>
      <circle cx="${n(-r * 0.3)}" cy="${n(-r * 0.34)}" r="${n(r * 0.24)}" fill="#eafcff" opacity="0.85"/>
    </g>`;
}

/** 書架：框＋逐層彩色書脊（seeded、deterministic） */
function bookShelf(x: number, y: number, width: number, height: number, seed: number, rows = 4): string {
  const rand = makeRng(seed);
  const colors = ['#b4655f', '#6f9c76', '#8f9fd6', '#c9932f', '#d98d92', '#7d6b56', '#e8b64c', '#5f8f68', '#a98460', '#ef9fb6'];
  const rowH = height / rows;
  let books = '';
  for (let row = 0; row < rows; row += 1) {
    const baseline = row * rowH + rowH - 8;
    let cursor = 10;
    while (cursor < width - 14) {
      const bw = n(6 + rand() * 9);
      const bh = n(rowH * (0.52 + rand() * 0.32));
      const color = colors[Math.floor(rand() * colors.length)] ?? '#b4655f';
      books += `<rect x="${n(cursor)}" y="${n(baseline - bh)}" width="${bw}" height="${bh}" rx="1" fill="${color}" opacity="${n(0.72 + rand() * 0.26)}"/>`;
      if (rand() > 0.86) {
        books += `<path d="M${n(cursor + bw / 2)} ${n(baseline - bh + 3)} v${n(bh - 7)}" stroke="#f7e9d4" stroke-width="0.8" opacity="0.6"/>`;
      }
      cursor += bw + 2.4;
    }
    books += `<rect x="0" y="${n(row * rowH + rowH - 7)}" width="${width}" height="6" rx="2" fill="#3a2a22"/>`;
  }
  return `
    <g transform="translate(${x} ${y})">
      <rect x="-7" y="-7" width="${width + 14}" height="${height + 14}" rx="4" fill="#4a3428"/>
      ${books}
      <rect x="-7" y="-7" width="${width + 14}" height="${height + 14}" rx="4" fill="none" stroke="#241a14" stroke-width="3" opacity="0.7"/>
    </g>`;
}

/** 蠟燭（火苗有 .scene-candle flicker） */
function candle(x: number, y: number, scale = 1, delaySeconds = 0): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="14" rx="18" ry="6" fill="#f2c97a" opacity="0.18"/>
      <rect x="-4" y="-10" width="8" height="24" rx="2" fill="#f7e9d4"/>
      <path class="scene-candle" d="M0 -20 C6 -14 5 -8 0 -7 C-5 -8 -6 -14 0 -20 Z" fill="#ffd27a"${delay(delaySeconds)}/>
      <rect x="-9" y="12" width="18" height="4" rx="2" fill="#8a6a4a"/>
    </g>`;
}

/** 沙漠駱駝剪影（面向右） */
function camel(x: number, y: number, scale: number, fill: string, accent: string): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" fill="${fill}">
      <ellipse cx="-2" cy="-34" rx="30" ry="16"/>
      <path d="M-18 -44 Q-10 -60 -2 -46 Q6 -60 14 -44 Z"/>
      <path d="M22 -38 Q38 -50 42 -70 Q44 -84 38 -92 Q32 -96 32 -88 Q32 -76 32 -64 Q28 -52 16 -44 Z"/>
      <circle cx="36" cy="-96" r="7"/>
      <path d="M40 -98 Q48 -100 50 -94 Q46 -91 41 -92 Z"/>
      <path d="M-22 -20 L-26 6 M-10 -20 L-8 6 M12 -20 L16 6 M22 -20 L26 6" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>
      <path d="M-32 -36 Q-44 -32 -42 -20" fill="none" stroke="${fill}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-26 -38 H18" stroke="${accent}" stroke-width="5" opacity="0.9"/>
      <path d="M-32 -46 Q-38 -56 -32 -62" fill="none" stroke="${accent}" stroke-width="3" opacity="0.85"/>
    </g>`;
}

/** 金字塔（帶陰影面） */
function pyramid(x: number, y: number, width: number, height: number, fill: string, shade: string): string {
  const half = width / 2;
  return `
    <g transform="translate(${x} ${y})">
      <path d="M0 ${-height} L${half} 0 H${-half} Z" fill="${fill}"/>
      <path d="M0 ${-height} L${half} 0 H0 Z" fill="${shade}" opacity="0.55"/>
      <path d="M0 ${-height} L${n(-half * 0.28)} 0" stroke="${shade}" stroke-width="2" opacity="0.45"/>
    </g>`;
}

/** 冰晶尖柱 */
function iceSpike(x: number, y: number, scale: number, fill: string, opacityV = 0.9): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" opacity="${opacityV}">
      <path d="M0 -96 L24 0 L-20 0 Z" fill="${fill}"/>
      <path d="M0 -96 L24 0 L0 0 Z" fill="#ffffff" opacity="0.32"/>
      <path d="M-8 -32 L-26 0" stroke="#ffffff" stroke-width="2" opacity="0.45"/>
    </g>`;
}

/** 極光緞帶（配合 .scene-aurora 擺動） */
function auroraBand(d: string, gradientId: string, opacityV: number, delaySeconds: number): string {
  return `<path class="scene-aurora" d="${d}" fill="url(#${gradientId})" opacity="${opacityV}"${delay(delaySeconds)}/>`;
}

/** 珊瑚枝 */
function coral(x: number, y: number, scale: number, color: string, color2: string): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M0 0 C-4 -18 -14 -26 -20 -44 C-24 -54 -16 -58 -12 -48 C-8 -38 -2 -30 0 -18 Z" fill="${color}"/>
      <path d="M2 0 C6 -24 14 -34 22 -52 C26 -62 34 -58 30 -46 C24 -30 16 -18 12 0 Z" fill="${color2}"/>
      <path d="M-4 0 C-2 -14 2 -22 4 -30" stroke="${color2}" stroke-width="3" fill="none" opacity="0.8"/>
      <circle cx="-22" cy="-48" r="4" fill="${color2}" opacity="0.9"/>
      <circle cx="28" cy="-56" r="3.4" fill="${color}" opacity="0.9"/>
    </g>`;
}

/** 海草（配合 .scene-seaweed 擺動） */
function seaweed(x: number, y: number, scale: number, color: string, delaySeconds: number): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path class="scene-seaweed" d="M0 0 C-8 -18 -2 -34 4 -50 C10 -66 4 -78 0 -92" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"${delay(delaySeconds)}/>
    </g>`;
}

/** 水母（配合 .scene-jelly 脈動） */
function jellyfish(x: number, y: number, scale: number, color: string, delaySeconds: number): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-jelly"${delay(delaySeconds)}>
        <path d="M-22 0 Q-22 -26 0 -26 Q22 -26 22 0 Q12 6 0 2 Q-12 6 -22 0 Z" fill="${color}" opacity="0.72"/>
        <path d="M-14 2 C-16 14 -12 22 -8 30 M-4 4 C-6 18 -2 26 0 34 M6 4 C8 18 6 26 8 32 M14 2 C16 14 14 22 12 28" stroke="${color}" stroke-width="2.4" fill="none" opacity="0.6" stroke-linecap="round"/>
        <circle cx="-6" cy="-14" r="4" fill="#ffffff" opacity="0.4"/>
      </g>
    </g>`;
}

/** 小魚剪影（配合 .scene-fish 游動） */
function fishSilhouette(x: number, y: number, scale: number, fill: string, delaySeconds: number): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-fish" fill="${fill}"${delay(delaySeconds)}>
        <ellipse cx="0" cy="0" rx="16" ry="7"/>
        <path d="M-14 0 L-26 -7 L-24 7 Z"/>
        <path d="M-2 -6 L6 -12 L8 -4 Z" opacity="0.8"/>
        <circle cx="9" cy="-1" r="1.4" fill="#0a2630"/>
      </g>
    </g>`;
}

/** 夜晚小船（有燈籠，配合 .scene-boat 搖晃） */
function boat(
  x: number,
  y: number,
  scale: number,
  hull: string,
  sail: string,
  glow: string,
  delaySeconds: number,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-boat"${delay(delaySeconds)}>
        <path d="M-46 0 H46 L34 18 H-34 Z" fill="${hull}"/>
        <path d="M0 -4 V-58" stroke="${hull}" stroke-width="4"/>
        <path d="M0 -54 Q26 -34 0 -12 Z" fill="${sail}" opacity="0.92"/>
        <path d="M-4 -50 Q-22 -32 -4 -16 Z" fill="${sail}" opacity="0.65"/>
        <circle cx="0" cy="-62" r="12" fill="${glow}" opacity="0.22"/>
        <circle cx="0" cy="-62" r="4" fill="${glow}"/>
        <path d="M-36 18 Q0 26 36 18" stroke="#e9f6f8" stroke-width="2" fill="none" opacity="0.45"/>
      </g>
    </g>`;
}

/** 天空之城塔樓 */
function castleTower(
  x: number,
  y: number,
  scale: number,
  stone: string,
  roof: string,
  glow: string,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-26 0 L-22 -92 H22 L26 0 Z" fill="${stone}"/>
      <path d="M-30 -92 Q0 -132 30 -92 Z" fill="${roof}"/>
      <path d="M-34 -92 H34 L28 -84 H-28 Z" fill="${roof}" opacity="0.82"/>
      <rect x="-9" y="-56" width="18" height="24" rx="9" fill="${glow}" opacity="0.9"/>
      <rect x="-10" y="-86" width="20" height="13" rx="2.5" fill="${glow}" opacity="0.65"/>
      <path d="M0 -132 V-148" stroke="${stone}" stroke-width="3"/>
      <path d="M0 -148 L16 -142 L0 -137 Z" fill="${glow}" opacity="0.85"/>
    </g>`;
}

/** 熱氣球（配合 .scene-balloon 漂浮） */
function hotAirBalloon(
  x: number,
  y: number,
  scale: number,
  color: string,
  accent: string,
  delaySeconds: number,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-balloon"${delay(delaySeconds)}>
        <circle cx="0" cy="-52" r="26" fill="#fff6d8" opacity="0.14"/>
        <path d="M0 -26 C-22 -26 -26 -50 -14 -62 C-4 -72 4 -72 14 -62 C26 -50 22 -26 0 -26 Z" fill="${color}"/>
        <path d="M0 -26 C-8 -40 -8 -56 0 -68 C8 -56 8 -40 0 -26 Z" fill="${accent}" opacity="0.65"/>
        <path d="M-10 -26 L-7 -4 M10 -26 L7 -4" stroke="#6b5a4d" stroke-width="1.6"/>
        <rect x="-8" y="-6" width="16" height="12" rx="3" fill="#8d6a4a"/>
      </g>
    </g>`;
}

/** 瀑布（配合 .scene-waterfall 流動） */
function waterfall(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  delaySeconds: number,
): string {
  const half = width / 2;
  return `
    <g class="scene-waterfall" transform="translate(${x} ${y})"${delay(delaySeconds)}>
      <path d="M${-half} 0 C${-half + 6} ${n(height * 0.42)} ${-half - 4} ${n(height * 0.72)} ${-half + 2} ${height} L${half} ${height} C${half + 4} ${n(height * 0.7)} ${half - 6} ${n(height * 0.38)} ${half} 0 Z" fill="${color}" opacity="0.78"/>
      <path d="M${-half / 2} 0 C${-half / 2 + 4} ${n(height * 0.45)} ${-half / 2 - 2} ${n(height * 0.75)} ${-half / 2} ${height}" stroke="#ffffff" stroke-width="2.4" fill="none" opacity="0.55"/>
      <path d="M${half / 2} 0 C${half / 2 + 3} ${n(height * 0.4)} ${half / 2} ${n(height * 0.68)} ${half / 2 + 2} ${height}" stroke="#ffffff" stroke-width="1.8" fill="none" opacity="0.4"/>
    </g>`;
}

/** 繪馬小木牌（配合 .scene-charm 搖擺） */
function emaPlaque(
  x: number,
  y: number,
  rotate: number,
  color: string,
  delaySeconds: number,
  scale = 1,
): string {
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <g class="scene-charm"${delay(delaySeconds)}>
        <path d="M0 -18 V-7" stroke="#7d6b56" stroke-width="1.8"/>
        <path d="M-12 -7 L12 -7 L9 15 L-9 15 Z" fill="${color}" stroke="#c9b79a" stroke-width="1.2"/>
        <path d="M-5 -1 H5 M-5 4 H5 M-4 9 H4" stroke="#b9a98c" stroke-width="1.2" opacity="0.75"/>
      </g>
    </g>`;
}

/** 貓神石像（石貓＋發光眼＋紅圍巾＋基座） */
function catDeity(
  x: number,
  y: number,
  scale: number,
  stone: string,
  stoneDark: string,
  scarf: string,
  eyeGlow: string,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="106" rx="84" ry="16" fill="${stoneDark}" opacity="0.4"/>
      <path d="M-72 104 H72 L58 80 H-58 Z" fill="${stoneDark}"/>
      <path d="M-52 80 H52 L42 68 H-42 Z" fill="${stone}" opacity="0.95"/>
      ${sceneCatSilhouette({ x: -50, y: -41, scale: 1, fill: stone, scarf, tailUp: true })}
      <circle cx="-18" cy="-13" r="4" fill="${eyeGlow}"/>
      <circle cx="18" cy="-13" r="4" fill="${eyeGlow}"/>
      <circle cx="-18" cy="-13" r="10" fill="${eyeGlow}" opacity="0.22"/>
      <circle cx="18" cy="-13" r="10" fill="${eyeGlow}" opacity="0.22"/>
    </g>`;
}

/** 漂浮岩石（配合 .scene-float-rock 浮沉） */
function floatingRock(
  x: number,
  y: number,
  scale: number,
  fill: string,
  shade: string,
  delaySeconds: number,
): string {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <g class="scene-float-rock"${delay(delaySeconds)}>
        <path d="M-42 0 Q0 -28 42 0 Q26 34 0 44 Q-26 34 -42 0 Z" fill="${fill}"/>
        <path d="M-42 0 Q0 -28 42 0 L30 8 Q0 -12 -30 8 Z" fill="${shade}"/>
        <circle cx="-16" cy="12" r="7" fill="${shade}" opacity="0.6"/>
      </g>
    </g>`;
}

/* ────────────────────────── 第 11 章：藏經閣 library ────────────────────────── */

function libraryScene(): string {
  const key = 'library';
  const dust = [
    [214, 160, 2.2, 0.6],
    [286, 212, 1.8, 2.4],
    [556, 178, 2.4, 1.2],
    [628, 238, 1.7, 3.6],
    [470, 132, 2, 4.8],
    [352, 262, 1.6, 5.6],
    [742, 300, 2.1, 2.9],
  ]
    .map(([x, y, r, d]) => `<circle class="scene-sparkle" cx="${x}" cy="${y}" r="${r}" fill="#ffe9b0"${delay(d as number)}/>`)
    .join('');
  return `
  <defs>
    ${linearGradient(`scene-${key}-wall`, [
      [0, '#241b17'],
      [0.55, '#33251d'],
      [1, '#433126'],
    ])}
    ${linearGradient(`scene-${key}-windowSky`, [
      [0, '#1b2745'],
      [0.6, '#3a4a72'],
      [1, '#6d7fa8'],
    ])}
    ${linearGradient(`scene-${key}-floor`, [
      [0, '#3d2b22'],
      [1, '#221813'],
    ])}
    ${radialGradient(`scene-${key}-lampGlow`, [
      [0, '#ffd98a', 0.65],
      [1, '#ffd98a', 0],
    ])}
    ${radialGradient(`scene-${key}-windowGlow`, [
      [0, '#b9cff2', 0.45],
      [1, '#b9cff2', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-wall)"/>

  <!-- 拱窗與夜空 -->
  <circle cx="400" cy="118" r="158" fill="url(#scene-${key}-windowGlow)"/>
  <path d="M322 270 V142 Q400 52 478 142 V270 Z" fill="url(#scene-${key}-windowSky)" stroke="#5a4333" stroke-width="10"/>
  <g stroke="#171019" stroke-width="3.4" fill="none" opacity="0.8">
    <path d="M400 70 V270 M322 168 H478 M322 214 H478"/>
    <path d="M322 270 V142 Q400 52 478 142 V270" stroke="#171019" stroke-width="2.4"/>
  </g>
  <circle cx="436" cy="124" r="21" fill="#fdf3d8" opacity="0.92"/>
  <g fill="#fdf6ec">
    <circle cx="356" cy="112" r="1.6"/><circle cx="380" cy="92" r="1.2"/><circle cx="452" cy="104" r="1.4"/>
    <circle cx="346" cy="152" r="1.1"/><circle cx="462" cy="170" r="1.3"/><circle cx="420" cy="86" r="1.2"/>
  </g>

  <!-- 後牆書架剪影 -->
  <rect x="24" y="150" width="276" height="230" rx="4" fill="#2b1f19"/>
  <rect x="500" y="150" width="276" height="230" rx="4" fill="#2b1f19"/>
  <g stroke="#1a1210" stroke-width="4" opacity="0.75">
    <path d="M24 196 H300 M24 240 H300 M24 284 H300 M24 328 H300"/>
    <path d="M500 196 H776 M500 240 H776 M500 284 H776 M500 328 H776"/>
  </g>
  <g opacity="0.5" fill="#b4655f">
    <rect x="52" y="206" width="8" height="34"/><rect x="64" y="212" width="7" height="28" fill="#8f9fd6"/>
    <rect x="712" y="208" width="8" height="32" fill="#6f9c76"/><rect x="724" y="214" width="7" height="26" fill="#e8b64c"/>
  </g>

  <!-- 掛軸 -->
  <g transform="translate(586 196)">
    <rect x="-22" y="-4" width="44" height="104" rx="3" fill="#f7ecd8"/>
    <rect x="-26" y="-8" width="52" height="7" rx="3" fill="#7d5a3f"/>
    <rect x="-26" y="99" width="52" height="7" rx="3" fill="#7d5a3f"/>
    <path d="M-10 22 H10 M-10 36 H10 M-10 50 H10 M-6 64 H12 M-10 78 H6" stroke="#8d7a5f" stroke-width="2.4" opacity="0.55"/>
    <rect x="4" y="82" width="14" height="14" rx="2" fill="#c96b5f"/>
    <path d="M8 86 l6 6 M14 86 l-6 6" stroke="#fdf6ec" stroke-width="1.2"/>
  </g>

  <!-- 地板 -->
  <path d="M0 392 H800 V450 H0 Z" fill="url(#scene-${key}-floor)"/>
  <g stroke="#1c1410" stroke-width="2" opacity="0.55">
    <path d="M0 404 H800 M0 420 H800 M0 436 H800 M130 392 V450 M350 392 V450 M570 392 V450 M730 392 V450"/>
  </g>

  <!-- 高書架 -->
  ${bookShelf(38, 150, 254, 238, 1101, 4)}
  ${bookShelf(508, 150, 254, 238, 1102, 4)}
  ${bookShelf(330, 300, 140, 104, 1103, 2)}

  <!-- 吊燈籠 -->
  <path d="M276 104 V38 M524 104 V38" stroke="#2b1f19" stroke-width="2.4" opacity="0.9"/>
  ${paperLantern(276, 104, 0.72, '#f2b45c', '#ffd98a', 1.6)}
  ${paperLantern(524, 104, 0.72, '#f2b45c', '#ffd98a', 3.8)}
  <circle cx="276" cy="120" r="56" fill="url(#scene-${key}-lampGlow)" opacity="0.42"/>
  <circle cx="524" cy="120" r="56" fill="url(#scene-${key}-lampGlow)" opacity="0.42"/>

  <!-- 拉梯 -->
  <g stroke="#8a6a4a" stroke-width="5" stroke-linecap="round">
    <path d="M300 130 L264 386 M328 130 L292 386"/>
    <path d="M296 160 H324 M292 196 H320 M288 232 H316 M284 268 H312 M280 304 H308 M276 340 H304 M273 368 H301"/>
  </g>

  <!-- 書枱與書卷 -->
  <g>
    <rect x="286" y="350" width="228" height="12" rx="4" fill="#6b4a33"/>
    <rect x="296" y="362" width="12" height="36" fill="#4a3428"/>
    <rect x="492" y="362" width="12" height="36" fill="#4a3428"/>
    <rect x="304" y="362" width="196" height="8" fill="#2f211a" opacity="0.8"/>
  </g>
  <g transform="translate(356 342)">
    <path d="M-30 -6 L-2 -2 L26 -6 L26 8 L-2 12 L-30 8 Z" fill="#fdf6ec"/>
    <path d="M-2 -2 V12" stroke="#c9b79a" stroke-width="2"/>
    <path d="M-24 0 H-8 M-24 4 H-8 M8 0 H20 M8 4 H20" stroke="#c9b79a" stroke-width="1.2"/>
  </g>
  <g transform="translate(396 344)">
    <rect x="-24" y="-10" width="48" height="9" rx="2" fill="#8f9fd6"/>
    <rect x="-22" y="-15" width="44" height="7" rx="2" fill="#b4655f"/>
    <rect x="-20" y="-19" width="40" height="6" rx="2" fill="#6f9c76"/>
  </g>
  ${candle(504, 342, 1, 1.2)}
  <ellipse cx="356" cy="372" rx="86" ry="14" fill="#ffd98a" opacity="0.1"/>
  <!-- 店長貓坐喺書枱 -->
  ${sceneCatSilhouette({ x: 452, y: 288, scale: 0.56, fill: '#241b17', scarf: '#6f9c76', tailUp: true })}

  <!-- 前景書架角 -->
  <g fill="#1c1410">
    <path d="M0 450 V404 H96 V450 Z"/>
    <path d="M704 450 V412 H800 V450 Z"/>
  </g>
  <g opacity="0.9">
    <rect x="14" y="410" width="8" height="32" rx="1" fill="#b4655f"/>
    <rect x="26" y="416" width="7" height="26" rx="1" fill="#6f9c76"/>
    <rect x="37" y="412" width="6" height="30" rx="1" fill="#e8b64c"/>
    <rect x="716" y="418" width="7" height="26" rx="1" fill="#8f9fd6"/>
    <rect x="727" y="414" width="8" height="30" rx="1" fill="#d98d92"/>
  </g>

  <!-- 浮書與塵光 -->
  ${floatingBook(150, 116, 0.55, -10, 2.4, '#8f9fd6')}
  ${floatingBook(668, 172, 0.46, 12, 5.1, '#b4655f')}
  ${dust}

  <!-- 腳印 -->
  ${pawPrint(476, 424, 0.8, '#1c1410', 0.5, 14)}
  ${pawPrint(510, 432, 0.7, '#1c1410', 0.42, 4)}`;
}

/* ────────────────────────── 第 12 章：烈焰火山 volcano ────────────────────────── */

function volcanoScene(): string {
  const key = 'volcano';
  const embers = [
    [336, 250, 3.4, 0.4], [352, 226, 2.6, 1.6], [318, 210, 2.2, 3.2],
    [366, 196, 3, 2.2], [300, 168, 2, 4.4], [352, 148, 2.8, 5.6],
    [330, 120, 2.2, 6.8], [258, 300, 2.4, 1.1], [430, 268, 2, 7.2],
  ]
    .map(([x, y, r, d]) => ember(x as number, y as number, r as number, d as number))
    .join('');
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#120e18'],
      [0.45, '#331a24'],
      [0.8, '#6e2a28'],
      [1, '#a33a2f'],
    ])}
    ${radialGradient(`scene-${key}-craterGlow`, [
      [0, '#ffb45c', 0.85],
      [0.5, '#ff7a3d', 0.4],
      [1, '#ff7a3d', 0],
    ])}
    ${linearGradient(`scene-${key}-lava`, [
      [0, '#ffd98a'],
      [0.45, '#ff7a3d'],
      [1, '#8a2a1a'],
    ])}
    ${linearGradient(`scene-${key}-ashSky`, [
      [0, '#1a1118'],
      [1, '#3a2028'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="352" cy="168" r="170" fill="url(#scene-${key}-craterGlow)" opacity="0.5"/>

  <!-- 遠山剪影 -->
  <path d="M0 336 L112 244 L206 320 L306 252 L402 330 L512 262 L628 328 L800 286 V450 H0 Z" fill="#2a1820"/>
  <path d="M0 360 L140 300 L280 352 L420 306 L560 358 L700 312 L800 344 V450 H0 Z" fill="#241520" opacity="0.9"/>

  <!-- 火山本體 -->
  <path d="M132 438 L318 164 Q338 138 362 164 L568 438 Z" fill="#241722"/>
  <path d="M318 164 Q338 138 362 164 L386 196 Q342 178 298 196 Z" fill="#160e15"/>
  <ellipse cx="342" cy="168" rx="38" ry="13" fill="#ff7a3d" opacity="0.85"/>
  <ellipse cx="342" cy="166" rx="18" ry="6" fill="#ffd27a"/>
  <path d="M320 164 L256 206 M370 162 L428 206" stroke="#1a1018" stroke-width="5" opacity="0.6"/>

  <!-- 熔岩流 -->
  <path class="scene-lava" d="M334 174 C316 236 288 286 250 344 C230 374 220 404 216 436" fill="none" stroke="#ff7a3d" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
  <path class="scene-lava" d="M348 176 C356 246 376 304 406 358 C424 390 442 414 456 438" fill="none" stroke="#ff9a4d" stroke-width="10" stroke-linecap="round" opacity="0.85"/>
  <path class="scene-lava" d="M334 174 C316 236 288 286 250 344 C230 374 220 404 216 436" fill="none" stroke="#ffd27a" stroke-width="4" stroke-linecap="round" opacity="0.95"${delay(0.8)}/>
  <path class="scene-lava" d="M348 176 C356 246 376 304 406 358 C424 390 442 414 456 438" fill="none" stroke="#ffe3b0" stroke-width="3" stroke-linecap="round" opacity="0.9"${delay(2.4)}/>

  <!-- 山腳熔岩湖 -->
  <path d="M120 438 Q260 404 420 420 Q580 436 668 420 L690 450 H96 Z" fill="url(#scene-${key}-lava)" opacity="0.92"/>
  <ellipse cx="360" cy="436" rx="150" ry="16" fill="#ffb45c" opacity="0.2"/>

  <!-- 煙霧 -->
  ${cloudPuff(300, 108, 1.5, '#3a2a35', 0.6, 'scene-cloud-puff', 1.2)}
  ${cloudPuff(408, 66, 1.15, '#2f2430', 0.55, 'scene-cloud-puff', 4.3)}
  ${cloudPuff(260, 58, 0.9, '#463039', 0.45, 'scene-cloud-puff', 7.1)}

  <!-- 前景岩石 -->
  <path d="M0 450 V372 L84 392 L148 418 L196 450 Z" fill="#170f16"/>
  <path d="M800 450 V384 L724 400 L674 428 L644 450 Z" fill="#170f16"/>
  <ellipse cx="90" cy="420" rx="58" ry="12" fill="#2a1a22" opacity="0.8"/>
  <ellipse cx="720" cy="430" rx="52" ry="10" fill="#2a1a22" opacity="0.8"/>

  <!-- 火之貓（企喺右邊岩石，熔岩做背光） -->
  <circle cx="712" cy="352" r="62" fill="#ff7a3d" opacity="0.14"/>
  ${sceneCatSilhouette({ x: 676, y: 324, scale: 0.7, fill: '#120b12', scarf: '#e07e9c', tailUp: true })}
  <!-- 熔岩中的黑曜石 -->
  <ellipse cx="330" cy="440" rx="34" ry="8" fill="#1a1018" opacity="0.9"/>
  <ellipse cx="524" cy="444" rx="42" ry="9" fill="#1a1018" opacity="0.85"/>
  <ellipse cx="432" cy="438" rx="24" ry="6" fill="#1a1018" opacity="0.8"/>

  <!-- 餘燼與熱光 -->
  ${embers}
  <circle class="scene-sparkle" cx="286" cy="386" r="2.4" fill="#ffd27a"${delay(1.4)}/>
  <circle class="scene-sparkle" cx="470" cy="398" r="2" fill="#ffb45c"${delay(3.6)}/>`;
}

/* ────────────────────────── 第 13 章：大漠孤煙 desert ────────────────────────── */

function desertScene(): string {
  const key = 'desert';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#f6b98f'],
      [0.42, '#fbd9b4'],
      [0.72, '#fbe9c8'],
      [1, '#f6d6a0'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#fff4d8', 0.95],
      [1, '#ffd9a0', 0],
    ])}
    ${linearGradient(`scene-${key}-sandFar`, [
      [0, '#e8cfa0'],
      [1, '#dcbe88'],
    ])}
    ${linearGradient(`scene-${key}-sandNear`, [
      [0, '#d9b482'],
      [1, '#c9a06a'],
    ])}
    ${radialGradient(`scene-${key}-fireGlow`, [
      [0, '#ffd98a', 0.8],
      [1, '#ffd98a', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="626" cy="176" r="172" fill="url(#scene-${key}-sun)"/>
  <circle cx="626" cy="176" r="50" fill="#fff6dc" opacity="0.92"/>
  ${cloudPuff(168, 86, 1.1, '#fbe9d2', 0.5, 'scene-cloud-puff', 3.1)}
  ${cloudPuff(560, 58, 0.8, '#fbe9d2', 0.4, 'scene-cloud-puff', 6.4)}

  <!-- 遠方金字塔 -->
  ${pyramid(150, 334, 190, 122, '#dcb98a', '#c9a06a')}
  ${pyramid(292, 344, 122, 82, '#d3ac78', '#c0985f')}
  ${pyramid(62, 352, 92, 56, '#e2c391', '#cfa974')}

  <!-- 沙丘層次 -->
  <path d="M0 356 Q180 314 380 348 Q560 380 800 330 V450 H0 Z" fill="url(#scene-${key}-sandFar)"/>
  <path d="M0 396 Q220 358 430 390 Q640 422 800 384 V450 H0 Z" fill="#d9b482"/>
  <path d="M0 430 Q240 402 480 426 Q660 444 800 418 V450 H0 Z" fill="url(#scene-${key}-sandNear)"/>

  <!-- 商隊 -->
  ${camel(292, 376, 0.62, '#7a5a3a', '#ef9fb6')}
  ${camel(352, 368, 0.5, '#84643f', '#e8b64c')}
  ${camel(398, 360, 0.42, '#8d6b45', '#6f9c76')}
  ${sceneCatSilhouette({ x: 280, y: 310, scale: 0.32, fill: '#5b4634', scarf: '#e07e9c' })}
  <!-- 商隊腳印 -->
  ${pawPrint(238, 388, 0.6, '#b08a55', 0.45, 18)}
  ${pawPrint(262, 382, 0.55, '#b08a55', 0.4, 6)}

  <!-- 大漠孤煙 -->
  <circle cx="520" cy="338" r="24" fill="url(#scene-${key}-fireGlow)" opacity="0.45"/>
  <path class="scene-steam" d="M520 334 C512 302 528 276 518 248 C512 226 522 206 516 186" stroke="#e8d6b8" stroke-width="6" fill="none" opacity="0.55" stroke-linecap="round"/>
  <path class="scene-steam" d="M526 334 C536 306 522 282 530 258 C536 238 528 220 532 202" stroke="#f6ead2" stroke-width="3" fill="none" opacity="0.42" stroke-linecap="round"${delay(2.2)}/>

  <!-- 營地 -->
  <g transform="translate(700 396)">
    <path d="M-54 8 L0 -42 L54 8 Z" fill="#8a4a44"/>
    <path d="M-30 8 L0 -22 L30 8 Z" fill="#6e3a36"/>
    <path d="M-54 8 H54" stroke="#c9a06a" stroke-width="3"/>
    <circle cx="26" cy="20" r="26" fill="url(#scene-${key}-fireGlow)" opacity="0.7"/>
    <path d="M18 24 L34 24 M20 29 L32 29" stroke="#6b4a33" stroke-width="4" stroke-linecap="round"/>
    <circle class="scene-candle" cx="26" cy="16" r="7" fill="#ffb45c"${delay(0.6)}/>
  </g>
  ${sceneCatSilhouette({ x: 646, y: 342, scale: 0.5, fill: '#5b4634', scarf: '#6f9c76' })}
  ${pawPrint(636, 406, 0.7, '#b08a55', 0.55, 10)}
  ${pawPrint(666, 412, 0.62, '#b08a55', 0.5, -6)}

  <!-- 前景草與石 -->
  <g stroke="#b08a55" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.85">
    <path d="M86 442 q-6 -18 2 -28 M96 446 q8 -14 14 -20 M106 444 q2 -14 8 -20"/>
    <path d="M520 438 q-5 -16 2 -24 M530 442 q7 -12 12 -17"/>
  </g>
  <ellipse cx="182" cy="430" rx="28" ry="8" fill="#b08a55" opacity="0.65"/>
  <ellipse cx="560" cy="440" rx="20" ry="6" fill="#b08a55" opacity="0.55"/>

  <!-- 鷹 -->
  <g stroke="#7a5a3a" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.75">
    <path d="M420 120 q10 -10 20 0 q10 -10 20 0"/>
    <path d="M500 160 q7 -7 14 0 q7 -7 14 0"/>
  </g>
  <circle class="scene-sparkle" cx="470" cy="360" r="2" fill="#fff3d8"${delay(2.2)}/>
  <circle class="scene-sparkle" cx="250" cy="420" r="1.8" fill="#fff3d8"${delay(4.6)}/>`;
}

/* ────────────────────────── 第 14 章：極光冰原 aurora ────────────────────────── */

function auroraScene(): string {
  const key = 'aurora';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#060d1c'],
      [0.45, '#0c2038'],
      [0.8, '#123a52'],
      [1, '#1b4a62'],
    ])}
    ${linearGradient(`scene-${key}-auroraA`, [
      [0, '#7dffc4', 0.98],
      [0.55, '#6fd6e8', 0.55],
      [1, '#6fd6e8', 0],
    ])}
    ${linearGradient(`scene-${key}-auroraB`, [
      [0, '#8fd6ff', 0.9],
      [0.6, '#b48cf2', 0.42],
      [1, '#b48cf2', 0],
    ])}
    ${linearGradient(`scene-${key}-auroraC`, [
      [0, '#b48cf2', 0.78],
      [0.65, '#7dffc4', 0.34],
      [1, '#7dffc4', 0],
    ])}
    ${linearGradient(`scene-${key}-ice`, [
      [0, '#dceaf5'],
      [0.6, '#b9d8ea'],
      [1, '#8fbdd6'],
    ])}
    ${linearGradient(`scene-${key}-mountain`, [
      [0, '#cfe6f5'],
      [1, '#9dbddb'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  ${starField(52, 1401, { maxY: 280, animated: 8 })}
  <!-- 小彎月 -->
  <circle cx="132" cy="82" r="34" fill="#fdf3d8"/>
  <circle cx="118" cy="70" r="30" fill="#0b1528"/>

  <!-- 極光 -->
  ${auroraBand('M-60 260 C80 120 240 288 420 138 C560 26 700 168 860 68 L860 158 C700 258 560 118 420 228 C240 368 80 208 -60 348 Z', `scene-${key}-auroraA`, 0.72, 0.4)}
  ${auroraBand('M-60 312 C120 208 260 338 440 216 C600 104 720 236 860 156 L860 216 C720 296 600 176 440 286 C260 406 120 286 -60 390 Z', `scene-${key}-auroraB`, 0.58, 2.2)}
  ${auroraBand('M-60 352 C140 280 300 378 480 286 C640 204 760 306 860 256 L860 306 C760 356 640 256 480 336 C300 426 140 336 -60 410 Z', `scene-${key}-auroraC`, 0.46, 4.6)}

  <!-- 雪山 -->
  <path d="M0 330 L120 214 L226 292 L332 196 L456 330 L560 252 L676 336 L800 268 V450 H0 Z" fill="url(#scene-${key}-mountain)"/>
  <path d="M120 214 L160 254 L136 262 L108 250 Z" fill="#f2f9ff"/>
  <path d="M332 196 L370 236 L344 244 L318 230 Z" fill="#f2f9ff"/>
  <path d="M560 252 L594 284 L570 292 L546 280 Z" fill="#f2f9ff"/>

  <!-- 冰原 -->
  <path d="M0 348 Q200 320 400 342 Q600 364 800 336 V450 H0 Z" fill="url(#scene-${key}-ice)"/>
  <g stroke="#8fb8d4" stroke-width="1.8" fill="none" opacity="0.5">
    <path d="M120 380 L210 372 L280 386 M430 368 L520 378 L596 366 M640 402 L720 392"/>
    <path d="M60 420 L150 408 M340 412 L430 420 L500 408 M560 430 L640 420"/>
  </g>
  <!-- 極光倒影（柔和） -->
  <g opacity="0.16">
    <ellipse cx="322" cy="374" rx="132" ry="16" fill="#7dffc4"/>
    <ellipse cx="466" cy="396" rx="108" ry="13" fill="#b48cf2"/>
    <ellipse cx="208" cy="402" rx="86" ry="11" fill="#8fd6ff"/>
  </g>
  <g opacity="0.22" fill="none" stroke="#bff7e8" stroke-width="2" stroke-linecap="round">
    <path d="M240 386 q22 -6 44 0 t44 0"/>
    <path d="M392 408 q20 -6 40 0 t40 0"/>
  </g>

  <!-- 冰晶 -->
  ${iceSpike(64, 450, 1.15, '#bfe3f5', 0.85)}
  ${iceSpike(116, 452, 0.7, '#d8f0fb', 0.8)}
  ${iceSpike(742, 450, 0.95, '#bfe3f5', 0.85)}
  <!-- 雪丘 -->
  <ellipse cx="220" cy="444" rx="70" ry="16" fill="#f2f9ff" opacity="0.9"/>
  <ellipse cx="600" cy="448" rx="86" ry="18" fill="#f2f9ff" opacity="0.85"/>

  <!-- 望極光的貓 -->
  ${sceneCatSilhouette({ x: 400, y: 316, scale: 0.7, fill: '#0a1a2e', scarf: '#6f9c76', tailUp: true })}
  <g fill="#dff8ff">
    <circle class="scene-sparkle" cx="300" cy="342" r="2.2"${delay(0.8)}/>
    <circle class="scene-sparkle" cx="420" cy="360" r="1.8"${delay(5.3)}/>
    <circle class="scene-sparkle" cx="520" cy="330" r="1.8"${delay(2.6)}/>
    <circle class="scene-sparkle" cx="460" cy="386" r="2"${delay(4.4)}/>

    <circle class="scene-sparkle" cx="604" cy="382" r="2.2"${delay(3.5)}/>
  </g>
  ${pawPrint(352, 420, 0.8, '#9dbddb', 0.55, 16)}
  ${pawPrint(380, 430, 0.72, '#9dbddb', 0.5, 4)}`;
}

/* ────────────────────────── 第 15 章：海底龍宮 underwater ────────────────────────── */

function underwaterScene(): string {
  const key = 'underwater';
  const bubbles = [
    [150, 360, 6, 0.4], [186, 300, 4, 2.2], [130, 250, 3.2, 4.4],
    [210, 380, 3.6, 6.1], [300, 340, 4.4, 1.4], [470, 360, 5, 5.2],
    [600, 392, 4.6, 2.8], [716, 286, 4.2, 4.1],
  ]
    .map(([x, y, r, d]) => bubble(x as number, y as number, r as number, d as number))
    .join('');
  return `
  <defs>
    ${linearGradient(`scene-${key}-water`, [
      [0, '#2f9fae'],
      [0.45, '#176b7f'],
      [1, '#0a2a38'],
    ])}
    ${linearGradient(`scene-${key}-ray`, [
      [0, '#d8fff8', 0.4],
      [1, '#d8fff8', 0],
    ])}
    ${linearGradient(`scene-${key}-sand`, [
      [0, '#c9b98a'],
      [1, '#9f9068'],
    ])}
    ${radialGradient(`scene-${key}-palaceGlow`, [
      [0, '#ffd98a', 0.7],
      [1, '#ffd98a', 0],
    ])}
    ${radialGradient(`scene-${key}-pearl`, [
      [0, '#ffffff', 0.95],
      [0.5, '#d8f8ff', 0.7],
      [1, '#d8f8ff', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-water)"/>

  <!-- 水面光柱 -->
  <g>
    <path class="scene-beam" d="M96 0 L250 0 L430 450 L220 450 Z" fill="url(#scene-${key}-ray)"/>
    <path class="scene-beam" d="M420 0 L540 0 L640 450 L500 450 Z" fill="url(#scene-${key}-ray)" opacity="0.7"${delay(2.4)}/>
  </g>

  <!-- 遠處魚群 -->
  ${fishSilhouette(128, 150, 0.8, '#4f8a8a', 1.2)}
  ${fishSilhouette(176, 176, 0.55, '#4f8a8a', 3.4)}
  ${fishSilhouette(700, 206, 0.6, '#3f7a7c', 2.2)}

  <!-- 海底龍宮 -->
  <circle cx="520" cy="220" r="170" fill="url(#scene-${key}-palaceGlow)" opacity="0.35"/>
  <g transform="translate(520 236)">
    <ellipse cx="0" cy="176" rx="152" ry="26" fill="#08242e" opacity="0.55"/>
    <!-- 基座浮石 -->
    <path d="M-124 168 L-100 152 H100 L124 168 L96 182 H-96 Z" fill="#4a5560"/>
    <path d="M-96 152 H96 L80 138 H-80 Z" fill="#5d6a72"/>
    <!-- 一樓紅牆與金窗 -->
    <rect x="-96" y="60" width="192" height="92" fill="#8a3a44"/>
    <rect x="-82" y="72" width="164" height="68" fill="#a84a4a"/>
    <g fill="#f7dd9a" opacity="0.92">
      <rect x="-66" y="92" width="30" height="30" rx="3"/>
      <rect x="-18" y="92" width="30" height="30" rx="3"/>
      <rect x="30" y="92" width="30" height="30" rx="3"/>
    </g>
    <g stroke="#6e3a36" stroke-width="2" opacity="0.7">
      <path d="M-82 108 H82 M-66 92 V122 M-36 92 V122 M12 92 V122 M60 92 V122"/>
    </g>
    <g fill="#c96b5f"><rect x="-92" y="72" width="8" height="80"/><rect x="84" y="72" width="8" height="80"/></g>
    <rect x="-22" y="108" width="44" height="44" rx="3" fill="#6e3a36"/>
    <path d="M-22 108 Q0 96 22 108" fill="#c9932f" opacity="0.8"/>
    <g stroke="#f2c97a" stroke-width="2" opacity="0.6"><path d="M-96 66 H96"/></g>
    <!-- 下層屋簷 -->
    <path d="M-132 62 Q0 16 132 62 L120 78 Q0 36 -120 78 Z" fill="#e8b64c"/>
    <path d="M-132 62 Q-120 52 -110 62 M132 62 Q120 52 110 62" fill="none" stroke="#c9932f" stroke-width="4"/>
    <!-- 二樓 -->
    <rect x="-64" y="0" width="128" height="44" fill="#8a3a44"/>
    <rect x="-52" y="8" width="104" height="28" fill="#a84a4a"/>
    <g fill="#f7dd9a" opacity="0.85">
      <rect x="-40" y="14" width="24" height="18" rx="2"/>
      <rect x="-8" y="14" width="24" height="18" rx="2"/>
      <rect x="24" y="14" width="24" height="18" rx="2"/>
    </g>
    <path d="M-92 2 Q0 -40 92 2 L82 18 Q0 -18 -82 18 Z" fill="#e8b64c"/>
    <path d="M-92 2 Q-80 -8 -70 2 M92 2 Q80 -8 70 2" fill="none" stroke="#c9932f" stroke-width="3.6"/>
    <!-- 塔尖與龍珠 -->
    <path d="M-36 -36 Q0 -70 36 -36 Z" fill="#6f9c76"/>
    <path d="M0 -70 V-92" stroke="#c9932f" stroke-width="4"/>
    <circle cx="0" cy="-98" r="9" fill="#d8f8ff"/>
    <circle cx="0" cy="-98" r="20" fill="url(#scene-${key}-pearl)" opacity="0.8"/>
    <!-- 燈籠 -->
    <circle cx="-104" cy="86" r="12" fill="#ffd98a" opacity="0.25"/>
    <circle cx="-104" cy="86" r="5" fill="#f7d98a"/>
    <circle cx="104" cy="86" r="12" fill="#ffd98a" opacity="0.25"/>
    <circle cx="104" cy="86" r="5" fill="#f7d98a"/>
  </g>

  <!-- 珊瑚礁 -->
  ${coral(96, 450, 1.5, '#e8756b', '#f4a7bb')}
  ${coral(188, 452, 1.1, '#e8b64c', '#f09a5c')}
  ${coral(660, 452, 1.3, '#b48cf2', '#f7c1d0')}
  ${coral(760, 450, 1.0, '#f28ba8', '#ffd1dc')}
  ${seaweed(252, 450, 1.15, '#3f8a6a', 1.4)}
  ${seaweed(300, 450, 0.8, '#4f9a7a', 3.1)}
  ${seaweed(604, 450, 1.0, '#3f8a6a', 2.2)}

  <!-- 沙地 -->
  <path d="M0 408 Q200 380 400 400 Q600 420 800 392 V450 H0 Z" fill="url(#scene-${key}-sand)"/>
  <ellipse cx="420" cy="438" rx="60" ry="8" fill="#8f8060" opacity="0.4"/>

  <!-- 巨蚌珍珠 -->
  <g transform="translate(320 388)">
    <path d="M-44 14 Q-42 -14 0 -20 Q42 -14 44 14 Q0 30 -44 14 Z" fill="#b48cf2" opacity="0.75"/>
    <path d="M-44 14 Q0 -4 44 14 Q0 26 -44 14 Z" fill="#d8bdf7" opacity="0.9"/>
    <circle cx="0" cy="4" r="26" fill="url(#scene-${key}-pearl)" opacity="0.65"/>
    <circle cx="0" cy="4" r="10" fill="#ffffff" opacity="0.9"/>
  </g>

  <!-- 潛水貓 -->
  ${sceneCatSilhouette({ x: 196, y: 318, scale: 0.72, fill: '#0d3040', scarf: '#ef9fb6', tailUp: true })}
  <circle cx="228" cy="302" r="22" fill="#d8f8ff" opacity="0.1"/>
  <circle cx="228" cy="302" r="22" fill="none" stroke="#bff7f2" stroke-width="2" opacity="0.5"/>
  <circle cx="233" cy="298" r="3.2" fill="#eafcff" opacity="0.85"/>
  ${bubble(206, 280, 4, 1.4)}

  <!-- 氣泡與海星 -->
  ${bubbles}
  <g transform="translate(226 424)" fill="#f09a5c">
    <path d="M0 -13 L5 -4 L15 -4 L7 3 L10 13 L0 6 L-10 13 L-7 3 L-15 -4 L-5 -4 Z"/>
  </g>
  <g fill="#fdf6ec" opacity="0.85">
    <ellipse cx="440" cy="424" rx="9" ry="6" transform="rotate(-16 440 424)"/>
    <ellipse cx="548" cy="436" rx="7" ry="5" transform="rotate(14 548 436)"/>
  </g>
  ${bubble(260, 220, 2.8, 3.8)}`;
}

/* ────────────────────────── 第 16 章：天空之城 skycastle ────────────────────────── */

function skycastleScene(): string {
  const key = 'skycastle';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#8fb3de'],
      [0.42, '#d9c8e8'],
      [0.72, '#f7d9e0'],
      [1, '#fbe6bd'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#fff6d8', 0.9],
      [1, '#ffd9a0', 0],
    ])}
    ${linearGradient(`scene-${key}-stone`, [
      [0, '#fdf6ec'],
      [1, '#e3d6c4'],
    ])}
    ${linearGradient(`scene-${key}-rock`, [
      [0, '#b9a8d6'],
      [1, '#8d7aa8'],
    ])}
    ${linearGradient(`scene-${key}-water`, [
      [0, '#d8f4ff', 0.9],
      [1, '#a9d8ee', 0.2],
    ])}
    ${linearGradient(`scene-${key}-cloud`, [
      [0, '#ffffff'],
      [1, '#e9e2f8'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="612" cy="168" r="170" fill="url(#scene-${key}-sun)"/>
  <circle cx="612" cy="168" r="46" fill="#fff8e8" opacity="0.9"/>
  ${cloudPuff(180, 92, 1.25, '#ffe9ec', 0.6, 'scene-cloud-puff', 3.2)}
  ${cloudPuff(470, 60, 0.9, '#fff3e2', 0.45, 'scene-cloud-puff', 6.5)}
  ${cloudPuff(720, 50, 0.8, '#ffe9ec', 0.4, 'scene-cloud-puff', 9.1)}

  <!-- 浮空島＋城堡 -->
  <g transform="translate(520 310) scale(1.06)">
    <ellipse cx="0" cy="118" rx="150" ry="28" fill="#b9a8d6" opacity="0.35"/>
    <!-- 岩石基座 -->
    <path d="M-150 0 Q0 -52 150 0 Q120 66 58 96 L0 140 L-58 96 Q-120 66 -150 0 Z" fill="url(#scene-${key}-rock)"/>
    <path d="M-150 0 Q0 -52 150 0 L128 12 Q0 -32 -128 12 Z" fill="#cfc0e6"/>
    <path d="M-96 42 L-52 62 L-72 88 L-114 66 Z" fill="#8d7aa8" opacity="0.7"/>
    <!-- 城牆 -->
    <path d="M-134 0 H134 L126 30 H-126 Z" fill="url(#scene-${key}-stone)" opacity="0.95"/>
    <path d="M-134 0 H134 L132 6 H-132 Z" fill="#e3d6c4"/>
    <g fill="#6f8fb8" opacity="0.75">
      <rect x="-118" y="-16" width="10" height="16" rx="2"/><rect x="-92" y="-16" width="10" height="16" rx="2"/>
      <rect x="82" y="-16" width="10" height="16" rx="2"/><rect x="108" y="-16" width="10" height="16" rx="2"/>
    </g>
    <!-- 橋 -->
    <path d="M-134 8 Q-190 6 -232 22 L-232 34 Q-190 22 -134 20 Z" fill="#c9b79a"/>
    <path d="M-232 22 V46 M-196 15 V42 M-160 11 V40" stroke="#8d7f6a" stroke-width="3"/>
    <ellipse cx="-236" cy="60" rx="52" ry="16" fill="#ffffff" opacity="0.8"/>
    <!-- 三座塔 -->
    ${castleTower(-74, 30, 0.9, 'url(#scene-${key}-stone)', '#54739e', '#f7dd9a')}
    ${castleTower(78, 30, 0.78, 'url(#scene-${key}-stone)', '#54739e', '#f7dd9a')}
    <g transform="translate(0 30)">
      <rect x="-46" y="-72" width="92" height="72" rx="4" fill="url(#scene-${key}-stone)"/>
      <path d="M-58 -72 Q0 -106 58 -72 Z" fill="#54739e"/>
      <path d="M-64 -72 H64 L56 -62 H-56 Z" fill="#6f8fb8"/>
      <ellipse cx="0" cy="-36" rx="66" ry="26" fill="#f7dd9a" opacity="0.12"/>
      <rect x="-30" y="-46" width="24" height="22" rx="2" fill="#f7dd9a" opacity="0.9"/>
      <rect x="6" y="-46" width="24" height="22" rx="2" fill="#f7dd9a" opacity="0.85"/>
      <path d="M-20 -22 V0 M0 -22 V0 M20 -22 V0" stroke="#8d7f6a" stroke-width="5"/>
      <path d="M0 -106 V-124" stroke="#8d7f6a" stroke-width="3"/>
      <path class="scene-flag" d="M2 -122 L34 -114 L2 -105 Z" fill="#e88aa8"/>
    </g>
    <!-- 城牆旗幟 -->
    <path class="scene-flag" d="M-100 -14 L-78 -8 L-100 -2 Z" fill="#f4a7bb"/>
    <path d="M-104 -14 V-32" stroke="#8d7f6a" stroke-width="2"/>
    <path class="scene-flag" d="M100 -14 L78 -8 L100 -2 Z" fill="#e8b64c"/>
    <path d="M104 -14 V-32" stroke="#8d7f6a" stroke-width="2"/>
    <!-- 瀑布 -->
    ${waterfall(120, 34, 34, 150, '#d8f4ff', 1.4)}
    <ellipse cx="120" cy="190" rx="56" ry="18" fill="#ffffff" opacity="0.8"/>
    <ellipse cx="120" cy="196" rx="34" ry="10" fill="#d8f4ff" opacity="0.5"/>
    <!-- 島上小樹 -->
    <g fill="#8aa87d">
      <circle cx="-146" cy="-16" r="15"/><circle cx="-128" cy="-26" r="12"/>
    </g>
    <path d="M-138 -8 V6" stroke="#7d6b56" stroke-width="4"/>
  </g>

  <!-- 熱氣球 -->
  ${hotAirBalloon(168, 176, 0.95, '#f4a7bb', '#fff8ec', 1.2)}
  ${hotAirBalloon(722, 138, 0.7, '#8f9fd6', '#fdf6ec', 3.8)}
  ${hotAirBalloon(352, 96, 0.52, '#e8b64c', '#fff8ec', 6.1)}

  <!-- 飛鳥 -->
  <g stroke="#6b5a4d" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.7">
    <path d="M260 130 q9 -9 18 0 q9 -9 18 0"/>
    <path d="M600 92 q7 -7 14 0 q7 -7 14 0"/>
    <path d="M680 190 q6 -6 12 0 q6 -6 12 0"/>
  </g>

  <!-- 雲海 -->
  ${cloudPuff(120, 420, 1.8, '#ffffff', 0.85, 'scene-cloud-puff', 2.2)}
  ${cloudPuff(400, 446, 2.1, '#f3edff', 0.8, 'scene-cloud-puff', 5.4)}
  ${cloudPuff(680, 424, 1.7, '#ffffff', 0.8, 'scene-cloud-puff', 8.1)}
  <ellipse cx="400" cy="466" rx="300" ry="42" fill="#fdf6ec" opacity="0.9"/>

  <!-- 雲上小貓 -->
  ${sceneCatSilhouette({ x: 300, y: 344, scale: 0.55, fill: '#6b5a4d', scarf: '#e07e9c' })}
  ${pawPrint(348, 398, 0.7, '#c9b79a', 0.5, 12)}
  ${pawPrint(374, 410, 0.6, '#c9b79a', 0.45, 2)}`;
}

/* ────────────────────────── 第 17 章：貓神古廟 shrine ────────────────────────── */

function shrineScene(): string {
  const key = 'shrine';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#2a2438'],
      [0.5, '#5d3c4e'],
      [0.8, '#a35a58'],
      [1, '#d98d92'],
    ])}
    ${radialGradient(`scene-${key}-sun`, [
      [0, '#ffdba0', 0.9],
      [1, '#ffdba0', 0],
    ])}
    ${linearGradient(`scene-${key}-stone`, [
      [0, '#8d8a7a'],
      [1, '#6b6a5c'],
    ])}
    ${radialGradient(`scene-${key}-eyeGlow`, [
      [0, '#ffe9a0', 0.9],
      [1, '#ffe9a0', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  <circle cx="620" cy="262" r="180" fill="url(#scene-${key}-sun)" opacity="0.7"/>
  <circle cx="620" cy="262" r="52" fill="#ffe3b0" opacity="0.9"/>
  ${cloudPuff(180, 84, 1.2, '#c9a8b8', 0.4, 'scene-cloud-puff', 3.2)}
  ${cloudPuff(520, 118, 0.9, '#d9b8c4', 0.32, 'scene-cloud-puff', 6.6)}

  <!-- 遠山與森林 -->
  <path d="M0 320 L120 244 L230 310 L340 236 L450 316 L570 250 L690 318 L800 268 V450 H0 Z" fill="#3a2f3e"/>
  <g fill="#1f2a28">
    <path d="M0 350 L60 220 L120 350 Z"/>
    <path d="M90 360 L160 210 L230 360 Z"/>
    <path d="M610 356 L680 216 L750 356 Z"/>
    <path d="M720 366 L780 240 L840 366 Z"/>
  </g>
  <g fill="#25322c">
    <path d="M-20 382 L40 268 L100 382 Z"/>
    <path d="M700 382 L770 260 L840 382 Z"/>
  </g>

  <!-- 參道石階 -->
  <g fill="url(#scene-${key}-stone)">
    <path d="M316 450 L344 384 H456 L484 450 Z"/>
    <path d="M340 380 L360 340 H440 L460 380 Z"/>
    <path d="M356 336 L370 306 H430 L444 336 Z"/>
    <path d="M368 302 L378 280 H422 L432 302 Z"/>
  </g>
  <g stroke="#4f534a" stroke-width="2.4" opacity="0.6">
    <path d="M324 430 H476 M332 410 H468 M340 392 H460 M386 362 H414 M380 322 H420"/>
  </g>

  <!-- 三重鳥居 -->
  ${torii(400, 338, 1.18, '#c96b5f', '#a84a44')}
  ${torii(400, 296, 0.74, '#b9655a', '#98443f')}
  ${torii(400, 268, 0.46, '#a85a52', '#8a3f3a')}

  <!-- 注連繩與紙垂 -->
  <path d="M300 282 Q400 306 500 282" stroke="#d9c4a4" stroke-width="5" fill="none"/>
  <g fill="#fdf6ec">
    <path d="M356 290 l6 14 l-8 4 l7 14 l-9 3 l6 12 l-10 -2 l-2 -14 l9 -3 l-7 -14 l9 -4 z"/>
    <path d="M444 290 l6 14 l-8 4 l7 14 l-9 3 l6 12 l-10 -2 l-2 -14 l9 -3 l-7 -14 l9 -4 z"/>
  </g>

  <!-- 本殿屋頂 -->
  <g transform="translate(400 262)">
    <path d="M-96 0 Q0 -44 96 0 L86 14 Q0 -24 -86 14 Z" fill="#7a3f3d"/>
    <path d="M-96 0 Q-84 -12 -74 0 M96 0 Q84 -12 74 0" fill="none" stroke="#9c5a52" stroke-width="3.6"/>
    <rect x="-70" y="8" width="140" height="24" fill="#5d3c34"/>
    <g fill="#f7dd9a" opacity="0.6"><rect x="-44" y="14" width="22" height="12" rx="2"/><rect x="22" y="14" width="22" height="12" rx="2"/></g>
  </g>

  <!-- 貓神石像 -->
  <circle cx="656" cy="286" r="90" fill="url(#scene-${key}-eyeGlow)" opacity="0.16"/>
  ${catDeity(652, 296, 1.05, '#b9c0b0', '#8d9485', '#c96b5f', '#ffe9a0')}

  <!-- 石燈籠 -->
  ${stoneLantern(214, 380, 1.05)}
  ${stoneLantern(586, 380, 1.05)}

  <!-- 繪馬 -->
  ${emaPlaque(148, 214, -6, '#c9a87c', 1.2)}
  ${emaPlaque(192, 240, 5, '#d9b98c', 2.6)}
  ${emaPlaque(116, 256, -4, '#c9a87c', 4.1)}
  <path d="M100 190 Q150 200 210 224" stroke="#4a3a30" stroke-width="4" fill="none"/>

  <!-- 賽錢箱 -->
  <g transform="translate(400 400)">
    <rect x="-44" y="-18" width="88" height="26" rx="3" fill="#6b4a33"/>
    <rect x="-38" y="-12" width="76" height="12" rx="2" fill="#8a6a4a"/>
    <path d="M-32 -18 V-26 H32 V-18" fill="none" stroke="#4a3428" stroke-width="4"/>
    <g stroke="#4a3428" stroke-width="2" opacity="0.8"><path d="M-28 -6 H28 M-28 0 H28"/></g>
  </g>

  <!-- 螢火蟲 -->
  <g transform="translate(262 320)"><circle r="10" fill="#f7e38a" opacity="0.14"/><circle class="scene-firefly" r="2.6" fill="#f7e38a"${delay(0.6)}/></g>
  <g transform="translate(320 268)"><circle r="8" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2.2" fill="#f7e38a"${delay(2.3)}/></g>
  <g transform="translate(500 324)"><circle r="9" fill="#f7e38a" opacity="0.14"/><circle class="scene-firefly" r="2.4" fill="#f7e38a"${delay(4.1)}/></g>
  <g transform="translate(556 252)"><circle r="7" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2" fill="#f7e38a"${delay(5.8)}/></g>
  <g transform="translate(206 296)"><circle r="7" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="1.9" fill="#f7e38a"${delay(3.2)}/></g>
  <g transform="translate(722 348)"><circle r="8" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="2.1" fill="#f7e38a"${delay(7.2)}/></g>

  <!-- 腳印 -->
  ${pawPrint(392, 424, 0.85, '#4f534a', 0.55, 12)}
  ${pawPrint(408, 400, 0.8, '#4f534a', 0.5, 4)}
  ${pawPrint(422, 376, 0.72, '#4f534a', 0.45, 14)}`;
}

/* ────────────────────────── 第 18 章：夜航碼頭 harbor ────────────────────────── */

function harborScene(): string {
  const key = 'harbor';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#0a1628'],
      [0.5, '#173050'],
      [1, '#2f4f72'],
    ])}
    ${radialGradient(`scene-${key}-moonGlow`, [
      [0, '#fdf6e3', 0.65],
      [1, '#fdf6e3', 0],
    ])}
    ${linearGradient(`scene-${key}-water`, [
      [0, '#1f4a63'],
      [0.55, '#123047'],
      [1, '#071a2a'],
    ])}
    ${radialGradient(`scene-${key}-lampGlow`, [
      [0, '#ffd98a', 0.7],
      [1, '#ffd98a', 0],
    ])}
    ${linearGradient(`scene-${key}-dock`, [
      [0, '#8a6a4c'],
      [1, '#5d4634'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  ${starField(44, 1801, { maxY: 250, animated: 8 })}
  <circle cx="146" cy="88" r="116" fill="url(#scene-${key}-moonGlow)"/>
  <circle cx="146" cy="88" r="40" fill="#fdf6e3"/>
  <circle cx="132" cy="76" r="9" fill="#ece0c4" opacity="0.55"/>
  <circle cx="160" cy="100" r="6" fill="#ece0c4" opacity="0.45"/>
  ${cloudPuff(420, 62, 1.1, '#2c4566', 0.5, 'scene-cloud-puff', 3.4)}
  ${cloudPuff(690, 104, 0.85, '#2c4566', 0.4, 'scene-cloud-puff', 6.8)}

  <!-- 遠岸與小鎮燈光 -->
  <path d="M0 250 Q140 236 300 246 Q520 258 800 240 V270 H0 Z" fill="#0d2033"/>
  <path d="M0 258 Q180 248 340 254 Q560 264 800 250 V262 H0 Z" fill="#132a40" opacity="0.9"/>
  <g fill="#f7d98a">
    <circle cx="120" cy="246" r="1.8"/><circle cx="168" cy="243" r="1.4"/><circle cx="226" cy="245" r="2"/>
    <circle cx="286" cy="247" r="1.5"/><circle cx="352" cy="250" r="1.8"/><circle cx="470" cy="252" r="1.3"/>
    <circle cx="548" cy="250" r="2"/><circle cx="612" cy="247" r="1.5"/>
  </g>
  <!-- 遠處燈塔 -->
  <g transform="translate(752 240)">
    <path d="M-11 0 L-7 -74 H7 L11 0 Z" fill="#e8dfd0"/>
    <path d="M-10 -24 H10 M-9 -46 H9 M-8 -62 H8" stroke="#c96b5f" stroke-width="5"/>
    <rect x="-8" y="-90" width="16" height="16" rx="2" fill="#f7d98a"/>
    <path d="M-12 -90 L0 -102 L12 -90 Z" fill="#8a4a44"/>
    <circle cx="0" cy="-82" r="30" fill="#f7d98a" opacity="0.22"/>
    <path class="scene-beam" d="M-8 -82 L-150 -104 L-150 -62 Z" fill="#ffd98a" opacity="0.22"/>
    <rect x="-15" y="-2" width="30" height="6" rx="2" fill="#7d6b56"/>
    <circle cx="0" cy="-82" r="4.4" fill="#fff6d8"/>
  </g>

  <!-- 海面 -->
  <rect x="0" y="262" width="800" height="188" fill="url(#scene-${key}-water)"/>
  <path d="M0 262 H800" stroke="#8fa8c8" stroke-width="2" opacity="0.5"/>
  <!-- 月光倒影 -->
  <g fill="#fdf6e3" class="scene-shimmer">
    <ellipse cx="146" cy="292" rx="22" ry="3" opacity="0.55"/>
    <ellipse cx="146" cy="312" rx="16" ry="2.6" opacity="0.45"/>
    <ellipse cx="146" cy="334" rx="26" ry="3" opacity="0.4"/>
    <ellipse cx="146" cy="360" rx="14" ry="2.2" opacity="0.3"/>
  </g>
  <!-- 燈籠倒影 -->
  <g fill="#ffd98a" opacity="0.3">
    <ellipse cx="364" cy="352" rx="18" ry="3"/>
    <ellipse cx="364" cy="372" rx="12" ry="2.4"/>
    <ellipse cx="620" cy="384" rx="16" ry="3"/>
  </g>
  <g stroke="#7fa0bc" stroke-width="2" fill="none" opacity="0.45">
    <path class="scene-wave" d="M210 320 q26 -7 52 0 t52 0"${delay(1.2)}/>
    <path class="scene-wave" d="M470 344 q30 -8 60 0 t60 0"${delay(3.4)}/>
  </g>

  <!-- 船 -->
  ${boat(560, 322, 1.15, '#2f211a', '#e9dcc8', '#ffd98a', 1.2)}
  ${boat(676, 356, 0.78, '#33241c', '#e9dcc8', '#ffd98a', 3.5)}
  <!-- 大帆船 -->
  <g transform="translate(440 300)" opacity="0.9">
    <path d="M-56 0 H56 L42 18 H-42 Z" fill="#241a14"/>
    <path d="M-18 0 V-96 M18 0 V-84" stroke="#241a14" stroke-width="5"/>
    <path d="M-18 -86 Q-46 -70 -18 -50 Z" fill="#2f3d52" opacity="0.9"/>
    <path d="M18 -74 Q46 -58 18 -38 Z" fill="#2f3d52" opacity="0.9"/>
    <path d="M18 -96 L46 -88 L18 -80 Z" fill="#e88aa8"/>
    <circle cx="18" cy="-100" r="10" fill="#ffd98a" opacity="0.25"/>
    <circle cx="18" cy="-100" r="3.4" fill="#ffd98a"/>
  </g>

  <!-- 碼頭（前景） -->
  <g>
    <path d="M0 450 L0 412 L330 366 L420 388 L140 450 Z" fill="url(#scene-${key}-dock)"/>
    <path d="M0 412 L330 366 L420 388 L120 434 Z" fill="#a98460"/>
    <g stroke="#6b5138" stroke-width="2.4" opacity="0.8">
      <path d="M40 450 L96 408 M96 450 L146 408 M152 450 L196 404 M208 450 L246 402 M264 450 L296 400"/>
      <path d="M0 424 L360 378" opacity="0.6"/>
    </g>
    <path d="M300 380 V428 M352 372 V424 M404 382 V430" stroke="#4a3428" stroke-width="8"/>
    <path d="M0 450 V424 H26 V450 Z" fill="#4a3428"/>
    <!-- 木箱與木桶 -->
    <g transform="translate(330 416)">
      <rect x="-24" y="-30" width="48" height="30" rx="3" fill="#8a6a4c"/>
      <path d="M-24 -20 H24 M-24 -10 H24" stroke="#6b5138" stroke-width="3"/>
    </g>
    <g transform="translate(372 430)">
      <ellipse cx="0" cy="0" rx="16" ry="9" fill="#7d5a3f"/>
      <path d="M-16 0 V-22 H16 V0" fill="#8a6a4c"/>
      <ellipse cx="0" cy="-22" rx="16" ry="7" fill="#a98460"/>
    </g>
    <!-- 纜繩 -->
    <path d="M300 402 Q360 430 430 412" stroke="#c9b79a" stroke-width="3" fill="none" opacity="0.6"/>
  </g>

  <!-- 燈柱與燈籠 -->
  <path d="M398 450 V296" stroke="#4a3428" stroke-width="8"/>
  <path d="M362 300 H434" stroke="#4a3428" stroke-width="6" stroke-linecap="round"/>
  <circle cx="398" cy="330" r="58" fill="url(#scene-${key}-lampGlow)" opacity="0.4"/>
  ${paperLantern(398, 314, 0.66, '#f2b45c', '#ffd98a', 1.8)}

  <!-- 貓船長 -->
  ${sceneCatSilhouette({ x: 196, y: 320, scale: 0.66, fill: '#171018', scarf: '#6f9c76', tailUp: true })}
  ${pawPrint(268, 414, 0.75, '#4a3428', 0.55, 16)}
  ${pawPrint(292, 402, 0.68, '#4a3428', 0.5, 4)}
  ${pawPrint(316, 392, 0.6, '#4a3428', 0.45, 18)}`;
}

/* ────────────────────────── 第 19 章：螢火竹林 firefly ────────────────────────── */

function fireflyScene(): string {
  const key = 'firefly';
  const flies = [
    [180, 300, 2.8, 0.4], [250, 240, 2.2, 2.2], [320, 300, 3, 4.4],
    [400, 220, 2.4, 1.2], [470, 300, 2.8, 5.6], [560, 250, 2.2, 3.2],
    [640, 320, 3.2, 6.4], [700, 240, 2.4, 0.8], [150, 210, 2.2, 5.1],
    [360, 170, 2.6, 7.2], [520, 180, 2.2, 2.8], [290, 352, 2.4, 6.1],
    [600, 372, 2.6, 4.1], [680, 160, 2, 8.2], [420, 330, 2.2, 7.6],
  ]
    .map(([x, y, r, d]) => `<g transform="translate(${x} ${y})"><circle r="${(r as number) * 3.2}" fill="#f7e38a" opacity="0.12"/><circle class="scene-firefly" r="${r}" fill="#f7e38a"${delay(d as number)}/></g>`)
    .join('');
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#05110d'],
      [0.5, '#0c2418'],
      [1, '#163a26'],
    ])}
    ${radialGradient(`scene-${key}-moonGlow`, [
      [0, '#fdf6d8', 0.55],
      [1, '#fdf6d8', 0],
    ])}
    ${linearGradient(`scene-${key}-water`, [
      [0, '#2f6f6a'],
      [1, '#123a34'],
    ])}
    ${radialGradient(`scene-${key}-lanternGlow`, [
      [0, '#ffd98a', 0.7],
      [1, '#ffd98a', 0],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>
  ${starField(18, 1901, { maxY: 170, maxRadius: 1.4 })}
  <circle cx="520" cy="94" r="110" fill="url(#scene-${key}-moonGlow)"/>
  <circle cx="520" cy="94" r="32" fill="#fdf6d8" opacity="0.9"/>
  <circle cx="506" cy="84" r="7" fill="#ece4c2" opacity="0.5"/>

  <!-- 背景竹林 -->
  <g opacity="0.5">
    ${bambooStalk(60, 452, 12, '#1f4a32', { nodes: 8, lean: -1.5, highlight: '#2f6a48' })}
    ${bambooStalk(130, 452, 10, '#1f4a32', { nodes: 9, lean: 1, highlight: '#2f6a48' })}
    ${bambooStalk(240, 452, 10, '#1f4a32', { nodes: 8, lean: -1, highlight: '#2f6a48' })}
    ${bambooStalk(420, 452, 11, '#1f4a32', { nodes: 9, lean: 1.4, highlight: '#2f6a48' })}
    ${bambooStalk(590, 452, 10, '#1f4a32', { nodes: 8, lean: -1.2, highlight: '#2f6a48' })}
    ${bambooStalk(700, 452, 12, '#1f4a32', { nodes: 9, lean: 1.2, highlight: '#2f6a48' })}
  </g>
  <!-- 中景竹林 -->
  <g opacity="0.85">
    ${bambooStalk(24, 452, 20, '#2a5f3d', { nodes: 9, lean: 1.6 })}
    ${bambooStalk(180, 452, 16, '#2a5f3d', { nodes: 10, lean: -1.4 })}
    ${bambooStalk(340, 452, 14, '#2a5f3d', { nodes: 9, lean: 1.2 })}
    ${bambooStalk(640, 452, 18, '#2a5f3d', { nodes: 10, lean: -1.6 })}
    ${bambooStalk(770, 452, 22, '#2a5f3d', { nodes: 9, lean: 1.4 })}
  </g>
  ${bambooLeaves(120, 118, 0.8, '#2f6a48', -8, 0.9)}
  ${bambooLeaves(390, 140, 0.7, '#2f6a48', 12, 0.85)}
  ${bambooLeaves(660, 110, 0.9, '#2f6a48', -14, 0.9)}
  ${bambooLeaves(60, 260, 0.6, '#3a7a54', 24, 0.8)}
  ${bambooLeaves(730, 280, 0.65, '#3a7a54', -22, 0.8)}

  <!-- 霧氣 -->
  <ellipse cx="400" cy="320" rx="430" ry="46" fill="#d7f2c4" opacity="0.06"/>
  <ellipse cx="260" cy="240" rx="280" ry="30" fill="#d7f2c4" opacity="0.05"/>

  <!-- 小溪 -->
  <path d="M300 450 Q352 402 414 366 Q468 336 500 300 L546 300 Q516 352 464 390 Q398 436 338 450 Z" fill="url(#scene-${key}-water)" opacity="0.9"/>
  <path d="M320 446 Q372 404 428 370 Q478 340 512 306" stroke="#8fe3d2" stroke-width="2.6" fill="none" opacity="0.4"/>
  <g fill="#2a5f3d">
    <ellipse cx="384" cy="416" rx="18" ry="6"/>
    <ellipse cx="432" cy="386" rx="15" ry="5"/>
    <ellipse cx="474" cy="356" rx="12" ry="4"/>
  </g>

  <!-- 石燈籠 -->
  <circle cx="646" cy="380" r="66" fill="url(#scene-${key}-lanternGlow)" opacity="0.4"/>
  ${stoneLantern(646, 404, 0.95)}

  <!-- 苔石 -->
  <ellipse cx="176" cy="430" rx="38" ry="12" fill="#274a36"/>
  <ellipse cx="214" cy="440" rx="24" ry="9" fill="#2f5a40"/>
  <ellipse cx="540" cy="436" rx="30" ry="10" fill="#274a36"/>
  <ellipse cx="580" cy="446" rx="20" ry="7" fill="#2f5a40"/>

  <!-- 賞螢火蟲的小貓 -->
  ${sceneCatSilhouette({ x: 300, y: 330, scale: 0.72, fill: '#081a10', scarf: '#ef9fb6', tailUp: true })}
  <circle cx="288" cy="304" r="22" fill="#f7e38a" opacity="0.16"/>
  <circle class="scene-firefly" cx="288" cy="304" r="4.4" fill="#ffe89a"${delay(0.4)}/>

  <!-- 螢火蟲 -->
  ${flies}

  <!-- 前景竹 -->
  ${bambooStalk(4, 452, 28, '#173a26', { nodes: 10, lean: 1.5 })}
  ${bambooStalk(796, 452, 30, '#173a26', { nodes: 10, lean: -1.5 })}
  ${bambooLeaves(40, 60, 0.9, '#173a26', 8, 0.95)}
  ${bambooLeaves(760, 80, 0.85, '#173a26', -10, 0.95)}

  <!-- 腳印 -->
  ${pawPrint(352, 430, 0.8, '#081a10', 0.4, 16)}
  ${pawPrint(378, 412, 0.7, '#081a10', 0.35, 6)}`;
}

/* ────────────────────────── 第 20 章：蒼穹之巔 zenith ────────────────────────── */

function zenithScene(): string {
  const key = 'zenith';
  return `
  <defs>
    ${linearGradient(`scene-${key}-sky`, [
      [0, '#08081c'],
      [0.45, '#1a1440'],
      [0.75, '#3a2260'],
      [1, '#5a2f6e'],
    ])}
    ${linearGradient(`scene-${key}-band`, [
      [0, '#7d8fc4', 0],
      [0.5, '#c9d4ef', 0.4],
      [1, '#7d8fc4', 0],
    ])}
    ${radialGradient(`scene-${key}-nebulaPink`, [
      [0, '#f4a7bb', 0.4],
      [1, '#f4a7bb', 0],
    ])}
    ${radialGradient(`scene-${key}-nebulaCyan`, [
      [0, '#8fd6ff', 0.34],
      [1, '#8fd6ff', 0],
    ])}
    ${radialGradient(`scene-${key}-pearl`, [
      [0, '#fff6d8', 0.95],
      [0.55, '#ffe9a0', 0.55],
      [1, '#ffe9a0', 0],
    ])}
    ${linearGradient(`scene-${key}-beam`, [
      [0, '#ffe9a0', 0.35],
      [1, '#ffe9a0', 0],
    ])}
    ${linearGradient(`scene-${key}-platform`, [
      [0, '#4a3d6a'],
      [1, '#241c3f'],
    ])}
  </defs>
  <rect width="800" height="450" fill="url(#scene-${key}-sky)"/>

  <!-- 銀河與星海 -->
  <g transform="rotate(-14 400 220)">
    <ellipse cx="400" cy="220" rx="540" ry="88" fill="url(#scene-${key}-band)"/>
    <ellipse cx="400" cy="220" rx="300" ry="34" fill="#e8eefc" opacity="0.12"/>
  </g>
  <circle cx="200" cy="120" r="150" fill="url(#scene-${key}-nebulaPink)"/>
  <circle cx="640" cy="180" r="170" fill="url(#scene-${key}-nebulaCyan)"/>
  ${starField(60, 2001, { maxY: 300, animated: 8 })}
  ${starField(26, 2002, { maxY: 170, maxRadius: 1.4, color: '#c9d4ef' })}

  <!-- 星光海 -->
  <path d="M0 450 V392 Q200 372 400 390 Q600 408 800 382 V450 Z" fill="#0d1030"/>
  <g fill="#fdf6ec">
    <circle cx="60" cy="430" r="1.6" opacity="0.8"/><circle cx="140" cy="416" r="1.2" opacity="0.6"/>
    <circle cx="220" cy="438" r="1.8" opacity="0.8"/><circle cx="300" cy="420" r="1.3" opacity="0.6"/>
    <circle cx="360" cy="440" r="1.5" opacity="0.7"/><circle cx="440" cy="424" r="1.2" opacity="0.6"/>
    <circle cx="520" cy="440" r="1.8" opacity="0.8"/><circle cx="600" cy="420" r="1.4" opacity="0.6"/>
    <circle cx="680" cy="436" r="1.6" opacity="0.7"/><circle cx="750" cy="418" r="1.2" opacity="0.55"/>
    <circle cx="110" cy="444" r="1" opacity="0.5"/><circle cx="490" cy="448" r="1" opacity="0.5"/>
    <circle cx="630" cy="446" r="1.1" opacity="0.55"/><circle cx="260" cy="450" r="1" opacity="0.45"/>
  </g>

  <!-- 流星 -->
  ${shootingStar(240, 70, 330, 46, 1.6, 2.2)}
  ${shootingStar(600, 104, 670, 84, 4.8, 1.8)}

  <!-- 巨大成語靈珠 -->
  <circle cx="400" cy="158" r="140" fill="url(#scene-${key}-pearl)" opacity="0.45"/>
  <circle cx="400" cy="158" r="34" fill="url(#scene-${key}-pearl)"/>
  <circle cx="400" cy="158" r="15" fill="#fffdf8"/>
  <circle cx="394" cy="152" r="5" fill="#ffffff" opacity="0.9"/>
  <ellipse class="scene-constellation" cx="400" cy="158" rx="72" ry="24" fill="none" stroke="#e8b64c" stroke-width="1.8" opacity="0.55" transform="rotate(-18 400 158)"/>
  <path class="scene-beam" d="M400 196 L340 366 H460 Z" fill="url(#scene-${key}-beam)" opacity="0.5"/>
  <g fill="#fff6d8">
    <circle class="scene-sparkle" cx="322" cy="128" r="2.6"${delay(0.8)}/>
    <circle class="scene-sparkle" cx="510" cy="200" r="2.8"${delay(3.9)}/>
    <circle class="scene-sparkle" cx="400" cy="86" r="2.4"${delay(6.6)}/>
  </g>

  <!-- 浮空石階 -->
  ${floatingRock(250, 372, 0.8, '#4a3d6a', '#6a5a8a', 1.2)}
  ${floatingRock(556, 360, 0.62, '#3f335e', '#5d4d7d', 3.4)}
  ${floatingRock(650, 276, 0.46, '#3f335e', '#5d4d7d', 6.8)}

  <!-- 山頂平台 -->
  <ellipse cx="400" cy="374" rx="152" ry="30" fill="#241c3f"/>
  <path d="M246 374 Q400 342 554 374 Q500 406 400 412 Q300 406 246 374 Z" fill="url(#scene-${key}-platform)"/>
  <path d="M276 372 Q400 348 524 372" stroke="#6a5a8a" stroke-width="3" fill="none" opacity="0.6"/>
  <g fill="#3a2f58">
    <path d="M330 412 L346 386 H454 L470 412 Z"/>
    <path d="M356 384 L368 360 H432 L444 384 Z"/>
    <path d="M378 358 L386 340 H414 L422 358 Z"/>
  </g>

  <!-- 登頂貓貓 -->
  ${sceneCatSilhouette({ x: 352, y: 296, scale: 0.72, fill: '#0b0a18', scarf: '#6f9c76', tailUp: true })}
  ${sceneCatSilhouette({ x: 430, y: 308, scale: 0.6, fill: '#0b0a18', scarf: '#e07e9c' })}

  <!-- 星座環 -->
  <ellipse cx="400" cy="158" rx="112" ry="38" fill="none" stroke="#c9d4ef" stroke-width="1.4" stroke-dasharray="4 7" opacity="0.4"/>

  <!-- 前景光點與腳印 -->
  ${pawPrint(400, 396, 0.7, '#6a5a8a', 0.5, 4)}
  ${pawPrint(420, 380, 0.6, '#6a5a8a', 0.45, 14)}`;
}


/* ────────────────────────── 對外 API ────────────────────────── */

const SCENES: Record<SceneKey, () => string> = {
  garden: gardenScene,
  bamboo: bambooScene,
  moon: moonScene,
  snow: snowScene,
  sea: seaScene,
  stars: starsScene,
  festival: festivalScene,
  rain: rainScene,
  cloud: cloudScene,
  summit: summitScene,
  library: libraryScene,
  volcano: volcanoScene,
  desert: desertScene,
  aurora: auroraScene,
  underwater: underwaterScene,
  skycastle: skycastleScene,
  shrine: shrineScene,
  harbor: harborScene,
  firefly: fireflyScene,
  zenith: zenithScene,
};

/**
 * 產生章節場景裝飾 SVG（inline 字串，800×450，slice 填滿容器）。
 * @param scene 場景 key；唔認得就 fallback 去 garden。
 */
export function chapterSceneSVG(scene: string): string {
  const key: SceneKey = (SCENE_KEYS as readonly string[]).includes(scene)
    ? (scene as SceneKey)
    : 'garden';
  const maker = SCENES[key];
  return `<svg class="chapter-scene scene-${key}" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${maker()}</svg>`;
}

/* ────────────────────────── 場景動畫效能 autopilot ────────────────────────── */

/**
 * 載入場景模組時自動啟動「offscreen 場景暫停」：
 * - 地圖／首頁／章節 intro 嘅 `.chapter-scene` 離開畫面時加 `.is-static`，
 *   CSS 會停用入面所有動畫；入返畫面會自動恢復。
 * - 用 IntersectionObserver ＋ MutationObserver，SPA 換畫面新加入嘅場景都覆蓋。
 * - 環境唔支援 IntersectionObserver 或 SSR 時自動 no-op。
 *
 * UI 亦可以自己呼叫 `autoPauseOffscreenScenes(root?)` 控制生命週期；
 * 呢個 autopilot 係額外保險，唔需要 UI 改動。
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const startSceneAutoPause = (): void => {
    autoPauseOffscreenScenes();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSceneAutoPause, { once: true });
  } else {
    startSceneAutoPause();
  }
}
