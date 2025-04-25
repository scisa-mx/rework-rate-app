import { defineStore } from 'pinia'
import type { Widget } from '@/types/widgets/widgets'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    widgets: [] as Widget[],
    isDraggable: false as boolean,
  }),
  actions: {
    GET_WIDGETS() {
    },
    SET_WIDGETS() {
    },
    DELETE_WIDGET() {
    },
    ADD_WIDGET() {
    },
    UPDATE_WIDGETS_TO_LOCAL_STORAGE() {
      localStorage.setItem('widgets', JSON.stringify(this.widgets))
    },
    CHANGE_STATE_BOARD() {
      this.isDraggable = !this.isDraggable
    }
  },
})
