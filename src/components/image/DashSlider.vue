<template>
  <!-- Touch Wrapper -->
  <div
    class="relative overflow-hidden w-full"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Slides -->
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <slot></slot>
    </div>

    <!-- Indicators -->
    <div
      v-if="['with-indicator', 'with-controls-and-indicators'].includes(sliderStyle)"
      class="absolute bottom-2 w-full flex justify-center z-20"
    >
      <div class="bg-black/50 px-4 py-2 rounded-full flex gap-2 items-center">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="hover:bg-royal-purple-600 hover:text-white transition-all duration-300"
          :class="[
            'rounded-full',
            index === currentIndex ? 'bg-royal-purple-600 w-6 h-3' : 'bg-gray-300/60 w-3 h-3',
          ]"
        ></button>
      </div>
    </div>

    <!-- Controls -->
    <div
      v-if="sliderStyle === 'with-controls' || sliderStyle === 'with-controls-and-indicators'"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-between px-2"
    >
      <button
        @click="prevSlide"
        class="bg-black/50 hover:bg-black/60 text-white px-4 py-2 rounded-full"
      >
        ❮
      </button>
      <button
        @click="nextSlide"
        class="bg-black/50 hover:bg-black/60 text-white px-4 py-2 rounded-full"
      >
        ❯
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useSlots } from 'vue'

type SliderStyle =
  | 'slides-only'
  | 'with-indicator'
  | 'with-controls'
  | 'with-controls-and-indicators'

type DashSliderProps = {
  autoSlide?: boolean
  interval?: number
  sliderStyle?: SliderStyle
}

const props = withDefaults(defineProps<DashSliderProps>(), {
  autoSlide: true,
  interval: 5000,
  sliderStyle: 'slides-only',
})

const slots = useSlots()
const slides = ref<HTMLElement[]>([])
const currentIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const touchStartX = ref<number | null>(null)
const touchEndX = ref<number | null>(null)

/* ----------------------------------------------------
 * Methods
 * ---------------------------------------------------- */
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

/* ----------------------------------------------------
 * Swipe
 * ---------------------------------------------------- */
const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  if (touchStartX.value !== null && touchEndX.value !== null) {
    const diff = touchStartX.value - touchEndX.value
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }
  touchStartX.value = null
  touchEndX.value = null
}

/* ----------------------------------------------------
 * Lifecycle
 * ---------------------------------------------------- */

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

<style scoped>
.slider-item {
  min-width: 100%;
  box-sizing: border-box;
}
</style>
