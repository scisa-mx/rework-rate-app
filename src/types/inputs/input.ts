export enum InputTypes {
  Text = 'text',
  DatePicker = 'date-picker',
  Select = 'select',
  Checkbox = 'checkbox',
  DateRangePicker = 'date-range-picker',
  Switch = 'switch',
  Tags = 'tags',
}

export type ValueInputSelect = string | number | boolean
export type DashOptionSelect = { label: string; value: ValueInputSelect; disabled?: boolean }

export type InputBaseProps = {
  id: string
  label?: string
  name?: string
  required?: boolean
  isValid?: boolean
  placeholder?: string
}

export type DashInputBase = {
  id: string
  label?: string
  name?: string
  required?: boolean
}

export type DashTextInput = DashInputBase & {
  type: InputTypes.Text
  placeholder?: string
}

export type DashInputProps = InputBaseProps & {
  modelValue: string
}

export type DashTagsInput = DashInputBase & {
  type: InputTypes.Tags
  tags: string[]
}

export type DashTagsInputProps = InputBaseProps & {
  modelValue: string[]
}

export type DashDatePickerInput = DashInputBase & {
  type: InputTypes.DatePicker
  date: string
}

export type DashDateRangePickerInput = DashInputBase & {
  type: InputTypes.DateRangePicker
  dateRange: DateRangeSchema
}

export type DashDatePickerProps = InputBaseProps & {
  modelValue: string
}

export type DateRangeSchema = {
  start: string
  end: string
}

export type DashDateRangePickerProps = InputBaseProps & {
  modelValue: DateRangeSchema
}

export type DashSelectInput = DashInputBase & {
  type: InputTypes.Select
  options: { value: string | number; label: string }[]
  multiple?: boolean
}

export type DashSelectProps = InputBaseProps & {
  options: DashOptionSelect[]
  multiple?: boolean
  modelValue: ValueInputSelect
}

export type DashCheckboxInput = DashInputBase & {
  type: InputTypes.Checkbox
  checked?: boolean
}

export type DashSwitchInput = DashInputBase & {
  type: InputTypes.Switch
  checked?: boolean
}

export type DashCheckboxProps = InputBaseProps & {
  modelValue: boolean
}

export type FormInput =
  | DashTextInput
  | DashDatePickerInput
  | DashSelectInput
  | DashCheckboxInput
  | DashDateRangePickerInput
  | DashTagsInput
  | DashSwitchInput

export type FieldInputConfig = {
  input: FormInput
  config: {
    [key: string]: () => boolean
  }
}

export interface FormGeneratorProps {
  fields: FieldInputConfig[]
  onSubmit: (values: Record<string, unknown>) => void
  onCancel?: () => void
}
