import {Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

const Layout = () => (
  <Stack p={4} minH="100vh">
    <Outlet />
  </Stack>
)

export default Layout
