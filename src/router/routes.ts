import { type RouteRecordRaw } from 'vue-router'
import BaseHome from '@/views/BaseHome.vue'
import ComponentsTemplate from '@/views/ComponentsTemplate.vue'
import ArchiveComponent from '@/views/ArchiveComponent.vue'

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
  {
    path: '/archive',
    name: 'archive',
    component: ArchiveComponent,
    meta: {
      title: 'archive',
      icon: 'archive',
    },
  },
]

export default ROUTES
