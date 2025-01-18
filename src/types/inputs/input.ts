export enum InputTypes {
  Text = 'text',
  DatePicker = 'date-picker',
  Select = 'select',
  Checkbox = 'checkbox',
}

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

export type DashTagsInputProps = InputBaseProps & {
  modelValue: string[]
}

export type DashDatePickerInput = DashInputBase<string> & {
  type: InputTypes.DatePicker
  date: string
}

export type DashDatePickerProps = {
  id?: string
  label?: string
  name?: string
  required?: boolean
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
