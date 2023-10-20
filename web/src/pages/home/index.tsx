import {Box, Text} from '@chakra-ui/react'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import Hero from './sections/hero'
import Links from './sections/links'
import Operations from './sections/operations'

const HomePage = () => {
  const user = useAppSelector(selectProfile)

  return (
    <Box h="100%">
      <Text fontSize="xl">Hello, {user?.full_name?.split(' ')[0]}</Text>
      <Hero />
      <Links />
      <Operations />
    </Box>
  )
}

export default HomePage
