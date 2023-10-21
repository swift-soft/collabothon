import React from 'react'

import {Center, Flex, ScaleFade, Text} from '@chakra-ui/react'
import {BiDollar} from 'react-icons/bi'

import {supabase} from '@/api'
import {TransferRequest, TransferRequestDetails} from '@/api/models'
import {selectProfile} from '@/auth/state'
import {useAppDispatch, useAppSelector} from '@/store'

import {
  selectTransferRequest,
  selectTransferRequestNotificationOpen,
  setConfirmationOpen,
  setNotificationOpen,
  setTransferRequest,
} from './state'

const TransferListener = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectProfile)
  const open = useAppSelector(selectTransferRequestNotificationOpen)
  const transferRequest = useAppSelector(selectTransferRequest)

  React.useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on<TransferRequest>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transfer_requests',
          filter: `recipient_user=eq.${user?.id}`,
        },
        async (payload) => {
          try {
            dispatch(setNotificationOpen(true))

            setTimeout(() => {
              dispatch(setNotificationOpen(false))
            }, 8000)

            const {error: updateError} = await supabase
              .from('transfer_requests')
              .update({state: 'received'})
              .eq('id', payload.new.id)
            if (updateError) throw updateError

            const {data, error} = await supabase
              .from('transfer_request_details')
              .select()
              .eq('id', payload.new.id)
              .returns<TransferRequestDetails>()
            if (error) throw error

            dispatch(setTransferRequest(data[0]))
          } catch (error) {
            console.error('Error in transfer listener:', error)
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [user, dispatch])

  return (
    <Center position="absolute" top={8} w="300px" left="calc(50% - 150px)">
      <ScaleFade in={open}>
        <Flex
          position="relative"
          justify="center"
          w="300px"
          bg="white"
          zIndex="overlay"
          rounded="xl"
          py={2}
          px={5}
          boxShadow="dark-lg"
          transition="opacity 1s"
          onClick={() => {
            dispatch(setNotificationOpen(false))
            dispatch(setConfirmationOpen(true))
          }}
          _hover={{cursor: 'pointer'}}
        >
          {transferRequest && (
            <Flex gap={2} fontSize={'5xl'} align={'center'}>
              <BiDollar />
              <Text fontSize="sm" color={'gray.500'}>
                <Text fontSize={'md'} color={'red'} fontWeight={'bold'}>
                  Transfer request.
                </Text>
                <strong>{transferRequest.sender?.full_name?.split(' ')[0]}</strong> sent you a request for{' '}
                <strong style={{whiteSpace: 'nowrap'}}>{(transferRequest.total || 0) / 100} PLN.</strong>
              </Text>
            </Flex>
          )}
        </Flex>
      </ScaleFade>
    </Center>
  )
}

export default TransferListener
