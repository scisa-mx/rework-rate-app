<template>
  <div class="fixed bottom-0 right-0 p-4 flex flex-col gap-2" name="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="relative">
      <ToastRoot
        :type="toast.type || 'foreground'"
        class="bg-white rounded-md shadow-lg p-4 ToastRoot"
        :class="[{ dismiss: toast.isDismissing }, getVariantClass(toast.variant)]"
      >
        <ToastTitle class="font-medium">{{ toast.title }}</ToastTitle>
        <ToastDescription class="relative">
          {{ toast.description }}
        </ToastDescription>
      </ToastRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastRoot, ToastTitle, ToastDescription } from 'radix-vue'
import { useToast } from '@/@core/toast/useToast'
import { type ToastVariant } from '@/@core/toast/useToast'

const { toasts } = useToast()

// using ToastVariant set the type of toast
function getVariantClass(variant?: ToastVariant) {
  switch (variant) {
    case 'SUCCESS':
      return 'bg-purple-800 text-white'
    case 'ERROR':
      return 'bg-red-500 text-white'
    case 'WARNING':
      return 'bg-yellow-500 text-white'
    case 'INFO':
      return 'bg-blue-500 text-white'
    default:
      return 'bg-purple-800 text-white'
  }
}
</script>

<style>
/* styles.css */
.ToastRoot[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}
.ToastRoot[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.ToastRoot[data-swipe='end'] {
  animation: slideRight 100ms ease-out;
}

.ToastRoot {
  animation: born 400ms ease-out;
}

.ToastRoot.dismiss {
  animation: kill 400ms ease-out;
}

@keyframes born {
  from {
    transform: translateX(calc(100vw + 100%));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes kill {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(calc(100vw + 100%));
    opacity: 0;
  }
}

@keyframes slideRight {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(100%);
  }
}
</style>
