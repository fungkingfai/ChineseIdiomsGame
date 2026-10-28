/**
 * 章節場景 SVG（cat-animator 擁有；目前為 Lead 的臨時 placeholder，會被完整美術版本取代）。
 * 合約：chapterSceneSVG(sceneKey) 回傳裝飾用 SVG 字串（viewBox 0 0 800 450）。
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

const SCENE_BASE: Record<string, { sky: [string, string]; ground: string }> = {
  garden: { sky: ['#fde7ef', '#fff6e8'], ground: '#b9d3a8' },
  bamboo: { sky: ['#e8f1e4', '#f6f9ee'], ground: '#9dbb8e' },
  moon: { sky: ['#2c3b5e', '#5d6f9c'], ground: '#3b4a6b' },
  snow: { sky: ['#dbe9f5', '#f7fbff'], ground: '#f3f8fc' },
  sea: { sky: ['#cfe8ee', '#f3fbff'], ground: '#7fb3c7' },
  stars: { sky: ['#1f2b4d', '#4a5a91'], ground: '#2e3a5c' },
  festival: { sky: ['#4a2c3a', '#8e4e57'], ground: '#5c3a42' },
  rain: { sky: ['#c8d6d2', '#eef4f1'], ground: '#93a8a1' },
  cloud: { sky: ['#dcd6ee', '#f7f4ff'], ground: '#b8add6' },
  summit: { sky: ['#a9c6e8', '#fdf3d8'], ground: '#d9c9a3' },
};

export function chapterSceneSVG(scene: string): string {
  const key = SCENE_BASE[scene] ? scene : 'garden';
  const base = SCENE_BASE[key];
  return `
<svg class="chapter-scene scene-${key}" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="scene-sky-${key}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${base.sky[0]}"/>
      <stop offset="1" stop-color="${base.sky[1]}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#scene-sky-${key})"/>
  <path d="M0 340q150-70 320-26t480 4v132H0z" fill="${base.ground}" opacity="0.9"/>
  <circle cx="650" cy="110" r="52" fill="#fff" opacity="0.55"/>
</svg>`;
}
