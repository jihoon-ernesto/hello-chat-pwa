import Vue from 'vue'
import App from './App.vue'
import wb from './registerServiceWorker';

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
