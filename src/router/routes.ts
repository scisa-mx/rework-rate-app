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
  // {
  //   path: '/components-template',
  //   name: 'components-template',
  //   component: ComponentsTemplate,
  //   meta: {
  //     title: 'Components Template',
  //     icon: '', 
  //   },
  // }
]

export default ROUTES
