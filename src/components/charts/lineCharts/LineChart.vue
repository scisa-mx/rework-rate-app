<template>
  <section role="contentinfo">
    <Line :data="props.data" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import { Chart, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import type { ChartDataRework } from '@/types/benchmarks/rework-rate'

// Registrar componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// Props
interface LineChartProps {
  data: ChartData<'line'>
  options?: ChartOptions<'line'>
}
const props = defineProps<LineChartProps>()

// Opciones con tooltip personalizado
const chartOptions = {
  ...props.options,
  plugins: {
    ...props.options?.plugins,
    tooltip: {
      callbacks: {
        // Título del tooltip (por ejemplo, la categoría del eje X)
        title: (tooltipItems) => {
          return `${tooltipItems[0].label}`
        },
        // Texto principal del tooltip
        label: (ctx) => {
          const value = ctx.formattedValue
          const label = ctx.dataset.label ?? 'Valor'
          return `Rework: ${value}%`
        },
        // Texto adicional después del label
        afterLabel: (ctx) => {
          const commitCount = (ctx.dataset as any).commits[ctx.dataIndex];
          return `Total Commits: ${commitCount}`
        }
      }
    }
  }
} satisfies ChartOptions<'line'>
</script>
