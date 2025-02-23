<template>
  <main>
    <h1>Components</h1>
    <section>
      <DashContainer>
        <template #header>
          <h3 class="text-slate-700">INPUTS</h3>
        </template>
        <template #main>
          <DashFormGenerator
            id="form-generator"
            :submit-callback="handlerSubmit"
            v-model="fields"
          />
        </template>
      </DashContainer>
    </section>
    <section name="grid-system"></section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import DashContainer from '@/components/containers/DashContainer.vue'
import DashFormGenerator from '@/components/forms/DashFormGenerator.vue'

import { type FormInput } from '@/types'
import { InputTypes } from '@/types'

const startDate = new Date().toISOString()
const endDate = new Date().toISOString()

const handlerSubmit = async (_: Event, fields: FormInput[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  alert(JSON.stringify(fields, null, 2))
}

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes', disabled: true },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
]

const fields = ref<FormInput[]>([
  {
    type: InputTypes.Text,
    id: 'FormInputText',
    name: 'name',
    label: 'Name',
    required: false,
    value: '',
  },
  {
    type: InputTypes.Select,
    id: 'FormInputSelect',
    name: 'fruit',
    label: 'Fruit',
    options: options,
    required: false,
    value: '',
  },
  {
    type: InputTypes.DatePicker,
    id: 'FormInputDate',
    name: 'date',
    label: 'Date',
    required: false,
    value: new Date().toISOString(),
  },
  {
    type: InputTypes.DateRangePicker,
    id: 'FormInputDateRange',
    name: 'dateRange',
    label: 'Date Range',
    required: false,
    value: {
      start: startDate,
      end: endDate,
    },
  },
  {
    type: InputTypes.Checkbox,
    id: 'FormInputCheckbox',
    name: 'checkbox',
    label: 'Checkbox',
    required: false,
    value: true,
  },
  {
    type: InputTypes.Switch,
    id: 'FormInputSwitch',
    name: 'switch',
    label: 'Switch',
    required: false,
    value: false,
  },
  {
    type: InputTypes.Tags,
    id: 'FormInputTags',
    name: 'tags',
    label: 'Tags',
    required: false,
    value: [],
  },
])
</script>
