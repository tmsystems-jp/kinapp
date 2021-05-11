import { db } from "~/plugins/firebase";

export const actions = {
  async pullDefault({ app, commit, rootGetters }) {
    var user = rootGetters["userInfo"];
    user = {
      principal: "SxiSlsgDU2tG8Qir6bg2",
      staff: "JMkozdaQTg3TUxwYIbjY",
      parent: "Default",
      children: "Default"
    };
    var path = userDb(user, "");
    var setData = {};
    await Promise.all(
      path.map(async (value) => {
        const dbRef = value.value.dbpath;
        await dbRef
          .get()
          .then((res) => {
            setData[value.key] = res.data();
            // commit(value.value.setName, res.data(), { root: true });
          })
          .catch((error) => {
            console.log("error : " + error);
          });
      })
    );

    var itemPath = itemDb(user, "mainItem");
    const dbRef = itemPath.dbpath;
    console.log(dbRef);
    await dbRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
  async pullInfo({ commit }, payload) {
    const dbRef = payload.db;
    await dbRef
      .get()
      .then((res) => {
        commit("setUserInfo", res.data(), { root: true });
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
        commit("setUserInfo", res.data(), { root: true });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
  async insert({ commit }, payload) {
    // var user = rootGetters["userInfo"];
    // const dbRef = payload.db;
    // await dbRef
    //   .get()
    //   .then((res) => {
    //     commit("setUserInfo", res.data(), { root: true });
    //   })
    //   .catch((error) => {
    //     console.log("error : " + error);
    //   });
  }
};

function userDb(user, num) {
  var path = [
    {
      key: "principal",
      value: {
        dbpath: db.collection("principal").doc(user.principal),
        setName: "setPrincipal"
      }
    },
    {
      key: "staff",
      value: {
        dbpath: db
          .collection("principal")
          .doc(user.principal)
          .collection("staff")
          .doc(user.staff),
        setName: "setStaff"
      }
    },
    {
      key: "parent",
      value: {
        dbpath: db.collection("parent").doc(user.parent),
        setName: "setParent"
      }
    },
    {
      key: "children",
      value: {
        dbpath: db.collection("children").doc(user.children),
        setName: "setChildren"
      }
    }
  ];
  var value = path;
  if (num !== "") {
    value = path.find((z) => (z.key = num)).value;
  }
  return value;
}

function itemDb(user, num) {
  var path = [
    {
      key: "subItem",
      value: {
        dbpath: db
          .collection("principal")
          .doc(user.principal)
          .collection("item"),
        setName: "setSubItem"
      }
    },
    {
      key: "mainItem",
      value: {
        dbpath: db.collection("item"),
        setName: "setMainItem"
      }
    }
  ];
  console.log(path);
  var value = path;
  console.log(value);
  if (num !== "") {
    value = path.find((z) => (z.key = num)).value;
  }
  console.log(value);
  return value;
}
