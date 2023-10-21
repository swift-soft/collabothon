import React from 'react'

import {Box, Button, Flex, Grid, GridItem, HStack, Stack, Text} from '@chakra-ui/react'
import {Cell, Label, Pie, PieChart, ResponsiveContainer} from 'recharts'

import {formatMoney} from '@/utils/string'

import {useStatsState} from './hooks'
import {DateRange} from './types'
import {foramtTimeRange} from './utils'

const buttons: DateRange[] = ['day', 'week', 'month', 'year']

const ExpensesPage = () => {
  const {statistics, range, activeTab, setActiveTab} = useStatsState()

  const filteredStats = React.useMemo(
    () => statistics.filter((s) => !!s.total).sort((a, b) => b.total - a.total),
    [statistics]
  )

  const total = React.useMemo(() => filteredStats.reduce((sum, s) => sum + s.total, 0), [filteredStats])

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
              data={filteredStats}
              innerRadius={90}
              outerRadius={120}
              paddingAngle={2}
              nameKey="category"
              dataKey="total"
              style={{outline: 'none'}}
            >
              {filteredStats.map((entry) => (
                <Cell key={entry.category} fill={entry.color || '#07a1ee'} style={{outline: 'none'}} />
              ))}
              <Label
                value={formatMoney(total) + '$'}
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
          <Grid gridTemplateColumns="repeat(6, 1fr)" p={4} boxShadow="3d" rounded="xl" columnGap={2}>
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
    </Stack>
  )
}

export default ExpensesPage
