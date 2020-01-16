import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCBR_KbkMiiWuFsu1sC7cChP8FilfeLFnI",
    authDomain: "scheduler-2f2b8.firebaseapp.com",
    databaseURL: "https://scheduler-2f2b8.firebaseio.com",
    projectId: "scheduler-2f2b8",
    storageBucket: "scheduler-2f2b8.appspot.com",
    messagingSenderId: "784996429844",
    appId: "1:784996429844:web:747b2779578818c723b701",
    measurementId: "G-WYP6GV9H5J"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database().ref();

  export default db;