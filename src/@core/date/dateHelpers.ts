import { CalendarDate, type DateValue } from '@internationalized/date'
import { parseStringToDateValue } from 'radix-vue/date'

/**
 * Convert Date to date.toIsoString()
 * @param isoDate String from date.toIsoString()
 * @returns Date type or undefined
 * @example ```ts
 * const date = new Date()
 * const isoDate = date.toISOString()
 * const result = isoToDate(isoDate)
 * console.log(result) // Date
 * ```
 **/
export const isoToDate = (isoDate: string): Date | undefined => {
  return isoDate ? new Date(isoDate) : undefined
}

/**
 * Convert Date to date.toIsoString()
 * @param date Date type
 * @returns String from date.toIsoString()
 * @example ```ts
 * const date = new Date()
 * const result = dateToIso(date)
 * console.log(result) // String
 * ```
 **/
export const dateToIso = (date: Date): string => {
  return date.toISOString()
}

/**
 * Convert String to date.toIsoString()
 * @param date String
 * @returns String from date.toIsoString()
 * @example ```ts
 * const date = '2021-10-10'
 * const result = stringToIso(date)
 * console.log(result) // String
 * ```
 **/

export const stringToIso = (date: string): string => {
  return new Date(date).toISOString()
}

/**
 * Convert DateValue to date.toIsoString()
 * @param date DateValue
 * @returns String from date.toIsoString()
 * @example ```ts
 * const date = parseStringToDateValue('2025-01-01', date)
 * const result = DateValueToIso(date)
 * console.log(result) // String
 * ```
 **/

export const DateValueToIso = (date: DateValue): string | undefined => {
  if (date) {
    const { year, month, day } = date
    return new Date(year, month, day).toISOString()
  }

  return undefined
}

/**
 * Convert date.toIsoString() to DateValue
 * @param isoString String from date.toIsoString()
 * @returns DateValue or undefined
 * @example ```ts
 * const date = isoToDateValue(new Date().toISOString())
 * console.log(result) // object DateValue
 * ```
 **/

export const isoToDateValue = (isoDate: string): DateValue | undefined => {
  if (isoDate) {
    const date = new Date(isoDate)
    if (isNaN(date.getTime())) {
      return undefined
    }
    const calendar = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())

    const dateString = `${calendar.year}-${String(calendar.month).padStart(2, '0')}-${String(calendar.day).padStart(2, '0')}`
    debugger
    return parseStringToDateValue(dateString, calendar)
  }

  return undefined
}
