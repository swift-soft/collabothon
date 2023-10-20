import {Box, Image, Text} from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Box display="flex" flexDirection="row" marginTop="2px" pb="10px" w="100%" margin="auto">
      <Image
        src="https://assets.stickpng.com/images/588a6507d06f6719692a2d15.png"
        alt="menu"
        w="25px"
        h="25px"
        mr="40px"
        mb="5px"
      />
      <Text fontSize="xl">Hello, Tymoteusz</Text>
      <Image
        src="https://cdn-icons-png.flaticon.com/512/3059/3059408.png"
        alt="menue"
        w="25px"
        h="25px"
        ml="auto"
      />
    </Box>
  )
}

export default Navbar
