<script setup lang="ts">
import { routeToMenu } from '@/api/layout/sidebar'
import {routes} from "@/router"

defineProps<{
  isCollapse: boolean
}>()

const menus = routeToMenu(routes)
const route = useRoute()
const defaultActive = computed(() => route.path)

</script>

<template>
  <el-menu
    :router="true"
    :default-active="defaultActive"
    :collapse="isCollapse">
    <recursive-menu :menus="menus" />
  </el-menu>
</template>

<style scoped>

</style>