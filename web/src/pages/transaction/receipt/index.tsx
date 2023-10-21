import React, {useState} from 'react'

import {Button, Center, Divider, HStack, Spinner, Stack, Text} from '@chakra-ui/react'

import {useAppDispatch, useAppSelector} from '@/store'
import {formatMoney} from '@/utils/string'

import {useTransactionDetails} from '../hooks'
import BillSplittingModal from './bill-splitting-modal'
import ReceiptListItem from './receipt-item'
import SortByHeaders, {Order} from './sort-by'
import {
  fetchReceipt,
  resetReceiptState,
  selectReceipt,
  selectReceiptLoading,
  selectSplitting,
  toggleSplitting,
} from './state'

const ReceiptDetailsPage = () => {
  const {transaction} = useTransactionDetails()

  const dispatch = useAppDispatch()
  const receipt = useAppSelector(selectReceipt)
  const receiptLoading = useAppSelector(selectReceiptLoading)
  const splitting = useAppSelector(selectSplitting)

  const [order, setOrder] = useState<Order>({column: 'total_price', descending: true})

  React.useEffect(() => {
    transaction?.id && dispatch(fetchReceipt(transaction.id))

    return () => {
      dispatch(resetReceiptState())
    }
  }, [transaction]) // eslint-disable-line

  const sortedItems = React.useMemo(
    () =>
      [...(receipt?.items || [])].sort((a, b) => {
        let sort = 0
        switch (order.column) {
          case 'name':
            sort = a.name < b.name ? -1 : 1
            break
          case 'price_per_item':
            sort = a.price - b.price
            break
          case 'total_price':
            sort = a.price * a.amount - b.price * b.amount
        }

        return sort * (order.descending ? -1 : 1)
      }),
    [receipt, order]
  )

  return !transaction || receiptLoading ? (
    <Center h={'full'}>
      <Spinner />
    </Center>
  ) : !receipt ? (
    <Center h="full">
      <Text>No receipt found for this transaction!</Text>
    </Center>
  ) : (
    <>
      <Stack mt={2}>
        <HStack mb={6} justify="space-between" align="flex-start" gap={4}>
          <Stack spacing={0}>
            <Text color="red" fontSize="sm">
              Receipt for transaction
            </Text>
            <Text fontWeight="bold">{transaction.title}</Text>
          </Stack>
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            flexShrink={0}
            onClick={() => dispatch(toggleSplitting())}
          >
            {splitting ? 'Cancel split' : 'Split the bill'}
          </Button>
        </HStack>

        <Stack align="center" textAlign="center" spacing={0} fontSize="xs" mb={6}>
          <Text>{transaction.destination_account_details.seller?.name}</Text>
          <Text>ul. Zamenhofa 133, 61-131 Poznań</Text>
          <Text>Hurtownia Łódź - Rokicińska</Text>
          <Text>ul. Rokicińska 190/214, 92-412 Łódź</Text>
        </Stack>

        <HStack fontSize="sm" justify="space-between">
          <Text>NIP: {transaction.destination_account_details.seller?.nip || '781-10-11-998'}</Text>
          <Text>W074672</Text>
        </HStack>
        <Divider />

        <Stack divider={<Divider />} mb={4}>
          <SortByHeaders order={order} setOrder={setOrder} />
          {sortedItems.map((item) => (
            <ReceiptListItem key={item.name} item={item} />
          ))}
        </Stack>

        <HStack borderBlock="2px" fontSize="lg" py={2} borderColor="#222" justify="space-between">
          <Text fontWeight="bold">TOTAL:</Text>
          <Text>PLN {formatMoney(transaction.amount)}</Text>
        </HStack>

        <HStack fontSize="sm" justify="space-between">
          <Text>Nr Sys:</Text>
          <Text>8229337271355 7401732383720</Text>
        </HStack>
      </Stack>
      <BillSplittingModal />
    </>
  )
}

export default ReceiptDetailsPage
