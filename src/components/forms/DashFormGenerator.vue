<template>
  <form>
    <div class="grid grid-cols-1 gap-4">
      <template v-for="field in fields">
        <!-- <DashSelect   /> -->
      </template>
    </div>
  </form>
</template>

<script lang="ts" setup>
// import DashSelect from '@/components/selects/DashSelect.vue'
// import DashInput from '@/components/inputs/DashInput.vue'
// import DashCheckbox from '@/components/checkboxes/DashCheckbox.vue'
// import DashDatePicker from '@/components/selects/DashDatePicker.vue'
// import DashDateRangePicker from '@/components/selects/DashDateRangePicker.vue'
// import DashSwitch from '@/components/checkboxes/DashSwitch.vue'
// import DashTagsInput from '@/components/inputs/DashTagsInput.vue'

import { ref } from 'vue'

import { type FormInput } from '@/types'

interface FormGeneratorProps {
  fields: FormInput[]
  callback: () => void
}

const props = defineProps<FormInput[]>()

const fields = ref(props)
</script>
