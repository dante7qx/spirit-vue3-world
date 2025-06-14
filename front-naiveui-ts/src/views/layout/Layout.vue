<script setup lang="ts">
import type {MenuOption} from "naive-ui"
import { NIcon } from 'naive-ui'
import {
  ArrowForwardOutline,
  ArrowBackOutline,
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
import {RouterLink} from "vue-router"

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
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
</script>

<template>
  <n-flex>
    <n-layout style="height: 100vh">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <!-- logo区域 -->
        <header-logo />

        <!-- 导航区域 -->

        <!-- 工具栏 -->
        <!-- 语言切换 -->
        <!-- 全屏 -->
        <!-- 主题切换 -->
        <!-- 工具栏 -->

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