import React from 'react'

import {ChevronDownIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

import {supabase} from '@/api'
import {fetchUser, selectProfile} from '@/auth/state'
import useLoadingState from '@/common/hooks/use-loading-state'
import {useAppDispatch, useAppSelector} from '@/store'
import {formatDateLong, formatMoney} from '@/utils/string'

import {
  resetTransferRequestState,
  selectTransferRequest,
  selectTransferRequestConfirmationOpen,
  setConfirmationOpen,
} from './state'
import {transferStateToLabel} from './utils'

const ConfirmTransferDrawer = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectProfile)
  const open = useAppSelector(selectTransferRequestConfirmationOpen)
  const transferRequest = useAppSelector(selectTransferRequest)

  const handleClose = React.useCallback(() => {
    dispatch(setConfirmationOpen(false))
  }, [dispatch])

  const [reject, rejecting] = useLoadingState(
    React.useCallback(async () => {
      if (!transferRequest?.id) return

      const {error: updateError} = await supabase
        .from('transfer_requests')
        .update({
          state: 'rejected',
          decision_at: new Date().toUTCString(),
        })
        .eq('id', transferRequest.id)
      if (updateError) throw updateError

      dispatch(resetTransferRequestState())
    }, [transferRequest, dispatch]),
    {
      onErrorToast: 'Failed to reject transfer request.',
      onSuccessToast: 'Rejected transfer request',
    }
  )

  const [accept, accepting] = useLoadingState(
    React.useCallback(async () => {
      if (!transferRequest?.id) return

      const {error} = await supabase.rpc('accept_transfer_request', {id: transferRequest.id})
      if (error) throw error

      await dispatch(fetchUser()) // refetch user data
      dispatch(resetTransferRequestState())
    }, [transferRequest, dispatch]),
    {
      onErrorToast: 'Failed to process transaction.',
      onSuccessToast: 'Accepted transfer request',
    }
  )

  return (
    <Drawer placement="bottom" isOpen={open} onClose={handleClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader textAlign="center" textTransform="uppercase" padding="2">
          <Box textTransform="uppercase" color="red" textAlign="center" fontSize="lg" borderRadius="40">
            Request details
          </Box>
          <Heading fontSize="2xl" paddingTop="6">
            {transferRequest?.sender.full_name}
          </Heading>
          <Text textDecoration="none" fontSize="sm" paddingTop="2">
            {transferRequest?.sender.phone_number}
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <Box paddingBottom="4" textAlign="center">
            <Text>Sum</Text>
            <Text color="green.400" fontSize="2xl">
              {formatMoney(transferRequest?.total)} PLN
            </Text>
          </Box>

          {transferRequest?.state && (
            <Box padding="2" paddingBottom="2">
              <Text fontSize="sm">Request Stauts</Text>
              <Text>{transferStateToLabel[transferRequest?.state]}</Text>
            </Box>
          )}

          <Box padding="2" paddingBottom="3">
            <Text fontSize="sm">Requested At</Text>
            <Text>{formatDateLong(transferRequest?.requested_at)}</Text>
          </Box>

          <Box padding="2" paddingBottom="5">
            <Text paddingBottom="2" fontSize="sm">
              Title
            </Text>
            <Text borderBottom="1px" borderColor="gray.200">
              {transferRequest?.title}
            </Text>
          </Box>

          <Box padding="2">
            <Text paddingBottom="2" fontSize="sm">
              Transfer from account
            </Text>
            <Flex justify="space-between" borderBottom="1px" borderColor="gray.200">
              <Text>{user?.account_number}</Text>
              <ChevronDownIcon color="red" />
            </Flex>
          </Box>
        </DrawerBody>

        <DrawerFooter paddingTop="10">
          <VStack m="auto" spacing={3}>
            <Button
              w="100%"
              colorScheme="red"
              borderRadius="40"
              isDisabled={rejecting}
              onClick={accept}
              isLoading={accepting}
            >
              Confirm transfer
            </Button>
            <HStack spacing={24} m="auto">
              <Button
                w="100px"
                variant="ghost"
                color="red"
                onClick={reject}
                isLoading={rejecting}
                isDisabled={accepting}
              >
                Reject
              </Button>
              <Button variant="ghost" color="red" onClick={handleClose} isDisabled={rejecting || accepting}>
                Ask me later
              </Button>
            </HStack>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ConfirmTransferDrawer
