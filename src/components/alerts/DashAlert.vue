<template>
  <div :class="containerClasses">
    <vue-feather size="20" :type="Icons[props.type]" :class="iconClasses" />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'

type AlertProps = {
  type: AlertType
}

const props = defineProps<AlertProps>()

const typeMapping: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  primary: {
    bg: 'bg-royal-purple-50',
    border: 'border-royal-purple-200',
    text: 'text-royal-purple-800',
    icon: 'text-royal-purple-500',
  },
  secondary: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800',
    icon: 'text-gray-500',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-500',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-500',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-500',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-500',
  },
}

const Icons = {
  primary: 'info',
  secondary: 'info',
  success: 'check-circle',
  error: 'x-circle',
  warning: 'alert-triangle',
  info: 'alert-circle',
}

const containerClasses = computed(() => {
  const typeClasses = typeMapping[props.type] || typeMapping.primary
  return `flex items-start gap-3 p-4 border rounded-md ${typeClasses.bg} ${typeClasses.border} ${typeClasses.text}`
})

const iconClasses = computed(() => {
  const typeClasses = typeMapping[props.type] || typeMapping.primary
  return typeClasses.icon
})
</script>
