/**
 * 主题切换、语言切换工具方法
 */
import {darkTheme, lightTheme, type NDateLocale} from "naive-ui"
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import type {NLocale} from "naive-ui/es/locales/common/enUS"

const THEME_KEY = 'spirit-theme', LOCALE_KEY = 'spirit-locale'
const THEME_DARK = 'dark', LOCALE_CN  = 'zh-CN'
// 响应式主题
const theme = ref(localStorage.getItem(THEME_KEY) === THEME_DARK ? darkTheme : lightTheme)
// 响应式语言
// const locale = ref<NLocale[]>(localStorage.getItem(LOCALE_KEY) === LOCALE_CN ? [zhCN, dateZhCN] : [enUS, dateEnUS])

const locale = ref<NLocale>(
    localStorage.getItem(LOCALE_KEY) === LOCALE_CN ? zhCN : enUS
)

const dateLocale = ref<NDateLocale>(
    localStorage.getItem(LOCALE_KEY) === LOCALE_CN ? dateZhCN : dateEnUS
)

// 监听 localStorage 变化（跨标签页）
window.addEventListener('storage', (e) => {
  if (e.key === THEME_KEY) {
    const isDark = localStorage.getItem(THEME_KEY) === THEME_DARK
    theme.value = isDark ? darkTheme : lightTheme
  } else if (e.key === LOCALE_KEY) {
    const isZhCN = localStorage.getItem(LOCALE_KEY) === LOCALE_CN
    locale.value = isZhCN ? zhCN : enUS
    dateLocale.value = isZhCN? dateZhCN : dateEnUS
  }
})


//  当前主题，默认为亮色
export const currentTheme = computed(() => theme.value)

//  当前语言，默认为中文
export const currentLocale = computed(() => locale.value)
export const currentDateLocale = computed(() => dateLocale.value)



