<template>
  <section class="flex h-screen">
    <LateralNavbar />
    <div class="p-4 flex-1 overflow-auto bg-victoria-50">
      <SuperiorNavbar />
      <router-view />
    </div>
  </section>
</template>

<script setup lang="ts">
import LateralNavbar from '@/components/navs/lateral/LateralNavbar.vue'
import SuperiorNavbar from '@/components/navs/superior/SuperiorNavbar.vue'
</script>
