/**
 * Overlay / Modal 管理：stack、focus trap、Esc、backdrop click、scroll lock。
 * App shell 會設定 overlay root；所有對話框都掛喺同一個 root。
 */

import { esc, nextFrame, qsa } from './dom';
import { icon } from './icons';

export interface OverlayOptions {
  /** HTML 內容（只可以放 trusted 內容；動態文字要用 esc()） */
  content: string;
  ariaLabel: string;
  testId?: string;
  wide?: boolean;
  flush?: boolean;
  className?: string;
  /** 可以 Esc／點 backdrop 關閉（預設 false：強制用掣） */
  dismissible?: boolean;
  /** 顯示右上角 X 掣 */
  closeButton?: boolean;
  onClose?: () => void;
}

export interface OverlayHandle {
  el: HTMLElement;
  panel: HTMLElement;
  close(): void;
  isOpen(): boolean;
}

interface OverlayRecord {
  root: HTMLElement;
  panel: HTMLElement;
  options: OverlayOptions;
  previousFocus: Element | null;
  closed: boolean;
}

const FOCUSABLE =
  'button:not([disabled]):not([aria-disabled="true"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let overlayRoot: HTMLElement | null = null;
const stack: OverlayRecord[] = [];
let keysBound = false;

export function setOverlayRoot(root: HTMLElement): void {
  overlayRoot = root;
}

function ensureRoot(): HTMLElement {
  if (overlayRoot) return overlayRoot;
  const fallback = document.getElementById('overlay-root');
  if (fallback) {
    overlayRoot = fallback;
    return fallback;
  }
  const created = document.createElement('div');
  created.id = 'overlay-root';
  created.className = 'overlay-root';
  document.body.append(created);
  overlayRoot = created;
  return created;
}

function updateScrollLock(): void {
  document.documentElement.classList.toggle('overlay-open', stack.length > 0);
}

function firstFocusable(panel: HTMLElement): HTMLElement | null {
  const preferred = panel.querySelector<HTMLElement>('[data-autofocus]');
  if (preferred) return preferred;
  return panel.querySelector<HTMLElement>(FOCUSABLE);
}

