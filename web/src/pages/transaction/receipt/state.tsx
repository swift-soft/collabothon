import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {supabase} from '@/api'
import {ReceiptItem, ReceiptJoined} from '@/api/models'
import {RootState} from '@/store'
import {toast} from '@/theme'

import {TransferItems} from './types'

export interface ReceiptState {
  receipt?: ReceiptJoined
  receiptLoading: boolean
  splitting: boolean
  activeItem?: ReceiptItem | null
  transferItems: TransferItems
  confirmRequestOpen: boolean
  transferTitle?: string
}

const initialState: ReceiptState = {
  receiptLoading: true,
  splitting: false,
  transferItems: {},
  confirmRequestOpen: false,
}

export const fetchReceipt = createAsyncThunk('receipt/fetchReceipt', async (transactionID: string) => {
  const {data, error} = await supabase
    .from('receipts_joined')
    .select('*')
    .eq('transaction_id', transactionID)
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error('Failed to retrieve receipt for the transaction')

  return data as ReceiptJoined
})

export const receiptSlice = createSlice({
  initialState,
  name: 'receipt',
  reducers: {
    resetReceiptState: () => {
      return initialState
    },
    resetTransferState: (state) => {
      state.splitting = false
      state.activeItem = null
      state.transferItems = {}
      state.confirmRequestOpen = false
      state.transferTitle = ''
    },
    toggleSplitting: (state) => {
      const v = !state.splitting
      state.splitting = v
      if (!v) {
        state.activeItem = null
        state.transferItems = {}
      }
    },
    setActiveItem: (state, action: PayloadAction<ReceiptItem | null>) => {
      state.activeItem = action.payload
    },
    setTransferItems: (state, action: PayloadAction<TransferItems>) => {
      state.transferItems = action.payload
    },
    setConfirmRequestOpen: (state, action: PayloadAction<boolean>) => {
      state.confirmRequestOpen = action.payload
    },
    setTransferTitle: (state, action: PayloadAction<string>) => {
      state.transferTitle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceipt.pending, (state) => {
        state.receiptLoading = true
      })
      .addCase(fetchReceipt.fulfilled, (state, action) => {
        state.receiptLoading = false
        state.receipt = action.payload ?? undefined
      })
      .addCase(fetchReceipt.rejected, (state, {error}) => {
        state.receiptLoading = false
        state.receipt = undefined

        console.error('Failed to fetch user', error)
        toast({title: 'Logowanie nie powiodło sie', status: 'error'})
      })
  },
})

export const {
  resetReceiptState,
  toggleSplitting,
  setActiveItem,
  setTransferItems,
  setConfirmRequestOpen,
  setTransferTitle,
  resetTransferState,
} = receiptSlice.actions

export const selectReceipt = (state: RootState) => state.receipt.receipt
export const selectReceiptLoading = (state: RootState) => state.receipt.receiptLoading
export const selectSplitting = (state: RootState) => state.receipt.splitting
export const selectActiveItem = (state: RootState) => state.receipt.activeItem
export const selectTransferItems = (state: RootState) => state.receipt.transferItems
export const selectConfirmTransferOpen = (state: RootState) => state.receipt.confirmRequestOpen
export const selectTransferTitle = (state: RootState) => state.receipt.transferTitle

export default receiptSlice.reducer
