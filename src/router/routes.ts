import { type RouteRecordRaw } from 'vue-router'
import DashBoard from '@/views/Dashboard.vue'
import ComponentsTemplate from '@/views/ComponentsTemplate.vue'

const ROUTES: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: {
      title: 'home',
      icon: 'home',
    },
  },
]

export default ROUTES
