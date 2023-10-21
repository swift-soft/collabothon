import {SettlementType} from '@/api/types'

export type TransferItem = {
  name: string
  user?: {id?: string; name?: string}
  settlement_type?: SettlementType
  amount?: number
}

// map item names to transfer request items
export type TransferItems = Record<string, Omit<TransferItem, 'name'>[]>
