import {createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useLoginUserStore } from '@/store/login-user.ts'

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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: 'route.home',
      icon: 'Sunny',
      hidden: true,
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
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/element/table/index.vue'),
        meta: {
          title: 'route.table',
          icon: 'Grid'
        },
      },
    ],
  },
  {
    path: '/codegen',
    name: 'codegen',
    meta: {
      title: 'route.codegen',
      icon: 'DataBoard'
    },
    children: [
      {
        path: 'db',
        name: 'db',
        component: () => import('@/views/generator/CodeGenerator.vue'),
        meta: {
          title: '数据源',
          icon: 'Mug'
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫控制访问权限
router.beforeEach((to, _from, next) => {
  const loginUserStore = useLoginUserStore()
  const isAuthenticated = !!loginUserStore.accessToken
  if(!isAuthenticated && to.name !== 'Login') {
    next('/login')  // 未登录，跳转到登录页
  } else if(isAuthenticated && to.name === 'Login') {
    next('/') // 已登录，跳转到首页
  } else {
    next()  // 其他情况，继续导航
  }
})

export default router