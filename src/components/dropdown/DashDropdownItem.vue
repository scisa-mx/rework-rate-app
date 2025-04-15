<script setup lang="ts">
import { defineProps } from 'vue'
import { DropdownMenuItem } from 'radix-vue'

interface MenuItemProps {
  /** Clases CSS para el ítem */
  itemClass?: string
}

const props = defineProps<MenuItemProps>()
</script>

<template>
  <DropdownMenuItem :class="props.itemClass">
    <!-- Aquí se inyecta el contenido personalizado que se desea mostrar en el ítem -->
    <slot />
    <!-- Si se desea un indicador (por ejemplo, para checkboxes o radios), se puede incluir un slot opcional -->
    <slot name="indicator" />
  </DropdownMenuItem>
</template>
