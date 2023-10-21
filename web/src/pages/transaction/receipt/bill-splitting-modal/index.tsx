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
import {TransferItem, TransferItems} from '../types'
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

      console.log(newTransferItems)

      dispatch(setTransferItems(newTransferItems))
    },
    [item, transferItems, transferItem, dispatch]
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
          <DrawerBody p={0} overflow="visible">
            <Stack>
              {transferItem?.map((ti, index) => (
                <TransferItemForm
                  key={ti.user?.id || index}
                  item={ti}
                  index={index}
                  onChange={handleTransferItemChange}
                />
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter px={4}>
            <Flex gap={2} w="full">
              <Button onClick={onCancel} variant="outline" flex={1} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={onClose} flex={1} colorScheme="red">
                Add
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
  onChange: (index: number, v: Omit<TransferItem, 'name'> | null) => void
}

const tabs: SettlementType[] = ['no_of_items', 'percentage', 'money']

const TransferItemForm = ({item, index, onChange}: Props) => {
  const receiptItem = useAppSelector(selectActiveItem)

  const tabIndex = React.useMemo(() => tabs.findIndex((t) => t === item.settlement_type), [item])

  return (
    <>
      <Stack p={4} spacing={0}>
        <Text>Who owes you?</Text>
        <ContactSelect
          value={item.user?.id}
          onChange={(v) => onChange(index, !v ? null : {...item, user: {id: v?.value, name: v?.label}})}
          menuPlacement={index > 1 ? 'bottom' : 'top'}
        />
      </Stack>
      {!!item.user && (
        <Tabs
          position="relative"
          variant="unstyled"
          index={tabIndex < 0 ? 0 : tabIndex}
          onChange={(tabIndex) => onChange(index, {...item, settlement_type: tabs[tabIndex], amount: 0})}
          isLazy
        >
          <TabList w="100%">
            {(receiptItem?.amount || 0) > 1 && (
              <Tab flex={1} p={4}>
                <Icon as={FaHashtag} boxSize={5} />
              </Tab>
            )}
            <Tab flex={1} p={4}>
              <Icon as={FaPercent} boxSize={5} />
            </Tab>
            <Tab flex={1} p={4}>
              <Icon as={FaDollarSign} boxSize={5} />
            </Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="red.500" borderRadius="1px" />
          <TabPanels>
            {(receiptItem?.amount || 0) > 1 && (
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
                  value={item.amount}
                >
                  <NumberInputField borderRightRadius={0} />
                </NumberInput>
              </TabPanel>
            )}
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
      )}
    </>
  )
}

export default BillSplittingModal
