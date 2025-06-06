<script setup lang="ts">
import {Expand, Fold } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
const sidebarIcon = computed(() => (isCollapse.value ? Expand : Fold))

// 响应式处理
const handleResize = () => {
  const width = window.innerWidth
  isCollapse.value = width < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="app-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边栏菜单 -->
        <sidebar :is-collapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 隐藏侧边栏 -->
          <div class="toggle-btn" @click="toggleSidebar">
            <el-icon size="25">
              <component :is="sidebarIcon" />
            </el-icon>
          </div>

          <!-- 面包屑导航 -->
          <Breadcrumb />

          <!-- 主题切换 -->
          <toggle-theme class="toggle-theme"/>

        </el-header>
        <el-main>
          <!-- 主内容区 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
@import "@/styles/layout.scss";
//@import "@/styles/layout-v2.scss";
</style>