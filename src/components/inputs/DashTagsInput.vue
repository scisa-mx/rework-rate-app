<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from 'radix-vue'

import { type DashTagsInputProps } from '@/types'

const props = withDefaults(defineProps<DashTagsInputProps>(), {
  hasOptions: false,
  options: () => [],
})
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)
const isInputFocused = ref(false)


const addTag = (value: string) => {
  const tag = value.trim()
  if (tag && !modelValue.value.includes(tag)) {
    modelValue.value.push(tag)
  }
}

watch(
  () => modelValue.value,
  (newValue) => emit('update:modelValue', newValue),
)
</script>

<template>
  <fieldset :name="props.name">
    <label :for="props.id">
      <span class="text-slate-700" v-if="props.label">{{ props.label }}</span>
    </label>
    <TagsInputRoot
      :id="props.id"
      v-model="modelValue"
      class="flex gap-2 items-center border border-gray-400 shadow-2xs p-2 rounded-sm w-full max-w-[480px] flex-wrap bg-white hover:bg-royal-purple-50"
      :class="{
        'ring-2 ring-royal-purple-500': isInputFocused,
        'data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red':
          !props.isValid,
      }"
      :data-valid="props.isValid"
    >
      <TagsInputItem
        v-for="item in modelValue"
        :key="item"
        :value="item"
        class="text-white max-h-[35px] flex shadow-md items-center justify-center gap-2 bg-green8 bg-royal-purple-800 rounded-sm p-1"
      >
        <TagsInputItemText class="text-sm pl-1" />
        <TagsInputItemDelete class="p-0.5 cursor-pointer rounded-xs bg-transparent">
          <vue-feather size="12" type="x" />
        </TagsInputItemDelete>
      </TagsInputItem>

      <TagsInputInput
        :placeholder="props.placeholder"
        class="text-sm focus:outline-hidden flex-1 rounded-xs text-green9 bg-transparent placeholder:text-slate-400 px-1"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      />
    </TagsInputRoot>
    <ul
      v-if="props.options.length > 0 && isInputFocused"
      class="absolute bg-white border border-gray-300 mt-1 w-full max-w-[480px] shadow-sm z-50 rounded text-sm"
    >
      <li
        v-for="option in props.options"
        :key="JSON.stringify(option.value)"
        @mousedown.prevent="addTag(option.label)"
        class="px-3 py-1 hover:bg-royal-purple-100 cursor-pointer text-slate-800"
      >
        {{ option.label }}
      </li>
    </ul>
  </fieldset>
</template>
