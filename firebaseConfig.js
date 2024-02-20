import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0G5QlvYVwTobsL_cUxkDWIzi4p-E5TX0",
  authDomain: "easy-waver.firebaseapp.com",
  projectId: "easy-waver",
  storageBucket: "easy-waver.appspot.com",
  messagingSenderId: "57842294086",
  appId: "1:57842294086:web:e4b63cc88ada205936d947"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(app);
