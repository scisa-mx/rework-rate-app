<template>
  <div role="group" class="relative p-6 bg-white rounded-lg border border-gray-200">
    <component :is="COMPONENT_CARDS[props.type]" v-bind="props">
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #body>
        <slot name="body"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { DashBaseCardProps } from '@/types/cards/card'
// import { ref } from 'vue'

const props = withDefaults(defineProps<DashBaseCardProps>(), {
  type: 'icon-card',
  loading: true,
  disabled: false,
})

import IconCard from '@/components/cards/DashIconCard.vue'
import LinkCard from '@/components/cards/DashLinkCard.vue'
import ImgCard from '@/components/cards/DashImageCard.vue'
import SimpleCard from '@/components/cards/SimpleCard.vue'

const COMPONENT_CARDS: Record<string, Component> = {
  'icon-card': IconCard,
  'link-card': LinkCard,
  'img-card': ImgCard,
  'simple-card': SimpleCard,
}
// const loading = ref(props.loading)
</script>
