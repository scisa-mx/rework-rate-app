<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { ref } from 'vue'

import { type DashCheckboxProps } from '@/types'

const props = defineProps<DashCheckboxProps>()

const switchState = ref(props.modelValue)
</script>

<template>
  <fieldset :name="props.name">
    <div class="gap-2 items-center">
      <label
        v-if="props.label"
        class="text-slate-700 text-[15px] leading-none pr-[15px] select-none"
        for="airplane-mode"
      >
        {{ props.label }}
      </label>
      <SwitchRoot
        id="airplane-mode"
        v-model:checked="switchState"
        class="w-[42px] cursor-pointer data-[disabled]:cursor-default data-[valid=false]:border-red-500 data-[valid=false]:ring-red-500 data-[valid=false]:ring-2 data-[valid=false]:border-2 h-[25px] focus-within:outline focus-within:outline-royal-purple-800 flex bg-royal-purple-800/50 shadow-sm rounded-full relative data-[state=checked]:bg-royal-purple-800"
        :data-valid="props.isValid"
      >
        <SwitchThumb
          class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
        />
      </SwitchRoot>
    </div>
  </fieldset>
</template>
