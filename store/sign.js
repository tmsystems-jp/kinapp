import { auth, GoogleProvider } from "~/plugins/firebase";
import firebase from "~/plugins/firebase";

export const actions = {
  async signInWithEmail({ dispatch }, { email, password, type }) {
    console.log("signInWithEmail");
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch("checkLogin", { type });
    } catch (error) {
      console.log(error);
    }
  },
  async signInWithGoogle({ dispatch }, { type }) {
    await auth
      .signInWithPopup(GoogleProvider)
      .then(function (result) {
        dispatch("checkLogin", { type });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  async checkLogin({ commit }, { type }) {
    console.log("checkLogin");
    await auth.onAuthStateChanged(function (user) {
      if (user) {
        commit(
          "setUser",
          {
            uid: user.uid,
            email: user.email,
            type: type
          },
          { root: true }
        );
        commit("signIn", null, { root: true });
      } else {
        console.log("not user");
      }
    });
  },
  parentsRegist({ dispatch, commit }, payload) {
    console.log("parentsRegist");
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        dispatch("checkLogin");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  emailRegist({ dispatch, commit }, payload) {
    console.log("emailRegist");
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        console.log("user success");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  setRegist({ dispatch, commit }, payload) {
    var type = payload.type;
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        dispatch("checkLogin", { type });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("signOut", null, { root: true });
        console.log("ログアウト完了");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
