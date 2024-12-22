<template>
  <li class="p-2 hover:bg-gray-700">
    <router-link :to="props.item.route" class="block">
      {{ props.item.name }}
    </router-link>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  item: { name: string; route: string }
}>()
</script>
