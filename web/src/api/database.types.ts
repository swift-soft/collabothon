export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          number: string
          user_id: string
        }
        Insert: {
          number: string
          user_id: string
        }
        Update: {
          number?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'accounts_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'user_unique_contacts'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      receipt_items: {
        Row: {
          amount: number
          category: string | null
          name: string
          price: number
          receipt_id: string
        }
        Insert: {
          amount: number
          category?: string | null
          name: string
          price: number
          receipt_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          name?: string
          price?: number
          receipt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'receipt_items_category_fkey'
            columns: ['category']
            referencedRelation: 'categories'
            referencedColumns: ['name']
          },
          {
            foreignKeyName: 'receipt_items_receipt_id_fkey'
            columns: ['receipt_id']
            referencedRelation: 'receipts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipt_items_receipt_id_fkey'
            columns: ['receipt_id']
            referencedRelation: 'receipts_joined'
            referencedColumns: ['id']
          },
        ]
      }
      receipts: {
        Row: {
          id: string
          seller_id: string
          transaction_id: string
        }
        Insert: {
          id?: string
          seller_id: string
          transaction_id: string
        }
        Update: {
          id?: string
          seller_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'receipts_seller_id_fkey'
            columns: ['seller_id']
            referencedRelation: 'sellers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipts_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'transactions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipts_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'transaction_details'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipts_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'user_transactions'
            referencedColumns: ['id']
          },
        ]
      }
      secrets: {
        Row: {
          name: string
          value: string
        }
        Insert: {
          name: string
          value: string
        }
        Update: {
          name?: string
          value?: string
        }
        Relationships: []
      }
      sellers: {
        Row: {
          account_number: string
          id: string
          name: string
          nip: string | null
        }
        Insert: {
          account_number: string
          id?: string
          name: string
          nip?: string | null
        }
        Update: {
          account_number?: string
          id?: string
          name?: string
          nip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sellers_account_number_fkey'
            columns: ['account_number']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'sellers_account_number_fkey'
            columns: ['account_number']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
        ]
      }
      transactions: {
        Row: {
          accounted_at: string | null
          amount: number
          created_at: string
          destination_account: string | null
          id: string
          source_account: string | null
          title: string
        }
        Insert: {
          accounted_at?: string | null
          amount?: number
          created_at?: string
          destination_account?: string | null
          id?: string
          source_account?: string | null
          title: string
        }
        Update: {
          accounted_at?: string | null
          amount?: number
          created_at?: string
          destination_account?: string | null
          id?: string
          source_account?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_destination_account_fkey'
            columns: ['destination_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transactions_destination_account_fkey'
            columns: ['destination_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
          {
            foreignKeyName: 'transactions_source_account_fkey'
            columns: ['source_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transactions_source_account_fkey'
            columns: ['source_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
        ]
      }
      transfer_request_receipt_items: {
        Row: {
          amount: number | null
          name: string
          settlement_type: Database['public']['Enums']['transfer_request_item_settlement_type']
          transfer_request_id: string
        }
        Insert: {
          amount?: number | null
          name: string
          settlement_type: Database['public']['Enums']['transfer_request_item_settlement_type']
          transfer_request_id: string
        }
        Update: {
          amount?: number | null
          name?: string
          settlement_type?: Database['public']['Enums']['transfer_request_item_settlement_type']
          transfer_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'transfer_request_receipt_items_transfer_request_id_fkey'
            columns: ['transfer_request_id']
            referencedRelation: 'transfer_requests'
            referencedColumns: ['id']
          },
        ]
      }
      transfer_requests: {
        Row: {
          decision_at: string | null
          id: string
          receipt_id: string
          recipient_user: string
          requested_at: string
          sender_account: string
          state: Database['public']['Enums']['transfer_state']
          title: string
          transaction_id: string | null
        }
        Insert: {
          decision_at?: string | null
          id?: string
          receipt_id: string
          recipient_user: string
          requested_at?: string
          sender_account: string
          state?: Database['public']['Enums']['transfer_state']
          title: string
          transaction_id?: string | null
        }
        Update: {
          decision_at?: string | null
          id?: string
          receipt_id?: string
          recipient_user?: string
          requested_at?: string
          sender_account?: string
          state?: Database['public']['Enums']['transfer_state']
          title?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transfer_requests_receipt_id_fkey'
            columns: ['receipt_id']
            referencedRelation: 'receipts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_receipt_id_fkey'
            columns: ['receipt_id']
            referencedRelation: 'receipts_joined'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_recipient_user_fkey'
            columns: ['recipient_user']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_recipient_user_fkey'
            columns: ['recipient_user']
            referencedRelation: 'user_profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_recipient_user_fkey'
            columns: ['recipient_user']
            referencedRelation: 'user_unique_contacts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_sender_account_fkey'
            columns: ['sender_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transfer_requests_sender_account_fkey'
            columns: ['sender_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
          {
            foreignKeyName: 'transfer_requests_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'transactions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'transaction_details'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'user_transactions'
            referencedColumns: ['id']
          },
        ]
      }
      user_contacts: {
        Row: {
          user_one: string
          user_two: string
        }
        Insert: {
          user_one: string
          user_two: string
        }
        Update: {
          user_one?: string
          user_two?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_contacts_user_one_fkey'
            columns: ['user_one']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_contacts_user_one_fkey'
            columns: ['user_one']
            referencedRelation: 'user_profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_contacts_user_one_fkey'
            columns: ['user_one']
            referencedRelation: 'user_unique_contacts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_contacts_user_two_fkey'
            columns: ['user_two']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_contacts_user_two_fkey'
            columns: ['user_two']
            referencedRelation: 'user_profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_contacts_user_two_fkey'
            columns: ['user_two']
            referencedRelation: 'user_unique_contacts'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          email: string
          full_name: string | null
          id: string
          phone_number: string | null
        }
        Insert: {
          email: string
          full_name?: string | null
          id: string
          phone_number?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          id?: string
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      receipts_joined: {
        Row: {
          id: string | null
          items: Json | null
          seller_id: string | null
          transaction_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'receipts_seller_id_fkey'
            columns: ['seller_id']
            referencedRelation: 'sellers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipts_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'transactions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipts_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'transaction_details'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'receipts_transaction_id_fkey'
            columns: ['transaction_id']
            referencedRelation: 'user_transactions'
            referencedColumns: ['id']
          },
        ]
      }
      transaction_details: {
        Row: {
          accounted_at: string | null
          amount: number | null
          created_at: string | null
          destination_account: string | null
          destination_account_details: Json | null
          id: string | null
          source_account: string | null
          source_account_details: Json | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_destination_account_fkey'
            columns: ['destination_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transactions_destination_account_fkey'
            columns: ['destination_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
          {
            foreignKeyName: 'transactions_source_account_fkey'
            columns: ['source_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transactions_source_account_fkey'
            columns: ['source_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
        ]
      }
      user_profile: {
        Row: {
          account_balance: number | null
          account_number: string | null
          email: string | null
          full_name: string | null
          id: string | null
          phone_number: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_transactions: {
        Row: {
          accounted_at: string | null
          amount: number | null
          created_at: string | null
          destination_account: string | null
          id: string | null
          source_account: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_destination_account_fkey'
            columns: ['destination_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transactions_destination_account_fkey'
            columns: ['destination_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
          {
            foreignKeyName: 'transactions_source_account_fkey'
            columns: ['source_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transactions_source_account_fkey'
            columns: ['source_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
          },
        ]
      }
      user_unique_contacts: {
        Row: {
          email: string | null
          full_name: string | null
          id: string | null
          phone_number: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Functions: {
      citext:
        | {
            Args: {
              '': string
            }
            Returns: string
          }
        | {
            Args: {
              '': boolean
            }
            Returns: string
          }
        | {
            Args: {
              '': unknown
            }
            Returns: string
          }
      citext_hash: {
        Args: {
          '': string
        }
        Returns: number
      }
      citextin: {
        Args: {
          '': unknown
        }
        Returns: string
      }
      citextout: {
        Args: {
          '': string
        }
        Returns: unknown
      }
      citextrecv: {
        Args: {
          '': unknown
        }
        Returns: string
      }
      citextsend: {
        Args: {
          '': string
        }
        Returns: string
      }
      get_account_balance: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_random_category: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_random_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_secret: {
        Args: {
          name: string
        }
        Returns: string
      }
      get_user_stats: {
        Args: {
          from: string
          to: string
        }
        Returns: {
          category: string
          total: number
          products: Json[]
        }[]
      }
      request_transfer: {
        Args: {
          title: string
          receipt_id: string
          transfer_items?: Json
          sender?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      transfer_request_item_settlement_type: 'money' | 'percentage' | 'no_of_items'
      transfer_state: 'sent' | 'received' | 'accepted' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
