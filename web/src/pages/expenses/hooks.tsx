import {useEffect, useState} from 'react'
import React from 'react'

import {startOfDay, sub} from 'date-fns'

import {supabase} from '@/api'
import {Stats} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import {DateRange, TimeRange} from './types'

export const useStatsState = () => {
  const user = useAppSelector(selectProfile)
  const [range, setRange] = React.useState<TimeRange>({from: startOfDay(new Date()), to: new Date()})

  const [activeTab, setActiveTab] = useState<DateRange>('week')
  React.useEffect(() => {
    const newRange: TimeRange = {from: new Date(), to: new Date()}

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
    setRange(newRange)
  }, [activeTab])

  const [statistics, setStatistics] = useState<Stats>([])
  useEffect(() => {
    const fetchStatistics = async () => {
      if (!range) return

      try {
        const {data, error} = await supabase.rpc('get_user_stats', {
          from: range?.from.toUTCString(),
          to: range?.to.toUTCString(),
        })
        if (error) throw error
        console.log(data)
        setStatistics(data)
      } catch (err) {
        console.error((err as Error)?.message)
      }
    }

    fetchStatistics()
  }, [range])

  return {statistics, user, range, activeTab, setActiveTab}
}
