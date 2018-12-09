<template>
    <div v-if="matches.length > 0">
        <md-table v-model="matches" md-sort="data" md-sort-order="asc" md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Matches</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" @click="$emit('click-match',item.id)">
                <md-table-cell md-label="Data" md-sort-by="data">{{ item.data }}</md-table-cell>
                <md-table-cell md-label="Team 1">{{ item.team_1 }}</md-table-cell>
                <md-table-cell md-label="Team 2">{{ item.team_2 }}</md-table-cell>
                <md-table-cell md-label="Outcome">{{ item.team_1_score }} - {{ item.team_1_score }}</md-table-cell>
            </md-table-row>
        </md-table>

    </div>
</template>

<script>
    import API from '../../js/api';

    export default {
        name: 'Matches',
        data: () => ({
            matches: []
        }),
        mounted: function () {
            API.matches()
                .then(json => {
                    json.forEach((e, i) => {
                        e.team_1 = e.team_1.reduce((acc, e) => acc + "\n" + e);
                        e.team_2 = e.team_2.reduce((acc, e) => acc + "\n" + e);
                    });
                    this.matches = json;
                });
        }
    }
</script>

<style lang="scss" scoped>
    .md-table-row{
        cursor: pointer;
    }
</style>