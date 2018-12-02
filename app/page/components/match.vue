<template>
    <div>
        <div class="team-card md-layout md-alignment-center-center">
            <md-card class="md-accent md-layout wrapper md-layout-item">
                <div class="md-layout-item team">
                    <span v-for="player of team1" :key="player.Name">{{ player.Name }}</span>
                </div>
                <div class="md-layout-item md-layout md-alignment-center-center">
                    <span class="vs md-accent">3 - 2</span>
                </div>
                <div class="md-layout-item team team2">
                    <span v-for="player of team2" :key="player.Name">{{ player.Name }}</span>
                </div>
            </md-card>
        </div>
        <div class="score-card md-layout md-alignment-center-center">
            <md-table v-model="all" md-card md-fixed-header class="md-primary md-layout table md-layout-item">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Name">{{ item.Name }}</md-table-cell>
                    <md-table-cell md-label="Goals" md-numeric>{{ item.Goals }}</md-table-cell>
                    <md-table-cell md-label="AutoGoals" md-numeric>{{ item.Autogoals }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Match',
        props: ['matchId'],
        data: () => ({
            team1: [],
            team2: [],
            all: []
        }),
        mounted: function () {
            fetch('https://raw.githubusercontent.com/JenGL/c4lc3tt0_s3rv3r/master/match/' + this.matchId + '.json')
                .then(res => res.json())
                .then(json => {
                    this.team1 = json.team_1;
                    this.team2 = json.team_2;
                    this.all = json.team_1.concat(json.team_2).filter((p) => p.Goals + p.Autogoals > 0);
                });
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

    .team2 span {
        text-align: right;
    }

    .wrapper {
        max-width: 500px;
        padding: 30px;
    }

    .table{
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
</style>