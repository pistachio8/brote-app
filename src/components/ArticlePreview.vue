<template>
  <div class="article-preview">
    <div class="article-meta">
      <p class="article__author">{{ article.author.username }}</p>
      <small>{{ dateFormat }}</small>
    </div>
    <router-link :to="articleLink">
      <div class="preview-container">
        <h4>{{ article.title }}</h4>
        <div class="preview__description">{{ article.description }}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleLink() {
      return {
        name: "articles",
        params: {
          id: this.article.slug
        }
      };
    },
    dateFormat() {
      return this.article.updatedAt.substring(0, 10);
    }
  }
};
</script>
