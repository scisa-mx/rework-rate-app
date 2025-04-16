<template>
  <GridItem
    :x="layoutItem.x"
    :y="layoutItem.y"
    :w="layoutItem.w"
    :h="layoutItem.h"
    :i="layoutItem.i"
    class="bg-white rounded shadow-sm"
  >
    <article ref="widgetContent" name="widget-board">
      <DashOverlay :isLoading="isLoading">
        <section class="bg-white p-2 rounded">
          <slot @onLoad="handlerLoad" name="main"></slot>
        </section>
      </DashOverlay>
    </article>
  </GridItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAutoResize } from '@/@core/widgets/autoResize'

import DashOverlay from '@/components/overlay/DashOverlay.vue'
import { GridItem } from 'grid-layout-plus'

import { STATE_WIDGET } from '@/types/widgets/widgets'

const props = defineProps<{ 
  layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()

const stateWidget: Ref<STATE_WIDGET> = ref(STATE_WIDGET.DEFAULT)

const isLoading = ref()

const widgetContent = ref<HTMLElement | null>(null)

useAutoResize(widgetContent, props.layoutItem, 30)

const handlerLoad = (value: boolean) => {
  isLoading.value = value
}

</script>
