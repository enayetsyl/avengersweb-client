// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzF5sIIC3EGVYy3QIdrH199of223H--gI",
  authDomain: "avengers--web.firebaseapp.com",
  projectId: "avengers--web",
  storageBucket: "avengers--web.appspot.com",
  messagingSenderId: "755320899908",
  appId: "1:755320899908:web:52d167855fadda557c6f11",
  measurementId: "G-LYB55LVXQR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
