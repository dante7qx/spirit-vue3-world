<script setup lang="ts">
import {Expand, Fold} from '@element-plus/icons-vue'
import {elementLocale} from "@/locales"

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
  <el-config-provider :locale="elementLocale">
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

            <!-- 右侧工具组 -->
            <div class="toolbar">
              <!-- 主题切换 -->
              <toggle-theme />

              <!-- 全屏 -->
              <fullscreen />

              <!-- 切换语言 -->
              <language-switcher />

              <!-- 用户信息 -->
              <user-profile />

            </div>

          </el-header>
          <el-main>
            <!-- 主内容区 -->
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<style lang="scss">
@import "@/styles/layout.scss";
//@import "@/styles/layout-v2.scss";
</style>