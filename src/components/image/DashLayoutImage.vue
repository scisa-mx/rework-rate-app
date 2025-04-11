<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 gap-4"
    :class="`md:grid-cols-${Math.min(itemCount, 3)} lg:grid-cols-${Math.min(itemCount, 3)}`"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, useSlots, onMounted } from 'vue'

const slots = useSlots()
const itemCount = ref(1)

onMounted(() => {
  itemCount.value = slots.default ? slots.default().length : 1
})
</script>
