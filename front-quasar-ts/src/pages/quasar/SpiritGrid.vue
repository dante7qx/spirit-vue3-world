<script setup lang="ts">
import { ref } from 'vue'

const btnCount = ref(5)
</script>

<template>
  <div class="text-h5 text-center">布局组件</div>

  <q-space />

  <div class="text-h6">Flexbox</div>
  <div class="text-body1">
    Quasar 的布局系统使用了一个 12列的栅格系统（12-point column system）。
  </div>
  <div class="row bg-blue box-dev">
    <div class="col-4">第一列</div>
    <div class="col-4">第二列</div>
    <div class="col-4">第三列</div>
  </div>
  <div class="row q-mt-md box-dev">
    <div class="col-8">占8列</div>
    <div class="col-2">占2列</div>
    <div class="col-auto">根据内容和可用空间自动调整大小，设置 class="col-auto"</div>
    <div class="col q-pl-md">填满剩余空间</div>
  </div>
  <div class="row q-mt-md box-dev">
    <div class="col-xs-12 col-sm-6 col-md-4 text-center">
      col-xs-12 col-sm-6 col-md-4
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 text-center">
      col-xs-12 col-sm-6 col-md-4
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 text-center">
      col-xs-12 col-sm-6 col-md-4
    </div>
  </div>


  <div class="text-h6">Grid Row</div>
  <div class="text-body1">
    二维布局系统：同时控制行和列。典型场景：页面整体布局、仪表盘、表格式内容。
  </div>
  <div class="q-pa-md box-grid">
    <div class="row q-gutter-md">
      <div class="col">.col</div>
      <div class="col">.col</div>
      <div class="col">.col</div>
      <div class="col">.col</div>
    </div>
    <div class="row">
      <div class="col-8">.col-8</div>
      <div class="col-4">.col-4</div>
    </div>
    <div class="row">
      <div class="col">.col</div>
      <div class="col-12 col-md-auto">.col-12 .col-md-auto (Variable width content)</div>
      <div class="col">.col</div>
    </div>
  </div>

  <div class="text-body1">
    .col-* 在 class="column"（垂直布局）里，表示的是高度比例，而非宽度。
  </div>
  <div class="q-pa-md box-grid">
    <div class="column q-mt-md" style="height: 240px">
      <div class="col">col-1 --> 1/12</div>
      <div class="col-8">col-8 --> 8/12</div>
      <div class="col">col-1 --> 1/12</div>
    </div>
  </div>

  <div class="q-pa-md" style="max-width: 500px">
    <p>q-gutter-xs</p>
    <div class="q-gutter-xs">
      <q-btn color="brown" label="Button" v-for="n in btnCount" :key="`xs-${n}`" />
    </div>

    <p class="q-mt-md">q-gutter-sm</p>
    <div class="q-gutter-sm">
      <q-btn color="teal" label="Button" v-for="n in btnCount" :key="`sm-${n}`" />
    </div>

    <p class="q-mt-md">q-gutter-md</p>
    <div class="q-gutter-md">
      <q-btn color="accent" label="Button" v-for="n in btnCount - 1" :key="`md-${n}`" />
    </div>

    <p class="q-mt-md">q-gutter-lg</p>
    <div class="q-gutter-lg">
      <q-btn color="red" label="Button" v-for="n in btnCount - 1" :key="`lg-${n}`" />
    </div>

    <p class="q-mt-md">q-gutter-xl</p>
    <div class="q-gutter-xl">
      <q-btn color="indigo" label="Button" v-for="n in btnCount - 2" :key="`xl-${n}`" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-dev{
  div {
    border: 1px solid #1D1D1D;
  }
}
.box-grid {
  .row > div {
    padding: 10px 15px;
    background: rgba(#999,.15);
    border: 1px solid rgba(#999,.2);
  }
  .row + .row {
    margin-top: 1rem;
  }

  .column > div {
    padding: 10px 15px;
    background: rgba(#999,.15);
    border: 1px solid rgba(#999,.2);
  }
  .column + .column {
    margin-top: 1rem;
  }
}
</style>
