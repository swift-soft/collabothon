import {TransferRequestState} from '@/api/models'

export const transferStateToColor: Record<TransferRequestState, string> = {
  accepted: '#21b707',
  rejected: '#b70707',
  received: '#f5f115',
  sent: '#f5f115',
}
