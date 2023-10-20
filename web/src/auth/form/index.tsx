import {useCallback, useState} from 'react'
import React from 'react'

import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import isEmail from 'validator/es/lib/isEmail'

import {supabase} from '@/api'
import useLoadingState from '@/common/hooks/use-loading-state'

const emptyInput = {
  email: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
}

const AuthForm = () => {
  const {isOpen: isSignUp, onToggle} = useDisclosure()
  const [input, setInput] = useState(emptyInput)
  const navigate = useNavigate()

  const toasts = React.useMemo(
    () => ({
      onErrorToast: isSignUp ? 'Failed to register' : 'Failed to log in',
      onSuccessToast: 'Welcome!',
    }),
    [isSignUp]
  )

  const [handleSubmit, loading] = useLoadingState(
    useCallback(async () => {
      const credentials = {
        email: input.email,
        password: input.password,
      }
      const req = isSignUp
        ? supabase.auth.signUp({
            ...credentials,
            options: {
              data: {
                full_name: `${input.firstName} ${input.lastName}`,
                phone_number: input.phoneNumber,
              },
            },
          })
        : supabase.auth.signInWithPassword(credentials)
      const {error} = await req
      if (error) throw error

      console.log('navigate')

      navigate('/', {replace: true})
    }, [isSignUp, input, navigate]),
    toasts
  )

  const handleInputChange = useCallback(({target: {name, value}}) => {
    setInput((input) => ({...input, [name]: value}))
  }, [])

  return (
    <Stack spacing={4} w="400px" textAlign="center">
      <Heading size="xl">{isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}</Heading>
      {isSignUp && (
        <HStack>
          <FormControl isRequired isDisabled={loading}>
            <Input
              placeholder="Imię"
              name="firstName"
              variant="filled"
              onChange={handleInputChange}
              value={input.firstName}
            />
          </FormControl>
          <FormControl isRequired isDisabled={loading}>
            <Input
              placeholder="Nazwisko"
              name="lastName"
              variant="filled"
              onChange={handleInputChange}
              value={input.lastName}
            />
          </FormControl>
        </HStack>
      )}
      <FormControl isRequired isDisabled={loading} isInvalid={!!input.email && !isEmail(input.email)}>
        <Input
          placeholder="Adres e-mail"
          type="email"
          name="email"
          variant="filled"
          value={input.email}
          onChange={handleInputChange}
        />
        <FormErrorMessage>Niepoprawny adres e-mail</FormErrorMessage>
      </FormControl>
      {isSignUp && (
        <FormControl isRequired isDisabled={loading}>
          <Input
            placeholder="Phone number"
            name="phoneNumber"
            variant="filled"
            value={input.phoneNumber}
            onChange={handleInputChange}
          />
        </FormControl>
      )}
      <FormControl isRequired isDisabled={loading}>
        <Input
          placeholder="Hasło"
          type="password"
          name="password"
          variant="filled"
          value={input.password ?? ''}
          onChange={handleInputChange}
        />
        <FormErrorMessage>Hasło musi składać się przynajmniej z 6 znaków</FormErrorMessage>
      </FormControl>
      {isSignUp && (
        <FormControl
          isRequired
          isDisabled={loading}
          isInvalid={!!input.repeatPassword && input.password !== input.repeatPassword}
        >
          <Input
            placeholder="Powtórz hasło"
            type="password"
            name="repeatPassword"
            variant="filled"
            value={input.repeatPassword ?? ''}
            onChange={handleInputChange}
          />
          <FormErrorMessage>Hasła nie są identyczne</FormErrorMessage>
        </FormControl>
      )}
      <Button variant="link" color="blue.400" fontSize="sm">
        Nie pamiętasz hasła?
      </Button>
      <Button
        bg="blue.400"
        color="white"
        _hover={{
          bg: 'blue.500',
        }}
        size="sm"
        isLoading={loading}
        isDisabled={!input.email || !input.password}
        onClick={handleSubmit}
      >
        {isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}
      </Button>
      <Flex direction="row" alignItems="center">
        <Divider flex={1} />
        <Text fontSize="xs" mx={2} color="gray.200">
          {isSignUp ? 'Masz już konto?' : 'Jesteś tu nowy?'}
        </Text>
        <Divider flex={1} />
      </Flex>
      <Button
        colorScheme="gray"
        _hover={{
          bg: 'blue.500',
        }}
        size="sm"
        onClick={onToggle}
        isDisabled={loading}
      >
        {isSignUp ? 'Zaloguj się' : 'Zarejestruj się'}
      </Button>
    </Stack>
  )
}

export default AuthForm
