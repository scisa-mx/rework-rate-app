<template>
    {{ filters }}
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashInput id="input-tags" v-model="filters.tags" label="Tags" :is-valid="true" />
        <DashSmartSelect id="input-repository" :is-loading="loadingRepos" v-model="filters.repository" :options="optionsRepos" label="Repositories"
            :is-valid="true" @on-search="handlerSearch" />
        <DashDatePicker id="input-start-date" v-model="filters.startDate" label="Start Date" :is-valid="true" />
        <DashDatePicker id="input-end-date" v-model="filters.endDate" label="End Date" :is-valid="true" />
    </section>
</template>


<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import type { Ref } from 'vue';

import DashInput from '@/components/inputs/DashInput.vue';
import DashSmartSelect from '@/components/selects/DashSmartSelect.vue';
import DashDatePicker from '@/components/selects/DashDatePicker.vue';

import type { DashOptionSelect } from '@/types';
import { useRepositories } from '../services/useReworkRate';


interface FilterRepository {
    tags: string
    repository: DashOptionSelect | null
    startDate: string
    endDate: string
}

const { data: repositories, loading: loadingRepos, error: errorRepos, fetch: fetchRepos } = useRepositories()

// Variables computed
const optionsRepos = computed(() => repositories.value.map(repo => ({
    label: repo.name,
    value: repo.id,
})))


const emits = defineEmits<{
    (e: 'on-change', value: FilterRepository): void
}>()

const handlerSearch = async (value: string | null) => {
    console.log(value)
    await fetchRepos({ name: value, tags: null })
}

// dates
const RANGE_DAYS = 21
const today = new Date()
const lastPeriod = new Date()
lastPeriod.setDate(today.getDate() - RANGE_DAYS)

const filters = ref<FilterRepository>({
    tags: '',
    repository: null,
    startDate: lastPeriod.toISOString(),
    endDate: today.toISOString(),
})

watch(
    () => filters.value,
    (newValue) => {
        emits('on-change', newValue)
    },
    { deep: true }
)

onMounted(async () => {
    // Fetch initial data or perform setup actions
    await fetchRepos({ name: null, tags: null })
})

</script>