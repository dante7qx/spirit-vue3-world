<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 70vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding class="text-body1">
          <p>QLayout 允许你将页面布局配置为一个 3x3 的矩阵结构，可以包含可选的左侧和/或右侧的抽屉（Drawers）。如果你还没有了解过，请先阅读 QLayout 的官方文档页面。</p>
          <p>QDrawer 是 QLayout 中用于表示侧边栏的部分。</p>
          <p>QLayout 是 Quasar 框架中用于构建页面结构的核心组件之一，它提供了一种标准化的方式来组织页面的各个部分，如: </p>
          <ul class="text-weight-bold">
            <li>Header（页眉）</li>
            <li>Footer（页脚）</li>
            <li>Left Drawer（左侧抽屉）</li>
            <li>Right Drawer（右侧抽屉）</li>
            <li>Page Content（主内容区域）</li>
          </ul>
          <div class="text-weight-bold">view="lHh Lpr lFf" 是什么意思？</div>
          <q-list bordered separator>
            <div class="row text-center">
              <q-item clickable v-ripple class="col-3 bg-blue-grey-5 text-white">
                <q-item-section>区域</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 bg-blue-grey-5 text-white">
                <q-item-section>字符</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-6 bg-blue-grey-5 text-white">
                <q-item-section>
                  <q-item-label>描述</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 text-left">
                <q-item-section>上部（Header）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 text-left">
                <q-item-section>第1组（如 lHh）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-6 text-left">
                <q-item-section>
                  <q-item-label>可以是 H（存在且固定），h（存在但不固定），L 或 l（不存在）</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 text-left">
                <q-item-section>中间（Main Content）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 text-left">
                <q-item-section>第2组（如 Lpr）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-6 text-left">
                <q-item-section>
                  <q-item-label>控制中间区域左右是否有抽屉</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 text-left">
                <q-item-section>下部（Footer）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-3 text-left">
                <q-item-section>第3组（如 lFf）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-6 text-left">
                <q-item-section>
                  <q-item-label>同上，控制 Footer 是否存在及固定</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped lang="scss">

</style>
