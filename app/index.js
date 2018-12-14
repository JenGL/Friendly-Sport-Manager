import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'reset-css';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css'; // This line here
import './style.scss';

Vue.use(VueMaterial);
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./page/index.vue')
    },
    {
        path: '/addmatch',
        name: 'addmatch',
        component: () => import('./page/index.vue'),
        props: { default: true, tab: 'addmatch' }
    },
    {
        path: '/addplayer',
        name: 'addplayer',
        component: () => import('./page/index.vue'),
        props: { default: true, tab: 'addplayer' }
    },
    {
        path: '/teams',
        name: 'teams',
        component: () => import('./page/index.vue'),
        props: { default: true, tab: 'teams' }
    },
    {
        path: '/matches',
        name: 'matches',
        component: () => import('./page/index.vue'),
        props: { default: true, tab: 'matches' }
    },
    {
        path: '/players',
        name: 'players',
        component: () => import('./page/index.vue'),
        props: { tab: 'players' }
    },
    {
        path: '/match/:id',
        name: 'match',
        component: () => import('./page/index.vue'),
        props: { default: true, tab: 'match' }
    },
    {
        path: '/player/:id',
        name: 'player',
        component: () => import('./page/index.vue'),
        props: { default: true, tab: 'player' }
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import('./page/signin.vue')
    },
    {
        path: '/pswdreset',
        name: 'pswdreset',
        component: () => import('./page/pswdreset.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./page/register.vue')
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
}).$mount("#vue_root");