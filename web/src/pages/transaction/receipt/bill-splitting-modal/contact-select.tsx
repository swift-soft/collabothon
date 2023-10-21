import React from 'react'

import {GroupBase, SingleValue} from 'react-select'
import AsyncSelect, {AsyncProps} from 'react-select/async'

import {supabase} from '@/api'
import {User} from '@/api/models'
import useGetQuery from '@/common/hooks/use-get-query'
import {SelectOption} from '@/utils/types'

type Props = Omit<AsyncProps<SelectOption, false, GroupBase<SelectOption>>, 'value' | 'onChange'> & {
  value?: string
  onChange: (v: SelectOption | null) => void
}

const ContactSelect = ({value, onChange, ...rest}: Props) => {
  const [selected, setSelected] = React.useState<SelectOption | null>(null)

  // resolve selected contact on value change
  const [data, loading, fetch] = useGetQuery<User>(
    React.useMemo(
      () => ({
        from: 'user_unique_contacts',
        autoRefetch: false,
        match: {id: value},
      }),
      [value]
    )
  )
  React.useEffect(() => {
    value ? fetch() : setSelected(null)
  }, [value]) // eslint-disable-line

  React.useEffect(() => {
    data?.id && data.id !== selected?.value && setSelected({value: data.id, label: data.full_name || ''})
  }, [data]) // eslint-disable-line

  const handleContactChange = React.useCallback(
    (v: SingleValue<SelectOption>) => {
      setSelected(v)
      onChange(v)
    },
    [onChange]
  )

  const asyncSelectLoadOptions = React.useCallback(async (searchValue: string): Promise<SelectOption[]> => {
    try {
      const query = supabase.from('user_unique_contacts').select('id,full_name').order('full_name').limit(10)
      if (searchValue) query.ilike('full_name', `%${searchValue}%`)

      const {data, error} = await query
      if (error) throw error

      return data?.map((u) => ({label: u.full_name || '', value: u.id || ''})) ?? []
    } catch (e) {
      console.log(e)
    }
    return []
  }, [])

  return (
    <AsyncSelect<SelectOption, false>
      placeholder="Select from your contacts..."
      value={selected}
      loadOptions={asyncSelectLoadOptions}
      onChange={handleContactChange}
      isLoading={loading}
      defaultOptions
      isClearable
      {...rest}
    />
  )
}

export default ContactSelect
