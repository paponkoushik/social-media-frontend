import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import VueRouter from "vue-router"

Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:8000/api";
Vue.prototype.$appURL = "http://localhost:8000"

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')
