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
        }
        Insert: {
          accounted_at?: string | null
          amount?: number
          created_at?: string
          destination_account?: string | null
          id?: string
          source_account?: string | null
        }
        Update: {
          accounted_at?: string | null
          amount?: number
          created_at?: string
          destination_account?: string | null
          id?: string
          source_account?: string | null
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
          transfer_request_id: string
        }
        Insert: {
          amount?: number | null
          name: string
          transfer_request_id: string
        }
        Update: {
          amount?: number | null
          name?: string
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
          recipient_account: string
          requested_at: string
          sender_account: string
          state: Database['public']['Enums']['transfer_state']
          title: string
        }
        Insert: {
          decision_at?: string | null
          id?: string
          receipt_id: string
          recipient_account: string
          requested_at?: string
          sender_account: string
          state?: Database['public']['Enums']['transfer_state']
          title: string
        }
        Update: {
          decision_at?: string | null
          id?: string
          receipt_id?: string
          recipient_account?: string
          requested_at?: string
          sender_account?: string
          state?: Database['public']['Enums']['transfer_state']
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'transfer_requests_receipt_id_fkey'
            columns: ['receipt_id']
            referencedRelation: 'receipts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'transfer_requests_recipient_account_fkey'
            columns: ['recipient_account']
            referencedRelation: 'accounts'
            referencedColumns: ['number']
          },
          {
            foreignKeyName: 'transfer_requests_recipient_account_fkey'
            columns: ['recipient_account']
            referencedRelation: 'user_profile'
            referencedColumns: ['account_number']
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
      user_profile: {
        Row: {
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
      get_secret: {
        Args: {
          name: string
        }
        Returns: string
      }
    }
    Enums: {
      transfer_state: 'sent' | 'received' | 'accepted' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
