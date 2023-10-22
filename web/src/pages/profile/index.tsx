import React from 'react'

import {Avatar, Button, HStack, Heading, Spinner, Stack, Text} from '@chakra-ui/react'
import {Navigate, useNavigate} from 'react-router-dom'

import {selectProfile, selectProfileLoading} from '@/auth/state'
import useSignOut from '@/auth/use-sign-out'
import {useAppSelector} from '@/store'

import TransferRequestsHistory from './transfer-requests-history'

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
    <Stack w="100%">
      <HStack>
        <Avatar name={user?.full_name ?? undefined} />
        <Heading size="md">{user?.full_name}</Heading>
      </HStack>
      <Text>{user?.account_number}</Text>
      <Button onClick={signOut} isLoading={signingOut} colorScheme="red" variant="outline" w="100%">
        Sign out
      </Button>
      {/* <Text>E-mail: {user?.email}</Text> */}
      {/* <Text>Phone number: {user?.phone_number}</Text> */}
      <TransferRequestsHistory />
    </Stack>
  )
}

export default ProfilePage
