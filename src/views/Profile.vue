<template>
  <div class="profile">
    <Banner>
      <div class="info">
        <h3>{{profile.username}}</h3>
        <div v-if="profile.bio !== null" class="profile-bio">{{profile.bio}}</div>
        <div v-else class="profile-bio">소개글이 없습니다.</div>
      </div>
      <div class="profile-image">
        <div class="profile-image-wrapper">
          <img :src="profile.image" alt="profile image" />
        </div>
      </div>
    </Banner>
    <div class="action-container">
      <h4 class="tab-title">작성글</h4>
      <ArticleList :author="getUsername" />
    </div>
  </div>
</template>
<script>
import Banner from "@/components/Banner";
import ArticleList from "@/components/ArticleList";

import { mapGetters } from "vuex";
import { FETCH_PROFILE } from "@/store/actions.type";

export default {
  components: {
    Banner,
    ArticleList
  },
  created() {
    this.$store.dispatch(FETCH_PROFILE, this.$route.params.username);
  },
  computed: {
    ...mapGetters(["profile"]),
    getUsername() {
      return this.$route.params.username;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.article.articles = [];
    next();
  }
};
</script>