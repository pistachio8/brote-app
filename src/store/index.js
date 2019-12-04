import Vue from "vue";
import Vuex from "vuex";

import article from "./article.module";
import user from "./user.module";
import modal from "./modal.module";

Vue.use(Vuex);

export default new Vuex.Store({
  // data
  state: {},
  // like computed property
  getters: {},
  // state update commit()
  mutations: {},
  // business logic - async, validation.. dispatch()
  actions: {},
  modules: {
    article,
    user,
    modal
  }
});
