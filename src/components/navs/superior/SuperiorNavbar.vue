<template>
  <nav class="mb-2 p-2 bg-white rounded shadow-sm">
    <div class="flex justify-between items-center">
      <div>
        <button @click="toggleSidebar" class="">
          <vue-feather v-if="isMobile" type="menu"></vue-feather>
        </button>
      </div>
      <div class="flex space-x-2">
        <button class="p-2 text-white rounded">
          <vue-feather class="text-slate-600" type="sun"></vue-feather>
        </button>
        <button class="p-2 text-white rounded">
          <vue-feather class="text-slate-600" type="bell"></vue-feather>
        </button>
        <button class="p-2 text-white rounded">
          <vue-feather class="text-slate-600" type="info"></vue-feather>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidenav'

const sidebarStore = useSidebarStore()

const isMobile = computed(() => sidebarStore.isMobile)

const toggleSidebar = () => {
  sidebarStore.isMobileOpen = !sidebarStore.isMobileOpen
}
</script>
