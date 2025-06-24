<template>
  <div role="listbox"></div>
  <ListboxRoot class="flex flex-colrounded-lg bg-white text-green9 mx-auto">
    <ListboxContent
      class="min-w-[160px] max-w-[300px] bg-white p-[5px] rounded-xs shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-100"
    >
      <ListboxGroup>
        <ListboxItem
          v-for=" (i, idx) in props.options"
          :key="idx"
          :value="i.value"
          class="w-full hover:bg-royal-purple-100 hover:text-royal-purple-800 cursor-pointer flex items-center px-[25px] h-[25px] leading-none text-[13px] relative text-slate-800 select-none outline-none data-[state=checked]:bg-royal-purple-200 data-[state=checked]:text-royal-purple-800 data-[disabled]:opacity-50 rounded"
        >
          <ListboxItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <vue-feather size="15" type="check" />
          </ListboxItemIndicator>
          <span class="truncate w-full">{{ i.label }}</span>
        </ListboxItem>
      </ListboxGroup>
    </ListboxContent>
  </ListboxRoot>
</template>

<script setup lang="ts">
import {
  ListboxContent,
  ListboxGroup,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot,
} from 'radix-vue'

import {type DashOptionSelect} from '@/types'


interface ListboxItemProps {
  options: DashOptionSelect[]
}

const props = defineProps<ListboxItemProps>()

</script>
