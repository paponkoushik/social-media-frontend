import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        loginFailed: false,
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
            state.token = token;
        },
        SET_USER_INFO(state, data) {
            state.user = data;
        },
        SET_LOGIN_FAILED(state, value) {
            state.loginFailed = value;
        },
    },
    actions: {
        async login({ dispatch, commit }, credentials) {
            try {
                let response = await axios.post('auth/login', credentials)
                return dispatch('attempt', response.data.token);
            } catch (e) {
                // console.log(e)
                commit('SET_LOGIN_FAILED', true)
                // this.loginFailed = true;
                // console.log(this.loginFailed)
            }
            // let response = await axios.post('auth/login', credentials)
            // console.log(response)
            // return dispatch('attempt', response.data.token);
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
