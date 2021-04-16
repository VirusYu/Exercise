import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Dialog, Field } from 'vant'
import 'vant/lib/index.css'
import './assets/style/reset.less'

createApp(App).use(router).use(Dialog).use(Field).mount('#app')