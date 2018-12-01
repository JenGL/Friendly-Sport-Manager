<template>
    <div class="page-container">
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <Header :hideLogInfo=false :logged=logged v-on:menu-click="toggleMenu"></Header>
            </md-app-toolbar>
            <md-app-drawer :md-active.sync="menuVisible">
                <Menu :logged=logged :user=user menuVisible=menuVisible
                      v-on:menu-player="showTab('players')"
                      v-on:menu-matches="showTab('matches')"
                      v-on:menu-teams="showTab('teams')"
                      v-on:menu-logout="logOut"></Menu>
            </md-app-drawer>

            <md-app-content>
                <Matches v-if="content.matches" v-on:click-player="showTab('match', $event)"></Matches>
                <Players v-if="content.players" v-on:click-player="showTab('player', $event)"></Players>
                <Teams v-if="content.teams"></Teams>
                <Player v-if="content.player" :playerId="selectedPlayer"></Player>
                <Match v-if="content.match" :matchId="selectedMatch"></Match>
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
    import Player from './components/player.vue';
    import Match from './components/match.vue';

    export default {
        name: 'Home',
        components: {
            Header,
            Menu,
            Players,
            Teams,
            Matches,
            Player,
            Match
        },
        data: () => ({
            menuVisible: false,
            logged: false,
            selectedPlayer: null,
            selectedMatch: null,
            content: {
                players: false,
                matches: false,
                teams: false,
                player: false,
                match: false
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
            showTab(tab, id) {
                if(tab === 'player') {
                    this.selectedPlayer = id;
                } else if(tab === 'match') {
                    this.selectedMatch = id;
                }
                Object.keys(this.content).forEach(key => this.content[key] = false);
                this.content[tab] = true;
                this.toggleMenu(false);
            },
            logOut() {
                DB.removeItem('token');
                DB.removeItem('expires');
                this.logged = false;
                this.toggleMenu();
            },
            toggleMenu(visible) {
                if(visible != null)
                    this.menuVisible = visible;
                else
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