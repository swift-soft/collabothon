import React from 'react'

import {useToast} from '@chakra-ui/react'

import {SupabaseQueryParams} from '@/api/types'
import {supabaseQuery} from '@/api/utils'
import {AnyObject, SetState} from '@/utils/types'

import useQueryState, {QueryState} from './use-query-state'

export type useListQueryArgs<T extends AnyObject, R> = SupabaseQueryParams<T> & {
  page?: number
  limit?: number
  autoRefetch?: boolean
  errSnackbarTitle?: string
  parsingFunction?: (item: unknown) => T
  returnType?: R
}

type ReturnType<T extends AnyObject, R> = R extends 'object'
  ? {
      data: T[]
      loading: boolean
      fetch: () => Promise<void>
      rows: number
      queryState: QueryState<T>
      error: Error | null
      setData: SetState<T[]>
    }
  : R extends 'array'
  ? [T[], boolean, () => Promise<void>, number, QueryState<T>, Error | null]
  : never

const useListQuery = <T extends AnyObject, R extends 'object' | 'array' = 'array'>({
  from,
  fields,
  parsingFunction,
  errSnackbarTitle,
  autoRefetch = true,
  returnType,
  ...initialQueryState
}: useListQueryArgs<T, R>): ReturnType<T, R> => {
  const toast = useToast()
  const ac = React.useRef<AbortController>()

  const [data, setData] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState(true)
  const [rows, setRows] = React.useState<number>(0)
  const [error, setError] = React.useState<Error | null>(null)

  const queryState = useQueryState(initialQueryState)

  const fetch = React.useCallback(async () => {
    if (loading && ac.current) ac.current.abort()

    setLoading(true)
    ac.current = new AbortController()
    try {
      const {page, limit, order, match, filter, finalize, descending} = queryState

      const {data, count, error} = await supabaseQuery({
        from,
        order,
        match,
        fields,
        limit,
        page,
        filter,
        finalize,
        descending,
        abortSignal: ac.current.signal,
      })
      if (error) throw error

      setData((parsingFunction ? data?.map((item: unknown) => parsingFunction(item)) : data) || [])
      setRows(count ?? 0)
    } catch (e) {
      if ((e as Error).message.includes('aborted')) return
      console.error(e)
      setError(e as Error)
      toast({
        title: errSnackbarTitle || 'Nie udało się wczytać zasobów',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    from,
    fields,
    errSnackbarTitle,
    parsingFunction,
    toast,
    loading,
    queryState,
    queryState.order,
    queryState.descending,
    queryState.filter,
    queryState.finalize,
    queryState.limit,
    queryState.match,
    queryState.page,
  ])

  React.useEffect(() => {
    autoRefetch && fetch()
  }, [
    queryState.order,
    queryState.descending,
    queryState.filter,
    queryState.finalize,
    queryState.limit,
    queryState.match,
    queryState.page,
  ])

  return (
    returnType === 'object'
      ? {data, loading, fetch, rows, queryState, error, setData}
      : [data, loading, fetch, rows, queryState, error]
  ) as ReturnType<T, R>
}

export default useListQuery
