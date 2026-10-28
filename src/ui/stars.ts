/** 星星顯示。 */

export interface StarsOptions {
  size?: 'sm' | 'md' | 'lg';
  total?: number;
}

/** 細細粒星星（列表、結算用） */
export function starsHtml(stars: number, options: StarsOptions = {}): string {
  const total = options.total ?? 3;
  const size = options.size ?? 'sm';
  const safeStars = Math.max(0, Math.min(total, Math.round(stars)));
  let inner = '';
  for (let i = 0; i < total; i += 1) {
    inner += `<span class="star${i < safeStars ? '' : ' star--off'}" aria-hidden="true">★</span>`;
  }
  return `<span class="stars stars--${size}" role="img" aria-label="獲得 ${safeStars} 星，滿分 ${total} 星">${inner}</span>`;
}

/** 過關 overlay：大星星 + data-stars / data-testid。 */
export function resultStarsHtml(stars: number, instant = false): string {
  const safe = Math.max(0, Math.min(3, Math.round(stars)));
  let inner = '';
  for (let i = 0; i < 3; i += 1) {
    inner += `<span class="result__star${i < safe ? '' : ' result__star--off'}" aria-hidden="true">★</span>`;
  }
  return `<div class="result__stars${instant ? ' is-instant' : ''}" data-testid="result-stars" data-stars="${safe}" role="img" aria-label="獲得 ${safe} 星，滿分 3 星">${inner}</div>`;
}

/** 地圖細星星字串（★☆） */
export function starGlyphs(stars: number, total = 3): string {
  const safe = Math.max(0, Math.min(total, Math.round(stars)));
  return `${'★'.repeat(safe)}${'☆'.repeat(total - safe)}`;
}
