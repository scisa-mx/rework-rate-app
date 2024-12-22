<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import DashboardLayout from './views/Layouts/DashboardLayout.vue'
import FlatLayout from './views/Layouts/FlatLayout.vue'

import { useSidebarStore } from './stores/sidenav'

const sidebarStore = useSidebarStore()

const LAYOUTS = {
  dashboard: DashboardLayout,
  flat: FlatLayout,
}

onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      sidebarStore.isMobileOpen = false
    }

    if (window.innerWidth < 1200) {
      sidebarStore.isMobileOpen = false
      sidebarStore.isMobile = true
    } else {
      sidebarStore.isMobile = false
    }
  }

  window.addEventListener('resize', handleResize)
  handleResize()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <component :is="LAYOUTS.dashboard">
    <RouterView />
  </component>
</template>
