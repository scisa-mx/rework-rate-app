<template>
  <section role="contentinfo">
    <Line :data="props.data" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
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

import { isoStringToMask } from '@/@core/date/dateHelpers'

// Registrar componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// Props
interface LineChartProps {
  data: ChartData<'line'>
  options?: ChartOptions<'line'>
}
const props = defineProps<LineChartProps>()


const TOOLTIP_STYLES = {
  base: 'external-tooltip fixed z-[9999] min-w-[300px] bg-black/80 text-white text-xs rounded-lg shadow-lg p-3 pointer-events-none transform transition-all z-50',
  left: '-translate-x-full',
  center: '-translate-x-1/2',
  right: '',
}

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
    [`Autores`, dataset.authors?.[index]],
    [`PRs`, dataset.prNumbers?.[index]],
    [`Rework Rate`, `${dataset.data?.[index]}%`,],
    [`Commits`, dataset.commits?.[index]],
    [`Rework Lines`, dataset.reworkLines?.[index]],
    [`Total lines`, dataset.modifiedLines?.[index]],
    [`Periodo`, `${isoStringToMask(dataset.periodsStart?.[index])} - ${isoStringToMask(dataset.periodsEnd?.[index])}`],
    [`Fecha`, isoStringToMask(dataset.timestamps?.[index])],
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


  // Ajustar la posición del tooltip dependiendo de su tamaño y la posición del canvas
  const canvasWidth = chart.canvas.offsetWidth;
  const caretRatio = tooltip.caretX / canvasWidth;

  let positionClass = TOOLTIP_STYLES.center;
  if (caretRatio < 0.33) {
    positionClass = TOOLTIP_STYLES.right;
  } else if (caretRatio > 0.66) {
    positionClass = TOOLTIP_STYLES.left;
  }

  tooltipEl.className = `${TOOLTIP_STYLES.base} ${positionClass}`;
};


function getOrCreateTooltip(chart: any) {
  let tooltipEl = chart.canvas.parentNode.querySelector('.external-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
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
