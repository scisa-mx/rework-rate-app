import NotFound from '@/views/pages/NotFound.vue'

export const PAGES = [{ path: '/:pathMatch(.*)*', component: NotFound, meta: { layout: 'flat' } }]
