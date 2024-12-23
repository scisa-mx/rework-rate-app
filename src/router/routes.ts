import { type RouteRecordRaw } from 'vue-router'
import BaseHome from '@/views/BaseHome.vue'
import ComponentsTemplate from '@/views/ComponentsTemplate.vue'

const ROUTES: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: BaseHome,
    meta: {
      title: 'home',
      icon: 'home',
    },
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsTemplate,
    meta: {
      title: 'components',
      icon: 'layout',
    },
  },
]

export default ROUTES
