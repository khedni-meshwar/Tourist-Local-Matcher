// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB27k-nGVSr7Wd0z4LpH6Du9U0f09jqV_0",
  authDomain: "khednimeshwar.firebaseapp.com",
  projectId: "khednimeshwar",
  storageBucket: "khednimeshwar.appspot.com",
  messagingSenderId: "984409332819",
  appId: "1:984409332819:web:3e7da4e69113d3a7a53aa6",
  measurementId: "G-N1T1LS05WP",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore()

export { app, auth, db };