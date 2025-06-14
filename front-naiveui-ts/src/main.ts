import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vfonts/Lato.css'    // 经典字体
// import 'vfonts/FiraCode.css'  // 等宽字体

const app = createApp(App)

app.use(router)
app.mount('#app')
