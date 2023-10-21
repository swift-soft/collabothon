import {ReceiptItem} from '@/api/models'
import {SettlementType} from '@/api/types'

import {TransferItem} from './types'

export const settlementTypeToSymbol: Record<SettlementType, string> = {
  money: '$',
  no_of_items: 'szt.',
  percentage: '%',
}

export const getTransferAmount = (
  receiptItem: ReceiptItem,
  transferItem: Omit<TransferItem, 'name'>
): number => {
  if (!transferItem.settlement_type) return 0

  switch (transferItem.settlement_type) {
    case 'money':
      return transferItem.amount || 0
    case 'no_of_items':
      return (transferItem.amount || 0) * receiptItem.price
    case 'percentage':
      return receiptItem.amount * receiptItem.price * ((transferItem.amount || 0) / 10000)
  }

  return 0
}
