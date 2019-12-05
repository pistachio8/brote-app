<template>
  <section class="article-list">
    <ArticlePreview v-for="(article, index) in articles" :article="article" :key="index"></ArticlePreview>
    <div v-if="isLoading" class="loading-container">
      <div class="loading-icon"></div>
    </div>
  </section>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview";

import * as actions from "@/store/actions.type";
import { mapGetters } from "vuex";
// import { scrollEvent } from "@/common/mixins";

export default {
  components: { ArticlePreview },
  data() {
    return {
      offset: 0
    };
  },
  created() {
    window.addEventListener("scroll", this.throttle(this.scrollHandler, 800));

    this.$store.dispatch(actions.FETCH_ARTICLES, this.offset);
  },
  computed: {
    ...mapGetters(["articles", "isLoading", "countOfArticles"])
  },
  methods: {
    fetchArticles() {
      this.offset = this.$store.state.article.countOfArticles;
      this.$store.dispatch(actions.FETCH_ARTICLES, this.offset);
    },
    getCurrentScrollPercentage() {
      const list = document.querySelector(".article-list");

      return ((window.scrollY + window.innerHeight) / list.offsetHeight) * 100;
    },
    scrollHandler() {
      const currentScrollPercentage = this.getCurrentScrollPercentage();
      if (currentScrollPercentage > 90) {
        this.fetchArticles();
      }
    },
    throttle(fn, delay) {
      let timer;
      return function() {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
          }, delay);
        }
      };
    }
  },
  beforeDestroy() {
    window.removeEventListener(
      "scroll",
      this.throttle(this.scrollHandler, 800)
    );
  }
};
</script>
