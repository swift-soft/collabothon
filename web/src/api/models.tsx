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
