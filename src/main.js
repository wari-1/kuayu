import Vue from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./router";
import "./cube-ui";
import { Pagination, Button, Dialog ,Tooltip} from "element-ui";

Vue.config.productionTip = false;
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Tooltip);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
