<template>
  <div class="bg-victoria-50 h-full transition-all" :class="isMobile ? 'w-0' : ''">
    <div
      v-if="isMobileOpen && isMobile"
      class="fixed inset-0 bg-black/50  z-40"
      @click="closeMobileSidebar"
    ></div>
    <div class="h-[calc(100vh-30px)]">
      <nav :class="navClasses" class="bg-white relative m-4 rounded-sm shadow">
        <div class="p-4 flex justify-center items-center"> 
        <img v-if="isOpen" src="/SCISA LOGOTIPO.png" alt="Scisa logo" class="h-10 w-auto" />
        <img v-else src="/Scisa_Logo_Glyph.png" alt="Scisa logo - without text" class="h-10 w-auto" />
      </div>
        <section class="flex-1">
          <ul class="mx-2">
            <li class="text-slate-600 text-md text-semibold">
              <div>Pages</div>
              <hr class="mb-2 mt-1 border-t border-slate-300" />
            </li>
            <LateralNavbarItem v-for="(item, idx) in items" :key="idx" :item="item" />
          </ul>
        </section>
        <section v-if="!isMobile" class="mt-2" name="sidenav-footer">
          <button @click="toggleNavbar" class="absolute bottom-4 w-full p-2 cursor-pointer">
            <span class="w-max flex justify-end items-end">
              <vue-feather class="text-slate-600" type="sidebar"></vue-feather>
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

import ROUTES from '@/router/routes'

const sidenavStore = useSidebarStore()
const isOpen = computed(() => sidenavStore.isOpen)
const isMobileOpen = computed(() => sidenavStore.isMobileOpen)
const isMobile = computed(() => sidenavStore.isMobile)

const items = ROUTES

const toggleNavbar = () => {
  sidenavStore.toggleSidebar()
  sidenavStore.toggleMobileSidebar()
}

const closeMobileSidebar = () => {
  sidenavStore.toggleMobileSidebar()
}

const navClasses = computed(() => {
  const baseClasses = 'absolute top-0 left-0 h-full bg-gray-800 transition-all z-50'

  const mobileClasses = isMobile.value
    ? isMobileOpen.value
      ? 'translate-x-0'
      : '-translate-x-[calc(300px)]'
    : 'translate-x-0'

  const widthClasses = isOpen.value ? 'w-64' : 'w-16'

  return [baseClasses, mobileClasses, widthClasses]
})
</script>
