<template>
  <div class="home">
    <h2>Articles</h2>
    <p>id: {{ getArticleId }}</p>
  </div>
</template>
<script>
export default {
  computed: {
    getArticleId() {
      return this.$route.params.id;
    }
  }
};
</script>
