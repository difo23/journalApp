import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA2nq21zn20M3bDU3b1wpcPh3Eqke9ypbw",
    authDomain: "journalapp-c2cc8.firebaseapp.com",
    databaseURL: "https://journalapp-c2cc8.firebaseio.com",
    projectId: "journalapp-c2cc8",
    storageBucket: "journalapp-c2cc8.appspot.com",
    messagingSenderId: "1017304240832",
    appId: "1:1017304240832:web:a249afa6fdd43ee1aed325",
    measurementId: "G-2CSHXLR454"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}

