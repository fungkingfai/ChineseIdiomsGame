/**
 * 《貓咪成語大冒險》角色 SVG 美術（cat-animator 擁有）
 * ---------------------------------------------------------------
 * 兩隻主角：
 *  - 阿墨 amo：黑貓店長。綠圍巾＋金絲圓眼鏡，冷靜溫柔、博學識好多成語。
 *  - 糰子 dango：橘虎斑小貓。粉圍巾＋呆毛，好動好奇、大眼汪汪。
 *
 * 對外合約（唔好改簽名）：
 *   catSVG(character, mood?, opts?) → inline SVG 字串（無外部圖片、無 id 衝突）
 *   CatMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wink' | 'sleep'
 *
 * 表情會直接畫入 SVG；另外根 svg 有 `mood-<mood>` class，內層有
 * `cat-breathe` / `cat-tail` / `cat-ear` / `cat-blink` / `cat-ahoge` 等 hook，
 * 全部動畫交由 src/styles/cats.css 用 transform / opacity 完成。
 */

export type CatCharacter = 'amo' | 'dango';
export type CatMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wink' | 'sleep';

export interface CatSVGOptions {
  /** 顯示尺寸（正方形 px）。只影響 width / height，viewBox 固定 240×240。預設 160。 */
  size?: number;
  /** 追加在根 <svg> 的額外 class（例如 UI 排版用）。 */
  className?: string;
  /** 純裝飾用途：設 true 會加 aria-hidden，唔會加 role="img"。 */
  decorative?: boolean;
  /** 自訂 aria-label；預設會自動用「角色＋情緒」組合。 */
  ariaLabel?: string;
}

export const CAT_CHARACTERS: readonly CatCharacter[] = ['amo', 'dango'];
export const CAT_MOODS: readonly CatMood[] = [
  'idle',
  'happy',
  'sad',
  'think',
  'celebrate',
  'wink',
  'sleep',
];

interface CatPalette {
  /** 主毛色 */
  fur: string;
  /** 深毛色（虎斑紋／陰影線） */
  furDark: string;
  /** 淺毛色（頭頂高光） */
  furLight: string;
  /** 肚／胸口奶油色 */
  belly: string;
  /** 嘴邊奶油色 */
  muzzle: string;
  /** 腳掌色（糰子＝白襪） */
  paw: string;
  /** 肉球粉 */
  pad: string;
  scarf: string;
  scarfDark: string;
  scarfLight: string;
  /** 耳內粉 */
  ear: string;
  /** 眼珠主色 */
  eye: string;
  eyeDark: string;
  whisker: string;
  ink: string;
  blush: string;
  shadow: string;
}

const PALETTES: Record<CatCharacter, CatPalette> = {
  amo: {
    fur: '#454f48',
    furDark: '#333b36',
    furLight: '#5e6a60',
    belly: '#f6ecdd',
    muzzle: '#f9f1e4',
    paw: '#4d5850',
    pad: '#eda9b7',
    scarf: '#6f9c76',
    scarfDark: '#4f7a58',
    scarfLight: '#8fb995',
    ear: '#e5a6b4',
    eye: '#e8b64c',
    eyeDark: '#c9932f',
    whisker: '#f3ead9',
    ink: '#26302a',
    blush: '#f4a7bb',
    shadow: '#2f3a2f',
  },
  dango: {
    fur: '#eda964',
    furDark: '#cd8340',
    furLight: '#f6c58c',
    belly: '#fff3e2',
    muzzle: '#fff6ea',
    paw: '#fff3e2',
    pad: '#f2a9b6',
    scarf: '#ef9fb6',
    scarfDark: '#e07e9c',
    scarfLight: '#ffc2d2',
    ear: '#f7b7cb',
    eye: '#74a87c',
    eyeDark: '#4f7a58',
    whisker: '#fff8ec',
    ink: '#5b4634',
    blush: '#f4a7bb',
    shadow: '#8a5a33',
  },
};

const CHARACTER_LABEL: Record<CatCharacter, string> = {
  amo: '黑貓店長阿墨',
  dango: '橘虎斑小貓糰子',
};

const MOOD_LABEL: Record<CatMood, string> = {
  idle: '神情平靜',
  happy: '開心笑瞇瞇',
  sad: '傷心垂耳',
  think: '托腮沉思',
  celebrate: '舉爪慶祝',
  wink: '俏皮眨眼',
  sleep: '安穩熟睡',
};

