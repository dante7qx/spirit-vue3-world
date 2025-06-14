import {darkTheme, lightTheme} from "naive-ui"

const THEME_KEY = 'spirit-theme'
const THEME_DARK = 'dark'

// 响应式主题
const theme = ref(localStorage.getItem(THEME_KEY) === THEME_DARK ? darkTheme : lightTheme)

// 监听 localStorage 变化（跨标签页）
window.addEventListener('storage', (e) => {
  if (e.key === THEME_KEY) {
    const isDark = localStorage.getItem(THEME_KEY) === THEME_DARK
    theme.value = isDark ? darkTheme : lightTheme
  }
})
export const currentTheme = computed(() => theme.value)

