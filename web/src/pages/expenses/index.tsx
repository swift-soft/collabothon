import { useState } from 'react';



import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';



import { dayDateFormat, monthDateFormat, weekDateFormat, yearDateFormat } from '@/utils/string';


const data = [
  {name: 'Home and Garden', value: 400},
  {name: 'Education', value: 300},
  {name: 'Electronics and Appliances', value: 300},
  {name: 'Hobby', value: 200},
  {name: 'Culture', value: 200},
  {name: 'Automotive', value: 200},
  {name: 'Travel', value: 200},
  {name: 'Gifts', value: 200},
  {name: 'Restaurants', value: 200},
  {name: 'Family', value: 200},
  {name: 'Entertainment', value: 200},
  {name: 'Sports', value: 200},
  {name: 'Beauty', value: 200},
  {name: 'Services', value: 200},
  {name: 'Health', value: 200},
  {name: 'Animals', value: 200},
  {name: 'Food', value: 200},
  {name: 'Other', value: 200},
]

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#C75E00',
  '#8400C5',
  '#0099FF',
  '#99FF00',
  '#FF66B2',
  '#B2FF66',
  '#336699',
  '#FF3366',
  '#66FF33',
  '#993366',
  '#CC6600',
  '#FF99CC',
  '#669933',
  '#FF33CC',
  '#339933',
  '#FFCC33',
]

type DateRange = 'day' | 'week' | 'month' | 'year'

const buttons: DateRange[] = ['day', 'week', 'month', 'year']

const dateFormats: {[key in DateRange]: string} = {
  day: dayDateFormat,
  week: weekDateFormat,
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
      <ResponsiveContainer height={280}>
        <PieChart width={280}>
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