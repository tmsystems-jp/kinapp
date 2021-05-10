export const actions = {
  nuxtClientInit({ commit }, context) {
    if ("storege" in localStorage) {
      const data = JSON.parse(localStorage.getItem("storege")) || [];
      if (data) {
        console.log("storege", localStorage);
        commit("setStorage", data);
      }
    }
  }
};

export const state = () => ({
  user: {
    uid: "",
    email: "",
    type: "",
    login: false
  },
  userInfo: null,
  parent: null,
  principal: null,
  children: null,
  staff: null,
  item: null
});

export const getters = {
  user: (state) => {
    return state.user;
  },
  userInfo: (state) => {
    return state.userInfo;
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
    state.parent = payload.parent;
    state.principal = payload.principal;
    state.children = payload.children;
    state.staff = payload.staff;
    state.item = payload.item;
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
  },
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
  setParent(state, payload) {
    state.parent = payload;
  },
  setPrincipal(state, payload) {
    state.principal = payload;
  },
  setChildren(state, payload) {
    state.children = payload;
  },
  setStaff(state, payload) {
    state.staff = payload;
  },
  setItem(state, payload) {
    state.item = payload;
  }
};
