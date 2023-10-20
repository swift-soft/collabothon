import React from 'react'

import {ArrowBackIcon, HamburgerIcon, InfoOutlineIcon} from '@chakra-ui/icons'
import {Box, Flex, HStack, Spacer, Stack, Text} from '@chakra-ui/react'

import {Transaction} from '@/api/models'
import {selectProfile} from '@/auth/state'
import useListQuery from '@/common/hooks/use-list-query'
import {useAppSelector} from '@/store'
import {formatTransactionDate} from '@/utils/string.ts'

const transactions = [
  {
    id: 'hsdaido',
    amount: 1200,
    created_at: new Date(),
    name: 'Kaufland',
  },
  {
    id: 'hsdaido',
    amount: 212300,
    created_at: new Date(),
    name: 'Apart',
  },
  {
    id: 'hsdaido',
    amount: 31052,
    created_at: new Date(),
    name: 'McDonald',
  },
  {
    id: 'hsdaido',
    amount: 4214,
    created_at: new Date(),
    name: 'Dino',
  },
  {
    id: 'hsdaido',
    amount: 12423,
    created_at: new Date(),
    name: 'KFC',
  },
  {
    id: 'hsdaido',
    amount: 53466,
    created_at: new Date(),
    name: 'Vape-shop',
  },
]

const HistoryPage = () => {
  // const user = useAppSelector(selectProfile)

  const {data} = useListQuery<Transaction, 'object'>({
    from: 'transactions',
    returnType: 'object',
  })

  console.log(data)

  return (
    <Box>
      <Flex p="2">
        <Box color="red" textAlign="center" paddingLeft="2">
          <ArrowBackIcon w={5} h={5}></ArrowBackIcon>
          <Text fontSize="xs">Back</Text>
        </Box>
        <Spacer></Spacer>
        <Box color="red">
          <Text fontSize="xl" fontWeight="bold" paddingTop="1">
            Konto <InfoOutlineIcon fontSize="md"></InfoOutlineIcon>
          </Text>
        </Box>
        <Spacer></Spacer>
        <Box color="red" textAlign="center" paddingRight="2">
          <HamburgerIcon w={5} h={5}></HamburgerIcon>
          <Text fontSize="xs">Menu</Text>
        </Box>
      </Flex>

      <Stack bgColor="#ededed" padding="10px 14px">
        <Text fontWeight="bold" fontSize="xl">
          Konto Commerzbank
        </Text>
        <Text float="left">6302,21 PLN</Text>
      </Stack>
      {transactions.map((transaction) => (
        <Box key={transaction.id}>
          <Box borderBottom="1px" borderColor="lightgray" padding="10px 14px">
            <HStack justify="space-between">
              <Stack>
                <HStack color="red" fontWeight="bold">
                  <Text textTransform="uppercase">{formatTransactionDate(transaction.created_at)}</Text>
                </HStack>
                <Text textTransform="uppercase">{transaction.name}</Text>
              </Stack>
              <Text></Text>
              <Text>{((transaction.amount / 100) * -1).toFixed(2)} PLN</Text>
            </HStack>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default HistoryPage
