export default class User {
    constructor() {
        if(User.instance == null) User.instance = this;
        return User.instance;
    }

    static get created(){
        return User.instance != null;
    }

    static getInstance(){
        return new User();
    }

    static save(json) {
        const user = new User();
        user.name = json.username;
        user.leagues = json.leagues;
        user.currentLeague = json.leagues[0];
        return user;
    }

    destroy() {
        delete this.name;
        delete this.leagues;
        delete this.currentLeague;
        delete User.instance;
    }

    get name() {
        return this._name;
    }

    set name(n) {
        this._name = n;
    }

    get leagues() {
        return this._league;
    }

    set leagues(l) {
        this._league = l;
    }

    set currentLeague(l) {
        this._crtLeague = l;
    }

    get currentLeague() {
        return this._crtLeague;
    }

    isAdmin(league) {
        return this.leagues.find((l) => l.league === league).admin;
    }

    switchLeague(league) {
        this.currentLeague = this.leagues.find((l) => l.league === league);
    }
}