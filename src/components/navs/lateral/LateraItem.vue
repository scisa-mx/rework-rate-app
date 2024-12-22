<template>
  <li
    class="p-2 mb-2 rounded-md transition-all hover:bg-slate-100"
    :class="
      isActive
        ? 'text-royal-purple-800 font-semibold bg-gradient-to-br from-royal-purple-300 to-royal-purple-100'
        : ''
    "
  >
    <router-link :to="props.item.route" class="flex space-x-2">
      <span>
        <vue-feather
          class="text-slate-600"
          :type="props.item.icon ? props.item.icon : 'circle'"
        ></vue-feather>
      </span>
      <span>
        {{ props.item.name }}
      </span>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
const isActive = false

const props = defineProps<{
  item: { name: string; route: string; icon?: string }
}>()
</script>
