<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'

import DashTypography from '@/components/typography/DashTypography.vue'

type DashModalProps = {
  title?: string
  description?: string
}

const props = defineProps<DashModalProps>()
</script>

<template>
  <DialogRoot>
    <DialogTrigger>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-black/50 backdrop-blur-xs data-[state=open]:animate-overlay-show fixed inset-0 z-99"
      />
      <DialogContent
        class="data-[state=open]:animate-content-show fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-6 focus:outline-hidden z-100"
      >
        <DialogTitle v-if="props.title">
          <DashTypography variant="h4">
            {{ props.title }}
          </DashTypography>
        </DialogTitle>
        <DialogDescription v-if="props.description">
          <DashTypography variant="body">
            {{ props.description }}
          </DashTypography>
        </DialogDescription>
        <slot name="content" />

        <DialogClose
          class="text-gray-700 cursor-pointer hover:bg-slate-100 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
          aria-label="Close"
        >
          <vue-feather type="x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
