import React from 'react'

import {Grid, GridItem, GridProps, Stack} from '@chakra-ui/react'

import {ReceiptItem} from '@/api/models'
import {useAppDispatch, useAppSelector} from '@/store'
import {formatMoney} from '@/utils/string'

import {selectSplitting, selectTransferItems, setActiveItem} from './state'
import {getTransferAmount, settlementTypeToSymbol} from './utils'

type Props = {
  item: ReceiptItem
}

const ReceiptListItem = ({item}: Props) => {
  const dispatch = useAppDispatch()
  const splitting = useAppSelector(selectSplitting)
  const transferItems = useAppSelector(selectTransferItems)

  const transferItem = React.useMemo(
    () => (item?.name ? transferItems[item?.name] : null),
    [transferItems, item]
  )

  const style: GridProps = React.useMemo(
    () =>
      !splitting
        ? {
            py: 1,
          }
        : {
            boxShadow: '3d',
            px: 2,
            py: 4,
            rounded: 'lg',
            _active: {
              boxShadow: '3d-pressed',
            },
          },
    [splitting]
  )

  const handleClick = React.useCallback(() => {
    if (!splitting) return

    dispatch(setActiveItem(item))
  }, [item, splitting, dispatch])

  console.log('transferItem: ', transferItem)

  return (
    <Stack spacing={1}>
      <Grid templateColumns="repeat(6, 1fr)" transition="all 250ms ease" {...style} onClick={handleClick}>
        <GridItem colSpan={3}>{item.name}</GridItem>
        <GridItem colSpan={2}>
          {item.amount}*{formatMoney(item.price)}
        </GridItem>
        <GridItem colSpan={1}>{formatMoney(item.amount * item.price)}</GridItem>
      </Grid>
      {transferItem?.map((ti, i) =>
        !ti || !ti.amount ? null : (
          <Grid key={i} templateColumns="repeat(6, 1fr)" transition="all 250ms ease" px={2}>
            <GridItem colSpan={3}>
              {ti.user?.name?.split(' ')[0][0]}.{ti.user?.name?.split(' ')[1]}
            </GridItem>
            <GridItem colSpan={2}>
              {ti.settlement_type === 'no_of_items' ? ti.amount : formatMoney(ti.amount)}
              {!!ti.settlement_type && settlementTypeToSymbol[ti.settlement_type]}
            </GridItem>
            <GridItem colSpan={1}>-{formatMoney(getTransferAmount(item, ti))}</GridItem>
          </Grid>
        )
      )}
    </Stack>
  )
}

export default ReceiptListItem
