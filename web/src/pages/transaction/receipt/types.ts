import {SettlementType} from '@/api/types'

export type TransferItemUser = {id?: string; name?: string}

export type TransferItem = {
  name: string
  user?: TransferItemUser
  settlement_type?: SettlementType
  amount?: number
}

// map item names to transfer request items
export type TransferItems = Record<string, Omit<TransferItem, 'name'>[]>

export type TransferRequestRecipients = Record<string, Omit<TransferItem, 'user'>[]>
