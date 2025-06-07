<script lang="ts" setup>
import {ElMessage} from 'element-plus'

const types = [
  {label: 'info', value: 'info'},
  {label: 'success', value: 'success'},
  {label: 'warning', value: 'warning'},
  {label: 'error', value: 'error'}
]

const messageConfig = reactive({
  max: 3,
  plain: false,
  duration: 3000,
  offset: 80,
  showClose: true,
  type: 'info' as const
})

const openMessage = () => {
  ElMessage({
    message: `这是一条 ${messageConfig.type} 类型的消息`,
    type: messageConfig.type,
    duration: messageConfig.duration,
    offset: messageConfig.offset,
    showClose: messageConfig.showClose,
    plain: messageConfig.plain
  })
}
</script>

<template>
  <el-config-provider :message="messageConfig">
    <div class="config-form">
      <h3>全局消息配置</h3>
      <el-form label-position="left" label-width="120px">
        <el-form-item label="最大数量 (max)">
          <el-input-number v-model="messageConfig.max" :min="1" :max="10"/>
        </el-form-item>
        <el-form-item label="基础样式 (plain)">
          <el-switch v-model="messageConfig.plain"/>
        </el-form-item>
        <el-form-item label="持续时间 (ms)">
          <el-input-number v-model="messageConfig.duration" :min="500" :max="10000"/>
        </el-form-item>
        <el-form-item label="偏移顶部 (px)">
          <el-input-number v-model="messageConfig.offset" :min="0" :max="500"/>
        </el-form-item>
        <el-form-item label="显示关闭按钮">
          <el-switch v-model="messageConfig.showClose"/>
        </el-form-item>
        <el-form-item label="默认类型">
          <el-select v-model="messageConfig.type" placeholder="请选择">
            <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button @click="openMessage">打开消息</el-button>
      </el-form>
    </div>
  </el-config-provider>
</template>

<style scoped lang="scss">
.config-form {
  max-width: 500px;
}
</style>