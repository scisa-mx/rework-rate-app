<template>
  <div>
    <section class="w-full">
      <DashTypography variant="h5" class="text-slate-700 font-semibold sm:text-2xl">
        Historico Rework Rate
      </DashTypography>
      <span> </span>
    </section>
    <section class="flex px-2 justify-between" name="historical-widget-options">
      <DashSelect
        id="repository-hisorical"
        :is-valid="true"
        v-model="repository"
        :options="options"
        :label="'Selecciona un repositorio'"
      />
      <div class="flex gap-2">
        <DashDatePicker
          id="start-date-historical"
          :is-valid="true"
          v-model="dates.start"
          :label="'Fecha de inicio'"
        />
        <DashDatePicker
          id="end-date-historical"
          :is-valid="true"
          v-model="dates.end"
          :label="'Fecha de fin'"
        />
      </div>
    </section>
    <section name="box-chart" class="">
      <LineChart :options="optionsChart" :key="JSON.stringify(data)" :data="data" />
    </section>
    <section name="mean-median" class="flex gap-2 px-2 mt-2">
      <DashTypography variant="h6" class="text-slate-700 font-semibold">
        Media: {{ meanAndMedian.mean }}
      </DashTypography>
      <DashTypography variant="h6" class="text-slate-700 font-semibold">
        Mediana: {{ meanAndMedian.median }}
      </DashTypography>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getPaletteColor } from '@/@core/charts/usePaletteColor'
import { getAllRepos, getHistoryByRepo, getMeanAndMedian } from '@/services/reworkRate/fetchReworkRate'
import { inject } from 'vue'

import LineChart from '@/components/charts/lineCharts/LineChart.vue'
import DashSelect from '@/components/selects/DashSelect.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'
import DashTypography from '@/components/typography/DashTypography.vue'

import type { ChartData } from 'chart.js'
import type { DashOptionSelect } from '@/types'
import type { Ref } from 'vue'
import type { ReworkRate } from '@/types/benchmarks/rework-rate'

type Repos = {
  name: string
  url: string
}

const COLORS = getPaletteColor()

const repos = ref<ReworkRate[]>([])

const dates = ref({
  start: undefined,
  end: undefined,
})

const meanAndMedian = ref({
  mean: 0,
  median: 0,
})

const isLoading = inject('isLoading') as Ref<boolean>

const options = ref<DashOptionSelect[]>([
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
])

const repository = ref<string>('')

const data: Ref<ChartData<'line'>> = ref({
  labels: [],
  datasets: [
    {
      label: 'Rework rate en los meses por porcentaje',
      data: [],
      borderColor: COLORS['primary-800'],
      fill: false,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4 as const,
    },
  ],
})

const optionsChart = {
  responsive: true,
  maintainAspectRatio: false,
}

watch(
  () => repository.value,
  () => {
    handlerData(repository.value as string)
  },
)

watch(
  () => dates.value,
  () => {
    handlerData(repository.value as string)
  },
  { deep: true },
)

const formatRepos = (reqs: Repos[]) => {
  return reqs.map((repo) => {
    return {
      value: repo.url,
      label: repo.name,
    }
  })
}

const handlerData = async (value: string) => {
  isLoading.value = true
  try {
    repos.value = await getHistoryByRepo(value, dates.value.start ? dates.value.start : null, dates.value.end ? dates.value.end : null)
    const values = formatDatesForChart(repos.value)
    await getMeanAndMedianInfo(value)
    data.value.labels = values.labels
    data.value.datasets[0].data = values.datapoints
  } catch {
    console.error('Error fetching repository history')
  } finally {
    // Better UX to show loading for a bit even if the data is already loaded
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

const getMeanAndMedianInfo = async (value: string) => {
  isLoading.value = true
  try {
    const res = await getMeanAndMedian(value, dates.value.start ? dates.value.start : null, dates.value.end ? dates.value.end : null)
    meanAndMedian.value.mean = res.mean
    meanAndMedian.value.median = res.median
  } catch (error) {
    console.error('Error fetching mean and median:', error)
  } finally {
    isLoading.value = false
  }
}

const formatDatesForChart = (repos: ReworkRate[]) => {
  const labels: string[] = []
  const datapoints: number[] = []
  repos.forEach((repo) => {
    const date = new Date(repo.periodStart)
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    labels.push(date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }))
    datapoints.push(repo.reworkPercentage)
  })
  return { labels, datapoints }
}

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await getAllRepos()
    options.value = formatRepos(data)
  } catch (error) {
    console.error('Error fetching repositories:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
