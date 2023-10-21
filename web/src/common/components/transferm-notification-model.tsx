import {ChevronDownIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

const ConfirmAsk = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" textTransform="uppercase" padding="2">
            <Box textTransform="uppercase" color="red" textAlign="center" fontSize="lg" borderRadius="40">
              Request details
            </Box>
            <Heading fontSize="2xl" paddingTop="6">
              Nowacki
            </Heading>
            <Text textDecoration="none" fontSize="sm" paddingTop="2">
              621 151 137
            </Text>
          </ModalHeader>
          <ModalBody minH="40vh" maxH="50vh">
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
          </ModalBody>

          <ModalFooter paddingTop="10">
            <VStack m="auto" spacing={3}>
              <Button w="100%" colorScheme="red" borderRadius="40">
                Confirm transfer
              </Button>
              <HStack spacing={24} m="auto">
                <Button w="100px" variant="ghost" color="red" onClick={onClose}>
                  Refuse
                </Button>
                <Button variant="ghost" color="red" onClick={onClose}>
                  Ask me later
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmAsk
