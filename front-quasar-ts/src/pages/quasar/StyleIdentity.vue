<script setup lang="ts">
import { computed, ref } from 'vue'

const tab = ref('typography')
const splitterModel = ref(15)

const expandSyntax = ref(false), expandExample = ref(false)

const spacingCode = `
<!-- 所有方向设置 small 的 padding -->
<div class="q-pa-sm">...</div>

<!-- margin top 设置 medium, margin right 设置 small -->
<q-card class="q-mt-md q-mr-sm">...</q-card>

<!-- 无 margin、无 padding-->
<div class="no-margin no-padding"></div>
`
const spacingExample = ref<string[]>([])
const exposeSpacing = computed(() => {
  return spacingExample.value.join(' ')
})
const addSpacing = (className: string) => {
  if(spacingExample.value.includes(className)) {
    spacingExample.value = spacingExample.value.filter(item => item !== className);
  } else {
    spacingExample.value.push(className)
  }
}
</script>

<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 81vh">

    <template v-slot:before>
      <div class="text-h6 text-center">Style & Identity体系</div>
      <q-tabs
        v-model="tab"
        vertical
        class="text-teal spirit-vertical-tabs"
        inline-label>
        <q-tab name="typography" icon="mail" label="Typography" class="no-uppercase" />
        <q-tab name="spacing" icon="alarm" label="Spacing" class="no-uppercase" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up">

        <q-tab-panel name="typography">
          <div class="text-h4 q-mb-md">Typography 排版系统</div>
          <div class="text-body1">
            Quasar在Material Design主题下默认嵌入Roboto字体，但这不是必需的，你可以使用任何喜欢的字体。Roboto提供5种不同的字重：100、300、400、500、700。
            <div class="text-italic q-mt-md q-mb-md">
              <span class="q-mr-md">CSS 工具类</span>
              <q-btn color="brand" label="自定义组件颜色" />
            </div>
            <div class="text-uppercase">
              <span class="text-weight-light">class="text-uppercase"</span> — Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            <div class="text-lowercase">
              <span class="text-weight-medium">class="text-lowercase"</span> — Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="spacing">
          <div class="text-h4 q-mb-md">CSS Spacing Classes</div>

          <code class="text-body1">
            Quasar提供的CSS课程可帮助您获得DOM元素或组件的间距。所有选项都带有 q-前缀，然后分解为（t）类型，方向（D）和大小（s）。

            <q-card>
              <q-card-actions>
                <q-btn flat color="primary" label="语 法" @click="expandSyntax = !expandSyntax"/>
                <q-space />
                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expandSyntax ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expandSyntax = !expandSyntax"
                />
              </q-card-actions>
              <q-slide-transition>
                <div v-show="expandSyntax">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    <div class="text-body1">
                      <pre>q-[p|m][t|r|b|l|a|x|y]-[none|auto|xs|sm|md|lg|xl]</pre>
                      <pre>T       D                   S</pre>

                      <pre>T - type</pre>
                      <pre>- values: p (padding), m (margin)</pre>

                      <pre>D - direction</pre>
                      <pre>- values:</pre>
                      <pre>t (top), r (right), b (bottom), l (left),</pre>
                      <pre>a (all), x (both left & right), y (both top & bottom)</pre>

                      <pre>S - size</pre>
                      <pre>- values:</pre>
                      <pre>none,</pre>
                      <pre>auto (ONLY for specific margins: q-ml-*, q-mr-*, q-mx-*),</pre>
                      <pre>xs (extra small),</pre>
                      <pre>sm (small),</pre>
                      <pre>md (medium),</pre>
                      <pre>lg (large),</pre>
                      <pre>xl (extra large)</pre>
                    </div>
                  </q-card-section>
                </div>
              </q-slide-transition>

              <q-card-actions>
                <q-btn flat color="secondary" label="示 例" @click="expandExample = !expandExample"/>
                <q-space />
                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expandExample ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expandExample = !expandExample"
                />
              </q-card-actions>
              <q-slide-transition>
                <div v-show="expandExample">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    <pre><code class="language-js">{{ spacingCode}}</code></pre>
                  </q-card-section>
                </div>
              </q-slide-transition>

              <q-card-actions>
                <q-btn color="primary" label="无 Margin" @click="addSpacing('no-margin')"/>
                <q-btn color="secondary" label="无 Padding" @click="addSpacing('no-padding')"/>
                <q-btn class="disabled" label="无用按钮 (不影响点击事件)" @click="console.log(11)" />
              </q-card-actions>
              <q-card-section style="border:1px solid #303133;" :class="exposeSpacing">
                测试 Spacing 样式
              </q-card-section>
            </q-card>
          </code>
        </q-tab-panel>
      </q-tab-panels>
    </template>

  </q-splitter>
</template>

<style scoped lang="scss">
.spirit-vertical-tabs {
  justify-content: flex-start;
  margin-left: 50px;
  .q-tab {
    justify-content: flex-start;
    text-align: left;
  }
}
.no-uppercase {
  text-transform: none;
}

.bg-brand {
  color: #000000 !important;
  background: #efe39f !important;
}
</style>
