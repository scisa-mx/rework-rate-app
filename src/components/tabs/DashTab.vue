<template>
  <TabsContent :value="props.value" class="p-4 text-sm text-gray-700">
    <slot />
  </TabsContent>
</template>

<script lang="ts" setup>
import { TabsContent } from 'radix-vue'

type TabProps = {
  value: string
}

const props = defineProps<TabProps>()
</script>
