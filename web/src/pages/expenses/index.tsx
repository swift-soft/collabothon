import {useState} from 'react'

import {CalendarIcon} from '@chakra-ui/icons'
import {Box, Button, Flex, List, ListIcon, ListItem, Text} from '@chakra-ui/react'
import {format} from 'date-fns'
import {Cell, Label, Pie, PieChart, ResponsiveContainer} from 'recharts'

import {dateFormat, dayDateFormat, monthDateFormat, yearDateFormat} from '@/utils/string'

const data = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

type DateRange = 'day' | 'week' | 'month' | 'year'

const buttons: DateRange[] = ['day', 'week', 'month', 'year']

const dateFormats: {[key in DateRange]: string} = {
  day: dayDateFormat,
  week: dateFormat,
  month: monthDateFormat,
  year: yearDateFormat,
}

const ExpensesPage = () => {
  const [active, setActive] = useState<DateRange>('day')

  const formatDate = (value: Date | string | null) =>
    value ? format(new Date(value), dateFormats[active]) : ''

  return (
    <Box position="relative" width={'100%'} height={'100%'} p={0}>
      <Flex>
        {buttons.map((b) => (
          <Button
            key={b}
            onClick={() => setActive(b)}
            color={active === b ? 'red' : 'black'}
            borderBottom={active === b ? '2px solid red' : '2px solid transparent'}
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
      <Text
        textAlign="center"
        mt="10px"
        fontSize="22px"
        style={{textDecoration: 'underline'}}
        align="center"
        mb="20px"
      >
        {formatDate(new Date())}
      </Text>
      <ResponsiveContainer>
        <PieChart width={280} height={280}>
          <Pie
            data={data}
            cy={100}
            innerRadius={80}
            outerRadius={105}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label
              value="2500$"
              position="center"
              fill="grey"
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
                fontFamily: 'Roboto',
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <List color="white" fontSize="1.2em" spacing={4} p="20px">
        <ListItem>
          <ListIcon as={CalendarIcon} color="white"></ListIcon>
          <Text>DashBoard</Text>
        </ListItem>
      </List>
    </Box>
  )
}

export default ExpensesPage
