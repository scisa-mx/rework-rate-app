<script setup lang="ts">
import { defineProps } from 'vue'
import { DropdownMenuSeparator } from 'radix-vue'

const { className = '' } = defineProps<{
  className?: string
}>()
</script>

<template>
  <DropdownMenuSeparator :class="className" />
</template>
