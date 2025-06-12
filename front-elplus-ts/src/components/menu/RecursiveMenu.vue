<script setup lang="ts">
import { loadIcon } from '@/utils/spirit'
import type { MenuItem } from "@/types/components/menu.ts"

// 递归组件必须有明确的组件名，除非文件名和组件名完全对应。（推荐显式指定）
defineOptions({
  name: 'RecursiveMenu'
})

defineProps<{
  menus: MenuItem[],
  parentPath?: string
}>()

const normalizePath = (...paths: Array<string | undefined>) => {
  const path = paths
      .filter((path): path is string => path !== undefined && path !== '')
      .join('/')
      .replace(/\/+/g, '/') // 去除重复斜杠
      .replace(/\/$/, '');  // 去除末尾斜杠
  return path  === '' ? '/' : path
}

</script>

<!-- 递归菜单树组件 -->
<template>
  <template v-for="(menu, idx) in menus">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path ?? ''" :key="`p_${idx}`">
      <template #title>
        <el-icon><component :is="loadIcon(menu.icon ?? 'Menu')" /></el-icon>
        <span>{{ $t(menu.title as string) }}</span>
      </template>
      <recursive-menu :menus="menu.children" :parent-path="menu.path"/>
    </el-sub-menu>
    <el-menu-item v-else :index="normalizePath(parentPath, menu.path)" :key="`c_${idx}`">
      <el-icon><component :is="loadIcon(menu.icon ?? 'Menu')" /></el-icon>
      <span>{{ $t(menu.title as string) }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped>

</style>