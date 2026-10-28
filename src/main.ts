import './styles/index.css';
import './styles/cats.css';
import { chapters, idioms, levels } from './data/index';
import { audio } from './core/audio';
import { loadProgress, saveProgress } from './core/progress';
import { mountApp } from './app';
import type { AppContext } from './core/context';

const root = document.getElementById('app');
if (!root) throw new Error('#app not found');

const save = loadProgress();
audio.setEnabled(save.settings.sound);

const ctx: AppContext = {
  idioms,
  levels,
  chapters,
  save,
  persist: () => saveProgress(ctx.save),
  audio,
};

mountApp(root, ctx);

// 測試／除錯用：只有 ?debug=1 才暴露資料，方便 E2E 讀取正解。
if (new URLSearchParams(window.location.search).has('debug')) {
  (window as unknown as Record<string, unknown>).__CAT_IDIOM_DEBUG__ = {
    version: 1,
    levels,
    idioms,
    chapters,
    getSave: () => loadProgress(),
  };
}
