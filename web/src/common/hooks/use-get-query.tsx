import React from 'react'

import {SupabaseQueryParams} from '@/api/types'
import {supabaseQuery} from '@/api/utils'
import {AnyObject} from '@/utils/types'

import useLoadingState from './use-loading-state'

type Props<T extends AnyObject> = Omit<SupabaseQueryParams<T>, 'limit' | 'page' | 'abortSignal'> & {
  autoRefetch?: boolean
  errSnackbarTitle?: string
  parsingFunction?: (item: unknown) => T
}

const useGetQuery = <T extends AnyObject>({
  errSnackbarTitle,
  parsingFunction,
  autoRefetch = true,
  ...params
}: Props<T>): [T | null, boolean, () => Promise<void>, Error | null] => {
  const [data, setData] = React.useState<T | null>(null)

  const [fetch, loading, error] = useLoadingState(
    React.useCallback(async () => {
      const {data, error} = await supabaseQuery(params).limit(1).maybeSingle()
      if (error) throw error

      setData(parsingFunction && data ? parsingFunction(data) : data)
    }, [params, parsingFunction]),
    {onErrorToast: errSnackbarTitle || 'Nie udało się wczytać zasobu'}
  )

  React.useEffect(() => {
    autoRefetch && fetch()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [params.descending, params.fields, params.filter, params.match, params.order])

  return [data, loading, fetch, error]
}

export default useGetQuery
