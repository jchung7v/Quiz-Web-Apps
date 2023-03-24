// firebase connection
// dog and cat images 9 more, 9 more questions
// modal "please select at least one answer"
// startgame button in the middle

const questionsRef = db.collection("questions");

function writeQuestions() {
  var questionsRef = db.collection("questions");

  questionsRef.doc("Q1").set({
    question: "What can you do to help your pet stay warm during wintertime?",
    imgSrc: "./images/dog-blanket.jpeg",
    a: "Feed them less food to conserve energy",
    b: "Feed them a little bit more to provide much-needed calories",
    c: "Don't provide them with any water to drink",
    correct: "b",
  });

  questionsRef.doc("Q2").set({
    question: "What should you do if you must keep your pet outside in a cold weather?",
    imgSrc: "./images/dog-outside-winter.webp",
    a: "A subscription to Netflix",
    b: "A trampoline for exercise",
    c: "Ensure the shelter is off the ground and provides protection from wind, cold, and dampness",
    correct: "c",
  });

  questionsRef.doc("Q3").set({
    question: "What should you do after walking your pet on sidewalks or roads during wintertime?",
    imgSrc: "./images/dog-walking-winter.jpeg",
    a: "Leave the salt on their paws",
    b: "Clean the pads of your pet's paws",
    c: "Ignore it and hope for the best",
    correct: "b",
  });

  questionsRef.doc("Q4").set({
    question: "Why should you avoid bathing your pets too often during cold weather?",
    imgSrc: "./images/dog-bathing.jpeg",
    a: "It can increase the chance of developing dry, flaky skin",
    b: "It can make your pet smell bad",
    c: "It can make your pet's coat too oily",
    correct: "a",
  });

  questionsRef.doc("Q5").set({
    question: "How can you prevent your pet from having itchy, flaking skin during wintertime?",
    imgSrc: "./images/dog-playing-ball.jpg",
    a: "Keep your home unhumidified",
    b: "Don't towel dry your pet",
    c: "Keep your home humidified and towel dry your pet as soon as they come inside",
    correct: "c",
  });

  questionsRef.doc("Q6").set({
    question: "Is it recommended to shave your dog during hot weather?",
    imgSrc: "./images/dog-shave.jpeg",
    a: "Yes, it will help them cool down",
    b: "No, the layers of dogs' coats protect them from overheating and sunburn",
    c: "It doesn't matter",
    correct: "b",
  });

  questionsRef.doc("Q7").set({
    question: "Can you leave your dog in a parked car during hot weather?",
    imgSrc: "./images/dog-in-car.jpeg",
    a: "Yes, if the windows are open",
    b: "No, even with the windows open, the car can quickly become hot enough to cause heatstroke, brain damage, and even death",
    c: "It depends on the color of the car",
    correct: "b",
  });

  questionsRef.doc("Q8").set({
    question: "What should you do to keep your pets hydrated during hot and humid weather?",
    imgSrc: "./images/dog-drinking-water.jpeg",
    a: "Give them plenty of fresh, clean water",
    b: "Make them drink salty water",
    c: "Limit their access to water",
    correct: "a",
  });

  questionsRef.doc("Q9").set({
    question: "Which pets are more susceptible to heat stroke during hot weather?",
    imgSrc: "./images/dog-pug-face.jpeg",
    a: "Pets with long hair",
    b: "Pets with curly hair",
    c: "Pets with flat faces like Pugs and Persian cats",
    correct: "c",
  });

  questionsRef.doc("Q10").set({
    question: "What should you do if you suspect a dog is suffering from heat stroke?",
    imgSrc: "./images/dog-hot-weather.jpeg",
    a: "Submerge the dog in a tub of cold water",
    b: "Move the dog to a cooler environment and apply cool water to the abdomen, ears, and foot pads",
    c: "Pour ice water over the whole animal",
    correct: "b",
  });
}

