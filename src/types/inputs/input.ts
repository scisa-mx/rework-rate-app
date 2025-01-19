export enum InputTypes {
  Text = 'text',
  DatePicker = 'date-picker',
  Select = 'select',
  Checkbox = 'checkbox',
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

export type DashInputBase<TValue> = {
  id: string
  label?: string
  value?: TValue
  name?: string
  isValid?: boolean
  required?: boolean
  modelValue: TValue
}

export type DashTextInput = DashInputBase<string> & {
  type?: InputTypes.Text
  placeholder?: string
}

export type DashInputProps = InputBaseProps & {
  modelValue: string
}

export type DashTagsInputProps = InputBaseProps & {
  modelValue: string[]
}

export type DashDatePickerInput = DashInputBase<string> & {
  type: InputTypes.DatePicker
  date: string
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

export type DashSelectInput = DashInputBase<string | string[]> & {
  type: InputTypes.Select
  options: { value: string | number; label: string }[]
  multiple?: boolean
}

export type DashSelectProps = InputBaseProps & {
  options: DashOptionSelect[]
  multiple?: boolean
  modelValue: ValueInputSelect
}

export type DashCheckboxInput = DashInputBase<boolean> & {
  type: InputTypes.Checkbox
  checked?: boolean
}

export type DashCheckboxProps = InputBaseProps & {
  modelValue: boolean
}

export type FormInput = DashTextInput | DashDatePickerInput | DashSelectInput | DashCheckboxInput
