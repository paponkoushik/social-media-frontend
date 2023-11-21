import Vue from 'vue';
import App from './App.vue';
import {routes} from "./router/index";
import VueRouter from "vue-router";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import { setupStoreSubscriber } from './store/subscriber';

require('./store/subscriber');

axios.defaults.baseURL = "http://localhost:8000/api";
Vue.prototype.$appURL = "http://localhost:8000"

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode:'history'
});
setupStoreSubscriber(router);
store.dispatch('Auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
})

