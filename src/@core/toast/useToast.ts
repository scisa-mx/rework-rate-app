import { ref } from 'vue'

export type ToastVariant = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO' | 'DEFAULT'
export interface Toast {
  id: number
  title: string
  description?: string
  type?: 'foreground' | 'background'
  duration?: number
  createdAt: number
  isDismissing: boolean
  variant: ToastVariant
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  function showToast(toast: Omit<Toast, 'id' | 'createdAt' | 'isDismissing'>) {
    const id = toastId++
    const createdAt = Date.now()
    const duration = toast.duration || 5000

    toasts.value.push({ id, createdAt, isDismissing: false, ...toast })

    setTimeout(() => {
      const toast = toasts.value.find((t) => t.id === id)
      if (toast) {
        toast.isDismissing = true
      }
    }, duration - 400)

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  function dismissToast(id: number) {
    const toast = toasts.value.find((t) => t.id === id)
    if (toast) {
      toast.isDismissing = true
    }
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 300)
  }

  return {
    toasts,
    showToast,
    dismissToast,
  }
}
