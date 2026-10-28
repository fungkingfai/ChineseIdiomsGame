#!/usr/bin/env node
/**
 * 一次過跑成語＋關卡資料驗證（部署前檢查用）。
 * 用法：npm run verify:data
 */
import { spawnSync } from 'node:child_process';

const scripts = ['scripts/verify-idioms.mjs', 'scripts/verify-levels.mjs'];
let failed = false;

for (const script of scripts) {
  console.log(`\n=== node ${script} ===`);
  const result = spawnSync(process.execPath, [script], { stdio: 'inherit' });
  if (result.status !== 0) failed = true;
}

if (failed) {
  console.error('\n❌ 資料驗證有項目失敗');
  process.exit(1);
}
console.log('\n✅ 成語及關卡資料驗證全部通過');
