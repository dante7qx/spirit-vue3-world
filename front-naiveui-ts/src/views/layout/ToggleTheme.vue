<<script setup lang="ts">
const THEME_KEY = 'spirit-theme'
const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

// 本地响应式状态，用于控制按钮显示和切换
const isDark = ref(localStorage.getItem(THEME_KEY) === THEME_DARK)

// 监听 isDark 变化，同步到 localStorage 并触发 storage 事件
watch(isDark, (newVal, _oldValue) => {
  const themeValue = newVal ? THEME_DARK : THEME_LIGHT
  localStorage.setItem(THEME_KEY, themeValue)

  // 创建带 key 的 storage 事件（模拟浏览器行为）
  const event = new StorageEvent('storage', {
    key: THEME_KEY,
    newValue: themeValue,
    oldValue: newVal ? THEME_LIGHT : THEME_DARK,
    storageArea: localStorage
  })

  window.dispatchEvent(event)
})

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value
}

const themeText = computed(() => {
  return isDark.value ? '浅色' : '深色'
})
</script>

<template>
  <n-button quaternary @click="toggleTheme">
    {{ themeText }}
  </n-button>
</template>

<style scoped lang="scss">

</style>