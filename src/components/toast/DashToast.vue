<script setup lang="ts">
import { ref } from 'vue'
import {
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'radix-vue'

const open = ref(false)
const eventDateRef = ref(new Date())
const timerRef = ref(0)

function oneWeekAway() {
  const now = new Date()
  const inOneWeek = now.setDate(now.getDate() + 7)
  return new Date(inOneWeek)
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

function handleClick() {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway()
    open.value = true
  }, 100)
}
</script>

<template>
  <ToastProvider>
    <button
      class="inline-flex items-center justify-center rounded-lg font-medium px-3 py-2 bg-royal-purple-600 text-white shadow-md hover:bg-royal-purple-700 focus:ring-2 focus:ring-royal-purple-500 focus:ring-offset-2"
      @click="handleClick"
    >
      Add to calendar
    </button>

    <ToastRoot
      v-model:open="open"
      class="bg-gun-powder-50 rounded-lg shadow-lg p-4 flex flex-col gap-2 border border-gun-powder-200 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut"
    >
      <ToastTitle class="font-semibold text-gun-powder-900"> Scheduled: Catch up </ToastTitle>
      <ToastDescription as-child>
        <time class="text-gun-powder-600 text-sm" :dateTime="eventDateRef.toISOString()">
          {{ prettyDate(eventDateRef) }}
        </time>
      </ToastDescription>
      <ToastAction as-child alt-text="Goto schedule to undo">
        <button
          class="mt-2 inline-flex items-center justify-center rounded-md font-medium px-3 py-1.5 text-sm bg-victoria-600 text-white hover:bg-victoria-700 focus:ring-2 focus:ring-victoria-500 focus:ring-offset-2"
        >
          Undo
        </button>
      </ToastAction>
    </ToastRoot>

    <ToastViewport
      class="fixed bottom-4 right-4 flex flex-col gap-3 w-80 max-w-[95vw] z-50 outline-none"
    />
  </ToastProvider>
</template>
