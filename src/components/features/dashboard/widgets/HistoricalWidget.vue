<template>
  <div>
    <section class="w-full flex justify-between items-center" name="historical-widget-header">
      <DashTypography variant="h5" class="text-slate-700 font-semibold sm:text-2xl">
        Historico Rework Rate
      </DashTypography>
      <span @click="deleteWidtet" class="cursor-pointer hover:text-gray-500">
        <vue-feather size="18" type="x" />
      </span>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-4 gap-2" name="historical-widget-options">
      <div class="col-span-2">
        <DashTagsInput
          id="repository-historical-tags"
          :is-valid="true"
          v-model="tags"
          :options="options"
          :label="'Tags'"
        />
      </div>
      <div class="col-span-2">
        <DashSelect
          id="repository-hisorical"
          :is-valid="true"
          v-model="repository"
          :options="options"
          :label="'Selecciona un repositorio'"
        />
      </div>
      <div class="col-span-2">
        <DashDatePicker
          id="start-date-historical"
          :is-valid="true"
          v-model="dates.start"
          :label="'Fecha de inicio'"
        />
      </div>
      <div class="col-span-2">
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
import {
  getAllRepos,
  getHistoryByRepo,
  getMeanAndMedian,
  getReposByTags,
} from '@/services/reworkRate/fetchReworkRate'
import { inject } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

import LineChart from '@/components/charts/lineCharts/LineChart.vue'
import DashSelect from '@/components/selects/DashSelect.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'
import DashTypography from '@/components/typography/DashTypography.vue'
import DashTagsInput from '@/components/inputs/DashTagsInput.vue'

import type { DashOptionSelect } from '@/types'
import type { Ref } from 'vue'
import type { ReworkRate, ChartDataRework } from '@/types/benchmarks/rework-rate'

const props = defineProps<{
  layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

type Repos = {
  name: string
  url: string
}

const COLORS = getPaletteColor()
const dashboardStore = useDashboardStore()

const repos = ref<ReworkRate[]>([])
const tags = ref<string[]>([])

const today = new Date()
const lastPeriod = new Date()
lastPeriod.setDate(today.getDate() - 21)

const dates = ref({
  start: lastPeriod.toISOString(),
  end: new Date().toISOString(),
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

const data: Ref<ChartDataRework> = ref({
  labels: [],
  commits: [],
  datasets: [
    {
      label: 'Rework rate en los meses por porcentaje',
      data: [],
      commits: [],
      authors: [],
      periodsEnd: [],
      periodsStart: [],
      prNumbers: [],
      reworkLines: [],
      timestamps: [],
      totalCommits: [],
      modifiedLines: [],
      borderColor: COLORS['primary-800'],
      fill: false,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4 as const,
    },
  ],
})

const handlerDataByTags = async (tags: string[]) => {
  isLoading.value = true
  try {
    repos.value = await getReposByTags(tags)
  } catch (error) {
    console.error('Error fetching repositories by tags:', error)
  } finally {
    isLoading.value = false
  }
}

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

watch( tags, (newTags) => {
    if (newTags.length > 0) {
      // handlerDataByTags(newTags)
    }
  }, { deep: true, immediate: true }
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

const deleteWidtet = () => {
  dashboardStore.DELETE_WIDGET(props.layoutItem.i)
}

const handlerData = async (value: string) => {
  isLoading.value = true
  try {
    repos.value = await getHistoryByRepo(
      value,
      dates.value.start ? dates.value.start : null,
      dates.value.end ? dates.value.end : null,
    )
    const values = formatDatesForChart(repos.value)
    await getMeanAndMedianInfo(value)
    data.value.labels = values.labels
    // pass datapoints and commits to the chart
    data.value.datasets[0].data = values.datapoints
    data.value.datasets[0].commits = values.commits
    data.value.datasets[0].reworkLines = values.reworkLines
    data.value.datasets[0].periodsStart = values.periodsStart
    data.value.datasets[0].periodsEnd = values.periodsEnd
    data.value.datasets[0].timestamps = values.timestamps
    data.value.datasets[0].prNumbers = values.prNumbers
    data.value.datasets[0].authors = values.authors
    data.value.datasets[0].modifiedLines = values.modifiedLines
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
    const res = await getMeanAndMedian(
      value,
      dates.value.start ? dates.value.start : null,
      dates.value.end ? dates.value.end : null,
    )
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
  const commits: number[] = []
  const periodsStart: string[] = []
  const periodsEnd: string[] = []
  const reworkLines: number[] = []
  const timestamps: string[] = []
  const prNumbers: string[] = []
  const authors: string[] = []
  const totalCommits: number[] = []
  const reworkPercentage: number[] = []
  const modifiedLines: number[] = []

  repos.forEach((repo) => {
    const date = new Date(repo.createdAtDate)
    labels.push(
      date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    )
    datapoints.push(repo.reworkPercentage)
    commits.push(repo.totalCommits)
    periodsStart.push(repo.periodStart)
    periodsEnd.push(repo.periodEnd)
    reworkLines.push(repo.reworkLines)
    timestamps.push(repo.createdAtDate)
    prNumbers.push(repo.prNumber)
    authors.push(repo.author)
    totalCommits.push(repo.totalCommits)
    reworkPercentage.push(repo.reworkPercentage)
    modifiedLines.push(repo.modifiedLines)
  })
  return {
    labels,
    datapoints,
    commits,
    periodsStart,
    periodsEnd,
    reworkLines,
    timestamps,
    prNumbers,
    authors,
    totalCommits,
    reworkPercentage,
    modifiedLines,
  }
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
