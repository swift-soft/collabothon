import {Spinner} from '@chakra-ui/react'
import {Navigate, Outlet} from 'react-router-dom'

import {selectProfile, selectProfileLoading} from '@/auth/state'
import {useAppSelector} from '@/store'

const RequireLoggedIn = () => {
  const user = useAppSelector(selectProfile)
  const userLoading = useAppSelector(selectProfileLoading)

  return userLoading ? <Spinner /> : !user ? <Navigate to="/auth" /> : <Outlet />
}

export default RequireLoggedIn
