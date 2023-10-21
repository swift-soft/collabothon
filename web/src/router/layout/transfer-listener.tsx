import {useEffect, useState} from 'react'

import {Box, Center, Text} from '@chakra-ui/react'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

const TransferListener = () => {
  const user = useAppSelector(selectProfile)
  const [isNotification, setIsNotification] = useState(false)
  const [transfer, setTransfer] = useState({})
  const [additionalData, setAdditionalData] = useState({})

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
            setIsNotification(true)
            setTimeout(() => setIsNotification(false), 8000)
            setTransfer(payload.new)
            console.log(payload)

            const {data, error} = await supabase
              .from('transfer_view')
              .select('sender_name, amount')
              .eq('transfer_id', payload.new.id)

            if (error) {
              console.error('Error fetching sender:', error)
            } else {
              setAdditionalData(data[0] || '')
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
    <Center position="absolute" top={5} w="200px" left="calc(50% - 100px)">
      {isNotification && (
        <Box h="40px" color="white" w="200px" bg="blue.300" zIndex="overlay" rounded="md" p={5}>
          <Text>
            {additionalData?.sender_name &&
              `${additionalData?.sender_name.split(' ')[0]} sent you request for ${
                additionalData?.amount / 100
              } PLN`}
          </Text>
        </Box>
      )}
    </Center>
  )
}

export default TransferListener
