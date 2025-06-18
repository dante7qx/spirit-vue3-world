<script setup lang="ts">
import {
  currentTheme,
  currentLocale,
  currentDateLocale,
} from '@/utils/spirit.ts'
</script>

<template>
  <n-config-provider
    :theme="currentTheme"
    :locale="currentLocale"
    :date-locale="currentDateLocale"
  >
    <layout />
  </n-config-provider>
</template>

<style scoped></style>
