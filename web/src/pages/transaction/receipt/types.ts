import {SettlementType} from '@/api/types'

export type TransferItemUser = {id?: string; name?: string}

export type TransferItem = {
  name: string
  user?: TransferItemUser
  settlement_type?: SettlementType
  amount?: number
}

export type TransferItemNoName = Omit<TransferItem, 'name'>

// map item names to transfer request items
export type TransferItems = Record<string, TransferItemNoName[]>

export type TransferRequestRecipients = Record<string, Omit<TransferItem, 'user'>[]>
