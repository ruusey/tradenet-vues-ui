import Vue from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import tradingVue from 'trading-vue-js'
Vue.config.productionTip = false
Vue.component('tradingVue',tradingVue)
Vue.component('helloWorld',HelloWorld)
new Vue({
  render: h => h(App),
}).$mount('#app')
