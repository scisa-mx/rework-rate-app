<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { type DashCheckboxProps } from '@/types'

const props = withDefaults(defineProps<DashCheckboxProps>(), {})

const checkboxOne = ref(props.modelValue)
</script>

<template>
  <fieldset>
    <div class="flex flex-col">
      <label class="flex flex-col gap-4 [&>.checkbox]:hover:bg-neutral-100 cursor-pointer">
        <span v-if="props.label" class="select-none text-slate-700">{{ props.label }}</span>
      </label>
      <CheckboxRoot
        v-model:checked="checkboxOne"
        class="focus:ring-2 focus:ring-royal-purple-500 hover:bg-royal-purple-50 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-lg outline-none focus-within:shadow-[0_0_0_2px_black]"
      >
        <CheckboxIndicator
          class="data-[state=checked]:bg-royal-purple-800 data-[state=checked]:text-white bg-white h-full w-full rounded flex items-center justify-center"
        >
          <vue-feather size="18" type="check" class="h-3.5 w-3.5" />
        </CheckboxIndicator>
      </CheckboxRoot>
    </div>
  </fieldset>
</template>
