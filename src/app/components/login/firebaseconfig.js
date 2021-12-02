
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_C-ckBv2mKJ5VBFWEYgTKHBUjkyV4gck",
  authDomain: "reactfirebaselogin-8fb15.firebaseapp.com",
  projectId: "reactfirebaselogin-8fb15",
  storageBucket: "reactfirebaselogin-8fb15.appspot.com",
  messagingSenderId: "403639930093",
  appId: "1:403639930093:web:8a2adb7f5c961b143cd0e4",
  measurementId: "G-P42EW52VZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)