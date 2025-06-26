<template>
  <fieldset :name="props.name" class="relative">
    <label v-if="props.label" :for="`${props.name}-input`" class="text-slate-700">
      {{ props.label }}
    </label>

    <input
      type="text"
      :id="`${props.name}-input`"
      class="inline-flex w-full items-center border border-gray-400 justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2sm shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 placeholder:text-slate-700 outline-hidden"
      placeholder="Buscar repositorio..."
      v-model="currentValue"
      autocomplete="off"
      :data-valid="true"
      @focus="handleFocus"
      @blur="handleBlur"
      ref="inputEl"
    />

    <!-- Lista fija (no filtrada) -->
    <ul
      v-if="isFocused && props.options.length > 0"
      class="absolute bg-white border border-gray-300 mt-1 w-full shadow-sm z-50 rounded text-sm"
    >
      <li
        v-for="option in props.options"
        :key="JSON.stringify(option.value)"
        @mousedown.prevent="selectOption(option)"
        class="px-3 py-1 hover:bg-royal-purple-100 cursor-pointer text-slate-800"
      >
        {{ option.label }}
      </li>
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DashSearchProps, DashOptionSelect } from '@/types'

const props = defineProps<DashSearchProps>()
const emit = defineEmits(['update:modelValue'])

const currentValue = ref('')
const isFocused = ref(false)

let debounceTimeout: ReturnType<typeof setTimeout> | undefined

// Solo ejecuta el callback, no filtra
watch(currentValue, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    props.callback?.(newValue)
  }, 300)
})

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 100)
}

const selectOption = (option: DashOptionSelect) => {
  currentValue.value = option.label
  emit('update:modelValue', option.value)
  isFocused.value = false
}
</script>
