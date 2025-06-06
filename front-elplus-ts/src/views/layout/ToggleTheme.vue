<script setup lang="ts">
import {Moon, Sunny} from "@element-plus/icons-vue";

const THEME_KEY = 'spirit-theme'

const isDark = ref(localStorage.getItem(THEME_KEY) === 'dark')

// 页面加载时初始化 html 的类名
const html = document.documentElement
if (isDark.value) {
  html.classList.add('dark')
} else {
  html.classList.remove('dark')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}
</script>

<template>
  <!-- 主题切换 -->
  <el-switch
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    @change="toggleTheme"
    style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
  />
</template>

<style scoped lang="scss">
:deep(.el-switch__core) {
  border: 1px solid var(--el-border-color) !important;
}
</style>