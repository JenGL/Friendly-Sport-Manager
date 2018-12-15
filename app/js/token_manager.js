import DB from './database';
import User from './User';

export default class TokenManager{
    static saveToken(json) {
        DB.setItem('token', json.token);
        DB.setItem('expires', json.expires);
    }

    static getToken() {
        return DB.getItem('token');
    }

    static isTokenValid() {
        if(DB.getItem('token') == null || DB.getItem('expires') == null || User.currentLeague == null) return false;
        const token = DB.getItem('token');
        const expires = mysqlTimeStampToDate(DB.getItem('expires'));
        const today = new Date();
        return (token && expires && expires > today);
    }
}

function mysqlTimeStampToDate(timestamp) {
    const t = timestamp.split(/[- :]/);
    return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
}