function trapFocus(event: KeyboardEvent, panel: HTMLElement): void {
  const focusables = qsa<HTMLElement>(panel, FOCUSABLE).filter(
    (node) => node.offsetParent !== null || node === document.activeElement,
  );
  if (focusables.length === 0) {
    event.preventDefault();
    panel.focus();
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  if (!panel.contains(active)) {
    event.preventDefault();
    first.focus();
    return;
  }
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function closeRecord(record: OverlayRecord): void {
  if (record.closed) return;
  record.closed = true;
  record.root.remove();
  const index = stack.indexOf(record);
  if (index >= 0) stack.splice(index, 1);
  updateScrollLock();
  if (stack.length === 0) unbindKeys();
  record.options.onClose?.();
  const previous = record.previousFocus;
  if (previous instanceof HTMLElement && previous.isConnected) {
    previous.focus({ preventScroll: true });
  }
}

function topRecord(): OverlayRecord | undefined {
  return stack[stack.length - 1];
}

function onKeyDown(event: KeyboardEvent): void {
  const top = topRecord();
  if (!top) return;
  if (event.key === 'Escape') {
    if (top.options.dismissible !== false) {
      event.preventDefault();
      event.stopPropagation();
      closeRecord(top);
    }
    return;
  }
  if (event.key === 'Tab') {
    trapFocus(event, top.panel);
  }
}

function bindKeys(): void {
  if (keysBound) return;
  document.addEventListener('keydown', onKeyDown, true);
  keysBound = true;
}

function unbindKeys(): void {
  if (!keysBound) return;
  document.removeEventListener('keydown', onKeyDown, true);
  keysBound = false;
}

export function openOverlay(options: OverlayOptions): OverlayHandle {
  const root = ensureRoot();
  const wrapper = document.createElement('div');
  wrapper.className = `overlay${options.className ? ` ${options.className}` : ''}`;
  if (options.testId) wrapper.dataset.testid = options.testId;
  wrapper.setAttribute('role', 'dialog');
  wrapper.setAttribute('aria-modal', 'true');
  wrapper.setAttribute('aria-label', options.ariaLabel);

  const backdrop = document.createElement('div');
  backdrop.className = 'overlay__backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('div');
  panel.className = `overlay__panel${options.wide ? ' overlay__panel--wide' : ''}${
    options.flush ? ' overlay__panel--flush' : ''
  }`;
  panel.tabIndex = -1;
  panel.innerHTML = options.content;

  wrapper.append(backdrop, panel);
  root.append(wrapper);

  if (options.closeButton) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'icon-btn icon-btn--plain overlay__close';
    closeBtn.setAttribute('aria-label', '關閉');
    closeBtn.innerHTML = icon.close;
    closeBtn.addEventListener('click', () => handle.close());
    panel.append(closeBtn);
  }

  const previousFocus = document.activeElement;
  const record: OverlayRecord = {
    root: wrapper,
    panel,
    options,
    previousFocus,
    closed: false,
  };
  stack.push(record);
  updateScrollLock();
  bindKeys();

  if (options.dismissible) {
    backdrop.addEventListener('click', () => closeRecord(record));
  }

  nextFrame(() => {
    if (record.closed) return;
    const target = firstFocusable(panel);
    if (target) target.focus({ preventScroll: true });
    else panel.focus({ preventScroll: true });
  });

  const handle: OverlayHandle = {
    el: wrapper,
    panel,
    close: () => closeRecord(record),
    isOpen: () => !record.closed,
  };
  return handle;
}

export function closeAllOverlays(): void {
  for (const record of [...stack].reverse()) closeRecord(record);
}

export function isOverlayOpen(): boolean {
  return stack.length > 0;
}

/* ------------------------------------------------------------------ */
/* 確認 modal                                                          */
/* ------------------------------------------------------------------ */

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmTestId?: string;
  cancelTestId?: string;
  danger?: boolean;
  /** 預設 focus 落取消掣（破壞性操作安全慣例） */
  confirmFirst?: boolean;
  onConfirm: () => void;
}

export function confirmDialog(options: ConfirmDialogOptions): OverlayHandle {
  const cancelLabel = options.cancelLabel ?? '取消';
  const confirmLabel = options.confirmLabel ?? '確認';
  const confirmTestId = options.confirmTestId
    ? ` data-testid="${esc(options.confirmTestId)}"`
    : '';
  const cancelTestId = options.cancelTestId
    ? ` data-testid="${esc(options.cancelTestId)}"`
    : '';
  const confirmAttr = options.confirmFirst ? ' data-autofocus' : '';
  const cancelAttr = options.confirmFirst ? '' : ' data-autofocus';

  const handle = openOverlay({
    ariaLabel: options.title,
    dismissible: true,
    content: `
      <div class="confirm">
        <span class="confirm__icon" aria-hidden="true">${icon.trash}</span>
        <h2 class="confirm__title">${esc(options.title)}</h2>
        <p class="confirm__message">${esc(options.message)}</p>
        <div class="confirm__actions">
          <button type="button" class="btn btn--ghost" data-cancel${cancelTestId}${cancelAttr}>${esc(
            cancelLabel,
          )}</button>
          <button type="button" class="btn ${
            options.danger === false ? 'btn--primary' : 'btn--danger'
          }" data-confirm${confirmTestId}${confirmAttr}>${esc(confirmLabel)}</button>
        </div>
      </div>
    `,
  });

  handle.el.querySelector('[data-cancel]')?.addEventListener('click', () => handle.close());
  handle.el.querySelector('[data-confirm]')?.addEventListener('click', () => {
    handle.close();
    options.onConfirm();
  });
  return handle;
}
