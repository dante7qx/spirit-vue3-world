<script setup lang="ts">
</script>

<template>
  <n-h2 style="text-align: center">Vue3 + TypeScript + NaiveUI</n-h2>

  <n-tabs type="line" trigger="hover" justify-content="space-evenly">
    <n-tab-pane name="form" tab="表单">
      表单
    </n-tab-pane>
    <n-tab-pane name="table" tab="表格">
      表格
    </n-tab-pane>
    <n-tab-pane name="config" tab="配置">
      配置组件
    </n-tab-pane>
    <n-tab-pane name="other" tab="其他">
      <n-qr-code value="https://dante7qx.github.io" color="#18a058" />
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>

</style>