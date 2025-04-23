<template>
  <div>
    <section class="w-full">
      <DashTypography variant="h5" class="text-slate-700 font-semibold sm:text-2xl">
        Historico Rework Rate
      </DashTypography>
      <span>
      </span>
    </section>
    <section class="flex justify-between" name="historical-widget-options">
      <div>
        <DashSelect
          id="repository-hisorical"
          :is-valid="true"
          v-model="repository"
          :options="options"
          :placeholder="'Selecciona un repositorio'"
        />
      </div>
    </section>
    <section name="box-chart" class="">
      <LineChart :options="optionsChart" :key="JSON.stringify(data)" :data="data" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getPaletteColor } from '@/@core/charts/usePaletteColor'
import { getAllRepos, getHistoryByRepo, getReworkRate } from '@/services/reworkRate/fetchReworkRate'
import { inject } from 'vue'

import LineChart from '@/components/charts/lineCharts/LineChart.vue'
import DashSelect from '@/components/selects/DashSelect.vue'
import DashTypography from '@/components/typography/DashTypography.vue'

import type { ChartData } from 'chart.js'
import type { DashOptionSelect } from '@/types'
import type { Ref } from 'vue'
import type { ReworkRate } from '@/types/benchmarks/rework-rate'

type Repos = {
  name: string
  url: string
}

type ReposHisoty = {
  author: string
  id: number
  periodEnd: string
  periodStart: string
  prNumber: string
  reworkPercentage: number
}

const COLORS = getPaletteColor()

const repos = ref<ReworkRate[]>([])

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
    repos.value = await getHistoryByRepo(value)
    const values = formatDatesForChart(repos.value)
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

const formatDatesForChart = (repos: ReworkRate[]) => {
  const labels: string[] = []
  const datapoints: number[] = []
  repos.forEach((repo) => {
    const date = new Date(repo.periodStart)
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    labels.push(`${day}-${month}-${year}`)
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
