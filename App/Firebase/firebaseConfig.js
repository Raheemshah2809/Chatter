import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA6gbg8fdHTDlZbFv4AOaCm4zDCEXMrJ0M",
  authDomain: "thechatter-ec861.firebaseapp.com",
  projectId: "thechatter-ec861",
  storageBucket: "thechatter-ec861.appspot.com",
  messagingSenderId: "128478114918",
  appId: "1:128478114918:web:6c02753cc7d6e080d229a7"
};

export default Firebase.initializeApp(firebaseConfig);
