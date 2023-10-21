import {Box, HStack, Spinner, Stack, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {Transaction} from '@/api/models'
import {selectProfile} from '@/auth/state'
import Completed from '@/common/components/completed'
import ConfirmAsk from '@/common/components/transferm-notification-model'
import useListQuery from '@/common/hooks/use-list-query'
import {useAppSelector} from '@/store'
import {formatMoney, formatTransactionDate} from '@/utils/string.ts'

const HistoryPage = () => {
  const user = useAppSelector(selectProfile)

  const groupedByDay = (data) => {
    return data.reduce((acc, transaction) => {
      const date = formatTransactionDate(transaction.created_at)
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(transaction)
      return acc
    }, {})
  }

  const {data, loading} = useListQuery<Transaction, 'object'>({
    from: 'user_transactions',
    order: 'created_at',
    descending: true,
    returnType: 'object',
    limit: 0,
  })

  const groupedData = groupedByDay(data)

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
        Object.keys(groupedData).map((date) => (
          <Box key={date}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              mt={4}
              color="red"
              borderBottom="1px"
              borderColor="lightgray"
            >
              {date}
            </Text>
            {groupedData[date].map((transaction) => (
              <Link key={transaction.id} to={`/transaction/${transaction.id}`}>
                <Box>
                  <Box padding="10px 14px">
                    <HStack justify="space-between">
                      <Stack>
                        <HStack color="black">
                          <Text>{transaction.title}</Text>
                        </HStack>
                        {/* <Text textTransform="uppercase">{transaction.title}</Text> */}
                      </Stack>
                      <Text>{((transaction.amount / 100) * -1).toFixed(2)} PLN</Text>
                    </HStack>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        ))
      )}
    </Box>
  )
}

export default HistoryPage
