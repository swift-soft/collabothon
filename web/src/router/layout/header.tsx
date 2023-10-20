import {ArrowBackIcon, HamburgerIcon, InfoOutlineIcon} from '@chakra-ui/icons'
import {Box, Flex, Spacer, Text} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <Flex
      px={4}
      py={2}
      color="red"
      align="center"
      justify="space-between"
      position="fixed"
      top={0}
      w="100%"
      bg="white"
    >
      <Box textAlign="center" onClick={() => navigate(-1)}>
        <ArrowBackIcon boxSize={5}></ArrowBackIcon>
        <Text fontSize="xs">Back</Text>
      </Box>
      <Spacer />
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Konto <InfoOutlineIcon fontSize="md" />
        </Text>
      </Box>
      <Spacer />
      <Box textAlign="center">
        <HamburgerIcon boxSize={5} />
        <Text fontSize="xs">Menu</Text>
      </Box>
    </Flex>
  )
}

export default Header
