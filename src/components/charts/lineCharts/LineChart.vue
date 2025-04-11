<template>
  <section role="contentinfo">
    <Line :data="props.data"></Line>
  </section>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

import type { ChartData, LineOptions } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

interface LineChartProps {
  data: ChartData<'line'>
  options?: LineOptions
  callback?: (event: Event) => void
}

const props = defineProps<LineChartProps>()
const emit = defineEmits<{
  callback: [event: Event]
}>()

const handlerCallback = (event: Event) => {
  if (props.callback) {
    props.callback && props.callback(event)
    emit('callback', event)
  }
}

</script>
