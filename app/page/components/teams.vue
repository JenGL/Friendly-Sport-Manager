<template>
    <div v-if="teams.length > 0">
        <md-table v-model="teams" md-sort="data" md-sort-order="asc" md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Matches</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" @click="$emit('click-team',item.id)">
                <md-table-cell md-label="Players">{{ item.team }}</md-table-cell>
                <md-table-cell md-label="Played" md-numeric>{{ item.played }}</md-table-cell>
                <md-table-cell md-label="Win %" md-numeric>{{ item.win / item.played}}</md-table-cell>
            </md-table-row>
        </md-table>

    </div>
</template>

<script>
    import API from '../../js/api';

    export default {
        name: 'Teams',
        data: () => ({
            teams: []
        }),
        mounted: function () {
            API.teams()
                .then(json => {
                    json.forEach(t => {
                        t.team = t.p1_name + " - " + t.p2_name + " - " + t.p3_name + " - " + t.p4_name + " - " + t.p5_name;
                    });
                    this.teams = json
                });
        }
    }
</script>

<style lang="scss" scoped>
    .md-table-row {
        cursor: pointer;
    }
</style>