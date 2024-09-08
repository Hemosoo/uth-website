
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCzDImn9Rl0KAs--MRkOFXnSYnmGWvopJY",
  authDomain: "uth-website-ccf20.firebaseapp.com",
  databaseURL: "https://uth-website-ccf20-default-rtdb.firebaseio.com",
  projectId: "uth-website-ccf20",
  storageBucket: "uth-website-ccf20.appspot.com",
  messagingSenderId: "268060841091",
  appId: "1:268060841091:web:153af74ea0e34c9ef837b6",
  measurementId: "G-QQK300S55C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);
export { app as firebase };