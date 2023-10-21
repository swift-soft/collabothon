import {Box, HStack, Spinner, Stack, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {Transaction} from '@/api/models'
import {selectProfile} from '@/auth/state'
import useListQuery from '@/common/hooks/use-list-query'
import {useAppSelector} from '@/store'
import {formatMoney, formatTransactionDate} from '@/utils/string.ts'

const HistoryPage = () => {
  const user = useAppSelector(selectProfile)

  const {data, loading} = useListQuery<Transaction, 'object'>({
    from: 'user_transactions',
    order: 'created_at',
    descending: true,
    returnType: 'object',
    limit: 0,
  })

  return loading ? (
    <Spinner />
  ) : (
    <Box>
      <Stack bgColor="#ededed" padding="10px 14px">
        <Text>Account balance</Text>
        <Text fontWeight="bold" fontSize="xl">
          {formatMoney(user?.account_balance)}
        </Text>
      </Stack>

      {!data.length ? (
        <Text>No transactions found</Text>
      ) : (
        data.map((transaction) => (
          <Link key={transaction.id} to={`/transaction/${transaction.id}`}>
            <Box>
              <Box borderBottom="1px" borderColor="lightgray" padding="10px 14px">
                <HStack justify="space-between">
                  <Stack>
                    <HStack color="red" fontWeight="bold">
                      <Text textTransform="uppercase">{formatTransactionDate(transaction.created_at)}</Text>
                    </HStack>
                    <Text textTransform="uppercase">{transaction.title}</Text>
                  </Stack>
                  <Text></Text>
                  <Text>{((transaction.amount / 100) * -1).toFixed(2)} PLN</Text>
                </HStack>
              </Box>
            </Box>
          </Link>
        ))
      )}
    </Box>
  )
}

export default HistoryPage
