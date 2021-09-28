<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <label for="ticker-input">Search: </label>
    <input v-on:keyup.enter="handleSubmit" type="text" id="ticker-input" v-model="ticker">
    <input type="text" id="chart-input" v-model="currChart">
    <trading-vue :data="this.charts[0]" :width="width" :height="height"
        :title-txt="this.titles[0]"
        :toolbar="true"
        :overlays="overlays"
       >
    </trading-vue>
    <hr>
    <trading-vue :data="this.charts[1]" :width="width" :height="height"
        :title-txt="this.titles[1]"
        :toolbar="true"
        :overlays="overlays"
       >
    </trading-vue>
  </div>
</template>

<script>
import { DataCube } from 'trading-vue-js'
import Data from './assets/data.json'
//import HelloWorld from './components/HelloWorld.vue';
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
            currChart:0,
            ticker:'AAPL',
            titles:['AAPL','BTCUSDT'],
            charts: [new DataCube([Data]), new DataCube(Data)],
            overlays: [TestOverlay]
        }
    },
    methods:{
      getQuickchart(id, symbol){
        var candles = [];
         TradeNetDataService.quickchart(symbol).then(res => {
              for (var i = 0; i < res.length; i++){
                    let obj = res[i];
                    let ohlc = [new Date(obj['datetime']).getTime(),obj['open'],obj['high'],obj['low'],obj['close'],obj['volume']];
                    candles.push(ohlc);
              }}).catch(err => {
                     console.log(err)
              })
        this.titles[id]=symbol;
        this.charts[id].set('chart.data', candles);
      },
      handleSubmit(){
        var candles = [];
         TradeNetDataService.quickchart(this.ticker).then(res => {
              for (var i = 0; i < res.length; i++){
                    let obj = res[i];
                    let ohlc = [new Date(obj['datetime']).getTime(),obj['open'],obj['high'],obj['low'],obj['close'],obj['volume']];
                    candles.push(ohlc);
              }}).catch(err => {
                     console.log(err)
              })
        this.titles[this.currChart]=this.ticker;
        this.charts[this.currChart].set('chart.data', candles);
      }
    },
    mounted(){
      this.getQuickchart(0,'AAPL');
      this.getQuickchart(1,'BTCUSDT')
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
</style>
