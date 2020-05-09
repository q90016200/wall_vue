<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->
        <Header :accessToken="accessToken" @logout="logout" />

        <router-view v-on:login="login"  />

    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
    name: 'app',
    components: {
        Header
    },
    data: function() {
        return {
            loginStatus : false,
            accessToken : '',
        }
    },
    created : function () {
        let access_token = localStorage.getItem('access_token');
        let vm = this;

        // eslint-disable-next-line no-console
        // console.log("token:" + access_token);

        if (access_token != '' && access_token != null) {
            vm.loginStatus = true;
            vm.accessToken = access_token;

            this.axios.post('/api/auth/me', {},
            { 
                headers: {
                    "Authorization" : "Bearer " + access_token
                }
            })
            .then(function (response) {
                // eslint-disable-next-line no-console
                console.log(response);

            });

            // vm.$store.dispatch("checkLogin", {
            //     accessToken: access_token,
            // });

        }
    },
    methods: {
        // 登入
        login: function (token) {
            let vm = this;
            
            // eslint-disable-next-line no-console
            // console.log(token);

            localStorage.setItem('access_token', token)

            vm.loginStatus = true;
            vm.accessToken = token;
        },
        // 登出
        logout: function() {
            let vm = this;

            localStorage.removeItem('access_token');

            this.axios.post('/api/auth/logout', {}, 
            { 
                headers: {
                    "Authorization" : "Bearer " + vm.accessToken
                }
            })
            .then(function (response) {
                // handle success
                // eslint-disable-next-line no-console
                console.log(response);

                vm.loginStatus = false;
                vm.accessToken = '';
            });
            
        }
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
