/** Toast：`role=status aria-live=polite`，自動消失，最多同時 3 個。 */

import type { IconName } from './icons';

export type ToastTone = 'info' | 'success' | 'warn' | 'gold';

export interface ToastOptions {
  tone?: ToastTone;
  /** 停留毫秒（預設 2600） */
  duration?: number;
}

let toastRoot: HTMLElement | null = null;
const MAX_TOASTS = 3;
const liveTimers = new Set<number>();

const TONE_ICON: Record<ToastTone, string> = {
  info: '🐾',
  success: '✓',
  warn: '！',
  gold: '★',
};

export function setToastRoot(root: HTMLElement): void {
  toastRoot = root;
}

/** 清走所有 toast（轉畫面時用，避免上一個畫面嘅提示蓋住新畫面）。 */
export function clearToasts(): void {
  if (!toastRoot) return;
  for (const timer of liveTimers) window.clearTimeout(timer);
  liveTimers.clear();
  toastRoot.replaceChildren();
}

export function showToast(message: string, options: ToastOptions = {}): void {
  const root = toastRoot;
  if (!root) return;
  const tone = options.tone ?? 'info';
  const node = document.createElement('div');
  node.className = `toast toast--${tone}`;
  node.setAttribute('role', 'status');

  const icon = document.createElement('span');
  icon.className = 'toast__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = TONE_ICON[tone];

  const text = document.createElement('span');
  text.textContent = message;

  node.append(icon, text);
  root.append(node);

  while (root.childElementCount > MAX_TOASTS) {
    root.firstElementChild?.remove();
  }

  const duration = options.duration ?? 2600;
  const hideTimer = window.setTimeout(() => {
    liveTimers.delete(hideTimer);
    node.classList.add('is-leaving');
    const removeTimer = window.setTimeout(() => {
      liveTimers.delete(removeTimer);
      node.remove();
    }, 260);
    liveTimers.add(removeTimer);
  }, duration);
  liveTimers.add(hideTimer);
}

export type { IconName };
