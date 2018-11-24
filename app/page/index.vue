<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <Header :hideLogInfo=false :logged=logged v-on:menu-click="toggleMenu"></Header>
            </md-app-toolbar>
            <md-app-drawer :md-active.sync="menuVisible">
                <Menu :logged=logged :user=user menuVisible=menuVisible
                      v-on:menu-player="showPlayers"
                      v-on:menu-matches="showMatches"
                      v-on:menu-teams="showTeams"
                      v-on:menu-logout="logOut"></Menu>
            </md-app-drawer>

            <md-app-content>
                <Matches v-if="content.matches"></Matches>
                <Players v-if="content.players"></Players>
                <Teams v-if="content.teams"></Teams>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import Header from './components/header.vue';
    import Menu from './components/menu.vue';
    import DB from '../js/database';
    import Matches from './components/matches.vue';
    import Players from './components/players.vue';
    import Teams from './components/teams.vue';

    export default {
        name: 'Reveal',
        components: {
            Header,
            Menu,
            Players,
            Teams,
            Matches
        },
        data: () => ({
            menuVisible: false,
            logged: false,
            content: {
                players: false,
                matches: false,
                teams: false
            },
            user: {
                name: "GianGigi",
                league: "Arezzo"
            }
        }),
        created: function () {
            const token = DB.getItem('token');
            const expires = DB.getItem('expires');
            if (expires != null && Date.now() / 1000 | 0 < Number.parseInt(expires) && token != null) {
                this.logged = true;
            }
        },
        methods: {
            showPlayers() {
                this.content.players = true;
                this.content.matches = false;
                this.content.teams = false;
                this.toggleMenu();
            },
            showMatches() {
                this.content.players = false;
                this.content.matches = true;
                this.content.teams = false;
                this.toggleMenu();
            },
            showTeams(){
                this.content.players = false;
                this.content.matches = false;
                this.content.teams = true;
                this.toggleMenu();
            },
            logOut() {
                DB.removeItem('token');
                DB.removeItem('expires');
                this.logged = false;
                this.toggleMenu();
            },
            toggleMenu() {
                this.menuVisible = !this.menuVisible;
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