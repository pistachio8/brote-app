<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="profileLink" class="profile-image">
        <img :src="article.author.image" alt="author image" />
      </router-link>
      <div class="info">
        <router-link :to="profileLink" class="article__author">{{ article.author.username }}</router-link>
        <small>{{ dateFormat }}</small>
      </div>
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
