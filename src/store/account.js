import {BASE_URI, formatRequestion, send_request_with_token} from "@/store/config";

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
        },
        REMOVE_ACCOUNT() {
            localStorage.removeItem('account')
        },
        REMOVE_TOKEN() {
            localStorage.removeItem('token')
        },
        CLEAR_LOCAL_STORAGE() {
            localStorage.clear()
        }
    },
    actions: {
        async register({commit}, user) {
            commit('CLEAR_LOCAL_STORAGE')
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
            commit('user/CLEAR_USER')
        },
        async getToken({commit, dispatch}, user) {
            commit('CLEAR_LOCAL_STORAGE')
            let response = await fetch(
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
            if (data.access_token) {
                commit('SET_TOKEN', data.access_token)
                const user = await dispatch('get_me')
                if (user) {
                    commit('SET_ACCOUNT', user)
                } else {
                    commit('CLEAR_LOCAL_STORAGE')
                    commit('user/CLEAR_USER')
                }
            }
            return response

        },
        async get_me() {
            const response = await send_request_with_token('auth/me', 'GET', null)
            const user = await response.json()
            if (response.status === 200) {
                return user
            } else {
                return null
            }
        },
    },
    getters: {
        account: (state) => JSON.parse(localStorage.getItem('account')) || state.account,
        token: (state) => localStorage.getItem('token') || state.token
    }
}