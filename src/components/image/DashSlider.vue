<script setup lang="ts">
import { ref, onMounted, onUnmounted, useSlots } from 'vue'

type SliderStyle = 'slides-only' | 'with-indicator' | 'with-controls-and-indicators'

const props = defineProps({
  autoSlide: { type: Boolean, default: false },
  interval: { type: Number, default: 3000 },
  sliderStyle: { type: String as () => SliderStyle, default: 'slides-only' },
})

const slots = useSlots()
const slides = ref<HTMLElement[]>([])
const currentIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const resetAutoSlide = () => {
  if (intervalId) clearInterval(intervalId)
  if (props.autoSlide) {
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length
    }, props.interval)
  }
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
  resetAutoSlide()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
  resetAutoSlide()
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  resetAutoSlide()
}

onMounted(() => {
  slides.value = slots.default
    ? slots
        .default()
        .map((_, index) => document.querySelectorAll('.slider-item')[index] as HTMLElement)
    : []
  resetAutoSlide()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="relative overflow-hidden w-full">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <slot></slot>
    </div>

    <!-- Indicadores -->
    <div
      v-if="['with-indicator', 'with-controls-and-indicators'].includes(sliderStyle)"
      class="absolute bottom-2 w-full flex justify-center gap-2"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="['w-3 h-3 rounded-full', index === currentIndex ? 'bg-blue-500' : 'bg-gray-300']"
      ></button>
    </div>

    <!-- Controles -->
    <div
      v-if="sliderStyle === 'with-controls-and-indicators'"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-between"
    >
      <button @click="prevSlide" class="bg-black/50 text-white px-3 py-2 rounded-md">❮</button>
      <button @click="nextSlide" class="bg-black/50 text-white px-3 py-2 rounded-md">❯</button>
    </div>
  </div>
</template>

<style scoped>
.slider-item {
  min-width: 100%;
  box-sizing: border-box;
}
</style>
