/**
 * 貓貓角色 SVG（cat-animator 擁有；目前為 Lead 的臨時 placeholder，會被完整美術版本取代）。
 * 合約：catSVG(character, mood, opts) 回傳可 inline 插入的 SVG 字串。
 */

export type CatCharacter = 'amo' | 'dango';
export type CatMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wink' | 'sleep';

export interface CatSVGOptions {
  size?: number;
  className?: string;
}

interface Palette {
  fur: string;
  furDark: string;
  belly: string;
  scarf: string;
  ear: string;
}

const PALETTES: Record<CatCharacter, Palette> = {
  amo: { fur: '#3d4a3f', furDark: '#2b342d', belly: '#fdf6ec', scarf: '#5f8f68', ear: '#f4a7bb' },
  dango: { fur: '#e8a25c', furDark: '#c97f3b', belly: '#fff1dc', scarf: '#e88aa8', ear: '#f7b7cb' },
};

function eyes(mood: CatMood, ink = '#2f3a2f'): string {
  switch (mood) {
    case 'happy':
    case 'celebrate':
    case 'wink':
      return `
        <path d="M74 104q8-9 16 0" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M110 104q8-9 16 0" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
    case 'sleep':
      return `
        <path d="M74 106h16" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M110 106h16" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`;
    case 'sad':
      return `
        <path d="M74 102q8 7 16 0" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M110 102q8 7 16 0" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <circle cx="84" cy="115" r="3.2" fill="#9fc7e8"/>`;
    case 'think':
      return `
        <circle cx="82" cy="106" r="5.5" fill="${ink}"/>
        <circle cx="118" cy="106" r="5.5" fill="${ink}"/>
        <circle cx="84" cy="104" r="1.8" fill="#fff"/>`;
    default:
      return `
        <circle cx="82" cy="106" r="6.5" fill="${ink}"/>
        <circle cx="118" cy="106" r="6.5" fill="${ink}"/>
        <circle cx="84.5" cy="103.5" r="2.2" fill="#fff"/>
        <circle cx="120.5" cy="103.5" r="2.2" fill="#fff"/>`;
  }
}

function mouth(mood: CatMood): string {
  if (mood === 'happy' || mood === 'celebrate') {
    return `<path d="M92 124q8 8 16 0" stroke="#b4655f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }
  if (mood === 'sad') {
    return `<path d="M94 128q6-5 12 0" stroke="#b4655f" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  return `<path d="M96 124q4 4 8 0" stroke="#b4655f" stroke-width="3" fill="none" stroke-linecap="round"/>`;
}

export function catSVG(
  character: CatCharacter,
  mood: CatMood = 'idle',
  opts: CatSVGOptions = {},
): string {
  const palette = PALETTES[character] ?? PALETTES.dango;
  const size = opts.size ?? 160;
  const className = opts.className ?? '';
  const stripes =
    character === 'dango'
      ? `<path d="M70 78q10-8 20-2M104 76q10-6 20 2" stroke="${palette.furDark}" stroke-width="4" stroke-linecap="round" fill="none"/>`
      : '';

  return `
<svg class="cat-svg cat-${character} ${className}" viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="${character === 'amo' ? '黑貓店長阿墨' : '橘貓糰子'}">
  <g class="cat-breathe">
    <path d="M130 150q34-4 34-30" stroke="${palette.fur}" stroke-width="13" fill="none" stroke-linecap="round"/>
    <ellipse cx="100" cy="160" rx="48" ry="30" fill="${palette.fur}"/>
    <ellipse cx="100" cy="164" rx="30" ry="20" fill="${palette.belly}"/>
    <path d="M58 66l6-30 24 18z" fill="${palette.fur}"/>
    <path d="M142 66l-6-30-24 18z" fill="${palette.fur}"/>
    <path d="M64 56l3-15 13 10z" fill="${palette.ear}"/>
    <path d="M136 56l-3-15-13 10z" fill="${palette.ear}"/>
    <ellipse cx="100" cy="100" rx="52" ry="46" fill="${palette.fur}"/>
    <ellipse cx="100" cy="116" rx="26" ry="20" fill="${palette.belly}"/>
    ${stripes}
    ${eyes(mood)}
    <path d="M100 114l-4-4h8z" fill="#e58a94"/>
    ${mouth(mood)}
    <g stroke="#fdf6ec" stroke-width="2" stroke-linecap="round" opacity="0.85">
      <path d="M52 110h20M54 118h18M128 110h20M128 118h18"/>
    </g>
    <path d="M74 148q26 14 52 0" stroke="${palette.scarf}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M92 154q4 12 14 12" stroke="${palette.scarf}" stroke-width="9" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
