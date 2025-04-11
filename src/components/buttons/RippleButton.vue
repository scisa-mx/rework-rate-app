<template>
  <button
    name="ripple-button"
    :class="`relative m-0 cursor-pointer overflow-hidden py-2 px-4 flex justify-items-center justify-center rounded-md ${bgColor}`"
    @click="createRipple"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

defineProps({
  bgColor: {
    type: String as PropType<string>,
    default: 'bg-transparent',
  },
})

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement

  // Crear el elemento ripple
  const ripple = document.createElement('span')
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.className = 'absolute bg-gray-500/50 rounded-full transform animate-ripple'

  button.appendChild(ripple)

  // Eliminar el ripple después de la animación
  ripple.addEventListener('animationend', () => {
    ripple.remove()
  })
}
</script>
