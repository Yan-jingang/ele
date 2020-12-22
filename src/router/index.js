import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Login/Register.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "hash"
});

export default router;
