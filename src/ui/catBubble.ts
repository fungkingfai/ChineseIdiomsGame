/** 貓貓對話框。 */

import { catSVG, type CatCharacter, type CatMood } from '../cats/catAssets';
import { esc } from './dom';

export interface CatBubbleOptions {
  character: CatCharacter;
  mood?: CatMood;
  name?: string;
  text: string;
  /** 對話框喺貓貓左邊定右邊（預設對話框喺右） */
  side?: 'left' | 'right';
  small?: boolean;
  testId?: string;
  extraClass?: string;
}

const DEFAULT_NAMES: Record<CatCharacter, string> = {
  amo: '阿墨',
  dango: '糰子',
};

export function catBubbleHtml(options: CatBubbleOptions): string {
  const mood = options.mood ?? 'idle';
  const name = options.name ?? DEFAULT_NAMES[options.character];
  const classes = ['cat-bubble'];
  if (options.side === 'right') classes.push('cat-bubble--right');
  if (options.small) classes.push('cat-bubble--sm');
  if (options.extraClass) classes.push(options.extraClass);

  return `
    <div class="${classes.join(' ')}"${
      options.testId ? ` data-testid="${esc(options.testId)}"` : ''
    }>
      <div class="cat-bubble__cat" aria-hidden="true">
        ${catSVG(options.character, mood, { className: `cat-bubble-cat cat-${options.character}` })}
      </div>
      <div class="cat-bubble__body">
        <span class="cat-bubble__name">${esc(name)}</span>
        <p class="cat-bubble__text">${esc(options.text)}</p>
      </div>
    </div>
  `;
}
