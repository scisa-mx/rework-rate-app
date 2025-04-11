<!-- BContainer.vue -->
<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ContainerProps {
  fluid?: boolean
  solid?: boolean
  padding?: number
  shadow?: boolean
}
const props = defineProps<ContainerProps>()

// Si fluid es true, ocupa el 100% del ancho; sino, se centra con padding horizontal.
const containerClasses = computed(() => [
  props.fluid ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  props.solid ? 'bg-white rounded-lg' : 'bg-transparent',
  props.padding ? `p-${props.padding}` : '',
  props.shadow ? 'shadow-md' : '',
])
</script>
