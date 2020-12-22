import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./Mock";

Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  store.commit("getToken");
  let token = store.state.user.token;
  console.log(!token && to.name !== "login");
  // if (!token && to.name !== "login") {
  //   console.log(to.name === "register");
  //   if (to.name === "register") {
  //   console.log("lllllllllllllll");
  //   next({ name: "register" });
  //   } else {
  //   next({ name: "login" });
  //   }
  // } else {
  //   next();
  // }
  if (to.name === "login" || to.name === "register") {
    next();
    console.log(to.name === "register");
  } else {
    if (!token) {
      next({ name: "login" });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("getToken");
  }
}).$mount("#app");
