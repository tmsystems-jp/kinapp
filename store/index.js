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
    principalCd: "",
    email: "",
    type: "",
    login: false
  },
  userInfo: {
    staffCd: "",
    princialCd: "",
    parentCd: "",
    childrenInfo: [{ childCd: "", principalCd: "", classCd: "" }]
  },
  parent: null,
  principal: null,
  children: null,
  staff: null,
  mainItem: null,
  subItem: { principalCd: [] }
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
  mainItem: (state) => {
    return state.mainItem;
  },
  subItem: (state) => {
    return state.subItem;
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
    state.mainItem = payload.mainItem;
    state.subItem = payload.subItem;
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
  setSubItem(state, payload) {
    state.subItem = payload;
  },
  setMainItem(state, payload) {
    state.mainItem = payload;
  }
};
