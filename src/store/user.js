import {BASE_URI, formDataRequest, send_request_with_token} from "@/store/config";

export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            if (state.user){
                for (let key in state.user) {
                    state.user[key] = user[key]
                }
            }
        },
        CLEAR_USER(state) {
            state.user = null;
        }
    },
    actions: {
        async createCurrentUser({commit}, {user, isPerson = false}) {
            const url = `${BASE_URI}user/${isPerson ? 'user_person' : 'user_society'}`;
            const resonse = await fetch(
                url,
                {
                    method: 'POST',
                    body: formDataRequest(user)
                });
            if (resonse.status === 201) {
                const data = await resonse.json();
                commit('SET_USER', data.user);
            }
            return resonse.status;
        },
        async getCurrentUser({commit}) {
            const url = `${BASE_URI}user/account_token`;
            const resonse = await fetch(
                url,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (resonse.status === 200) {
                const data = await resonse.json();
                commit('SET_USER', data);
            }
        },
        async updateUser({commit}, user) {
            const url = `${BASE_URI}user`;
            const resonse = await fetch(
                url,
                {
                    method: 'PUT',
                    body: formDataRequest(user),
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (resonse.status === 200) {
                const data = await resonse.json();
                commit('SET_USER', data);
            }
            return resonse
        },
        async updateSociety({dispatch}, person) {
            const resonse = await send_request_with_token('user/society', 'PUT', formDataRequest(person));
            if (resonse.status === 200) {
                dispatch('getCurrentUser');
            }
            return resonse
        },
        async updatePerson({dispatch}, person) {
            const resonse = await send_request_with_token('user/person', 'PUT', formDataRequest(person));
            if (resonse.status === 200) {
                dispatch('getCurrentUser');
            }
            return resonse
        },
    },
    getters: {
        user: state => state.user
    }
}