import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB_A9DLWo6s1fZL3GCz0dP76Z1QbBnDsas",

  authDomain: "chatter3-79bf6.firebaseapp.com",

  databaseURL: "https://chatter3-79bf6-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "chatter3-79bf6",

  storageBucket: "chatter3-79bf6.appspot.com",

  messagingSenderId: "484686361335",

  appId: "1:484686361335:web:5073ca0347e111df7a19f2"

};

export default Firebase.initializeApp(firebaseConfig);
