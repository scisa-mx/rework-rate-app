/**
 *   This hook provides a debounce function that can be used to limit the rate at which a function can fire.
 *   It is useful for performance optimization, especially in scenarios like input handling or button clicks.
 *   @param timeDebounce - The time in milliseconds to wait before executing the callback function.
 *   @returns An object containing the debounce function with the specified delay.
 *   @example
 *          import { useDebounce } from '@/composables/useDebounce';
 *          const { debounce } = useDebounce({ timeDebounce: 500 });
 *          debounce(() => {
 *              console.log('Function executed after debounce');
 *          });
*/
export function useDebounce({ timeDebounce }: { timeDebounce: number }) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounce = (callback: () => void) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      callback()
      timeoutId = null
    }, timeDebounce)
  }

  return { debounce }
}