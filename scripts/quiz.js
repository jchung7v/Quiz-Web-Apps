// When users click a start button, quiz starts
const startButton = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const questionsRef = db.collection("questions");

let shuffledQuestions, currentQuestionIndex;

// retrive the questions from Firestore and shuffle them randomly
questionsRef.get().then((snapshot) => {
  const questions = snapshot.docs.map((doc) => doc.data());
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
});

startButton.addEventListener("click", startGame);

function startGame() {
  console.log("Game has started");
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  quizContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  // resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  questionsRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      var answers = [
        doc.data().answer01,
        doc.data().answer02,
        doc.data().answer03,
        doc.data().answer04,
      ];
      console.log(answers[0]);
      answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.innerText;
        button.classList.add("btn", "mt-3", "btn-lg", "btn-primary", "answer");
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
      });
    });
  });
}

// answers.forEach(answer => {
//   const button = document.createElement('button')
//   button.innerText = answer.innerText
//   button.classList.add('btn')
//   if (answer.correct) {
//     button.dataset.correct = answer.correct
//   }
//   button.addEventListener('click', selectAnswer)
//   answerButtonsElement.appendChild(button)
// })

function resetState() {
  submitButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {}

//When users click a right answer, the answer button changes to green
//when users click a wrong answer, the answer button changes to red
// answerButtons is not WORKING!!!!

const answerButtons = document.querySelectorAll(".answer");

answerButtons.forEach((button) => {
  button.addEventListener("click", buttonColourChange);
});

function buttonColourChange() {
  console.log("colour changes to green");
  answerButtons.classList.remove("btn-primary");
  answerButtons.classList.add("btn-success");
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
// function displayQuizzesDynamically(collection) {
//   let quizTemplate = document.getElementById("quizTemplate");

//   db.collection("quizzes")
//     .limit(1)
//     .get() //the collection called "quizzes"
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         // .then((allQuizzes) => {
//         //var i = 1;  //Optional: if you want to have a unique ID for each hike
//         // allQuizzes.forEach((doc) => {

//         //iterate thru each doc
//         var quizId = doc.data().id; // get value of the "id" key
//         var animal = doc.data().animal; // get value of the "animal" key
//         var question = doc.data().question; //get value of the "question" key
//         var choice01 = doc.data().choice01; //get value of the "choice01" key
//         var choice02 = doc.data().choice02;
//         var choice03 = doc.data().choice03;
//         var choice04 = doc.data().choice04;
//         var answer = doc.data().answer;
//         var docID = doc.id;
//         let templateClone = quizTemplate.content.cloneNode(true);

//         console.log(answer);
//         //update title and text and image
//         templateClone.querySelector(".question").innerHTML = question;
//         templateClone.querySelector(".choice01").innerHTML = choice01;
//         templateClone.querySelector(".choice02").innerHTML = choice02;
//         templateClone.querySelector(".choice03").innerHTML = choice03;
//         templateClone.querySelector(".choice04").innerHTML = choice04;

//         // templateClone.querySelector(
//         //   ".animal-image"
//         // ).src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
//         //   templateClone.querySelector('a').href = "quiz.html?docID="+docID;

//         //Optional: give unique ids to all elements for future use
//         // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//         // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//         // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//         //attach to gallery, Example: "hikes-go-here"
//         document.getElementById("answer-goes-here").appendChild(templateClone);

//         //i++;   //Optional: iterate variable to serve as unique ID
//       });
//     });
// }
// displayQuizzesDynamically("quizzes"); //input param is the name of the collection

// // When the submit button is clicked, open the modal
// document.getElementById("submitBtn").addEventListener("click", openModal);

// // Get the modal
// var modal = document.getElementById("rightAnswerModal");
// var backdrop = document.getElementById("backdrop");

// function openModal() {
//   console.log("working!");
//   //   modal.classList.add("show");
//   //   document.body.classList.add("modal-open");
//   backdrop.style.display = "block";
//   modal.style.display = "block";
//   modal.classList.add("show");
// }
// function closeModal() {
//   //   modal.classList.remove("show");
//   //   document.body.classList.remove("modal-open");
//   backdrop.style.display = "none";
//   modal.style.display = "none";
//   modal.classList.remove("show");
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     closeModal();
//   }
// };

// //When the game starts add the user info
// function startGame() {
//   var gamesRef = db.collection("games");

//   gamesRef.add({
//     gameId: "0001", // gameID starts from 0001, next game + 1.
//     player1: "1234", // current login user's id (defauly player)
//     player1NickName: "dog",
//     player2: "2345", // an opponent (inivted friend)
//     player2NickName: "cat",
//     gameStatus: "active", //pending, active, done
//     cuurentQuestionId: "ab01",
//     currentQNum: "1",
//     maxQNum: "10",
//     statusP1: "unanswered",
//     statusP2: "unanswered",
//     scoreP1: "0",
//     scoreP2: "0",
//   });
// }

// // When you start the game above game data should be store in db(or local storage?)
// // The data is stored else where when the game is over. (archive)
// // The archive data can be used later when needed (leaderboard, profile)

// // I want answerButtons data base to be active only when player1 is playing game
// // It's not just data it's active data (it gets updated when the user chooses to do different actions)
