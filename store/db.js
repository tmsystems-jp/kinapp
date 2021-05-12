import { db } from "~/plugins/firebase";

export const actions = {
  async pullUserInfo({ commit, rootGetters }) {
    var user = rootGetters["user"];

    var userInfo = {};
    var childrenInfo = [];
    var childList = [];
    if (user.type === "parents") {
      // 保護者情報取得
      await db
        .collection("parent")
        .where("mail-address", "==", user.email)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            console.log(`${doc.id}: ${doc.data().userName}`);
            userInfo["parentCd"] = doc.id;
            childList = doc.data().children;
          });
        });
      // 園児情報取得
      await Promise.all(
        childList.map(async (child) => {
          await db
            .collection("children")
            .doc(child)
            .get()
            .then((res) => {
              childrenInfo.push({
                childCd: res.data()["child-cd"],
                principalCd: res.data()["principal-cd"],
                classCd: res.data()["class-cd"]
              });
            })
            .catch((error) => {
              console.log("error : " + error);
            });
        })
      );
      userInfo["childrenInfo"] = childrenInfo;
    } else {
      // スタッフ情報取得
      await db
        .collection("principal")
        .where("mail-address", "==", user.email)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            console.log(`${doc.id}: ${doc.data().userName}`);
            userInfo["parentCd"] = doc.id;
            childList = doc.data().children;
          });
        });
    }
  },

  async pullDefault({ commit, rootGetters }) {
    var userInfo = rootGetters["userInfo"];
    userInfo = {
      principal: "SxiSlsgDU2tG8Qir6bg2",
      staff: "JMkozdaQTg3TUxwYIbjY",
      parent: "Default",
      children: "Default"
    };
    var path = userDb(userInfo, "");
    var setData = {};
    await Promise.all(
      path.map(async (value) => {
        const dbRef = value.value.dbpath;
        await dbRef
          .get()
          .then((res) => {
            setData[value.key] = res.data();
            commit(value.value.setName, res.data(), { root: true });
          })
          .catch((error) => {
            console.log("error : " + error);
          });
      })
    );

    var itemPath = itemDb(userInfo, "mainItem");
    var setItem = {};
    const dbRef = itemPath.dbpath;
    await dbRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setItem[doc.id] = doc.data();
        });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
    commit(itemPath.setName, setItem, { root: true });
  },
  async pullSubItem({ commit, rootGetters }) {
    var user = rootGetters["userInfo"];
    var itemPath = itemDb(user, "subItem");
    var setItem = {};
    const dbRef = itemPath.dbpath;
    await dbRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setItem[doc.id] = doc.data();
        });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
    commit(itemPath.setName, setItem, { root: true });
  },

  async selectByWhere({ commit, rootGetters }, payload) {
    var user = rootGetters["user"];

    var dbPath = userDb(user, "");

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
        dbpath: db.collection("principal").doc(user.principalCd),
        setName: "setPrincipal"
      }
    },
    {
      key: "staff",
      value: {
        dbpath: db
          .collection("principal")
          .doc(user.principalCd)
          .collection("staff")
          .doc(user.staffCd),
        setName: "setStaff"
      }
    },
    {
      key: "parent",
      value: {
        dbpath: db.collection("parent").doc(user.parentCd),
        setName: "setParent"
      }
    },
    {
      key: "children",
      value: {
        dbpath: db.collection("children").doc(user.childCd),
        setName: "setChildren"
      }
    }
  ];
  var value = path;
  if (num !== "") {
    value = path.find((z) => z.key === num).value;
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
  var value = path;
  if (num !== "") {
    value = path.find((z) => z.key === num).value;
  }
  return value;
}
