<template>
  <div class="relative inline-block">
    <!-- Texto que se muestra progresivamente -->
    <span class="text-gray-80">{{ displayedText }}</span>
    <!-- Cursor parpadeante -->
    <span class="border-r-2 border-gray-800 animate-blink"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Texto a mostrar con efecto máquina de escribir
  text: { type: String, required: true },
  // Velocidad de tipeo (milisegundos entre cada letra)
  speed: { type: Number, default: 100 },
  // Tiempo de espera al terminar de escribir todo el texto (ms)
  pauseAfterTyping: { type: Number, default: 1500 },
  // Cantidad de letras a borrar para simular el retroceso
  backspaceCount: { type: Number, default: 3 },
  // Velocidad del retroceso (milisegundos entre cada borrado)
  backspaceSpeed: { type: Number, default: 100 },
  // Tiempo de espera después de borrar (ms) antes de volver a escribir
  pauseAfterDeleting: { type: Number, default: 500 },
  // Si es true, se repite el ciclo continuamente
  repeat: { type: Boolean, default: true },
})

// Estado reactivo para el texto mostrado y la posición actual
const displayedText = ref('')
const index = ref(0)
// Flag para saber si estamos en modo "borrado" (retroceso)
const isDeleting = ref(false)
let timeout: number | null = null

// Función recursiva que controla el efecto typewriter
function typeWriterStep() {
  if (!isDeleting.value) {
    // Modo tipeo: vamos agregando letra a letra
    if (index.value < props.text.length) {
      displayedText.value = props.text.slice(0, index.value + 1)
      index.value++
      timeout = window.setTimeout(typeWriterStep, props.speed)
    } else {
      // Texto completo escrito, esperamos un momento...
      if (props.repeat) {
        timeout = window.setTimeout(() => {
          isDeleting.value = true
          typeWriterStep()
        }, props.pauseAfterTyping)
      }
    }
  } else {
    // Modo borrado: retroceder hasta borrar "backspaceCount" letras
    if (index.value > props.text.length - props.backspaceCount && index.value > 0) {
      displayedText.value = props.text.slice(0, index.value - 1)
      index.value--
      timeout = window.setTimeout(typeWriterStep, props.backspaceSpeed)
    } else {
      // Una vez borrado lo deseado, esperamos y volvemos a escribir la parte borrada
      timeout = window.setTimeout(() => {
        isDeleting.value = false
        typeWriterStep()
      }, props.pauseAfterDeleting)
    }
  }
}

onMounted(() => {
  typeWriterStep()
})

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<style scoped>
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  50.1%,
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-start infinite;
}
</style>
