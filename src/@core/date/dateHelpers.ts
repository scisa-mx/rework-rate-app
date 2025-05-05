import { CalendarDate, type DateValue } from '@internationalized/date'
import type { DateRange } from 'radix-vue'
import { parseStringToDateValue } from 'radix-vue/date'

import { type DateRangeSchema } from '@/types'

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

export const dateValueToIso = (date: DateValue): string => {
  const { year, month, day } = date
  return new Date(year, (month - 1), day).toISOString()
}

/**
 * Convert date.toIsoString() to DateValue
 * @param isoDate String from date.toIsoString()
 * @returns DateValue or undefined
 * @example ```ts
 * const date = isoToDateValue(new Date().toISOString())
 * console.log(result) // object DateValue
 * ```
 **/
export const isoToDateValue = (isoDate: string | undefined): DateValue | undefined => {
  if (!isoDate) return undefined

  const date = new Date(isoDate)

  const calendar = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())

  const dateString = `${calendar.year}-${String(calendar.month).padStart(2, '0')}-${String(calendar.day).padStart(2, '0')}`

  return parseStringToDateValue(dateString, calendar)
}

/**
 * Convert date.toIsoString() to CalendarDate
 * @param isoString String from date.toIsoString()
 * @returns CalendarDate or undefined
 * @example ```ts
 * const date = isoToCalendarDate(new Date().toISOString())
 * console.log(result) // object CalendarDate
 * ```
 **/
export const isoToCalendarDate = (isoDate: string): CalendarDate => {
  const date = new Date(isoDate)
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

/**
 * Convert DateValue to CalendarDate
 * @param start DateValue
 * @param end DateValue
 * @returns CalendarDate object
 * @example ```ts
 * const startDate = new Date().toISOString()
 * const endDate = new Date().toISOString()
 * const result = dateValueToCalendarDate({ start: startDate, end: endDate })
 * console.log(result) // object DateRange
 * ```
 **/

export const rangeToDateRange = ({ start, end }: { start: string; end: string }): DateRange => {
  return {
    start: isoToDateValue(start),
    end: isoToDateValue(end),
  }
}

/**
 * Convert DateRange to DateValue
 * @param start DateValue
 * @param end DateValue
 * @returns DateRangeSchema object
 **/

export const dateRangeToRange = ({ start, end }: DateRange): DateRangeSchema => {
  return {
    start: start ? dateValueToIso(start) : '',
    end: end ? dateValueToIso(end) : '',
  }
}
