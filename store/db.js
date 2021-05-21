import { db } from "~/plugins/firebase";

export const actions = {
  async pullUserInfo({ commit, rootGetters }) {
    var user = rootGetters["user"];

    var principalList = [];
    if (user.type === "parents") {
      console.log("保護者情報取得");
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
            commit("setParent", parentInfo, { root: true });
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
      commit("setChildren", childrenInfo, { root: true });
    } else {
      // 幼稚園情報取得
      console.log("スタッフ情報取得");
      await db
        .collection("principal")
        .where("principal-cd", "==", user.principalCd)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const principalInfo = { id: doc.id, data: doc.data() };
            principalList.push(doc.id);
            commit("setPrincipal", principalInfo, { root: true });
          });
        });
      // スタッフ情報取得
      await db
        .collection("principal")
        .doc(principalList[0])
        .collection("staff")
        .where("mail-address", "==", user.email)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const staffInfo = { id: doc.id, data: doc.data() };
            commit("setStaff", staffInfo, { root: true });
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
    commit(itemPath.setName, setItem, { root: true });

    // subItem取得
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
      })
    );
    commit(itemPath.setName, setPriSubItem, { root: true });
  },

  async selectByDocId({ commit }, payload) {
    var dbInfo = userDbDocId(payload.docIdList, payload.dbName);
    var dbRef = dbInfo.dbpath;

    var data = null;

    await dbRef
      .get()
      .then((res) => {
        data = res.data();
      })
      .catch((error) => {
        console.log("error : " + error);
      });
    return data;
  },
  async selectByWhere({ commit }, payload) {
    var dbInfo = userDb(payload.principalDocId, payload.dbName);
    var dbRef = dbInfo.dbpath;

    var data = null;

    payload["strWhere"].forEach((str) => {
      dbRef = dbRef.where(str.columnName, str.strCompare, str.compareVal);
    });
    await dbRef
      .get()
      .then((res) => {
        data = res.data();
      })
      .catch((error) => {
        console.log("error : " + error);
      });

    return data;
  },
  async insert({ commit }, payload) {
    console.log("insertDb");
    var dbInfo = userDb(payload.principalDocId, payload.dbName);
    var dbRef = dbInfo.dbpath;

    await dbRef
      .add(payload.setData)
      .then((res) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  },
  async update({ commit }, payload) {},
  async delete({ commit }, payload) {}
};

function userDbDocId(docId, num) {
  var path = [];

  if (docId["principal-doc-id"]) {
    // 幼稚園情報設定
    path.push({
      key: "principal",
      value: {
        dbpath: db.collection("principal").doc(docId["principal-doc-id"]),
        setName: "setPrincipal"
      }
    });
    if (docId["staff-doc-id"]) {
      // スタッフ情報設定
      path.push({
        key: "staff",
        value: {
          dbpath: db
            .collection("principal")
            .doc(docId["principal-doc-id"])
            .collection("staff")
            .doc(docId["staff-doc-id"]),
          setName: "setStaff"
        }
      });
    }
  }

  if (docId["parent-doc-id"]) {
    path.push({
      key: "parent",
      value: {
        dbpath: db.collection("parent").doc(docId["parent-doc-id"]),
        setName: "setParent"
      }
    });
  }
  if (docId["child-doc-id"]) {
    path.push({
      key: "children",
      value: {
        dbpath: db.collection("children").doc(docId["child-doc-id"]),
        setName: "setChildren"
      }
    });
  }

  var value = path;
  if (num !== "") {
    value = path.find((z) => z.key === num).value;
  }
  return value;
}

function userDb(docId, num) {
  var path = [];

  // 幼稚園情報設定
  path.push({
    key: "principal",
    value: {
      dbpath: db.collection("principal"),
      setName: "setPrincipal"
    }
  });
  if (docId["principal-doc-id"]) {
    // スタッフ情報設定
    path.push({
      key: "staff",
      value: {
        dbpath: db
          .collection("principal")
          .doc(docId["principal-doc-id"])
          .collection("staff"),
        setName: "setStaff"
      }
    });
  }

  path.push({
    key: "parent",
    value: {
      dbpath: db.collection("parent"),
      setName: "setParent"
    }
  });
  path.push({
    key: "children",
    value: {
      dbpath: db.collection("children"),
      setName: "setChildren"
    }
  });

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
