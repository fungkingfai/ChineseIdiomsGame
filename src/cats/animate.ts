/**
 * 貓貓 2D 動畫小工具（cat-animator 擁有）
 * ---------------------------------------------------------------
 * 所有效果只用 CSS transform / opacity（見 src/styles/cats.css），
 * 唔會用 layout 屬性，亦會自動尊重「減少動態效果」：
 *   - 系統 `prefers-reduced-motion: reduce`
 *   - 用戶設定：`<html class="reduced-motion">`
 *
 * 對外 API（向後兼容，唔好改簽名）：
 *   spawnPetals(container, count?)
 *   burstConfetti(container)
 *   catMood(el, mood)
 *   prefersReducedMotion()
 * 另外新增：
 *   spawnFireflies / spawnSnow / spawnRain / spawnStars
 *   spawnSceneFx(container, scene) — 跟章節場景自動配環境效果
 *   playClearCinematic(container) — 過關星光＋彩紙小演出
 *   clearFx(container) — 清走所有特效 layer
 *   setReducedMotion(enabled) — 切換 html.reduced-motion（給設定頁用）
 */

export type AnimatedCatMood =
  | 'idle'
  | 'happy'
  | 'sad'
  | 'think'
  | 'celebrate'
  | 'wink'
  | 'sleep';

const MOOD_CLASSES: readonly AnimatedCatMood[] = [
  'idle',
  'happy',
  'sad',
  'think',
  'celebrate',
  'wink',
  'sleep',
];

/** 特效 layer class（一個容器每種效果最多一層，避免重複疊加） */
const FX_LAYERS = {
  petal: 'petal-layer',
  confetti: 'confetti-layer',
  firefly: 'firefly-layer',
  snow: 'snow-layer',
  rain: 'rain-layer',
  star: 'star-layer',
  cinematic: 'cinematic-layer',
} as const;

type FxKind = keyof typeof FX_LAYERS;

const PETAL_COLORS = ['petal--pink', 'petal--blush', 'petal--cream', 'petal--rose'];
const FIREFLY_COLORS = ['firefly--warm', 'firefly--gold', 'firefly--cool'];

/* ────────────────────────── 基本工具 ────────────────────────── */

/** 系統或用戶設定是否要求減少動態效果 */
export function prefersReducedMotion(): boolean {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true;
    }
    const root = document.documentElement;
    if (root.classList.contains('reduced-motion')) return true;
    if (root.dataset.reducedMotion === 'true') return true;
    return document.body?.classList.contains('reduced-motion') ?? false;
  } catch {
    return false;
  }
}

/** 切換全站「減少動態效果」class（給設定畫面用；唔會自己寫 localStorage） */
export function setReducedMotion(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('reduced-motion', enabled);
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1));
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function clampCount(value: number | undefined, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.round(value)));
}

function findLayer(container: HTMLElement, kind: FxKind): HTMLElement | null {
  const cls = FX_LAYERS[kind];
  for (const child of Array.from(container.children)) {
    if (child.classList.contains(cls)) return child as HTMLElement;
  }
  return null;
}

function ensureLayer(container: HTMLElement, kind: FxKind): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  const existing = findLayer(container, kind);
  if (existing) return existing;
  const layer = document.createElement('div');
  layer.className = `fx-layer ${FX_LAYERS[kind]}`;
  layer.setAttribute('aria-hidden', 'true');
  layer.dataset.fx = kind;
  container.classList.add('fx-host');
  container.appendChild(layer);
  return layer;
}

function removeLayer(container: HTMLElement, kind: FxKind): void {
  findLayer(container, kind)?.remove();
}

/** 清走容器入面所有特效 layer（切畫面時用） */
export function clearFx(container: HTMLElement | null): void {
  if (!container) return;
  for (const kind of Object.keys(FX_LAYERS) as FxKind[]) {
    removeLayer(container, kind);
  }
}

/* ────────────────────────── 櫻花花瓣 ────────────────────────── */

/**
 * 櫻花花瓣飄落（預設 14 片；已有花瓣層就唔會重複加，避免愈疊愈多）。
 * 容器需要定位（會自動加 `fx-host` → `position: relative`）。
 */
