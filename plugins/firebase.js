import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCvIT9Xd2ifhZoDlv7-b84_2FpPG7jVSQc",
  authDomain: "login-test-001-89e46.firebaseapp.com",
  projectId: "login-test-001-89e46",
  storageBucket: "login-test-001-89e46.appspot.com",
  messagingSenderId: "231455514934",
  appId: "1:231455514934:web:bb30eace56a56227b35397",
  measurementId: "G-FQP95TYSQG"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
//firebase.analytics();
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();

export default firebase;
