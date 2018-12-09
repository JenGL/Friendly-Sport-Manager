import DB from './database';

export default class TokenManager{
    static saveToken(json) {
        DB.setItegm('token', json.token);
        DB.setItegm('expires', json.expires);
    }

    static getToken() {
        return DB.getItem('token');
    }

    static isTokenValid() {
        if(DB.getItem('token') == null || DB.getItem('expires') == null || DB.getItem('admin') == null) return false;
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