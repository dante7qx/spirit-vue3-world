/// <reference types="vite/client" />

/**
 * TypeScript 项目中用来声明 .vue 文件模块类型
 * 1. 引入 .vue 文件时，TS 会把每个 .vue 文件当成是一个 Vue 组件模块
 * 2. 把每个 .vue 文件视为 DefineComponent<{}, {}, any> 类型
 * 3. 提供了最基础的类型支持，IDE 可以推断出你 import xxx from './MyComponent.vue' 是个 Vue 组件
 */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}