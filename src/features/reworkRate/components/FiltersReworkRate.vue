<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Banner de contexto -->
    <div v-if="isEditingMode" class="col-span-2 flex items-center gap-2 p-2 rounded-xl bg-blue-100 text-blue-800">
      <span class="font-medium">📝 Modo edición:</span>
      <span>{{ filters.repository?.label }}</span>
    </div>
    <div v-else class="col-span-2 flex items-center gap-2 p-2 rounded-xl bg-gray-100 text-gray-800">
      <span class="font-medium">🔍 Modo filtro:</span>
      <span>Los tags se usan solo para filtrar repositorios</span>
    </div>

    <!-- Tags -->
    <DashSmartTagsSelect
      v-model="filters.tags"
      :options="tags"
      :is-loading="loadingTags"
      :label="$t('tags')"
      name="tags"
      :placeholder="$t('searchOrAddTag')"
      :create-if-not-exists="true"
      @onSearch="handlerTagsSearch"
      @onCreateTag="handleCreateTag"
      @onRemoveTag="handleRemoveTag"
    >
      <template #after="{ item }">
        <div class="rounded-full w-[20px] h-[20px]" :style="`background-color: ${item.color};`"></div>
      </template>
    </DashSmartTagsSelect>

    <!-- Repositorios -->
    <DashSmartSelect
      id="input-repository"
      :is-loading="loadingRepos"
      v-model="filters.repository"
      :options="optionsRepos"
      :label="$t('repository')"
      :is-valid="true"
      @on-search="handlerSearch"
    >
      <template #after="{ item }">
        <div class="flex w-full justify-end ml-1 gap-2">
          <!-- @vue-expect-error -->
            <div
            v-for="tag in item.tags.slice(0, 3)"
            :key="tag.id"
            class="rounded-full px-2 py-1 text-white text-[0.7rem]"
            :style="`background-color: ${tag.color};`"
          >
            {{ tag.name }}
          </div>
        </div>
      </template>
    </DashSmartSelect>

    <!-- Fechas -->
    <DashDatePicker id="input-start-date" v-model="filters.startDate" :label="$t('startDate')" :is-valid="true" />
    <DashDatePicker id="input-end-date" v-model="filters.endDate" :label="$t('endDate')" :is-valid="true" />
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import type { Tag } from '@/types/benchmarks/tags'
import type { DashOptionSelect } from '@/types'

import DashSmartSelect from '@/components/selects/DashSmartSelect.vue'
import DashSmartTagsSelect from '@/components/selects/DashSmartTagsSelect.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'

import { useRepositories } from '../services/useReworkRate'
import { useTags } from '../services/useTags'
import { useAssignTagsToRepository } from '../services/assingTags'

interface FilterRepository {
  tags: Tag[]
  repository: (DashOptionSelect & { tags: Tag[] }) | null
  startDate: string
  endDate: string
}

const { data: repositories, loading: loadingRepos, fetch: fetchRepos } = useRepositories({ debounceTime: 1000 })
const { data: tags, loading: loadingTags, fetch: fetchTags } = useTags({ debounceTime: 1000 })
const { loading: assignLoader, mutate: assignMutate } = useAssignTagsToRepository()

// Options para repos
const optionsRepos = computed(() =>
  repositories.value.map((repo) => ({
    label: repo.name,
    value: repo.id,
    tags: repo.tags,
    url: repo.repoUrl,
  }))
)

// Modo edición o filtro
const isEditingMode = computed(() => filters.value.repository !== null)
const formattedTags = computed(() => filters.value.tags.map((tag) => tag.name))

const emits = defineEmits<{
  (e: 'on-change', value: FilterRepository): void
}>()

// Handlers
const handlerSearch = async (value: string | null) => {
  await fetchRepos({ name: value, tags: formattedTags.value })
}

const handlerTagsSearch = async (value: string | null) => {
  await fetchTags({ name: value, id: null })
}

const handleCreateTag = (name: string) => {
  if (!isEditingMode.value) return
  assignMutate({
    repositoryId: filters.value.repository!.value as string,
    tagNames: [...formattedTags.value, name],
  })
}

const handleRemoveTag = (removedTag: Tag) => {
  if (!isEditingMode.value) return
  assignMutate({
    repositoryId: filters.value.repository!.value as string,
    tagNames: formattedTags.value.filter((t) => t !== removedTag.name),
  })
}

// Dates iniciales
const RANGE_DAYS = 21
const today = new Date()
const lastPeriod = new Date()
lastPeriod.setDate(today.getDate() - RANGE_DAYS)

const filters = ref<FilterRepository>({
  tags: [],
  repository: null,
  startDate: lastPeriod.toISOString(),
  endDate: today.toISOString(),
})

// Watch para emitir cambios globales
watch(
  () => filters.value,
  (newValue) => emits('on-change', newValue),
  { deep: true }
)

// 🟢 Sync automático de tags cuando se selecciona un repo
watch(
  () => filters.value.repository,
  (repo) => {
    if (repo) {
      // Cargamos los tags actuales del repo seleccionado
      filters.value.tags = repo.tags ?? []
    } else {
      // Si no hay repo → limpiamos los tags
      filters.value.tags = []
    }
  },
  { immediate: true }
)

// Refiltrar cuando cambian los tags
watch(() => formattedTags.value, async () => {
  handlerSearch(filters.value.repository?.label ?? null)
})

// Init
onMounted(async () => {
  await fetchRepos({ name: null, tags: null })
  await fetchTags({ name: null, id: null })
})
</script>

