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

export const dateWithMonethName = 'dd MMMM'
export const formatDateName = (value: Date | string | null) =>
  value ? format(new Date(value), dateWithMonethName) : ''

export const formatDateLong = (value?: Date | string | null) =>
  value ? format(new Date(value), 'dd MMMM yyyy, HH:mm') : ''

export const formatMoney = (v?: number | null) =>
  ((v || 0) / 100).toLocaleString('pl', {minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'PLN'})
