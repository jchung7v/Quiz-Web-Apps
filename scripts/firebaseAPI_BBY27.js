//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyChvVe9aUrZaPiwNiY3kiMCP6LP64qicoE",
  authDomain: "tempeture-de483.firebaseapp.com",
  projectId: "tempeture-de483",
  storageBucket: "tempeture-de483.appspot.com",
  messagingSenderId: "203803474565",
  appId: "1:203803474565:web:508a7c9ee2fcf4f63847ec",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

