<template>
  <div role="group" class="relative p-6 bg-white rounded-lg border border-gray-200">
    <component :is="COMPONENT_CARDS[props.type]">
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

type ComponentCardType = 'icon-card' | 'link-card' | 'img-card' | 'simple-card'

type DashBaseCardProps = {
  type: ComponentCardType
}

const props = defineProps<DashBaseCardProps>()

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
</script>
