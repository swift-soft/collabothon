import {useEffect, useState} from 'react'
import React from 'react'

import {add, startOfDay, sub} from 'date-fns'
import {useParams} from 'react-router-dom'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import {DateRange, TimeRange} from './types'

export const useStatsState = () => {
  const user = useAppSelector(selectProfile)
  const [range, setRange] = React.useState<TimeRange>()

  const [activeTab, setActiveTab] = useState<DateRange>('day')
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

  const {id} = useParams()
  const [statistics, setStatistics] = useState([])

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!id) return

      try {
        const {data, error} = await supabase
          .rpc('get_user_stats', {from: new Date(), to: new Date()})
          .select()
          .returns<{category: string; total: number; products: any[]}>()

        if (error) {
          throw new Error(error.message)
        } else {
          const userStatistics = data[0]
          setStatistics(
            userStatistics.products.map((product) => ({
              name: product.name,
              value: product.price * product.amount,
            }))
          )
          setIsSender(userStatistics.source_account === user?.account_number)
        }
      } catch (err) {
        console.error((err as Error)?.message)
      }
    }

    fetchStatistics()
  }, [id, user])

  return {statistics, user, range, activeTab, setActiveTab}
}
