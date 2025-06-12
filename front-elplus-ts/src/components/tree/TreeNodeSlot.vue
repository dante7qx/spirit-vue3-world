<script setup lang="ts">
import type {TreeNode} from "@/types/components/tree.ts"

defineProps<{
  data: TreeNode | null
}>()
</script>

<template>
  <span style="color: #626AEF">{{ data !== null ? data.label : '' }}</span>
</template>

<style scoped lang="scss">

</style>