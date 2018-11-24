<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <Header :hideLogInfo=false :logged=logged v-on:menu-click="menuVisible = !menuVisible"></Header>
            </md-app-toolbar>
            <md-app-drawer :md-active.sync="menuVisible">
                <Menu menuVisible=menuVisible></Menu>
            </md-app-drawer>

            <md-app-content>

            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import Header from './components/header.vue';
    import Menu from './components/menu.vue';
    import DB from '../js/database';

    export default {
        name: 'Reveal',
        components: {
            Header,
            Menu
        },
        data: () => ({
            menuVisible: false,
            logged: false,
            loginVisible: false,
            registerVisible: false
        }),
        created: function() {
            const token = DB.getItem('token');
            const expires = DB.getItem('expires');
            if(expires != null && Date.now() / 1000 | 0 < Number.parseInt(expires) && token != null){
                this.logged = true;
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
</style>