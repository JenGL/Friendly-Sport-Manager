import User from '../../js/User';

export default {
    data: () => ({
        routingBack: false
    }),
    mounted: function () {
        if (!User.created) this.routeBack();

    },
    methods: {
        routeBackIfNotAdmin() {
            if (!User.created || !User.getInstance().currentLeague.admin) this.routeBack();
        },
        routeBack(){
            this.$router.push("/");
            this.routingBack = true;
        }
    }
};