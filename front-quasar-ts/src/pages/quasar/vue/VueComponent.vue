<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { QAjaxBar, useQuasar } from 'quasar'
import { fabApple, fasSignal, fasWifi, fasBatteryFull } from '@quasar/extras/fontawesome-v6'

const bar = ref<InstanceType<typeof QAjaxBar> | null>(null)

function commonFetch() {
  const barRef = bar.value
  if (barRef) {
    barRef.start()
    setTimeout(
      () => {
        barRef?.stop()
      },
      Math.random() * 3000 + 1000,
    )
  }
}

const myFilterFn = (url: string) => {
  // 仅拦截 /api 的请求
  return url?.startsWith('/api')
}

function fetchData() {
  axios
    .get('/api/users')
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

const loading = ref([false, false, false, false])
const simulateProgress = (number: number) => {
  loading.value[number] = true
  setTimeout(
    () => {
      loading.value[number] = false
    },
    Math.random() * 3000 + 1000,
  )
}

const stars = ref(4), slide = ref(1), autoplay = ref(true), fullscreen = ref(false)
const dynaColor = ref('green')

const $q = useQuasar()
const form = ref({
  name: '',
  age: null,
  accept: false,
})
const submit = () => {
  if (!form.value.accept) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      position: 'top',
      message: '你必须同意许可协议及服务条款！'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top',
      message: '操作成功！',
    })
  }
}
const reset = () => {
  form.value = {
    name: '',
    age: null,
    accept: false,
  }
}

</script>

