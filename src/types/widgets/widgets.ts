export enum STATE_WIDGET {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
  DEFAULT = 'default',
  DISABLED = 'disabled',
}
export enum TYPE_CHART {
  CHART = 'chart',
  LINE = 'line',
  BAR = 'bar',
  BAR_LINE = 'bar_line',
}

export enum TYPE_WIDGET {
  HISTORICAL = 'historical',
  MEDIA = 'media',
}

export interface GridItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  maxW?: number
  minH?: number
  maxH?: number
  isDraggable?: boolean
  isResizable?: boolean
  isBounded?: boolean
  static?: boolean
  dragIgnoreFrom?: string
  dragAllowFrom?: string
  resizeIgnoreFrom?: string
  preserveAspectRatio?: boolean
  dragOption?: object
  rezizeOption?: object
}

export interface Widget extends GridItem {
  id: string
  name?: string
  typeChart: TYPE_CHART
  state: STATE_WIDGET
  typeWidget: TYPE_WIDGET
}


