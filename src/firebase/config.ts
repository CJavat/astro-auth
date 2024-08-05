// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-EjyUs49IkSuhnqOZiB6_EnReXhBpFck",
  authDomain: "astro-authentication-640f7.firebaseapp.com",
  projectId: "astro-authentication-640f7",
  storageBucket: "astro-authentication-640f7.appspot.com",
  messagingSenderId: "179867337116",
  appId: "1:179867337116:web:65f621fc7619ae9e938859",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
  app,
  auth,
};
