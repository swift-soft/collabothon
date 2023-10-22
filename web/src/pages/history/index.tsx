import React from 'react'

import {Center, Divider, HStack, Spinner, Stack, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import {Transaction} from '@/api/models'
import {selectProfile} from '@/auth/state'
import useListQuery from '@/common/hooks/use-list-query'
import {useAppSelector} from '@/store'
import {formatMoney, formatTransactionDate} from '@/utils/string.ts'

const HistoryPage = () => {
  const user = useAppSelector(selectProfile)

  const {data, loading, fetch} = useListQuery<Transaction, 'object'>({
    from: 'user_transactions',
    order: 'created_at',
    descending: true,
    returnType: 'object',
    limit: 0,
  })
  React.useEffect(() => {
    fetch()
  }, [user]) // eslint-disable-line

  const groupedByDay = React.useMemo(() => {
    return data.reduce((acc, transaction) => {
      const date = formatTransactionDate(transaction.created_at)
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(transaction)
      return acc
    }, {})
  }, [data])

  return loading ? (
    <Center>
      <Spinner />
    </Center>
  ) : (
    <Stack w="full">
      <Stack bgColor="#ededed" p={4} rounded="lg">
        <Text>Account balance</Text>
        <Text fontWeight="bold" fontSize="xl">
          {formatMoney(user?.account_balance)} PLN
        </Text>
      </Stack>
      {!data.length ? (
        <Text>No transactions found</Text>
      ) : (
        Object.keys(groupedByDay).map((date) => (
          <Stack key={date} spacing={4}>
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
            <Stack divider={<Divider />} ml={2} spacing={4}>
              {groupedByDay[date].map((transaction) => (
                <Link key={transaction.id} to={`/transaction/${transaction.id}`}>
                  <HStack justify="space-between">
                    <Stack>
                      <HStack color="black">
                        <Text>{transaction.title}</Text>
                      </HStack>
                    </Stack>
                    <Text
                      color={transaction.source_account === user?.account_number ? 'red.700' : 'green.700'}
                    >
                      {transaction.source_account === user?.account_number ? '-' : ''}
                      {formatMoney(transaction.amount)} PLN
                    </Text>
                  </HStack>
                </Link>
              ))}
            </Stack>
          </Stack>
        ))
      )}
    </Stack>
  )
}

export default HistoryPage
