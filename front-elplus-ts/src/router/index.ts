import {createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Index',
    component: () => import('@/views/index.vue'), // 懒加载
    meta: {
      title: '首页',
      icon: 'Sunny'
    }
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
        name: 'Index',
        component: () => import('@/views/element/basic/index.vue'),
        meta: {
          title: '基础组件',
          icon: 'Mug'
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router