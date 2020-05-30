<template>
    <div id="app" class="bg-light">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->
        <Header @logout="logout" />

        <router-view />

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
        }
    },
    created : function () {
        let accessToken = localStorage.getItem('token');
        let vm = this;

        if (accessToken != '' && accessToken != null) {
            vm.$store.dispatch("logined", accessToken);
        }
    },
    methods: {
        // 登出
        logout: function() {
            let vm = this;
            vm.$store.dispatch('logout');
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
