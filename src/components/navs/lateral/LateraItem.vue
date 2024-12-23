<template>
  <li
    class="p-2 mb-2 rounded-md transition-all hover:bg-slate-100"
    :class="
      isActive
        ? 'text-royal-purple-800 font-semibold bg-gradient-to-br from-royal-purple-300 to-royal-purple-100'
        : ''
    "
  >
    <router-link :to="props.item.path" class="flex space-x-2">
      <span>
        <vue-feather
          class="text-slate-600"
          :type="props.item.meta?.icon ? props.item.meta.icon : 'circle'"
        ></vue-feather>
      </span>
      <span>
        {{ props.item.name }}
      </span>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { type RouteRecordRaw } from 'vue-router'
import useSideNavLink from '@/@core/navbar/useSideNavLink'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const router = useRoute()

const props = defineProps<{
  item: RouteRecordRaw
}>()

const { isActive, updateIsActive } = useSideNavLink(props.item)

watch(
  () => router.fullPath,
  () => {
    updateIsActive()
  },
)
updateIsActive()
</script>
