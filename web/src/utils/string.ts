import {format, subDays, subMonths, subWeeks, subYears} from 'date-fns'
import _ from 'lodash'

export const sentenceCase = (input: string) => _.startCase(_.toLower(input))

export const dateFormat = 'dd  MMM | eeee'
export const formatTransactionDate = (value?: Date | string | null) =>
  value ? format(new Date(value), dateFormat) : ''

export const polishDateFormat = 'dd.MM.yyyy'
export const formatDate = (value?: Date | string | null) =>
  value ? format(new Date(value), polishDateFormat) : ''

export const polishTimestampFormat = 'dd.MM.yyyy HH:mm'
export const formatTimestamp = (value: Date | string | null) =>
  value ? format(new Date(value), polishTimestampFormat) : ''

export const dayDateFormat = 'eeee dd MMMM'
export const formatDayStats = (value: Date | string | null) =>
  value ? format(new Date(value), dayDateFormat) : ''

export const weekDateFormat = 'dd.MM'
export const formatWeekStats = () => {
  const today = new Date()
  const weekBefore = subWeeks(today, 1)
  return `${format(weekBefore, weekDateFormat)} to ${format(today, weekDateFormat)}`
}

export const monthDateFormat = 'dd.MM'
export const formatMonthStats = () => {
  const today = new Date()
  const monthBefore = subMonths(today, 1)
  return `${format(monthBefore, monthDateFormat)} to ${format(today, monthDateFormat)}`
}

export const yearDateFormat = 'dd.MM.yyyy'
export const formatYearStats = () => {
  const today = new Date()
  const yearBefore = subYears(today, 1)
  return `${format(yearBefore, yearDateFormat)} - ${format(today, yearDateFormat)}`
}

export const formatMoney = (v?: number | null) => ((v || 0) / 100).toFixed(2)
