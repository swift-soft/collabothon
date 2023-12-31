import React from 'react'

import {Center} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

import AuthForm from '@/auth/form'
import {selectProfile} from '@/auth/state'
import {useAppSelector} from '@/store'

const AuthPage = () => {
  const user = useAppSelector(selectProfile)
  const navigate = useNavigate()

  React.useEffect(() => {
    user && navigate('/', {replace: true})
  }, [user, navigate])

  return (
    <Center p={4} py={12}>
      <AuthForm />
    </Center>
  )
}

export default AuthPage
