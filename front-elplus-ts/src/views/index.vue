<script setup lang="ts">

</script>

<template>
  <h2 style="text-align: center">你好，Vue3 + TypeScript + Vite + Element Plus ！</h2>

  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>ref() 和 reactive()</span>
      </div>
    </template>
    <p>
      ref(): 整个对象作为一个响应式引用, 访问属性需要通过 .value, 重新赋值整个对象会保持响应性 config.value = newConfig
    </p>
    <p>
      reactive(): 对象的每个属性都是响应式的, 访问属性不需要.value, 不能重新赋值整个对象（会失去响应性）
    </p>
    <p>
      使用 ref()：当你可能需要替换整个对象，或者希望保持一致的 .value 访问模式
    </p>
    <p>
      使用 reactive()：当你需要频繁修改对象属性，且不需要重新赋值整个对象
    </p>
    <p>
      在 Vue 模板中，ref 会自动解包。二者使用体验一样，写法没有区别。
    </p>
  </el-card>
</template>

<style scoped>

</style>