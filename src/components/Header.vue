<template>
    <!-- <div > -->
        <b-navbar toggleable="lg" type="dark" variant="info" :sticky="true"  >
            <b-navbar-brand href="/">Wall</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav>
                    <router-link to="/about">
                        <b-nav-item href="/about">About</b-nav-item>
                    </router-link>
                    <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto" v-if="!loginStatus">
                    <b-nav-item to="/login">login</b-nav-item>
                    <b-nav-item to="/register">register</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
            

        </b-navbar>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'Header',
    props: {
        
    },
    data: function() {
        return {
            loginStatus : false,
        }
    }
}
</script>