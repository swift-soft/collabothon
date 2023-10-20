import React from 'react'

import {Avatar, Button, HStack, Heading, Spacer, Spinner, Stack, Text} from '@chakra-ui/react'
import {Navigate, useNavigate} from 'react-router-dom'

import {selectProfile, selectProfileLoading} from '@/auth/state'
import useSignOut from '@/auth/use-sign-out'
import {useAppSelector} from '@/store'

const ProfilePage = () => {
  const user = useAppSelector(selectProfile)
  const loading = useAppSelector(selectProfileLoading)
  const navigate = useNavigate()

  const [signOut, signingOut] = useSignOut()

  React.useEffect(() => {
    !user && navigate('/auth', {replace: true})
  }, [user, navigate])

  return loading ? (
    <Spinner />
  ) : !user ? (
    <Navigate to="/" />
  ) : (
    <Stack h="100%">
      <HStack>
        <Avatar name={user?.full_name ?? undefined} />
        <Heading size="md">{user?.full_name}</Heading>
      </HStack>
      <Text>E-mail: {user?.email}</Text>
      <Text>Phone number: {user?.phone_number}</Text>
      <Text>Account number: {user?.account_number}</Text>
      <Spacer />
      <Button onClick={signOut} isLoading={signingOut} colorScheme="red" variant="outline">
        Sign out
      </Button>
    </Stack>
  )
}

export default ProfilePage
