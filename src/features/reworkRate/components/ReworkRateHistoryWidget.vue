<template>
    <WrapperWidget :title="'Historico Rework Rate'" :widget-id="props.layoutItem.i">
        <FiltersReworkRate :repositories="optionsRepos" @on-change="handleFiltersChange" />
        <section name="box-chart">
            <LineChart :options="optionsChart" :key="JSON.stringify(data)" :data="data" />
        </section>
    </WrapperWidget>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref, computed } from 'vue';
import type { ChartDataRework } from '@/types/benchmarks/rework-rate';
import { getPaletteColor } from '@/@core/charts/usePaletteColor'

import WrapperWidget from '@/components/features/dashboard/widgets/WrapperWidget.vue';
import FiltersReworkRate from '@/features/reworkRate/components/FiltersReworkRate.vue';
import LineChart from '@/components/charts/lineCharts/LineChart.vue';
import type { DashOptionSelect } from '@/types';

import { useRepositories } from '../services/useReworkRate';

const props = defineProps<{
    layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

const COLORS = getPaletteColor()

const { data: repos, loading: loadingRepos, error: errorRepos, fetch: fetchRepos } = useRepositories()

// Variables computed
const optionsRepos = ref<DashOptionSelect[]>([])

const handleFiltersChange = async (newFilters: { tags: string | null; repository: DashOptionSelect | null; startDate: string; endDate: string }) => {
    await fetchRepos({ name: newFilters.repository?.label as string, tags: null })
    optionsRepos.value = repos.value.map(repo => ({
        label: repo.name,
        value: repo.id,
    }))
}

// CONSTANTS DONT TOUCH
const optionsChart = {
    responsive: true,
    maintainAspectRatio: false,
}

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

</script>