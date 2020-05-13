import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // 狀態儲存的物件
        logined: false,
        user: {
            "type": null,
            "token": null,
            "name": null,
        },
        // test: null,
    },
    mutations: { // 更新狀態資料的方法。
        // 用戶登錄成功，存儲 token 並設置
        logined(state, token) {
            state.auth = true;
            state.user.token = token;
            localStorage.token = token;
        },
        // 用戶刷新 token 成功，使用新的 token 替換掉本地的token
        refreshToken(state, token) {
            state.user.token = token;
            localStorage.token = token;
            axios.defaults.headers.common['Authorization'] = state.user.token;
        },
        // 登錄成功後，保存用戶資訊
        profile(state, data) {
            state.user.type = data.type;
            state.user.name = data.name;
        },
        // 用戶登出，清除用戶數據
        logout(state) {
            state.user.type = null
            state.user.name = null
            state.auth = false
            state.user.token = null

            localStorage.removeItem('token')
        }
    },
    actions: {  // 類似 Mutations，但是 Actions 是呼叫 Mutations，且可支援非同步呼叫。
        // 登錄成功後保存用戶信息
        logined({ dispatch, commit }, token) {
            return new Promise(function (resolve, reject) {
                commit('logined', token)
                axios.defaults.headers.common['Authorization'] = token
                dispatch('profile').then(() => {
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        },
        // 登錄成功後使用 token 拉取用戶的信息
        profile({ commit }) {
            return new Promise(function (resolve, reject) {
                axios.get('/api/auth/me', {}).then(respond => {
                    if (respond.status == 200) {
                        commit('profile', respond.data);
                        resolve();
                    } else {
                        reject();
                    }
                })
            });
        },
        // 用戶登出，清除用戶資料並重定向至登錄頁面
        logout({ commit }) {
            commit('logout')
            axios.post('auth/logout', {}).then(() => {
                Vue.$router.push({ name: 'login' })
            })
        },
        // 將刷新的 token 保存至本地
        refreshToken({ commit }, token) {
            commit('refreshToken', token)
        },
        // test({ state }, payload){
        //     state.test = payload;
        // }
    },
    getters: {
        logined: function (state) {
            return state.auth;
        },
        getUserProfile: function (state) {
            return state.user;
        }
    },
    modules: { // 用於分割 Vuex 的區塊。
    }
})
