<template>
  <fieldset :name="props.name">
    <label class="text-slate-700" v-if="props.label" :for="`${props.name}-input`">{{
      props.label
    }}</label>
    <input
      type="text"
      :id="`${props.name}-input`"
      class="inline-flex w-[100%] items-center border border-gray-400 data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2sm shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 data-placeholder:text-slate-700 outline-hidden"
      :placeholder="props.placeholder"
      v-model="internalValue"
      autocomplete="off"
      :data-valid="props.isValid"
    />
  </fieldset>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { type DashInputProps } from '@/types'

const props = defineProps<DashInputProps>()

const emit = defineEmits(['update:modelValue'])

const internalValue = ref('')

watch(
  () => internalValue.value,
  (newValue) => emit('update:modelValue', newValue),
)
</script>
