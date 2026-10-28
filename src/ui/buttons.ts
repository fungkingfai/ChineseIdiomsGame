/** 共用按鈕 HTML 工廠（配合 template 字串使用）。 */

import { esc } from './dom';
import type { IconName } from './icons';

export type ButtonVariant = 'primary' | 'pink' | 'ghost' | 'soft' | 'gold' | 'danger';

export interface ButtonOptions {
  label: string;
  testId?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  /** icon 放右邊 */
  iconRight?: boolean;
  wide?: boolean;
  ariaLabel?: string;
  extraClass?: string;
  type?: 'button' | 'submit';
}

export function btnHtml(options: ButtonOptions): string {
  const variant = options.variant ?? 'ghost';
  const sizeClass = options.size === 'sm' ? ' btn--sm' : options.size === 'lg' ? ' btn--lg' : '';
  const icon = options.icon
    ? options.iconRight
      ? `<span aria-hidden="true">${options.icon}</span>`
      : `<span aria-hidden="true">${options.icon}</span>`
    : '';
  const label = `<span>${esc(options.label)}</span>`;
  const attrs = [
    'type="button"',
    `class="btn btn--${variant}${sizeClass}${options.wide ? ' btn--wide' : ''}${
      options.extraClass ? ` ${options.extraClass}` : ''
    }"`,
    options.testId ? `data-testid="${esc(options.testId)}"` : '',
    options.ariaLabel ? `aria-label="${esc(options.ariaLabel)}"` : '',
  ]
    .filter(Boolean)
    .join(' ');
  return `<button ${attrs}>${options.iconRight ? label + icon : icon + label}</button>`;
}

export interface IconButtonOptions {
  label: string;
  icon: string;
  testId?: string;
  active?: boolean;
  extraClass?: string;
  pressed?: boolean;
}

export function iconBtnHtml(options: IconButtonOptions): string {
  const attrs = [
    'type="button"',
    `class="icon-btn${options.active ? ' is-active' : ''}${
      options.extraClass ? ` ${options.extraClass}` : ''
    }"`,
    `aria-label="${esc(options.label)}"`,
    options.testId ? `data-testid="${esc(options.testId)}"` : '',
    options.pressed === undefined ? '' : `aria-pressed="${options.pressed}"`,
  ]
    .filter(Boolean)
    .join(' ');
  return `<button ${attrs}>${options.icon}</button>`;
}

export type { IconName };
