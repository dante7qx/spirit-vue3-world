<script setup lang="ts">
import type { ScrollbarInstance } from 'element-plus'

// Arrayable<number> 等同于 number | number[], let a: Arrayable<number> a=42 或 a=[1,2,3]
type Arrayable<T> = T | T[]

const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<ScrollbarInstance>()

onMounted(() => {
  const calculatedMax = innerRef.value!.clientHeight - 380
  max.value = Math.max(calculatedMax, 0)
})

const inputSlider = (value: Arrayable<number>) => {
  scrollbarRef.value!.setScrollTop(value as number)
}
const scroll = ({ scrollTop }: {  scrollTop: number}) => {
  value.value = scrollTop
}
const formatTooltip = (value: number) => `${value} px`
</script>

<template>
  <h2>基础用法</h2>
  <el-text>通过 height 属性设置滚动条高度，若不设置则根据父容器高度自适应</el-text>
  <el-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </el-scrollbar>

  <h2>横向滚动</h2>
  <el-text>当元素宽度大于滚动条宽度时，会显示横向滚动条</el-text>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item2">
        {{ item }}
      </p>
    </div>
  </el-scrollbar>

  <h2>手动滚动</h2>
  <el-text>通过使用 setScrollTop 与 setScrollLeft 方法，可以手动控制滚动条滚动</el-text>
  <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </el-scrollbar>
  <el-slider
      v-model="value"
      :max="max"
      :format-tooltip="formatTooltip"
      @input="inputSlider"
  />
</template>

<style scoped lang="scss">
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.scrollbar-flex-content {
  display: flex;
  width: fit-content;
}
.scrollbar-demo-item2 {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.el-slider {
  margin-top: 20px;
}
</style>