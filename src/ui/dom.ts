/** 小型 DOM 工具（無框架）：建 element、template、查詢、事件、timer 管理。 */

export type Child = Node | string | number | null | undefined | false;

export type AttrValue = string | number | boolean | null | undefined;

/**
 * 建一個 element。
 * - `text`：textContent（安全）
 * - `html`：innerHTML（只可以放 trusted 內容／inline SVG）
 * - `true`：setAttribute(key, '')
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, AttrValue> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'text') {
      node.textContent = String(value);
    } else if (key === 'html') {
      node.innerHTML = String(value);
    } else if (value === true) {
      node.setAttribute(key, '');
    } else {
      node.setAttribute(key, String(value));
    }
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    node.append(typeof child === 'number' ? String(child) : child);
  }
  return node;
}

/** 由 HTML 字串建立第一個 element。 */
export function fromHtml(html: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const node = template.content.firstElementChild;
  if (!(node instanceof HTMLElement)) throw new Error('fromHtml: 冇有效 element');
  return node;
}

/** 轉義 HTML 文字（資料檔內容雖然 trusted，仍然統一轉義以免意外）。 */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function qs<T extends Element = HTMLElement>(root: ParentNode, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (!found) throw new Error(`搵唔到 element：${selector}`);
  return found;
}

export function qsa<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions | boolean,
): () => void {
  target.addEventListener(type, handler as EventListener, options);
  return () => target.removeEventListener(type, handler as EventListener, options);
}

/** 管理 setTimeout，destroy 時一次過清。 */
export class TimerBag {
  private ids = new Set<number>();

  after(ms: number, callback: () => void): number {
    const id = window.setTimeout(() => {
      this.ids.delete(id);
      callback();
    }, ms);
    this.ids.add(id);
    return id;
  }

  clear(): void {
    for (const id of this.ids) window.clearTimeout(id);
    this.ids.clear();
  }
}

export function prefersReducedMotionQuery(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}

export function nextFrame(callback: () => void): void {
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => callback());
  else window.setTimeout(callback, 0);
}

/**
 * 粵拼搜尋正規化：去聲調數字（1–6）、去所有空白、lowercase，
 * 令「jat1 nok6」「jat nok」「jat1nok6」都對得上。
 */
export function normalizeJyutping(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[1-6]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

/**
 * 搜尋用正規化：去除拼音聲調（NFD 拆字 → 去 combining marks）、
 * 全形空白收窄、lowercase。玩家打「yu gong」都搵到「yú gōng」。
 */
export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
