import type { Chapter, Idiom, Level, SaveData } from './types';
import type { AudioManager } from './audio';

/**
 * 全域 AppContext：由 main.ts 建立後傳入 mountApp。
 * UI 只透過呢個物件讀資料、存進度、播音效。
 */
export interface AppContext {
  idioms: Idiom[];
  levels: Level[];
  chapters: Chapter[];
  save: SaveData;
  /** 將 ctx.save 寫入 localStorage */
  persist(): void;
  audio: AudioManager;
}
