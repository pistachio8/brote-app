<template>
  <div class="profile">
    <Banner>
      <div class="info">
        <h3>{{ profile.username }}</h3>
        <div v-if="profile.bio !== null" class="profile-bio">{{ profile.bio }}</div>
        <div v-else class="profile-bio">소개글이 없습니다.</div>
      </div>
      <div class="profile-image">
        <div class="profile-image-wrapper">
          <img :src="profile.image" alt="profile image" />
        </div>
      </div>
    </Banner>
    <div class="action-container">
      <router-link :to="{ name: 'profile'}" exact>
        <h4 class="tab-title">작성글</h4>
      </router-link>
      <router-view />
      <!-- <h4 class="tab-title">작성글</h4>
      <ArticleList :author="getUsername" />-->
    </div>
  </div>
</template>
<script>
import Banner from "@/components/Banner";
// import ArticleList from "@/components/ArticleList";
import store from "@/store";

import { mapGetters } from "vuex";
import {
  CLEAR_ARTICLES,
  FETCH_PROFILE
  // FETCH_ARTICLES
} from "@/store/actions.type";

export default {
  components: {
    Banner
  },
  beforeRouteEnter(to, from, next) {
    console.log("before profile");

    Promise.all([
      store.dispatch(CLEAR_ARTICLES),
      store.dispatch(FETCH_PROFILE, to.params.username)
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["profile", "currentUser"])
  },
  methods: {
    isCurrentUser() {
      if (this.isCurrentUser && this.profile.username) {
        return this.isCurrentUser === this.profile.username;
      }
      return false;
    }
  },
  watch: {
    $route(to) {
      store.dispatch(FETCH_PROFILE, to.params.username);
      store.dispatch(CLEAR_ARTICLES);
    }
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch(CLEAR_ARTICLES);
    next();
  }
};
</script>
