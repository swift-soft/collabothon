import {Flex, Text} from '@chakra-ui/react'

const Header = () => (
  <Flex
    minH="60px"
    py={2}
    px={4}
    align="center"
    justify="space-between"
    borderRadius="xl"
    boxShadow="lg"
    bg="brand.bg.500"
  >
    <Text>Header</Text>
  </Flex>
)

export default Header
