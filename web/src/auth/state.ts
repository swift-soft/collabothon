import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {User} from '@supabase/supabase-js'

import {supabase} from '@/api'
import {UserProfile} from '@/api/models'
import {RootState} from '@/store'
import {toast} from '@/theme'

export interface State {
  profile?: UserProfile
  profileLoading: boolean
  user?: User
}

const initialState: State = {
  profileLoading: true,
}
export const fetchUser = createAsyncThunk('auth/fetchUserProfile', async () => {
  const {data, error} = await supabase.from('user_profile').select('*').single()
  if (error) throw error
  if (!data) throw new Error("Failed to retrieve the currently logged in user's profile")

  return data as UserProfile
})

export const updateUser = createAsyncThunk('auth/updateUser', async (user: User | undefined, {dispatch}) => {
  if (!user) throw new Error('no user')

  dispatch(setUser(user))
  dispatch(fetchUser())
})

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.rejected, (state) => {
        state.user = undefined
        state.profile = undefined
        state.profileLoading = false
      })
      .addCase(fetchUser.pending, (state) => {
        state.profileLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profileLoading = false
        state.profile = action.payload ?? undefined
      })
      .addCase(fetchUser.rejected, (state, {error}) => {
        state.profileLoading = false
        state.profile = undefined

        console.error('Failed to fetch user', error)
        toast({title: 'Logowanie nie powiodło sie', status: 'error'})
      })
  },
})

export const {setProfileLoading, setUser} = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectProfileLoading = (state: RootState) => state.auth.profileLoading
export const selectProfile = (state: RootState) => state.auth.profile

export default authSlice.reducer
