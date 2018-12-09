import DB from "./database";

export default class User {
    static save(json) {
        DB.setItegm('name', json.username);
        DB.setItegm('league', json.league);
        DB.setItegm('admin', json.admin);
    }

    static get name() {
        return DB.getItem('name');
    }

    static get league() {
        return DB.getItem('league');
    }

    static get admin() {
        return DB.getItem('admin');
    }
}