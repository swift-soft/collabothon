import {Box, Center, Spinner, Text, VStack} from '@chakra-ui/react'

import {useTransactionDetails} from '../hooks'

const ReceiptDetailsPage = () => {
  const {transaction, user, isSender} = useTransactionDetails()

  const formattedAmount = isSender
    ? '- ' + ((transaction?.amount || 0) / 100).toFixed(2)
    : ((transaction?.amount || 0) / 100).toFixed(2)

  return !transaction ? (
    <Center h={'full'}>
      <Spinner />
    </Center>
  ) : (
    <Center>
      <VStack w={'100%'} fontSize={'small'}>
        <Text color={'red'} mt={2}>
          Receipt details
        </Text>
        <Box p={5} border={'1px'} borderColor={'gray.300'} borderRadius={8} w={'80%'} mb={5}>
          <Text fontSize={'x-large'}>{transaction.title?.toUpperCase()}</Text>
          <Text fontSize={'x-large'}>
            {formattedAmount.split('.')[0]},
            <span style={{fontSize: 'large'}}>{formattedAmount.split('.')[1]} PLN</span>
          </Text>
        </Box>
      </VStack>
    </Center>
  )
}

export default ReceiptDetailsPage
