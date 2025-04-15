<template>
  <article name="widget-board">
    <DashOverlay :isLoading="props.isLoading">
      <section class="bg-white p-2 rounded">
        <slot name="header"></slot>
        <slot name="options"></slot>
        <slot name="main"></slot>
        <slot name="footer"></slot>
      </section>
    </DashOverlay>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import DashOverlay from '@/components/overlay/DashOverlay.vue'
import { STATE_WIDGET } from '@/types/widgets/widgets'


const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const stateWidget: Ref<STATE_WIDGET> = ref(STATE_WIDGET.DEFAULT)

</script>
