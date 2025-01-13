<template>
  <main>
    <h1>Components</h1>
    <section>
      <div class="my-2 grid md:grid-cols-4 grid-cols-1 gap-4">
        <DashSelect label="" placeholder="Placeholder" v-model="fruit" :options="options" />
        <DashInput
          v-model="input"
          id="input-id"
          value="input-value"
          name="hola"
          placeholder="Placeholder"
          :required="true"
        />
        <DashDatePicker></DashDatePicker>
        <DashCheckbox label="" id="" v-model="checkbox" name="" :required="false" />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import DashSelect from '@/components/selects/DashSelect.vue'
import DashInput from '@/components/inputs/DashInput.vue'
import DashCheckbox from '@/components/checkboxes/DashCheckbox.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'

const fruit = ref<string>('')
const input = ref<string>('')
const checkbox = ref<boolean>(false)

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
</script>
