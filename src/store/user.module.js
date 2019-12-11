import { ApiService } from "@/common/api";
import { ID_TOKEN_KEY } from "@/common/config";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERRORS,
  RESET_ERRORS,
  SET_PROFILE
} from "./mutations.type";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  REFRESH_FORM,
  FETCH_PROFILE
} from "./actions.type";

export default {
  state: {
    isAuth: false,
    user: {},
    profile: {},
    errors: null
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.isAuth;
    },
    errors(state) {
      return state.errors;
    },
    profile(state) {
      return state.profile;
    }
  },
  mutations: {
    [SET_AUTH](state, user) {
      state.isAuth = true;
      state.user = user;
      state.errors = {};
    },
    [PURGE_AUTH](state) {
      state.isAuth = false;
      state.user = {};
      state.errors = {};
    },
    [SET_ERRORS](state, errors) {
      state.errors = errors;
    },
    [RESET_ERRORS](state) {
      state.errors = null;
    },
    [SET_PROFILE](state, profile) {
      state.profile = profile;
    }
  },
  actions: {
    async [LOGIN]({ commit }, payload) {
      await ApiService.post("users/login", { user: payload })
        .then(({ data }) => {
          commit(SET_AUTH, data.user);
          commit(RESET_ERRORS);
          localStorage.setItem(ID_TOKEN_KEY, data.user.token);
        })
        .catch(({ response }) => {
          commit(SET_ERRORS, response.data.errors);
        });
    },
    [LOGOUT]({ commit }) {
      commit(PURGE_AUTH);
      localStorage.removeItem(ID_TOKEN_KEY);
    },
    async [REGISTER]({ commit }, payload) {
      await ApiService.post("users", { user: payload })
        .then(({ data }) => {
          commit(SET_AUTH, data.user);
          commit(RESET_ERRORS);
          localStorage.setItem(ID_TOKEN_KEY, data.user.token);
        })
        .catch(({ response }) => {
          commit(SET_ERRORS, response.data.errors);
        });
    },
    [CHECK_AUTH]({ commit }) {
      let token = localStorage.getItem(ID_TOKEN_KEY);

      if (token) {
        ApiService.setHeader(token);

        ApiService.get("user")
          .then(({ data }) => {
            commit(SET_AUTH, data.user);
          })
          .catch(({ data }) => {
            commit(SET_ERRORS, data.errors);
          });
      } else {
        commit(PURGE_AUTH);
      }
    },
    [REFRESH_FORM]({ commit }) {
      commit(RESET_ERRORS);
    },
    // profile
    // GET /api/profiles/:username
    // resource, query
    async [FETCH_PROFILE]({ commit }, payload) {
      await ApiService.get("profiles", payload)
        .then(({ data }) => {
          commit(SET_PROFILE, data.profile);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
