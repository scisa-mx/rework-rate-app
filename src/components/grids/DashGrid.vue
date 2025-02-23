<template>
  <section
    :name="name"
    class="grid"
    :class="[gridStyles.gridFlow, gridStyles.gridCols, gridStyles.gridRows, `gap-${gap}`]"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type GridProps = {
  name: string
  cols: number
  rows: number
  gap: number
}

const { name, cols, rows, gap } = defineProps<GridProps>()

const gridStyles = computed(() => ({
  gridFlow: 'grid-flow-row md:grid-flow-col',
  gridCols: `grid-cols-1 md:grid-cols-${cols}`,
  gridRows: `grid-rows-${rows} md:grid-rows-${rows}`,
}))
</script>
