import { db } from "~/plugins/firebase";

export const actions = {
  async getDefault({ getters, commit }) {
    var path = [
      { dbpath: db.collection("principal").doc("Default"), name: "principal" },
      { dbpath: db.collection("item").doc("Default"), name: "item" }
    ];
    for (var key in path) {
      const dbRef = path[key].dbpath;
      await dbRef
        .get()
        .then((res) => {
          let dData = getters["default"];
          dData[path[key].name] = res.data();
          // if(path[key].name in dData){
          //   dData[path[key].name] = res.data();
          // }else{
          //   // dData.push({`path[key].name`:res.data()});
          // }
          // // dData[path[key].name] = res.data();
          console.log("set", dData);
        })
        .catch((error) => {
          console.log("error : " + error);
        });
    }
  },
  async getDate({ commit }, payload) {
    const dbRef = payload.db;
    await dbRef
      .get()
      .then((res) => {
        console.log("set", res.data());
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  }
};
