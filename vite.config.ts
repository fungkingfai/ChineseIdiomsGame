import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5280,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4280,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: false,
    assetsInlineLimit: 8192,
    // 733 條成語＋200 關＋20 場景嘅 inline 資料，單一 chunk 約 700 kB（gzip ~200 kB）
    chunkSizeWarningLimit: 900,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
