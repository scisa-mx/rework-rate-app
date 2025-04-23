<template>
  <section name="widgets-board">
    <GridLayout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="isDraggable"
      :is-resizable="false"
      vertical-compact
      use-css-transforms
    >
      <template v-for="(layoutItem, index) in layout" :key="index">
        <BaseWidget :layoutItem="layoutItem">
          <template #main>
            <component :layoutItem="layoutItem" :is="COMPONENT_HASH[layoutItem.typeWidget]"> </component>
          </template>
        </BaseWidget>
      </template>
    </GridLayout>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, type Component } from 'vue'
import { GridLayout } from 'grid-layout-plus'
import { TYPE_CHART, STATE_WIDGET, TYPE_WIDGET, type Widget } from '@/types/widgets/widgets'
import BaseWidget from '@/components/features/dashboard/widgets/BaseWidget.vue'

import HistoricalWidget from '@/components/features/dashboard/widgets/HistoricalWidget.vue'

const layout = reactive<Widget[]>([
  {
    x: 0,
    y: 0,
    w: 6,
    h: 10,
    i: '0',
    id: 'historical-widget',
    typeChart: TYPE_CHART.LINE,
    state: STATE_WIDGET.DEFAULT,
    name: 'historial-1',
    typeWidget: TYPE_WIDGET.HISTORICAL,
  },
])

const COMPONENT_HASH: Record<TYPE_WIDGET, Component> = {
  [TYPE_WIDGET.HISTORICAL]: HistoricalWidget,
  [TYPE_WIDGET.MEDIA]: HistoricalWidget,
}

const isDraggable = ref(false)



</script>
