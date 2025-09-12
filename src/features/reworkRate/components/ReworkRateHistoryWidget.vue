<template>
    <WrapperWidget :title="'Historico Rework Rate'" :widget-id="props.layoutItem.i">
        <!-- @vue-expect-error -->
        <FiltersReworkRate @on-assing-repository="handlerRepository" @on-change="handlerRepository" />
        <section name="box-chart">
            <LineChart :options="optionsChart" :key="JSON.stringify(data)" :data="data" />
            <div class="flex gap-2" role="group">
                <h4 class="text-slate-700 font-semibold">Mediana: {{ mean_and_median?.median }}</h4>
                <h4 class="text-slate-700 font-semibold">Media: {{ mean_and_median?.mean }}</h4>
            </div>
        </section>
    </WrapperWidget>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import type { ChartDataRework } from '@/types/benchmarks/rework-rate';
import { getPaletteColor } from '@/@core/charts/usePaletteColor';
import type { FilterRepository } from '@/features/reworkRate/components/FiltersReworkRate.vue';

import WrapperWidget from '@/components/features/dashboard/widgets/WrapperWidget.vue';
import FiltersReworkRate from '@/features/reworkRate/components/FiltersReworkRate.vue';
import LineChart from '@/components/charts/lineCharts/LineChart.vue';
import type { DashOptionSelect } from '@/types';

import { useReworkHistory, type ReworkHistory } from '../services/useReworkHistory';

const props = defineProps<{
    layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

const { data: reworkHistory, mean_and_median,  loading, fetch: fetchReworkHistory } = useReworkHistory({
    repoUrl: "",
    startDate: null,
    endDate: null
})

const COLORS = getPaletteColor()

// CONSTANTS DONT TOUCH
const optionsChart = {
    responsive: true,
    maintainAspectRatio: false,
}

// Función para transformar la respuesta en datos de chart
const formatDatesForChart = (repos: ReworkHistory[]) => {
    const labels: string[] = []
    const datapoints: number[] = []
    const commits: number[] = []
    const periodsStart: string[] = []
    const periodsEnd: string[] = []
    const reworkLines: number[] = []
    const timestamps: string[] = []
    const prNumbers: number[] = []
    const authors: string[] = []
    const totalCommits: number[] = []
    const reworkPercentage: number[] = []
    const modifiedLines: number[] = []

    repos.forEach((repo) => {
        const date = new Date(repo.createdAtDate)
        labels.push(
            date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
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

const handlerRepository = async (
    value: { repository: DashOptionSelect & { url: string } | null },
    filters: FilterRepository
) => {
    console.log('handlerRepository', value.repository)
    if (!value.repository || value.repository.value === undefined) {
        reworkHistory.value = []
        mean_and_median.value = { mean: 0, median: 0 }
    } else {
        await fetchReworkHistory({
            repoUrl: value.repository?.url ?? "",
            startDate: filters.startDate ?? null,
            endDate: filters.endDate ?? null,
        })
    }
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

// Watch para actualizar el gráfico cuando cambien los datos
watch(reworkHistory, (val) => {
    if (!val) return
    // @ts-expect-error
    const formatted = formatDatesForChart(val)
    data.value.labels = formatted.labels
    // @ts-expect-error
    data.value.commits = formatted.commits
    data.value.datasets[0].data = formatted.datapoints
    data.value.datasets[0].commits = formatted.commits
    data.value.datasets[0].authors = formatted.authors
    data.value.datasets[0].periodsEnd = formatted.periodsEnd
    data.value.datasets[0].periodsStart = formatted.periodsStart
    // @ts-expect-error
    data.value.datasets[0].prNumbers = formatted.prNumbers
    data.value.datasets[0].reworkLines = formatted.reworkLines
    data.value.datasets[0].timestamps = formatted.timestamps
    data.value.datasets[0].totalCommits = formatted.totalCommits
    data.value.datasets[0].modifiedLines = formatted.modifiedLines
})
</script>
