import {Box, Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import {HEADER_HEIGHT, NAVBAR_HEIGHT} from '@/constants'

import Header from './header'
import Navbar from './navbar'

const Layout = () => {
  return (
    <Stack minH="100vh">
      <Header />
      <Box p={4} minH={`calc(100vh - ${NAVBAR_HEIGHT})`} pt={HEADER_HEIGHT} pb={NAVBAR_HEIGHT}>
        <Outlet />
      </Box>
      <Navbar />
    </Stack>
  )
}

export default Layout
