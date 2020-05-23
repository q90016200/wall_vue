<template>
  <div class="register mt-3">
    <b-container fluid>
        <!-- <FacebookLogin /> -->
        <b-form @submit.prevent="submitRegisterForm">
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
                id="input-group-2"
                class="text-left"
                label="使用者名稱 :"
                label-for="input-2"
                description=""
            >
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                class="text-left"
                label="密碼 :"
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

            <b-form-group
                id="input-group-4"
                class="text-left"
                label="確認密碼 :"
                label-for="input-4"
                description=""
            >
                <b-form-input
                    id="input-4"
                    v-model="form.confirmPassword"
                    type="password"
                    required
                    placeholder="Enter password"
                ></b-form-input>

                <b-alert v-model="formCheck.passwordAlert" variant="danger" dismissible v-if="formCheck.passwordAlert" class="mt-1">
                    {{formCheck.passwordAlertText}}
                </b-alert>
            </b-form-group>


            <b-button type="submit" variant="primary" >Submit</b-button>
            <b-button type="reset" variant="danger" class="ml-3" v-on:click="resetRegisterForm">Reset</b-button>
        </b-form>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import FacebookLogin from '@/components/FacebookLogin.vue'

var _ = require('lodash');

export default {
    name: 'register',
    components: {
    // HelloWorld,
        // FacebookLogin,
    },
    data: function() {
        return {
            form : {
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
            },
            formCheck: {
                passwordAlert: false,
                passwordAlertText: '',
            }
        }
    },
    methods: {
        // 重置表單
        resetRegisterForm: function(evt) {
            evt.preventDefault();
            
            this.form.email = '';
            this.form.name = '';
            this.form.password = '';
            this.form.confirmPassword = '';
            // this.$router.push("/");

        },
        // 送出表單
        submitRegisterForm: function(evt) {
            evt.preventDefault();
            let vm = this;

            // eslint-disable-next-line no-console
            console.log(vm.form.email);
            
            this.axios.post('/api/auth/register', {
                email: vm.form.email,
                name: vm.form.name,
                password: vm.form.password,
                password_confirmation: vm.form.confirmPassword,
            })
            .then(function (response) {
                // eslint-disable-next-line no-console
                console.log(response);
            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            });

            
        },
        // 檢查密碼
        checkPassword: function() {
            // eslint-disable-next-line no-console
            // console.log("test checkPassword");

            if (this.form.password != "" && this.form.confirmPassword != "") {
                if (this.form.password != this.form.confirmPassword) {
                    this.formCheck.passwordAlert = true;
                    this.formCheck.passwordAlertText = '請確認密碼';
                }
            }
            
        }
    },
    watch: {
        "form.confirmPassword": function () {
            // eslint-disable-next-line no-console
            // console.log("test watch");
            this.formCheck.passwordAlert = false;
            this.formCheck.passwordAlertText = '';
            // this.checkPassword();
            this.debouncedCheckPassword();
            
        }
    },
    beforeCreate : function() {
        let access_token = localStorage.getItem('token');

        if (access_token != '' && access_token != null) {
            this.$router.push("/");
        }
    },
    created: function () { // 建立 component 時
        // 建立事件延遲 for confirmPassword
        this.debouncedCheckPassword = _.debounce(this.checkPassword, 800)
    }
}
</script>
