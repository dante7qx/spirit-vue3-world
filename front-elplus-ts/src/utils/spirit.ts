import * as ElementIcons from '@element-plus/icons-vue'

/**
 * 动态加载 Element Plus Icon
 */
const loadIcon = (iconName: string) => {
  const icon = (ElementIcons as any)[iconName]
  if (!icon) {
    console.warn(`[useIcon] 图标 "${iconName}" 不存在`)
    return null
  }
  return h(icon)
}

/**
 * 工具类
 */
export { loadIcon }