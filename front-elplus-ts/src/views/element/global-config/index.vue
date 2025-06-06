<script setup lang="ts">
import GlobalI18n from './GlobalI18n.vue'
import GlobalButton from './GlobalButton.vue'

const activeName = ref('i18n')
</script>

<template>
  <h3>全局配置</h3>
  <el-text>Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到。</el-text>
  <el-collapse v-model="activeName" accordion style="margin-top: 20px">
    <el-collapse-item title="i18n 配置 (业务i18n, 需要vue-i18n)" name="i18n">
      <global-i18n />
    </el-collapse-item>
    <el-collapse-item title="按钮配置" name="button">
      <global-button />
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">
:deep(.el-collapse-item__title) {
  font-size: 16px;
  color: var(--el-color-success);
  padding-left: 20px;
}

:deep(.el-collapse-item__content) {
  padding-left: 20px;
  padding-right: 0;
}
</style>