<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false), miniState = ref(true)
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
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="boy">
            </q-avatar>
            <div class="text-weight-bold">Michale Dante</div>
            <div>@tsww</div>
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
              <q-item clickable v-ripple class="col-2 bg-blue-grey-5 text-white">
                <q-item-section>控制组件</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 bg-blue-grey-5 text-white">
                <q-item-section>字符</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 bg-blue-grey-5 text-white">
                <q-item-section>
                  <q-item-label>描述</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 bg-blue-grey-5 text-white">
                <q-item-section>
                  <q-item-label>实际效果</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 text-left">
                <q-item-section>上部（Header）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 text-left">
                <q-item-section>第1组（如 lHh）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 text-left">
                <q-item-section>
                  <q-item-label>
                    l --> 表示在左侧有 Drawer时，Header 会缩进/让出空间 <br>
                    H --> Header 是 固定的（fixed），总是可见（不随滚动）<br>
                    h --> Header 是 静态的（static），仅在顶部，不固定在页面上
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 text-left">
                <q-item-section>大屏固定，小屏静态（典型的响应式设计）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 text-left">
                <q-item-section>侧边栏 (Left Drawer)</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 text-left">
                <q-item-section>第2组（如 Lpr）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 text-left">
                <q-item-section>
                  <q-item-label>
                    L --> Drawer 是 固定的（fixed）（通常用于大屏）<br>
                    p --> Drawer 是 overlay 模式（覆盖内容）（通常用于小屏）<br>
                    r --> Drawer 是 可重叠的右边栏（但在左边时，它表示非粘连）
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 text-left">
                <q-item-section>大屏固定在左，小屏变成浮层可弹出</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 text-left">
                <q-item-section>下部（Footer）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-2 text-left">
                <q-item-section>第3组（如 lFf）</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 text-left">
                <q-item-section>
                  <q-item-label>
                    l --> Footer 也受 Drawer 缩进影响 <br>
                    F --> Footer 是 固定的（fixed），总是可见（不随滚动）<br>
                    f --> Footer 是 静态的（static），仅在底部，不固定在页面上
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-4 text-left">
                <q-item-section>大屏固定底部，小屏静态跟随滚动</q-item-section>
              </q-item>
              <q-item clickable v-ripple class="col-12 text-left">
                <q-item-section>
                  view="lHh Lpr lFf" 的典型场景，在线调试 <a href="https://quasar.dev/layout-builder" target="_blank">布局测试工具</a> <br>
                  1. 左侧有导航栏（Drawer）<br>
                  2. 顶部 Header 大屏固定、小屏滚动 <br>
                  3. Footer 也是大屏固定、小屏滚动 <br>
                  4. 完整支持移动 + 桌面端适配
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>

  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseenter="miniState = false"
        @mouseleave="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
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

            <q-separator />

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
      </q-drawer>

      <q-page-container>
        <q-page padding>

          <q-page-sticky position="top-right" :offset="[18, 18]">
            <q-btn icon="add" color="light-blue-13" label="固定，滚动时不会影响布局" />
          </q-page-sticky>

          <q-page-scroller position="bottom-right" :offset="[18, 18]">
            <q-btn color="primary" icon="keyboard_arrow_up" label="返回顶部" />
          </q-page-scroller>

          <p v-for="n in 35" :key="n">
            {{ `${n}. 痛苦本身，重要的不是痛苦，而是痛苦的缘由……` }}
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped lang="scss">

</style>
