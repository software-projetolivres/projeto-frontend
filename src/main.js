import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Toaster from 'v-toaster';
import { http } from "./services/config";
import router from './router'

import 'v-toaster/dist/v-toaster.css';

Vue.use(VueRouter);
Vue.use(Toaster, {timeout: 5000});

const token = localStorage.getItem('@livres:token');
if (token) {
  http.defaults.headers.authorization = `Bearer ${token}`;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
