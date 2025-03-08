<template>
  <ProgressRoot
    v-model="progressValue"
    class="relative overflow-hidden bg-blackA9 rounded-full w-full h-4 sm:h-5"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      :class="[
        'rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]',
        variantClasses[props.variant],
      ]"
      :style="progressStyles"
    >
      <!-- Etiqueta interna opcional -->
      <div
        v-if="insideLabel"
        class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white"
      >
        {{ progressValue }}%
      </div>
    </ProgressIndicator>
  </ProgressRoot>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

// Props para personalizar el componente
type ProgressProps = {
  value?: number
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'error'
  insideLabel?: boolean
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  variant: 'primary',
  insideLabel: false,
})

const progressValue = ref(props.value)

const variantClasses: Record<string, string> = {
  primary: 'bg-royal-purple-500',
  info: 'bg-sky-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

// Estilos dinámicos del indicador
const progressStyles = computed(() => `transform: translateX(-${100 - progressValue.value}%)`)
</script>
