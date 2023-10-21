import React from 'react'

import {CloseIcon} from '@chakra-ui/icons'
import {Flex, Grid, GridItem, HStack, IconButton, Text} from '@chakra-ui/react'
import {useDispatch} from 'react-redux'

import {ReceiptItem} from '@/api/models'
import {useAppSelector} from '@/store'
import {formatMoney} from '@/utils/string'

import {selectTransferItems, setTransferItems} from './state'
import {TransferItem} from './types'
import {getTransferAmount, settlementTypeToSymbol} from './utils'

type Props = {
  item: Omit<TransferItem, 'name'>
  receiptItem?: ReceiptItem
  plus?: boolean
}

const TransferListItem = ({item, receiptItem, plus}: Props) => {
  const dispatch = useDispatch()
  const transferItems = useAppSelector(selectTransferItems)

  const handleDelete = React.useCallback(() => {
    if (!receiptItem) return

    const newValue = transferItems[receiptItem.name]?.filter((i) => i.user !== item.user)

    const newTransferItems = {
      ...transferItems,
    }

    if (!newValue?.length) {
      delete newTransferItems[receiptItem.name]
    } else {
      newTransferItems[receiptItem.name] = newValue
    }

    dispatch(setTransferItems(newTransferItems))
  }, [item, receiptItem, transferItems, dispatch])

  return (
    <Grid templateColumns="repeat(6, 1fr)" px={2} py={1}>
      <GridItem colSpan={3}>
        <HStack align="center">
          <IconButton
            aria-label="remove"
            icon={<CloseIcon />}
            variant="outline"
            colorScheme="red"
            rounded="full"
            size="sm"
            onClick={handleDelete}
          />
          <Text>
            {item.user?.name?.split(' ')[0][0]}. {item.user?.name?.split(' ')[1]}
          </Text>
        </HStack>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex align="center" h="full">
          {item.settlement_type === 'no_of_items' ? item.amount : formatMoney(item.amount)}
          {!!item.settlement_type && settlementTypeToSymbol[item.settlement_type]}
        </Flex>
      </GridItem>
      {receiptItem && (
        <GridItem colSpan={1} textAlign="end">
          <Flex align="center" h="full">
            {plus ? '+' : '-'}
            {formatMoney(getTransferAmount(receiptItem, item))}
          </Flex>
        </GridItem>
      )}
    </Grid>
  )
}

export default TransferListItem
