<template>
  <button :type="buttonType" :disabled="loading" :class="buttonClasses">
    <span class="relative z-10">
      <slot></slot>
    </span>

    <LoadingOverlay v-model="loading" />
  </button>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import LoadingOverlay from '@/components/overlay/LoadingOverlay.vue'

type FormInputVariant = 'submit' | 'cancel'

type FormInputProps = {
  variant?: FormInputVariant
  loading?: boolean
}

const props = defineProps<FormInputProps>()

const variant = props.variant || 'submit'
const buttonType = variant === 'submit' ? 'submit' : 'button'

const loading = ref(props.loading)

const buttonVariants = {
  submit: 'bg-royal-purple-800 focus:ring-royal-purple-500 hover:bg-royal-purple-600',
  cancel: 'bg-transparent text-slate-500 focus:ring-gray-300 hover:bg-gray-100',
}

const buttonClasses = computed(() => {
  const base =
    'relative min-w-[150px] px-4 py-2 text-white rounded-full shadow-md transition-all duration-300 ease-out active:scale-95 focus:ring-4'
  return `${base} ${buttonVariants[variant] || ''}`
})

watch(
  () => props.loading,
  (value) => {
    loading.value = value
  },
)
</script>
