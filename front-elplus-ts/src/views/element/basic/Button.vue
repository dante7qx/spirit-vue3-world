<script setup lang="ts">
import {Check, Delete, Edit, Message, Search, Star, Upload} from "@element-plus/icons-vue";

const isDark = ref(false)
</script>

<template>
  <el-row>
    <el-col :span="12">
      <div class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </div>
      <div class="mb-4">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="mb-4">
        <el-button round>Round</el-button>
        <el-button type="primary" round>Primary</el-button>
        <el-button type="success" round>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round disabled>Warning</el-button>
        <el-button type="danger" round disabled>Danger</el-button>
      </div>
      <div>
        <el-button :icon="Search" circle/>
        <el-button type="primary" :icon="Edit" circle/>
        <el-button type="success" :icon="Check" circle/>
        <el-button type="info" :icon="Message" circle/>
        <el-button type="warning" :icon="Star" circle/>
        <el-button type="danger" :icon="Delete" circle/>
      </div>
    </el-col>
    <el-divider border-style="dashed">文字、图标按钮</el-divider>
    <el-col :span="12">
      <div class="mb-4">
        <el-button text>Plain</el-button>
        <el-button type="primary" text>Primary</el-button>
        <el-button type="success" text>Success</el-button>
        <el-button type="info" text>Info</el-button>
        <el-button type="warning" text bg>Warning</el-button>
        <el-button type="danger" text disabled>Danger</el-button>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="mb-4">
        <el-button type="primary" :icon="Edit"/>
        <el-button type="primary" :icon="Star"/>
        <el-button type="primary" :icon="Delete" size="small"/>
        <el-button type="primary" :icon="Search" size="large">Search</el-button>
        <el-button type="primary" loading>
          Upload
          <el-icon class="el-icon--right">
            <Upload/>
          </el-icon>
        </el-button>
        <el-button-group style="margin-left: 0.75rem">
          <el-button type="primary" :icon="Edit"/>
          <el-button type="primary" :icon="Star"/>
          <el-button type="primary" :icon="Delete"/>
        </el-button-group>
      </div>
    </el-col>
    <el-divider border-style="dashed">自定义元素标签、颜色。例如，按钮，div，路由链接，nuxt链接</el-divider>
    <el-col :span="24">
      <div class="mb-4">
        <el-button
            type="primary"
            tag="a"
            href="https://github.com/element-plus/element-plus"
            target="_blank"
            rel="noopener noreferrer">
          Github
        </el-button>
        <el-button tag="div" role="button" tabindex="0">div 应该像按钮一样工作</el-button>

        <el-button color="#626aef" :dark="isDark" @click="isDark = !isDark">Default</el-button>
        <el-button color="#626aef" :dark="isDark" plain>Plain</el-button>
        <el-button color="#626aef" :dark="isDark" disabled>Disabled</el-button>
        <el-button color="#626aef" :dark="isDark" disabled plain>Disabled Plain</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.mb-4 {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
</style>