<template>
  <div class="full-width">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        group="vue-components"
        expand-separator
        default-opened
        header-class="bg-grey-9 text-white"
        label="Ajax Bar、Avatar、Badge、Banner、Bar、Breadcrumbs"
      >
        <q-card>
          <q-card-section>
            <q-btn color="primary" label="发送Ajax请求" @click="fetchData" />
            <q-btn color="dark" label="一般触发" @click="commonFetch" class="q-ml-md" />
            <!-- 一般进度条 -->
            <q-ajax-bar ref="bar" position="left" color="accent" size="14px" skip-hijack />
            <!-- Ajax 进度条 -->
            <q-ajax-bar position="bottom" color="green" size="24px" :hijack-filter="myFilterFn" />
          </q-card-section>

          <!-- Avatar、Badge、Banner -->
          <q-card-section>
            <div class="q-pr-md q-gutter-md">
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar" />
              </q-avatar>
              <q-avatar square>
                <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar" />
              </q-avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar" />
              </q-avatar>
              <q-btn dense color="purple" round icon="email" class="q-ml-md">
                <q-badge color="red" floating>4</q-badge>
              </q-btn>

              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar" />
                    <q-badge floating color="teal">new</q-badge>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Mary</q-item-label>
                  <q-item-label caption>2 new messages</q-item-label>
                </q-item-section>
                <q-item-section side> 3 min ago </q-item-section>
              </q-item>
            </div>
            <div class="q-pa-md q-gutter-sm" style="height: 80px">
              <q-avatar
                v-for="n in 5"
                :key="n"
                size="40px"
                class="overlapping"
                :style="`left: ${n * 25}px`"
              >
                <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" alt="avatar" />
              </q-avatar>
            </div>

            <!-- Banner -->
            <div class="q-gutter-sm">
              <q-banner inline-actions rounded class="bg-orange text-white">
                你当前无法连接 internet，现在无法浏览网页.

                <template v-slot:action>
                  <q-btn flat label="连接WIFI" />
                  <q-btn flat label="取消显示" />
                </template>
              </q-banner>
            </div>

            <!-- Bar -->
            <div class="q-mt-md q-gutter-sm">
              <q-bar>
                <q-btn dense flat :icon="fabApple" />
                <div class="text-weight-bold">App</div>
                <div class="cursor-pointer gt-md">File</div>
                <div class="cursor-pointer gt-md">Edit</div>
                <div class="cursor-pointer gt-md">View</div>
                <div class="cursor-pointer gt-md">Window</div>
                <div class="cursor-pointer gt-md">Help</div>
                <q-space />
                <q-btn dense flat icon="airplay" class="gt-xs" />
                <q-btn dense flat icon="battery_charging_full" />
                <q-btn dense flat icon="wifi" />
                <div>9:41</div>
                <q-btn dense flat icon="search" />
                <q-btn dense flat icon="list" />
              </q-bar>
              <q-bar>
                <q-btn dense flat round icon="lens" size="8.5px" color="red" />
                <q-btn dense flat round icon="lens" size="8.5px" color="yellow" />
                <q-btn dense flat round icon="lens" size="8.5px" color="green" />
                <div class="col text-center text-weight-bold">Quasar</div>
              </q-bar>
              <q-bar dense class="bg-teal text-white">
                <div>中国移动</div>
                <div>5G</div>
                <q-icon :name="fasSignal" />
                <q-space />
                <q-icon :name="fasWifi" />
                <div>100%</div>
                <q-icon :name="fasBatteryFull" />
              </q-bar>
            </div>

            <!-- Breadcrumbs -->
            <div class="q-gutter-sm">
              <q-breadcrumbs>
                <q-breadcrumbs-el icon="home" to="/" />
                <q-breadcrumbs-el label="Quasar" icon="widgets" to="/quasar" />
                <q-breadcrumbs-el
                  label="Breadcrumbs"
                  icon="navigation"
                  to="/vue-components/breadcrumbs"
                />
                <q-breadcrumbs-el label="Build" icon="build" />
              </q-breadcrumbs>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="vue-components"
        expand-separator
        default-opened
        header-class="bg-grey-9 text-white"
        label="Button、Card、Carousel、Chip、Color Picker">
        <q-card>
          <q-card-section>
            <div class="q-pa-md q-gutter-sm">
              <q-btn color="white" text-color="black" label="Standard" />
              <q-btn color="primary" label="Primary" />
              <q-btn color="secondary" label="Secondary" />
              <q-btn color="amber" glossy label="Amber" />
              <q-btn color="brown-5" label="Brown 5" />
              <q-btn color="deep-orange" glossy label="Deep Orange" />
              <q-btn color="purple" label="Purple" />
              <q-btn color="black" label="Black" />
              <q-btn
                color="grey-4"
                text-color="purple"
                glossy
                unelevated
                icon="camera_enhance"
                label="Purple text"
                disable
              />
              <q-btn color="red" icon="mail" icon-right="send" label="左右图标" />
            </div>
            <div class="q-pa-md q-gutter-sm">
              <q-btn round color="primary" icon="shopping_cart" />
              <q-btn round color="secondary" icon="navigation" />
              <q-btn round color="amber" glossy text-color="black" icon="layers_clear" />
              <q-btn round color="brown-5" icon="directions" />
              <q-btn round color="deep-orange" icon="edit_location" />
              <q-btn round color="purple" glossy icon="local_grocery_store" />
              <q-btn round color="black" icon="my_location" />
              <q-btn square color="primary" icon="shopping_cart" />
              <q-btn square color="secondary" icon="navigation" />
              <q-btn square color="amber" glossy text-color="black" icon="layers_clear" />
              <q-btn square color="brown-5" icon="directions" />
              <q-btn square color="deep-orange" icon="edit_location" />
              <q-btn square color="purple" glossy icon="local_grocery_store" />
              <q-btn square color="black" icon="my_location" />
              <q-btn :loading="loading[0]" color="secondary" @click="simulateProgress(0)" label="转圈" />
              <q-btn :loading="loading[1]" color="red" @click="simulateProgress(1)">
                加载中
                <template v-slot:loading>
                  Loading...
                </template>
              </q-btn>
              <q-btn :loading="loading[2]" color="purple" @click="simulateProgress(2)">
                WIFI
                <template v-slot:loading>
                  <q-spinner-radio />
                </template>
              </q-btn>
              <q-btn :loading="loading[3]" color="primary" @click="simulateProgress(3)" style="width: 150px">
                正在加载
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Loading...
                </template>
              </q-btn>
            </div>
            <div class="q-pa-md q-gutter-sm">
              <q-btn-group>
                <q-btn label="添加" color="secondary" />
                <q-btn label="编辑" color="secondary" />
                <q-btn label="删除" color="secondary" />
              </q-btn-group>

              <q-btn-group rounded>
                <q-btn rounded color="primary" label="One" />

                <q-btn rounded color="primary" label="Two" />

                <q-btn-dropdown auto-close rounded color="primary" label="Three" split>
                  <!-- dropdown content goes here -->
                  <q-list padding style="width: 250px">
                    <q-item clickable>
                      <q-item-section avatar>
                        <q-avatar icon="folder" color="purple" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Photos</q-item-label>
                        <q-item-label caption>February 22, 2016</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="info" color="amber" />
                      </q-item-section>
                    </q-item>

                    <q-item clickable>
                      <q-item-section avatar>
                        <q-avatar icon="folder" color="purple" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Videos</q-item-label>
                        <q-item-label caption>London</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="info" color="amber" />
                      </q-item-section>
                    </q-item>

                    <q-separator inset />
                    <q-item-label header>Files</q-item-label>

                    <q-item clickable>
                      <q-item-section avatar>
                        <q-avatar icon="assignment" color="teal" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>London</q-item-label>
                        <q-item-label caption>March 1st, 2018</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="info" color="amber" />
                      </q-item-section>
                    </q-item>

                    <q-item clickable>
                      <q-item-section avatar>
                        <q-avatar icon="assignment" color="teal" text-color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Paris</q-item-label>
                        <q-item-label caption>January 22nd, 2017</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="info" color="amber" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-btn-group>
              <q-btn-dropdown color="green" label="下拉按钮">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>照片</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>视频</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>文章</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

          </q-card-section>
          <q-separator inset />
          <q-card-section class="row q-gutter-md">
            <q-card
              class="my-card text-white col-2"
              style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
              <q-card-section>
                <div class="text-h6">简语</div>
                <div class="text-subtitle2">by Dante</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <span v-for="n in 7" :key="n">
                  {{ `${n}. 痛苦本身，重要的不是痛苦，而是痛苦的缘由……` }}
                </span>
              </q-card-section>
            </q-card>

            <q-card class="col-3">
              <img src="https://cdn.quasar.dev/img/mountains.jpg" alt="mountains">
              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <span v-for="n in 7" :key="n">
                  {{ `${n}. 痛苦本身，重要的不是痛苦，而是痛苦的缘由……` }}
                </span>
              </q-card-section>
            </q-card>

            <q-card class="col-2">
              <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" />
              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <span v-for="n in 7" :key="n">
                  {{ `${n}. 痛苦本身，重要的不是痛苦，而是痛苦的缘由……` }}
                </span>
              </q-card-section>
            </q-card>

            <q-card class="col-2" flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-xs">Our Changing Planet</div>
                <div class="row no-wrap items-center">
                  <q-rating size="18px" v-model="stars" :max="5" color="primary" />
                  <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
                </div>
              </q-card-section>
              <img src="https://cdn.quasar.dev/img/mountains.jpg"  alt="mountains">
            </q-card>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-gutter-md">
            <div class="q-pa-md">
              <q-carousel
                swipeable
                animated
                v-model="slide"
                thumbnails
                infinite>
                <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
              </q-carousel>
            </div>
            <div class="q-pa-md">
              <q-carousel
                animated
                v-model="slide"
                navigation
                infinite
                :autoplay="autoplay"
                arrows
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
                v-model:fullscreen="fullscreen"
              >
                <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
                <template v-slot:control>
                  <q-carousel-control
                    position="bottom-right"
                    :offset="[18, 18]"
                  >
                    <q-btn
                      push round dense color="white" text-color="primary"
                      :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                      @click="fullscreen = !fullscreen"
                    />
                  </q-carousel-control>
                </template>
              </q-carousel>
            </div>

            <div class="q-pa-md">
              <div class="text-body1">
                QChip 是 Quasar 中的“标签/小块元素”组件，类似于：一段小标签、可关闭、可选中、可图标化、可用于展示状态、用户、关键词等。
                <p>关键词/标签展示, 如：文章分类、搜索历史、热门标签</p>
                <p>状态指示, 如：在线、已完成、警告、错误</p>
                <q-chip color="primary" text-color="white">Vue.js</q-chip>
                <q-chip size="md" icon="bookmark">书签</q-chip>

                <div class="row q-gutter-lg">
                  <div :style="{background: dynaColor, width: '100px', height: '100px'}" class="col-3"></div>
                  <div class="col-4">
                    <q-badge color="grey-3" text-color="black" class="q-mb-sm">
                      {{ dynaColor }}
                    </q-badge>
                    <q-color
                      :model-value="dynaColor"
                      @change="val => { dynaColor = val }"
                      style="max-width: 250px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="vue-components"
        expand-separator
        default-opened
        header-class="bg-grey-9 text-white"
        label="Dialog、Editor、Form、Knob">
        <q-card>
          <div class="q-pa-md" style="max-width: 400px">
            <q-form ref="spiritForm" class="q-gutter-md" autofocus @submit="submit" @reset="reset">
              <q-input
                name="name"
                label="姓名"
                outlined
                v-model="form.name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || '请输入姓名！']" />
              <q-input
                name="age"
                label="年龄"
                outlined
                v-model="form.age"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || '请输入年龄！',
                  val => val > 0 && val < 100 || '请输入正确的年龄！'
                ]" />

              <q-toggle v-model="form.accept" label="我已阅读并同意许可协议及服务条款。" />

              <div>
                <q-btn label="提交" type="submit" color="primary" />
                <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<style scoped lang="scss">
.overlapping {
  border: 2px solid white;
  position: absolute;
}
</style>
