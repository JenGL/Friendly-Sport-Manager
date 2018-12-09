<template>
    <div v-if="player" class="md-layout md-alignment-top-center">
        <div class="md-layout-item content-wrapper">
            <div class="md-layout general-info">
                <md-icon class="md-layout-item md-size-5x">account_circle</md-icon>
                <div class="margin-left-20 md-layout-item md-layout md-alignment-center-left">
                    <div class="md-layout-item">
                        <p class="md-title">{{player.name}}</p>
                        <p class="md-subheading">Role: {{player.role}}</p>
                        <p class="md-subheading">Points: {{player.points}}</p>
                        <p class="md-subheading">Goals: {{player.goal}}</p>
                    </div>
                </div>
            </div>
            <md-table md-height="auto" class="md-primary md-medium-show" v-model="player.matches" md-sort="data" md-sort-order="asc" md-card md-fixed-header>
                <md-table-toolbar>
                    <h1 class="md-title">Matches</h1>
                </md-table-toolbar>

                <md-table-row class="row" slot="md-table-row" slot-scope="{ item }" @click="$emit('click-match',item.id)">
                    <md-table-cell md-label="ID" md-numeric="">{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="Data" md-sort-by="data">{{ item.data }}</md-table-cell>
                    <md-table-cell md-label="Outcome" md-numeric>{{ outcome(item.points) }}</md-table-cell>
                    <md-table-cell md-label="Points" md-numeric>{{ item.points }}</md-table-cell>
                    <md-table-cell md-label="Goals" md-numeric>{{ item.goal }}</md-table-cell>
                </md-table-row>
            </md-table>

            <md-table md-height="auto" class="md-primary md-small-show" v-model="player.matches" md-sort="data" md-sort-order="asc" md-fixed-header>
                <md-table-toolbar>
                    <h1 class="md-title">Matches</h1>
                </md-table-toolbar>

                <md-table-row class="row" slot="md-table-row" slot-scope="{ item }" @click="$emit('click-match',item.id)">
                    <md-table-cell md-label="Data" md-sort-by="data">{{ item.data }}</md-table-cell>
                    <md-table-cell md-label="Outcome" md-numeric>{{ outcome(item.points) }}</md-table-cell>
                    <md-table-cell md-label="Goals" md-numeric>{{ item.goal }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    import API from "../../js/api";

    export default {
        name: 'Player',
        props: ['playerId'],
        data: () => ({
            player: null
        }),
        mounted: function () {
            API.player(this.playerId)
                .then(json => {
                    this.player = json;
                });
        },
        methods: {
            outcome(points) {
                switch (points) {
                    case "3":
                        return "Victory";
                    case "1":
                        return "Draw";
                    case "0":
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

    .md-table-row {
        background-color: var(--md-theme-default-primary, #448aff)
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
    .row{
        cursor: pointer;
    }
</style>