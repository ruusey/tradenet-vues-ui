<template>
  <div id="app">
    <h1>TradeNet - TradeStation</h1>
    <div id="account-info">
      <h3>Account: {{this.account.email}}</h3>
      <h3>{{this.account.accountName}}</h3>
      <h3 v-if="this.balances[0]">Balance: {{this.balances[0].cashAvailableForTrading}}</h3>
    </div>
    
    
    <label for="ticker-input">Search: </label>
    <input v-on:keyup.enter="handleSubmit" type="text" id="ticker-input" v-model="tickerSearch">
    <label for="chart-input">Chart: </label>
    <input type="text" id="chart-input" v-model="currChart">
    <div>
      <trading-vue :data="this.charts[0]" :width="width" :height="height"
          :title-txt="this.titles[0]"
          :toolbar="true"
          :overlays="overlays">
      </trading-vue>
      
      <trading-vue :data="this.charts[1]" :width="width" :height="height"
          :title-txt="this.titles[1]"
          :toolbar="true"
          :overlays="overlays">
      </trading-vue>
      
      <trading-vue :data="this.charts[2]" :width="width" :height="height"
          :title-txt="this.titles[2]"
          :toolbar="true"
          :overlays="overlays">
      </trading-vue>
      
      <trading-vue :data="this.charts[3]" :width="width" :height="height"
          :title-txt="this.titles[3]"
          :toolbar="true"
          :overlays="overlays">
      </trading-vue>
    </div>
   
  </div>
</template>

<script>
import { DataCube } from 'trading-vue-js'
import Data from './assets/data.json'
import TradeNetAccountService from './services/tradenet-account.js';
import TestOverlay from './components/TestOverlay.vue'
import TradeNetDataService from './services/tradenet-data.js'
export default {
    name: 'App',
    props: ['width', 'height', 'colors'],
    components:{
      //HelloWorld
    },
    data() {
        return {
            account:{},
            balances:[],
            tickerSearch:'',
            currChart:0,
            currentTicker:'',
            titles:{},
            charts: [new DataCube([Data]), new DataCube(Data),new DataCube([Data]),new DataCube([Data])],
            overlays: [TestOverlay]
        }
    },
    methods:{
      getQuickchart(id, symbol){
        this.titles[id]=symbol
        this.currentTicker = symbol;
        var candles = [];
         TradeNetDataService.quickchart(symbol).then(res => {
              for (var i = 0; i < res.length; i++){
                    let obj = res[i];
                    let ohlc = [new Date(obj['datetime']).getTime(),obj['open'],obj['high'],obj['low'],obj['close'],obj['volume']];
                    candles.push(ohlc);
              }}).catch(err => {
                     console.log(err)
              })
        this.charts[id].set('chart.data', candles);
      },
      handleSubmit(){
        this.titles[this.currChart]=this.tickerSearch;
        var candles = [];
         TradeNetDataService.quickchart(this.tickerSearch).then(res => {
              for (var i = 0; i < res.length; i++){
                    let obj = res[i];
                    let ohlc = [new Date(obj['datetime']).getTime(),obj['open'],obj['high'],obj['low'],obj['close'],obj['volume']];
                    candles.push(ohlc);
              }}).catch(err => {
                     console.log(err)
              })

        this.charts[this.currChart].set('chart.data', candles);

      }
    },
    mounted(){
     TradeNetAccountService.accountByEmail('ru@trade.net').then(res => {
                     this.account=res

              }).catch(err => {
                     console.log(err)
              }).finally(()=>{
                            TradeNetAccountService.setAuth(this.account.accountGuid);

              })
     
      this.getQuickchart(0,'HUT');
      this.getQuickchart(1,'QQQ');
      this.getQuickchart(2,'SPY');
      this.getQuickchart(3,'BTCUSDT');
      this.tickerSearch='HUT'
       TradeNetAccountService.accountBalance().then(res => {
       this.balances=res
              }).catch(err => {
                     console.log(err)
              })
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.trading-vue{
  display:block;
  float:left;
  width:45% !important;
  margin-bottom:1em;
  padding:0px;
}
#account-info{
  text-align:left;
}
</style>
