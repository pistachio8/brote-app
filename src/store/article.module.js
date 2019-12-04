import { FETCH_ARTICLES } from "./actions.type";
import { FETCH_START, FETCH_END } from "./mutations.type";
import { apiService } from "@/common/api";
import { ARTICLE_LIMIT } from "@/common/config";

export default {
  state: {
    articles: [],
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
    isLoading(state) {
      return state.isLoading;
    },
    countOfArticles(state) {
      return state.countOfArticles;
    }
  },
  mutations: {
    [FETCH_START](state) {
      state.isLoading = true;
    },
    [FETCH_END](state, payload) {
      state.articles = [...state.articles, ...payload];
      state.isLoading = false;
      state.countOfArticles = state.articles.length;
    }
  },
  actions: {
    async [FETCH_ARTICLES]({ commit }, payload) {
      commit(FETCH_START);
      const params = {
        offset: payload,
        limit: ARTICLE_LIMIT
      };

      await apiService.get("articles", params).then(response => {
        const articles = response.data.articles;
        commit(FETCH_END, articles);
      });
    }
  }
};
