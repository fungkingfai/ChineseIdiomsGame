/**
 * 貓貓 2D 動畫小工具（cat-animator 擁有；目前為 Lead 的臨時 placeholder，會被完整版本取代）。
 * 合約：
 *  - spawnPetals(container, count?)
 *  - burstConfetti(container)
 *  - catMood(el, mood)
 *  - prefersReducedMotion()
 */

export type AnimatedCatMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wink' | 'sleep';

export function prefersReducedMotion(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}

function ensureLayer(container: HTMLElement, className: string): HTMLElement {
  let layer = container.querySelector<HTMLElement>(`.${className}`);
  if (!layer) {
    layer = document.createElement('div');
    layer.className = className;
    layer.setAttribute('aria-hidden', 'true');
    container.appendChild(layer);
  }
  return layer;
}

export function spawnPetals(container: HTMLElement, count = 12): void {
  if (prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'petal-layer');
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 6}s`;
    petal.style.animationDuration = `${7 + Math.random() * 6}s`;
    petal.style.opacity = `${0.45 + Math.random() * 0.4}`;
    petal.style.setProperty('--petal-drift', `${(Math.random() - 0.5) * 160}px`);
    layer.appendChild(petal);
  }
}

export function burstConfetti(container: HTMLElement): void {
  if (prefersReducedMotion()) return;
  const layer = ensureLayer(container, 'confetti-layer');
  const colors = ['#f4a7bb', '#78a878', '#e8b64c', '#8f9fd6', '#e88aa8'];
  for (let i = 0; i < 26; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${45 + (Math.random() - 0.5) * 20}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 220}px`);
    piece.style.setProperty('--dy', `${-80 - Math.random() * 160}px`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    layer.appendChild(piece);
  }
  window.setTimeout(() => layer.querySelectorAll('.confetti').forEach((el) => el.remove()), 2200);
}

export function catMood(el: Element | null, mood: AnimatedCatMood): void {
  if (!el) return;
  for (const known of ['idle', 'happy', 'sad', 'think', 'celebrate', 'wink', 'sleep']) {
    el.classList.remove(`mood-${known}`);
  }
  el.classList.add(`mood-${mood}`);
}
