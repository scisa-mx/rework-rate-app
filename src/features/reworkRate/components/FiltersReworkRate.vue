<template>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashInput id="input-tags" v-model="filters.tags" label="Repository" :is-valid="true"/>
        <DashSmartSelect id="input-repository" v-model="filters.repository" :options="repositories" label="Repositories" :is-valid="true">
            <template #before="{item}">
                <span class="px-2">
                    {{ item.value }}
                </span>
            </template>    
        </DashSmartSelect>
        <DashDatePicker id="input-start-date" v-model="filters.startDate" label="Start Date" :is-valid="true" />
        <DashDatePicker id="input-end-date" v-model="filters.endDate" label="End Date" :is-valid="true" />
    </section>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

import DashInput from '@/components/inputs/DashInput.vue';
import DashSmartSelect from '@/components/selects/DashSmartSelect.vue';
import DashDatePicker from '@/components/selects/DashDatePicker.vue';

import type { DashOptionSelect } from '@/types';


const emits = defineEmits<{
    (e: 'on-change', value: { tags: string; repository: string; startDate: string; endDate: string }): void
}>()


// dates
const today = new Date()
const lastPeriod = new Date()
lastPeriod.setDate(today.getDate() - 21)

const repositories = ref<DashOptionSelect[]>([])

const filters = ref({
    tags: '',
    repository: '',
    startDate: lastPeriod.toISOString(),
    endDate: today.toISOString(),
})

repositories.value = [
    { label: 'Repo 1', value: 'repo-1' },
    { label: 'Repo 2', value: 'repo-2' },
    { label: 'Repo 3', value: 'repo-3' },
]

watch(
    () => filters.value,
    (newValue) => emits('on-change', newValue),
    { deep: true }
)

</script>