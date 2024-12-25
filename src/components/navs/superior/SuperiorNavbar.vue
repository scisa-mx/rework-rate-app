<template>
  <nav class="mb-2 p-2 bg-white rounded shadow-sm">
    <div class="flex justify-between items-center">
      <div>
        <button @click="toggleSidebar" class="">
          <vue-feather v-if="isMobile" type="menu"></vue-feather>
        </button>
      </div>
      <div class="flex space-x-2">
        <ripple-button>
          <vue-feather class="text-slate-600" type="sun"></vue-feather>
        </ripple-button>
        <ripple-button>
          <vue-feather class="text-slate-600" type="bell"></vue-feather>
        </ripple-button>
        <ripple-button>
          <vue-feather class="text-slate-600" type="info"></vue-feather>
        </ripple-button>
        <dash-dot-drowpdown>
          <template v-slot:menu-trigger>
            <vue-feather type="user"></vue-feather>
          </template>
        </dash-dot-drowpdown>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidenav'
import RippleButton from '@/components/buttons/RippleButton.vue'
import DashDotDrowpdown from '@/components/dropdowns/DashDotDrowpdown.vue'

const sidebarStore = useSidebarStore()

const isMobile = computed(() => sidebarStore.isMobile)

const toggleSidebar = () => {
  sidebarStore.isMobileOpen = !sidebarStore.isMobileOpen
}
</script>
