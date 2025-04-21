<script setup lang="ts">
import { defineProps } from 'vue'
import { DropdownMenuTrigger } from 'radix-vue'

interface TriggerProps {
  triggerClass?: string
  ariaLabel?: string
}

const props = defineProps<TriggerProps>()
</script>

<template>
  <DropdownMenuTrigger :class="props.triggerClass" :aria-label="props.ariaLabel">
    <slot />
  </DropdownMenuTrigger>
</template>
