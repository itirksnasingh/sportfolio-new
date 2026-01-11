import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCR7lNVlaFh15Lk7Jogl0Ddw4ftOePYrDQ",
  authDomain: "login-check-10239.firebaseapp.com",
  projectId: "login-check-10239",
  storageBucket: "login-check-10239.firebasestorage.app",
  messagingSenderId: "802979933496",
  appId: "1:802979933496:web:f19a9349916cbef20565cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, auth };
