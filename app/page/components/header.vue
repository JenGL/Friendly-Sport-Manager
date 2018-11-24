<template>
    <div class="md-layout-item md-layout">
        <md-button class="md-icon-button" @click="$emit('menu-click')">
            <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title line-height-40">Amici Del Calcetto</span>
        <div v-if="!logged && !hideLogInfo" class="md-toolbar-section-end">
            <router-link to="/signin" class="float-right margin-5"><span class="color-white">Login</span></router-link>
            |
            <router-link to="/register" class="float-right margin-5 color-white"><span
                    class="color-white">Register</span></router-link>
        </div>
        <div v-if="logged && !hideLogInfo" class="md-toolbar-section-end">
            <router-link to="/profile">
                <span class="line-height-40 color-white">Profile</span>
                <md-avatar class="md-medium float-right margin-5">
                    <md-icon>account_circle</md-icon>
                </md-avatar>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Reveal',
        props: ['logged','hideLogInfo'],
        data: () => ({

        })
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

    .line-height-40 {
        line-height: 40px;
    }
</style>