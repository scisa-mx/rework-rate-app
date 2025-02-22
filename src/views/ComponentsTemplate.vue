<template>
  <main>
    <h1>Components</h1>
    <section>
      <div class="my-2 grid md:grid-cols-4 grid-cols-1 gap-4">
        <DashSelect
          id=""
          :is-valid="state"
          label="Input select"
          placeholder="Placeholder"
          v-model="fruit"
          :options="options"
          name="select"
        />
        <DashInput
          v-model="input"
          id="input-id"
          value="input-value"
          name="hola"
          label="Input text"
          placeholder="Placeholder"
          :required="false"
          :is-valid="state"
        />
        <DashDatePicker
          id="picker"
          name="picker"
          label="Data picker"
          v-model="date"
          :required="false"
          :is-valid="state"
        ></DashDatePicker>
        <DashDateRangePicker
          id=""
          label="Data range picker"
          v-model="dateRange"
          name="picker-range"
          :required="false"
          :is-valid="state"
        />
        <DashCheckbox
          label="Checkbox"
          id=""
          v-model="checkbox"
          name="checkbox"
          :required="false"
          :is-valid="state"
        />
        <DashSwitch id="" label="Swtich" v-model="switchState" name="switch" :is-valid="state" />
        <DashTagsInput
          id=""
          label="Tags input"
          name="tags-input"
          v-model="tags"
          :is-valid="state"
        />
      </div>
    </section>
    <section>
      <DashContainer>
        <template #header>
          <h2>INPUTS</h2>
        </template>
        <template #main>
          <div class="my-2 grid md:grid-cols-4 grid-cols-1 gap-4">
            <DashSelect
              id=""
              :is-valid="state"
              label="Input select"
              placeholder="Placeholder"
              v-model="fruit"
              :options="options"
              name="select"
            />
            <DashInput
              v-model="input"
              id="input-id"
              value="input-value"
              name="hola"
              label="Input text"
              placeholder="Placeholder"
              :required="false"
              :is-valid="state"
            />
            <DashDatePicker
              id="picker"
              name="picker"
              label="Data picker"
              v-model="date"
              :required="false"
              :is-valid="state"
            ></DashDatePicker>
            <DashDateRangePicker
              id=""
              label="Data range picker"
              v-model="dateRange"
              name="picker-range"
              :required="false"
              :is-valid="state"
            />
            <DashCheckbox
              label="Checkbox"
              id=""
              v-model="checkbox"
              name="checkbox"
              :required="false"
              :is-valid="state"
            />
            <DashSwitch
              id=""
              label="Swtich"
              v-model="switchState"
              name="switch"
              :is-valid="state"
            />
            <DashTagsInput
              id=""
              label="Tags input"
              name="tags-input"
              v-model="tags"
              :is-valid="state"
            />
          </div>
        </template>
      </DashContainer>

      <!-- <DashFormGenerator :fields="fields" /> -->
    </section>
    <section name="grid-system"></section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import DashSelect from '@/components/selects/DashSelect.vue'
import DashInput from '@/components/inputs/DashInput.vue'
import DashCheckbox from '@/components/checkboxes/DashCheckbox.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'
import DashDateRangePicker from '@/components/selects/DashDateRangePicker.vue'
import DashSwitch from '@/components/checkboxes/DashSwitch.vue'
import DashTagsInput from '@/components/inputs/DashTagsInput.vue'
import DashContainer from '@/components/containers/DashContainer.vue'
import DashFormGenerator from '@/components/forms/DashFormGenerator.vue'

import { type DateRangeSchema } from '@/types'
import { type FormInput } from '@/types'
import { InputTypes } from '@/types'

const fruit = ref<string>('')
const input = ref<string>('')
const checkbox = ref<boolean>(false)
const switchState = ref<boolean>(false)
const date = ref<string>(new Date().toISOString())
const tags = ref<string[]>([])

const state = true

const startDate = new Date().toISOString()
const endDate = new Date().toISOString()

const dateRange = ref<DateRangeSchema>({
  start: startDate,
  end: endDate,
})

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

// un field de cada tipo
const fields = ref<FormInput[]>([
  {
    type: InputTypes.Text,
    id: 'FormInputText',
    name: 'name',
    label: 'Name',
    required: false,
  },
  {
    type: InputTypes.Select,
    id: 'FormInputSelect',
    name: 'fruit',
    label: 'Fruit',
    options: options,
    required: false,
  },
  {
    type: InputTypes.DatePicker,
    id: 'FormInputDate',
    name: 'date',
    label: 'Date',
    required: false,
    date: new Date().toISOString(),
  },
  {
    type: InputTypes.DateRangePicker,
    id: 'FormInputDateRange',
    name: 'dateRange',
    label: 'Date Range',
    required: false,
    dateRange: {
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
  },
  {
    type: InputTypes.Switch,
    id: 'FormInputSwitch',
    name: 'switch',
    label: 'Switch',
    required: false,
  },
  {
    type: InputTypes.Tags,
    id: 'FormInputTags',
    name: 'tags',
    label: 'Tags',
    required: false,
    tags: [],
  },
])

console.log(fields.value)
</script>
