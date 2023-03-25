// Get a reference to the current user's document
const currentUserDocRef = firebase.firestore().collection('users').doc(currentUserID);

// Search for the friend's user document by email address
firebase.firestore().collection('users')
  .where('email', '==', friendEmail)
  .get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      // Found the friend's user document
      const friendDocRef = querySnapshot.docs[0].ref;

      // Add a new friend document to the friend's "friends" subcollection
      friendDocRef.collection('friends').add({
        name: 'Current User',
        email: 'currentuser@example.com'
      })
      .then(() => {
        console.log('Friend added successfully!');
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
    } else {
      // Friend's user document not found
      console.log('Friend not found!');
    }
  })
  .catch((error) => {
    console.error('Error searching for friend:', error);
  });