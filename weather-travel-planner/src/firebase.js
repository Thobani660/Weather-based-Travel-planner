// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0VYcCZc5W1gbdmyvJd8wRd0OV67EdZG0",
  authDomain: "travel-app-4463f.firebaseapp.com",
  projectId: "travel-app-4463f",
  storageBucket: "travel-app-4463f.firebasestorage.app",
  messagingSenderId: "400787180299",
  appId: "1:400787180299:web:124ee1be85cee86849b00e",
  measurementId: "G-NS65VD55CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);