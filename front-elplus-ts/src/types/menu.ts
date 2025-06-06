/**
 * 菜单对象
 */
export interface MenuItem {
  title: string
  icon?: string                         // 可选，图标组件名称
  path?: string                         // 可选，菜单项的跳转路径
  name?: string                         // 可选，菜单项的名称
  children?: MenuItem[]                 // 可选，子菜单项
}
