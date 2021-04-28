export const state = () => ({
  user: {
    uid: "",
    email: "",
    type: "",
    login: false
  },
  userInfo: {},
  default: {},
  parent: {},
  principal: {},
  children: {},
  staff: {},
  item: {}
});

export const getters = {
  user: (state) => {
    return state.user;
  },
  userInfo: (state) => {
    return state.userInfo;
  },
  default: (state) => {
    return state.default;
  },
  parent: (state) => {
    return state.parent;
  },
  principal: (state) => {
    return state.principal;
  },
  children: (state) => {
    return state.children;
  },
  staff: (state) => {
    return state.staff;
  },
  item: (state) => {
    return state.item;
  }
};

export const mutations = {
  setStorage(state, payload) {
    state.user = payload.user;
    state.userInfo = payload.userInfo;
    state.default = payload.default;
  },
  setUser(state, payload) {
    state.user.uid = payload.uid;
    state.user.email = payload.email;
    state.user.type = payload.type ? payload.type : "";
  },
  signIn(state) {
    state.user.login = true;
  },
  signOut(state) {
    state = new state();
  }
};
export const actions = {
  nuxtClientInit({ commit }, context) {
    if ("storege" in localStorage) {
      const data = JSON.parse(localStorage.getItem("storege")) || [];
      if (data) {
        commit("setStorage", data);
      }
    }
  }
};
