import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB63xLSbcAYpSRrjJsbwFPPS9j0Gu_861Q",
  authDomain: "trello-clone-v1.firebaseapp.com",
  databaseURL: "https://trello-clone-v1-default-rtdb.firebaseio.com",
  projectId: "trello-clone-v1",
  storageBucket: "trello-clone-v1.appspot.com",
  messagingSenderId: "963234224490",
  appId: "1:963234224490:web:8c39d9433d25890edf6d13",
  measurementId: "G-V3QEK4F1DJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
