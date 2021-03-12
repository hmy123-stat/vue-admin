import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Login  from "../views/Login/index.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "login"

    // name: "Home",
    // component: Home
    // //对应的是Home.vue中的"Welcome to Your Vue.js App",这个目录是根目录路径
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue")
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  //     //对应的是About.vue中的
  // }
];
const router = new VueRouter({
  routes
});
export default router;
