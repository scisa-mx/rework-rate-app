<template>
    <WrapperWidget :title="'Historico Rework Rate'" :widget-id="props.layoutItem.i">
        <!-- @vue-expect-error -->
        <FiltersReworkRate @on-assing-repository="handlerRepository"/>
        <section name="box-chart">
        {{ reworkHistory }}
            <LineChart :options="optionsChart" :key="JSON.stringify(data)" :data="data" />
        </section>
    </WrapperWidget>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref, computed } from 'vue';
import type { ChartDataRework } from '@/types/benchmarks/rework-rate';
import { getPaletteColor } from '@/@core/charts/usePaletteColor'
import type { FilterRepository } from '@/features/reworkRate/components/FiltersReworkRate.vue';

import WrapperWidget from '@/components/features/dashboard/widgets/WrapperWidget.vue';
import FiltersReworkRate from '@/features/reworkRate/components/FiltersReworkRate.vue';
import LineChart from '@/components/charts/lineCharts/LineChart.vue';
import type { DashOptionSelect } from '@/types';

import { useReworkHistory } from '../services/useReworkHistory';


const props = defineProps<{
    layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

const { data: reworkHistory, loading, fetch: fetchReworkHistory } = useReworkHistory({ repoUrl: "", startDate: null, endDate: null })

const COLORS = getPaletteColor()

// CONSTANTS DONT TOUCH
const optionsChart = {
    responsive: true,
    maintainAspectRatio: false,
}

const handlerRepository = async (value: { repository: DashOptionSelect & { url: string } | null }, filters: FilterRepository) => {
    console.log('Selected repository:', value.repository, filters.startDate, filters.endDate);
    // Aquí puedes agregar la lógica para manejar el cambio de repositorio
    await fetchReworkHistory({
        repoUrl: value.repository?.url ?? "",
        startDate: filters.startDate ?? null,
        endDate: filters.endDate ?? null,
    })
    
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