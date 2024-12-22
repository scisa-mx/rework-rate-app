import { createRouter, createWebHistory } from 'vue-router'
import BaseHome from '@/views/BaseHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BaseHome,
    },
  ],
})

export default router
