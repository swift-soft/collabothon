import {Grid, GridItem} from '@chakra-ui/react'

import {ReceiptItem} from '@/api/models'
import {formatMoney} from '@/utils/string'

import {TransferItem} from './types'
import {getTransferAmount, settlementTypeToSymbol} from './utils'

type Props = {
  item: Omit<TransferItem, 'name'>
  receiptItem?: ReceiptItem
  plus?: boolean
}

const TransferListItem = ({item, receiptItem, plus}: Props) => (
  <Grid templateColumns="repeat(6, 1fr)" px={2}>
    <GridItem colSpan={3}>
      {item.user?.name?.split(' ')[0][0]}. {item.user?.name?.split(' ')[1]}
    </GridItem>
    <GridItem colSpan={2}>
      {item.settlement_type === 'no_of_items' ? item.amount : formatMoney(item.amount)}
      {!!item.settlement_type && settlementTypeToSymbol[item.settlement_type]}
    </GridItem>
    {receiptItem && (
      <GridItem colSpan={1} textAlign="end">
        {plus ? '+' : '-'}
        {formatMoney(getTransferAmount(receiptItem, item))}
      </GridItem>
    )}
  </Grid>
)

export default TransferListItem
