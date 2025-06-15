<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'

const selectedKeys = ref(['1'])
const collapsed = ref(false)
</script>

<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="display: flex; background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />

        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <a-typography-title :level="2">Ant Design Vue 的限制</a-typography-title>
        <a-typography-paragraph class="index-content">
          <ul>
            <li>和 Ant Design React 不完全同步（版本功能差异）</li>
            <li>插槽能力有限，灵活性不如 Vue 原生组件库</li>
            <li>有些定制点需要 Hack 样式或结构</li>
            <li>文档很多地方是从 React 版平移过来，Vue 语义不够清晰</li>
          </ul>
        </a-typography-paragraph>
        <a-typography-title :level="2">总结</a-typography-title>
        <a-typography-paragraph class="index-content">
          <ul>
            <li>如果你写 Vue，就别强求用 Ant Design，它虽有 Vue 版，但始终是「React 的影子」</li>
            <li>Vue 世界更好的选择其实是：Element Plus（老成） + Naive UI（现代）</li>
          </ul>
        </a-typography-paragraph>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.index-content {
  font-size: 16px;
}
</style>