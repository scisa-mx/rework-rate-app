<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type DashColProps = {
  col?: number
  padding?: number
}

const props = withDefaults(defineProps<DashColProps>(), {
  col: 1,
  padding: 1,
})

const colClass = computed(() => {
  return ['col-span-12', `md:col-span-${props.col}`, `p-${props.padding}`]
})
</script>