/** 眼／嘴共用座標（240×240 viewBox） */
const LEFT_EYE_X = 96;
const RIGHT_EYE_X = 144;
const EYE_Y = 106;
const NOSE_Y = 128;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** 四角星（閃亮裝飾） */
function sparklePath(x: number, y: number, s: number): string {
  const k = s * 0.3;
  return `M${x} ${y - s} L${x + k} ${y - k} L${x + s} ${y} L${x + k} ${y + k} L${x} ${y + s} L${x - k} ${y + k} L${x - s} ${y} L${x - k} ${y - k} Z`;
}

/** 小愛心 */
function heartPath(x: number, y: number, s: number): string {
  return `M${x} ${y + s * 0.62} C${x - s * 1.06} ${y - s * 0.08} ${x - s * 0.94} ${y - s * 1.16} ${x} ${y - s * 0.5} C${x + s * 0.94} ${y - s * 1.16} ${x + s * 1.06} ${y - s * 0.08} ${x} ${y + s * 0.62} Z`;
}

/* ────────────────────────── 眼睛 ────────────────────────── */

function eyeOpen(cx: number, cy: number, p: CatPalette, giant: boolean, lookUp = false): string {
  const rx = giant ? 14 : 12.5;
  const ry = giant ? 16 : 14;
  const irisR = giant ? 10.6 : 8.8;
  const pupilRx = giant ? 5.6 : 4.7;
  const pupilRy = giant ? 8.4 : 7;
  const up = lookUp ? -2.6 : 0;
  return `
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fffdf8" stroke="${p.furDark}" stroke-width="1.4"/>
        <circle cx="${cx}" cy="${cy + up}" r="${irisR}" fill="${p.eye}" stroke="${p.eyeDark}" stroke-width="0.9"/>
        <ellipse cx="${cx}" cy="${cy + up + 0.8}" rx="${pupilRx}" ry="${pupilRy}" fill="${p.ink}"/>
        <circle cx="${cx - 3.6}" cy="${cy - (lookUp ? 0.4 : 4.6)}" r="${giant ? 4 : 3.2}" fill="#fffdf8"/>
        <circle cx="${cx + 3.9}" cy="${cy + (lookUp ? 3.4 : 5)}" r="1.7" fill="#fffdf8" opacity="0.85"/>`;
}

/** 阿墨招牌：溫柔半垂眼（金絲眼鏡另畫） */
function eyeCalm(cx: number, cy: number, p: CatPalette): string {
  return `
        <g class="cat-eye">
          ${eyeOpen(cx, cy, p, false)}
          <path d="M${cx - 15} ${cy - 1} Q${cx} ${cy - 12} ${cx + 15} ${cy - 1} L${cx + 15} ${cy - 28} L${cx - 15} ${cy - 28} Z" fill="${p.fur}"/>
          <path d="M${cx - 14} ${cy - 1} Q${cx} ${cy - 11} ${cx + 14} ${cy - 1}" stroke="${p.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
          <path d="M${cx + 12} ${cy - 4} l6 -4" stroke="${p.ink}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>
        </g>`;
}

/** 開心／慶祝：^ ^ 笑眼 */
function eyeHappy(cx: number, cy: number, p: CatPalette): string {
  return `
        <path d="M${cx - 11.5} ${cy + 1.5} Q${cx} ${cy - 13} ${cx + 11.5} ${cy + 1.5}" stroke="${p.ink}" stroke-width="5.2" fill="none" stroke-linecap="round"/>`;
}

/** 熟睡：下垂閉眼弧 */
function eyeSleep(cx: number, cy: number, p: CatPalette): string {
  return `
        <path d="M${cx - 11} ${cy - 1.5} Q${cx} ${cy + 8.5} ${cx + 11} ${cy - 1.5}" stroke="${p.ink}" stroke-width="4.6" fill="none" stroke-linecap="round"/>
        <path d="M${cx - 12.5} ${cy - 1.5} l-4 -3" stroke="${p.ink}" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>`;
}

