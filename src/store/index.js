import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // 狀態儲存的物件
        logined: false,
        user: {
            "type": null,
            "accessToken": null,
        },
        // test: null,
    },
    mutations: { // 更新狀態資料的方法。
        switchLogined(state, status) {
            state.logined = status;
        },
        changeUser(state, userData) {
            if (state.logined === true) {
                state.User.type = userData.type;
                state.User.accessToken = userData.accessToken;
            } else {
                state.User.type = null;
                state.User.accessToken = null;
            }
        }
    },
    actions: {  // 類似 Mutations，但是 Actions 是呼叫 Mutations，且可支援非同步呼叫。
        checkLogin({ commit }, payload) {
            
            this.axios.post('/api/auth/me', {},
            { 
                headers: {
                    "Authorization": "Bearer " + payload.access_token
                }
            })
            .then(function (response) {
                // eslint-disable-next-line no-console
                console.log(response);

            });
            commit("switchLogined", false);
        },
        login({ commit, dispatch }, payload) {
            commit("switchLogined", true);
            dispatch("changeUser", payload);
            
            // state.loginUser.type = payload.type;
            // state.loginUser.accessToken = payload.accessToken;
        },
        logout: function ({ commit, dispatch }) {
            commit("switchLogined" , false);
            dispatch("changeUser");
        },
        // test({ state }, payload){
        //     state.test = payload;
        // }
    },
    getters: {
        logined: function (state) {
            return state.logined;
        },
        getLoginUser: function (state) {
            return state.loginUser;
        }
    },
    modules: { // 用於分割 Vuex 的區塊。
    }
})
