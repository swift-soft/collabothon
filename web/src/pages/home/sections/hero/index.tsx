import {Box, Button, Flex, Heading, Link, Stack, Text} from '@chakra-ui/react'
import {CarouselProvider, Dot, Slide, Slider} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import './style.css'

const Hero = () => {
  return (
    <Box height="fit-content">
      <CarouselProvider infinite={true} naturalSlideWidth={16} naturalSlideHeight={9} totalSlides={2}>
        <Slider>
          <Slide index={0}>
            <Stack
              bg="gray.200"
              color="black"
              textAlign="left"
              padding="10px 10px"
              borderRadius="md"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              marginLeft="0"
              height="100%"
            >
              <Text pl="6" as="h2" fontSize="md" mb="0" ml="0" fontWeight="semibold">
                Available funds:
              </Text>
              <Text pl="10" fontSize="2xl" mb="2" mt="0" fontWeight="extrabold">
                2063,19 PLN
              </Text>
              <Box display="inline-flex">
                <Text pl="6" fontSize="sm" fontWeight="medium" mb="0" mr="5px">
                  Expenses up to 20 April:
                </Text>
                <Text fontSize="sm" fontWeight="semibold" mb="0" color="yellow.700">
                  5286,75 PLN
                </Text>
              </Box>
              <Link>
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
              borderRadius="md"
              display="flex"
              flexDirection="column"
              marginLeft="0"
              height="100%"
              width="100%"
            >
              <Text fontWeight="semibold" fontSize="2xl">
                Recieve e-receipt
              </Text>
              <Box display="flex" justifyContent="center" width="100%" margin="auto">
                <img
                  src="https://www.freeiconspng.com/thumbs/barcode/barcode-background-png-6.png"
                  alt="Second slide"
                  width="50%"
                />
              </Box>
            </Stack>
          </Slide>
        </Slider>
        <Flex justify="center" mt={0} gap={4}>
          <Dot slide={0} color="black">
            <Button colorScheme="red" w="40px" h="10px" bg="red.200" />
          </Dot>
          <Dot slide={1} color="black">
            <Button colorScheme="red" w="40px" h="10px" bg="red.200" />
          </Dot>
        </Flex>
      </CarouselProvider>
    </Box>
  )
}

export default Hero
