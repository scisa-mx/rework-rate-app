<template>
  <li>
    <ul>
      <LateraItem v-for="(item, idx) in props.item.links" :key="idx" :item="item" />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import LateraItem from './LateraItem.vue'

import { type ToggleItemNavbar } from '@/types'

type Item = {
  item: ToggleItemNavbar
}

const props = defineProps<Item>()
</script>
