import {format, subWeeks, startOfWeek, endOfWeek } from 'date-fns'
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

export const weekDateFormat = 'dd MMMM';

export const formatWeekStats = (value: Date | string | null) => {
  if (value) {
    const currentDate = new Date(value);
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const formattedCurrentDate = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    const formattedOneWeekAgo = oneWeekAgo.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

    return `${formattedOneWeekAgo} - ${formattedCurrentDate}`;
  } else {
    return '';
  }
}

export const monthDateFormat = 'MMMM'
export const formatMonthStats = (value: Date | string | null) =>
  value ? format(new Date(value), monthDateFormat) : ''

export const yearDateFormat = 'yyyy'
export const formatYearStats = (value: Date | string | null) =>
  value ? format(new Date(value), yearDateFormat) : ''

export const formatMoney = (v?: number | null) => ((v || 0) / 100).toFixed(2)
