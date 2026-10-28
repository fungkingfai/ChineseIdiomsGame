/** 成語卡（結算、圖鑑詳情共用）。 */

import type { Idiom } from '../core/types';
import { esc } from './dom';
import { icon } from './icons';

/** 安全讀取粵拼（資料未 ready 時 cantonese 可能係 undefined）。 */
export function jyutpingOf(idiom: Idiom): string {
  const value = (idiom.cantonese ?? '') as string;
  return typeof value === 'string' ? value.trim() : '';
}

export interface IdiomCardOptions {
  testId?: string;
  compact?: boolean;
  /** 顯示「已收入圖鑑」印 */
  collected?: boolean;
  /** 顯示「新收集」徽章 */
  isNew?: boolean;
  extraClass?: string;
}

export function idiomCardHtml(idiom: Idiom, options: IdiomCardOptions = {}): string {
  const classes = ['idiom-card'];
  if (options.compact) classes.push('idiom-card--compact');
  if (options.extraClass) classes.push(options.extraClass);

  const meta: string[] = [];
  if (idiom.origin) {
    meta.push(`<div><dt>出處</dt><dd>${esc(idiom.origin)}</dd></div>`);
  }
  if (idiom.sourceBook) {
    meta.push(`<div><dt>典籍</dt><dd>${esc(idiom.sourceBook)}</dd></div>`);
  }
  if (idiom.example) {
    meta.push(`<div><dt>例句</dt><dd>${esc(idiom.example)}</dd></div>`);
  }

  const tags =
    idiom.tags && idiom.tags.length > 0
      ? `<div class="idiom-card__tags">${idiom.tags
          .map((tag) => `<span class="idiom-card__tag">${esc(tag)}</span>`)
          .join('')}</div>`
      : '';

  const badge = options.isNew
    ? '<span class="idiom-card__collected">新收集</span>'
    : options.collected
      ? `<span class="idiom-card__collected">${icon.check} 已收集</span>`
      : '';

  const jyutping = jyutpingOf(idiom);
  const pronRows = `
    <div class="idiom-card__pron">
      <p class="idiom-card__pinyin" aria-label="普通話拼音：${esc(idiom.pinyin)}">
        <span class="pron-badge" aria-hidden="true">普</span><span class="pron-text">${esc(
          idiom.pinyin,
        )}</span>
      </p>
      ${
        jyutping
          ? `<p class="idiom-card__pinyin idiom-card__pinyin--jyut" data-testid="result-idiom-jyutping-${
              idiom.id
            }" aria-label="粵拼：${esc(jyutping)}">
        <span class="pron-badge pron-badge--jyut" aria-hidden="true">粵</span><span class="pron-text">${esc(
          jyutping,
        )}</span>
      </p>`
          : ''
      }
    </div>
  `;

  return `
    <article class="${classes.join(' ')}"${
      options.testId ? ` data-testid="${esc(options.testId)}"` : ''
    }>
      ${badge}
      <h3 class="idiom-card__word">${esc(idiom.word)}</h3>
      ${pronRows}
      <p class="idiom-card__meaning">${esc(idiom.meaning)}</p>
      ${meta.length > 0 ? `<dl class="idiom-card__meta">${meta.join('')}</dl>` : ''}
      ${tags}
    </article>
  `;
}
