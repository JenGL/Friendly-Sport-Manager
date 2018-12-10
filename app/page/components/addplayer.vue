<template>
    <div class="wrapper">
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
                    <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
                </div>
            </transition>

        </md-content>

    </div>
</template>

<script>
    import API from '../../js/api';

    export default {
        name: 'Matches',
        data: () => ({
            name: "",
            account: "",
            role: "",
            loading: false,
        }),
        methods: {
            addplayer() {
                this.loading = true;
                API.addPlayer(this.name, this.account, this.role).then(() => {
                    this.loading = false;
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
        .loading-overlay, .success-overlay {
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

        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
        }
    }
</style>