<template>
  <component :is="computedTag" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'button'
  | 'tag'

type TypographyProps = {
  variant: TypographyVariants
  tag?: string
}

const props = defineProps<TypographyProps>()

// Mapeo de cada variante a su etiqueta HTML y clases de Tailwind
const variantMapping: Record<string, { tag: string; class: string }> = {
  // Headings
  h1: { tag: 'h1', class: 'text-5xl font-bold text-gray-800 my-2' },
  h2: { tag: 'h2', class: 'text-4xl font-bold text-gray-800 my-2' },
  h3: { tag: 'h3', class: 'text-3xl font-semibold text-gray-800 my-2' },
  h4: { tag: 'h4', class: 'text-2xl font-semibold text-gray-800 my-2' },
  h5: { tag: 'h5', class: 'text-xl font-medium text-gray-800 my-2' },
  h6: { tag: 'h6', class: 'text-lg font-medium text-gray-800 my-2' },
  // Tipografía del cuerpo y variantes
  body: { tag: 'p', class: 'text-base text-gray-800' },
  subtitle1: { tag: 'p', class: 'text-sm font-medium text-gray-500' },
  subtitle2: { tag: 'p', class: 'text-sm text-gray-800' },
  caption: { tag: 'span', class: 'text-xs' },
  overline: { tag: 'span', class: 'text-xs uppercase tracking-widest' },
  button: { tag: 'span', class: 'text-base font-semibold text-white' },
  tag: { tag: 'span', class: 'px-2 py-1 text-xs bg-gray-200 rounded text-white' },
}

// Computa la etiqueta a renderizar. Si se pasa el prop "tag", se utiliza este en lugar del mapeo.
const computedTag = computed(() => {
  if (props.tag) return props.tag
  return variantMapping[props.variant]?.tag || 'p'
})

// Computa las clases de Tailwind según la variante
const classes = computed(() => {
  return variantMapping[props.variant]?.class || ''
})
</script>
