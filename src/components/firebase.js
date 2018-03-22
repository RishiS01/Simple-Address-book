import firebase from 'firebase';


  var config = {
    apiKey: "AIzaSyBJtDlutJx107Ptz-E5xaO-UjWv6TGOJag",
    authDomain: "simple-address-book.firebaseapp.com",
    databaseURL: "https://simple-address-book.firebaseio.com",
    projectId: "simple-address-book",
    storageBucket: "simple-address-book.appspot.com",
    messagingSenderId: "1019718971132"
  };
  firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
