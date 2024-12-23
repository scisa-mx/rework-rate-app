import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueFeather from 'vue-feather'

import i18n from './utils/i18n/i18n'
import './assets/input.css'

const app = createApp(App)

if (VueFeather.name) {
  app.component(VueFeather.name, VueFeather)
}

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
