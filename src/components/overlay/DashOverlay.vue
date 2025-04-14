<template>
  <div class="relative">
    <!-- Contenido principal mediante slot -->
    <slot></slot>

    <!-- Overlay con transición -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-gray-800/50 flex items-center justify-center z-50"
      >
        <DashSpinner />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import DashSpinner from '@/components/spinners/DashSpinner.vue';

interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
