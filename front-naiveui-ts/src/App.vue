<script setup lang="ts">
import {currentTheme} from "@/utils/spirit.ts"
</script>

<template>
  <n-config-provider :theme="currentTheme">
    <layout />
  </n-config-provider>
</template>

<style scoped>

</style>
