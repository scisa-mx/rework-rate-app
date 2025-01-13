export enum InputTypes {
  Text = 'text',
  DatePicker = 'date-picker',
  Select = 'select',
  Checkbox = 'checkbox',
}

export type DashInputBase<TValue> = {
  id: string
  label?: string
  value: TValue
  name?: string
  required: boolean
  modelValue: TValue
}

export type DashTextInput = DashInputBase<string> & {
  type?: InputTypes.Text
  placeholder?: string
}

export type DashInputProps = {
  id: string
  label?: string
  name: string
  required?: boolean
  modelValue: string
  placeholder?: string
}

export type DashDatePickerInput = DashInputBase<string> & {
  type: InputTypes.DatePicker
  minDate?: string
  maxDate?: string
}

export type DashDatePickerProps = {
  id: string
  label: string
  name: string
  required?: boolean
  modelValue: string
  minDate?: string
  maxDate?: string
}

export type DashSelectInput = DashInputBase<string | string[]> & {
  type: InputTypes.Select
  options: { value: string | number; label: string }[]
  multiple?: boolean
}

export type DashSelectProps = {
  id: string
  label: string
  name: string
  required?: boolean
  modelValue: string | string[]
  options: { value: string | number; label: string }[]
  multiple?: boolean
}

export type DashCheckboxInput = DashInputBase<boolean> & {
  type: InputTypes.Checkbox
  checked?: boolean
}

export type DashCheckboxProps = {
  id: string
  label?: string
  name: string
  required?: boolean
  modelValue: boolean
}

export type FormInput = DashTextInput | DashDatePickerInput | DashSelectInput | DashCheckboxInput