export function spawnPetals(container: HTMLElement | null, count = 14): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'petal');
  if (!layer) return;
  if (layer.childElementCount > 0) return;
  const total = clampCount(count, 14, 6, 28);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const petal = document.createElement('span');
    petal.className = `petal ${pick(PETAL_COLORS)}`;
    petal.style.left = `${rand(-4, 100).toFixed(1)}%`;
    petal.style.setProperty('--petal-size', `${rand(6, 12).toFixed(1)}px`);
    petal.style.setProperty('--petal-drift', `${rand(-90, 90).toFixed(0)}px`);
    petal.style.setProperty('--petal-sway', `${rand(-26, 26).toFixed(0)}px`);
    petal.style.setProperty('--petal-spin', `${rand(160, 520).toFixed(0)}deg`);
    petal.style.animationDuration = `${rand(8, 16).toFixed(1)}s`;
    petal.style.animationDelay = `-${rand(0, 14).toFixed(1)}s`;
    petal.style.setProperty('--petal-opacity', `${rand(0.5, 0.95).toFixed(2)}`);
    fragment.appendChild(petal);
  }
  layer.appendChild(fragment);
}

/* ────────────────────────── 彩紙 ────────────────────────── */

/** 過關彩紙爆破（約 1.8s 後自動清走 DOM） */
export function burstConfetti(container: HTMLElement | null): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'confetti');
  if (!layer) return;
  const count = 30;
  const colors = ['#f4a7bb', '#e88aa8', '#78a878', '#4f7a58', '#e8b64c', '#8f9fd6', '#fffdf8'];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = `confetti confetti--${i % 3 === 0 ? 'ribbon' : i % 3 === 1 ? 'square' : 'round'}`;
    piece.style.left = `${rand(18, 82).toFixed(1)}%`;
    piece.style.top = `${rand(20, 45).toFixed(1)}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--dx', `${rand(-54, 54).toFixed(0)}vw`);
    piece.style.setProperty('--dy', `${rand(-22, 8).toFixed(0)}vh`);
    piece.style.setProperty('--rot', `${rand(-540, 540).toFixed(0)}deg`);
    piece.style.setProperty('--piece-w', `${rand(7, 12).toFixed(0)}px`);
    piece.style.setProperty('--piece-h', `${rand(10, 18).toFixed(0)}px`);
    piece.style.animationDelay = `${rand(0, 0.18).toFixed(2)}s`;
    fragment.appendChild(piece);
  }
  layer.appendChild(fragment);
  // 最多同時 ~90 個節點，夠用又唔會拖慢
  while (layer.childElementCount > 90) {
    layer.firstElementChild?.remove();
  }
  window.setTimeout(() => {
    layer.querySelectorAll('.confetti').forEach((el) => el.remove());
  }, 2400);
}

/* ────────────────────────── 螢火蟲 ────────────────────────── */

export function spawnFireflies(container: HTMLElement | null, count = 10): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'firefly');
  if (!layer || layer.childElementCount > 0) return;
  const total = clampCount(count, 10, 4, 18);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const fly = document.createElement('span');
    fly.className = `firefly ${pick(FIREFLY_COLORS)}`;
    fly.style.left = `${rand(4, 96).toFixed(1)}%`;
    fly.style.top = `${rand(8, 88).toFixed(1)}%`;
    fly.style.setProperty('--fly-x', `${rand(-46, 46).toFixed(0)}px`);
    fly.style.setProperty('--fly-y', `${rand(-38, 38).toFixed(0)}px`);
    fly.style.setProperty('--fly-size', `${rand(4, 7).toFixed(1)}px`);
    fly.style.animationDuration = `${rand(5, 11).toFixed(1)}s`;
    fly.style.animationDelay = `-${rand(0, 9).toFixed(1)}s`;
    fragment.appendChild(fly);
  }
  layer.appendChild(fragment);
}

/* ────────────────────────── 雪 ────────────────────────── */

export function spawnSnow(container: HTMLElement | null, count = 22): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'snow');
  if (!layer || layer.childElementCount > 0) return;
  const total = clampCount(count, 22, 8, 40);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const flake = document.createElement('span');
    flake.className = `snowflake${i % 4 === 0 ? ' snowflake--big' : ''}`;
    flake.style.left = `${rand(-2, 100).toFixed(1)}%`;
    flake.style.setProperty('--snow-size', `${rand(3, 7).toFixed(1)}px`);
    flake.style.setProperty('--snow-drift', `${rand(-60, 60).toFixed(0)}px`);
    flake.style.animationDuration = `${rand(6, 13).toFixed(1)}s`;
    flake.style.animationDelay = `-${rand(0, 12).toFixed(1)}s`;
    flake.style.opacity = `${rand(0.55, 0.95).toFixed(2)}`;
    fragment.appendChild(flake);
  }
  layer.appendChild(fragment);
}

/* ────────────────────────── 雨 ────────────────────────── */

export function spawnRain(container: HTMLElement | null, count = 34): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'rain');
  if (!layer || layer.childElementCount > 0) return;
  const total = clampCount(count, 34, 12, 60);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const drop = document.createElement('span');
    drop.className = 'raindrop';
    drop.style.left = `${rand(-2, 100).toFixed(1)}%`;
    drop.style.setProperty('--rain-drift', `${rand(-26, 10).toFixed(0)}px`);
    drop.style.setProperty('--rain-height', `${rand(12, 26).toFixed(0)}px`);
    drop.style.animationDuration = `${rand(0.7, 1.4).toFixed(2)}s`;
    drop.style.animationDelay = `-${rand(0, 2).toFixed(2)}s`;
    drop.style.opacity = `${rand(0.25, 0.6).toFixed(2)}`;
    fragment.appendChild(drop);
  }
  layer.appendChild(fragment);
}

/* ────────────────────────── 星光光點 ────────────────────────── */

export function spawnStars(container: HTMLElement | null, count = 14): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'star');
  if (!layer || layer.childElementCount > 0) return;
  const total = clampCount(count, 14, 6, 26);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const star = document.createElement('span');
    star.className = 'star-mote';
    star.style.left = `${rand(2, 98).toFixed(1)}%`;
    star.style.top = `${rand(2, 92).toFixed(1)}%`;
    star.style.setProperty('--star-size', `${rand(2, 5).toFixed(1)}px`);
    star.style.animationDuration = `${rand(2.4, 5).toFixed(1)}s`;
    star.style.animationDelay = `-${rand(0, 4).toFixed(1)}s`;
    fragment.appendChild(star);
  }
  layer.appendChild(fragment);
}

/* ────────────────────────── 場景環境效果 ────────────────────────── */

/**
 * 跟章節場景自動配環境效果（garden→花瓣、snow→雪、rain→雨…）。
 * 同一個容器重複呼叫唔會疊加。
 */
export function spawnSceneFx(container: HTMLElement | null, scene: string): void {
  if (!container || prefersReducedMotion()) return;
  switch (scene) {
    case 'garden':
      spawnPetals(container, 14);
      break;
    case 'bamboo':
      spawnFireflies(container, 8);
      break;
    case 'moon':
      spawnFireflies(container, 6);
      spawnStars(container, 10);
      break;
    case 'snow':
      spawnSnow(container, 24);
      break;
    case 'sea':
      break;
    case 'stars':
      spawnStars(container, 18);
      break;
    case 'festival':
      spawnFireflies(container, 10);
      spawnStars(container, 8);
      break;
    case 'rain':
      spawnRain(container, 34);
      break;
    case 'cloud':
      spawnStars(container, 8);
      break;
    case 'summit':
      spawnStars(container, 10);
      break;
    default:
      spawnPetals(container, 10);
      break;
  }
}

/* ────────────────────────── 過關小演出 ────────────────────────── */

/**
 * 過關星光小演出：中央閃光＋放射星光＋彩紙（約 2.4s 後自動清走）。
 * reduced-motion 時直接唔播，交返純 CSS 靜態結果畫面。
 */
export function playClearCinematic(container: HTMLElement | null): void {
  if (!container || prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'cinematic');
  if (!layer) return;

  const flash = document.createElement('div');
  flash.className = 'cine-flash';
  layer.appendChild(flash);

  for (let i = 0; i < 10; i += 1) {
    const star = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 10;
    star.className = 'cine-star';
    star.style.setProperty('--star-x', `${Math.cos(angle) * 160}px`);
    star.style.setProperty('--star-y', `${Math.sin(angle) * 110}px`);
    star.style.animationDelay = `${0.05 + i * 0.035}s`;
    layer.appendChild(star);
  }

  burstConfetti(container);
  spawnPetals(container, 16);

  window.setTimeout(() => {
    removeLayer(container, 'cinematic');
  }, 2600);
}

/* ────────────────────────── 貓貓情緒 ────────────────────────── */

/**
 * 切換貓貓情緒動畫 class（`mood-happy` …）。
 * 表情本身由 catSVG(character, mood) 畫入 SVG；呢個 function 只負責
 * 加／減 CSS 動畫 class，可以套喺包住 `.cat-svg` 嘅任何 wrapper。
 */
export function catMood(el: Element | null, mood: AnimatedCatMood): void {
  if (!el) return;
  for (const known of MOOD_CLASSES) {
    el.classList.remove(`mood-${known}`);
  }
  el.classList.add(`mood-${mood}`);
  el.setAttribute('data-cat-mood', mood);
}
