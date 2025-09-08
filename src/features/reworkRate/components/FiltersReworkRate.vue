<template>
    {{ filters }}
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashSmartTagsSelect v-model="filters.tags" :options="tags" :is-loading="loadingTags" label="Tags" name="tags"
            placeholder="Agregar o buscar tag..." :create-if-not-exists="true" @onSearch="handlerTagsSearch"
            @onCreateTag="handleCreateTag">
            <template #after="{ item }">
                <div class="rounded-full w-[20px] h-[20px]" :style="`background-color: ${item.color};`"></div>
            </template>
        </DashSmartTagsSelect>
        <DashSmartSelect id="input-repository" :is-loading="loadingRepos" v-model="filters.repository"
            :options="optionsRepos" :label="$t('repository')" :is-valid="true" @on-search="handlerSearch" />
        <DashDatePicker id="input-start-date" v-model="filters.startDate" :label="$t('startDate')" :is-valid="true" />
        <DashDatePicker id="input-end-date" v-model="filters.endDate" :label="$t('endDate')" :is-valid="true" />
    </section>
</template>


<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import type { Tag } from '@/types/benchmarks/tags';

import DashSmartSelect from '@/components/selects/DashSmartSelect.vue';
import DashSmartTagsSelect from '@/components/selects/DashSmartTagsSelect.vue';
import DashDatePicker from '@/components/selects/DashDatePicker.vue';

import type { DashOptionSelect } from '@/types';
import { useRepositories } from '../services/useReworkRate';
import { useTags } from '../services/useTags';
import { useAssignTagsToRepository } from '../services/assingTags';

interface FilterRepository {
    tags: Tag[]
    repository: DashOptionSelect | null
    startDate: string
    endDate: string
}

const { data: repositories, loading: loadingRepos, error: errorRepos, fetch: fetchRepos } = useRepositories({ debounceTime: 1000 })
const { data: tags, loading: loadingTags, error: errorTags, fetch: fetchTags } = useTags({ debounceTime: 1000 })
const { loading: assignLoader, mutate: assignMutate, data: assignValue } = useAssignTagsToRepository()

// Variables computed
const optionsRepos = computed(() => repositories.value.map(repo => ({
    label: repo.name,
    value: repo.id,
})))

const formattedTags = computed(() => filters.value.tags.map(tag => (tag.name)))

const emits = defineEmits<{
    (e: 'on-change', value: FilterRepository): void
}>()

const handlerSearch = async (value: string | null) => {
    await fetchRepos({ name: value, tags: formattedTags.value })
}

// dates
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

const handlerTagsSearch = async (value: string | null) => {
    await fetchTags({ name: value, id: null })
}

const handleCreateTag = (name: string) => {
    console.log("Crear tag:", name)
}

watch(
    () => filters.value,
    (newValue) => {
        emits('on-change', newValue)
    },
    { deep: true }
)

watch(() => formattedTags.value, async (newValue) => {
    handlerSearch(filters.value.repository?.label ?? null)
})

onMounted(async () => {
    // Fetch initial data or perform setup actions
    await fetchRepos({ name: null, tags: null })
    await fetchTags({ name: null, id: null })
})

</script>