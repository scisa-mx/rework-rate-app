<template>
  <article>
    <slot v-if="$slots.header" name="header"></slot>
    <div v-if="props.header" class="flex flex-col gap-2">
      <DashTypography variant="h5" class="font-bold text-gray-800 dark:text-gray-200">
        {{ props.header }}
      </DashTypography>
    </div>

    <slot v-if="$slots.body" name="body"></slot>
    <div v-if="props.body">
      <DashTypography variant="body" class="text-gray-600 dark:text-gray-400">
        {{ props.body }}
      </DashTypography>
    </div>

    <slot v-if="$slots.footer" name="footer"></slot>
    <div v-if="props.footer" class="dark:border-gray-700">
      <DashTypography variant="caption" class="text-gray-500 dark:text-gray-400">
        {{ props.footer }}
      </DashTypography>
    </div>
    <div v-if="props.action" class="mt-4">
      <DashButton variant="primary" size="md">
        <span>{{ props.label }}</span>
      </DashButton>
    </div>
  </article>
</template>

<script lang="ts" setup>
import DashTypography from '@/components/typography/DashTypography.vue'
import DashButton from '@/components/buttons/DashButton.vue'
import type { DashBaseCardProps } from '@/types/cards/card'

const props = defineProps<DashBaseCardProps>()
</script>
