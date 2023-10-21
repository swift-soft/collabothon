import React from 'react'

import {ArrowBackIcon, HamburgerIcon} from '@chakra-ui/icons'
import {Box, Flex, Spacer, Text} from '@chakra-ui/react'
import {useLocation, useNavigate} from 'react-router-dom'

const pathnameToTitle = {
  '/transaction': 'Transaction',
}

const Header = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const title = React.useMemo(() => {
    if (pathname === '/') return 'Home'

    const custom = Object.entries(pathnameToTitle).find(([k]) => pathname.startsWith(k))
    if (custom) return custom[1]

    const lastPart = pathname.split('/').at(-1) || ''
    return lastPart[0]?.toUpperCase() + lastPart.slice(1)
  }, [pathname])

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
      zIndex="1"
    >
      <Box textAlign="center" onClick={() => navigate(-1)}>
        <ArrowBackIcon boxSize={5}></ArrowBackIcon>
        <Text fontSize="xs">Back</Text>
      </Box>
      <Spacer />
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          {title}
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
