import React from 'react'

import {
  Box,
  Button,
  Divider,
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
  NumberInput,
  NumberInputField,
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
import {TransferItem, TransferItemUser, TransferItems} from '../types'
import {getTransferAmount} from '../utils'
import ContactSelect from './contact-select'

const BillSplittingModal = () => {
  const dispatch = useAppDispatch()
  const item = useAppSelector(selectActiveItem)
  const transferItems = useAppSelector(selectTransferItems)

  const [stateBeforeOpen, setStateBeforeOpen] = React.useState<TransferItems>({})
  React.useEffect(() => {
    !!item && setStateBeforeOpen(transferItems)
  }, [item]) // eslint-disable-line

  const onClose = React.useCallback(() => dispatch(setActiveItem(null)), [dispatch])

  const onCancel = React.useCallback(() => {
    dispatch(setTransferItems(stateBeforeOpen))
    onClose()
  }, [stateBeforeOpen, onClose, dispatch])

  const transferItem = React.useMemo(
    () => (item?.name ? transferItems[item?.name] : null),
    [transferItems, item]
  )

  React.useEffect(() => {
    if ((transferItem && transferItem.length) || !item?.name) return

    dispatch(setTransferItems({...transferItems, [item?.name]: [{}]}))
  }, [item, transferItem]) // eslint-disable-line

  const handleTransferItemChange = React.useCallback(
    (index: number, v: Omit<TransferItem, 'name'> | null) => {
      if (!item?.name || !transferItem) return

      const newValue = v
        ? transferItem.map((t, i) => (i === index ? v : t))
        : transferItem.filter((_, i) => i !== index)

      const newTransferItems = {
        ...transferItems,
      }

      if (!newValue.length) {
        delete newTransferItems[item?.name]
      } else {
        newTransferItems[item?.name] = newValue
      }

      dispatch(setTransferItems(newTransferItems))
    },
    [item, transferItems, transferItem, dispatch]
  )

  const handleAddUser = React.useCallback(
    (user: TransferItemUser) => {
      item?.name &&
        dispatch(setTransferItems({...transferItems, [item?.name]: [...transferItems[item?.name], {user}]}))
    },
    [item?.name, transferItems, dispatch]
  )

  const amountLeft = React.useMemo(
    () =>
      !transferItem || !item
        ? 0
        : item.price * item.amount - transferItem.reduce((sum, c) => sum + getTransferAmount(item, c), 0),
    [transferItem, item]
  )

  return (
    <>
      <Drawer placement="bottom" onClose={onCancel} isOpen={!!item}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" fontSize="lg" px={4}>
            <Grid templateColumns="repeat(6, 1fr)">
              <GridItem colSpan={3}>{item?.name}</GridItem>
              <GridItem colSpan={2}>
                {item?.amount}*{formatMoney(item?.price)}
              </GridItem>
              <GridItem colSpan={1}>{formatMoney((item?.amount || 1) * (item?.price || 1))}</GridItem>
            </Grid>
          </DrawerHeader>
          <DrawerBody
            p={0}
            maxH="100vh"
            overflowX={(transferItem?.length || 0) > 1 ? 'hidden' : 'visible'}
            overflowY={(transferItem?.length || 0) > 1 ? 'auto' : 'visible'}
          >
            <Stack divider={<Divider border="2px" />}>
              {transferItem?.map((ti, index) => (
                <TransferItemForm
                  key={ti.user?.id || index}
                  item={ti}
                  index={index}
                  onChange={handleTransferItemChange}
                  amountLeft={amountLeft}
                />
              ))}
              {!!transferItem?.length && !!transferItem.at(-1)?.amount && !!amountLeft && (
                <Box px={4} py={2}>
                  <ContactSelect
                    value={null}
                    placeholder="Add another person"
                    onChange={(v) => v && handleAddUser({id: v.value, name: v.label})}
                    menuPlacement="top"
                  />
                </Box>
              )}
            </Stack>
            <HStack px={4} justify="flex-end">
              <Text>Amount left:</Text>
              <Text>{formatMoney(amountLeft)}</Text>
            </HStack>
          </DrawerBody>
          <DrawerFooter px={4}>
            <Flex gap={2} w="full">
              <Button onClick={onCancel} variant="outline" flex={1} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={onClose} flex={1} colorScheme="red">
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
  item: Omit<TransferItem, 'name'>
  index: number
  amountLeft: number
  onChange: (index: number, v: Omit<TransferItem, 'name'> | null) => void
}

const tabs: SettlementType[] = ['no_of_items', 'percentage', 'money']

const TransferItemForm = ({item, index, onChange}: Props) => {
  const receiptItem = useAppSelector(selectActiveItem)

  const tabIndex = React.useMemo(() => tabs.findIndex((t) => t === item.settlement_type), [item])

  return (
    <Stack spacing={0}>
      <Stack px={4} py={2} spacing={0}>
        <Text>Who owes you?</Text>
        <ContactSelect
          value={item.user?.id}
          onChange={(v) => onChange(index, !v ? null : {...item, user: {id: v?.value, name: v?.label}})}
          menuPlacement={index > 1 ? 'bottom' : 'top'}
        />
      </Stack>
      {!!item.user && (
        <>
          <Tabs
            position="relative"
            variant="unstyled"
            index={tabIndex < 0 ? 0 : tabIndex}
            onChange={(tabIndex) => onChange(index, {...item, settlement_type: tabs[tabIndex], amount: 0})}
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
                  min={0}
                  max={item.amount}
                  precision={0}
                  onChange={(_, v) =>
                    onChange(index, {
                      ...item,
                      settlement_type: 'no_of_items',
                      amount: v > (receiptItem?.amount || 1) ? receiptItem?.amount : v,
                    })
                  }
                  value={item.amount || ''}
                >
                  <NumberInputField />
                </NumberInput>
              </TabPanel>
              <TabPanel>
                <Text>Select percentage of price</Text>
                <FixedTwoNumberInput
                  value={item.amount || 0}
                  onChange={(v) => onChange(index, {...item, settlement_type: 'percentage', amount: v})}
                  max={10000} // 100%
                  rightAddon="%"
                />
              </TabPanel>
              <TabPanel>
                <Text>Select exact sum</Text>
                <FixedTwoNumberInput
                  value={item.amount || 0}
                  onChange={(v) => onChange(index, {...item, settlement_type: 'money', amount: v})}
                  max={(receiptItem?.price || 1) * (receiptItem?.amount || 1)}
                  rightAddon="PLN"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {receiptItem && (
            <Text px={4} textAlign="end">
              -{formatMoney(getTransferAmount(receiptItem, item))}
            </Text>
          )}
        </>
      )}
    </Stack>
  )
}

export default BillSplittingModal
