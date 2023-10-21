import {ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons'
import {Grid, GridItem} from '@chakra-ui/react'

type ReciptColumn = 'name' | 'price_per_item' | 'total_price'

const columnToLabel: Record<ReciptColumn, {colSpan: number; label: string}> = {
  name: {colSpan: 3, label: 'name'},
  price_per_item: {colSpan: 2, label: 'price'},
  total_price: {colSpan: 1, label: 'total'},
}

export type Order = {
  column: ReciptColumn
  descending: boolean
}

type Props = {
  order: Order
  setOrder: (o: Order) => void
}

const SortByHeaders = ({order, setOrder}: Props) => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" fontSize="sm">
      {Object.entries(columnToLabel).map(([k, v]) => (
        <GridItem
          key={k}
          colSpan={v.colSpan}
          onClick={() =>
            order.column === k
              ? setOrder({...order, descending: !order.descending})
              : setOrder({column: k as ReciptColumn, descending: false})
          }
        >
          {v.label} {order.column === k ? order.descending ? <ChevronUpIcon /> : <ChevronDownIcon /> : null}
        </GridItem>
      ))}
    </Grid>
  )
}

export default SortByHeaders
