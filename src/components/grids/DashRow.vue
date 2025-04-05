<template>
  <div :class="rowClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type DashRowProps = {
  gridCols?: number
  gap?: number
  padding?: number
}

const props = withDefaults(defineProps<DashRowProps>(), {
  gridCols: 12,
  gap: 4,
  padding: 2,
})
const { gridCols } = props

const rowClass = computed(() => {
  return ['grid', `grid-cols-${gridCols}`, `gap-${props.gap}`, `p-${props.padding}`]
})
</script>
