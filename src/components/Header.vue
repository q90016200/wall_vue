<template>
    <!-- <div > -->
        <b-navbar toggleable="lg" type="dark" variant="info" :sticky="true"  >
            <b-navbar-brand href="/">Wall</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav>
                    <router-link to="/posts">
                        <b-nav-item href="/posts">Posts</b-nav-item>
                    </router-link>
                    <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto" v-if="!isLogin">
                    <b-nav-item to="/login" >login</b-nav-item>
                    <b-nav-item to="/register">register</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto" v-else>
                    <b-nav-item @click.prevent="logout">logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'Header',
    props: [],
    data: function() {
        return {
            
        }
    },
    methods: {
        // 登出
        logout: function() {
            let vm = this;
            vm.$emit('logout', '');
        }
    },
    computed: {
        isLogin: function () {
            let vm = this;
            if (vm.$store.getters.logined != '' && vm.$store.getters.logined != null) {
                return true;
            } else {
                return false;
            }
        }
    },
    created : function () {
        let vm = this;
        vm.access_token = vm.accessToken;
    }
}
</script>