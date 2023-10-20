import {Box, Flex, Image, Spacer, Stack, Text} from '@chakra-ui/react'
import {CarouselProvider, Dot, Slide, Slider} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import {Link} from 'react-router-dom'

import './style.css'

const Hero = () => (
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
              2063,19 PLN
            </Text>
            <Box display="inline-flex" fontSize="sm">
              <Text fontWeight="medium" mr="5px">
                Expenses up to 20 April:
              </Text>
              <Text fontWeight="semibold" color="yellow.700">
                5286,75 PLN
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
            <Box display="flex" justifyContent="center" width="100%" margin="auto">
              <Image
                src="https://www.freeiconspng.com/thumbs/barcode/barcode-background-png-6.png"
                alt="Second slide"
                width="50%"
              />
            </Box>
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

export default Hero
