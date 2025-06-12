<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <Login v-if="route.name === 'Login'" />
  <Layout v-else/>
</template>

<style scoped>
</style>
