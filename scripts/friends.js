// Add event listener to search button
document.getElementById('search-button').addEventListener('click', function (event) {
  event.preventDefault(); // prevent form submission

  // Get search query from input field
  var searchQuery = document.getElementById('search-input').value;

  // Search Firestore for matching email data
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
          var friendPet = userData.pet;
          var friendPetName = userData.petName;

          // Get the current user's document ID
          var userId = firebase.auth().currentUser.uid;

          // Search Firestore to check if the friend has already been added
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
                  pet: friendPet,
                  petName: friendPetName,
                  date_added: new Date()
                }).then(function (docRef) {
                  //Once button is clicked, change the button text to "Sent" and gray it out
                  console.log('Friend added successfully!');
                  addFriendButton.textContent = 'Sent';
                  addFriendButton.disabled = true;

                }).catch(function (error) {
                  console.error('Error adding friend: ', error);
                });
              });
            } else {
              // Friend has already been added, grey out the add friend button
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

//Define currentUser for loadFriends
var currentUser;

//Run function once the page is loaded to ensure no console log errors
document.addEventListener('DOMContentLoaded', function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      loadFriends(user); // Pass the user object as a parameter to the loadFriends function
    }
  });
});

//Pass user as parameter in loadFriends,
function loadFriends(user) {
  //Get current user ID from firestore
  currentUser = db.collection("users").doc(user.uid);
  //friendsRef is the friends that belong to the collection of the user that is currently logged in (currentUser)
  const friendsRef = firebase.firestore().collection("users").doc(currentUser.id).collection("friends");

  //get is a callback function that defines friends. querySnapshot represents the results from a firestore query. 
  //get friend id for each friend in the collection, then 'push' it to the array.
  friendsRef.get().then(function (querySnapshot) {
    let friends = [];
    querySnapshot.forEach(function (doc) {
      let friend = doc.data();
      friend.id = doc.id;
      friends.push(friend);
    });
    // log the friends array to the console
    console.log(friends);
    //html represents where we will store the div we are inserting into friends.html, with the data from friends. 
    let html = '';
    //For each friend, create a div and displau their name, pet, and pet name
    friends.forEach(function (friend) {
      html += '<div class="friendcard">';
      html += '<h2 class="friend-name">' + friend.name + '</h2>';
      html += '<p class="friend-email">' + "Pet: " + friend.pet + '</p>';
      html += '<p class="friend-email">' + "Pet Name: " + friend.petName + '</p>';
      html += '</div>';
    });
    //Place div in current-friends div in friends.html
    document.getElementById('current-friends').innerHTML = html;
    // Get the length of the friends array
    let friendsLength = friends.length;
    //Hide div if they have 0 friends
    if (friends.length === 0) {
      document.getElementById('friend-count').style.display = 'none';
      // Update the innerHTML of the friends-count div to display the friends length  
    } else {
      document.getElementById('friend-count').innerHTML = "Friends:  <strong>" + friends.length + "</strong>";
    }
  });
}











