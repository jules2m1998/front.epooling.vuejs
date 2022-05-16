import {BASE_URI, formatRequestion} from "@/store/config";

export default {
    namespaced: true,
    state: {
        account: {
            username: null,
            id: null
        },
        token: null
    },
    mutations: {
        SET_ACCOUNT(state, user) {
            localStorage.setItem('account', JSON.stringify(user))
        },
        SET_TOKEN(state, token) {
            localStorage.setItem('token', token)
        }
    },
    actions: {
        async register({commit}, user) {
            const response = await fetch(
                BASE_URI + 'auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formatRequestion(user)
                }
            )
            const data = await response.json()
            commit('SET_ACCOUNT', data)
        },
        async getToken({commit}, user) {
            const response = await fetch(
                BASE_URI + 'auth/token',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formatRequestion(user)
                }
            )
            const data = await response.json()
            if (data.access_token)
                commit('SET_TOKEN', data.access_token)
        }
    },
    getters: {
        account: (state) => JSON.parse(localStorage.getItem('account')) || state.account,
        token: (state) => localStorage.getItem('token') || state.token
    }
}