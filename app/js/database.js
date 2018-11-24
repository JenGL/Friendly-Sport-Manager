export default class DB {
    static setItegm(a,b){
        return localStorage.setItem(a,b);
    }

    static getItem(a) {
        return localStorage.getItem(a);
    }

    static removeItem(a) {
        return localStorage.removeItem(a);
    }
}