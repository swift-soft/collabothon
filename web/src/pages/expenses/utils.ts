import {format} from 'date-fns'

import {formatDate} from '@/utils/string'

import {DateRange, TimeRange} from './types'

export const dayDateFormat = 'eeee dd MMMM'
export const foramtTimeRange = (range: TimeRange, activeTab: DateRange) => {
  switch (activeTab) {
    case 'day':
      return format(new Date(), 'dd  MMM | eeee')
    case 'week':
      return format(range.from, 'dd.MM') + ' - ' + format(range.to, 'dd.MM')
    default:
      return formatDate(range.from) + ' - ' + formatDate(range.to)
  }
}
