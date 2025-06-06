<script setup lang="ts">
import SpiritButton from './Button.vue'
import SpiritBorder from './Border.vue'
import SpiritIcon from './Icon.vue'
import SpiritLink from './Link.vue'
import SpiritText from './Text.vue'
import SpiritScrollbar from './Scrollbar.vue'
import SpiritSpace from './Space.vue'

const activeName = ref('btn')
</script>

<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="Button 按钮" name="btn">
      <spirit-button />
    </el-collapse-item>
    <el-collapse-item title="Border 边框、阴影" name="border">
      <spirit-border />
    </el-collapse-item>
    <el-collapse-item title="Icon 图标" name="icon">
      <spirit-icon />
    </el-collapse-item>
    <el-collapse-item title="Link 链接" name="link">
      <spirit-link />
    </el-collapse-item>
    <el-collapse-item title="Text 文本" name="text">
      <spirit-text />
    </el-collapse-item>
    <el-collapse-item title="Scrollbar 滚动条" name="scrollbar">
      <spirit-scrollbar />
    </el-collapse-item>
    <el-collapse-item title="Space 间距" name="space">
      <spirit-space />
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">
:deep(.el-collapse-item__title) {
  font-size: 16px;
  color: #409eff;
  padding-left: 20px;
}

:deep(.el-collapse-item__content) {
  padding-left: 20px;
  padding-right: 0;
}
</style>