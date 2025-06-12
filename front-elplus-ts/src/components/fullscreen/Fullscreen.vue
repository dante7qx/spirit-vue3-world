<script setup lang="ts">
import {FullScreen, Hide} from '@element-plus/icons-vue'

const isFullscreen = ref(false)

const enterFullscreen = () => {
  const el = document.documentElement
  if (el.requestFullscreen) {
    el.requestFullscreen()
    isFullscreen.value = true
  }
}

const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const toggleFullscreen = () => {
  isFullscreen.value ? exitFullscreen() : enterFullscreen()
}

</script>

<template>
  <el-tooltip :content="isFullscreen ? '退出全屏' : '进入全屏'" placement="bottom">
    <el-icon @click="toggleFullscreen" size="large">
      <Hide v-if="isFullscreen"/>
      <FullScreen v-else/>
    </el-icon>
  </el-tooltip>
</template>

<style scoped lang="scss">

</style>