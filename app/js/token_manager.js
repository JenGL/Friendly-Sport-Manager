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
        const token = DB.getItem('token');
        const expires = mysqlTimeStampToDate(DB.getItem('expires'));
        const today = new Date();
        return (token && expires && expires > today);
    }
}

function mysqlTimeStampToDate(timestamp) {
    //function parses mysql datetime string and returns javascript Date object
    //input has to be in this format: 2007-06-05 15:26:02
    const regex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
    const parts = timestamp.replace(regex, "$1 $2 $3 $4 $5 $6").split(' ');
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
}