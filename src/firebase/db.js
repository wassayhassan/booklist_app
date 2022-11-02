import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQLN4gppwsHQExPaqTEHICyD2CLnlAz_4",
  authDomain: "companydashboard-9e6d1.firebaseapp.com",
  projectId: "companydashboard-9e6d1",
  storageBucket: "companydashboard-9e6d1.appspot.com",
  messagingSenderId: "581885646895",
  appId: "1:581885646895:web:6b27c40fdc1e6736694eda"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);
export {db, storage}