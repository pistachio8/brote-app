import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("@/views/Home.vue");
const Articles = () => import("@/views/Articles.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    // path: "/articles/:id"
    path: "/articles/:id",
    name: "articles",
    component: Articles
  },
  {
    path: "/*",
    redirect: { name: "home" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
