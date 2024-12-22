import { type RouteRecordRaw } from 'vue-router'
import BaseHome from '@/views/BaseHome.vue'

const ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: BaseHome,
  },
]

export default ROUTES
