function displayHikeInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection("hikes")
    .doc(ID)
    .get()
    .then((doc) => {
      thisHike = doc.data();
      hikeCode = thisHike.code;
      hikeName = doc.data().name;

      // only populate title, and image
      document.getElementById("hikeName").innerHTML = hikeName;
      let imgEvent = document.querySelector(".hike-img");
      imgEvent.src = "./images/" + hikeCode + ".jpg";
    });
}
displayHikeInfo();

function saveHikeDocumentIDAndRedirect() {
  let params = new URL(window.location.href); //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem("hikeDocID", ID);
  window.location.href = "review.html";
}

function populateReviews() {
  let hikeCardTemplate = document.getElementById("reviewCardTemplate");
  let hikeCardGroup = document.getElementById("reviewCardGroup");

  //let params = new URL(window.location.href) //get the url from the searbar
  //let hikeID = params.searchParams.get("docID");
  var hikeID = localStorage.getItem("hikeDocID");

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection("reviews")
    .where("hikeDocID", "==", hikeID)
    .get()
    .then((allReviews) => {
      reviews = allReviews.docs;
      console.log(reviews);
      reviews.forEach((doc) => {
        var title = doc.data().title; //gets the name field
        var level = doc.data().level; //gets the unique ID field
        var season = doc.data().season;
        var description = doc.data().description; //gets the length field
        var flooded = doc.data().flooded;
        var scrambled = doc.data().scrambled;
        var time = doc.data().timestamp.toDate();
        console.log(time);

        let reviewCard = hikeCardTemplate.content.cloneNode(true);
        reviewCard.querySelector(".title").innerHTML = title; //equiv getElementByClassName
        reviewCard.querySelector(".time").innerHTML = new Date(
          time
        ).toLocaleString(); //equiv getElementByClassName
        reviewCard.querySelector(".level").innerHTML = `level: ${level}`;
        reviewCard.querySelector(".season").innerHTML = `season: ${season}`;
        reviewCard.querySelector(
          ".scrambled"
        ).innerHTML = `scrambled: ${scrambled}`; //equiv getElementByClassName
        reviewCard.querySelector(".flooded").innerHTML = `flooded: ${flooded}`; //equiv getElementByClassName
        reviewCard.querySelector(
          ".description"
        ).innerHTML = `Description: ${description}`;
        hikeCardGroup.appendChild(reviewCard);
      });
    });
}
populateReviews();

// function displayHikeInformation() {
//   //retrieve the document id from the url
//   let params = new URL(window.location.href); //get the url from the searchbar
//   let ID = params.searchParams.get("docID");
//   console.log(ID);

//   db.collection("hikes")
//     .doc(ID)
//     .get()
//     .then((thisHike) => {
//       hikeInfo = thisHike.data();
//       hikeCode = hikeInfo.code;
//       hikeName = hikeInfo.name;

//       document.getElementById("hikeName").innerHTML = hikeName;
//       let imgEvent = document.querySelector(".hike-img");
//       imgEvent.src = "../images/" + hikeCode + ".jpg";
//     });
// }
// displayHikeInformation();
