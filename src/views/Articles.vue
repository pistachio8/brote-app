<template>
  <div class="home">
    <Banner>
      <h3>{{ article.title }}</h3>

      <div class="article-meta">
        <router-link :to="profileLink" class="profile-image">
          <img :src="article.author.image" alt="author image" />
        </router-link>
        <div class="info">
          <router-link :to="profileLink" class="article__author">{{
            article.author.username
          }}</router-link>
          <small>{{ dateFormat }}</small>
        </div>
      </div>
    </Banner>
    <div class="article-content">{{ article.body }}</div>
  </div>
</template>
<script>
import Banner from "@/components/Banner";
import store from "@/store";
import { FETCH_ARTICLE } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  components: { Banner },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch(FETCH_ARTICLE, to.params.slug)]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["article"]),
    profileLink() {
      return {
        name: "profile",
        params: {
          username: this.article.author.username
        }
      };
    },
    dateFormat() {
      return this.article.updatedAt.substring(0, 10);
    }
  }
};
</script>
