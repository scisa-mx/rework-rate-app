import { type Ref, ref } from 'vue'
import { type RouteRecordRaw } from 'vue-router'

import router from '@/router'

export const isObject = (obj: object) => typeof obj === 'object' && obj !== null

export const resolveNavDataRouteName = (link: RouteRecordRaw) => {
  if (isObject(link)) {
    const { meta } = router.resolve(link.path)
    return meta.title
  }
  return link.name
}

const isNavLinkActive = (link: RouteRecordRaw): boolean => {
  // Matched routes array of current route
  const matchedRoutes = router.currentRoute.value.matched
  // Check if provided route matches route's matched route
  const resolveRoutedName = resolveNavDataRouteName(link)

  if (!resolveRoutedName) return false
  return matchedRoutes.some(
    (route) =>
      route.name === resolveRoutedName ||
      route.meta.title === resolveRoutedName ||
      route.meta.navActiveLink === resolveRoutedName ||
      route.meta?.fromRoute === resolveRoutedName,
  )
}

export default function useSideNavLink(link: RouteRecordRaw) {
  const isActive: Ref<boolean> = ref(false)
  const linkProps = ref()
  const updateIsActive = () => {
    isActive.value = isNavLinkActive(link)
  }

  return { isActive, linkProps, updateIsActive }
}
