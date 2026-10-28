/**
 * 全站共用型別契約（Lead 擁有，勿隨意改名）。
 * Data files: src/data/idioms.json, src/data/chapters.json, src/data/levels.json
 */

export type IdiomTier = 1 | 2 | 3 | 4 | 5;

/** 成語資料（idioms.json 的每一筆） */
export interface Idiom {
  /** kebab-case 拼音（無聲調），全站唯一，例如 ri-xing-qian-li */
  id: string;
  /** 四字成語（繁體中文，正好 4 個漢字） */
  word: string;
  /** 漢語拼音（帶聲調，音節以空格分隔），例如 rì xíng qiān lǐ */
  pinyin: string;
  /** 粵拼（香港語言學學會 Jyutping，帶聲調數字），音節以空格分隔，例如 jat1 nok6 cin1 gam1 */
  cantonese: string;
  /** 釋義（繁體中文，15–60 字，適合小學生至中學生理解） */
  meaning: string;
  /** 出處說明（原文書名＋簡述，15–90 字） */
  origin: string;
  /** 出處典籍，例如《史記·項羽本紀》 */
  sourceBook?: string;
  /** 例句（可選） */
  example?: string;
  /** 難度：1 = 小學常識，5 = 較冷僻 */
  tier: IdiomTier;
  /** 分類標籤（可選，例如 動物、自然、人物、學習、情感） */
  tags?: string[];
}

export type SlotDir = 'h' | 'v';
export type LevelMode = 'fill' | 'chain';

/** 棋盤上一個成語的欄位。blanks = 該成語第 1–4 個字之中要玩家填的位置（0-based）。 */
export interface Slot {
  idiomId: string;
  /** 起始列（0-based） */
  row: number;
  /** 起始欄（0-based） */
  col: number;
  dir: SlotDir;
  blanks: number[];
}

/** 棋盤格（解答字）。填字關兩個成語交叉時，該格只有一個解答字。 */
export interface LevelCell {
  r: number;
  c: number;
  char: string;
}

/** 一關資料（levels.json 的每一筆） */
export interface Level {
  /** 1–100，連續且唯一 */
  id: number;
  /** 1–10 */
  chapter: number;
  mode: LevelMode;
  /** 關卡標題（繁中，例如「第一課：畫中有話」） */
  title: string;
  /** 貓貓小故事／情境（繁中，1–2 句） */
  story: string;
  rows: number;
  cols: number;
  /** 解答格，每個有字的格都要列出 */
  cells: LevelCell[];
  /** 2–4 個（fill）或 3–6 個（chain）成語 */
  slots: Slot[];
  /** 字庫（multiset，依序排列；包含所有空格所需字＋誘餌字） */
  bank: string[];
  /** 可用提示次數 */
  hintLimit: number;
}

/** 章節（chapters.json，固定 10 章） */
export interface Chapter {
  id: number;
  /** 章節名稱，例如「櫻花小徑」 */
  name: string;
  /** 場景 key：garden | bamboo | moon | snow | sea | stars | festival | rain | cloud | summit */
  scene: string;
  /** 章節故事簡介（繁中，1–2 句） */
  blurb: string;
  /** 章節代表色（CSS 色值，可選） */
  accent?: string;
}

/* ------------------------------------------------------------------ */
/* 存檔 / 進度                                                         */
/* ------------------------------------------------------------------ */

export interface LevelRecord {
  stars: number;
  mistakes: number;
  hints: number;
  clearedAt: number;
}

export interface Settings {
  sound: boolean;
  reducedMotion: boolean;
}

export interface SaveData {
  version: number;
  /** levelId（字串）→ 過關紀錄 */
  levels: Record<string, LevelRecord>;
  /** 已收集成語 id */
  collected: string[];
  settings: Settings;
  /** 已看過章節故事的章節 id */
  seenChapters: number[];
  /** 是否看過新手教學 */
  tutorialSeen: boolean;
}

/* ------------------------------------------------------------------ */
/* 遊戲引擎狀態                                                        */
/* ------------------------------------------------------------------ */

export type CellSource = 'given' | 'word' | 'hint';

export interface CellState {
  char: string;
  locked: boolean;
  source: CellSource;
  /** 玩家由字庫放入時，記錄字庫索引（用於退回字卡） */
  bankIndex?: number;
}

export interface WordState {
  slotIndex: number;
  slot: Slot;
  cells: string[];
  locked: boolean;
}

export interface GameState {
  level: Level;
  cells: Record<string, CellState>;
  words: WordState[];
  mistakes: number;
  hintsUsed: number;
  solved: boolean;
  stars: number;
}

export type GameEvent =
  | { type: 'place'; key: string; char: string }
  | { type: 'word-correct'; slotIndex: number; idiomId: string; cells: string[] }
  | {
      type: 'word-wrong';
      slotIndex: number;
      idiomId: string;
      cells: string[];
      mistakes: number;
    }
  | { type: 'hint'; key: string; char: string }
  | { type: 'solved'; stars: number };
