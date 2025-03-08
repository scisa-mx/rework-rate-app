<template>
  <!-- Contenedor principal que envuelve el contenido y el ribbon -->
  <!-- w-full y overflow-hidden para recortar la banda diagonal dentro de la caja -->
  <div class="relative w-full overflow-hidden">
    <!-- El contenido principal va en el default slot -->
    <slot />

    <!-- Contenedor que posiciona la banda diagonal -->
    <div :class="wrapperClasses">
      <!-- Banda diagonal con los estilos de la variante elegida -->
      <div :class="ribbonClasses">
        <!-- Texto o contenido que desees mostrar en el ribbon -->
        <slot name="ribbon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type RibbonProps = {
  variant: 'primary' | 'info'
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

/**
 * Props para variantes de color y posición
 */
const props = defineProps<RibbonProps>()

/**
 * Clases de estilo para las variantes (ajusta a tu paleta si lo deseas)
 */
const variantClasses: Record<string, string> = {
  primary: 'bg-royal-purple-500 text-white',
  info: 'bg-blue-200 text-blue-800',
}

/**
 * Mapeo de posiciones para ubicar la banda diagonal dentro del contenedor.
 * Se le da un ancho mayor (140-150%) para cubrir de esquina a esquina,
 * y luego se recorta con overflow-hidden.
 */
const positionMapping: Record<string, string> = {
  'top-left': 'top-3 left-0',
  'top-right': 'top-3 right-0',
  'bottom-left': 'bottom-3 left-0',
  'bottom-right': 'bottom-3 right-0 ',
}

const radiusMapper: Record<string, string> = {
  'top-left': 'rounded-r-lg',
  'top-right': 'rounded-l-lg',
  'bottom-left': 'rounded-r-lg',
  'bottom-right': 'rounded-l-lg',
}

const wrapperClasses = computed(() => {
  return ['absolute', positionMapping[props.position] || positionMapping['top-left']].join(' ')
})

const ribbonClasses = computed(() => {
  return [
    'flex items-center justify-center w-full text-sm font-semibold uppercase shadow px-5 py-2',
    radiusMapper[props.position] || radiusMapper['top-left'],
    variantClasses[props.variant] || variantClasses['primary'],
  ].join(' ')
})
</script>
