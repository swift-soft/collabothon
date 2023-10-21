import {DateRange, TimeRange} from './types'

export const dayDateFormat = 'eeee dd MMMM'
export const foramtTimeRange = (range: TimeRange, activeTab: DateRange) => {
  switch (activeTab) {
    case 'day':
      newRange.from = startOfDay(new Date())
      break
    case 'week':
      newRange.from = sub(new Date(), {
        weeks: 1,
      })
      break
    case 'month':
      newRange.from = sub(new Date(), {
        months: 1,
      })
      break
    case 'year':
      newRange.from = sub(new Date(), {
        years: 1,
      })
  }
}
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
