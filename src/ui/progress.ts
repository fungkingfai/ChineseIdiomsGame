/** 進度條。 */

export interface ProgressOptions {
  /** 0–1 */
  value: number;
  ariaLabel?: string;
  jade?: boolean;
}

export function progressHtml(options: ProgressOptions, className = ''): string {
  const value = Math.max(0, Math.min(1, Number.isFinite(options.value) ? options.value : 0));
  const percent = Math.round(value * 1000) / 10;
  const label = options.ariaLabel ?? `進度 ${Math.round(percent)}%`;
  return `
    <div class="progress${options.jade ? ' progress--jade' : ''}${className ? ` ${className}` : ''}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(
      percent,
    )}" aria-label="${label}">
      <div class="progress__fill" style="width: ${percent}%"></div>
    </div>
  `;
}
