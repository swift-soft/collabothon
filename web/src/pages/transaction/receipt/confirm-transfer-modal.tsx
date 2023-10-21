import React from 'react'

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import useLoadingState from '@/common/hooks/use-loading-state'
import {useAppDispatch, useAppSelector} from '@/store'
import {formatMoney} from '@/utils/string'

import {
  selectConfirmTransferOpen,
  selectReceipt,
  selectTransferItems,
  selectTransferTitle,
  setConfirmRequestOpen,
  setTransferTitle,
} from './state'
import TransferListItem from './transfer-item'
import {getTransferAmount, groupItemsByRecipients} from './utils'

const ConfirmTransferModal = () => {
  const dispatch = useAppDispatch()
  const confirmRequestOpen = useAppSelector(selectConfirmTransferOpen)
  const receipt = useAppSelector(selectReceipt)
  const transferItems = useAppSelector(selectTransferItems)
  const user = useAppSelector(selectProfile)
  const title = useAppSelector(selectTransferTitle)

  const handleClose = React.useCallback(() => dispatch(setConfirmRequestOpen(false)), [dispatch])

  const [onSubmit, loading] = useLoadingState(
    React.useCallback(async () => {
      if (!receipt?.id || !user?.account_number || !title) return

      console.log('transferItems: ', transferItems)
      console.log('groupItemsByRecipients: ', groupItemsByRecipients(transferItems))

      const {error} = await supabase.rpc('request_transfer', {
        receipt_id: receipt?.id,
        title,
        sender: user?.account_number,
        transfer_items: groupItemsByRecipients(transferItems),
      })
      if (error) throw error
    }, [transferItems, receipt, user, title]),
    {
      onErrorToast: 'Failed to send transfer request',
      onSuccessToast: 'Successfully sent transfer request!',
    }
  )

  const total = React.useMemo(
    () =>
      transferItems
        ? Object.entries(transferItems).reduce((sum, [k, v]) => {
            const receiptItem = receipt?.items.find((i) => i.name === k)
            if (!receiptItem) return sum

            return sum + v.reduce((sumInner, item) => sumInner + getTransferAmount(receiptItem, item), 0)
          }, 0)
        : 0,
    [transferItems, receipt]
  )

  return (
    <Modal onClose={handleClose} isOpen={confirmRequestOpen} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm transfer request</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="60vh">
          <Stack>
            <FormControl mb={4}>
              <FormLabel>Transfer title</FormLabel>
              <Input
                placeholder="Transfer title"
                value={title || ''}
                onChange={(e) => dispatch(setTransferTitle(e.target.value))}
              />
            </FormControl>
            <Stack divider={<Divider />}>
              {Object.entries(transferItems).map(([name, items]) => (
                <Stack key={name}>
                  <Text fontWeight="bold">{name}</Text>
                  {items.map((item, index) => (
                    <TransferListItem
                      key={index}
                      item={item}
                      receiptItem={receipt?.items.find((i) => i.name === name)}
                      plus
                    />
                  ))}
                </Stack>
              ))}
            </Stack>
            <Box h="2px" w="100%" bg="#222" />
            <Flex justify="space-between" fontSize="xl" fontWeight="bold">
              <Text>TOTAL:</Text>
              <Text>+ {formatMoney(total)} PLN</Text>
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Flex gap={2} w="full">
            <Button isDisabled={loading} onClick={handleClose} variant="outline" colorScheme="red" flex={1}>
              Edit
            </Button>
            <Button isLoading={loading} onClick={onSubmit} colorScheme="red" flex={1} isDisabled={!title}>
              Confirm
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmTransferModal
