<template>
  <GridItem
    :x="layoutItem.x"
    :y="layoutItem.y"
    :w="layoutItem.w"
    :h="layoutItem.h"
    :i="layoutItem.i"
    class=""
  >
  <DashOverlay :isLoading="isLoading">
    <article class="bg-white rounded shadow-sm py-3" ref="widgetContent" name="widget-board">
        <section class="bg-white px-2 rounded">
          <slot name="main"></slot>
        </section>
      </article>
    </DashOverlay>
  </GridItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAutoResize } from '@/@core/widgets/autoResize'
import { provide } from 'vue'

import DashOverlay from '@/components/overlay/DashOverlay.vue'
import { GridItem } from 'grid-layout-plus'

import { STATE_WIDGET } from '@/types/widgets/widgets'

const props = defineProps<{ 
  layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

const stateWidget: Ref<STATE_WIDGET> = ref(STATE_WIDGET.DEFAULT)

const isLoading = ref(false)

provide('isLoading', isLoading)

const widgetContent = ref<HTMLElement | null>(null)

useAutoResize(widgetContent, props.layoutItem, 30)

const handlerLoad = (value: boolean) => {
  debugger
  isLoading.value = value
}

</script>
