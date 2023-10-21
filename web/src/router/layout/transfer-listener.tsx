import React, {useEffect, useState} from 'react'

import {CheckCircleIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  ScaleFade,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import {BiDollar} from 'react-icons/bi'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

const TransferListener = () => {
  const user = useAppSelector(selectProfile)
  const [transfer, setTransfer] = useState({})
  const [additionalData, setAdditionalData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false) // Separate state variable

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

  const handleClose = () => {
    setIsOpenConfirmation(false)
  }

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
          onClick={() => setIsOpenConfirmation(true)} // Set isOpenConfirmation to true
          _hover={{cursor: 'pointer'}}
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

      <Drawer placement="bottom" isOpen={isOpenConfirmation} onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textAlign="center" textTransform="uppercase" padding="2">
            <Box textTransform="uppercase" color="red" textAlign="center" fontSize="lg" borderRadius="40">
              Request details
            </Box>
            <Heading fontSize="2xl" paddingTop="6">
              Nowacki
            </Heading>
            <Text textDecoration="none" fontSize="sm" paddingTop="2">
              621 151 137
            </Text>
          </DrawerHeader>
          <DrawerBody minH="40vh" maxH="50vh">
            <Box paddingBottom="4" textAlign="center">
              <Text>Sum</Text>
              <Text color="green.400" fontSize="2xl">
                10,00 PLN
              </Text>
            </Box>

            <Box padding="2" paddingBottom="2">
              <Text fontSize="sm">Request Stauts</Text>
              <Text>For payment</Text>
            </Box>

            <Box padding="2" paddingBottom="3">
              <Text fontSize="sm">Expiration Date</Text>
              <Text>29 January 2020, 13:30</Text>
            </Box>

            <Box padding="2" paddingBottom="5">
              <Text paddingBottom="2" fontSize="sm">
                Title
              </Text>
              <Text borderBottom="1px" borderColor="gray.200">
                Grocery Shopping
              </Text>
            </Box>

            <Box padding="2">
              <Text paddingBottom="2" fontSize="sm">
                Transfer from account
              </Text>
              <Flex justify="flex-end" borderBottom="1px" borderColor="gray.200">
                <ChevronDownIcon color="red"></ChevronDownIcon>
              </Flex>
            </Box>
          </DrawerBody>

          <DrawerFooter paddingTop="10">
            <VStack m="auto" spacing={3}>
              <Button w="100%" colorScheme="red" borderRadius="40">
                Confirm transfer
              </Button>
              <HStack spacing={24} m="auto">
                <Button w="100px" variant="ghost" color="red" onClick={handleClose}>
                  Refuse
                </Button>
                <Button variant="ghost" color="red" onClick={handleClose}>
                  Ask me later
                </Button>
              </HStack>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Center>
  )
}

export default TransferListener
