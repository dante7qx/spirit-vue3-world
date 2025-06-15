# Vue 3 + TypeScript + Vite + Ant Design Vue

这是一个使用 Vue 3、TypeScript 和 Vite 构建的 Web 应用程序，并使用了 Ant Design Vue 组件库。
## 项目结构
```markdown
front-ant-design-ts/
├── src/
│   ├── components/
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
└── tsconfig.json
```
## 启动方式
```bash
cd front-ant-design-ts
pnpm install
pnpm run dev
```
## 项目依赖
```bash
# 自动导入插件
# unplugin-auto-import，自动导入常用函数、API, 无需 import { ref, computed } from 'vue'
# unplugin-vue-components，自动导入 Vue 组件，无需 import { ElButton } from 'naive-ui'
pnpm add -D unplugin-auto-import unplugin-vue-components
# 类型声明
pnpm add -D @types/node
# UI 框架
pnpm add ant-design-vue@4.x
# 路由
pnpm add vue-router@4
# 状态管理
pnpm add pinia
# http 请求
pnpm add axios
