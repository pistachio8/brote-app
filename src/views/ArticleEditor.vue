<template>
  <div class="editor">
    <div class="editor-container">
      <ul class="error-message">
        <li v-for="(error, key) in errors" :key="key">
          <i class="fas fa-exclamation-circle"></i> {{ key }} {{ error[0] }}
        </li>
      </ul>
      <form method="POST" @submit.prevent="publish(article.slug)">
        <fieldset>
          <legend class="a11y-hidden">Title</legend>
          <input type="text" v-model="article.title" placeholder="제목" />
        </fieldset>
        <fieldset>
          <legend class="a11y-hidden">Description</legend>
          <input
            type="text"
            v-model="article.description"
            placeholder="부제목"
          />
        </fieldset>
        <fieldset>
          <legend class="a11y-hidden">Content</legend>
          <textarea
            rows="8"
            v-model="article.body"
            placeholder="내용을 입력하세요.."
          />
        </fieldset>
        <button type="submit">
          작성하기
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import {
  CREATE_ARTICLE,
  EDIT_ARTICLE,
  CLEAR_ARTICLE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_ARTICLE } from "@/store/actions.type";
export default {
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(CLEAR_ARTICLE);

    if (to.params.slug !== undefined) {
      await store.dispatch(FETCH_ARTICLE);
    }
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(CLEAR_ARTICLE).then(() => {
      next();
    });
  },
  data() {
    return {
      title: null,
      content: null,
      description: null,
      errors: {}
    };
  },
  computed: {
    ...mapGetters(["article"]),
    postConfig() {
      const body = {
        title: this.title,
        description: this.description,
        content: this.content
      };
      return body;
    }
  },
  methods: {
    publish(slug) {
      let action = slug ? EDIT_ARTICLE : CREATE_ARTICLE;

      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.$router.push({
            name: "articles",
            params: { slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  }
};
</script>
