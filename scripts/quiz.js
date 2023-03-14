function writeQuestions() {
  var questionsRef = db.collection("questions");
  quizzesRef.add({
    id: "q001",
    question: "I have often succeeded on a test or task even though I was afraid that I would not do well before I undertook the task.",
    answer: [
      { text: "1 (not all true)", points: 1 },
      { text: "2 (rarely)", points: 2 },
      { text: "3 (sometimes)", points: 3 },
      { text: "4 (often)", points: 4 },
      { text: "5 (very true)", points: 5 }
    ],
  });
  quizzesRef.add({
    id: "q002",
    question: "I can give the impression that I’m more competent than I really am.",
    answer: [
      { text: "1 (not all true)", points: 1 },
      { text: "2 (rarely)", points: 2 },
      { text: "3 (sometimes)", points: 3 },
      { text: "4 (often)", points: 4 },
      { text: "5 (very true)", points: 5 }
    ],
  });
  quizzesRef.add({
    id: "q003",
    question: "I avoid evaluations if possible and have a dread of others evaluating me.",
    answer: [
      { text: "1 (not all true)", points: 1 },
      { text: "2 (rarely)", points: 2 },
      { text: "3 (sometimes)", points: 3 },
      { text: "4 (often)", points: 4 },
      { text: "5 (very true)", points: 5 }
    ],
  });
}


function writeQuizzes() {
  //define a variable for the collection you want to create in Firestore to populate data
  var quizzesRef = db.collection("quizzes");

  quizzesRef.add({
    id: "ab01",
    animal: "dog",
    question: "What is the comfortable winter temperature for a dog",
    choice01: "Between 18°C and 20°C",
    choice02: "Between 20°C and 22°C",
    choice03: "Between 23°C and 25°C",
    choice04: "Between 26°C and 28°C",
    answer: "Between 20°C and 22°C",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  quizzesRef.add({
    id: "ab02",
    animal: "dog",
    question: "What is your dog's favorite colour?",
    choice01: "Green",
    choice02: "Red",
    choice03: "Does not matter. My dog is colour blind",
    choice04: "Blue",
    answer: "Does not matter. My dog is colour blind",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
  quizzesRef.add({
    id: "ab03",
    animal: "dog",
    question: "What's the safest place for your dog during a winter storm?",
    choice01: "Balcony",
    choice02: "Rooftop",
    choice03: "Does not matter. My dog does not feel cold",
    choice04: "Home sweet home",
    answer: "Does not matter. My dog does not feel cold",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayQuizzesDynamically(collection) {
  let quizTemplate = document.getElementById("quizTemplate");

  db.collection("quizzes")
    .limit(1)
    .get() //the collection called "quizzes"
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // .then((allQuizzes) => {
        //var i = 1;  //Optional: if you want to have a unique ID for each hike
        // allQuizzes.forEach((doc) => {

        //iterate thru each doc
        var quizId = doc.data().id; // get value of the "id" key
        var animal = doc.data().animal; // get value of the "animal" key
        var question = doc.data().question; //get value of the "question" key
        var choice01 = doc.data().choice01; //get value of the "choice01" key
        var choice02 = doc.data().choice02;
        var choice03 = doc.data().choice03;
        var choice04 = doc.data().choice04;
        var answer = doc.data().answer;
        var docID = doc.id;
        let templateClone = quizTemplate.content.cloneNode(true);

        console.log(answer);
        //update title and text and image
        templateClone.querySelector(".question").innerHTML = question;
        templateClone.querySelector(".choice01").innerHTML = choice01;
        templateClone.querySelector(".choice02").innerHTML = choice02;
        templateClone.querySelector(".choice03").innerHTML = choice03;
        templateClone.querySelector(".choice04").innerHTML = choice04;

        // templateClone.querySelector(
        //   ".animal-image"
        // ).src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
        //   templateClone.querySelector('a').href = "quiz.html?docID="+docID;

        //Optional: give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery, Example: "hikes-go-here"
        document.getElementById("answer-goes-here").appendChild(templateClone);

        //i++;   //Optional: iterate variable to serve as unique ID
      });
    });
}
displayQuizzesDynamically("quizzes"); //input param is the name of the collection

// When the submit button is clicked, open the modal
document.getElementById("submitBtn").addEventListener("click", openModal);

// Get the modal
var modal = document.getElementById("rightAnswerModal");
var backdrop = document.getElementById("backdrop");

function openModal() {
  console.log("working!");
  //   modal.classList.add("show");
  //   document.body.classList.add("modal-open");
  backdrop.style.display = "block";
  modal.style.display = "block";
  modal.classList.add("show");
}
function closeModal() {
  //   modal.classList.remove("show");
  //   document.body.classList.remove("modal-open");
  backdrop.style.display = "none";
  modal.style.display = "none";
  modal.classList.remove("show");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

//When the game starts add the user info
function startGame() {
  var gamesRef = db.collection("games");

  gamesRef.add({
    gameId: "0001", // gameID starts from 0001, next game + 1.
    player1: "1234", // current login user's id (defauly player)
    player1NickName: "dog",
    player2: "2345", // an opponent (inivted friend)
    player2NickName: "cat",
    gameStatus: "active", //pending, active, done
    cuurentQuestionId: "ab01",
    currentQNum: "1",
    maxQNum: "10",
    statusP1: "unanswered",
    statusP2: "unanswered",
    scoreP1: "0",
    scoreP2: "0",
  });
}

// When you start the game above game data should be store in db(or local storage?)
// The data is stored else where when the game is over. (archive)
// The archive data can be used later when needed (leaderboard, profile)

// I want this data base to be active only when player1 is playing game
// It's not just data it's active data (it gets updated when the user chooses to do different actions)
