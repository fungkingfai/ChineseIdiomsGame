/** 偏好設定：音效、減少動態效果。所有寫入都會經 core/progress 持久化。 */

import type { AppContext } from '../core/context';
import { updateSettings } from '../core/progress';
import { prefersReducedMotionQuery } from './dom';
import type { SfxName } from '../core/audio';

/** 系統設定或遊戲設定任何一個要求減少動態 → 都當作減少動態。 */
export function effectiveReducedMotion(ctx: AppContext): boolean {
  return ctx.save.settings.reducedMotion || prefersReducedMotionQuery();
}

/** 套用 `html.reduced-motion` class，回傳最後是否 reduced。 */
export function applyMotionPreference(ctx: AppContext): boolean {
  const reduced = effectiveReducedMotion(ctx);
  document.documentElement.classList.toggle('reduced-motion', reduced);
  return reduced;
}

export function setSoundEnabled(ctx: AppContext, enabled: boolean): void {
  updateSettings(ctx.save, { sound: enabled });
  ctx.audio.setEnabled(enabled);
}

/** toggle 音效，回傳新狀態。 */
export function toggleSoundEnabled(ctx: AppContext): boolean {
  const next = !ctx.save.settings.sound;
  setSoundEnabled(ctx, next);
  return next;
}

export function setReducedMotionEnabled(ctx: AppContext, enabled: boolean): boolean {
  updateSettings(ctx.save, { reducedMotion: enabled });
  return applyMotionPreference(ctx);
}

export function playSfx(ctx: AppContext, name: SfxName): void {
  try {
    ctx.audio.play(name);
  } catch {
    /* 音效失敗不影響遊戲 */
  }
}

export function scrollBehavior(ctx: AppContext): ScrollBehavior {
  return effectiveReducedMotion(ctx) ? 'auto' : 'smooth';
}
