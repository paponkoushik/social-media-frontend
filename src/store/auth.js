import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        loginFailed: false,
        refreshFailed: false,
    },
    getters: {
        authenticated(state) {
            return state.token;
        },

        user(state) {
            return state.user;
        }

    },
    mutations: {
        SET_TOKEN(state, token) {
            if (token !== 'token_black_listed') {
                state.token = token;
            }
        },
        SET_USER_INFO(state, data) {
            state.user = data ? data.data[0] : null
        },
        SET_LOGIN_FAILED(state, value) {
            state.loginFailed = value;
        },
        SET_REFRESH_FAILED(state, value) {
            state.refreshFailed = value;
        },
    },
    actions: {
        async refresh({ dispatch, commit }, token) {
            try {
                let response = await axios.post('auth/refresh', token)
                if (! response.data.success && response.data.status === 'Token Expired') {
                    return dispatch('attempt', response.data.token);
                }

            } catch (e) {
                commit('SET_REFRESH_FAILED', true)
                commit('SET_TOKEN', 'token_black_listed')
                commit('SET_USER_INFO', null)
            }
        },
        async login({ dispatch, commit }, credentials) {
            try {
                let response = await axios.post('auth/login', credentials)
                return dispatch('attempt', response.data.token);
            } catch (e) {
                commit('SET_LOGIN_FAILED', true)
            }
        },

        async attempt({commit, state}, token) {

            if (token) {
                commit('SET_TOKEN', token);
            }

            if (!state.token) {
                return
            }

            try {
               let user = await axios.get('auth/myself', {
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
               });
               commit('SET_USER_INFO', user.data);

            }catch (e){
                commit('SET_TOKEN', null)
                commit('SET_USER_INFO', null)
            }
        },

        logout({commit}) {
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER_INFO', null)
            })
        }
    }
}
