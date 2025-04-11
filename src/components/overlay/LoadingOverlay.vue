<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full z-20"
    >
      <svg
        class="animate-spin h-5 w-5 text-royal-purple-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
</script>

<style>
/* Animación Fade */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
