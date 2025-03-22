// src/composables/useTheme.ts
import { ref, onMounted, watchEffect } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
  })

  watchEffect(() => {
    const className = 'dark'
    const element = document.documentElement

    if (isDark.value) {
      element.classList.add(className)
      localStorage.setItem('theme', 'dark')
    } else {
      element.classList.remove(className)
      localStorage.setItem('theme', 'light')
    }
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
