// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAWTF3IJmIG0dPeh176sFcnBk7rbUG02hk",
    authDomain: "clone-e319b.firebaseapp.com",
    databaseURL: "https://clone-e319b.firebaseio.com",
    projectId: "clone-e319b",
    storageBucket: "clone-e319b.appspot.com",
    messagingSenderId: "128424378841",
    appId: "1:128424378841:web:0f132b099e5f9a627199c8",
    measurementId: "G-3KLHPB17CC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  export { db, auth};