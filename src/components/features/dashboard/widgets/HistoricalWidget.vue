<template>
  <div>
    <section class="w-full flex justify-between items-center" name="historical-widget-header">
      <DashTypography variant="h5" class="text-slate-700 font-semibold sm:text-2xl">
        Historico Rework Rate
      </DashTypography>
      <div class="flex gap-2 items-center">
        <button
          @click="resetFilters"
          class="text-sm flex items-center justify-center cursor-pointer text-royal-purple-800 hover:text-royal-purple-600 border border-royal-purple-300 rounded px-2 py-1"
        >
          <vue-feather type="rotate-ccw" size="16" class="inline-block mr-1" />
          {{ $t('reset') }}
        </button>
        <span @click="deleteWidtet" class="cursor-pointer hover:text-gray-500">
          <vue-feather size="18" type="x" />
        </span>
      </div>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-4 gap-2" name="historical-widget-options">
      <div class="col-span-2">
        <DashTagsInput
          id="repository-historical-tags"
          :is-valid="true"
          v-model="currentTags"
          :options="tagsList"
          :label="'Tags'"
          :key="JSON.stringify(currentTags)"
          :has-options="true"
        >
          <template #tag="{ option }">
            <span
              class="ml-1 border-l-4 text-xs py-[2px] px-1.5 rounded-sm text-slate-700 bg-slate-100"
              :style="{ borderLeftColor: tagMetadataMap[String(option.value)]?.color || '#663399' }"
            >
              {{ tagMetadataMap[String(option.value)]?.label }}
            </span>
          </template>
        </DashTagsInput>
      </div>
      <div class="col-span-2">
        <!-- <DashSelect
          id="repository-hisorical"
          :is-valid="true"
          v-model="repository"
          :value="repository"
          :options="repositoriesList"
          :label="'Selecciona un repositorio'"
          name="repository-historical-search"
          :key="JSON.stringify(repositories)"
          :required="false"
        >
          <template #tag="{ option }">
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ option.label }}</span>
              <div class="flex gap-1">
                <span
                  v-for="tag in repoMetadataMap[String(option.value)]?.tags || []"
                  :key="tag.name"
                  class="text-[10px] px-1 rounded-sm"
                  :style="{ backgroundColor: tag.color, color: 'white' }"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </template>
        </DashSelect> -->
        <DashSearchListInput
          id="repository-hisorical"
          :is-valid="true"
          v-model="repository"
          :value="repository"
          :options="repositoriesList"
          :label="'Selecciona un repositorio'"
          name="repository-historical-search"
          :required="false"
          :callback="onSearch"
        >
          <template #tag="{ option }">
            <div class="flex items-center gap-2">
              <span class="font-normal">{{ option.label }}</span>
              <div class="flex gap-1">
                <span
                  v-for="tag in repoMetadataMap[String(option.value)]?.tags || []"
                  :key="tag.name"
                  class="text-[10px] px-1 rounded-sm"
                  :style="{ backgroundColor: tag.color, color: 'white' }"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </template>
        </DashSearchListInput>
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
import { ref, onMounted, watch, transformVNodeArgs } from 'vue'
import { getPaletteColor } from '@/@core/charts/usePaletteColor'

import { useTags } from '@/services/tags/useTags'
import { useRepositories } from '@/services/repositories/useRepositories'

import { inject } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

import LineChart from '@/components/charts/lineCharts/LineChart.vue'
import DashSelect from '@/components/selects/DashSelect.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'
import DashTypography from '@/components/typography/DashTypography.vue'
import DashTagsInput from '@/components/inputs/DashTagsInput.vue'
import DashSearchListInput from '@/components/inputs/DashSearchListInput.vue'

import type { DashOptionSelect } from '@/types'
import type { Ref } from 'vue'
import type {
  ReworkRate,
  ChartDataRework,
  RepositoryReworkRate,
} from '@/types/benchmarks/rework-rate'
import type { Tag } from '@/types/benchmarks/tags'
import { formatTagsToTagInput } from '@/mapper/tag.mapper'
import { formatReposTags, formatRepositoriesToDashOptions } from '@/mapper/repositories.mapper'

const props = defineProps<{
  layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

const { tags, tagsNames, error: tagsError, fetchTags } = useTags()
const { fetchRepositories, assingTagsToRepositories, repositories } = useRepositories()

const COLORS = getPaletteColor()
const dashboardStore = useDashboardStore()

const tagsList = ref<DashOptionSelect[]>([])
const currentTags = ref<string[]>([])

const repositoriesList = ref<DashOptionSelect[]>([])
const repository = ref<string>('')

const isSelectedRepository = ref<boolean>(false)

const repoMetadataMap = ref<Record<string, { tags: Tag[] }>>({})
const tagMetadataMap = ref<Record<string, { label: string; color: string }>>({})

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

const resetFilters = () => {
  tags.value = []
  repository.value = ''
}

const deleteWidtet = () => {
  dashboardStore.DELETE_WIDGET(props.layoutItem.i)
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

const onSearch = async (value: string) => {
  isLoading.value = true
  try {
    await fetchRepositories({ name: value })
    repositoriesList.value = formatRepositoriesToDashOptions({ repositories: repositories.value })
    formatReposTags({ reqs: repositories.value, repoMetadataMap })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    await fetchTags({})
    await fetchRepositories({})
    tagsList.value = formatTagsToTagInput({ tags: tags.value, tagMetadataMap: tagMetadataMap })
    repositoriesList.value = formatRepositoriesToDashOptions({ repositories: repositories.value })
    formatReposTags({ reqs: repositories.value, repoMetadataMap })
  } finally {
    isLoading.value = false
  }
})

// WATCHERS

watch(
  () => currentTags.value,
  async (newTags) => {
    isLoading.value = true
    try {
      // Si hay un repositorio seleccionado, actualiza los tags
      if (isSelectedRepository.value) {
        await assingTagsToRepositories({
          repositoriesList: repositories.value,
          repositoryUrl: repository.value,
          tagNames: newTags,
        })
      }
      await fetchRepositories({ tags: newTags })
      repositoriesList.value = formatRepositoriesToDashOptions({ repositories: repositories.value })
      formatReposTags({ reqs: repositories.value, repoMetadataMap })
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true, deep: true },
)

watch(
  () => repository.value,
  async (newRepo) => {
    isLoading.value = true
    try {
      const currentRepo = repositories.value.find((item) => item.repoUrl === newRepo)
      const newTags = currentRepo?.tags.map((tag) => tag.name) || []
      currentTags.value = newTags
      isSelectedRepository.value = true
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true, deep: true },
)
</script>
