<script setup lang="ts">
import { buttonTypes } from 'element-plus'
const config = reactive({
  autoInsertSpace: true,
  type: 'default',
  plain: true,
  round: true,
})
</script>

<template>
  <div>
    <div>
      <el-checkbox v-model="config.autoInsertSpace">
        autoInsertSpace，两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效)
      </el-checkbox>
      <el-checkbox v-model="config.plain"> plain </el-checkbox>
      <el-checkbox v-model="config.round"> round </el-checkbox>
      <el-select v-model="config.type" class="ml-5" style="margin-left: 20px; max-width: 150px;">
        <el-option
            v-for="type in buttonTypes.filter(Boolean)"
            :key="type"
            :value="type"
        />
      </el-select>
    </div>
    <el-divider />
    <el-config-provider :button="config">
      <el-button>中文</el-button>
      <el-button>简体中文</el-button>
    </el-config-provider>
  </div>
</template>

<style scoped lang="scss">

</style>