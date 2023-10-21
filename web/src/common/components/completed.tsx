import React from 'react'

import {CheckCircleIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

const Completed = () => {
  const {isOpen, onToggle, onClose} = useDisclosure()

  return (
    <>
      <Button onClick={onToggle}>Click Me</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m="auto" bgColor="#00A550" h="100vh">
          <ModalBody m="auto">
            <Box textAlign="center">
              <CheckCircleIcon
                boxSize="20xl"
                bgColor="white"
                color="#00A550"
                borderRadius="50%"
                border="solid 5px"
                borderColor="white"
              ></CheckCircleIcon>
            </Box>
            <Text paddingTop="50px" color="white" fontSize="2xl">
              Payment completed
            </Text>
          </ModalBody>

          <ModalFooter m="auto" w="100%" paddingBottom="8">
            <Button w="100%" bgColor="white" color="#00A550" onClick={onClose} borderRadius="40">
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Completed
