export type PaletteColorKeys =
  | 'primary-50'
  | 'primary-100'
  | 'primary-200'
  | 'primary-300'
  | 'primary-400'
  | 'primary-500'
  | 'primary-600'
  | 'primary-700'
  | 'primary-800'
  | 'primary-900'
  | 'green-50'
  | 'green-100'
  | 'green-200'
  | 'green-300'
  | 'green-400'
  | 'green-500'
  | 'green-600'
  | 'green-700'
  | 'green-800'
  | 'red-50'
  | 'red-100'
  | 'red-200'
  | 'red-300'
  | 'red-400'
  | 'red-500'
  | 'red-600'
  | 'red-700'
  | 'red-800'
  | 'blue-50'
  | 'blue-100'
  | 'blue-200'
  | 'blue-300'
  | 'blue-400'
  | 'blue-500'
  | 'blue-600'
  | 'blue-700'
  | 'blue-800'
  | 'blue-900';


export const getPaletteColor = (): Record<PaletteColorKeys, string> => {
  const styles = getComputedStyle(document.documentElement)
  const HASH_COLORS = {
    'primary-50': styles.getPropertyValue('--color-royal-purple-50'),
    'primary-100': styles.getPropertyValue('--color-royal-purple-100'),
    'primary-200': styles.getPropertyValue('--color-royal-purple-200'),
    'primary-300': styles.getPropertyValue('--color-royal-purple-300'),
    'primary-400': styles.getPropertyValue('--color-royal-purple-400'),
    'primary-500': styles.getPropertyValue('--color-royal-purple-500'),
    'primary-600': styles.getPropertyValue('--color-royal-purple-600'),
    'primary-700': styles.getPropertyValue('--color-royal-purple-700'),
    'primary-800': styles.getPropertyValue('--color-royal-purple-800'),
    'primary-900': styles.getPropertyValue('--color-royal-purple-900'),
    'green-50': styles.getPropertyValue('--color-green-50'),
    'green-100': styles.getPropertyValue('--color-green-100'),
    'green-200': styles.getPropertyValue('--color-green-200'),
    'green-300': styles.getPropertyValue('--color-green-300'),
    'green-400': styles.getPropertyValue('--color-green-400'),
    'green-500': styles.getPropertyValue('--color-green-500'),
    'green-600': styles.getPropertyValue('--color-green-600'),
    'green-700': styles.getPropertyValue('--color-green-700'),
    'green-800': styles.getPropertyValue('--color-green-800'),
    'red-50': styles.getPropertyValue('--color-red-50'),
    'red-100': styles.getPropertyValue('--color-red-100'),
    'red-200': styles.getPropertyValue('--color-red-200'),
    'red-300': styles.getPropertyValue('--color-red-300'),
    'red-400': styles.getPropertyValue('--color-red-400'),
    'red-500': styles.getPropertyValue('--color-red-500'),
    'red-600': styles.getPropertyValue('--color-red-600'),
    'red-700': styles.getPropertyValue('--color-red-700'),
    'red-800': styles.getPropertyValue('--color-red-800'),
    'blue-50': styles.getPropertyValue('--color-blue-50'),
    'blue-100': styles.getPropertyValue('--color-blue-100'),
    'blue-200': styles.getPropertyValue('--color-blue-200'),
    'blue-300': styles.getPropertyValue('--color-blue-300'),
    'blue-400': styles.getPropertyValue('--color-blue-400'),
    'blue-500': styles.getPropertyValue('--color-blue-500'),
    'blue-600': styles.getPropertyValue('--color-blue-600'),
    'blue-700': styles.getPropertyValue('--color-blue-700'),
    'blue-800': styles.getPropertyValue('--color-blue-800'),
    'blue-900': styles.getPropertyValue('--color-blue-900'),
  }

  return HASH_COLORS
}
