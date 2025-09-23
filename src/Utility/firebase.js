
  

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVsjhiFuklibKzPjfMWLKYg3Dr0aIM-2I",
  authDomain: "clone-675f2.firebaseapp.com",
  projectId: "clone-675f2",
  storageBucket: "clone-675f2.firebasestorage.app",
  messagingSenderId: "433714473425",
  appId: "1:433714473425:web:97db77e4d52128093f98f0",
};


const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
export const auth = getAuth(app);

export {db}




