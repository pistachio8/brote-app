<template>
  <section class="article-list">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-icon"></div>
    </div>
    <div v-else>
      <div class="empty-content" v-if="articles.length <= 0">작성한 글이 없습니다.</div>
      <ArticlePreview v-else v-for="(article, index) in articles" :article="article" :key="index"></ArticlePreview>
    </div>
  </section>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview";

import * as actions from "@/store/actions.type";
import { mapGetters } from "vuex";
import { ARTICLE_LIMIT } from "@/common/config";
// import { scrollEvent } from "@/common/mixins";

export default {
  components: { ArticlePreview },
  props: {
    author: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      offset: 0
    };
  },
  created() {
    window.addEventListener("scroll", this.throttle(this.scrollHandler, 800));
  },
  mounted() {
    this.$store.dispatch(actions.FETCH_ARTICLES, this.listConfig);
  },
  computed: {
    ...mapGetters(["articles", "isLoading", "countOfArticles"]),
    listConfig() {
      const filters = {
        offset: this.offset,
        limit: ARTICLE_LIMIT
      };
      if (this.author) {
        filters.author = this.author;
      }

      return filters;
    }
  },
  methods: {
    fetchArticles() {
      this.offset = this.$store.state.article.countOfArticles;

      this.$store.dispatch(actions.FETCH_ARTICLES, this.listConfig);
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
