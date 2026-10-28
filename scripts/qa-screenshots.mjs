#!/usr/bin/env node
/**
 * npm run shots — 生成《貓咪成語大冒險》QA 截圖。
 *
 * 截圖由 `e2e/run.mjs` 全程流程自動產生（真實遊玩、過關、圖鑑、設定、overlay），
 * 呢個 script 只係一個薄 wrapper：執行 E2E 流程（預設會 build＋預覽＋桌面＋手機），
 * 然後列出 `screenshots/` 成果同尺寸，方便 QA／Lead 一鍵出圖。
 *
 * 用法：
 *   npm run shots                     # 完整 E2E 流程＋截圖（約 40 秒）
 *   E2E_SKIP_BUILD=1 npm run shots    # 用現有 dist/，唔重新 build
 *   E2E_ONLY=desktop npm run shots    # 只截桌面
 *   E2E_ONLY=mobile npm run shots     # 只截手機
 *
 * 任何 E2E 斷言失敗會照樣保留已產生嘅截圖，但 script 會以非 0 結束。
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCREENSHOT_DIR = resolve(ROOT, 'screenshots');

/** 由 PNG header 讀尺寸（唔使圖片庫） */
function pngSize(file) {
  try {
    const buffer = readFileSync(file);
    if (buffer.length < 24 || buffer.readUInt32BE(12) !== 0x49484452) return null;
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  } catch {
    return null;
  }
}
import { readFileSync } from 'node:fs';

function listScreenshots() {
  if (!existsSync(SCREENSHOT_DIR)) return [];
  return readdirSync(SCREENSHOT_DIR)
    .filter((name) => name.endsWith('.png'))
    .sort()
    .map((name) => {
      const path = join(SCREENSHOT_DIR, name);
      const size = statSync(path).size;
      const dimensions = pngSize(path);
      return {
        name,
        bytes: size,
        dimensions: dimensions ? `${dimensions.width}×${dimensions.height}` : '?',
      };
    });
}

function main() {
  console.log('');
  console.log('《貓咪成語大冒險》截圖生成（npm run shots）');
  console.log('─'.repeat(64));
  console.log('• 執行 E2E 流程（真實遊玩＋截圖），環境變數 E2E_* 會轉發 …');

  const result = spawnSync(process.execPath, [join('e2e', 'run.mjs')], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  });

  const shots = listScreenshots();
  console.log('');
  console.log('─'.repeat(64));
  console.log(`截圖目錄：screenshots/（${shots.length} 張）`);
  let total = 0;
  for (const shot of shots) {
    total += shot.bytes;
    console.log(`  ${shot.name.padEnd(28)} ${shot.dimensions.padStart(10)}  ${(shot.bytes / 1024).toFixed(0)} KB`);
  }
  console.log(`合計：${shots.length} 張、${(total / 1024 / 1024).toFixed(1)} MB`);
  console.log('─'.repeat(64));

  if (result.status !== 0) {
    console.error('⚠ E2E 流程有失敗（截圖已保留，請睇上面錯誤）；以非 0 結束。');
    process.exitCode = result.status ?? 1;
  } else if (shots.length === 0) {
    console.error('❌ 冇生成任何截圖。');
    process.exitCode = 1;
  } else {
    console.log('✅ 截圖生成完成。');
  }
}

main();
