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