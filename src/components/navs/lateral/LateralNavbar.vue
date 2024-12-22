<template>
  <div class="bg-victoria-50 h-full transition-all" :class="isMobile ? 'w-0' : ''">
    <div
      v-if="isMobileOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeMobileSidebar"
    ></div>
    <div>
      <nav
        :class="[
          'fixed top-0 left-0 h-full bg-gray-800 transition-all z-50',
          isMobile
            ? isMobileOpen
              ? 'translate-x-0'
              : '-translate-x-[calc(300px)]'
            : 'translate-x-0',
          isOpen ? 'w-64' : 'w-16',
        ]"
        class="bg-white relative m-4 rounded shadow-sm h-[calc(100vh-30px)]"
      >
        <div class="p-4 text-2xl font-bold">Mi App</div>
        <section class="flex-1">
          <ul>
            <LateralNavbarItem v-for="(item, idx) in items" :key="idx" :item="item" />
          </ul>
        </section>
        <section v-if="!isMobile" class="mt-2" name="sidenav-footer">
          <button @click="toggleNavbar" class="absolute bottom-4 w-full p-2 bg-gray-700 text-white">
            <span class="w-max flex justify-end items-end">
              <vue-feather type="arrow-left"></vue-feather>
            </span>
          </button>
        </section>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import LateralNavbarItem from './LateraItem.vue'

import { useSidebarStore } from '@/stores/sidenav'

import { type ItemNavbar } from '@/types'

const sidenavStore = useSidebarStore()
const isOpen = computed(() => sidenavStore.isOpen)
const isMobileOpen = computed(() => sidenavStore.isMobileOpen)
const isMobile = computed(() => sidenavStore.isMobile)

const items: ItemNavbar[] = [
  { name: 'Dashboard', route: '/', icon: '' },
  { name: 'Profile', route: '/profile', icon: '' },
  { name: 'Settings', route: '/settings', icon: '' },
]

const toggleNavbar = () => {
  sidenavStore.toggleSidebar()
  sidenavStore.toggleMobileSidebar()
}

const closeMobileSidebar = () => {
  sidenavStore.toggleMobileSidebar()
}
</script>
