<script setup lang="ts">

</script>

<template>
  <el-link href="https://element-plus.org" target="_blank">default</el-link>
  <el-link type="primary">primary</el-link>
  <el-link type="success">success</el-link>
  <el-link type="warning">warning</el-link>
  <el-link type="danger" disabled>danger</el-link>
  <el-link type="info" disabled>info</el-link>

  <el-link underline="always">有下划线</el-link>
  <el-link underline="hover">鼠标划过</el-link>
  <el-link underline="never">无下划线</el-link>
</template>

<style scoped lang="scss">
.el-link {
  margin-right: 8px;
}
</style>