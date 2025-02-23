<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from './views/Layouts/DashboardLayout.vue'
import FlatLayout from './views/Layouts/FlatLayout.vue'
import { useSidebarStore } from './stores/sidenav'

const route = useRoute()
const sidebarStore = useSidebarStore()

const LAYOUTS = {
  dashboard: DashboardLayout,
  flat: FlatLayout,
}

// Computed para determinar el layout actual
const currentLayout = computed(() => {
  return LAYOUTS[route.meta.layout as keyof typeof LAYOUTS] || DashboardLayout
})

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
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
