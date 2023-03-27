// Add event listener to search button
document.getElementById('search-button').addEventListener('click', function (event) {
  event.preventDefault(); // prevent form submission

  // Get search query from input field
  var searchQuery = document.getElementById('search-input').value;

  // Query Firestore for matching email data
  db.collection('users').where('email', '==', searchQuery).get().then(function (querySnapshot) {
    // Clear previous search results
    document.getElementById('search-results').innerHTML = '';

    // Load email template HTML using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'text/friendbutton.html');
    xhr.onload = function () {
      if (xhr.status === 200) {
        var emailHtml = xhr.responseText;

        // Loop through matching email data and create new email cards
        querySnapshot.forEach(function (doc) {
          var userData = doc.data();
          var userCard = document.createElement('div');
          userCard.innerHTML = emailHtml;

          // Set email card content
          userCard.querySelector('.card-title').textContent = userData.name;
          userCard.querySelector('.card-subtitle').textContent = userData.email;
          userCard.querySelector('.card-text').textContent = userData.message;

          // Add event listener to add friend button
          var addFriendButton = userCard.querySelector('.add-friend-button');

          // Retrieve the friend's email address and name
          var friendEmail = userData.email;
          var friendName = userData.name;

          // Get the current user's document ID
          var userId = firebase.auth().currentUser.uid;

          // Query Firestore to check if the friend has already been added
          db.collection('users').doc(userId).collection('friends').where('email', '==', friendEmail,).get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
              // Friend has not been added, enable the add friend button
              addFriendButton.addEventListener('click', function (event) {
                event.preventDefault();
                // Add friend to the 'friends' subcollection in firestore,
                //so each user will have their own set of unique friends. 
                db.collection('users').doc(userId).collection('friends').add({
                  name: friendName,
                  email: friendEmail,
                  date_added: new Date()
                }).then(function (docRef) {
                  console.log('Friend added successfully!');
                }).catch(function (error) {
                  console.error('Error adding friend: ', error);
                });
              });
            } else {
              // Friend has already been added, gray out the add friend button
              addFriendButton.disabled = true;
              addFriendButton.textContent = 'Friend added';
            }
          });

          // Add email card to search results
          document.getElementById('search-results').appendChild(userCard);
        });
      } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  });
});


// document.addEventListener('DOMContentLoaded', function () {
//   loadFriends();
// });
// function loadFriends() {
//   const userId = firebase.auth().currentUser.uid;
//   const friendsRef = firebase.firestore().collection("users").doc(userId).collection("friends");

//   friendsRef.get().then(function (querySnapshot) {
//     let friends = [];
//     querySnapshot.forEach(function (doc) {
//       let friend = doc.data();
//       friend.id = doc.id;
//       friends.push(friend);
//     });
//     console.log(friends); // log the friends array to the console
//     let html = '';
//     friends.forEach(function (friend) {
//       html += '<div class="friendcard">';
//       html += '<h2 class="friend-name">' + friend.name + '</h2>';
//       html += '<p class="friend-email">' + friend.email + '</p>';
//       html += '</div>';
//     });
//     document.getElementById('current-friends').innerHTML = html;
//   });
// }






