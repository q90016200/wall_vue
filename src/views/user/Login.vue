<template>
<div class="login mt-3">
    <b-container fluid>
        <b-form @submit.prevent="submitLoginForm">
            <b-form-group
                id="input-group-1"
                class="text-left"
                label="Email address :"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                class="text-left"
                label="password :"
                label-for="input-3"
                description=""
            >
                <b-form-input
                    id="input-3"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter password"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" >Login</b-button>
        </b-form>
    </b-container>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'login',
    components: {
    // HelloWorld
    },
    data: function () {
        return {
            form : {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        submitLoginForm: function() {
            let vm = this;

            vm.axios.post('/api/auth/login', {
                email: vm.form.email,
                password: vm.form.password,
            })
            .then(function (response) {
                // console.log(response.data.access_token);

                if (response.data) {
                    vm.$store.dispatch('logined', response.data.access_token);
                    vm.$router.push("/");
                } else {
                    alert("login fail");
                }

            })
            .catch(function (error) {
                console.log(error);
                alert("login fail");
            });


        }
    },
    beforeCreate : function() {
        let vm = this;
        if (vm.$store.logined === true) {
            vm.$router.push("/");
        }
    }
}
</script>
