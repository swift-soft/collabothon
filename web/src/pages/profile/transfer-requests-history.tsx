import React from 'react'

import {Box, Center, Divider, HStack, Heading, Spinner, Stack, Text} from '@chakra-ui/react'
import {useDispatch} from 'react-redux'

import {TransferRequestDetails} from '@/api/models'
import {selectProfile} from '@/auth/state'
import useListQuery from '@/common/hooks/use-list-query'
import {useAppSelector} from '@/store'
import {
  selectTransferRequestConfirmationOpen,
  setConfirmationOpen,
  setTransferRequest,
} from '@/transfer-requests/state'
import {formatMoney} from '@/utils/string'

import {transferStateToColor} from './utils'

const TransferRequestsHistory = () => {
  const dispatch = useDispatch()
  const user = useAppSelector(selectProfile)
  const confirmationOpen = useAppSelector(selectTransferRequestConfirmationOpen)

  const [data, loading, fetch] = useListQuery<TransferRequestDetails>(
    React.useMemo(
      () => ({
        from: 'transfer_request_details',
        match: {recipient_user: user?.id},
      }),
      [user]
    )
  )

  React.useEffect(() => {
    !confirmationOpen && fetch()
  }, [confirmationOpen]) // eslint-disable-line

  const handleItemClick = React.useCallback(
    (t: TransferRequestDetails) => {
      dispatch(setTransferRequest(t))
      dispatch(setConfirmationOpen(true))
    },
    [dispatch]
  )

  return (
    <Stack spacing={4}>
      <Heading size="sm">Transfer requests</Heading>
      {loading ? (
        <Center h={'full'}>
          <Spinner />
        </Center>
      ) : (
        <Stack divider={<Divider />}>
          {data.map((t) => (
            <HStack key={t.id} justify="space-between" onClick={() => handleItemClick(t)}>
              <HStack spacing={4}>
                {t.state && <Box boxSize={3} bg={transferStateToColor[t.state]} rounded="full" />}
                <Stack spacing={0}>
                  <Text fontWeight="semibold" fontSize="lg">
                    {t.title}
                  </Text>
                  <Text>{t.sender.full_name}</Text>
                </Stack>
              </HStack>
              <Text>{formatMoney(t.total)} PLN</Text>
            </HStack>
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export default TransferRequestsHistory
