// Get the leaderboard element from the HTML
const leaderboard = document.querySelector('#leaderboard');

// Retrieve the top 10 scores from the "users" collection in Firestore and populate the leaderboard
db.collection('users')
  .orderBy('score', 'desc')
  .limit(10)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const li = document.createElement('li');
      li.innerHTML = `<span>${user.name}</span> <span>${user.score}</span>`;
      leaderboard.appendChild(li);
    });
  });
