<template>
  <div class="relative">
    <!-- Contenido principal mediante slot -->
    <slot></slot>

    <!-- Overlay que se muestra solo si isLoading es true -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-gray-800-50 flex items-center justify-center z-50"
    >
      <div class="w-16 h-16 border-8 border-gray-200 border-t-royal-purple-500 rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>()
</script>
