// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6wmiphBNqZ0y0AzZ_ryzCoIJlXp6Wt-g",
  authDomain: "reactfirebase-7ede7.firebaseapp.com",
  projectId: "reactfirebase-7ede7",
  storageBucket: "reactfirebase-7ede7.appspot.com",
  messagingSenderId: "295434042959",
  appId: "1:295434042959:web:84d236b473931fedaff43a",
  measurementId: "G-26J37M2VB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = new  getAuth(app)

export const googleProvider = new GoogleAuthProvider();

export const db = new getFirestore(app)