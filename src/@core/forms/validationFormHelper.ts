import { InputTypes } from '@/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

export type ValidatorResponse = {
  isValid: boolean
  message: string
}

export type Validator<T> = (value: T) => ValidatorResponse

export type ValidationRules<T> = Record<string, Validator<T>>

export const minLength =
  (min: number): Validator<string> =>
  (value) => {
    if (value.length < min) {
      return { isValid: false, message: t('validationMessages.minimunLength', { minimun: min }) }
    }
    return { isValid: true, message: '' }
  }
export const maxLength =
  (max: number): Validator<string> =>
  (value) => {
    if (value.length > max) {
      return { isValid: false, message: t('validationMessages.maximunLength', { maximun: max }) }
    }
    return { isValid: true, message: '' }
  }

export const range =
  (min: number, max: number): Validator<number> =>
  (value) => {
    if (value < min || value > max) {
      return {
        isValid: false,
        message: t('validationMessages.range', { minimun: min, maximun: max }),
      }
    }
    return { isValid: true, message: '' }
  }

export const VALIDATOR_FUNTIONS_CASES: Record<InputTypes, Fuctiont> = {
  [InputTypes.Text]: [minLength, maxLength],
  [InputTypes.DateRangePicker]: [range],
  [InputTypes.DatePicker]: [range],
  [InputTypes.Tags]: [],
  [InputTypes.Switch]: [],
  [InputTypes.Select]: [],
  [InputTypes.Checkbox]: [],
}

type FieldConfig = {
  name: string;
  label: string;
  type: InputTypes;
  validations?: Validator<string>[];
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export const formConfig: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: InputTypes.Text,
    validations: [minLength(5), maxLength(20)],
    placeholder: "Enter your username",
  },
  {
    name: "gender",
    label: "Gender",
    type: InputTypes.Select,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
];