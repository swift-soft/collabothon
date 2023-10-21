import React, {useEffect, useState} from 'react'

import {Center, Flex, ScaleFade, Text} from '@chakra-ui/react'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

const TransferListener = () => {
  const user = useAppSelector(selectProfile)
  const [transfer, setTransfer] = useState({})
  const [additionalData, setAdditionalData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transfer_requests',
          filter: `recipient_user=eq.${user?.id}`,
        },
        async (payload) => {
          try {
            setIsOpen(true)

            setTimeout(() => {
              setIsOpen(false)
            }, 8000)

            setTransfer(payload.new)

            const {data, error} = await supabase
              .from('transfer_request_details')
              .select('sender, total')
              .eq('id', payload.new.id)

            if (error) {
              console.error('Error fetching sender:', error)
            } else {
              console.log(data[0])
              setAdditionalData(data[0] || {})
            }
          } catch (error) {
            console.error('Error in transfer listener:', error)
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [user])

  return (
    <Center position="absolute" top={8} w="270px" left="calc(50% - 135px)">
      <ScaleFade in={isOpen}>
        <Flex
          justify={'center'}
          color="#dddddd"
          w="270px"
          bg="blue.400"
          zIndex="overlay"
          rounded="md"
          py={2}
          px={5}
          boxShadow={'dark-lg'}
          transition="opacity 1s"
        >
          <Text fontSize="sm">
            {additionalData.sender && (
              <>
                <strong>{additionalData.sender.full_name?.split(' ')[0]}</strong> sent you a request for{' '}
                <strong style={{whiteSpace: 'nowrap'}}>{additionalData.total / 100} PLN.</strong>
              </>
            )}
          </Text>
        </Flex>
      </ScaleFade>
    </Center>
  )
}

export default TransferListener
