import { db } from "~/plugins/firebase";

export const actions = {
  async pullUserInfo({ commit, rootGetters }) {
    var user = rootGetters["user"];

    // user = {
    //   type: "parents",
    //   email: "test@sample.com"
    // };
    user = {
      type: "staff",
      principalCd: "A001",
      email: "test2@gmail.com"
    };
    var principalList = [];
    if (user.type === "parents") {
      // 保護者情報取得
      var childrenInfo = [];
      var childList = [];
      await db
        .collection("parent")
        .where("mail-address", "==", user.email)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const parentInfo = { id: doc.id, data: doc.data() };
            childList = doc.data()["children"];
          });
        });
      // 園児情報取得
      await Promise.all(
        childList.map(async (child) => {
          await db
            .collection("children")
            .where("child-cd", "==", child)
            .get()
            .then((res) => {
              res.forEach((doc) => {
                childrenInfo.push({ id: doc.id, data: doc.data() });
                principalList.push(doc.data()["principal-cd"]);
              });
            })
            .catch((error) => {
              console.log("error : " + error);
            });
        })
      );
      console.log(childrenInfo);
      // userInfo["childrenInfo"] = childrenInfo;
    } else {
      // 幼稚園情報取得
      await db
        .collection("principal")
        .where("principal-cd", "==", user.principalCd)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const principalInfo = { id: doc.id, data: doc.data() };
            principalList.push(doc.id);
            console.log("principalInfo");
            console.log(principalInfo);
          });
        });
      // スタッフ情報取得
      console.log(principalList[0]);
      await db
        .collection("principal")
        .doc(principalList[0])
        .collection("staff")
        .where("mail-address", "==", user.email)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const staffInfo = { id: doc.id, data: doc.data() };
            console.log("staffInfo");
            console.log(staffInfo);
          });
        });
    }

    // mainItem取得
    var itemPath = itemDb("", "mainItem");
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
    console.log("mainItem");
    console.log(setItem);
    // commit(itemPath.setName, setItem, { root: true });

    // subItem取得
    console.log(principalList);
    var setPriSubItem = {};
    await Promise.all(
      principalList.map(async (principal) => {
        var itemPath = itemDb(principal, "subItem");
        var setSubItem = {};

        const dbRef = itemPath.dbpath;
        await dbRef
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setSubItem[doc.id] = doc.data();
            });
          })
          .catch((error) => {
            console.log("error : " + error);
          });
        setPriSubItem[principal] = setSubItem;
        console.log("subItem");
        console.log(setPriSubItem);
        console.log(setSubItem);
      })
    );
  },

  async pullDefault({ commit, rootGetters }) {
    // var userInfo = rootGetters["userInfo"];
    // userInfo = {
    //   principal: "SxiSlsgDU2tG8Qir6bg2",
    //   staff: "JMkozdaQTg3TUxwYIbjY",
    //   parent: "Default",
    //   children: "Default"
    // };
    // var path = userDb(userInfo, "");
    // var setData = {};
    // await Promise.all(
    //   path.map(async (value) => {
    //     const dbRef = value.value.dbpath;
    //     await dbRef
    //       .get()
    //       .then((res) => {
    //         setData[value.key] = res.data();
    //         commit(value.value.setName, res.data(), { root: true });
    //       })
    //       .catch((error) => {
    //         console.log("error : " + error);
    //       });
    //   })
    // );
    // var itemPath = itemDb(userInfo, "mainItem");
    // var setItem = {};
    // const dbRef = itemPath.dbpath;
    // await dbRef
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       setItem[doc.id] = doc.data();
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error : " + error);
    //   });
    // commit(itemPath.setName, setItem, { root: true });
  },

  async pullItem({ commit, rootGetters }) {
    console.log();
    var user = rootGetters["userInfo"];
    var itemPath = itemDb(user.principalCd, "subItem");
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

  async selectByWhere({ commit }, payload) {
    var dbInfo = userDb(payload.principalCd, payload.dbName);
    var dbRef = dbInfo.dbpath;

    await dbRef
      .get()
      .then((res) => {
        commit("setUserInfo", res.data(), { root: true });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },

  async selectByDocId({ commit }, docId) {
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
  },
  async update({ commit }, payload) {
    // const dbRef = payload.db;
    // await dbRef
    //   .get()
    //   .then((res) => {
    //     commit("setUserInfo", res.data(), { root: true });
    //   })
    //   .catch((error) => {
    //     console.log("error : " + error);
    //   });
  },
  async delete({ commit }, payload) {
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

function itemDb(principalCd, num) {
  var path = [
    {
      key: "mainItem",
      value: {
        dbpath: db.collection("item"),
        setName: "setMainItem"
      }
    }
  ];

  if (principalCd !== "") {
    path.push({
      key: "subItem",
      value: {
        dbpath: db.collection("principal").doc(principalCd).collection("item"),
        setName: "setSubItem"
      }
    });
  }
  var value = path;
  if (num !== "") {
    value = path.find((z) => z.key === num).value;
  }
  return value;
}
