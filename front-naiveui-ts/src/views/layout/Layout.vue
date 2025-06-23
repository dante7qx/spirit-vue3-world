<script setup lang="ts">
import type {MenuOption} from "naive-ui"
import { NIcon } from 'naive-ui'
import {
  ArrowForwardOutline,
  ArrowBackOutline,
  BookOutline as BookIcon,
  WineOutline as WineIcon, Apps
} from '@vicons/ionicons5'
import {RouterLink} from "vue-router"
import ToggleTheme from "@/views/layout/ToggleTheme.vue"

// 侧边栏折叠状态
const collapsed = ref(false)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: { name: 'Index' }
            },
            { default: () => '首页' }
        ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '代码生成器',
    key: 'pinball-1973',
    icon: renderIcon(WineIcon),
    children: [
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: { name: 'DBConfig' }
                },
                { default: () => '数据源' }
            ),
        key: 'rat',
        icon: renderIcon(Apps)
      }
    ]
  },
]
</script>

<template>
  <n-flex>
    <n-layout style="height: 100vh">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <n-flex justify="space-between" size="large">
        <!-- logo区域 -->
        <header-logo />

        <!-- 导航区域 -->

        <!-- 工具栏 -->
        <div>
          <!-- 主题切换 -->
          <toggle-theme />
          <!-- 语言切换 -->
          <toggle-locale />

          <!-- 全屏 -->
        </div>
        </n-flex>

      </n-layout-header>

      <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
        <n-flex vertical>
          <n-flex size="large" style="margin: 15px;">
            <n-switch v-model:value="collapsed">
              <template #checked-icon>
                <n-icon :component="ArrowForwardOutline" />
              </template>
              <template #unchecked-icon>
                <n-icon :component="ArrowBackOutline" />
              </template>
            </n-switch>
          </n-flex>
          <n-layout-sider
              bordered
              collapse-mode="width"
              :collapsed-width="64"
              :width="240"
              :collapsed="collapsed"
              show-trigger="arrow-circle"
              @collapse="collapsed = true"
              @expand="collapsed = false">
            <n-menu
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions" />
          </n-layout-sider>
        </n-flex>
        <n-layout content-style="padding: 24px;" :native-scrollbar="false">
          <router-view />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-flex>
</template>

<style scoped>

</style>