// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD8QSm890NwBHQkt-xgHMfmu010B04CGSU",
  authDomain: "jobportal-1baf8.firebaseapp.com",
  projectId: "jobportal-1baf8",
  storageBucket: "jobportal-1baf8.firebasestorage.app",
  messagingSenderId: "530574850837",
  appId: "1:530574850837:web:27083881acb7c69750c71c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
