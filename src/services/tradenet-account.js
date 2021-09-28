import api from './api.js';


class TradeNetAccountService {
  
    constructor() {
        this.url_client = 'admin/account';
    }


    accountByEmail(email) {
        return api.post(`admin/account/login`, {'email':email});
    }

    accountBalance(){
        return api.get(`admin/account/balances`,{});
    }
    setAuth(guid){
        api.setAuthHeader(guid);
    }

}
export default new TradeNetAccountService;