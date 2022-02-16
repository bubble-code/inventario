// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbkoafffnenfQXMoMzdACvSTAUeF7JTI4",
  authDomain: "inventario-230d8.firebaseapp.com",
  projectId: "inventario-230d8",
  storageBucket: "inventario-230d8.appspot.com",
  messagingSenderId: "491271124338",
  appId: "1:491271124338:web:aabcd5eda22e65755319eb",
  measurementId: "G-6K0PJYGZS3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);