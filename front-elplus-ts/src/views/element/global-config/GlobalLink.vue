<script setup lang="ts">
const linkTypes = ['primary', 'success', 'info', 'warning', 'danger', 'default']
const underlineOptions = ['always', 'hover', 'never']

const config = reactive({
  type: 'primary',
  underline: 'always',
})
</script>

<template>
  <el-form :inline="true">
    <el-form-item label="Type">
      <el-select v-model="config.type" style="width: 150px;">
        <el-option v-for="type in linkTypes" :key="type" :value="type"/>
      </el-select>
    </el-form-item>
    <el-form-item label="Underline">
      <el-select v-model="config.underline" style="width: 150px;">
        <el-option
            v-for="type in underlineOptions"
            :key="type"
            :value="type"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <div>
    <el-config-provider :link="config">
      <el-link>Element Plus</el-link>
    </el-config-provider>
  </div>
</template>

<style scoped lang="scss">

</style>