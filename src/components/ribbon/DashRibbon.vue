<template>
  <div class="relative w-full overflow-hidden group">
    <slot />

    <div :class="[wrapperClasses, revealOnHover ? partialClasses : '']">
      <div :class="[ribbonClasses]">
        <div class="flex items-center justify-center gap-1" v-if="revealOnHover">
          <span v-if="props.icon" class="flex items-center">
            <vue-feather size="16" :type="props.icon" />
          </span>
          <span
            class="transition-opacity duration-300"
            :class="{ 'opacity-0 group-hover:opacity-100': revealOnHover }"
          >
            <slot name="ribbon" />
          </span>
        </div>

        <div v-else>
          <slot name="ribbon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type FeatherIconName } from '@/types'

type RibbonProps = {
  variant: 'primary' | 'info'
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  revealOnHover?: boolean
  icon?: FeatherIconName
}

const props = withDefaults(defineProps<RibbonProps>(), {
  variant: 'primary',
  position: 'top-left',
  revealOnHover: false,
})

const variantClasses: Record<string, string> = {
  primary: 'bg-royal-purple-500 text-white',
  info: 'bg-blue-200 text-blue-800',
}

const positionMapping: Record<string, string> = {
  'top-left': 'top-3 left-0',
  'top-right': 'top-3 right-0',
  'bottom-left': 'bottom-3 left-0',
  'bottom-right': 'bottom-3 right-0',
}

const radiusMapper: Record<string, string> = {
  'top-left': 'rounded-r-full',
  'top-right': 'rounded-l-full',
  'bottom-left': 'rounded-r-full',
  'bottom-right': 'rounded-l-full',
}

const wrapperClasses = computed(() => {
  return [
    'absolute transition-transform duration-300',
    positionMapping[props.position] || positionMapping['top-left'],
    props.revealOnHover ? 'group-hover:translate-x-0 group-hover:translate-y-0' : '',
  ].join(' ')
})

// Estilos para mostrar parcialmente el ribbon
const partialMapping: Record<string, string> = {
  'top-left': '-translate-x-1/2',
  'top-right': 'translate-x-1/2 ',
  'bottom-left': '-translate-x-1/2',
  'bottom-right': 'translate-x-1/2',
}

const partialClasses = computed(() => {
  return partialMapping[props.position] || partialMapping['top-left']
})

const ribbonClasses = computed(() => {
  return [
    'flex items-center justify-center w-full text-sm font-semibold uppercase shadow-xs px-5 py-2',
    radiusMapper[props.position] || radiusMapper['top-left'],
    variantClasses[props.variant] || variantClasses['primary'],
  ].join(' ')
})
</script>
