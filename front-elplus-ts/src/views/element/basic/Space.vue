<script setup lang="ts">
import type {SpaceInstance} from "element-plus";

const direction = ref<SpaceInstance['direction']>('horizontal')
const fill = ref(false)
const fillRatio = ref(30)
</script>

<template>
  <el-row>
    <el-text size="large">
      虽然我们拥有 Divider 组件，但很多时候我们需要不是一个被 Divider 组件 分割开的页面结构，因此我们会重复的使用很多的 Divider 组件，这在我们的开发效率上造成了一定的困扰。<br>
      <b>间距组件</b>就是为了解决这种困扰应运而生的。
    </el-text>
  </el-row>

  <el-space direction="vertical" alignment="normal" :size="30">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-radio-group v-model="direction">
          <el-radio value="horizontal">水平</el-radio>
          <el-radio value="vertical">垂直</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="fill" active-text="填充" inactive-text="不填充" />
      </el-col>
      <el-col :span="6">
        <el-text v-if="fill">
          填充比例：
          <el-slider v-model="fillRatio" />
        </el-text>
      </el-col>
    </el-row>

    <el-space wrap :direction="direction" :fill="fill" :fill-ratio="fillRatio">
      <el-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card 名称</span>
            <el-button class="button" text>操作</el-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '项目列表 ' + o }}
        </div>
      </el-card>
    </el-space>
  </el-space>
</template>

<style scoped lang="scss">
</style>