import { createRouter, createWebHistory } from 'vue-router'

import ROUTES from './routes'
import { PAGES } from './pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...ROUTES, ...PAGES],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ path: '/home' })
  } else {
    next()
  }
})

export default router
