import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'reset-css';
import './style.css';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'; // Default Material Theme

Vue.use(VueMaterial);
Vue.use(VueRouter);

const routes = [
    {
        path: '/*',
        name: 'home',
        component: () => import('./page/index.vue')
    }];

const router = new VueRouter({
    routes
});

new Vue({
    router,
}).$mount("#vue_root");