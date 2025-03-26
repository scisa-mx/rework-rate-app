<template>
  <div :class="['aspect-video', 'bg-gray-200', 'rounded-lg', 'overflow-hidden', customStyles]">
    <img v-if="isLoaded" :src="src" :alt="alt" class="w-full h-full object-cover" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type ImageProp = {
  src: string
  alt?: string
  lazy?: boolean
  customStyles?: string
}

const props = defineProps<ImageProp>()

const isLoaded = ref(!props.lazy)

onMounted(() => {
  if (props.lazy) {
    const img = new Image()
    img.src = props.src
    img.onload = () => (isLoaded.value = true)
  }
})
</script>
