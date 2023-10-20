import {Box, Image, Link, Text} from '@chakra-ui/react'

interface Operation {
  date: string
  description: string
  amount: string
}

const operations: Operation[] = [
  {
    date: '27 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '27 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '27 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '27 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '27 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '26 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '26 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  {
    date: '28 February',
    description: 'Transfer for your goals',
    amount: '-4,01 PLN',
  },
  // Add more operations as needed
]

const Operations = () => {
  const groupedOperations: {[key: string]: Operation[]} = operations.reduce((acc, operation) => {
    const date = operation.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(operation)
    return acc
  }, {})

  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" mt={2}>
        Previous operations:
      </Text>
      {Object.entries(groupedOperations).map(([date, operationsForDate]) => (
        <Box mt={4} key={date}>
          <Text fontSize="lg" fontWeight="normal">
            {date}
          </Text>
          <Box marginTop="1px" marginBottom="20px" borderBottom="2px" borderColor="blackAlpha.500" />
          {operationsForDate.map((operation, index) => (
            <Box key={index}>
              <Link>
                <Box mb={3} display="inline-flex" width="100%">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/876/876784.png"
                    alt="aaaa"
                    width="20px"
                    height="20px"
                    marginRight="10px"
                  />
                  <Text>{operation.description}</Text>
                  <Text marginLeft="auto">{operation.amount}</Text>
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default Operations
