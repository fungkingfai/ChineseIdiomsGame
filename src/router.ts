/**
 * Hash router（SPA 刷新仍可運作）
 *   #/home（預設）、#/map、#/game/<id>、#/codex、#/settings
 * 未知路由 → 首頁；關卡存在／解鎖驗證由 app.ts 負責。
 */

export type Route =
  | { name: 'home' }
  | { name: 'map' }
  | { name: 'game'; levelId: number }
  | { name: 'codex' }
  | { name: 'settings' };

export const ROUTE_HOME = '#/home';
export const ROUTE_MAP = '#/map';
export const ROUTE_CODEX = '#/codex';
export const ROUTE_SETTINGS = '#/settings';

export const routeGame = (levelId: number): string => `#/game/${levelId}`;

/** 由 location.hash 解析路由；未知格式回傳 home。 */
export function parseRoute(rawHash: string): Route {
  const hash = (rawHash || '').replace(/^#/, '');
  const path = hash.split('?')[0];
  const parts = path.split('/').filter((part) => part.length > 0);
  if (parts.length === 0) return { name: 'home' };

  switch (parts[0]) {
    case 'home':
      return { name: 'home' };
    case 'map':
      return { name: 'map' };
    case 'codex':
      return { name: 'codex' };
    case 'settings':
      return { name: 'settings' };
    case 'game': {
      const id = Number(parts[1]);
      if (!Number.isInteger(id) || id < 1) return { name: 'home' };
      return { name: 'game', levelId: id };
    }
    default:
      return { name: 'home' };
  }
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return ROUTE_HOME;
    case 'map':
      return ROUTE_MAP;
    case 'codex':
      return ROUTE_CODEX;
    case 'settings':
      return ROUTE_SETTINGS;
    case 'game':
      return routeGame(route.levelId);
  }
}

function normalizeHash(hash: string): string {
  return hash.startsWith('#') ? hash : `#${hash}`;
}

/** 導航（會 push history）。同 hash 都會觸發一次 re-render，方便「再玩一次」類操作。 */
export function navigate(hash: string): void {
  const next = normalizeHash(hash);
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return;
  }
  window.location.hash = next;
}

/** 取代目前 history entry（用於修正無效路由）。 */
export function replaceRoute(hash: string): void {
  const next = normalizeHash(hash);
  window.history.replaceState(null, '', next);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export class Router {
  private readonly onChange: (route: Route) => void;
  private boundHandler: (() => void) | null = null;

  constructor(onChange: (route: Route) => void) {
    this.onChange = onChange;
  }

  start(): void {
    if (!window.location.hash) {
      window.history.replaceState(null, '', ROUTE_HOME);
    }
    if (!this.boundHandler) {
      this.boundHandler = () => this.onChange(parseRoute(window.location.hash));
      window.addEventListener('hashchange', this.boundHandler);
    }
    this.onChange(parseRoute(window.location.hash));
  }

  stop(): void {
    if (this.boundHandler) {
      window.removeEventListener('hashchange', this.boundHandler);
      this.boundHandler = null;
    }
  }
}
