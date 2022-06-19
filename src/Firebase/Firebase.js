import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDXILMjnCwMO0bXHyf_EQPuutz8HOVmgc",
  authDomain: "instagram-clone-709a6.firebaseapp.com",
  projectId: "instagram-clone-709a6",
  storageBucket: "instagram-clone-709a6.appspot.com",
  messagingSenderId: "140930178297",
  appId: "1:140930178297:web:48dda140a3d2c478ca1628",
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
