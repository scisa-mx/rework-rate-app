<template>
  <section name="widgets-board" class="z-[9999] w-full ">
    <GridLayout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="isDraggable"
      :is-resizable="false"
      vertical-compact
      use-css-transforms
      @layout-updated="handlerUpdateLayout"
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
import { onMounted, reactive, ref, type Component } from 'vue'
import { GridLayout } from 'grid-layout-plus'
import { TYPE_CHART, STATE_WIDGET, TYPE_WIDGET, type Widget } from '@/types/widgets/widgets'
import { useDashboardStore } from '@/stores/dashboard'
import BaseWidget from '@/components/features/dashboard/widgets/BaseWidget.vue'

import HistoricalWidget from '@/components/features/dashboard/widgets/HistoricalWidget.vue'

const dashboardStore = useDashboardStore()

const layout = ref<Widget[]>([
])

dashboardStore.widgets = layout.value

const COMPONENT_HASH: Record<TYPE_WIDGET, Component> = {
  [TYPE_WIDGET.HISTORICAL]: HistoricalWidget,
}

const isDraggable = ref(false)

dashboardStore.$subscribe((mutation, state) => {
  const event = Array.isArray(mutation.events) ? mutation.events[0] : mutation.events;
  if (event?.key === "isDraggable") {
    isDraggable.value = event.newValue;
  }
  console.log('mutation', mutation)
  if(event?.key === "widgets") {
    layout.value = event.newValue
  }
})

const handlerUpdateLayout = (newLayout: Widget[]) => {
  dashboardStore.widgets = newLayout
  dashboardStore.UPDATE_WIDGETS_TO_LOCAL_STORAGE()
}

const $container = ref<HTMLElement | null>(null)


onMounted(()=> {
  $container.value = document.querySelector('[name="widgets-board"]') as HTMLElement

  const currentLayout = localStorage.getItem('widgets')
  if (currentLayout) {
    layout.value = JSON.parse(currentLayout)
  } else {
    localStorage.setItem('widgets', JSON.stringify(layout.value))
  }
})

</script>
