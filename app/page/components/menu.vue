<template>
    <div class="md-layout-item md-layout">
        <md-toolbar v-if=logged class="md-primary" md-elevation="0">
            <md-avatar class="md-large float-right margin-5">
                <md-icon>account_circle</md-icon>
            </md-avatar>
            <span class="md-title">{{ user.name }}</span>
            <span class="md-subheading"> {{ user.league }}</span>
        </md-toolbar>

        <md-toolbar v-if=!logged class="md-primary" md-elevation="0">

        </md-toolbar>

        <md-list v-if=logged>
            <router-link to="/players">
                <md-list-item>
                    <md-icon>people</md-icon>
                    <span class="md-list-item-text">Players</span>
                </md-list-item>
            </router-link>


            <router-link to="/matches">
                <md-list-item>
                    <md-icon>list</md-icon>
                    <span class="md-list-item-text">Matches</span>
                </md-list-item>
            </router-link>

            <router-link to="/teams">
                <md-list-item>
                    <md-icon>favorite</md-icon>
                    <span class="md-list-item-text">Teams</span>
                </md-list-item>
            </router-link>

            <md-list-item @click="$emit('menu-logout')">
                <md-icon>exit_to_app</md-icon>
                <span class="md-list-item-text">Log-Out</span>
            </md-list-item>
        </md-list>
        <md-list v-if=!logged>
            <router-link to="/signin">
                <md-list-item>
                    <md-icon>exit_to_app</md-icon>
                    <span class="md-list-item-text">Log-In</span>
                </md-list-item>
            </router-link>
        </md-list>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        props: ['menuVisible', 'user', 'logged'],
        data: () => ({})
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

    .md-title {
        line-height: 40px;
    }

    .md-subheading {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }

    .md-list {
        width: 100%;
    }
</style>