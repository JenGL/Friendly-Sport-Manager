<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <Header :hideLogInfo=true v-on:menu-click="menuVisible = !menuVisible"></Header>
            </md-app-toolbar>
            <md-app-drawer :md-active.sync="menuVisible">
                <Menu menuVisible=menuVisible></Menu>
            </md-app-drawer>

            <md-app-content class="centered-container">
                <md-content class="md-elevation-3 md-medium-size">
                    <div class="title">
                        <img src="../img/logo.png">
                        <div class="md-title">Friendly Sport Manager</div>
                    </div>

                    <div class="form">
                        <md-field>
                            <label>League</label>
                            <md-input v-model="login.league" autofocus></md-input>
                        </md-field>
                        <md-field>
                            <label>E-mail</label>
                            <md-input v-model="login.email" autofocus></md-input>
                        </md-field>

                        <md-field md-has-password>
                            <label>Password</label>
                            <md-input v-model="login.password" type="password"></md-input>
                        </md-field>
                    </div>

                    <div class="actions md-layout md-alignment-center-space-between">
                        <router-link to="/pswdreset">Reset password</router-link>
                        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
                    </div>

                    <div class="loading-overlay" v-if="loading">
                        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
                    </div>

                </md-content>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import Header from './components/header.vue';
    import Menu from './components/menu.vue';
    import DB from '../js/database.js';

    export default {
        name: 'Signin',
        components: {
            Header,
            Menu
        },
        data: () => ({
            menuVisible: false,
            logged: false,
            loginVisible: false,
            registerVisible: false,
            loading: false,
            login: {
                email: "",
                password: "",
                league: ""
            }
        }),
        methods: {
            auth() {
                // your code to login user
                // this is only for example of loading
                this.loading = true;
                fetch('https://raw.githubusercontent.com/JenGL/c4lc3tt0_s3rv3r/master/auth.json')
                    .then(response => response.json())
                    .then(json => {
                        this.loading = false;
                        console.log(json);
                        DB.setItegm('token', json.token);
                        DB.setItegm('expires', json.expires);
                        this.$router.push('/');
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-container {
        height: 100%;
    }

    .md-app {
        border: 1px solid rgba(#000, .12);
        height: 100%;
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .float-right {
        float: right;
    }

    .margin-5 {
        margin: 0 5px;
    }

    .color-white {
        color: white;
    }

    .centered-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100%;
        .title {
            text-align: center;
            margin-bottom: 30px;
            img {
                margin-bottom: 16px;
                max-width: 80px;
            }
        }
        .actions {
            .md-button {
                margin: 0;
            }
        }
        .form {
            margin-bottom: 60px;
        }
        .md-content {
            z-index: 1;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            position: relative;
        }
        .loading-overlay {
            z-index: 10;
            top: 0;
            left: 0;
            right: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>