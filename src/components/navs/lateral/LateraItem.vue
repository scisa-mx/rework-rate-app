<template>
  <li
    class="p-2 mb-2 rounded-md transition-all hover:bg-slate-100 relative group cursor-pointer"
    :class="[
      isActive
        ? 'text-royal-purple-800 font-semibold bg-linear-to-br from-royal-purple-300 to-royal-purple-100'
        : '',
      !isOpen ? 'flex items-center justify-center' : '',
    ]"
  >
    <router-link :to="props.item.path" class="flex space-x-2">
      <span>
        <vue-feather
          :class="isActive ? 'text-royal-purple-800' : 'text-gray-500'"
          :type="props.item.meta?.icon ? props.item.meta.icon : 'circle'"
        ></vue-feather>
      </span>
      <transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class=""
        leave-from-class=""
        leave-to-class=""
      >
        <span v-if="isOpen">
          {{ $t(props.item.name as string) }}
        </span>
      </transition>
    </router-link>
    <!-- Tooltip -->
    <div
      v-if="!isOpen"
      class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-slate-800 text-white text-sm rounded-xs px-2 py-1 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      {{ $t(props.item.name as string) }}
    </div>
  </li>
</template>

<script lang="ts" setup>
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import useSideNavLink from '@/@core/navbar/useSideNavLink'
import { useSidebarStore } from '@/stores/sidenav'
import { type RouteRecordRaw } from 'vue-router'

const router = useRoute()
const storeSidebar = useSidebarStore()

const props = defineProps<{
  item: RouteRecordRaw
}>()

const { isActive, updateIsActive } = useSideNavLink(props.item)

const isOpen = computed(() => storeSidebar.isOpen)

watch(
  () => router.fullPath,
  () => {
    updateIsActive()
  },
)
updateIsActive()
</script>
