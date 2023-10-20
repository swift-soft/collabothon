import {Box, Image, Spinner, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {Transaction} from '@/api/models'
import {selectProfile} from '@/auth/state'
import useListQuery from '@/common/hooks/use-list-query'
import {useAppSelector} from '@/store'
import {formatMoney, formatTransactionDate} from '@/utils/string'

const Operations = () => {
  const user = useAppSelector(selectProfile)

  const {data, loading} = useListQuery<Transaction, 'object'>({
    from: 'user_transactions',
    order: 'created_at',
    descending: true,
    returnType: 'object',
    limit: 10,
  })

  const groupedByDay: {[key: string]: Transaction[]} = data.reduce((acc, transaction) => {
    const date = formatTransactionDate(transaction.created_at)
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {})

  return loading ? (
    <Spinner />
  ) : (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" mt={2}>
        Last operations
      </Text>
      {Object.entries(groupedByDay).map(([date, transactions]) => (
        <Box mt={4} key={date}>
          <Text fontSize="lg" fontWeight="normal">
            {date}
          </Text>
          <Box marginTop="1px" marginBottom="20px" borderBottom="2px" borderColor="blackAlpha.500" />
          {transactions.map((transaction, index) => (
            <Box key={index}>
              <Link to={`transaction/${transaction.id}`}>
                <Box mb={3} display="inline-flex" width="100%">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/876/876784.png"
                    alt="aaaa"
                    width="20px"
                    height="20px"
                    marginRight="10px"
                  />
                  <Text>{transaction.title}</Text>
                  <Text marginLeft="auto">{`${
                    user?.account_number === transaction.source_account ? '-' : ''
                  } ${formatMoney(transaction.amount)}`}</Text>
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default Operations
