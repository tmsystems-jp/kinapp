import { db } from "~/plugins/firebase";

export const actions = {
  async pullDefault({ commit,rootGetters }) {
    var path = [
      { dbpath: db.collection("principal").doc("Default"), name: "principal" },
      { dbpath: db.collection("principal").doc("Default").collection("staff").doc("Default"), name: "staff" },
      { dbpath: db.collection("principal").doc("Default").collection("item").doc("Default"), name: "item" , set:'sub'},
      { dbpath: db.collection("parent").doc("Default"), name: "parent" },
      { dbpath: db.collection("children").doc("Default"), name: "children" },
      { dbpath: db.collection("item").doc("Default"), name: "item" , set:'main'}
    ];
    var setData = {};
    await Promise.all(
      path.map(
        async value => {
          const dbRef = value.dbpath;
          await dbRef
            .get()
            .then((res) => {
              if("set" in value){
                if(value.name in setData){
                  setData[value.name][value.set]=res.data();
                }else{
                  setData[value.name]={};
                  setData[value.name][value.set]=res.data();
                }
              }else{
                setData[value.name]=res.data();
              }
            })
            .catch((error) => {
              console.log("error : " + error);
            });
        }
      )
    );
    commit("setDefault",setData,{root:true});
  },
  async pullInfo({ commit }, payload) {
    const dbRef = payload.db;
    await dbRef
      .get()
      .then((res) => {
        commit("setUserInfo",res.data(),{root:true});
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
  async updateInfo({ commit }, payload) {
    const dbRef = payload.db;
    await dbRef
      .get()
      .then((res) => {
        commit("setUserInfo",res.data(),{root:true});
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
  async insert({ commit }, payload) {
    const dbRef = payload.db;
    await dbRef
      .get()
      .then((res) => {
        commit("setUserInfo",res.data(),{root:true});
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
};
