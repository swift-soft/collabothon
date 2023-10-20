import {useEffect, useState} from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import {CiReceipt} from 'react-icons/ci'
import {RiBankFill, RiShareBoxLine} from 'react-icons/ri'
import {VscFilePdf} from 'react-icons/vsc'
import {useParams} from 'react-router-dom'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

interface UserDetails {
  id: string
  email: string
  full_name: string
  phone_number: string | null
}

interface SellerDetails {
  id: string
  nip: string | null
  name: string
}

interface DestinationAccountDetails {
  user: UserDetails
  number: string
  seller: SellerDetails | null
}

interface SourceAccountDetails {
  user: UserDetails
  number: string
  seller: SellerDetails | null
}

interface Transaction {
  id: string
  created_at: string
  accounted_at: string | null
  title: string
  amount: number
  source_account: string
  destination_account: string
  destination_account_details: DestinationAccountDetails
  source_account_details: SourceAccountDetails
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const TransactionDetailsPage = () => {
  const user = useAppSelector(selectProfile)
  const [isSender, setIsSender] = useState(false)

  const {id} = useParams()
  const [transaction, setTransaction] = useState<Transaction>({
    id: '',
    created_at: '',
    accounted_at: null,
    title: '',
    amount: 0,
    source_account: '',
    destination_account: '',
    destination_account_details: {
      user: {
        id: '',
        email: '',
        full_name: '',
        phone_number: null,
      },
      number: '',
      seller: {
        id: '',
        nip: null,
        name: '',
      },
    },
    source_account_details: {
      user: {
        id: '',
        email: '',
        full_name: '',
        phone_number: null,
      },
      number: '',
      seller: null,
    },
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!id) return

      try {
        const {data, error} = await supabase.from('transaction_details').select().eq('id', id)

        if (error) {
          throw new Error(error.message)
        } else {
          setTransaction(data[0])
          setIsSender(data[0].source_account === user.account_number)
          console.log(data[0])
        }
      } catch (err) {
        console.error((err as Error)?.message)
      }
    }

    fetchTransactions()
  }, [id, user])

  const formattedAmount = isSender
    ? '- ' + (transaction.amount / 100).toFixed(2)
    : (transaction.amount / 100).toFixed(2)

  return (
    <Center>
      <VStack w={'100%'} fontSize={'small'}>
        <Text color={'red'} mt={2}>
          Transaction details
        </Text>
        <Box p={5} border={'1px'} borderColor={'gray.300'} borderRadius={8} w={'80%'} mb={5}>
          <Text fontSize={'x-large'}>{transaction.title.toUpperCase()}</Text>
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
            <strong>Accounting Date</strong> {formatDate(transaction?.accounted_at)}
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
              <CiReceipt />
            </Button>
            <Text fontSize={'x-small'}>Receipt Preview</Text>
          </Stack>
        </Flex>
        <Accordion allowMultiple w={'full'} mt={5}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontSize={'lg'} as="span" flex="1" textAlign="left">
                  <strong>Details</strong>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack>
                <Stack gap={0}>
                  <Text color={'gray.400'}>{isSender ? 'Receiver' : 'Sender'}</Text>
                  <Text>
                    {isSender
                      ? transaction.destination_account_details.seller?.name.toUpperCase()
                      : transaction.source_account_details.user.full_name.toUpperCase()}
                  </Text>
                </Stack>
                <Stack gap={0}>
                  <Text color={'gray.400'}>{isSender ? "Receiver's account" : "Sender's account"}</Text>
                  <Text>{isSender ? transaction.destination_account : transaction.source_account}</Text>
                </Stack>
                <Stack gap={0}>
                  <Text color={'gray.400'}>{isSender ? 'Sender' : 'Receiver'}</Text>
                  <Text>{user?.full_name.toUpperCase()}</Text>
                </Stack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Center>
  )
}

export default TransactionDetailsPage
