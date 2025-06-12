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

/**
 * 类型声明 $t 函数
 * 使用了 pinia 后，组件中的 $t()（来自 vue-i18n）在 IDE（如 VSCode）中报错，因为 TypeScript 无法识别 $t 是全局属性，除非你为它声明类型
 *
 */
import 'vue'
import {i18n} from '@/locales/index.ts'
declare module 'vue' {
    interface ComponentCustomProperties {
        $t: typeof i18n.global.t
        $i18n: typeof i18n.global
    }
}