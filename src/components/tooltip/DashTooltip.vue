<template>
  <TooltipProvider>
    <TooltipRoot :delay-duration="props.delayDuration">
      <TooltipTrigger class="inline-flex items-center">
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="props.side"
          :side-offset="props.offset"
          class="select-none rounded-md px-3 py-2 text-sm shadow-md will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-fadeIn data-[state=delayed-close]:data-[side=top]:animate-fadeOut"
          :class="[variantStyles, animationClasses]"
        >
          <slot name="content">{{ props.content }}</slot>
          <TooltipArrow :width="8" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'
import { computed } from 'vue'

type Side = 'top' | 'right' | 'bottom' | 'left'
type TooltipVariant = 'default' | 'dark'

const animationClasses =
  'data-[state=delayed-open]:data-[side=top]:animate-fadeIn data-[state=delayed-open]:data-[side=bottom]:animate-fadeIn data-[state=delayed-open]:data-[side=rigth]:animate-fadeIn data-[state=delayed-open]:data-[side=left]:animate-fadeIn data-[state=delayed-close]:data-[side=top]:animate-fadeOut'

type TooltipProps = {
  content: string
  side: Side
  offset: number
  variant?: TooltipVariant
  delayDuration?: number
}

const props = withDefaults(defineProps<TooltipProps>(), {
  side: 'top',
  offset: 8,
  variant: 'default',
  delayDuration: 0,
})

const variantStyles = computed(() => {
  switch (props.variant) {
    case 'dark':
      return 'bg-gray-800 text-white fill-gray-800'
    default:
      return 'bg-royal-purple-50 text-royal-purple-800 fill-royal-purple-50'
  }
})
</script>
