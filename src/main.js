import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// TO RUN: vue serve
// If "vue serve" doesn't work, try "npm run serve"
