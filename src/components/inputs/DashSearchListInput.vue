<template>
  <fieldset :name="props.name">
    <label class="text-slate-700" v-if="props.label" :for="`${props.name}-input`">{{
      props.label
    }}</label>
    <input
      type="text"
      :id="`${props.name}-input`"
      class="inline-flex w-[100%] items-center border border-gray-400 data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2sm shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 data-placeholder:text-slate-700 outline-hidden"
      :placeholder="'Buscar repositorio...'"
      v-model="currentValue"
      autocomplete="off"
      :data-valid="true"
    />
    <DashListBox :options="props.options"></DashListBox>
  </fieldset>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { type DashSearchProps } from '@/types'

import DashListBox from '@/components/inputs/DashListBox.vue'

let debounceTimeout: ReturnType<typeof setTimeout> | undefined

const props = defineProps<DashSearchProps>()
const currentValue = ref('')

watch(currentValue, (newValue) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  debounceTimeout = setTimeout(() => {
    if (props.callback) {
      props.callback(newValue)
    }
  }, 300)
})
</script>
