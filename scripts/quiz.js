// firebase connection
// dog and cat images 9 more, 9 more questions
// modal "please select at least one answer"

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
    question:
      "What should you do if you must keep your pet outside in a cold weather?",
    imgSrc: "./images/dog-outside-winter.webp",
    a: "A subscription to Netflix",
    b: "A trampoline for exercise",
    c: "Ensure the shelter is off the ground and provides protection from wind, cold, and dampness",
    correct: "c",
  });

  questionsRef.doc("Q3").set({
    question:
      "What should you do after walking your pet on sidewalks or roads during wintertime?",
    imgSrc: "./images/dog-walking-winter.jpeg",
    a: "Leave the salt on their paws",
    b: "Clean the pads of your pet's paws",
    c: "Ignore it and hope for the best",
    correct: "b",
  });

  questionsRef.doc("Q4").set({
    question:
      "Why should you avoid bathing your pets too often during cold weather?",
    imgSrc: "./images/dog-bathing.jpeg",
    a: "It can increase the chance of developing dry, flaky skin",
    b: "It can make your pet smell bad",
    c: "It can make your pet's coat too oily",
    correct: "a",
  });

  questionsRef.doc("Q5").set({
    question:
      "How can you prevent your pet from having itchy, flaking skin during wintertime?",
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
    question:
      "What should you do to keep your pets hydrated during hot and humid weather?",
    imgSrc: "./images/dog-drinking-water.jpeg",
    a: "Give them plenty of fresh, clean water",
    b: "Make them drink salty water",
    c: "Limit their access to water",
    correct: "a",
  });

  questionsRef.doc("Q9").set({
    question:
      "Which pets are more susceptible to heat stroke during hot weather?",
    imgSrc: "./images/dog-pug-face.jpeg",
    a: "Pets with long hair",
    b: "Pets with curly hair",
    c: "Pets with flat faces like Pugs and Persian cats",
    correct: "c",
  });

  questionsRef.doc("Q10").set({
    question:
      "What should you do if you suspect a dog is suffering from heat stroke?",
    imgSrc: "./images/dog-hot-weather.jpeg",
    a: "Submerge the dog in a tub of cold water",
    b: "Move the dog to a cooler environment and apply cool water to the abdomen, ears, and foot pads",
    c: "Pour ice water over the whole animal",
    correct: "b",
  });

  // questionsRef.doc("Q11").set({
  //   question: "What is the ideal room temperature for a bunny?",
  //   imgSrc: "./images/bunny.jpg",
  //   a: "15-21 Degreec Celcius",
  //   b: "18-24 Degreec Celcius",
  //   c: "12-18 Degreec Celcius",
  //   correct: "a",
  // });

  questionsRef.doc("Q12").set({
    question:
      "Why is it not a good idea to put a jacket on your dog during a heatwave?",
    imgSrc: "./images/dogjacket.jpg",
    a: "Dogs can easily regulate their body temperature, put a jacket on them!",
    b: "They do not regulate their body temperature as effectivlet as humans",
    c: "People will judge you",
    correct: "a",
  });

  // questionsRef.doc("Q13").set({
  //   question: "Which are symptoms that your bunny is having a heatstroke?",
  //   imgSrc: "./images/bunny2.jpg",
  //   a: "Lethargy and Weakness",
  //   b: "Rapid Breathing",
  //   c: "Drooling",
  //   d: "All of the above",
  //   correct: "d",
  // });

  questionsRef.doc("Q14").set({
    question: "How can you tell if your dog has frostbite?",
    imgSrc: "./images/dogpaw.jpg",
    a: "Ulcers",
    b: "Swelling",
    c: "Discoloration of the skin",
    d: "All of the above",
    correct: "d",
  });

  // questionsRef.doc("Q15").set({
  //   question: "Which areas of a cats body are less likely to develop frostbite?",
  //   imgSrc: "./images/catblanket.jpg",
  //   a: "Feet",
  //   b: "Tail",
  //   c: "Chest",
  //   correct: "c",
  // });

  questionsRef.doc("Q16").set({
    question: "How long can a dog survive only on water?",
    imgSrc: "./images/dogdrink.jpg",
    a: "8-10 days",
    b: "3-5 days",
    c: "14-16 days",
    correct: "b",
  });

  questionsRef.doc("Q16").set({
    question: "How long can a cat survive only on water?",
    imgSrc: "./images/catdrink.jpg",
    a: "5-7 days",
    b: "3-5 days",
    c: "7-9 days",
    correct: "b",
  });

  // questionsRef.doc("Q18").set({
  //   question: "Supplemting your bunny with vitamin D during snowstorms is pointless",
  //   imgSrc: "./images/bunsnow.jpg",
  //   a: "True",
  //   b: "False",
  //   correct: "b",
  // });

  questionsRef.doc("Q19").set({
    question:
      "Why should you worry about your pets mental health during a snowstorm?",
    imgSrc: "./images/pets.jpg",
    a: "I don't",
    b: "Mental health and physical health with pets are heavily correlated",
    c: "So they will like me more",
    correct: "b",
  });

  questionsRef.doc("Q20").set({
    question: "Can cats can tolerate heat better than humans?",
    imgSrc: "./images/catsun.jpg",
    a: "False, but they handle heat better than some other animals",
    b: "False, but they handle heat better than some other animals",
    c: "False, cats tolerate heat very poorly",
    correct: "a",
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
const afterGameContainer = document.getElementById("after-game-container");
const playAgainButton = document.getElementById("play-again-btn");
const backToMainButton = document.getElementById("back-to-main-btn");

const a_text = document.getElementById("a_text"); // confirmed
const b_text = document.getElementById("b_text"); // confirmed
const c_text = document.getElementById("c_text"); // confirmed

const startContainer = document.getElementById("start-btn-container");
const progressElement = document.getElementById("progress-bar-container");
const imageElement = document.getElementById("image-container"); // confirmed
const answerButtonsElement = document.getElementById("answer-container");
const progress = document.getElementById("progress-bar");

let currentQuestion = 1;
let currentProgress = 0;
let score = 0;
let qCorrect = "";
let result = "";

startButton.addEventListener("click", function () {
  setTimeout(startQuiz, 500);
});

function startQuiz() {
  console.log("Game has started");
  startContainer.style.display = "none";
  renderQuiz();
  quizContainer.style.display = "block";
  renderProgress();
  // renderCounter();
  // timer = setInterval(renderCounter, 1000);
}

submitButton.addEventListener("click", function () {
  submitButton.style.backgroundColor = "#2c365e";
  setTimeout(function () {
    submitButton.style.backgroundColor = "#4B8F8C";
    openModal();
    nextQuiz();
  }, 1000);
});

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
  progress.innerText = currentProgress / 10 + "/10";
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
  afterGameContainer.style.display = "flex";

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

playAgainButton.addEventListener("click", resetGame);
backToMainButton.addEventListener("click", function () {
  window.location.href = "main.html";
});

// Let the user restart the game
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

// Check if user score already exist.
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
        console.log("New Score is lowere than previous score. Do not change.");
      }
    });
  });
}

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

// Get the modal
var modal = document.getElementById("correct-answer-modal");
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

// Modal O(Green), X(Red)
// Modal "Please Select At Least One Answer"
// Log-Out Button
// Back Button
// Ending Congratulation
