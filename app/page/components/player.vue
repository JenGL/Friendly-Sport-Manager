<template>
    <div v-if="player" class="md-layout md-alignment-top-center">
        <div class="md-layout-item content-wrapper">
            <div class="md-layout general-info">
                <md-icon class="md-layout-item md-size-5x">account_circle</md-icon>
                <div class="margin-left-20 md-layout-item md-layout md-alignment-center-left">
                    <div class="md-layout-item">
                        <p class="md-title">{{player.Name}}</p>
                        <p class="md-subheading">Role: {{player.Role}}</p>
                        <p class="md-subheading">Points: {{player.Points}}</p>
                        <p class="md-subheading">Goals: {{player.Goals}}</p>
                    </div>
                </div>
            </div>
            <md-table class="md-medium-show" v-model="player.Matches" md-sort="data" md-sort-order="asc" md-card md-fixed-header>
                <md-table-toolbar>
                    <h1 class="md-title">Matches</h1>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID" md-numeric="">{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="Data" md-sort-by="data">{{ toData(item.data) }}</md-table-cell>
                    <md-table-cell md-label="Outcome" md-numeric>{{ outcome(item.points) }}</md-table-cell>
                    <md-table-cell md-label="Points" md-numeric>{{ item.points }}</md-table-cell>
                    <md-table-cell md-label="Goals" md-numeric>{{ item.goals }}</md-table-cell>
                </md-table-row>
            </md-table>

            <md-table class="md-small-show" v-model="player.Matches" md-sort="data" md-sort-order="asc" md-fixed-header>
                <md-table-toolbar>
                    <h1 class="md-title">Matches</h1>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Data" md-sort-by="data">{{ toData(item.data) }}</md-table-cell>
                    <md-table-cell md-label="Outcome" md-numeric>{{ outcome(item.points) }}</md-table-cell>
                    <md-table-cell md-label="Goals" md-numeric>{{ item.goals }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Player',
        props: ['playerId'],
        data: () => ({
            player: null
        }),
        mounted: function () {
            fetch('https://raw.githubusercontent.com/JenGL/c4lc3tt0_s3rv3r/master/player/' + this.playerId + '.json')
                .then(res => res.json())
                .then(json => {
                    this.player = json;
                });
        },
        methods: {
            outcome(points) {
                switch (points) {
                    case 3:
                        return "Victory";
                    case 1:
                        return "Draw";
                    case 0:
                        return "Loss";
                }
            },
            toData(data) {
                return new Date(data * 1000).toLocaleDateString()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .general-info{
        margin: 30px 0;
    }

    .md-icon.md-layout-item {
        width: 120px;
        height: 120px;
        flex: 0 0;
    }

    .content-wrapper {
        max-width: 680px;
    }

    .margin-left-20 {
        margin-left: 20px;
    }

    .md-table {
        display: none;
    }

    @media only screen and (max-width: 960px) {
        .md-table.md-small-show {
            display: flex;
        }
    }

    @media only screen and (min-width: 960px) {
        .md-table.md-medium-show {
            display: flex;
        }
    }
</style>