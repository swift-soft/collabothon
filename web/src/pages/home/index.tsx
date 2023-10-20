import {Box} from '@chakra-ui/react'

import Hero from './sections/hero'
import Links from './sections/links'
import Navbar from './sections/navBar'
import Operations from './sections/operations'

const HomePage = () => {
  return (
    <Box h="100%">
      <Navbar />
      <Hero />
      <Links />
      <Operations />
    </Box>
  )
}

export default HomePage
