#!/usr/bin/env node
/**
 * QA：靜態檢查 PLAN §7.4 要求嘅 data-testid 契約有冇喺 src/ 實作。
 * 互補 E2E（E2E 會動態驗證實際存在同可點擊），呢個 script 可以喺 UI 改動後快速
 * 發現「testid 唔見咗／改咗名」，唔需要開瀏覽器。
 *
 * 用法：node scripts/qa-testids.mjs [--json]
 * 退出碼：0 = 全部 testid 齊；1 = 有缺失。
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = resolve(ROOT, 'src');

/** PLAN §7.4：固定 testid（必須逐個存在） */
const REQUIRED_EXACT = [
  // 首頁
  'home-screen', 'home-start', 'home-continue', 'home-codex', 'home-settings', 'home-progress',
  // 地圖
  'map-screen', 'map-back', 'map-stars-total',
  // 遊戲
  'game-screen', 'game-back', 'game-title',
  'hint-btn', 'hint-count', 'restart-btn', 'sound-btn', 'mistake-count',
  // 過關
  'result-overlay', 'result-stars', 'next-level-btn', 'retry-btn', 'result-map-btn',
  // 教學／章節故事
  'tutorial-overlay', 'tutorial-ok', 'chapter-intro', 'chapter-intro-ok',
  // 圖鑑
  'codex-screen', 'codex-search', 'codex-count', 'codex-detail',
  // 設定
  'settings-screen', 'settings-sound', 'settings-motion',
  'settings-reset', 'reset-confirm', 'reset-cancel', 'settings-back',
];

/** PLAN §7.4：動態 testid（前綴＋參數格式） */
const REQUIRED_DYNAMIC = [
  { prefix: 'chapter-', template: 'chapter-<chapterId>' },
  { prefix: 'level-btn-', template: 'level-btn-<levelId>' },
  { prefix: 'cell-', template: 'cell-<r>-<c>' },
  { prefix: 'bank-', template: 'bank-<index>' },
  { prefix: 'result-idiom-', template: 'result-idiom-<idiomId>' },
  { prefix: 'codex-item-', template: 'codex-item-<idiomId>' },
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(name)) files.push(full);
  }
  return files;
}

/** 由 src 原始碼抽所有 testid 字串（靜態＋template literal） */
function extractTestIds() {
  const ids = new Map(); // id/pattern → file
  const add = (value, file) => {
    if (!value) return;
    const normalized = value.replace(/\s+/g, ' ').trim();
    if (!ids.has(normalized)) ids.set(normalized, file);
  };
  for (const file of walk(SRC_DIR)) {
    const text = readFileSync(file, 'utf8');
    const rel = relative(ROOT, file);
    // data-testid="..." / data-testid=`...`
    for (const match of text.matchAll(/data-testid="([^"]+)"/g)) add(match[1], rel);
    for (const match of text.matchAll(/data-testid=`([^`]+)`/g)) add(match[1], rel);
    // element.dataset.testid = `...`
    for (const match of text.matchAll(/dataset\.testid\s*=\s*`([^`]+)`/g)) add(match[1], rel);
    for (const match of text.matchAll(/dataset\.testid\s*=\s*'([^']+)'/g)) add(match[1], rel);
    // openOverlay({ testId: '...' }) / idiomCardHtml(..., { testId: `...` })
    for (const match of text.matchAll(/testId:\s*'([^']+)'/g)) add(match[1], rel);
    for (const match of text.matchAll(/testId:\s*`([^`]+)`/g)) add(match[1], rel);
    // confirmDialog({ confirmTestId: 'reset-confirm', cancelTestId: 'reset-cancel' })
    for (const match of text.matchAll(/confirmTestId:\s*'([^']+)'/g)) add(match[1], rel);
    for (const match of text.matchAll(/cancelTestId:\s*'([^']+)'/g)) add(match[1], rel);
  }
  return ids;
}

function main() {
  const json = process.argv.slice(2).includes('--json');
  const found = extractTestIds();
  const missing = [];
  const resolved = [];

  for (const id of REQUIRED_EXACT) {
    if (found.has(id)) {
      resolved.push({ testid: id, file: found.get(id), dynamic: false });
    } else {
      missing.push({ testid: id, template: id, dynamic: false });
    }
  }
  for (const item of REQUIRED_DYNAMIC) {
    // 優先揀 template literal（含 ${...}）嘅動態 testid，避免撞到同前綴嘅固定 testid
    const hit =
      [...found.entries()].find(([id]) => id.startsWith(item.prefix) && id.includes('${')) ??
      [...found.entries()].find(([id]) => id.startsWith(item.prefix));
    if (hit) {
      resolved.push({ testid: hit[0], file: hit[1], dynamic: true, template: item.template });
    } else {
      missing.push({ testid: item.prefix, template: item.template, dynamic: true });
    }
  }

  const payload = {
    script: 'qa-testids',
    ok: missing.length === 0,
    requiredCount: REQUIRED_EXACT.length + REQUIRED_DYNAMIC.length,
    resolvedCount: resolved.length,
    totalTestIdsFound: found.size,
    missing,
    resolved,
  };

  if (json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log('《貓咪成語大冒險》testid 契約靜態檢查（PLAN §7.4）');
    console.log('─'.repeat(64));
    for (const item of resolved) {
      const kind = item.dynamic ? '動態' : '固定';
      console.log(`  ✓ ${item.testid.padEnd(20)} [${kind}] ← ${item.file}`);
    }
    for (const item of missing) {
      console.log(`  ✗ 缺少 ${item.template}（前綴 ${item.testid}）`);
    }
    console.log('─'.repeat(64));
    console.log(
      `結果：${payload.resolvedCount}/${payload.requiredCount} 項 testid 齊全（掃到 ${payload.totalTestIdsFound} 個 testid 字串）`,
    );
    console.log(payload.ok ? '✅ PASS' : '❌ FAIL');
  }
  if (!payload.ok) process.exitCode = 1;
}

main();
