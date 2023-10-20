import React from 'react'

import {TransactionDetails} from '@/api/models'
import useGetQuery from '@/common/hooks/use-get-query'

const TestsPage = () => {
  const [data] = useGetQuery<TransactionDetails>({
    from: 'transaction_details',
    match: React.useMemo(() => ({id: '0242d2ca-22e5-426b-8744-aa159e85ed6e'}), []),
  })

  console.log(data)

  return <div>TestsPage</div>
}

export default TestsPage
