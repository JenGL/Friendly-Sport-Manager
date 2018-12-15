import DB from "./database";

export default class User {
    static save(json) {
        DB.setItem('name', json.username);
        DB.setItem('leagues', JSON.stringify(json.leagues));
        DB.setItem('leagues', JSON.stringify(json.leagues));
        DB.setItem('currentLeague', JSON.stringify(json.leagues[0]));
    }

    static get name() {
        return DB.getItem('name');
    }

    static get leagues() {
        return JSON.parse(DB.getItem('leagues'));
    }

    static set currentLeague(l) {
        if (l) {
            DB.setItem('currentLeague', JSON.stringify(l));
        }
    }

    static get currentLeague() {
        return JSON.parse(DB.getItem('currentLeague'));
    }

    static isAdmin(league) {
        return User.leagues.find((l) => l.league === league).admin;
    }

    static switchLeague(name) {
        User.currentLeague = User.leagues.find((l) => l.league === name);
    }
}