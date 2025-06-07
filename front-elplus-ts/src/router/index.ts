import {createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
      icon: 'Sunny'
    },
  },
  {
    path: '/element-plus',
    name: 'ElementPlus',
    meta: {
      title: 'Element Plus',
      icon: 'ElementPlus'
    },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/element/basic/index.vue'),
        meta: {
          title: '基础组件',
          icon: 'Mug'
        },
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/element/global-config/index.vue'),
        meta: {
          title: '全局配置',
          icon: 'Cpu'
        },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/element/form/index.vue'),
        meta: {
          title: '表单组件',
          icon: 'Document'
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(from.path, ' to ', to.path) // 调试用
  next()
})

export default router