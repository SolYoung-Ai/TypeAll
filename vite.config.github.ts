import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages 专用构建配置（项目站点，子路径 /personality-hub/）
// 不包含妙搭的 miaodaOutputPlugin / sparkJsonPlugin，输出标准 dist
const basePath = process.env.MIAODA_CLIENT_BASE_PATH || '/personality-hub/';
const cdnPrefix = process.env.MIAODA_RESOURCE_CDN_PREFIX;

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? cdnPrefix || basePath : '/',
  define: {
    // 路由 basename 与资源前缀保持与 vite base 一致
    'import.meta.env.MIAODA_CLIENT_BASE_PATH': JSON.stringify(basePath),
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
}));
