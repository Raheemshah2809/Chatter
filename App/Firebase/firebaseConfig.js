import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDQcabr0Uq4bs7bSfEM3Z0L5kZw2IAp68k",
  authDomain: "chatter2-98418.firebaseapp.com",
  databaseURL: "https://chatter2-98418-default-rtdb.firebaseio.com",
  projectId: "chatter2-98418",
  storageBucket: "chatter2-98418.appspot.com",
  messagingSenderId: "327396990011",
  appId: "1:327396990011:web:5e41a5078c5dd59c0d501e"
};

export default Firebase.initializeApp(firebaseConfig);
