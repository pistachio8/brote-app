<template>
  <div class="home">
    <Banner>
      <h3>Make progressive Brote with</h3>
      <img src="@/assets/images/logo.png" alt srcset />
    </Banner>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
import Banner from "@/components/Banner";

export default {
  components: { ArticleList, Banner },
  beforeRouteLeave(to, from, next) {
    this.$store.state.article.articles = [];
    next();
  }
};
</script>
