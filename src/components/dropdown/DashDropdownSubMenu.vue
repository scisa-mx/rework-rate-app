<script setup lang="ts">
import { defineProps } from 'vue'
import { DropdownMenuSubTrigger } from 'radix-vue'

interface SubTriggerProps {
  /** Clases CSS para el sub-trigger */
  subTriggerClass?: string
  /** Texto alternativo para accesibilidad (opcional) */
  ariaLabel?: string
}

const props = defineProps<SubTriggerProps>()
</script>

<template>
  <DropdownMenuSubTrigger :class="props.subTriggerClass" :aria-label="props.ariaLabel">
    <!-- Contenido personalizado, por ejemplo, el label del submenú y/o un ícono -->
    <slot />
  </DropdownMenuSubTrigger>
</template>
