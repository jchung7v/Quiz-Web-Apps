//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyAIjw0wRTo--KdMQZ0ZhYAvFtLLvKU6c2o",
    authDomain: "comp1800-5217a.firebaseapp.com",
    projectId: "comp1800-5217a",
    storageBucket: "comp1800-5217a.appspot.com",
    messagingSenderId: "287908641331",
    appId: "1:287908641331:web:32459abde4dcec081fc146"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
