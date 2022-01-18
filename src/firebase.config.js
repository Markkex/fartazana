// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLoLihwSRZr8dfPJLRjA1NuLJqrskIwOI",
  authDomain: "fartazana-7e1e6.firebaseapp.com",
  projectId: "fartazana-7e1e6",
  storageBucket: "fartazana-7e1e6.appspot.com",
  messagingSenderId: "324453264076",
  appId: "1:324453264076:web:eed4aa0a1c26009a803069",
  measurementId: "G-6L6L40PKQZ",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore();
