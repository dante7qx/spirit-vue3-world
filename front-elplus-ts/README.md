
## Vue 3 + TypeScript + Vite + Element Plus

使用了 Vue 3 的 `<script setup>` 单文件组件（SFC）和 TypeScript 进行开发。
- **项目结构**
```markdown
front-elplus-ts/
├── src/
│   ├── components/
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
└── tsconfig.json
```


- **启动方式**
```bash
cd front-elplus-ts
pnpm install
pnpm run dev
```

- **项目依赖**
```bash
# 自动导入插件
# unplugin-auto-import，自动导入常用函数、API，无需 import { ref, computed } from 'vue'
# unplugin-vue-components，自动导入 Vue 组件，无需 import { ElButton } from 'element-plus'
pnpm add -D unplugin-auto-import unplugin-vue-components

# UI 框架
pnpm add element-plus

# 路由
pnpm add vue-router@4

# 状态管理
pnpm add pinia

# http 请求
pnpm add axios
```

- `vite.config.ts`
```Typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
          imports: ['vue', 'vue-router'],
          resolvers: [ElementPlusResolver()],
      }),
      Components({
          resolvers: [ElementPlusResolver()],
      }),
  ],
})
```
- **环境变量与模式**
```md
# .env 加载顺序
.env.[mode].local > .env.[mode] > .env.local > .env

# .env[local] 不会加入到 git 版本控制中
```

- `package.json`
```json
"scripts": {
    "dev": "vite",                // 默认走 .env 或 .env.development
    "build": "vue-tsc -b && vite build",  // 默认走 .env.production
    "build:staging": "vite build --mode staging",  // 会加载 .env.staging 文件
    "preview": "vite preview"
}
```

- **配置反向代理 - vite.config.ts**
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

- **命名规范**

| 项目结构 / 内容                 | 命名风格                        | 示例                                        | 说明                  |
| ------------------------- | --------------------------- | ----------------------------------------- | ------------------- |
| 📁 目录名（业务模块）              | `kebab-case`                | `user-auth/`、`product-list/`              | 模块目录，统一小写中划线        |
| 📄 文件名（TS/JS/Vue）         | `kebab-case`                | `menu.ts`、`user-auth.ts`、`login-form.vue` | 保持与模块一致，清晰易读        |
| 📄 类型定义文件名（types/）        | `kebab-case`                | `menu.ts`、`user-auth.ts`                  | 同模块名一一对应            |
| 📄 接口请求文件名（api/）          | `kebab-case`                | `user-auth.ts`、`order.ts`                 | 与 `types/` 保持一致     |
| 📄 组件文件名（组件/页面）           | `PascalCase`                | `LoginForm.vue`、`UserCard.vue`            | 组件名采用大驼峰 PascalCase |
| 🔤 组件名（`<MyComponent />`） | `PascalCase`                | `<UserCard />`、`<LoginForm />`            | 与文件名一致              |
| 🧩 变量名 / 函数名              | `camelCase`                 | `getMenus()`、`userInfo`                   | JavaScript 标准命名     |
| 🔠 类型 / 接口名               | `PascalCase`                | `UserInfo`、`LoginForm`                    | TypeScript 标准       |
| 🧪 枚举名 / 枚举成员             | `PascalCase` / `UPPER_CASE` | `UserRole.ADMIN`                          | 枚举名大驼峰，值全大写         |
| 📦 环境变量名                  | `UPPER_SNAKE_CASE`          | `VITE_API_BASE_URL`                       | `.env` 文件标准         |

### vue-i18n

国际化插件，支持多语言切换。
- **安装**
```bash
pnpm add vue-i18n@11
```
- **配置**
```Typescript
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages, // 语言包
})
export default i18n
```
- **使用**
```Typescript
// src/App.vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <h1>{{ t('hello') }}</h1>
</template>
```