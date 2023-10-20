import {format} from 'date-fns'
import _ from 'lodash'

export const sentenceCase = (input: string) => _.startCase(_.toLower(input))

export const transactionDateFormat = 'dd  MMM | eeee'
export const formatTransactionDate = (value?: Date | string | null) =>
  value ? format(new Date(value), transactionDateFormat) : ''

export const dateFormat = 'dd.MM.yyyy'
export const formatDate = (value?: Date | string | null) => (value ? format(new Date(value), dateFormat) : '')

export const polishTimestampFormat = 'dd.MM.yyyy HH:mm'
export const formatTimestamp = (value: Date | string | null) =>
  value ? format(new Date(value), polishTimestampFormat) : ''

export const dayDateFormat = 'DDDD, dd MMMM'
export const formatDayStats = (value: Date | string | null) =>
  value ? format(new Date(value), dayDateFormat) : ''

export const monthDateFormat = 'MMMM'
export const formatMonthStats = (value: Date | string | null) =>
  value ? format(new Date(value), monthDateFormat) : ''

export const yearDateFormat = 'yyyy'
export const formatYearStats = (value: Date | string | null) =>
  value ? format(new Date(value), yearDateFormat) : ''

export const formatMoney = (v?: number | null) => ((v || 0) / 100).toFixed(2)
