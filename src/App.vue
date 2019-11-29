<template>
  <div id="app">
    <globalHeader />
    <main>
      <router-view />
    </main>
    <globalFooter />
  </div>
</template>
<script>
import globalHeader from "@/components/Header";
import globalFooter from "@/components/Footer";

export default {
  name: "App",
  components: {
    globalHeader,
    globalFooter
  }
};
</script>
<style lang="scss">
// @import "@/assets/styles/main";
</style>
