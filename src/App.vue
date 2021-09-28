<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <trading-vue :data="chart" :width="width" :height="height"
        title-txt="BTCUSDT"
        :toolbar="true"
        :overlays="overlays"
       >
    </trading-vue>
  </div>
</template>

<script>
import { DataCube } from 'trading-vue-js'
import Data from './assets/data.json'
import HelloWorld from './components/HelloWorld.vue';
import TestOverlay from './components/TestOverlay.vue'
export default {
    name: 'App',
    props: ['width', 'height', 'colors'],
    components:{
      HelloWorld
    },
    data() {
        return {
            chart: new DataCube(Data),
            overlays: [TestOverlay]
        }
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
