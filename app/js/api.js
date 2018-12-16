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

    static login(username, password) {
        const formData = new FormData();
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

        return GET(API_URL + 'players.php?league=' + User.currentLeague.league, true);
    }

    static matches() {
        return GET(API_URL + 'matches.php?league=' + User.currentLeague.league, true);
    }

    static teams() {
        return GET(API_URL + 'teams.php?league=' + User.currentLeague.league, true);
    }

    static match(id) {
        return GET(API_URL + 'match.php?id=' + id, true);
    }

    static player(id) {
        return GET(API_URL + 'player.php?id=' + id, true);
    }

    static addPlayer(name, account, role) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('league', User.currentLeague.league);
        if(account && account !== "") formData.append('account', account);
        if(role && role !== "")formData.append('role', role);
        return POST(API_URL + 'player.php', formData, true, true);
    }

    static addMatch(team1, team2, date){
        const formData = new FormData();
        formData.append('data', date);
        formData.append('team1', JSON.stringify(team1));
        formData.append('team2', JSON.stringify(team2));
        formData.append('league', User.currentLeague.league);
        return POST(API_URL + 'match.php', formData, true, true);
    }
}

// PRIVATE FUNCTIONS

function POST(url, body, needAuth = false, needAdmin = false) {
    const cfg = {
        method: "POST",
        body: body
    };
    return exec(url, cfg, needAuth, needAdmin);
}

function GET(url, needAuth = false, needAdmin = false) {
    return exec(url, {method: "GET",}, needAuth, needAdmin);
}

function exec(url, cfg, needAuth, needAdmin) {
    const headers = new Headers();
    if (needAuth) {
        if (TokenManager.isTokenValid()) {
            headers.append("Authorization", "Bearer " + TokenManager.getToken());
        } else {
            Api.notifyError({error: "Not authorized"});
            return Promise.reject({error: "Not authorized"});
        }
        if(needAdmin && !User.currentLeague.admin) {
            Api.notifyError({error: "Not authorized"});
            return Promise.reject({error: "Not admin"});
        }
        cfg.headers = headers;
    }
    return fetch(url, cfg)
        .then(res => {
            if(res.status === 200) return res.json();
            if(res.status >= 400) throw res;
        })
        .catch(err => err.json().then(error => {
            Api.notifyError(error);
            throw error;
        }));
}