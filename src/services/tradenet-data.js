import api from './api.js';


class TradeNetDataService {
    /**
     * Constructor
     */
    constructor() {

        // Set URLs
        this.url_client = 'quickchart';
    }

    
    quickchart(symbol) {
        return api.get(`quickchart/${symbol}`, {});
    }

    
    getCryptoPairs(){
        return api.get(`crypto/pairs/binance`,{});
    }

    getCryptoStats24Hr(){
        return api.get(`crypto/info/binance`,{});
    }

    
    getCryptoQuote(symbol) {
        return api.get(`crypto/quote/${symbol}`, {});
    }

    getStockQuote(symbol) {
        return api.get(`stocks/tda/quote/${symbol}`, {});
    }


    getStockFundamental(symbol){
        return api.get(`fundamental/tda/${symbol}`, {});
    }

    
}
export default new TradeNetDataService;