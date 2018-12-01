<template>
    <div class="md-layout md-alignment-top-space-around">
        <md-card class="md-layout-item" v-for="(user,index) in userslist" md-with-hover :key=user.id>
            <div @click="$emit('click-player',user.id)">
                <md-ripple>
                    <md-card-area>
                        <md-card-header>
                            <md-card-media>
                                <md-icon class="md-size-3x">account_circle</md-icon>
                            </md-card-media>

                            <md-card-header-text>
                                <div class="md-title">{{ user.Name }}</div>
                                <div class="md-subhead">{{ user.Role }}</div>
                            </md-card-header-text>
                        </md-card-header>
                    </md-card-area>
                    <md-card-content class="md-layout">
                        <span class="md-layout-item">Position: {{ index + 1 }}</span> <span class="md-layout-item">Points: {{ user.Points }}</span> <span class="md-layout-item">Goals: {{ user.Goals }}</span>
                    </md-card-content>
                </md-ripple>
            </div>
        </md-card>
    </div>
</template>

<script>
    export default {
        name: 'Players',
        props: ['logged', 'hideLogInfo'],
        data: () => ({
            userslist: []
        }),
        mounted: function() {
            fetch('https://raw.githubusercontent.com/JenGL/c4lc3tt0_s3rv3r/master/players.json')
                .then(res => res.json())
                .then(json => {
                    json.sort(function(a,b){
                        return b.Points - a.Points;
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