// Prevent default form behavior
function handleEvent(event) {
  event.preventDefault();
}

// Get search query from input field
function getSearchQuery() {
  return document.getElementById('search-input').value;
}

// Clear previous search results
function clearSearchResults() {
  document.getElementById('search-results').innerHTML = '';
}

// Load email template HTML using AJAX
function loadEmailTemplate(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'text/friendbutton.html');
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    } else {
      console.log('Request failed. Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

// Add email card to search results
function addEmailCardToResults(userCard) {
  document.getElementById('search-results').appendChild(userCard);
}

// Create a new email card
function createEmailCard(emailHtml, userData) {
  var userCard = document.createElement('div');
  userCard.innerHTML = emailHtml;

  // Set email card content
  userCard.querySelector('.card-title').textContent = userData.name;
  userCard.querySelector('.card-subtitle').textContent = userData.email;
  userCard.querySelector('.card-text').textContent = userData.message;

  return userCard;
}

// Check if a friend has already been added
function checkFriendAlreadyAdded(friendEmail, userId, callback) {
  db.collection('users').doc(userId).collection('friends').where('email', '==', friendEmail).get().then(function (querySnapshot) {
    callback(querySnapshot.empty);
  });
}

// Add a friend to Firestore
function addFriendToFirestore(friendData, userId, successCallback, errorCallback) {
  db.collection('users').doc(userId).collection('friends').add(friendData).then(successCallback).catch(errorCallback);
}

// Set up the "Add Friend" button by adding appropriate event listeners and
// modifying the button text and state based on whether the friend has already been added
function setupAddFriendButton(addFriendButton, friendData, userId) {
  // Check if the friend has already been added to the user's friend list
  checkFriendAlreadyAdded(friendData.email, userId, function (isFriendNotAdded) {
    // If the friend has not been added yet
    if (isFriendNotAdded) {
      // Add a click event listener to the "Add Friend" button
      addFriendButton.addEventListener('click', function (event) {
        // Prevent default button behavior, such as form submission
        handleEvent(event);

        // Add the friend to the current user's Firestore friends collection
        addFriendToFirestore(friendData, userId,
          // Success callback function for adding the friend
          function (docRef) {
            console.log('Friend added successfully!');
            addFriendButton.textContent = 'Sent';
            addFriendButton.disabled = true;
          },
          // Error callback function for adding the friend
          function (error) {
            console.error('Error adding friend: ', error);
          });
      });
    } else {
      // If the friend has already been added, disable the "Add Friend" button and change the text
      addFriendButton.disabled = true;
      addFriendButton.textContent = 'Friend added';
    }
  });
}

// Process a Firestore user document, create an email card, set up the "Add Friend" button,
// and add the email card to the search results section of the page
function processUserDocument(doc, emailHtml, userId) {
  // Extract user data from the Firestore document
  var userData = doc.data();

  // Create a new email card element using the email card template and user data
  var userCard = createEmailCard(emailHtml, userData);

  // Get the "Add Friend" button element within the email card
  var addFriendButton = userCard.querySelector('.add-friend-button');

  // Create a friend data object with the friend's email address, name, pet, and pet name
  var friendData = {
    email: userData.email,
    name: userData.name,
    pet: userData.pet,
    petName: userData.petName
  };

  // Set up the "Add Friend" button with the friend data and current user ID
  setupAddFriendButton(addFriendButton, friendData, userId);

  // Add the newly created email card to the search results section of the page
  addEmailCardToResults(userCard);
}

// Searches firebase to check if friend is added, if not add them
function addFriends(event) {
  // Prevent default form behavior
  handleEvent(event);

  // Get the user's search query from the input field
  var searchQuery = getSearchQuery();

  // Clear any previous search results displayed on the page
  clearSearchResults();

  // Search Firestore for users with email addresses matching the search query
  db.collection('users').where('email', '==', searchQuery).get().then(function (querySnapshot) {
    // Load the email card template HTML using an AJAX request
    loadEmailTemplate(function (emailHtml) {
      // Get the current user's Firestore document ID
      var userId = firebase.auth().currentUser.uid;

      // Loop through the Firestore documents with matching email addresses
      querySnapshot.forEach(function (doc) {
        // Process each user document and create an email card
        processUserDocument(doc, emailHtml, userId);
      });
    });
  });
}



// Add event listener to search button
document.getElementById('search-button').addEventListener('click', addFriends);


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
      html += '<p class="friend-name">' + "Pet Name: " + friend.pet + "<br>" + "Pet Name: " + friend.petName + '</p>';
      html += '<hr></div>';
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
      document.getElementById('friend-count').innerHTML = "Added Friends:  <strong>" + friends.length + "</strong>";
    }
  });
}











