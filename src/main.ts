import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'

import './assets/input.css'

const app = createApp(App)

if (VueFeather.name) {
  app.component(VueFeather.name, VueFeather)
}
app.use(createPinia())
app.use(router)

app.mount('#app')
