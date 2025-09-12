<template>
  <section class="flex h-screen relative">
    <LateralNavbar />
    <div class="p-4 flex-1 overflow-auto bg-victoria-50">
      <SuperiorNavbar />
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="transition-opacity duration-300 ease-in-out"
          leave-active-class="transition-opacity duration-300 ease-in-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
      <!-- Absolute position to bottom left -->
      <div name="version" class="absolute bottom-2 right-4.5 text-sm text-gray-500">
        <span>v{{ version }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LateralNavbar from '@/components/navs/lateral/LateralNavbar.vue'
import SuperiorNavbar from '@/components/navs/superior/SuperiorNavbar.vue'

// @ts-expect-error
const version = __APP_VERSION__
</script>
