import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCPPS5b0fcqXNgFcE2IEEgrxcbAkYxwPc0",
  authDomain: "atomic10-recipes.firebaseapp.com",
  databaseURL: "https://atomic10-recipes.firebaseio.com",
  projectId: "atomic10-recipes",
  storageBucket: "atomic10-recipes.appspot.com",
  messagingSenderId: "569445980725"
};
const firebaseApp = firebase.initializeApp(config);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firestore database
export default firebaseApp.firestore();
