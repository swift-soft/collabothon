import {TransferRequestState} from '@/api/models'

export const transferStateToLabel: Record<TransferRequestState, string> = {
  accepted: 'Accepted',
  received: 'To pay',
  rejected: 'Rejected',
  sent: 'Sent',
}
