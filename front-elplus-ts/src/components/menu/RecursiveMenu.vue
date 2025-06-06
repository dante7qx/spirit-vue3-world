<script setup lang="ts">
import { loadIcon } from '@/utils/spirit'
import type { MenuItem } from "@/types/menu.ts";

defineProps<{
  menus: MenuItem[],
  parentPath?: string
}>()

</script>

<!-- 递归菜单树组件 -->
<template>
  <template v-for="(menu, idx) in menus">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path ?? ''" :key="`p_${idx}`">
      <template #title>
        <el-icon><component :is="loadIcon(menu.icon ?? 'Menu')" /></el-icon>
        <span>{{ menu.title }}</span>
      </template>
      <recursive-menu :menus="menu.children" :parent-path="menu.path"/>
    </el-sub-menu>
    <el-menu-item v-else :index="`${parentPath ?? ''}/${menu.path}`" :key="`c_${idx}`">
      <el-icon><component :is="loadIcon(menu.icon ?? 'Menu')" /></el-icon>
      <span>{{ menu.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped>

</style>