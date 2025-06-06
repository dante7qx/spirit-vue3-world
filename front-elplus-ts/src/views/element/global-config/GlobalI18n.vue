<script setup lang="ts">
// 下面的导入Idea会报错，功能不受影响，但是会有警告
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import en from 'element-plus/dist/locale/en.mjs'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhHk from 'element-plus/es/locale/lang/zh-hk'
import en from 'element-plus/es/locale/lang/en'

const language = ref('zh-cn')
const locale = computed(() => {
  return language.value === 'zh-cn' ? zhCn : language.value === 'zh-hk' ? zhHk : en
})

const switchLanguage = (command: string | number | object) => {
  language.value = command as string
}
</script>

<template>
  <div>
    <el-dropdown placement="bottom-start" @command="switchLanguage">
      <el-button>选择语言</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-cn" v-if="language !== 'zh-cn'">简体中文</el-dropdown-item>
          <el-dropdown-item command="zh-hk" v-if="language !== 'zh-hk'">繁体中文</el-dropdown-item>
          <el-dropdown-item command="en" v-if="language !== 'en'">英文</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <br />
    <el-config-provider :locale="locale">
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" />
    </el-config-provider>
  </div>
</template>

<style scoped lang="scss">

</style>