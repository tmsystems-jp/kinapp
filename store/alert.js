export const state = () => ({
  message: "",
  isActive: false,
});

export const actions = {
  openAlert({ commit }, payload) {
    commit("setMessage", payload.message);
    commit("active");
  },
  closeAlert({ commit }) {
    commit("deactive");
    commit("setMessage", "");
  },
};

export const mutations = {
  setMessage(state, message) {
    state.message = message;
  },
  active(state) {
    state.isActive = true;
  },
  deactive(state) {
    state.isActive = false;
  },
};
