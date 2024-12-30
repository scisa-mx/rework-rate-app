export type ValueInputSelect = string | number | boolean

export type DashOptionSelect = { label: string; value: ValueInputSelect; disabled?: boolean }

export type SelectItemProps = {
  options: DashOptionSelect[]
  label: string
  modelValue: ValueInputSelect
  onChange?: (value: ValueInputSelect) => void
}
