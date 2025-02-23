<template>
  <div
    class="rounded-lg shadow-md bg-white"
    :class="[panelStyles.gridColumn, panelStyles.gridRow, panelStyles.padding]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PanelProps = {
  colSpan?: number
  rowSpan?: number
  padding?: number
}

const { colSpan, rowSpan, padding } = defineProps<PanelProps>()

const panelStyles = computed(() => ({
  gridColumn: `col-span-${colSpan}`,
  gridRow: `row-span-${rowSpan}`,
  padding: `p-${padding}`,
}))
</script>
