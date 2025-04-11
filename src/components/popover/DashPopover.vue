<template>
  <PopoverRoot>
    <PopoverTrigger
      class="rounded-full inline-flex items-center justify-center text-primary bg-secondary shadow-blackA7 hover:bg-hover cursor-default outline-hidden"
      aria-label="Toggle popover"
    >
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal :disabled="props.disabled">
      <PopoverContent
        :side="props.side"
        :side-offset="props.sideOffset"
        class="rounded-sm shadow-lg z-50 p-5 w-[260px] bg-white will-change-[transform ,opacity] data-[state=open]:data-[side=top]:animate-slide-up-and-fade data-[state=open]:data-[side=right]:animate-slide-left-and-fade data-[state=open]:data-[side=bottom]:animate-slide-down-and-fade data-[state=open]:data-[side=left]:animate-slide-left-and-fade"
      >
        <slot name="content" />
        <PopoverClose
          class="rounded-full text-gray-700 cursor-pointer h-[25px] w-[25px] inline-flex items-center justify-center text-primary absolute top-[5px] right-[5px] hover:bg-slate-100 outline-hidden"
          aria-label="Close"
        >
          <vue-feather size="18" type="x" />
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'

type PopoverProps = {
  side: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<PopoverProps>(), {
  side: 'top',
  sideOffset: 5,
  disabled: false,
})
</script>
