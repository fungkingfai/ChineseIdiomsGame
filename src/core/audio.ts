/**
 * 輕量 WebAudio 音效合成器：無外部音檔、無網路請求。
 * 首次使用者互動時由 UI 呼叫 audio.init()（瀏覽器要求手勢解鎖）。
 */

export type SfxName =
  | 'click'
  | 'place'
  | 'correct'
  | 'wrong'
  | 'hint'
  | 'clear'
  | 'star'
  | 'flip';

type Note = { freq: number; dur: number; when?: number; type?: OscillatorType; gain?: number };

const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0];
const SFX: Record<SfxName, Note[]> = {
  click: [{ freq: 523.25, dur: 0.06, type: 'sine', gain: 0.12 }],
  flip: [{ freq: 392.0, dur: 0.06, type: 'triangle', gain: 0.1 }],
  place: [{ freq: 440.0, dur: 0.09, type: 'triangle', gain: 0.12 }],
  correct: [
    { freq: 659.25, dur: 0.12, type: 'sine', gain: 0.14 },
    { freq: 783.99, dur: 0.16, when: 0.08, type: 'sine', gain: 0.14 },
  ],
  wrong: [
    { freq: 196.0, dur: 0.16, type: 'sawtooth', gain: 0.09 },
    { freq: 146.83, dur: 0.2, when: 0.12, type: 'sawtooth', gain: 0.08 },
  ],
  hint: [
    { freq: 880.0, dur: 0.08, type: 'sine', gain: 0.12 },
    { freq: 1174.66, dur: 0.12, when: 0.06, type: 'sine', gain: 0.1 },
  ],
  star: [
    { freq: 1046.5, dur: 0.1, type: 'sine', gain: 0.1 },
    { freq: 1318.5, dur: 0.14, when: 0.07, type: 'sine', gain: 0.09 },
  ],
  clear: [
    { freq: 523.25, dur: 0.14, type: 'sine', gain: 0.13 },
    { freq: 659.25, dur: 0.14, when: 0.12, type: 'sine', gain: 0.13 },
    { freq: 783.99, dur: 0.14, when: 0.24, type: 'sine', gain: 0.13 },
    { freq: 1046.5, dur: 0.3, when: 0.36, type: 'sine', gain: 0.14 },
  ],
};

export class AudioManager {
  private ctx: AudioContext | null = null;
  enabled = true;

  init(): void {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      try {
        this.ctx = new Ctor();
      } catch {
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => undefined);
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (enabled) this.init();
  }

  play(name: SfxName): void {
    if (!this.enabled) return;
    this.init();
    const ctx = this.ctx;
    if (!ctx) return;
    const notes = SFX[name];
    if (!notes) return;
    const base = ctx.currentTime + 0.01;
    for (const note of notes) {
      const start = base + (note.when ?? 0);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = note.type ?? 'sine';
      osc.frequency.setValueAtTime(note.freq, start);
      const peak = note.gain ?? 0.1;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + note.dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + note.dur + 0.02);
    }
  }

  /** 過關小旋律（比 clear 更長） */
  fanfare(): void {
    if (!this.enabled) return;
    this.init();
    const ctx = this.ctx;
    if (!ctx) return;
    const melody = [523.25, 659.25, 783.99, 1046.5, 880.0, 1046.5];
    melody.forEach((freq, index) => {
      const start = ctx.currentTime + 0.01 + index * 0.14;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.13, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.36);
    });
  }
}

export { PENTATONIC };

export const audio = new AudioManager();
