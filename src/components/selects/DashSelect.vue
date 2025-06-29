<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

import { type DashSelectProps } from '@/types'

const props = defineProps<DashSelectProps>()

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref()

watch(
  () => selectedValue.value,
  (newValue) => emit('update:modelValue', newValue),
)

selectedValue.value = props.modelValue
</script>

<template>
  <fieldset :name="props.name">
    <label v-if="props.label" class="text-slate-700">{{ props.label }}</label>
    <SelectRoot class="w-max" v-model="selectedValue">
      <SelectTrigger
        class="inline-flex border border-gray-400 w-[100%] data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red items-center justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2xs shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 data-placeholder:text-slate-700 outline-hidden"
        aria-label="Customise options"
        :data-valid="props.isValid"
      >
        <SelectValue
          :class="[selectedValue ? '' : 'text-slate-400']"
          :placeholder="props.placeholder"
        />
        <vue-feather :class="[selectedValue ? '' : 'text-slate-400']" type="chevron-up" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="min-w-[160px] bg-white rounded-xs shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-100"
          :side-offset="5"
        >
          <SelectScrollUpButton
            class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
          >
            <vue-feather type="chevron-up" />
          </SelectScrollUpButton>

          <SelectViewport class="p-[5px]">
            <SelectGroup>
              <SelectItem
                v-for="(option, index) in options"
                :key="index"
                class="text-[13px] cursor-pointer leading-none text-slate-700 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-disabled:text-slate-500 data-disabled:pointer-events-none data-highlighted:outline-hidden data-highlighted:bg-royal-purple-100 data-highlighted:text-royal-purple-900 data-highlighted:shadow-inset data-highlighted:shadow-royal-purple-800"
                :value="String(option.value)"
                :disabled="option.disabled"
              >
                <SelectItemIndicator
                  class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                >
                  <vue-feather size="15" type="check" />
                </SelectItemIndicator>
                <SelectItemText>
                  <div v-if="$slots.tag">
                      <slot name="tag" :option="option" > </slot>
                  </div>
                  <div v-else>
                    {{ option.label }}
                  </div>
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>

          <SelectScrollDownButton
            class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
          >
            <vue-feather type="chevron-up" />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </fieldset>
</template>
