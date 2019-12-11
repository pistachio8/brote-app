<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <section class="article-list">
      <div class="empty-content" v-if="articles.length <= 0">
        작성한 글이 없습니다.
      </div>
      <ArticlePreview
        v-else
        v-for="(article, index) in articles"
        :article="article"
        :key="index"
      ></ArticlePreview>
      <div v-if="isLoading" class="loading-container">
        <div class="loading-icon"></div>
      </div>
    </section>
  </div>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview";

import * as actions from "@/store/actions.type";
import { mapGetters } from "vuex";
import { ARTICLE_LIMIT } from "@/common/config";
import infiniteScroll from "vue-infinite-scroll";
// import { scrollEvent } from "@/common/mixins";

export default {
  components: { ArticlePreview },
  directives: { infiniteScroll },
  props: {
    author: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      busy: false
    };
  },
  computed: {
    ...mapGetters([
      "articles",
      "isLoading",
      "countOfArticles",
      "articlesCount"
    ]),
    listConfig() {
      const filters = {
        offset: this.countOfArticles || 0,
        limit: ARTICLE_LIMIT,
        author: this.author || null
      };
      if (this.author) {
        filters.author = this.author;
      }
      return filters;
    }
  },
  methods: {
    loadMore() {
      this.busy = true;
      this.fetchArticles();
    },
    fetchArticles() {
      // this.filters.offset = this.countOfArticles;

      this.$store.dispatch(actions.FETCH_ARTICLES, this.listConfig).then(() => {
        if (this.countOfArticles < this.articlesCount) {
          this.busy = false;
        }
      });
    }
  },
  watch: {
    author() {
      this.fetchArticles();
    }
  }
};
</script>
