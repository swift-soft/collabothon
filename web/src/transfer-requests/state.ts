import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TransferRequestDetails} from '@/api/models'
import {RootState} from '@/store'

export interface TransferRequestState {
  transferRequestDetails: TransferRequestDetails | null
  notificationOpen: boolean
  confirmationOpen: boolean
}

const initialState: TransferRequestState = {
  notificationOpen: false,
  confirmationOpen: false,
  transferRequestDetails: null,
}

export const transferRequestSlice = createSlice({
  initialState,
  name: 'transferRequest',
  reducers: {
    resetTransferRequestState: () => {
      return initialState
    },
    setNotificationOpen: (state, action: PayloadAction<boolean>) => {
      state.notificationOpen = action.payload
    },
    setConfirmationOpen: (state, action: PayloadAction<boolean>) => {
      state.confirmationOpen = action.payload
    },
    setTransferRequest: (state, action: PayloadAction<TransferRequestDetails | null>) => {
      // @ts-ignore
      state.transferRequestDetails = action.payload
    },
  },
})

export const {resetTransferRequestState, setNotificationOpen, setTransferRequest, setConfirmationOpen} =
  transferRequestSlice.actions

export const selectTransferRequest = (state: RootState) => state.transferRequest.transferRequestDetails
export const selectTransferRequestNotificationOpen = (state: RootState) =>
  state.transferRequest.notificationOpen
export const selectTransferRequestConfirmationOpen = (state: RootState) =>
  state.transferRequest.confirmationOpen

export default transferRequestSlice.reducer
