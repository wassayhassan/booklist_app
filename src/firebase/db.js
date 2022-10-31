import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQLN4gppwsHQExPaqTEHICyD2CLnlAz_4",
  authDomain: "companydashboard-9e6d1.firebaseapp.com",
  projectId: "companydashboard-9e6d1",
  storageBucket: "companydashboard-9e6d1.appspot.com",
  messagingSenderId: "581885646895",
  appId: "1:581885646895:web:6b27c40fdc1e6736694eda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}