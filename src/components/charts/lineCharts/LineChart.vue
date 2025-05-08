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

// Registrar componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// Props
interface LineChartProps {
  data: ChartData<'line'>
  options?: ChartOptions<'line'>
}
const props = defineProps<LineChartProps>()


const externalTooltipHandler = (context: any) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  const index = tooltip.dataPoints?.[0]?.dataIndex;
  const dataset = tooltip.dataPoints?.[0]?.dataset;

  if (!dataset || index === undefined) return;

  // Limpiar contenido anterior
  tooltipEl.innerHTML = '';

  // Título
  const title = document.createElement('div');
  title.textContent = tooltip.title?.[0] || '';
  title.className = 'text-sm font-semibold text-white mb-2';

  // Lista de información
  const list = document.createElement('ul');
  list.className = 'space-y-1 text-xs text-white';

  const items = [
    [`Commits`, dataset.commits?.[index]],
    [`Autores`, dataset.authors?.[index]],
    [`PRs`, dataset.prNumbers?.[index]],
    [`Rework Lines`, dataset.reworkLines?.[index]],
    [`Periodo`, `${dataset.periodsStart?.[index]} - ${dataset.periodsEnd?.[index]}`],
    [`Fecha`, dataset.timestamps?.[index]],
  ];

  items.forEach(([label, value]) => {
    const li = document.createElement('li');
    li.textContent = `${label}: ${value ?? '-'}`;
    list.appendChild(li);
  });

  tooltipEl.appendChild(title);
  tooltipEl.appendChild(list);

  // Posición
  const { offsetLeft: posX, offsetTop: posY } = chart.canvas;
  tooltipEl.style.opacity = '1';
  tooltipEl.style.left = `${posX + tooltip.caretX}px`;
  tooltipEl.style.top = `${posY + tooltip.caretY}px`;
};


function getOrCreateTooltip(chart: any) {
  let tooltipEl = chart.canvas.parentNode.querySelector('.external-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className =
      'external-tooltip z-[9999] absolute min-w-[300px] bg-black/80 text-white text-xs rounded-lg shadow-lg p-3 pointer-events-none transform -translate-x-1/2 transition-all z-50';
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
}


// Opciones con tooltip personalizado
const chartOptions = {
  ...props.options,
  plugins: {
    ...props.options?.plugins,
    
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: externalTooltipHandler,
    },
  },
} satisfies ChartOptions<'line'>




</script>
