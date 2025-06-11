## 目标
创建一个纯净、不依赖框架的 TypeScript 学习项目，具备：

1. 清晰的 src/dist 目录结构。
2. 配置好的 TypeScript 编译器。
3. 使用 pnpm 管理依赖。
4. 高效的实时编译和运行流程。

```bash
cd typescript-practice
pnpm init
pnpm add -D typescript

# 配置 TypeScript 编译器
# 1. 生成 tsconfig.json 文件
pnpm tsc --init
# 2. 修改 tsconfig.json (最简配置)
"compilerOptions": {
    /* 基本选项 */
    "target": "ES2016",
    "module": "commonjs",
    
    /* 路径相关 */
    "outDir": "./dist",
    "rootDir": "./src",
    
    /* 严格类型检查选项 */
    "strict": true,
    
    /* 模块解析选项 */
    "esModuleInterop": true,
    
    /* 高级选项 */
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
}

# 3.创建目录结构
mkdir src
touch src/index.ts

# 4. 编译和运行
pnpm exec tsc
node dist/index.js

# 5. 优化开发流程, 使用 ts-node 和 nodemon 实现自动化
pnpm add -D ts-node nodemon

# 6. 配置 packjson.json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node dist/index.js",
  "build": "tsc",
  "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts"
}

# 7. 启动开发模式
pnpm dev
```