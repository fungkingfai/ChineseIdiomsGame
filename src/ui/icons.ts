/** Inline SVG icon set（無外部資源，跟 currentColor）。 */

const ATTRS =
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

function stroke(inner: string, className = ''): string {
  return `<svg ${ATTRS}${className ? ` class="${className}"` : ''}>${inner}</svg>`;
}

function fill(inner: string, className = ''): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"${
    className ? ` class="${className}"` : ''
  }>${inner}</svg>`;
}

export const icon = {
  back: stroke('<path d="M15 5l-7 7 7 7"/>'),
  forward: stroke('<path d="M9 5l7 7-7 7"/>'),
  up: stroke('<path d="M12 19V5M5 12l7-7 7 7"/>'),
  close: stroke('<path d="M6 6l12 12M18 6L6 18"/>'),
  check: stroke('<path d="M4.5 12.5l5 5L19.5 6.5"/>'),
  hint: stroke(
    '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2h5c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/>',
  ),
  restart: stroke('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),
  soundOn: stroke(
    '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  ),
  soundOff: stroke('<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M16 9l5 6M21 9l-5 6"/>'),
  map: stroke(
    '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  ),
  book: stroke(
    '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>',
  ),
  settings: stroke(
    '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z"/>',
  ),
  lock: stroke(
    '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  ),
  search: stroke('<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>'),
  paw: fill(
    '<path d="M8.2 4.1c1.2 0 2.1 1.4 2.1 3.1S9.4 10.3 8.2 10.3 6.1 8.9 6.1 7.2s.9-3.1 2.1-3.1zm7.6 0c1.2 0 2.1 1.4 2.1 3.1s-.9 3.1-2.1 3.1-2.1-1.4-2.1-3.1.9-3.1 2.1-3.1zM4.3 9.6c1.1 0 1.9 1.2 1.9 2.7s-.8 2.7-1.9 2.7-1.9-1.2-1.9-2.7.8-2.7 1.9-2.7zm15.4 0c1.1 0 1.9 1.2 1.9 2.7s-.8 2.7-1.9 2.7-1.9-1.2-1.9-2.7.8-2.7 1.9-2.7zM12 11.2c3 0 5.5 2.2 5.5 4.4 0 1.5-1.1 2.4-2.7 2.4-1 0-1.9-.4-2.8-.4s-1.8.4-2.8.4c-1.6 0-2.7-.9-2.7-2.4 0-2.2 2.5-4.4 5.5-4.4z"/>',
  ),
  star: fill('<path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z"/>'),
  sparkle: fill(
    '<path d="M12 2l1.8 5.4L19 9.2l-5.2 1.8L12 16.4l-1.8-5.4L5 9.2l5.2-1.8zM19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6L15.5 18.5l2.6-.9z"/>',
  ),
  bookOpen: stroke(
    '<path d="M12 5.5C10.5 4 8.5 3.5 6 3.5H3v14h3c2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2h3v-14h-3c-2.5 0-4.5.5-6 2z"/><path d="M12 5.5v14"/>',
  ),
  trash: stroke(
    '<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>',
  ),
  motion: stroke(
    '<path d="M3 8h9M3 12h12M3 16h7"/><path d="M17 7l4 5-4 5"/>',
  ),
  trophy: stroke(
    '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3"/><path d="M12 13v4M9 21h6M10 17h4l.5 4h-5z"/>',
  ),
  heart: fill(
    '<path d="M12 21s-7.5-4.7-9.4-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.4 12C19.5 16.3 12 21 12 21z"/>',
  ),
} as const;

export type IconName = keyof typeof icon;
