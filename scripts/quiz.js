const questionsRef = db.collection("questions");
const quizContainer = document.getElementById("quiz-container");
const answerElements = document.querySelectorAll(".answer");
const questionContainer = document.getElementById("question-container");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const imageBox = document.getElementById("image-box");
const afterGameContainer = document.getElementById("after-game-container");
const playAgainButton = document.getElementById("play-again-btn");
const backToMainButton = document.getElementById("back-to-main-btn");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const startContainer = document.getElementById("start-btn-container");
const progressElement = document.getElementById("progress-bar-container");
const imageElement = document.getElementById("image-container");
const answerButtonsElement = document.getElementById("answer-container");
const progress = document.getElementById("progress-bar");
const exitButton = document.getElementById("exit-btn");
const cancelButton = document.getElementById("cancel-btn");
const exitConfirmButton = document.getElementById("exit-confirm-btn");

let currentQuestion = 1;
let currentProgress = 0;
let score = 0;
let qCorrect = "";
let result = "";

document.addEventListener("DOMContentLoaded", () => {
  startQuiz();
});

// Initializes the quiz by rendering the first question and progress bar.
function startQuiz() {
  console.log("Game has started");
  renderQuiz();
  renderProgress();
}

let alertMessage = document.getElementById("alert-message");

submitButton.addEventListener("click", function () {
  let isChecked = false;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      isChecked = true;
    }
  });

  if (isChecked) {
    submitButton.style.backgroundColor = "#2c365e";
    setTimeout(function () {
      openModal();
    }, 1000);
  } else {
    alertMessage.style.display = "flex";
    setTimeout(function () {
      alertMessage.style.display = "none";
    }, 1000);
  }
});

// Renders the next question or final score depending on the user's progress in the quiz.
function nextQuiz() {
  // if answer is correct, score + 1
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

// Renders the current question by fetching the question data from the database and updating the relevant HTML elements.
function renderQuiz() {
  deselectAnswers();

  let docRef = questionsRef.doc("Q" + currentQuestion);
  docRef.get().then((doc) => {
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

// Clears the user's answer selection by setting all radio buttons to unchecked.
function deselectAnswers() {
  answerElements.forEach((answerElements) => (answerElements.checked = false));
}

// Renders the progress bar by updating its width, label, and value.
function renderProgress() {
  progress.style.width = currentProgress + "%";
  progress.setAttribute("aria-valuenow", currentProgress);
  progress.innerText = currentProgress / 10 + "/10";
}

// Returns the ID of the selected answer radio button.
function selectAnswer() {
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answerId = answerElement.id;
    }
  });
  return answerId;
}

// Renders the user's final score and image based on their performance in the quiz.
function renderScore() {
  console.log("Score is...");
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";
  afterGameContainer.style.display = "flex";

  // calculate the amount of question percent answered by the user
  const scorePercent = Math.round((100 * score) / 10);

  // choose the image based on the scorePercent
  let img =
    scorePercent >= 80
      ? "images/morethan80.jpg"
      : scorePercent >= 60
      ? "images/btw60and80.jpg"
      : scorePercent >= 40
      ? "images/btw40and60.jpg"
      : scorePercent >= 20
      ? "images/btw20and40.jpg"
      : "images/lessthan20.jpg";

  scoreElement.innerText = scorePercent;
  imageBox.innerHTML = "<img src=" + img + ">";
  return scorePercent;
}

playAgainButton.addEventListener("click", resetGame);
backToMainButton.addEventListener("click", function () {
  window.location.href = "main.html";
});

// Resets the quiz by clearing all user progress and displaying the start button.
function resetGame() {
  currentQuestion = 1;
  currentProgress = 0;
  score = 0;
  qCorrect = "";
  result = "";
  startContainer.style.display = "flex";
  quizContainer.style.display = "none";
  scoreContainer.style.display = "none";
  afterGameContainer.style.display = "none";
}

// Checks if the user's score exists in the database
function isFirstScore() {
  firebase.auth().onAuthStateChanged((user) => {
    const currentUserRef = db.collection("users").doc(user.uid);
    try {
      currentUserRef.get().then((userDoc) => {
        const userScore = userDoc.data().score;
        console.log("User score exists");
        compareUserScore();
      });
    } catch {
      console.log("User score does not exist");
      saveUserScore();
    }
  });
}

// Compares the user's current score to their previous score in the database and updates it if the current score is higher.
function compareUserScore() {
  firebase.auth().onAuthStateChanged((user) => {
    const currentUserRef = db.collection("users").doc(user.uid);
    currentUserRef.get().then((userDoc) => {
      const userScore = userDoc.data().score;
      if (renderScore() > userScore) {
        saveUserScore();
      } else {
        console.log("New Score is lowere than previous score. Do not change.");
      }
    });
  });
}

// Saves the user's current score to the database if they are authenticated.
function saveUserScore() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const currentUserRef = db.collection("users").doc(user.uid);
      const userDoc = currentUserRef.get();
      currentUserRef.update({
        score: renderScore(),
      });
      console.log("User Score is successfully updated!");
    } else {
      console.log("No user is sigined in");
      window.location.href = "main.html";
    }
  });
}

// Variables just for modals
var modalForCorrectAnswer = document.getElementById("correct-answer-modal");
var modalForWrongAnswer = document.getElementById("wrong-answer-modal");
var modalForExit = document.getElementById("exit-modal");
var modal1 = document.querySelector(".modal1");
var modal2 = document.querySelector(".modal2");
var modal3 = document.querySelector(".modal3");
var backdrop = document.getElementById("backdrop");

// Opens the modal corresponding to the user's answer being correct or incorrect.
function openModal() {
  const answer = selectAnswer();
  if (answer == qCorrect) {
    backdrop.style.display = "block";
    modalForCorrectAnswer.style.display = "block";
  } else {
    backdrop.style.display = "block";
    modalForWrongAnswer.style.display = "block";
  }
}

// When the user clicks anywhere outside of the modal, close it
backdrop.addEventListener("click", closeModal);
modal1.addEventListener("click", closeModal);
modal2.addEventListener("click", closeModal);

// Closes the currently open modal and proceeds to the next question.
function closeModal() {
  backdrop.style.display = "none";
  modalForCorrectAnswer.style.display = "none";
  modalForWrongAnswer.style.display = "none";
  nextQuiz();
}

exitButton.addEventListener("click", function () {
  modalForExit.style.display = "block";
});

cancelButton.addEventListener("click", function () {
  modalForExit.style.display = "none";
});
exitConfirmButton.addEventListener("click", function () {
  window.location.href = "main.html";
});
