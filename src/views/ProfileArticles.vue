<template>
  <ArticleList :author="getUsername" :key="componentKey" />
</template>
<script>
import ArticleList from "@/components/ArticleList";

export default {
  components: {
    ArticleList
  },
  data() {
    return {
      componentKey: 0
    };
  },
  created() {
    this.forceRerender();
  },
  computed: {
    getUsername() {
      // console.log(this.$route.fullPath);

      return this.$route.params.username;
    }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
      console.log(`profile: ${this.componentKey}`);
    }
  }
};
</script>
