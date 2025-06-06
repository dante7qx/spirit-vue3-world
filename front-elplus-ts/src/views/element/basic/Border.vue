<script setup lang="ts">

</script>

<template>
  <el-row :gutter="12">
    <el-col :span="6">
      <div class="br_4">无圆角</div>
    </el-col>
    <el-col :span="6">
      <div class="br_4" style="border-radius: var(--el-border-radius-small)">小圆角-半径2px</div>
    </el-col>
    <el-col :span="6">
      <div class="br_4"
           style="border-radius: var(--el-border-radius-base); box-shadow: var(--el-box-shadow-lighter)">大圆角-半径4px
      </div>
    </el-col>
    <el-col :span="6">
      <div class="br_4" style="border-radius: var(--el-border-radius-round); box-shadow: var(--el-box-shadow-dark)">
        圆形圆角-半径20px
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.br_4 {
  height: 40px;
  width: 70%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 10px;
  text-align: center;
  line-height: 40px;
}
</style>