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
                <Matches v-if="content.matches" v-on:click-match="showTab('match', $event)"></Matches>
                <Players v-if="content.players" v-on:click-player="showTab('player', $event)"></Players>
                <Teams v-if="content.teams"></Teams>
                <Player v-if="content.player" :playerId="selectedPlayer" v-on:click-match="showTab('match', $event)"></Player>
                <Match v-if="content.match" :matchId="selectedMatch"  v-on:click-player="showTab('player', $event)"></Match>
            </md-app-content>
        </md-app>
        <md-speed-dial v-if="admin" class="md-bottom-right" md-direction="top">
            <md-speed-dial-target>
                <md-icon>add</md-icon>
            </md-speed-dial-target>

            <md-speed-dial-content >
                <router-link to="/addplayer">
                    <md-button class="md-icon-button"><md-icon>people</md-icon></md-button>
                </router-link>

                <router-link to="/addmatch">
                    <md-button class="md-icon-button"><md-icon>event</md-icon></md-button>
                </router-link>
            </md-speed-dial-content>
        </md-speed-dial>
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
    import API from '../js/api';
    import User from "../js/User";
    import TokenManager from "../js/token_manager";

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
            admin: false,
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
                name: "",
                league: ""
            }
        }),
        created: function () {
            API.onError((err) => {
                if(err.error === "Not authorized") this.logOut()
            });
        },
        mounted(){
            if (TokenManager.isTokenValid()) {
                this.logged = true;
                this.user.name = User.name;
                this.user.league = User.league;
                if(User.admin) {
                    this.admin = true;
                }
            } else {
                this.logged = false;
                this.user.name = "";
                this.user.league = "";
                this.admin = false;
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