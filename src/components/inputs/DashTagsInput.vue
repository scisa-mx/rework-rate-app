<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from 'radix-vue'

import { type DashTagsInputProps } from '@/types'

const props = defineProps<DashTagsInputProps>()
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

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
      class="flex gap-2 items-center border p-2 rounded-lg w-full max-w-[480px] flex-wrap border-blackA7 bg-white focus:ring-2 hover:bg-royal-purple-50"
    >
      <TagsInputItem
        v-for="item in modelValue"
        :key="item"
        :value="item"
        class="text-white max-h-[35px] flex shadow-md items-center justify-center gap-2 bg-green8 bg-royal-purple-800 rounded p-1"
      >
        <TagsInputItemText class="text-sm pl-1" />
        <TagsInputItemDelete class="p-0.5 rounded bg-transparent hover:bg-blackA4">
          <vue-feather type="x" />
        </TagsInputItemDelete>
      </TagsInputItem>

      <TagsInputInput
        :placeholder="props.placeholder"
        class="text-sm focus:outline-none flex-1 rounded text-green9 bg-transparent placeholder:text-slate-400 px-1 focus:ring-2 focus:ring-royal-purple-500"
      />
    </TagsInputRoot>
  </fieldset>
</template>
