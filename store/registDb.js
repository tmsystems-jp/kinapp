import { db } from "~/plugins/firebase";

export const state = () => ({
  principalInfo: {
    id: "",
    data: {}
  }
});

export const getters = {
  principalInfo: (state) => {
    return state.principalInfo;
  }
};

export const actions = {
  async principalRegist({ commit }, payload) {
    console.log("principalRegist");

    const principalRef = db.collection("principal");
    let principalInfo = {};

    // Entity取得
    await principalRef
      .doc("Default")
      .get()
      .then((res) => {
        principalInfo = res.data();
      })
      .catch((error) => {
        console.log("error : " + error);
      });

    // Entity設定
    principalInfo["principal-id"] = payload.principalId;
    principalInfo["email"] = payload.email;
    principalInfo["name"] = payload.name;
    principalInfo["admin-cd"] = payload.adminCd;

    // データ登録
    await principalRef
      .add(principalInfo)
      .then((docRef) => {
        if (docRef) {
          commit("setPrincipalInfo", docRef);
        } else {
          console.log("not principalInfo");
        }
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async staffRegist({ commit }, payload) {
    console.log("staffRegist");

    const principalRef = db.collection("principal");
    let staffInfo = {};

    // Entity取得
    await principalRef
      .doc("Default")
      .collection("staff")
      .doc("Default")
      .get()
      .then((res) => {
        console.log("success select Default");
        staffInfo = res.data();
      })
      .catch((error) => {
        console.log("error : " + error);
      });

    // Entity設定
    staffInfo["staff-cd"] = payload.staffCd;
    staffInfo["mail-address"] = payload.email;
    staffInfo["name-first"] = payload.nameFirst;
    staffInfo["name-last"] = payload.nameLast;
    staffInfo["authority"] = payload.authority;
    staffInfo["kana-first"] = payload.kanaFirst ? payload.kanaFirst : "";
    staffInfo["kana-last"] = payload.kanaLast ? payload.kanaLast : "";

    // データ登録
    await principalRef
      .doc(payload.docId)
      .collection("staff")
      .add(staffInfo)
      .then((docRef) => {
        if (docRef) {
          console.log("success staffRegist");
        } else {
          console.log("not staffInfo");
        }
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async parentRegist({ commit }, payload) {
    console.log("parentRegist");

    const parentRef = db.collection("parent");
    let parentInfo = {};

    // Entity取得
    await parentRef
      .doc("Default")
      .get()
      .then((res) => {
        parentInfo = res.data();
      })
      .catch((error) => {
        console.log("error : " + error);
      });

    parentInfo["kana-last"] = "";
    await parentRef
      .doc(payload.documentId)
      .add(parentInfo)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
};

export const mutations = {
  setPrincipalInfo(state, payload) {
    state.principalInfo.id = payload.id;
    state.principalInfo.data = payload.data;
  }
};
