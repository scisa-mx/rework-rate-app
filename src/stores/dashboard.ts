import { defineStore } from 'pinia'
import type { Widget } from '@/types/widgets/widgets'
import { TYPE_WIDGET, TYPE_CHART, STATE_WIDGET } from '@/types/widgets/widgets'

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
    DELETE_WIDGET(index: string) {
      // Delete a widget by its index
      this.widgets.splice(Number(index) , 1)
      this.UPDATE_WIDGETS_TO_LOCAL_STORAGE()
    },
    ADD_WIDGET(widget: TYPE_WIDGET) {
      const { h, w, x, y } = this.CALCULATE_POSITION_WIDGETS()
      const newWidget: Widget = {
        id: crypto.randomUUID(),
        name: 'historial-1',
        typeChart: TYPE_CHART.LINE,
        state: STATE_WIDGET.DEFAULT,
        typeWidget: widget,
        x: x,
        y: y,
        w: w,
        h: h,
        i: (this.widgets.length + 1).toString(),
      }
      this.widgets.push(newWidget)
      this.UPDATE_WIDGETS_TO_LOCAL_STORAGE()
    },

    CALCULATE_POSITION_WIDGETS() {
      // Calculate the position of the next widget
      const lastWidget = this.widgets[this.widgets.length - 1]
      const lastWidgetX = lastWidget ? lastWidget.x : 0
      const lastWidgetY = lastWidget ? lastWidget.y : 0
      const lastWidgetW = lastWidget ? lastWidget.w : 0
      const lastWidgetH = lastWidget ? lastWidget.h : 0
      const newWidgetX = lastWidgetX + lastWidgetW
      const newWidgetY = lastWidgetY + lastWidgetH
      const newWidgetW = 6 // Set the width of the new widget

      const newWidgetH = 10 // Set the height of the new widget

      return {
        x: newWidgetX,
        y: newWidgetY,
        w: newWidgetW,
        h: newWidgetH,
      }
    },
    UPDATE_WIDGETS_TO_LOCAL_STORAGE() {
      localStorage.setItem('widgets', JSON.stringify(this.widgets))
    },
    CHANGE_STATE_BOARD() {
      this.isDraggable = !this.isDraggable
    }
  },
})
