import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEAHNzq0wk2Qw_IOQJR5F4N6zgBPDGkI0",
  authDomain: "whats-for-dinner-0509.firebaseapp.com",
  projectId: "whats-for-dinner-0509",
  storageBucket: "whats-for-dinner-0509.appspot.com",
  messagingSenderId: "1045937462808",
  appId: "1:1045937462808:web:6b75a790e411fa0d212d6d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;