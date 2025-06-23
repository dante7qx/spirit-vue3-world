import {createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/home/Index.vue'),
    meta: {
      title: '首页',
      icon: 'Sunny'
    },
  },
  {
    path: '/gencode',
    name: 'GenCode',
    // component: () => import('@/views/gencode/Index.vue'),
    meta: {
      title: '代码生成器',
      icon: 'Code'
    },
    children: [
      {
        path: 'db',
        name: 'DBConfig',
        component: () => import('@/views/gencode/DBConfig.vue'),
        meta: {
          title: '数据源配置',
          icon: 'Code'
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router