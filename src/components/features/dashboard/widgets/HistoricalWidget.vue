<template>
  <BaseWidget :isLoading="isLoading">
    <template #header>
      <section class="w-full">
        <DashTypography variant="h5" class="text-slate-700 font-semibold sm:text-2xl">
          Historico Rework Rate
        </DashTypography>
        <span>
      {{ repos }}
    </span>
      </section>
    </template>
    <template #options>
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
    </template>
    <template #main>
      <section class="col-span-1">
        <LineChart :key="JSON.stringify(datapoints)" :data="data" />
      </section>
    </template>

  </BaseWidget>
</template>

<script setup lang="ts">
import BaseWidget from '@/components/features/dashboard/widgets/BaseWidget.vue'
import { ref, onMounted, watch } from 'vue'
import { getPaletteColor } from '@/@core/charts/usePaletteColor'
import { getAllRepos, getHistoryByRepo, getReworkRate } from '@/services/reworkRate/fetchReworkRate'

import LineChart from '@/components/charts/lineCharts/LineChart.vue'
import DashSelect from '@/components/selects/DashSelect.vue'
import DashTypography from '@/components/typography/DashTypography.vue'

import type { ChartData } from 'chart.js'
import type { DashOptionSelect } from '@/types'
import type { Ref } from 'vue'

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

const labels = ref<string[]>([])
const datapoints = ref<number[]>([])
const isLoading = ref(false)
const repos = ref<ReposHisoty[]>([])

const emits = defineEmits<{
  (e: 'onload', value: boolean): void
}>()

const options = ref<DashOptionSelect[]>([
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
])

const repository = ref<string>('')

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
  } catch {
    console.error('Error fetching repository history')
  } finally {
    isLoading.value = false
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
