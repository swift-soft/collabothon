import {ChevronDownIcon} from '@chakra-ui/icons'
import {Box, Button, Center, Divider, Flex, HStack, Spinner, Stack, Text, VStack} from '@chakra-ui/react'
import {CiReceipt} from 'react-icons/ci'
import {RiBankFill, RiShareBoxLine} from 'react-icons/ri'
import {VscFilePdf} from 'react-icons/vsc'
import {Link} from 'react-router-dom'

import {formatDate} from '@/utils/string'

import {useTransactionDetails} from './hooks'

const TransactionDetailsPage = () => {
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
          Transaction details
        </Text>
        <Box p={5} border={'1px'} borderColor={'gray.300'} borderRadius={8} w={'80%'} mb={5}>
          <Text fontSize={'x-large'}>{transaction.title?.toUpperCase()}</Text>
          <Text fontSize={'x-large'}>
            {formattedAmount.split('.')[0]},
            <span style={{fontSize: 'large'}}>{formattedAmount.split('.')[1]} PLN</span>
          </Text>
          <Divider my={2} />
          <Flex align={'center'} gap={2}>
            <RiBankFill />
            <Text>cBank account</Text>
          </Flex>
          <Divider my={2} />
          <Flex justify={'space-between'} mb={2}>
            <strong>Transaction Date</strong> {formatDate(transaction.created_at)}
          </Flex>
          <Flex justify={'space-between'}>
            <strong>Accounting Date</strong>{' '}
            {transaction?.accounted_at ? formatDate(transaction?.accounted_at) : '-'}
          </Flex>
        </Box>
        <Flex gap={12}>
          <Stack align={'center'}>
            <Button
              height={'auto'}
              backgroundColor={'inherit'}
              borderRadius={'full'}
              color={'red'}
              fontSize={'4xl'}
              boxShadow="0px 0px 13px rgba(0, 0, 0, 0.3)"
              p={3}
            >
              <VscFilePdf />
            </Button>
            <Text fontSize={'x-small'}>Download PDF</Text>
          </Stack>
          <Stack align={'center'}>
            <Button
              height={'auto'}
              backgroundColor={'inherit'}
              borderRadius={'full'}
              color={'red'}
              fontSize={'4xl'}
              boxShadow="0px 0px 13px rgba(0, 0, 0, 0.3)"
              p={3}
            >
              <RiShareBoxLine />
            </Button>
            <Text fontSize={'x-small'}>Share</Text>
          </Stack>
          {isSender && (
            <Stack align={'center'}>
              <Link to="receipt">
                <Button
                  height={'auto'}
                  backgroundColor={'inherit'}
                  borderRadius={'full'}
                  color={'red'}
                  fontSize={'4xl'}
                  boxShadow="0px 0px 13px rgba(0, 0, 0, 0.3)"
                  p={3}
                >
                  <CiReceipt />
                </Button>
              </Link>
              <Text fontSize={'x-small'}>Receipt Preview</Text>
            </Stack>
          )}
        </Flex>
        <Stack w="full" px={4}>
          <HStack
            fontSize="lg"
            flex="1"
            textAlign="left"
            borderBottom="1px"
            borderColor="gray.200"
            justify="space-between"
          >
            <strong>Details</strong>
            <ChevronDownIcon />
          </HStack>
          <Stack>
            <Stack gap={0}>
              <Text color={'gray.400'}>{isSender ? 'Receiver' : 'Sender'}</Text>
              <Text>
                {isSender
                  ? transaction.destination_account_details.seller?.name.toUpperCase()
                  : transaction.source_account_details.user.full_name?.toUpperCase()}
              </Text>
            </Stack>
            <Stack gap={0}>
              <Text color={'gray.400'}>{isSender ? "Receiver's account" : "Sender's account"}</Text>
              <Text>{isSender ? transaction.destination_account : transaction.source_account}</Text>
            </Stack>
            <Stack gap={0}>
              <Text color={'gray.400'}>{isSender ? 'Sender' : 'Receiver'}</Text>
              <Text>{user?.full_name?.toUpperCase()}</Text>
            </Stack>
          </Stack>
        </Stack>
      </VStack>
    </Center>
  )
}

export default TransactionDetailsPage
