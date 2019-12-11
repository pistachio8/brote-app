import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("@/views/Home.vue");
const Articles = () => import("@/views/Articles.vue");
const Editor = () => import("@/views/ArticleEditor.vue");
const Profile = () => import("@/views/Profile.vue");
const ProfileArticles = () => import("@/views/ProfileArticles");
const Settings = () => import("@/views/Settings.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/articles/:slug",
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
    component: Profile,
    children: [
      {
        path: "",
        name: "profile",
        component: ProfileArticles
      }
    ]
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
