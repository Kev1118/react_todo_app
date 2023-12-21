import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null,refreshToken: null},
    reducers: {
        setCredentials: (state, action) => {
            const {foundUser, accessToken, refreshToken} = action.payload
            state.user = foundUser
            state.token = accessToken
            state.refreshToken = refreshToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token


