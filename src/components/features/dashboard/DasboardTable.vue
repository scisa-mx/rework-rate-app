<template>
  <section class="">
    <section class="grid grid-cols-2 gap-4" name="rework-rate">
      <HistoricalWidget></HistoricalWidget>
      <article class="col-span-1">
        <LineChart :data="data" />
      </article>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getPaletteColor } from '@/@core/charts/usePaletteColor'
import { getReworkRate } from '@/services/reworkRate/fetchReworkRate'

import LineChart from '@/components/charts/lineCharts/LineChart.vue'
import DashOverlay from '@/components/overlay/DashOverlay.vue'
import HistoricalWidget from './widgets/HistoricalWidget.vue'

import type { ChartData } from 'chart.js'
import type { Ref } from 'vue'

const COLORS = getPaletteColor()

const labels = ref<string[]>([])
const datapoints = ref<number[]>([])
const isLoading = ref(false)

const data: Ref<ChartData<'line'>> = ref({
  labels: labels.value,
  datasets: [
    {
      label: 'Rework rate en los meses por porcentaje',
      data: datapoints.value,
      borderColor: COLORS['primary-800'],
      fill: false,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4 as const,
    },
  ],
})

onMounted(async () => {
  isLoading.value = true
  await getReworkRate()
    .then((response) => {
      data.value.labels = response.labels
      data.value.datasets[0].data = response.datasets
      datapoints.value = response.datasets
    })
    .catch((error) => {
      console.error('Error fetching rework rate:', error)
    }).finally(() => {
      isLoading.value = false
    })
})

</script>
