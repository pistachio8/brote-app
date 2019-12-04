import { SET_MODAL_STATE, SET_MODAL_TYPE } from "./mutations.type";
import { UPDATE_MODAL_STATE, CHANGE_MODAL_FORM } from "./actions.type";

export default {
  state: {
    showModal: false,
    type: null
  },
  getters: {
    showModal(state) {
      return state.showModal;
    },
    modalType(state) {
      return state.type;
    }
  },
  mutations: {
    [SET_MODAL_STATE](state) {
      return (state.showModal = !state.showModal);
    },
    [SET_MODAL_TYPE](state, type) {
      return (state.type = type);
    }
  },
  actions: {
    [UPDATE_MODAL_STATE]({ commit }, type = null) {
      commit(SET_MODAL_STATE);
      commit(SET_MODAL_TYPE, type);
    },
    [CHANGE_MODAL_FORM]({ commit }, type = null) {
      commit(SET_MODAL_TYPE, type);
    }
  }
};
