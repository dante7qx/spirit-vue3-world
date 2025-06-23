import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  base: '/', // 根路径
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',          // ref, reactive, computed 等
        'vue-router'    // useRoute, useRouter, useLink, createRouter, createWebHistory 等
      ],
      resolvers: [NaiveUiResolver()],
      dts: 'src/auto-imports.d.ts',             // IDE 识别类型声明文件
    }),
    Components({
      dirs: ['src/components', 'src/views'],    // 自动扫描目录
      resolvers: [NaiveUiResolver()],
      dts: 'src/components.d.ts',               // IDE 识别组件类型
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
