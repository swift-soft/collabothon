import {useEffect, useState} from 'react'

import {useParams} from 'react-router-dom'

import {supabase} from '@/api'
import {TransactionDetails} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

export const useTransactionDetails = () => {
  const user = useAppSelector(selectProfile)
  const [isSender, setIsSender] = useState(false)

  const {id} = useParams()
  const [transaction, setTransaction] = useState<TransactionDetails>()

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!id) return

      try {
        const {data, error} = await supabase
          .from('transaction_details')
          .select()
          .eq('id', id)
          .returns<TransactionDetails>()

        if (error) {
          throw new Error(error.message)
        } else {
          setTransaction(data[0])
          setIsSender(data[0].source_account === user?.account_number)
        }
      } catch (err) {
        console.error((err as Error)?.message)
      }
    }

    fetchTransactions()
  }, [id, user])

  return {transaction, user, isSender}
}
