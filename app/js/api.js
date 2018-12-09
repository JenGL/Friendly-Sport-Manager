import TokenManager from './token_manager';
import md5 from 'md5';
import User from "./User";

const errorListener = [];
const API_URL = 'https://amicidelcalcetto.altervista.org/api/';
export default class Api {
    static onError(cb) {
        errorListener.push(cb);
    }

    static notifyError(err) {
        errorListener.forEach(cb => cb(err));
    }

    static register(league, username, password) {
        const formData = new FormData();
        formData.append('league', league);
        formData.append('username', username);
        formData.append('password', md5(password));
        return POST(API_URL + 'register.php', formData)
            .then(json => {
                TokenManager.saveToken(json);
                User.save(json);
                return json;
            });
    }

    static login(league, username, password) {
        const formData = new FormData();
        formData.append('league', league);
        formData.append('username', username);
        formData.append('password', md5(password));
        return POST(API_URL + 'login.php', formData)
            .then(json => {
                TokenManager.saveToken(json);
                User.save(json);
                return json;
            });
    }

    static players() {

        return GET(API_URL + 'players.php?league=' + User.league, true);
    }

    static matches() {
        return GET(API_URL + 'matches.php?league=' + User.league, true);
    }

    static match(id) {
        return GET(API_URL + 'match.php?id=' + id, true);
    }

    static player(id) {
        return GET(API_URL + 'player.php?id=' + id, true);
    }
}

// PRIVATE FUNCTIONS

function POST(url, body, needAuth = false) {
    const cfg = {
        method: "POST",
        body: body
    };
    return exec(url, cfg, needAuth);
}

function GET(url, needAuth = false) {
    return exec(url, {method: "GET",}, needAuth);
}

function exec(url, cfg, needAuth) {
    const headers = new Headers();
    if (needAuth) {
        if (TokenManager.isTokenValid()) {
            headers.append("Authorization", "Bearer " + TokenManager.getToken());
        } else {
            Api.notifyError({error: "Not authorized"});
            return Promise.reject({error: "Not authorized"});
        }
        cfg.headers = headers;
    }
    return fetch(url, cfg)
        .then(res => res.json())
        .catch(err => err.json().then(error => {
            Api.notifyError(error);
            throw error;
        }));
}