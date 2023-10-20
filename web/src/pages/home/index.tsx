import {HStack, Stack, Text} from '@chakra-ui/react'

import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

import Hero from './sections/hero'
import Links from './sections/links'
import Operations from './sections/operations'

const HomePage = () => {
  const user = useAppSelector(selectProfile)

  return (
    <Stack h="100%">
      <HStack fontSize="xl">
        <Text>Hello,</Text>
        <Text fontWeight="semibold">{user?.full_name?.split(' ')[0]}</Text>
      </HStack>
      <Hero />
      <Links />
      <Operations />
    </Stack>
  )
}

export default HomePage
