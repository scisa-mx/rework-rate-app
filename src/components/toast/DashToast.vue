<!-- ToastContainer.vue -->
<template>
  <div class="fixed bottom-0 right-0 p-4 flex flex-col gap-2">
    <ToastRoot
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type || 'foreground'"
      class="bg-white rounded-md shadow-lg p-4"
    >
      <ToastTitle class="font-medium text-gray-900">{{ toast.title }}</ToastTitle>
      <ToastDescription class="text-gray-700">{{ toast.description }}</ToastDescription>
      <ToastAction asChild alt-text="Cerrar">
        <button @click="dismissToast(toast.id)">Cerrar</button>
      </ToastAction>
    </ToastRoot>
  </div>
</template>

<script setup lang="ts">
import { ToastRoot, ToastTitle, ToastDescription, ToastAction } from 'radix-vue'
import { useToast } from '@/@core/toast/useToast'

const { toasts, dismissToast } = useToast()
</script>
