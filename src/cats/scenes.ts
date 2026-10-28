/**
 * 章節場景 SVG 美術（cat-animator 擁有）
 * ---------------------------------------------------------------
 * 10 個貓貓世界場景，全部 800×450、`preserveAspectRatio="xMidYMid slice"`、
 * `aria-hidden="true"` 的純裝飾 SVG：
 *   garden 櫻花庭園 / bamboo 竹林 / moon 月下書齋 / snow 雪山溫泉 / sea 海邊燈塔
 *   stars 星空詩會 / festival 燈會市集 / rain 雨後石巷 / cloud 雲端書樓 / summit 成語之巔
 *
 * 規格：
 *  - 每張圖有背景／中景／前景層次＋貓貓世界小細節（燈籠、腳印、書卷、雪人貓…）。
 *  - defs 內所有 id 都加 `scene-<key>-` 前綴，同一頁放 10 張都唔會撞 id。
 *  - 輸出完全 deterministic（用 seeded RNG，唔用 Math.random），re-render 唔會閃。
 *  - 環境動畫由 src/styles/cats.css 用 `.scene-petal` / `.scene-firefly` /
 *    `.scene-snow` / `.scene-rain` / `.scene-star--twinkle` … 等 class 控制。
 */

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
  | 'summit';

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
];

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
