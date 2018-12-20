<template>
    <div>
        <div class="team-card md-layout md-alignment-center-center">
            <md-card class="md-accent md-layout wrapper md-layout-item">
                <div class="md-layout-item team">
                    <span v-for="player of team1" :key="player.name">{{ player.name }}</span>
                </div>
                <div class="md-layout-item md-layout md-alignment-center-center">
                    <span class="vs md-accent">{{team1_score}} - {{team2_score}}</span>
                </div>
                <div class="md-layout-item team team2">
                    <span v-for="player of team2" :key="player.name">{{ player.name }}</span>
                </div>
            </md-card>
        </div>
        <div class="score-card md-layout md-alignment-center-center">
            <md-table md-height="auto" v-model="all" md-card md-fixed-header
                      class="md-primary md-layout table md-layout-item">
                <md-table-row class="row" slot="md-table-row" slot-scope="{ item }"
                              @click="$emit('click-player',item.id)">
                    <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Goals" md-numeric>{{ item.goal }}</md-table-cell>
                    <md-table-cell md-label="AutoGoals" md-numeric>{{ item.autogoal }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    import API from '../../js/api';
    import RouteBackMixin from './route_back_mixin';

    export default {
        name: 'Match',
        mixins: [RouteBackMixin],
        data: () => ({
            team1: [],
            team2: [],
            all: [],
            team1_score: "",
            team2_score: ""
        }),
        mounted: function () {
            if (!this.routingBack) {
                API.match(this.$route.params.id)
                    .then(json => {
                        this.team1 = json.team_1;
                        this.team2 = json.team_2;
                        this.all = json.team_1.concat(json.team_2).filter((p) => p.goal + p.autogoal > 0);
                        this.team1_score = json.team_1.reduce((r, p) => parseInt(r) + parseInt(p.goal), 0) + json.team_2.reduce((r, p) => parseInt(r) + parseInt(p.autogoal), 0);
                        this.team2_score = json.team_2.reduce((r, p) => parseInt(r) + parseInt(p.goal), 0) + json.team_1.reduce((r, p) => parseInt(r) + parseInt(p.autogoal), 0);
                    });
            }

        },
        methods: {
            toData(data) {
                return new Date(data * 1000).toLocaleDateString()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .team span {
        width: 100%;
        display: inline-block;
        font-size: 28px;
        line-height: 50px;
        font-style: italic;
        text-shadow: -1px 0 back, 0 1px back, 1px 0 back, 0 -1px back;
    }

    .md-table-content {
        height: auto;
    }

    .team2 span {
        text-align: right;
    }

    .wrapper {
        max-width: 500px;
        padding: 30px;
    }

    .table {
        max-width: 500px;
    }

    .vs {
        font-size: 40px;
        font-style: italic;
        text-shadow: -1px 0 #448aff, 0 1px #448aff, 1px 0 #448aff, 0 -1px #448aff;
    }

    .score-card {
        margin-top: 20px;
    }

    .md-table-row {
        background-color: var(--md-theme-default-primary, #448aff)
    }

    .row {
        cursor: pointer;
    }
</style>