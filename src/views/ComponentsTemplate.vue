<template>
  <main>
    <h1>Components</h1>
    <section>
      <h3 class="text-slate-600">Select</h3>
      <div class="my-2 grid md:grid-cols-4 grid-cols-1 gap-4">
        <DashSelect v-model="fruit" :options="options" label="Choose a fruit" />
        <DashInput placeholder="Placeholder" v-model="input" />
        <DashCheckbox v-model="checkbox" />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import DashSelect from '@/components/selects/DashSelect.vue'
import DashInput from '@/components/inputs/DashInput.vue'
import DashCheckbox from '@/components/checkboxes/DashCheckbox.vue'

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
  { label: 'Lemon', value: 'lemon' },
  { label: 'Lime', value: 'lime' },
  { label: 'Mango', value: 'mango' },
  { label: 'Peach', value: 'peach' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Plum', value: 'plum' },
  { label: 'Coconut', value: 'coconut', disabled: true },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Guava', value: 'guava' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Fig', value: 'fig' },
  { label: 'Date', value: 'date' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Avocado', value: 'avocado' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Cranberry', value: 'cranberry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Lychee', value: 'lychee', disabled: true },
  { label: 'Starfruit', value: 'starfruit' },
  { label: 'Passionfruit', value: 'passionfruit' },
  { label: 'Persimmon', value: 'persimmon' },
  { label: 'Tangerine', value: 'tangerine' },
  { label: 'Jackfruit', value: 'jackfruit' },
  { label: 'Durian', value: 'durian', disabled: true },
  { label: 'Mangosteen', value: 'mangosteen' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Quince', value: 'quince' },
  { label: 'Mulberry', value: 'mulberry' },
  { label: 'Nectarine', value: 'nectarine' },
  { label: 'Currant', value: 'currant' },
  { label: 'Gooseberry', value: 'gooseberry' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Boysenberry', value: 'boysenberry' },
  { label: 'Salak', value: 'salak' },
  { label: 'Rambutan', value: 'rambutan' },
  { label: 'Longan', value: 'longan' },
  { label: 'Buddha’s Hand', value: 'buddhas-hand' },
  { label: 'Medlar', value: 'medlar' },
  { label: 'Kumquat', value: 'kumquat' },
  { label: 'Soursop', value: 'soursop' },
]
</script>
