<script setup lang="ts">
import {Edit, Loading, Search, Share} from "@element-plus/icons-vue";
</script>

<template>
  <h3>
    Icon 图标并不在<code>element-plus</code>，使用的话需要单独引入。
  </h3>
  <div class="code-box">
    <p>pnpm install @element-plus/icons-vue</p>
    <p>注册所有： import * as ElementPlusIconsVue from '@element-plus/icons-vue'</p>
    <p>按需注册： import { Delete, Menu, Search } from '@element-plus/icons-vue'</p>
  </div>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-icon :size="20">
        <Edit/>
      </el-icon>
    </el-col>
    <el-col :span="6">
      <el-icon color="#409efc">
        <Share/>
      </el-icon>
    </el-col>
    <el-col :span="6">
      <el-icon>
        <Loading/>
      </el-icon>
    </el-col>
    <el-col :span="6">
      <el-button type="primary">
        <el-icon style="vertical-align: middle">
          <Search/>
        </el-icon>
        <span style="vertical-align: middle"> Search </span>
      </el-button>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.code-box {
  padding: 10px;
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-regular);
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>