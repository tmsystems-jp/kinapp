import { db } from "~/plugins/firebase";

export const state = () => ({
  getFlg: false,
  itemList: [],
  default: {
    principal: {},
    children: {},
    parent: {},
    staff: {},
    item: {}
  }
});

export const getters = {
  getFlg(state) {
    return state.getFlg;
  },
  itemList(state) {
    return state.itemList;
  },
  default(state) {
    return state.default;
  }
};

export const actions = {
  async fetchItemList({ commit }) {
    console.log("fetchItemList");

    const itemRef = db.collection("item");
    await itemRef
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log(`success : ${doc.id} => ${doc.data()}`);
          commit("addItemList", doc.data());
        });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
  async fetchDefaultInfo({ commit }) {
    const principalRef = db.collection("principal").doc("Default");
    await principalRef
      .get()
      .then((res) => {
        console.log(res.data());
        const data = {
          name: "principal",
          data: res.data()
        };
        commit("saveDefault", data);
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  }
};

export const mutations = {
  addItemList(state, list) {
    state.itemList = list;
  },
  saveDefault(state, data) {
    state.default[data.name] = data.data;
  }
};
