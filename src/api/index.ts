import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrKg8php1lsRF4gK3W_0fn68sD_igyroA",
  authDomain: "react-chat-3cd5e.firebaseapp.com",
  projectId: "react-chat-3cd5e",
  storageBucket: "react-chat-3cd5e.appspot.com",
  messagingSenderId: "363834888370",
  appId: "1:363834888370:web:718a9110f2bd74e97a79ab",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

export const storage = getStorage();
export const db = getFirestore();
