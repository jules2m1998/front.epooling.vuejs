import {BASE_URI} from "@/store/config";

export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },
    actions: {
        async createCurrentUser({commit}, {user, isPerson = false}) {
            console.log(user)
            const url = `${BASE_URI}user/${isPerson ? 'user_person' : 'user_society'}`;
            const resonse = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
            if (resonse.status === 201) {
                const data = await resonse.json();
                commit('SET_USER', data.user);
            }
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
    },
    getters: {
        user: state => state.user
    }
}