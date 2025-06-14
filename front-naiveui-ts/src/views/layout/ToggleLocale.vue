<script setup lang="ts">


const LOCALE_KEY = 'spirit-locale'
const LOCALE_CN  = 'zh-CN'
const LOCALE_EN  = 'en'

// 本地响应式状态，用于控制按钮显示和切换
const isZhCN = ref(localStorage.getItem(LOCALE_KEY) === LOCALE_CN)

watch(isZhCN, (newVal) => {
  const localeValue = newVal ? LOCALE_CN : LOCALE_EN
  localStorage.setItem(LOCALE_KEY, localeValue)

  // 创建带 key 的 storage 事件（模拟浏览器行为）
  const event = new StorageEvent('storage', {
    key: LOCALE_KEY,
    newValue: localeValue,
    oldValue: newVal ? LOCALE_CN : LOCALE_EN,
    storageArea: localStorage
  })
  window.dispatchEvent(event)
})

const toggleLocale = () => {
  isZhCN.value = !isZhCN.value
}

const localeText = computed(() => {
  return isZhCN.value ? '中文' : '英文'
})

</script>

<template>
  <n-button quaternary @click="toggleLocale">
    {{ localeText }}
  </n-button>
</template>

<style scoped lang="scss">

</style>