<template>
    <div class="wrapper centered-container">
        <md-content class="md-elevation-3 md-medium-size">
            <div class="title">
                <img src="../../img/logo.png">
                <div class="md-title">Add Player</div>
            </div>

            <div class="form">
                <md-field>
                    <label>Name</label>
                    <md-input v-model="name" autofocus></md-input>
                </md-field>
                <md-field>
                    <label>Player Role (optional)</label>
                    <md-input v-model="role" autofocus></md-input>
                </md-field>
                <md-field>
                    <label>Account User Name (optional)</label>
                    <md-input v-model="account" autofocus></md-input>
                </md-field>
            </div>

            <div class="actions md-layout md-alignment-center-space-between">
                <md-button class="md-raised md-primary" @click="addplayer">ADD</md-button>
            </div>

            <div class="loading-overlay" v-if="loading">
                <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>

            <transition name="fade">
                <div class="success-overlay" v-if="success">
                    <md-icon class="md-size-3x">done</md-icon>
                </div>
            </transition>

            <transition name="fade">
                <div class="fail-overlay" v-if="failed">
                    <md-icon class="md-size-3x">clear</md-icon>
                </div>
            </transition>

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
                <span>{{ snackbarMessage }}</span>
                <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
            </md-snackbar>

        </md-content>

    </div>
</template>

<script>
    import API from '../../js/api';
    import RouteBackMixin from './route_back_mixin';

    export default {
        name: 'AddPlayer',
        mixins:[RouteBackMixin],
        data: () => ({
            name: "",
            account: "",
            role: "",
            loading: false,
            success: false,
            failed: false,
            showSnackbar: false,
            snackbarFailMessage: "Plyaer was not added",
            snackbarSuccessMessage: "Plyaer added successefully",
            snackbarMessage: ""
        }),
        mounted(){
            this.routeBackIfNotAdmin();
        },
        methods: {
            addplayer() {
                this.loading = true;
                API.addPlayer(this.name, this.account, this.role).then(() => {
                    this.name = "";
                    this.account = "";
                    this.role = "";
                    this.loading = false;
                    this.success = true;
                    this.snackbarMessage = this.snackbarSuccessMessage;
                    this.showSnackbar = true;
                    setTimeout(() => this.success = false, 500);
                }).catch((err) => {
                    console.error(err);
                    this.name = "";
                    this.account = "";
                    this.role = "";
                    this.loading = false;
                    this.failed = true;
                    this.showSnackbar = true;
                    this.snackbarMessage = this.snackbarFailMessage;
                    setTimeout(() => this.failed = false, 500);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-table-row {
        cursor: pointer;
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

    .md-content {
        z-index: 1;
        padding: 40px;
        width: 100%;
        max-width: 400px;
        position: relative;
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
        .loading-overlay, .success-overlay, .fail-overlay {
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

        .success-overlay {
            background: rgba(0, 179, 0, 0.9);
        }

        .fail-overlay {
            background: rgba(179, 1, 0, 0.9);
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .1s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
        {
            opacity: 0;
        }
    }
</style>