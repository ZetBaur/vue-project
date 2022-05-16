import { defineStore } from 'pinia'
import Axios from '@/axios/reqAxios'

export const useLoginStore = defineStore({
    id: 'login',

    state: () => ({
        tokenState: localStorage.getItem('token'),
        refreshTokenState: localStorage.getItem('refresh_token')
    }),

    getters: {
        token: (state) => state.tokenState,
        refreshToken: (state) => state.refreshTokenState,
        loggedIn: (state) => !!state.tokenState
    },

    actions: {
        async login(formData) {
            const { data } = await Axios.post(
                'manager-api/v2/auth/signIn',
                formData
            )
            localStorage.setItem('token', 'Bearer ' + data.auth_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            return data
        }
    }
})
