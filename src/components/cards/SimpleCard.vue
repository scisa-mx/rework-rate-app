<template>
  <div class="relative p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <LoadingOverlay v-model="loading" />

    <h3 class="text-lg font-semibold">Título de la Tarjeta</h3>
    <p class="text-gray-600">Este es un contenido dentro de la tarjeta.</p>

    <button
      @click="toggleLoading"
      class="mt-4 bg-royal-purple-800 text-white px-4 py-2 rounded-full"
    >
      Simular Carga
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoadingOverlay from '@/components/overlay/LoadingOverlay.vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000) // Simula 2 segundos de carga
}
</script>
