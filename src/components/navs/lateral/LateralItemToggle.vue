<template>
  <li>
    <div
      class="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      @click="toggleOpen"
    >
      <div class="flex items-center gap-2">
        <vue-feather :type="props.item.icon" />
        <span class="font-medium">{{ props.item.name }}</span>
      </div>
      <vue-feather
        :class="isOpen ? 'rotate-90' : ''"
        class="transition-transform"
        type="chevron-right"
      />
    </div>
    <ul v-if="isOpen" class="pl-4 mt-1 space-y-1">
      <LateraItem :item="link" v-for="link in props.item.links" :key="link.route" />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { type ToggleItemNavbar } from '@/types'
import LateraItem from './LateraItem.vue'

type Item = {
  item: ToggleItemNavbar
}

const props = defineProps<Item>()

// Estado para controlar si el submenú está abierto o cerrado
const isOpen = ref(false)

// Función para alternar el estado del submenú
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>
