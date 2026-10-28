import idiomsRaw from './idioms.json';
import levelsRaw from './levels.json';
import chaptersRaw from './chapters.json';
import type { Chapter, Idiom, Level } from '../core/types';

export const idioms = idiomsRaw as unknown as Idiom[];
export const levels = levelsRaw as unknown as Level[];
export const chapters = chaptersRaw as unknown as Chapter[];

export const idiomById = new Map<string, Idiom>(idioms.map((idiom) => [idiom.id, idiom]));

export const TOTAL_LEVELS = levels.length;

export function getLevel(id: number): Level | undefined {
  return levels.find((level) => level.id === id);
}

export function getIdiom(id: string): Idiom | undefined {
  return idiomById.get(id);
}

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getChapterForLevel(levelId: number): Chapter | undefined {
  const level = getLevel(levelId);
  return level ? getChapter(level.chapter) : undefined;
}

/** 每章關卡（依章節分組） */
export function levelsByChapter(): Map<number, Level[]> {
  const map = new Map<number, Level[]>();
  for (const chapter of chapters) map.set(chapter.id, []);
  for (const level of levels) {
    const list = map.get(level.chapter) ?? [];
    list.push(level);
    map.set(level.chapter, list);
  }
  return map;
}
