export type ComponentCardType = 'icon-card' | 'link-card' | 'img-card' | 'simple-card'

export type DashBaseCardProps = {
  type: ComponentCardType
  loading?: boolean
  disabled?: boolean
  header?: string
  body?: string
  footer?: string
  label?: string
  action?: () => void
}
