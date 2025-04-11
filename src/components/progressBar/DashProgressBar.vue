<template>
  <ProgressRoot
    v-model="progressStyles"
    :class="['relative overflow-hidden bg-gray-100 rounded-full w-full', sizeClasses[props.size]]"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      :class="[
        'rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]',
        variantClasses[props.variant],
      ]"
      :style="`transform: translateX(-${progressStyles}%)`"
    >
    </ProgressIndicator>
  </ProgressRoot>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

type ProgressProps = {
  value?: number
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  variant: 'primary',
  size: 'md',
})

const progressValue = ref(props.value)

const variantClasses: Record<string, string> = {
  primary: 'bg-royal-purple-500',
  info: 'bg-sky-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

const sizeClasses: Record<string, string> = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6',
}

const progressStyles = computed(() => 100 - progressValue.value)
</script>
