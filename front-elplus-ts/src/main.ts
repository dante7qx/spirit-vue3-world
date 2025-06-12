import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/global.scss'
import App from './App.vue'
import router from './router'
import {i18n} from "@/locales"
// pinia 持久化
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)  // 注册持久化插件

const app = createApp(App)

app.use(ElementPlus, {
  zIndex: 3000
})
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
