<template>
    <div class="md-layout md-alignment-top-space-around">
        <md-card class="md-layout-item" v-for="(user,index) in userslist" md-with-hover :key=user.id :style="{backgroundColor: user.color}">
            <div @click="$emit('click-player',user.id)">
                <md-ripple>
                    <md-card-area >
                        <md-card-header>
                            <md-card-media>
                                <md-icon class="md-size-3x">account_circle</md-icon>
                            </md-card-media>

                            <md-card-header-text>
                                <div class="md-title">{{ user.name }}</div>
                                <div class="md-subhead">{{ user.role }}</div>
                            </md-card-header-text>
                        </md-card-header>
                    </md-card-area>
                    <md-card-content class="md-layout">
                        <span class="md-layout-item">Position: {{ index + 1 }}</span> <span class="md-layout-item">Points: {{ user.points }}</span>
                        <span class="md-layout-item">Goals: {{ user.goal }}</span>
                    </md-card-content>
                </md-ripple>
            </div>
        </md-card>
    </div>
</template>

<script>
    import API from '../../js/api';
    import randomColor from 'randomcolor';

    export default {
        name: 'Players',
        props: ['logged', 'hideLogInfo'],
        data: () => ({
            userslist: []
        }),
        mounted: function () {
            API.players()
                .then(json => {
                    json.sort(function (a, b) {
                        return b.Points - a.Points;
                    });
                    json.forEach(p => {
                        p.color = randomColor({
                            luminosity: 'dark'
                        });
                    });
                    console.log(json);
                    this.userslist = json;
                });
        }
    }
</script>

<style lang="scss" scoped>
    .md-card {
        min-width: 300px;
        margin: 10px;
        display: inline-block;
        vertical-align: top;
    }
</style>