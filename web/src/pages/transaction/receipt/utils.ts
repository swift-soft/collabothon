import {ReceiptItem, SettlementType} from '@/api/models'

import {TransferItemNoName, TransferItems, TransferRequestRecipients} from './types'

export const settlementTypeToSymbol: Record<SettlementType, string> = {
  money: '',
  no_of_items: ' pcs',
  percentage: '%',
}

export const getTransferAmount = (receiptItem: ReceiptItem, transferItem: TransferItemNoName): number => {
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

export const groupItemsByRecipients = (inputData: TransferItems): TransferRequestRecipients => {
  const outputData: TransferRequestRecipients = {}

  for (const itemName in inputData) {
    const items = inputData[itemName]

    for (const item of items) {
      const userId = item.user?.id
      if (!userId) continue

      const {amount, settlement_type} = item

      if (!outputData[userId]) {
        outputData[userId] = []
      }

      outputData[userId].push({
        name: itemName,
        settlement_type,
        amount: amount ? Math.round(amount) : 0,
      })
    }
  }

  return outputData
}
