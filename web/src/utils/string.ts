import {format} from 'date-fns'
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

<<<<<<< HEAD
export const dayDateFormat = 'DDDD, dd MMMM'
export const formatDayStats = (value: Date | string | null) =>
  value ? format(new Date(value), dayDateFormat) : ''

export const weekDateFormat = 'dd.MM.yyyy'
export const formatWeekStats = (value: Date | string | null) =>
  value ? format(new Date(value), weekDateFormat) : ''

export const monthDateFormat = 'MMMM'
export const formatMonthStats = (value: Date | string | null) =>
  value ? format(new Date(value), monthDateFormat) : ''

export const yearDateFormat = 'yyyy'
export const formatYearStats = (value: Date | string | null) =>
  value ? format(new Date(value), yearDateFormat) : ''

=======
export const formatMoney = (v?: number | null) => ((v || 0) / 100).toFixed(2)
>>>>>>> 2f0358fecc72dc83d7473e72c6e0c6ad6884c2c3
