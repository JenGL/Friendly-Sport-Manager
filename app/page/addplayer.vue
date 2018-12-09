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
                <md-content>

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
        name: 'AddPlayer',
        components: {
            Header,
            Menu
        },
        data: () => ({
            menuVisible: false,
            logged: false,
            loading: false
        }),
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>