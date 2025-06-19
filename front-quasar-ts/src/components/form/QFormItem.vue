<script setup lang="ts">
/**
 * 自定义类似于 Element Plus 中 <el-form-item> 的组件
 */
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<template>
  <div class="q-mb-md">
    <!-- Label -->
    <label class="q-mb-xs text-subtitle2 text-weight-medium row items-center">
      <span>{{ label }}</span>
      <span v-if="required" class="text-negative q-ml-xs">*</span>
    </label>

    <!-- Slot: 表单控件 -->
    <slot />

    <!-- 错误提示 -->
    <div v-if="error" class="text-negative text-caption q-mt-xs">
      {{ error }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
