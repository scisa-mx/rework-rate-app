<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type DashGridProps = {
  cols?: number
  rows?: number
  gap?: number
}

const props = withDefaults(defineProps<DashGridProps>(), {
  cols: 1,
  rows: 1,
  gap: 4,
})

const { cols = 1, rows = 1, gap = 4 } = props

const gridClass = computed(() => {
  return ['grid', `md:grid-cols-${cols}`, `gap-${gap}`, `grid-rows-${rows}`, `grid-cols-1`].join(
    ' ',
  )
})
</script>
