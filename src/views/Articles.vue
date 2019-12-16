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
        <div v-if="showControlButton" class="button-container">
          <router-link class="update" :to="updateLink">
            수정
          </router-link>
          <button class="" @click="removeArticle(article.slug)">삭제</button>
        </div>
      </div>
    </Banner>
    <div class="article-content">{{ article.body }}</div>
  </div>
</template>
<script>
import Banner from "@/components/Banner";
import store from "@/store";
import { FETCH_ARTICLE, DELETE_ARTICLE } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  components: { Banner },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch(FETCH_ARTICLE, to.params.slug)]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["article", "isAuthenticated", "currentUser"]),
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
    },
    updateLink() {
      return {
        name: "editor",
        params: {
          slug: this.article.slug
        }
      };
    },
    showControlButton() {
      if (
        this.isAuthenticated &&
        this.currentUser.username === this.article.author.username
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    removeArticle(slug) {
      this.$store
        .dispatch(DELETE_ARTICLE, slug)
        .then(() => {
          this.$router.push({
            name: "home"
          });
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>
