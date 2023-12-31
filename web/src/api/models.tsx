import {Database} from './database.types'

export type RPCResult =
  | {
      error: string
    }
  | {
      success: boolean
    }

export type User = Database['public']['Tables']['users']['Row']
export type UserProfile = Database['public']['Views']['user_profile']['Row']

export type TransactionAccountDetails = {
  user: {
    id: string
    email: string
    full_name: string | null
    phone_number: string | null
  }
  number: string
  seller: {
    id: string
    nip: string | null
    name: string
  } | null
}

export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransactionDetails = Omit<
  Database['public']['Views']['transaction_details']['Row'],
  'destination_account_details' | 'source_account_details'
> & {
  destination_account_details: TransactionAccountDetails
  source_account_details: TransactionAccountDetails
}

export type ReceiptItem = Database['public']['Tables']['receipt_items']['Row']

export type ReceiptJoined = Omit<Database['public']['Views']['receipts_joined']['Row'], 'items'> & {
  items: ReceiptItem[]
}

export type Stat = Omit<Database['public']['Functions']['get_user_stats']['Returns'][0], 'products'> & {
  products: {name: string; price: number; amount: number; date: string}[]
}

export type Stats = Stat[]

export type TransferRequest = Database['public']['Tables']['transfer_requests']['Row']

export type SettlementType = Database['public']['Enums']['transfer_request_item_settlement_type']

export type TransferRequestDetailsItem = {
  name: string
  amount: number
  settlement_type: SettlementType
  amount_money: number
}

export type TransferRequestDetails = Omit<
  Database['public']['Views']['transfer_request_details']['Row'],
  'sender' | 'items'
> & {
  sender: {
    id: string
    email: string
    full_name: string | null
    phone_number: string | null
  }
  items: TransferRequestDetailsItem[]
}

export type TransferRequestState = Database['public']['Enums']['transfer_state']
