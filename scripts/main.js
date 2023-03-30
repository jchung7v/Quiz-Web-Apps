//Function that calls everything needed for the main page  
function doAll() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          currentUser = db.collection("users").doc(user.uid); //global
          console.log(currentUser);

          //Display user name
          insertNameFromFirestore();
      } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = "login.html";
      }
  });
}
doAll();

function insertNameFromFirestore(){
  // to check if the user is logged in:
  firebase.auth().onAuthStateChanged(user =>{
      if (user){
         console.log(user.uid); // let me to know who is the user that logged in to get the UID
         currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
         currentUser.get().then(userDoc=>{
             //get the user name
             var userName= userDoc.data().name;
             console.log(userName);
             //$("#name-goes-here").text(userName); //jquery
             document.getElementById("name-goes-here").innerText=userName;
         })    
     }    
  })
}

var playAloneBtn = document.getElementById("playAlone-btn")

playAloneBtn.addEventListener("click", function() {
  window.location.href = "quiz.html";
});



// // Function to read the quote of the day from Firestore "quotes" collection
// // Input param is the String representing the day of the week, aka, the document name
// function readQuote(day) {
//   db.collection("quotes")
//     .doc(day) //name of the collection and documents should matach excatly with what you have in Firestore
//     .onSnapshot((tuesdayDoc) => {
//       //arrow notation
//       console.log("current document data: " + tuesdayDoc.data()); //.data() returns data object
//       document.getElementById("quote-goes-here").innerHTML =
//         tuesdayDoc.data().quote; //using javascript to display the data on the right place

//       //Here are other ways to access key-value data fields
//       //$('#quote-goes-here').text(tuesdayDoc.data().quote);         //using jquery object dot notation
//       //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);      //using json object indexing
//       //document.querySelector("#quote-goes-here").innerHTML = tuesdayDoc.data().quote;
//     });
// }
// readQuote("tuesday"); //calling the function

// function insertNameFromFirestore() {
//   // to check if the user is logged in:
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log(user.uid); // let me to know who is the user that logged in to get the UID
//       currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
//       currentUser.get().then((userDoc) => {
//         //get the user name
//         var userName = userDoc.data().name;
//         var userEmail = userDoc.data().email;
//         console.log(userName);
//         //$("#name-goes-here").text(userName); //jquery
//         document.getElementById("name-goes-here").innerText = userName;
//       });
//     }
//   });
// }
// insertNameFromFirestore();

// function writeHikes() {
//   //define a variable for the collection you want to create in Firestore to populate data
//   var hikesRef = db.collection("hikes");

//   hikesRef.add({
//     code: "BBY01",
//     name: "Burnaby Lake Park Trail", //replace with your own city?
//     city: "Burnaby",
//     province: "BC",
//     level: "easy",
//     details: "A lovely place for lunch walk",
//     length: 10, //number value
//     hike_time: 60, //number value
//     lat: 49.2467097082573,
//     lng: -122.9187029619698,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
//   });
//   hikesRef.add({
//     code: "AM01",
//     name: "Buntzen Lake Trail", //replace with your own city?
//     city: "Anmore",
//     province: "BC",
//     level: "moderate",
//     details: "Close to town, and relaxing",
//     length: 10.5, //number value
//     hike_time: 80, //number value
//     lat: 49.3399431028579,
//     lng: -122.85908496766939,
//     last_updated: firebase.firestore.Timestamp.fromDate(
//       new Date("March 10, 2022")
//     ),
//   });
//   hikesRef.add({
//     code: "NV01",
//     name: "Mount Seymour Trail", //replace with your own city?
//     city: "North Vancouver",
//     province: "BC",
//     level: "hard",
//     details: "Amazing ski slope views",
//     length: 8.2, //number value
//     hike_time: 120, //number value
//     lat: 49.38847101455571,
//     lng: -122.94092543551031,
//     last_updated: firebase.firestore.Timestamp.fromDate(
//       new Date("January 1, 2023")
//     ),
//   });
// }

// //------------------------------------------------------------------------------
// // Input parameter is a string representing the collection we are reading from
// //------------------------------------------------------------------------------
// function displayCardsDynamically(collection) {
//   let cardTemplate = document.getElementById("hikeCardTemplate");

//   db.collection(collection)
//     .get() //the collection called "hikes"
//     .then((allHikes) => {
//       //var i = 1;  //Optional: if you want to have a unique ID for each hike
//       allHikes.forEach((doc) => {d
//         //iterate thru each doc
//         var title = doc.data().name; // get value of the "name" key
//         var details = doc.data().details; // get value of the "details" key
//         var hikeCode = doc.data().code; //get unique ID to each hike to be used for fetching right image
//         var hikeLength = doc.data().length; //gets the length field
//         var docID = doc.id;
//         let newcard = cardTemplate.content.cloneNode(true);

//         //update title and text and image
//         newcard.querySelector(".card-title").innerHTML = title;
//         newcard.querySelector(".card-length").innerHTML = hikeLength + "km";
//         newcard.querySelector(".card-text").innerHTML = details;
//         newcard.querySelector(".card-image").src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
//         newcard.querySelector('a').href = "eachHike.html?docID="+docID;

//         //Optional: give unique ids to all elements for future use
//         // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//         // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//         // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//         //attach to gallery, Example: "hikes-go-here"
//         document.getElementById(collection + "-go-here").appendChild(newcard);

//         //i++;   //Optional: iterate variable to serve as unique ID
//       });
//     });
// }

// displayCardsDynamically("hikes"); //input param is the name of the collection
