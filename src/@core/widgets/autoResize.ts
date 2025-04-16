// useAutoResize.ts
import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useAutoResize(
  el: Ref<HTMLElement | null>,
  layoutItem: { h: number },
  rowHeight: number = 30,
) {
  let resizeObserver: ResizeObserver | null = null

  onMounted(() => {
    if (el.value) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const contentHeight = entry.contentRect.height
          const newH = Math.ceil(contentHeight / rowHeight)
          if (newH > layoutItem.h) {
            layoutItem.h = newH
          }
        }
      })
      resizeObserver.observe(el.value)
    }
  })

  onUnmounted(() => {
    if (resizeObserver && el.value) {
      resizeObserver.unobserve(el.value)
      resizeObserver.disconnect()
    }
  })
}
