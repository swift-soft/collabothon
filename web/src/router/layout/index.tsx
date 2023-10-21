import {Box, Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import {HEADER_HEIGHT, NAVBAR_HEIGHT} from '@/constants'

import Header from './header'
import Navbar from './navbar'
import TransferListener from './transfer-listener'

const Layout = () => {
  return (
    <Stack minH="100vh">
      <Header />
      <TransferListener />
      <Box
        p={4}
        minH={`calc(100vh - ${NAVBAR_HEIGHT})`}
        pt={HEADER_HEIGHT}
        pb={`calc(${NAVBAR_HEIGHT} + 1rem)`}
      >
        <Outlet />
      </Box>
      <Navbar />
    </Stack>
  )
}

export default Layout
