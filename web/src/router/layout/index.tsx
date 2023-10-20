import {Box, Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import {NAVBAR_HEIGHT} from '@/constants'

import Navbar from './navbar'

const Layout = () => (
  <Stack minH="100vh">
    <Box p={4} h={`calc(100vh - ${NAVBAR_HEIGHT})`}>
      <Outlet />
    </Box>
    <Navbar />
  </Stack>
)

export default Layout
