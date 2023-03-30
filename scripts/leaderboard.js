// var allUsers;
// var userScore = 0;


// function readScore() {
//     firebase.auth().onAuthStateChanged((user) => {
//         // Check if user is signed in:
//         if (user !== null) {
//           //go to the users database
//           allUsers = db.collection("users");
//           //get the document for current user.
//           currentUser.get().then((userDoc) => {
//             //get the data fields of the user
//             var userName = userDoc.data().name;
//             var userSchool = userDoc.data().school;
//             var userEmail = userDoc.data().email;
//             var userCity = userDoc.data().city;
//             var userPet = userDoc.data().pet;
//             var userPetName = userDoc.data().petName;
    
//             //if the data fields are not empty, then write them in to the form.
//             if (userName != null) {
//               document.getElementById("nameInput").value = userName;
//             }
//             if (userSchool != null) {
//               document.getElementById("schoolInput").value = userSchool;
//             }
//             if (userCity != null) {
//               document.getElementById("cityInput").value = userCity;
//             }
//             if (userPet != null) {
//               document.getElementById("petInput").value = userPet;
//             }
//             if (userPetName != null) {
//               document.getElementById("petNameInput").value = userPetName;
//             }
//           });
//         } else {
//           // No user is signed in.
//           console.log("No user is signed in");
//         }
//       });
//     }

// function readScore(){
//     allUsers = db.collection("users");
//     orderBy("score", "desc");
//     onSnapshot((snapshot) => {
//     });
// };
// readScore();

// Retrieve the leaderboard data from the Firestore database
const leaderboardData = [];
db.collection('users')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      leaderboardData.push(doc.data());
    });
  })
  .catch((error) => {
    console.log('Error getting leaderboard data:', error);
  });


  // Sort the leaderboard data by score in descending order
leaderboardData.sort((a, b) => b.score - a.score);


// Display the leaderboard on a webpage
const leaderboardTable = document.querySelector('#users');
leaderboardData.forEach((user, index) => {
  const row = leaderboardTable.insertRow(index);
  const nameCell = row.insertCell(0);
  const scoreCell = row.insertCell(1);
  nameCell.innerHTML = user.name;
  scoreCell.innerHTML = user.score;
});

