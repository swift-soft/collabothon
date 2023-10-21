import React, {useEffect, useState} from 'react'

import {Center, Flex, ScaleFade, Text} from '@chakra-ui/react'
import {BiDollar} from 'react-icons/bi'

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
    <Center position="absolute" top={8} w="300px" left="calc(50% - 150px)">
      <ScaleFade in={isOpen}>
        <Flex
          position={'relative'}
          justify={'center'}
          w="300px"
          bg="white"
          zIndex="overlay"
          rounded="xl"
          py={2}
          px={5}
          boxShadow={'dark-lg'}
          transition="opacity 1s"
        >
          {additionalData.sender && (
            <Flex gap={2} fontSize={'5xl'} align={'center'}>
              <BiDollar />
              <Text fontSize="sm" color={'gray.500'}>
                <Text fontSize={'md'} color={'red'} fontWeight={'bold'}>
                  Transfer request.
                </Text>
                <strong>{additionalData.sender.full_name?.split(' ')[0]}</strong> sent you a request for{' '}
                <strong style={{whiteSpace: 'nowrap'}}>{additionalData.total / 100} PLN.</strong>
              </Text>
            </Flex>
          )}
        </Flex>
      </ScaleFade>
    </Center>
  )
}

export default TransferListener