// retrive the questions from Firestore and shuffle them randomly
// questionsRef.get().then((snapshot) => {
//   const questions = snapshot.docs.map((doc) => doc.data());
//   shuffledQuestions = questions.sort(() => Math.random() - 0.5);
// });

const startButton = document.getElementById("start-btn"); // confirmed

const quizContainer = document.getElementById("quiz-container");
const answerElements = document.querySelectorAll(".answer");
const questionContainer = document.getElementById("question-container"); //confirmed
const submitButton = document.getElementById("submit-btn"); //confirmed
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const imageBox = document.getElementById("image-box");

const a_text = document.getElementById("a_text"); // confirmed
const b_text = document.getElementById("b_text"); // confirmed
const c_text = document.getElementById("c_text"); // confirmed

const startContainer = document.getElementById("start-btn-container");
const progressElement = document.getElementById("progress-bar-container");
const imageElement = document.getElementById("image-container"); // confirmed
const answerButtonsElement = document.getElementById("answer-container");
const progress = document.getElementById("progress");

let currentQuestion = 1;
let currentProgress = 0;
let score = 0;
let qCorrect = "";
let result = "";

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  console.log("Game has started");
  startContainer.style.display = "none";
  renderQuiz();
  quizContainer.style.display = "block";
  renderProgress();
  // renderCounter();
  // timer = setInterval(renderCounter, 1000);
}

submitButton.addEventListener("click", nextQuiz);

function nextQuiz() {
  const answer = selectAnswer();
  if (answer === qCorrect) {
    score++;
  }
  currentQuestion++;
  currentProgress += 10;
  renderProgress();

  if (currentQuestion > 10) {
    renderScore();
    isFirstScore();
  } else {
    renderQuiz();
  }
}

function renderQuiz() {
  deselectAnswers();

  let docRef = questionsRef.doc("Q" + currentQuestion);
  docRef.get().then((doc) => {
    // questions.forEach(doc => {
    let qcontent = doc.data().question;
    let qImgSource = doc.data().imgSrc;
    let qAnswer01 = doc.data().a;
    let qAnswer02 = doc.data().b;
    let qAnswer03 = doc.data().c;
    qCorrect = doc.data().correct;

    questionContainer.innerHTML = "<p>" + qcontent + "</p>";
    imageElement.innerHTML = "<img src=" + qImgSource + ">";
    a_text.innerHTML = qAnswer01;
    b_text.innerHTML = qAnswer02;
    c_text.innerHTML = qAnswer03;
  });
}

function deselectAnswers() {
  answerElements.forEach((answerElements) => (answerElements.checked = false));
}

function renderProgress() {
  progress.style.width = currentProgress + "%";
  progress.setAttribute("aria-valuenow", currentProgress);
  progress.innerText = currentProgress + "%";
}

function selectAnswer() {
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answerId = answerElement.id;
    }
  });
  return answerId;
}

function renderScore() {
  console.log("Score is...");
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePercent = Math.round((100 * score) / 10);

  // choose the image based on the scorePercent
  let img =
    scorePercent >= 80
      ? "images/5.png"
      : scorePercent >= 60
      ? "images/4.png"
      : scorePercent >= 40
      ? "images/3.png"
      : scorePercent >= 20
      ? "images/2.png"
      : "images/1.png";

  scoreElement.innerText = scorePercent + "%";
  imageBox.innerHTML = "<img src=" + img + ">";
  return scorePercent;
  // scoreElement.innerHTML = `
  // <h2>You answered ${score}/${questions.length} questions correctly</h2>`
}

// Check if user score already exist.
function isFirstScore() {
  firebase.auth().onAuthStateChanged((user) => {
    const currentUserRef = db.collection("users").doc(user.uid);
    try {
      currentUserRef.get().then((userDoc) => {
      const userScore = userDoc.data().score;    
      console.log("User score exists");
      compareUserScore();
      })
    } catch {
      console.log("User score does not exist");
      saveUserScore();
    }
  })
}

