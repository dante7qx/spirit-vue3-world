<script setup lang="ts">

</script>

<template>
  <h2 style="text-align: center">{{$t('index.welcome')}}</h2>
  <h4 style="text-align: center" v-text="$t('index.subtitle')" />

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>ref() 和 reactive()</span>
      </div>
    </template>
    <div class="box-content">
      1. ref(): 整个对象作为一个响应式引用, 访问属性需要通过 .value, 重新赋值整个对象会保持响应性 config.value = newConfig<br>
      2. reactive(): 对象的每个属性都是响应式的, 访问属性不需要.value, 不能重新赋值整个对象（会失去响应性）<br>
      3. 使用 ref()：当你可能需要替换整个对象，或者希望保持一致的 .value 访问模式<br>
        使用 reactive()：当你需要频繁修改对象属性，且不需要重新赋值整个对象<br>
      4. 在 Vue 模板中，ref 会自动解包。二者使用体验一样，写法没有区别。<br>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.box-card {
  width: 480px;

  .box-content {
    line-height: 30px;
  }
}
</style>