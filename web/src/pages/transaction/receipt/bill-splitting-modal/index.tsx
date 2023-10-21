import React from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import {FaDollarSign, FaHashtag, FaPercent} from 'react-icons/fa'

import {SettlementType} from '@/api/types'
import FixedTwoNumberInput from '@/common/components/fixed-two-number-input'
import {useAppDispatch, useAppSelector} from '@/store'
import {formatMoney} from '@/utils/string'

import {selectActiveItem, selectTransferItems, setActiveItem, setTransferItems} from '../state'
import {TransferItemNoName} from '../types'
import {getTransferAmount} from '../utils'
import ContactSelect from './contact-select'

const BillSplittingModal = () => {
  const dispatch = useAppDispatch()
  const receiptItem = useAppSelector(selectActiveItem)
  const transferItems = useAppSelector(selectTransferItems)

  const [itemToAdd, setItemToAdd] = React.useState<TransferItemNoName | null>(null)
  React.useEffect(() => {
    setItemToAdd(null)
  }, [receiptItem])

  const transferItem = React.useMemo(
    () => (receiptItem?.name ? transferItems[receiptItem?.name] : null),
    [transferItems, receiptItem]
  )

  const amountInCash = React.useMemo(
    () => (!receiptItem || !itemToAdd ? 0 : getTransferAmount(receiptItem, itemToAdd)),
    [receiptItem, itemToAdd]
  )

  const amountLeft = React.useMemo(
    () =>
      !receiptItem
        ? 0
        : receiptItem.price * receiptItem.amount -
          (transferItem ? transferItem.reduce((sum, c) => sum + getTransferAmount(receiptItem, c), 0) : 0) -
          amountInCash,
    [transferItem, receiptItem, amountInCash]
  )

  const onClose = React.useCallback(() => dispatch(setActiveItem(null)), [dispatch])

  const onSave = React.useCallback(() => {
    if (!receiptItem?.name || !itemToAdd?.user || !itemToAdd.amount) {
      onClose()
      return
    }

    dispatch(
      setTransferItems({
        ...transferItems,
        [receiptItem?.name]: [...(transferItems[receiptItem?.name] || []), itemToAdd],
      })
    )
    onClose()
  }, [receiptItem, transferItems, itemToAdd, onClose, dispatch])

  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={!!receiptItem}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" fontSize="lg" px={4}>
            <Grid templateColumns="repeat(6, 1fr)">
              <GridItem colSpan={3}>{receiptItem?.name}</GridItem>
              <GridItem colSpan={2}>
                {receiptItem?.amount}*{formatMoney(receiptItem?.price)}
              </GridItem>
              <GridItem colSpan={1}>
                {formatMoney((receiptItem?.amount || 1) * (receiptItem?.price || 1))}
              </GridItem>
            </Grid>
          </DrawerHeader>
          <DrawerBody p={0} maxH="100vh" overflow="visible">
            <TransferItemForm item={itemToAdd} onChange={setItemToAdd} amountLeft={amountLeft} />
            <Stack px={4} spacing={0}>
              <HStack justify="space-between">
                <Text>To request: </Text>
                <Text>{formatMoney(amountInCash)} PLN</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>After transfer: </Text>
                <Text>{formatMoney(amountLeft)} PLN</Text>
              </HStack>
            </Stack>
          </DrawerBody>
          <DrawerFooter px={4}>
            <Flex gap={2} w="full">
              <Button onClick={onClose} variant="outline" flex={1} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={onSave} flex={1} colorScheme="red">
                Save
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

type Props = {
  item: TransferItemNoName | null
  amountLeft: number
  onChange: (v: TransferItemNoName | null) => void
}

const tabs: SettlementType[] = ['no_of_items', 'percentage', 'money']

const defaultTabsValues = [1, 10000, 0]

const TransferItemForm = ({item, onChange}: Props) => {
  const receiptItem = useAppSelector(selectActiveItem)

  const tabIndex = React.useMemo(() => tabs.findIndex((t) => t === item?.settlement_type), [item])

  return (
    <Stack spacing={0}>
      <Stack px={4} py={2} spacing={0}>
        <Text>Who owes you?</Text>
        <ContactSelect
          value={item?.user?.id}
          onChange={(v) => onChange(!v ? null : {...item, user: {id: v?.value, name: v?.label}})}
          menuPlacement="top"
        />
      </Stack>
      {!!item?.user && (
        <Tabs
          position="relative"
          variant="unstyled"
          index={tabIndex < 0 ? 2 : tabIndex}
          onChange={(tabIndex) =>
            onChange({...item, settlement_type: tabs[tabIndex], amount: defaultTabsValues[tabIndex]})
          }
          isLazy
        >
          <TabList w="100%">
            <Tab flex={1} px={4} py={2}>
              <Icon as={FaHashtag} boxSize={5} />
            </Tab>
            <Tab flex={1} px={4} py={2}>
              <Icon as={FaPercent} boxSize={5} />
            </Tab>
            <Tab flex={1} px={4} py={2}>
              <Icon as={FaDollarSign} boxSize={5} />
            </Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="red.500" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <Text>Select number of items</Text>
              <NumberInput
                w="100%"
                min={1}
                max={receiptItem?.amount}
                precision={0}
                onChange={(_, v) =>
                  onChange({
                    ...item,
                    settlement_type: 'no_of_items',
                    amount: v > (receiptItem?.amount || 0) ? receiptItem?.amount : v,
                  })
                }
                value={item.amount || ''}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </TabPanel>
            <TabPanel>
              <Text>Select percentage of price</Text>
              <FixedTwoNumberInput
                value={item.amount || 0}
                onChange={(v) => onChange({...item, settlement_type: 'percentage', amount: v})}
                max={10000} // 100%
                rightAddon="%"
              />
            </TabPanel>
            <TabPanel>
              <Text>Select exact sum</Text>
              <FixedTwoNumberInput
                value={item.amount || 0}
                onChange={(v) => onChange({...item, settlement_type: 'money', amount: v})}
                max={(receiptItem?.price || 1) * (receiptItem?.amount || 1)}
                rightAddon="PLN"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Stack>
  )
}

export default BillSplittingModal