// Check if existing user score is higher than new score.
// If higher, change. If not, don't change.
function compareUserScore() {
  firebase.auth().onAuthStateChanged((user) => {
    const currentUserRef = db.collection("users").doc(user.uid);
    currentUserRef.get().then((userDoc) => {
      const userScore = userDoc.data().score;
      if (renderScore() > userScore) {
        saveUserScore();
      } else {
        console.log("New Score is lowere than previous score. Do not change.")
      }
    })
  })
}

function saveUserScore() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const currentUserRef = db.collection("users").doc(user.uid);
      const userDoc = currentUserRef.get();
      currentUserRef.update({
        score: renderScore(),
      })
      console.log("User Score is successfully updated!");
    } else {
      console.log("No user is sigined in");
      window.location.href = "main.html";
    }
  });
}


// Render progress

// Select Answer (colour changes when clicked)
// let selectedAnswer = null;

// function selectAnswer() {
//   answerElements.forEach((button) => {
//     button.addEventListener("click", function () {
//       // remove green color from previously selected answer
//       if (selectedAnswer !== null) {
//         selectedAnswer.style.backgroundColor = "";
//       }
//       // set current button as selected answer and change color to green
//       selectedAnswer = button;
//       button.style.backgroundColor = "green";
//     });
//   });
// }

// Check Answer
// function checkAnswer(answer) {
//     if (answer == questions[currentQuestion].correct) {
//       // answer is correct
//       score++;
//       // change progress color to green
//       answerIsCorrect();
//       console.log("Correct!");
//     } else {
//       // answer is wrong
//       // change progress color to red
//       answerIsWrong();
//       console.log("Wrong!");
//     }
//     count = 0;
//     if (currentQuestion < lastQuestion) {
//       currentQuestion++;
//       renderQuestion();
//     } else {
//       // end the quiz and show the score
//       scoreRender();
//     }
// }

// // answer is correct -> open modal
// function answerIsCorrect(){
//   document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
// }

// // answer is Wrong -> open modal
// function answerIsWrong(){
//   document.getElementById(currentQuestion).style.backgroundColor = "#f00";
// }

// // score render
// function scoreRender(){
//   scoreDiv.style.display = "block";

//   // calculate the amount of question percent answered by the user
//   const scorePercent = Math.round(100 * score/questions.length);

//   // choose the image based on the scorePercent
//   let img = (scorePercent >= 80) ? "images/5.png" :
//             (scorePercent >= 60) ? "images/4.png" :
//             (scorePercent >= 40) ? "images/3.png" :
//             (scorePercent >= 20) ? "images/2.png" :
//             "images/1.png";

//   scoreDiv.innerHTML = "<img src="+ img +">";
//   scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";
// }

// function setNextQuestion() {
//   // resetState()
//   showQuestion(shuffledQuestions[currentQuestionIndex]);
// }

// function showQuestion(question) {
//   questionContainer.innerText = question.question;

//   questionsRef.get().then((snapshot) => {
//     snapshot.forEach((doc) => {
//       var answers = [
//         doc.data().answer01,
//         doc.data().answer02,
//         doc.data().answer03,
//         doc.data().answer04,
//       ];
//       console.log(answers[0]);
//       answers.forEach((answer) => {
//         const button = document.createElement("button");
//         button.innerText = answer.innerText;
//         button.classList.add("btn", "mt-3", "btn-lg", "btn-primary", "answer");
//         if (answer.correct) {
//           button.dataset.correct = answer.correct;
//         }
//         button.addEventListener("click", selectAnswer);
//         answerButtonsElement.appendChild(button);
//       });
//     });
//   });
// }

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

// function resetState() {
//   submitButton.classList.add("hide");
//   while (answerButtonsElement.firstChild) {
//     answerButtonsElement.removeChild(answerButtonsElement.firstChild);
//   }
// }

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

// // I want answerElements data base to be active only when player1 is playing game
// // It's not just data it's active data (it gets updated when the user chooses to do different actions)
