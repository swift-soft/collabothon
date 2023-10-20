import React from 'react'

import {useNavigate} from 'react-router-dom'

import {supabase} from '@/api'
import useLoadingState from '@/common/hooks/use-loading-state'

const toasts = {
  onErrorToast: 'Sign out failed',
}
const useSignOut = (redirectTo?: string) => {
  const navigate = useNavigate()

  return useLoadingState(
    React.useCallback(async () => {
      const {error} = await supabase.auth.signOut()
      if (error) throw error
      navigate(redirectTo || '/', {replace: true})
    }, [navigate, redirectTo]),
    toasts
  )
}

export default useSignOut
