import {Box, Button, Flex} from '@chakra-ui/react'

import {HEADER_HEIGHT, NAVBAR_HEIGHT} from '@/constants'
import {useAppDispatch, useAppSelector} from '@/store'

import {selectSplitting, selectTransferItems, setConfirmRequestOpen} from './state'

const RequestTransferButton = () => {
  const dispatch = useAppDispatch()

  const splitting = useAppSelector(selectSplitting)
  const transferItems = useAppSelector(selectTransferItems)

  return !splitting ? null : (
    <Flex
      position="fixed"
      inset={0}
      top={HEADER_HEIGHT}
      h={`calc(100vh - ${NAVBAR_HEIGHT} - ${HEADER_HEIGHT})`}
      pointerEvents="none"
    >
      <Flex p={4} position="relative" w="100%">
        <Box position="absolute" bottom={4} left={0} right={0} bg="white" mx={4} rounded="lg">
          <Button
            w="full"
            colorScheme="red"
            onClick={() => dispatch(setConfirmRequestOpen(true))}
            pointerEvents="all"
            isDisabled={!transferItems || !Object.keys(transferItems).length}
          >
            Request Transfer
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default RequestTransferButton
