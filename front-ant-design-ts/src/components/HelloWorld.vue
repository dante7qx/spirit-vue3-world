<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <a-button type="primary" @click="count++">count is {{ count }}</a-button>

</template>

<style scoped>

</style>
