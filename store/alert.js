export const state = () => ({
  title: "",
  message: "",
  button: [],
  isActive: false,
});

export const actions = {
  openAlert({ commit }, payload) {
    commit("setMessage", payload);
    commit("active");
  },
  closeAlert({ commit }) {
    commit("deactive");
    commit("setMessage", "");
  },
};

export const mutations = {
  setMessage(state, payload) {
    state.title = payload.title;
    state.message = payload.message;
    state.button = payload.button;
  },
  active(state) {
    state.isActive = true;
  },
  deactive(state) {
    state.isActive = false;
  },
};
