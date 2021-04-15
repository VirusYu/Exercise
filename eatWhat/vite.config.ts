import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {},
  server: {
    port: 8080,
    open: true
  },
  base: './', // 生产环境下的公共路径
  build: {
    outDir: 'dist' // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
  },
})
