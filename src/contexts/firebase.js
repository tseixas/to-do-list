// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKkqKP8KHa24nKWy5DcsHWuCvhLmHEWEU",
  authDomain: "to-do-list-1b5d8.firebaseapp.com",
  projectId: "to-do-list-1b5d8",
  storageBucket: "to-do-list-1b5d8.appspot.com",
  messagingSenderId: "310325159864",
  appId: "1:310325159864:web:eccae79a2d23b37056914d",
  measurementId: "G-DYSQNKCS5Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const auth = getAuth(app)

export { app, database, auth}
