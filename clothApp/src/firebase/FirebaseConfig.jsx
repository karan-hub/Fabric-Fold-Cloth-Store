// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2VufRUyu2ekwkucmDmgDMqfQPsh_orWg",
  authDomain: "fabricfoldclothstore.firebaseapp.com",
  projectId: "fabricfoldclothstore",
  storageBucket: "fabricfoldclothstore.appspot.com",
  messagingSenderId: "210470859352",
  appId: "1:210470859352:web:6b259c8d924250ecf4d02d",
  measurementId: "G-J2J85D6VZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

const auth = getAuth(app);

export { fireDB, auth }