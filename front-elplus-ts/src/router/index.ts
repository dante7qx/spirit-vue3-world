import {createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: 'route.home',
      icon: 'Sunny'
    },
  },
  {
    path: '/element-plus',
    name: 'ElementPlus',
    meta: {
      title: 'route.elementPlus',
      icon: 'ElementPlus'
    },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/element/basic/index.vue'),
        meta: {
          title: 'route.basic',
          icon: 'Mug'
        },
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/element/global-config/index.vue'),
        meta: {
          title: 'route.globalConfig',
          icon: 'Cpu'
        },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/element/form/index.vue'),
        meta: {
          title: 'route.form',
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