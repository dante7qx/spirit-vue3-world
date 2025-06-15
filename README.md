## Vue3 + TS + Vite

本示例项目基于 Vue3 + TS + Vite， 用于学习 Vue3、 TypeScript、 Vite、 pnpm。并且会去尝试不同的`UI`框架。

### 一. Vue3 

#### 1. Composition API
```md
created() { loadData() } === <script setup lang="ts"> loadData() </script>

vue3 推荐使用
onMounted(() => {})
```

### 二. TypeScript

- 学习资料：
- <a href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html" target="_blank">TypeScript 官网</a>
- <a href="https://ts.xcatliu.com/" target="_blank">入门教程</a>

### 三. Vite & pnpm

- <a href="https://cn.vite.dev/" target="_blank">Vite</a>

Vite 是一个由 Evan You（Vue.js 作者）主导开发的前端构建工具，它的目标是提供更快、更轻量的开发体验，尤其适用于现代前端框架如 Vue、React 等。
使用 Rollup 作为生产构建工具，结合 esbuild 的预构建能力，实现高效打包、Tree Shaking、代码分割等优化。
```bash
# 创建项目, 创建一个名为 my-app-name 的新目录, 并使用 Vue3 + TypeScript 模板
pnpm create vite my-app-name --template vue-ts
```

- pnpm

pnpm (pnpm = performant npm) 是一个高性能的 JavaScript 包管理器，功能类似于 npm 和 yarn，但在性能、磁盘空间利用和一致性方面有显著优势。

- 创建项目

```bash
# 使用 pnpm 调用 create-vite 脚手架工具, 创建一个名为 my-vue-app 的新目录, 并使用 Vue3 + TypeScript 模板
pnpm create vite my-vue-app --template vue-ts
```

- [Pinia](https://pinia.vuejs.org/zh)

Pinia 是一个用于 Vue 的状态管理库，由 Vue 官方团队成员开发并维护。它旨在提供一个更简单、更直观的 API 来替代 Vuex（Vue 的官方状态管理库），特别是在 Vue 3 中使用时。Pinia 提供了模块化设计，允许你轻松地组织和共享应用中的状态，并且支持 TypeScript。

```bash
# 安装 Pinia
pnpm add pinia
# 安装持久化插件
pnpm add pinia-plugin-persistedstate

# main.ts 中配置
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) 
app.use(pinia)
```