/** 眨眼：單邊閉眼（閉眼一邊用開心弧） */
function eyeWinkClosed(cx: number, cy: number, p: CatPalette): string {
  return `
        <path d="M${cx - 11} ${cy + 1} Q${cx} ${cy - 12} ${cx + 11} ${cy + 1}" stroke="${p.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M${cx + 12} ${cy - 2} l5 -4" stroke="${p.ink}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M${cx + 12.5} ${cy + 2} l5 -0.5" stroke="${p.ink}" stroke-width="2.4" stroke-linecap="round"/>`;
}

/* ────────────────────────── 嘴巴 ────────────────────────── */

function renderMouth(mood: CatMood, p: CatPalette): string {
  switch (mood) {
    case 'happy':
    case 'celebrate':
      return `
        <path d="M107 137 Q120 141 133 137 Q129 155 120 155 Q111 155 107 137 Z" fill="#965050"/>
        <ellipse cx="120" cy="151" rx="6.6" ry="4" fill="#f4a7bb"/>
        <path d="M113.5 139 Q120 142 126.5 139" stroke="#d98a8a" stroke-width="1.4" fill="none" opacity="0.8"/>`;
    case 'sad':
      return `<path d="M111 145 Q115 139 120 143 Q125 147 129 140" stroke="${p.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'think':
      return `<path d="M113 141 Q120 143.5 127 140" stroke="${p.ink}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    case 'wink':
      return `<path d="M110 140 Q120 146 132 136" stroke="${p.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'sleep':
      return `<path d="M115 140 Q120 144 125 140" stroke="${p.ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    default:
      return `<path d="M120 138 Q116 144 111 140.5 M120 138 Q124 144 129 140.5" stroke="${p.ink}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  }
}

/* ────────────────────────── 身體部件 ────────────────────────── */

function renderTail(character: CatCharacter, p: CatPalette): string {
  const stripes =
    character === 'dango'
      ? `<path d="M184 198 q10 2 15 9 M196 180 q7 1 10 6" stroke="${p.furDark}" stroke-width="4.4" fill="none" stroke-linecap="round" opacity="0.55"/>`
      : '';
  return `
      <g class="cat-tail">
        <path d="M158 207 C198 214 217 188 207 162 C202 147 186 143 179 154 C174 163 181 172 190 168" fill="none" stroke="${p.fur}" stroke-width="17" stroke-linecap="round"/>
        ${stripes}
      </g>`;
}

function renderPawsIdle(character: CatCharacter, p: CatPalette): string {
  const toe = `stroke="${p.furDark}" stroke-width="1.8" stroke-linecap="round" opacity="0.5"`;
  return `
      <g class="cat-paw cat-paw--l">
        <ellipse cx="97" cy="226" rx="16" ry="10.5" fill="${p.paw}" stroke="${p.furDark}" stroke-width="1.1" opacity="0.98"/>
        <path d="M91.5 231 v-5.5 M97 231.5 v-6 M102.5 231 v-5.5" ${toe}/>
      </g>
      <g class="cat-paw cat-paw--r">
        <ellipse cx="143" cy="226" rx="16" ry="10.5" fill="${p.paw}" stroke="${p.furDark}" stroke-width="1.1" opacity="0.98"/>
        <path d="M137.5 231 v-5.5 M143 231.5 v-6 M148.5 231 v-5.5" ${toe}/>
      </g>`;
}

function renderPawsRaised(p: CatPalette): string {
  const pads = (x: number, y: number, flip: number): string => `
        <ellipse cx="${x}" cy="${y + 3}" rx="5" ry="4" fill="${p.pad}"/>
        <circle cx="${x - 6 * flip}" cy="${y - 7}" r="2.6" fill="${p.pad}"/>
        <circle cx="${x}" cy="${y - 9}" r="2.6" fill="${p.pad}"/>
        <circle cx="${x + 6 * flip}" cy="${y - 7}" r="2.6" fill="${p.pad}"/>`;
  return `
      <g class="cat-paw cat-paw--l cat-paw--raised">
        <path d="M84 192 C64 188 49 172 46 152" stroke="${p.fur}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <ellipse cx="43" cy="142" rx="14" ry="12.5" fill="${p.paw}" stroke="${p.furDark}" stroke-width="1.2" transform="rotate(-20 43 142)"/>
        ${pads(43, 142, 1)}
      </g>
      <g class="cat-paw cat-paw--r cat-paw--raised">
        <path d="M156 192 C176 188 191 172 194 152" stroke="${p.fur}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <ellipse cx="197" cy="142" rx="14" ry="12.5" fill="${p.paw}" stroke="${p.furDark}" stroke-width="1.2" transform="rotate(20 197 142)"/>
        ${pads(197, 142, -1)}
      </g>`;
}

function renderThinkPaw(p: CatPalette): string {
  return `
      <g class="cat-paw cat-paw--chin">
        <path d="M157 198 C166 186 165 173 157 166" stroke="${p.fur}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="152" cy="159" rx="12.5" ry="11.5" fill="${p.paw}" stroke="${p.furDark}" stroke-width="1.2" transform="rotate(-12 152 159)"/>
        <ellipse cx="152" cy="161" rx="4.8" ry="3.8" fill="${p.pad}"/>
        <circle cx="146.5" cy="154.5" r="2.3" fill="${p.pad}"/>
        <circle cx="152" cy="153" r="2.3" fill="${p.pad}"/>
        <circle cx="157.5" cy="154.5" r="2.3" fill="${p.pad}"/>
      </g>`;
}

/* ────────────────────────── 頭部與五官 ────────────────────────── */

function renderGlasses(p: CatPalette): string {
  return `
      <g class="cat-glasses" fill="none" stroke="#e8b64c" stroke-width="2.6" opacity="0.95">
        <circle cx="${LEFT_EYE_X}" cy="${EYE_Y}" r="20.5"/>
        <circle cx="${RIGHT_EYE_X}" cy="${EYE_Y}" r="20.5"/>
        <path d="M116.5 101.5 Q120 98 123.5 101.5"/>
        <path d="M85 96.5 l6.5 6.5 M133 96.5 l6.5 6.5" stroke="#fffdf8" stroke-width="2" opacity="0.5"/>
      </g>`;
}

function renderEars(p: CatPalette): string {
  return `
        <g class="cat-ear cat-ear--l">
          <path d="M68 66 C62 46 56 26 58 19 C60 13 68 15 74 20 C88 31 100 40 106 46 C92 56 79 62 68 66 Z" fill="${p.fur}"/>
          <path d="M72 57 C68 42 64 28 65 23 C67 20 72 22 76 25 C86 35 95 42 99 46 C89 52 79 56 72 57 Z" fill="${p.ear}" opacity="0.95"/>
        </g>
        <g class="cat-ear cat-ear--r">
          <path d="M172 66 C178 46 184 26 182 19 C180 13 172 15 166 20 C152 31 140 40 134 46 C148 56 161 62 172 66 Z" fill="${p.fur}"/>
          <path d="M168 57 C172 42 176 28 175 23 C173 20 168 22 164 25 C154 35 145 42 141 46 C151 52 161 56 168 57 Z" fill="${p.ear}" opacity="0.95"/>
        </g>`;
}

function renderHead(character: CatCharacter, mood: CatMood, p: CatPalette): string {
  const isAmo = character === 'amo';
  const isDango = character === 'dango';
  const giantEyes = isDango || mood === 'sad';
  const eyesOpen = mood === 'idle' || mood === 'think';

  const stripes = isDango
    ? `
        <g class="cat-stripes" stroke="${p.furDark}" stroke-width="5.2" stroke-linecap="round" fill="none" opacity="0.85">
          <path d="M107 56 Q104 68 108 77"/>
          <path d="M120 52 V76"/>
          <path d="M133 56 Q136 68 132 77"/>
          <path d="M62 88 Q53 92 50 100"/>
          <path d="M178 88 Q187 92 190 100"/>
        </g>`
    : `
        <ellipse cx="94" cy="70" rx="28" ry="15" fill="${p.furLight}" opacity="0.4" transform="rotate(-16 94 70)"/>`;

  const ahoge = isDango
    ? `
        <path class="cat-ahoge" d="M126 48 C132 31 147 28 147 39 C147 47 138 49 134 43" fill="none" stroke="${p.fur}" stroke-width="5" stroke-linecap="round"/>`
    : '';

  let eyes = '';
  if (mood === 'happy' || mood === 'celebrate') {
    eyes = `${eyeHappy(LEFT_EYE_X, EYE_Y, p)}${eyeHappy(RIGHT_EYE_X, EYE_Y, p)}`;
  } else if (mood === 'sleep') {
    eyes = `${eyeSleep(LEFT_EYE_X, EYE_Y, p)}${eyeSleep(RIGHT_EYE_X, EYE_Y, p)}`;
  } else if (mood === 'wink') {
    eyes = `${eyeOpen(LEFT_EYE_X, EYE_Y, p, giantEyes)}${eyeWinkClosed(RIGHT_EYE_X, EYE_Y, p)}`;
  } else if (mood === 'think') {
    eyes = `${eyeOpen(LEFT_EYE_X, EYE_Y, p, giantEyes, true)}${eyeOpen(RIGHT_EYE_X, EYE_Y, p, giantEyes, true)}`;
  } else if (mood === 'sad') {
    eyes = `${eyeOpen(LEFT_EYE_X, EYE_Y, p, true)}${eyeOpen(RIGHT_EYE_X, EYE_Y, p, true)}`;
  } else if (isAmo) {
    eyes = `${eyeCalm(LEFT_EYE_X, EYE_Y, p)}${eyeCalm(RIGHT_EYE_X, EYE_Y, p)}`;
  } else {
    eyes = `${eyeOpen(LEFT_EYE_X, EYE_Y, p, true)}${eyeOpen(RIGHT_EYE_X, EYE_Y, p, true)}`;
  }

  const brows =
    mood === 'sad'
      ? `
        <g stroke="${p.ink}" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.8">
          <path d="M81 86 Q92 80 104 83"/>
          <path d="M159 86 Q148 80 136 83"/>
        </g>`
      : mood === 'think'
        ? `
        <g stroke="${p.ink}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7">
          <path d="M82 84 Q93 79 104 83"/>
          <path d="M158 80 Q147 72 136 77"/>
        </g>`
        : '';

  const glasses = isAmo ? renderGlasses(p) : '';

  const blushVisible =
    mood === 'happy' || mood === 'celebrate' || mood === 'wink' || (isDango && mood === 'idle');
  const blush = blushVisible
    ? `
        <g class="cat-blush" fill="${p.blush}" opacity="${isDango && mood === 'idle' ? '0.32' : '0.5'}">
          <ellipse cx="75" cy="127" rx="10.5" ry="5.5"/>
          <ellipse cx="165" cy="127" rx="10.5" ry="5.5"/>
        </g>`
    : '';

  const fang =
    mood === 'happy' || mood === 'celebrate'
      ? `<path d="M125 143 l4 5 l3.5 -6 Z" fill="#fffdf8" opacity="0.95"/>`
      : '';

  const eyeWrap = `
        <g class="cat-blink">
          ${eyes}
        </g>`;

  return `
      <g class="cat-head">
        ${renderEars(p)}
        <ellipse cx="120" cy="108" rx="70" ry="62" fill="${p.fur}"/>
        ${stripes}
        ${ahoge}
        <ellipse cx="120" cy="136" rx="31" ry="23" fill="${p.muzzle}" opacity="0.97"/>
        <g class="cat-face">
          ${brows}
          ${eyeWrap}
          ${glasses}
          <path d="M113 ${NOSE_Y} Q120 ${NOSE_Y - 5} 127 ${NOSE_Y} Q120 ${NOSE_Y + 8} 113 ${NOSE_Y} Z" fill="#e58a94"/>
          ${renderMouth(mood, p)}
          ${fang}
          ${blush}
          <g class="cat-whiskers" stroke="${p.whisker}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.9">
            <path d="M92 131 C80 128 69 125 59 122"/>
            <path d="M92 138 C80 138 69 139 59 141"/>
            <path d="M148 131 C160 128 171 125 181 122"/>
            <path d="M148 138 C160 138 171 139 181 141"/>
          </g>
        </g>
      </g>`;
}

function renderScarf(character: CatCharacter, p: CatPalette): string {
  const charm =
    character === 'amo'
      ? `
        <circle cx="72" cy="219" r="5.4" fill="#e8b64c"/>
        <circle cx="72" cy="219" r="2.2" fill="#f7de9a"/>
        <path d="M72 224 v2.5" stroke="#c9932f" stroke-width="1.6" stroke-linecap="round"/>`
      : `
        <g class="cat-bow" fill="${p.scarfDark}">
          <path d="M98 180 C88 171 79 174 81.5 183 C84 191 93 188 98 184 C103 188 112 191 114.5 183 C117 174 108 171 98 180 Z"/>
          <circle cx="98" cy="181" r="4.4" fill="${p.scarfLight}"/>
        </g>`;

  return `
      <g class="cat-scarf">
        <path d="M77 156 Q120 184 163 156 L166 173 Q120 202 74 173 Z" fill="${p.scarf}"/>
        <path d="M75 169 Q120 198 165 169" stroke="${p.scarfDark}" stroke-width="3" fill="none" opacity="0.55"/>
        <ellipse cx="98" cy="180" rx="10.5" ry="8.5" fill="${p.scarfDark}"/>
        <g class="cat-scarf-end">
          <path d="M92 184 C88 202 80 214 69 221 C86 223 99 208 105 192 Z" fill="${p.scarf}"/>
          <path d="M96 187 C94 201 90 209 84 216" stroke="${p.scarfDark}" stroke-width="3" fill="none" opacity="0.45"/>
        </g>
        ${character === 'amo' ? charm : ''}
      </g>`;
}

/* ────────────────────────── 情緒特效（畫喺身體外層） ────────────────────────── */

function renderExtras(character: CatCharacter, mood: CatMood): string {
  switch (mood) {
    case 'happy':
      return `
      <g class="cat-emotes">
        <path class="cat-heart" d="${heartPath(196, 60, 12)}" fill="#f4a7bb"/>
        <path class="cat-sparkle" d="${sparklePath(57, 80, 9)}" fill="#e8b64c"/>
        <path class="cat-sparkle" d="${sparklePath(205, 106, 6)}" fill="#f4a7bb"/>
        <path class="cat-sparkle" d="${sparklePath(46, 176, 5)}" fill="#e8b64c" opacity="0.9"/>
      </g>`;
    case 'celebrate':
      return `
      <g class="cat-emotes">
        <path class="cat-sparkle" d="${sparklePath(45, 88, 11)}" fill="#e8b64c"/>
        <path class="cat-sparkle" d="${sparklePath(198, 78, 12)}" fill="#f4a7bb"/>
        <path class="cat-sparkle" d="${sparklePath(214, 128, 7)}" fill="#8f9fd6"/>
        <path class="cat-sparkle" d="${sparklePath(28, 134, 6)}" fill="#78a878"/>
        <circle class="cat-confetti-dot" cx="58" cy="52" r="3" fill="#f4a7bb"/>
        <circle class="cat-confetti-dot" cx="184" cy="40" r="2.6" fill="#e8b64c"/>
        <circle class="cat-confetti-dot" cx="222" cy="98" r="2.6" fill="#78a878"/>
        <circle class="cat-confetti-dot" cx="20" cy="108" r="2.4" fill="#8f9fd6"/>
      </g>`;
    case 'sad':
      return `
      <g class="cat-emotes cat-tears">
        <path class="cat-tear" d="M87 121 C82 130 81 136 87 139 C93 136 92 130 87 121 Z" fill="#a6cfe8" opacity="0.95"/>
        <path class="cat-tear cat-tear--2" d="M137 128 C133 135 132 140 137 142 C142 140 141 135 137 128 Z" fill="#a6cfe8" opacity="0.85"/>
      </g>`;
    case 'think':
      return `
      <g class="cat-think">
        <circle cx="174" cy="62" r="4.4" fill="#fffdf8" stroke="${character === 'amo' ? '#6f9c76' : '#e07e9c'}" stroke-width="2"/>
        <circle cx="186" cy="48" r="6.4" fill="#fffdf8" stroke="${character === 'amo' ? '#6f9c76' : '#e07e9c'}" stroke-width="2"/>
        <ellipse cx="210" cy="26" rx="19" ry="13.5" fill="#fffdf8" stroke="${character === 'amo' ? '#6f9c76' : '#e07e9c'}" stroke-width="2"/>
        <g fill="${character === 'amo' ? '#4f7a58' : '#b4655f'}">
          <circle cx="202" cy="26" r="1.9"/>
          <circle cx="210" cy="26" r="1.9"/>
          <circle cx="218" cy="26" r="1.9"/>
        </g>
      </g>`;
    case 'wink':
      return `
      <g class="cat-emotes">
        <path class="cat-sparkle" d="${sparklePath(184, 72, 10)}" fill="#e8b64c"/>
        <path class="cat-heart" d="${heartPath(206, 100, 7)}" fill="#f4a7bb"/>
      </g>`;
    case 'sleep':
      return `
      <g class="cat-emotes cat-zzz" fill="none" stroke="${character === 'amo' ? '#5e6a60' : '#b3763d'}" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
        <path d="M183 66 h15 l-15 13 h15" stroke-width="4"/>
        <path d="M204 40 h11 l-11 10 h11" stroke-width="3.2"/>
        <path d="M219 20 h8 l-8 7 h8" stroke-width="2.6"/>
      </g>`;
    default:
      return '';
  }
}

/* ────────────────────────── 對外 API ────────────────────────── */

/**
 * 產生貓貓角色 inline SVG。
 * @param character 'amo'（阿墨，黑貓店長）| 'dango'（糰子，橘虎斑小貓）
 * @param mood 表情，預設 'idle'
 * @param opts size（px，預設 160）、className、decorative、ariaLabel
 */
export function catSVG(
  character: CatCharacter,
  mood: CatMood = 'idle',
  opts: CatSVGOptions = {},
): string {
  const chr: CatCharacter = character === 'amo' ? 'amo' : 'dango';
  const p = PALETTES[chr];
  const safeMood: CatMood = CAT_MOODS.includes(mood) ? mood : 'idle';
  const rawSize = opts.size;
  const size =
    typeof rawSize === 'number' && Number.isFinite(rawSize) && rawSize > 0
      ? Math.round(rawSize)
      : 160;
  const extraClass = opts.className ? ` ${escapeAttr(opts.className)}` : '';
  const label = opts.ariaLabel ?? `${CHARACTER_LABEL[chr]}，${MOOD_LABEL[safeMood]}`;
  const a11y = opts.decorative
    ? 'aria-hidden="true" focusable="false"'
    : `role="img" aria-label="${escapeAttr(label)}" focusable="false"`;
  const eyesOpen = safeMood === 'idle' || safeMood === 'think';
  const raisedPaws = safeMood === 'celebrate';
  const thinkPaw = safeMood === 'think';

  const bodyStripes =
    chr === 'dango'
      ? `<path d="M75 173 q10 5 12 14 M165 173 q-10 5 -12 14" stroke="${p.furDark}" stroke-width="4.6" fill="none" stroke-linecap="round" opacity="0.5"/>`
      : '';

  const paws = raisedPaws ? renderPawsRaised(p) : renderPawsIdle(chr, p);

  return `
<svg class="cat-svg cat-${chr} mood-${safeMood}${eyesOpen ? ' cat-eyes-open' : ''}${extraClass}" viewBox="0 0 240 240" width="${size}" height="${size}" ${a11y} data-character="${chr}" data-mood="${safeMood}" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="cat-shadow" cx="120" cy="231" rx="64" ry="8.5" fill="${p.shadow}" opacity="0.16"/>
  <g class="cat-body">
    ${renderTail(chr, p)}
    <g class="cat-breathe">
      <ellipse cx="120" cy="197" rx="52" ry="46" fill="${p.fur}"/>
      <ellipse cx="120" cy="207" rx="33" ry="29" fill="${p.belly}" opacity="0.96"/>
      ${bodyStripes}
      ${paws}
      ${renderHead(chr, safeMood, p)}
      ${thinkPaw ? renderThinkPaw(p) : ''}
      ${renderScarf(chr, p)}
    </g>
    ${renderExtras(chr, safeMood)}
  </g>
</svg>`;
}

/**
 * 方便 UI 用：喺指定容器內換貓貓角色／表情（會保留容器的其他內容）。
 * 只會替換第一個 `.cat-svg`；找唔到就回傳 false。
 */
export function updateCatSVG(
  container: Element | null,
  character: CatCharacter,
  mood: CatMood = 'idle',
  opts: CatSVGOptions = {},
): boolean {
  if (!container) return false;
  const svg = container.matches('.cat-svg')
    ? container
    : container.querySelector('.cat-svg');
  if (!svg) return false;
  svg.outerHTML = catSVG(character, mood, opts);
  return true;
}
