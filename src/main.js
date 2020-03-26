import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import store from "./store";
// import  './assets/css/vendor.bundle49f7.css';
// import  './assets/css/style.css';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faCoffee)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
const moment = require("moment");
// require("moment/locale/fr");

Vue.use(require("vue-moment"), {
  moment
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
