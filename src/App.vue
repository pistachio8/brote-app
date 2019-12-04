<template>
  <div id="app" :class="{'fixed': showModal === true }">
    <globalHeader />
    <main>
      <router-view />
    </main>
    <globalFooter />
    <modal v-if="showModal" />
  </div>
</template>
<script>
import globalHeader from "@/components/Header";
import globalFooter from "@/components/Footer";
import modal from "@/components/Modal";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    globalHeader,
    globalFooter,
    modal
  },
  computed: {
    ...mapGetters(["showModal"])
  }
};
</script>
<style lang="scss">
// @import "@/assets/styles/main";
</style>
