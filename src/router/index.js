import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("@/views/Home.vue");
const Articles = () => import("@/views/Articles.vue");
const Editor = () => import("@/views/ArticleEditor.vue");
const Profile = () => import("@/views/Profile.vue");
const Settings = () => import("@/views/Settings.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/articles/:id",
    name: "articles",
    component: Articles
  },
  {
    path: "/editor",
    name: "editor",
    component: Editor
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: Profile
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
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
