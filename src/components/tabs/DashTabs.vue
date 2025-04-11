<template>
  <TabsRoot
    :default-value="props.triggers[0].title"
    class="w-full bg-white border border-gray-200 rounded-md shadow-2xs relative"
  >
    <TabsList class="flex flex-wrap items-center px-4 gap-2 border-b border-gray-200 relative">
      <TabsIndicator
        class="absolute left-0 h-0.5 bottom-0 w-(--radix-tabs-indicator-size) translate-x-(--radix-tabs-indicator-position) bg-royal-purple-500 transition-all duration-300"
      />
      <TabsTrigger
        v-for="trigger in props.triggers"
        :key="trigger.title"
        :value="trigger.title"
        :disabled="trigger.disabled"
        class="relative cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-royal-purple-500 hover:bg-gray-50 focus:outline-hidden focus-visible:ring-3 data-disabled:text-gray-500 data-disabled:bg-gray-50 focus-visible:ring-blue-100"
      >
        {{ trigger.title }}
        <span
          v-if="trigger.notifications"
          class="inline-block items-center justify-center rounded-full bg-royal-purple-50 px-2 py-0.5 text-center text-xs font-medium text-royal-purple-500"
        >
          <DashTypography variant="caption" class="text-xs">
            {{ trigger.notifications }}
          </DashTypography>
        </span>
      </TabsTrigger>
    </TabsList>
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger } from 'radix-vue'
import DashTypography from '../typography/DashTypography.vue'

type TabsTriggerProps = {
  title: string
  notifications?: string
  disabled?: boolean
}

type TabsProps = {
  triggers: TabsTriggerProps[]
}

const props = withDefaults(defineProps<TabsProps>(), {
  triggers: () => [],
  disabled: false,
  notifications: '',
})
</script>
