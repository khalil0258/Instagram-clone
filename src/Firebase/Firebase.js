import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl4ls3qRuWqVipTjeosEhFXJVPuEojZew",
  authDomain: "instclone-a72c4.firebaseapp.com",
  projectId: "instclone-a72c4",
  storageBucket: "instclone-a72c4.appspot.com",
  messagingSenderId: "766021510383",
  appId: "1:766021510383:web:184b9ebce556e58f00a71a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize firestore
const db = getFirestore(app);
const auth = getAuth();
const facebookProvider = new FacebookAuthProvider();

// initilazie storage
const storage = getStorage(app);
export { db, app, auth, facebookProvider, storage };

// https://instclone-a72c4.firebaseapp.com/__/auth/handler
