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
    },
    CHANGE_DRAGGABLE() {
      this.isDraggable = !this.isDraggable
    }
  },
})
