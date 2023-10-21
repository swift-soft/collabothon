import React, {useState} from 'react'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import {Cell, Label, Pie, PieChart, ResponsiveContainer} from 'recharts'

import {Stat} from '@/api/models'
import {formatMoney, formatTransactionDate} from '@/utils/string'

import {useStatsState} from './hooks'
import {DateRange} from './types'
import {foramtTimeRange} from './utils'

const buttons: DateRange[] = ['day', 'week', 'month', 'year']

const ExpensesPage = () => {
  const {statistics, range, activeTab, setActiveTab} = useStatsState()
  const [activeItem, setActiveItem] = useState<Stat | null>(null)

  const filteredStats = React.useMemo(
    () => statistics.filter((s) => !!s.total).sort((a, b) => b.total - a.total),
    [statistics]
  )

  const total = React.useMemo(() => filteredStats.reduce((sum, s) => sum + s.total, 0), [filteredStats])

  const chartData = filteredStats.length > 0 ? filteredStats : [{name: '', total: 1}]

  const groupedByDay = React.useMemo(() => {
    return activeItem?.products.reduce((acc, expense) => {
      const date = formatTransactionDate(expense.date)
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(expense)
      return acc
    }, {})
  }, [activeItem?.products])

  return (
    <Stack>
      <Flex>
        {buttons.map((b) => (
          <Button
            key={b}
            onClick={() => setActiveTab(b)}
            color={activeTab === b ? 'red' : 'black'}
            borderBottom={activeTab === b ? '2px solid red' : '2px solid transparent'}
            bg="transparent"
            boxShadow="none"
            _hover={{bg: 'white'}}
            _active={{bg: 'white', boxShadow: 'none'}}
            flex="1"
            rounded="none"
          >
            {b}
          </Button>
        ))}
      </Flex>
      <Text textAlign="center" fontSize="22px" align="center" my={2}>
        {!!range && foramtTimeRange(range, activeTab)}
      </Text>
      <Box mb={4}>
        <ResponsiveContainer height={240} style={{outline: 'none'}}>
          <PieChart width={240} style={{outline: 'none'}}>
            <Pie
              data={chartData}
              innerRadius={90}
              outerRadius={120}
              paddingAngle={2}
              nameKey="category"
              dataKey="total"
              style={{outline: 'none'}}
            >
              {chartData.map((entry) => (
                <Cell key={entry.category} fill={entry.color || '#07a1ee'} style={{outline: 'none'}} />
              ))}
              <Label
                value={chartData.length === 1 ? '0 $' : formatMoney(total) + '$'}
                position="center"
                fill="grey"
                style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  outline: 'none',
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Stack>
        {filteredStats.map((s) => (
          <Grid
            gridTemplateColumns="repeat(6, 1fr)"
            p={4}
            boxShadow="3d"
            rounded="xl"
            columnGap={2}
            _active={{boxShadow: '3d-pressed'}}
            onClick={() => setActiveItem(s)}
          >
            <GridItem colSpan={3}>
              <HStack>
                <Box boxSize={4} rounded="full" bg={s.color} />
                <Text>{s.category}</Text>
              </HStack>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex align="center" h="100%" w="100%" justify="end">
                <Text>{((s.total / total) * 100).toFixed(0)}%</Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <Flex align="center" h="100%" w="100%" justify="end">
                <Text>{formatMoney(s.total)}</Text>
              </Flex>
            </GridItem>
          </Grid>
        ))}
      </Stack>

      {activeItem && (
        <Drawer isOpen={!!activeItem} onClose={() => setActiveItem(null)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize={'3xl'} shadow={'2xl'}>
              {activeItem?.category}
              <Text fontSize={'xl'} color={'red.500'}>
                {formatMoney(activeItem?.total)} zł
              </Text>
            </DrawerHeader>
            <DrawerBody>
              {Object.keys(groupedByDay || {}).map((date) => (
                <Box key={date} pb={3}>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    mt={4}
                    color="red"
                    borderBottom="1px"
                    pb={2}
                    borderColor="lightgray"
                  >
                    {date}
                  </Text>
                  {groupedByDay
                    ? groupedByDay[date].map((expense, index) => (
                        <List key={index}>
                          <ListItem py={3}>
                            <Flex justify="space-between">
                              <Text>{expense.name}</Text>
                              <Text>
                                {expense.amount} x {formatMoney(expense.price)} zł
                                {/* it looks much better with zł*/}
                              </Text>
                            </Flex>
                          </ListItem>
                        </List>
                      ))
                    : null}
                </Box>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Stack>
  )
}

export default ExpensesPage
