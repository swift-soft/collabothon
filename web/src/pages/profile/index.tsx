import React from 'react'

import {Button, Heading, Spinner, Stack} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

import {selectProfile, selectProfileLoading} from '@/auth/state'
import useSignOut from '@/auth/use-sign-out'
import {useAppSelector} from '@/store'

const ProfilePage = () => {
  const user = useAppSelector(selectProfile)
  const loading = useAppSelector(selectProfileLoading)
  const navigate = useNavigate()

  const [signOut, signingOut] = useSignOut()

  React.useEffect(() => {
    !user && navigate('/', {replace: true})
  }, [user, navigate])

  return loading ? (
    <Spinner />
  ) : (
    <Stack>
      <Heading>{user?.email}</Heading>
      <Heading>{user?.full_name}</Heading>
      <Heading>{user?.phone_number}</Heading>
      <Button onClick={signOut} isLoading={signingOut}>
        Sign out
      </Button>
    </Stack>
  )
}

export default ProfilePage
