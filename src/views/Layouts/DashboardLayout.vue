<template>
  <section class="flex h-screen">
    <LateralNavbar />
    <div class="p-4 flex-1 overflow-auto bg-victoria-50">
      <SuperiorNavbar />
      <transition
        enter-active-class="transition-opacity duration-500 ease-in-out"
        leave-active-class="transition-opacity duration-500 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import LateralNavbar from '@/components/navs/lateral/LateralNavbar.vue'
import SuperiorNavbar from '@/components/navs/superior/SuperiorNavbar.vue'
</script>
