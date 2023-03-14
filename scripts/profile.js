var currentUser; //put this right after you start script tag before writing any functions.

function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user !== null) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userSchool = userDoc.data().school;
        var userEmail = userDoc.data().email;
        var userCity = userDoc.data().city;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userSchool != null) {
          document.getElementById("schoolInput").value = userSchool;
        }
        if (userCity != null) {
          document.getElementById("cityInput").value = userCity;
        }
        if (userEmail != null){
          document.getElementById("emailInput").value = userEmail;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateUserInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  //enter code here

  //a) get user entered values
  userName = document.getElementById("nameInput").value; //get the value of the field with id="nameInput"
  userSchool = document.getElementById("schoolInput").value; //get the value of the field with id="schoolInput"
  userEmail = document.getElementById("emailInput").value;
  userCity = document.getElementById("cityInput").value; //get the value of the field with id="cityInput"
  //b) update user's document in Firestore
  currentUser
    .update({
      name: userName,
      school: userSchool,
      email: userEmail,
      city: userCity,
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
  //c) disable edit
  document.getElementById("personalInfoFields").disabled = true;
}
