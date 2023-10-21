import {Box, Flex, Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import {HEADER_HEIGHT, NAVBAR_HEIGHT} from '@/constants'
import ConfirmTransferDrawer from '@/transfer-requests/confirm-transfer-drawer'
import TransferListener from '@/transfer-requests/transfer-listener'

import Header from './header'
import Navbar from './navbar'

const Layout = () => {
  return (
    <>
      <Stack minH="100vh">
        <Header />

        <Flex
          p={4}
          minH={`calc(100vh - ${NAVBAR_HEIGHT})`}
          pt={HEADER_HEIGHT}
          align="stretch"
          w="100%"
          pb={`calc(${NAVBAR_HEIGHT} + 1rem)`}
        >
          <Box w="full">
            <Outlet />
          </Box>
        </Flex>
        <Navbar />
      </Stack>

      {/* Global modals */}
      <TransferListener />
      <ConfirmTransferDrawer />
    </>
  )
}

export default Layout
