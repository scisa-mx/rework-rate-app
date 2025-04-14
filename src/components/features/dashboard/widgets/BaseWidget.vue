<template>
  <DashOverlay :isLoading="props.isLoading">
    <article class="bg-white p-2 rounded" name="widget-board">
      <slot name="header"></slot>
      <slot name="options"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </article>
  </DashOverlay>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import DashOverlay from '@/components/overlay/DashOverlay.vue'

enum STATE_WIDGET {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
  DEFAULT = 'default',
  DISABLED = 'disabled',
}

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const stateWidget: Ref<STATE_WIDGET> = ref(STATE_WIDGET.DEFAULT)

</script>
