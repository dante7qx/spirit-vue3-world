<script setup lang="ts">
import {Bell} from "@element-plus/icons-vue";
</script>

<template>
  <el-row>
    <el-text tag="mark" class="mx-1" size="large">
      Element Plus 提供的一个轻量文本展示组件，主要用于样式化文本输出，类似于
      span，但它封装了一些常用的文字样式（如颜色、类型、粗细等），让文本展示更统一、更语义化。
    </el-text>
  </el-row>
  <el-row>
    <el-text type="primary" class="mx-1" size="large">
      通过 truncated 属性，在文本超过视图或
      <el-text tag="del">最大宽度</el-text>
      设置时展示省略符。 通过 line-clamp 属性控制多行的样式
    </el-text>
  </el-row>
  <el-row>
    <el-text class="w-150px mb-2" truncated>
      Self element set width 100px
    </el-text>
  </el-row>
  <el-row class="w-150px mb-2">
    <el-text truncated>Squeezed by parent element</el-text>
  </el-row>
  <el-row>
    <el-text line-clamp="2">
      The -webkit-line-clamp CSS property<br/>
      allows limiting of the contents of<br/>
      a block to the specified number of lines.
    </el-text>
  </el-row>
  <el-row>
    <el-text>
      This is text mixed icon
      <el-icon>
        <Bell />
      </el-icon>
      and component
      <el-button>Button</el-button>
    </el-text>
  </el-row>
</template>

<style scoped lang="scss">

</style>