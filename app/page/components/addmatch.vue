<template>
    <div class="wrapper">
        <div class="data-div md-layout md-alignment-center-center">

            <md-datepicker class="md-layout-item md-medium-size-50 md-xsmall-size-80" v-model="date">
                <label>Select Date</label>
            </md-datepicker>
        </div>
        <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-90">
                <md-card-area>
                    <md-card-header>
                        <div class="md-title">Team 1</div>
                        <div class="row md-layout margin-top-20">
                            <span class="name md-layout-item md-size-40">Name</span>
                            <span class="goal md-layout-item md-size-25">Goals</span>
                            <span class="autogoal md-layout-item md-size-25">Autogoals</span>
                            <span class="remove md-layout-item md-size-5"></span>
                        </div>
                    </md-card-header>
                </md-card-area>
                <md-card-area>
                    <md-card-content>
                        <div class="row md-layout" v-for="player in teams[0]" :key="player.id">
                            <span class="name md-layout-item md-size-40">{{ player.name }}</span>
                            <span class="goal md-layout-item md-size-25">{{ player.goal }}</span>
                            <span class="autogoal md-layout-item md-size-25">{{ player.autogoal }}</span>
                            <md-button class="remove md-layout-item md-size-10 md-raised md-accent"
                                       @click="removeFromTeam(0, player.id)">X
                            </md-button>
                        </div>
                    </md-card-content>
                </md-card-area>

                <md-card-actions md-alignment="right">
                    <md-button v-if="teams[0].length < 5" @click="showDialog(0)">ADD</md-button>
                </md-card-actions>
            </md-card>

            <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-90">
                <md-card-area>
                    <md-card-header>
                        <div class="md-title">Team 2</div>
                        <div class="row md-layout margin-top-20">
                            <span class="name md-layout-item md-size-40">Name</span>
                            <span class="goal md-layout-item md-size-25">Goals</span>
                            <span class="autogoal md-layout-item md-size-25">Autogoals</span>
                            <span class="remove md-layout-item md-size-5"></span>
                        </div>
                    </md-card-header>
                </md-card-area>
                <md-card-area>
                    <md-card-content>
                        <div class="row md-layout" v-for="player in teams[1]" :key="player.id">
                            <span class="name md-layout-item md-size-40">{{ player.name }}</span>
                            <span class="goal md-layout-item md-size-25">{{ player.goal }}</span>
                            <span class="autogoal md-layout-item md-size-25">{{ player.autogoal }}</span>
                            <md-button class="remove md-layout-item md-size-10 md-raised md-accent"
                                       @click="removeFromTeam(1, player.id)">X
                            </md-button>
                        </div>
                    </md-card-content>
                </md-card-area>

                <md-card-actions md-alignment="right">
                    <md-button v-if="teams[1].length < 5" @click="showDialog(1)">ADD</md-button>
                </md-card-actions>
            </md-card>
        </div>
        <div v-if="teams[0].length === teams[1].length && teams[1].length === 5 && this.date !== ''"
             class="submit-div md-layout md-alignment-center-center">
            <md-button class="md-accent md-raised" @click="submitMatch()">SUBMIT</md-button>
        </div>
        <md-dialog :md-active.sync="dialog.show">
            <md-dialog-title>Preferences</md-dialog-title>
            <md-dialog-content>
                <md-steppers :md-active-step.sync="dialog.active" md-linear>
                    <md-step id="first" md-label="Select Player" :md-done.sync="dialog.first">
                        <div class="p_row md-layout md-elevation-2" v-for="player in players" :key="player.id"
                             @click="selectPlayer(player)">
                            <span class="md-layout-item md-size-100">{{player.name}}</span>
                        </div>
                    </md-step>

                    <md-step id="second" md-label="Set Scores" :md-done.sync="dialog.second">
                        <md-field>
                            <label>Goals</label>
                            <md-input v-model="dialog.goal" type="number"></md-input>
                        </md-field>

                        <md-field>
                            <label>Autogoals</label>
                            <md-input v-model="dialog.autogoal" type="number"></md-input>
                        </md-field>
                        <md-dialog-actions>
                            <md-button class="md-primary" @click="submitDialog()">ADD</md-button>
                        </md-dialog-actions>
                    </md-step>
                </md-steppers>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script>
    import API from '../../js/api';

    export default {
        name: 'AddMatch',
        data: () => ({
            date: '',
            players: [],
            teams: [[], []],
            dialog: {
                active: 'first',
                team: null,
                show: false,
                first: false,
                second: false,
                crtPlayer: null,
                goal: 0,
                autogoal: 0
            },
        }),
        mounted: function () {
            API.players()
                .then(json => {
                    this.players = json;
                });
        },
        methods: {
            showDialog(team) {
                this.resetDialog();
                this.dialog.team = team;
                this.dialog.show = true;
            },
            selectPlayer(player) {
                this.dialog.crtPlayer = {name: player.name, id: player.id};
                this.dialog.first = true;
                this.dialog.active = "second";
            },
            submitDialog() {
                this.dialog.crtPlayer.goal = this.dialog.goal;
                this.dialog.crtPlayer.autogoal = this.dialog.autogoal;
                this.teams[this.dialog.team].push(this.dialog.crtPlayer);
                this.players.splice(this.players.findIndex((p) => p.id === this.dialog.crtPlayer.id), 1);
                this.dialog.team = null;
                this.dialog.show = false;
                this.resetDialog();
            },
            resetDialog() {
                this.dialog = {
                    active: 'first',
                    team: null,
                    show: false,
                    first: false,
                    second: false,
                    crtPlayer: null,
                    goal: 0,
                    autogoal: 0
                };
            },
            removeFromTeam(team, id) {
                this.players.push(this.teams[team].splice(this.teams[team].findIndex((p) => p.id === id), 1)[0]);
            },
            submitMatch() {
                API.addMatch(this.teams[0], this.teams[1], this.date.toISOString().slice(0, 10)).then(() => {
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .submit-div, .data-div {
        margin-top: 30px;
    }

    .md-button.remove {
        margin: 6px 0;
    }

    .wrapper {
        width: 100%;
        height: 100%;
    }

    .md-card-actions {
        min-height: 52px;
    }

    .md-card {
        margin-top: 20px;
    }

    .md-card-content {
        min-height: 400px;
    }

    .row {
        width: 100%;
        height: 40px;
        span {
            line-height: 40px;
            font-size: 16px
        }

        span.goal, span.autogoal {
            text-align: center;
        }
    }

    .margin-top-20 {
        margin-top: 20px;
    }

    .p_row {
        width: 100%;
        height: 40px;
        margin: 2px 0;
        padding: 0 20px;
        cursor: pointer;
        span {
            line-height: 40px;
        }
    }

    .p_row:hover {
        background-color: var(--md-theme-default-primary, #d3af72);
    }

    .md-button.remove {
        margin: 1px 0;
    }


</style>