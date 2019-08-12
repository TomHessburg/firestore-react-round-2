import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAIRPl603u2kmS37C66ydeDnbUO3p56_Y8",
  authDomain: "just-playin-88d05.firebaseapp.com",
  databaseURL: "https://just-playin-88d05.firebaseio.com",
  projectId: "just-playin-88d05",
  storageBucket: "just-playin-88d05.appspot.com",
  messagingSenderId: "1078574362962",
  appId: "1:1078574362962:web:cb8a2bc316d0c580"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
