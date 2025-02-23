<template>
  <form>
    <div class="my-2 grid md:grid-cols-4 grid-cols-1 gap-4">
      <template v-for="field in fields">
        <DashSelect
          v-if="field.type === InputTypes.Select"
          :key="field.id"
          :is-valid="true"
          :label="field.label"
          :id="field.id"
          :options="field.options"
          :name="field.name"
          v-model="field.value"
        />
        <DashInput
          v-if="field.type === InputTypes.Text"
          :is-valid="true"
          :key="field.id"
          :label="field.label"
          :id="field.id"
          :name="field.name"
          v-model="field.value"
        />
        <DashDatePicker
          v-if="field.type === InputTypes.DatePicker"
          :is-valid="true"
          :key="field.id"
          :label="field.label"
          :id="field.id"
          :name="field.name"
          v-model="field.value"
        />
        <DashDateRangePicker
          v-if="field.type === InputTypes.DateRangePicker"
          :is-valid="true"
          :key="field.id"
          :label="field.label"
          :id="field.id"
          :name="field.name"
          v-model="field.value"
        />
        <DashCheckbox
          v-if="field.type === InputTypes.Checkbox"
          :is-valid="true"
          :key="field.id"
          :label="field.label"
          :id="field.id"
          :name="field.name"
          v-model="field.value"
        />
        <DashSwitch
          v-if="field.type === InputTypes.Switch"
          :is-valid="true"
          :key="field.id"
          :label="field.label"
          :id="field.id"
          :name="field.name"
          v-model="field.value"
        />
        <DashTagsInput
          v-if="field.type === InputTypes.Tags"
          :is-valid="true"
          :key="field.id"
          :label="field.label"
          :id="field.id"
          :name="field.name"
          v-model="field.value"
        />
      </template>
    </div>
    <div v-if="!$slots.submit" class="flex justify-end gap-3">
      <button
        @click="(e) => handlerSubmit(e)"
        type="button"
        class="relative min-w-[150px] px-4 py-2 text-white bg-royal-purple-800 rounded-full shadow-md transition-all duration-300 ease-out active:scale-95 focus:ring-4 focus:ring-royal-purple-500"
      >
        <span class="relative z-10">
          <slot>Save</slot>
        </span>
      </button>
      <button type="button" class="ml-2 text-royal-purple-800">cancel</button>
    </div>
    <slot name="submit" />
  </form>
</template>

<script lang="ts" setup>
import DashSelect from '@/components/selects/DashSelect.vue'
import DashInput from '@/components/inputs/DashInput.vue'
import DashCheckbox from '@/components/checkboxes/DashCheckbox.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'
import DashDateRangePicker from '@/components/selects/DashDateRangePicker.vue'
import DashSwitch from '@/components/checkboxes/DashSwitch.vue'
import DashTagsInput from '@/components/inputs/DashTagsInput.vue'

import { ref } from 'vue'

import { type FormInput, InputTypes } from '@/types'

interface FormGeneratorProps {
  modelValue: FormInput[]
  callback?: (event: Event, fields: FormInput[]) => void
}

const props = defineProps<FormGeneratorProps>()

const fields = ref(props.modelValue)

const handlerSubmit = (event: Event) => {
  if (props.callback) {
    props.callback(event, fields.value)
  }
}
</script>
