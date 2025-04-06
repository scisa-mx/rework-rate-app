<template>
  <button :class="buttonClasses" type="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

type ButtonSize = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant: ButtonVariant
  size: ButtonSize
}>()

const buttonStyles = computed(() => ({
  base: 'font-medium rounded-md focus:outline-hidden transition',
  primary:
    'text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 ease-out active:scale-95 focus:ring-4 focus:ring-purple-500',
  secondary:
    'text-gray-800 bg-slate-200 hover:bg-slate-300 transition-all duration-300 ease-out active:scale-95',
  success:
    'text-white bg-green-600 hover:bg-green-700 transition-all duration-300 ease-out active:scale-95 focus:ring-4 focus:ring-green-500',
  danger:
    'text-white bg-red-600 hover:bg-red-700 transition-all duration-300 ease-out active:scale-95 focus:ring-4 focus:ring-red-500',
  warning:
    'text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-out active:scale-95 focus:ring-4 focus:ring-yellow-500',
  info: 'text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-out active:scale-95 focus:ring-4 focus:ring-blue-500',
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
}))

const buttonClasses = computed(() => [
  buttonStyles.value.base,
  buttonStyles.value[props.variant],
  buttonStyles.value[props.size],
])
</script>
