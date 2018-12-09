import DB from "./database";

export default class User {
    static save(json) {
        DB.setItegm('name', json.username);
        DB.setItegm('league', json.league);
    }

    static get name() {
        return DB.getItem('name');
    }

    static get league() {
        return DB.getItem('league');
    }
}