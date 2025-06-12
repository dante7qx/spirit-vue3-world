import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/types/components/menu.ts'

/**
 * 将路由转换为菜单项
 *
 * 进阶: 调用后端API获取菜单项
 */
const DEFAULT_ICON = 'Menu'
export function routeToMenu(routes: RouteRecordRaw[]): MenuItem[] {
  return routes
      .filter(route => !route.meta?.hidden) // 过滤隐藏路由
      .map(route => {
        const meta = route.meta || {} // 缓存 meta 属性
        const title = typeof meta.title === 'string' ? meta.title : ''
        const icon = typeof meta.icon === 'string' ? meta.icon : DEFAULT_ICON
        const name = typeof route.name === 'string' ? route.name : ''

        const menuItem: MenuItem = {
          title,
          path: route.path,
          name,
          icon,
        }

        if (Array.isArray(route.children) && route.children.length > 0) {
          menuItem.children = routeToMenu(route.children)   // 递归处理子路由
        }

        return menuItem
      })
}
