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
                <md-content v-if="phase1" class="md-elevation-3 md-medium-size">
                    <div class="title">
                        <img src="../img/logo.png">
                        <div class="md-title">Friendly Sport Manager</div>
                    </div>

                    <div class="form">
                        <md-field>
                            <label>League</label>
                            <md-input v-model="login.league" autofocus></md-input>
                        </md-field>
                    </div>

                    <div class="actions md-layout md-alignment-center-space-between">
                        <md-button class="md-raised md-primary" @click="goToPhase2">Next</md-button>
                    </div>
                </md-content>
                <md-content v-if="phase2" class="md-elevation-3 md-medium-size">
                    <div class="title">
                        <img src="../img/logo.png">
                        <div class="md-title">Friendly Sport Manager</div>
                    </div>

                    <div class="form">
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
                        <md-button class="md-raised md-primary" @click="register">Register</md-button>
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
    import API from '../js/api';

    export default {
        name: 'Register',
        components: {
            Header,
            Menu
        },
        data: () => ({
            phase1: true,
            phase2: false,
            menuVisible: false,
            loading: false,
            login: {
                email: "",
                password: "",
                league: ""
            }
        }),
        methods: {
            register() {
                // your code to login user
                // this is only for example of loading
                this.loading = true;
                API.register(this.login.league, this.login.email, this.login.password).then(json => {
                    this.loading = false;
                    this.$router.push('/');
                });
            },
            goToPhase2() {
                this.phase1 = false;
                this.phase2 = true;
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