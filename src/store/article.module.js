import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  CREATE_ARTICLE,
  CLEAR_ARTICLES,
  CLEAR_ARTICLE,
  EDIT_ARTICLE
} from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  RESET_ARTICLES,
  RESET_ARTICLE
} from "./mutations.type";
import { ApiService, ArticlesService } from "@/common/api";
// import { ARTICLE_LIMIT } from "@/common/config";

export default {
  state: {
    articles: [],
    articlesCount: 0,
    article: {
      author: {},
      title: "",
      description: "",
      body: ""
    },
    isLoading: false,
    countOfArticles: 0
  },
  getters: {
    articles(state) {
      return state.articles;
    },
    articlesCount(state) {
      return state.articlesCount;
    },
    isLoading(state) {
      return state.isLoading;
    },
    countOfArticles(state) {
      return state.countOfArticles;
    },
    article(state) {
      return state.article;
    }
  },
  mutations: {
    [FETCH_START](state) {
      state.isLoading = true;
    },
    [FETCH_END](state, { articles, articlesCount }) {
      state.articlesCount = articlesCount;
      state.articles = [...state.articles, ...articles];
      state.isLoading = false;
      state.countOfArticles = state.articles.length;
    },
    [FETCH_ARTICLE](state, payload) {
      state.isLoading = false;
      state.article = payload;
    },
    [RESET_ARTICLE](state) {
      state.article = {
        author: {},
        title: "",
        description: "",
        body: ""
      };
    },
    [RESET_ARTICLES](state) {
      state.articles = [];
      state.articlesCount = 0;
      state.countOfArticles = 0;
    }
    // CREATE_ARTICLE
  },
  actions: {
    async [FETCH_ARTICLES]({ commit }, payload) {
      commit(FETCH_START);

      await ApiService.query("articles", payload).then(response => {
        // console.log(response.data);

        // const articles = response.data.articles;
        commit(FETCH_END, response.data);
      });
    },
    // GET /api/articles/:slug
    async [FETCH_ARTICLE]({ commit }, payload) {
      commit(FETCH_START);
      await ApiService.get("articles", payload).then(response => {
        commit(FETCH_ARTICLE, response.data.article);
      });
    },
    // POST /api/articles
    [CREATE_ARTICLE]({ state }) {
      return ArticlesService.create(state.article);
    },
    [EDIT_ARTICLE]({ state }) {
      return ArticlesService.update(state.article.slug, state.article);
    },
    // clear article state
    [CLEAR_ARTICLE]({ commit }) {
      commit(RESET_ARTICLE);
    },
    // clear articles state
    [CLEAR_ARTICLES]({ commit }) {
      commit(RESET_ARTICLES);
    }
  }
};
