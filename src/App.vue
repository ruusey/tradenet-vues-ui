<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <label for="ticker-input">Search: </label>
    <input v-on:keyup.enter="getQuickchart" type="text" id="ticker-input" v-model="ticker">
    <trading-vue :data="this.chart" :width="width" :height="height"
        :title-txt="this.chartTitle"
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
            ticker:'AAPL',
            chartTitle:'TradeNet Chahts',
            candles:[],
            chart: new DataCube(
              Data
            ),
            overlays: [TestOverlay]
        }
    },
    methods:{
      getQuickchart(){
        this.candles = [];
         TradeNetDataService.quickchart(this.ticker).then(res => {
              for (var i = 0; i < res.length; i++){
                    let obj = res[i];
                    let ohlc = [new Date(obj['datetime']).getTime(),obj['open'],obj['high'],obj['low'],obj['close'],obj['volume']];
                    this.candles.push(ohlc);
              }}).catch(err => {
                     console.log(err)
              })
        this.chartTitle = this.ticker;
        this.chart.set('chart.data', this.candles);
      }
    },
    mounted(){
      this.getQuickchart(this.ticker)
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
