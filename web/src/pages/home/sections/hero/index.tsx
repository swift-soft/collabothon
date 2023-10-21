import React from 'react'

import {Box, Flex, Image, Spacer, Stack, Text} from '@chakra-ui/react'
import {sub} from 'date-fns'
import {CarouselProvider, Dot, Slide, Slider} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import {Link} from 'react-router-dom'

import {supabase} from '@/api'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'
import {formatDateName, formatMoney} from '@/utils/string'

import kod from '../../images/kod.png'
import './style.css'

const Hero = () => {
  const user = useAppSelector(selectProfile)

  const [expenses, setExpenses] = React.useState(0)
  React.useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const {data, error} = await supabase.rpc('get_user_total_expenses', {
          from: sub(new Date(), {years: 100}).toUTCString(),
          to: new Date().toUTCString(),
        })
        if (error) throw error

        setExpenses(data)
      } catch (err) {
        console.error((err as Error)?.message)
      }
    }

    fetchStatistics()
  }, [])

  return (
    <Box height="fit-content">
      <CarouselProvider infinite={true} naturalSlideWidth={16} naturalSlideHeight={9} totalSlides={2}>
        <Slider>
          <Slide index={0}>
            <Stack
              bg="gray.200"
              color="black"
              textAlign="left"
              padding={4}
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              marginLeft="0"
              height="100%"
              roundedStart="xl"
            >
              <Text fontSize="md" fontWeight="semibold">
                Available funds:
              </Text>
              <Text fontSize="2xl" fontWeight="extrabold">
                {formatMoney(user?.account_balance)} PLN
              </Text>
              <Box display="inline-flex" fontSize="sm">
                <Text fontWeight="medium" mr="5px">
                  Expenses up to {formatDateName(new Date())}:
                </Text>
                <Text fontWeight="semibold" color="yellow.700">
                  {formatMoney(expenses)} PLN
                </Text>
              </Box>
              <Spacer />
              <Link to="/expenses">
                <Text textAlign="center" fontSize="md" fontWeight="semibold" color="red.600">
                  YOUR EXPENSES
                </Text>
              </Link>
            </Stack>
          </Slide>
          <Slide index={1}>
            <Stack
              bg="gray.200"
              color="black"
              textAlign="center"
              padding="10px 10px"
              display="flex"
              direction="column"
              height="100%"
              width="100%"
              roundedEnd="xl"
            >
              <Text fontWeight="semibold" fontSize="2xl">
                Recieve e-receipt
              </Text>
              <Image src={kod} alt="Second slide" width="100%" objectFit="cover" height="100%" />
            </Stack>
          </Slide>
        </Slider>
        <Flex justify="center" mt={2} gap={4}>
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <Dot slide={i} key={i}>
                <Box w="40px" h="10px" bg="red.200" rounded="full" />
              </Dot>
            ))}
        </Flex>
      </CarouselProvider>
    </Box>
  )
}

export default Hero
