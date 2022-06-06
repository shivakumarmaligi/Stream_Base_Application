// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCe5OZ3NM11JWxj8yqgmARziaI4O8P_XuQ",
  authDomain: "streambase-f5390.firebaseapp.com",
  projectId: "streambase-f5390",
  storageBucket: "streambase-f5390.appspot.com",
  messagingSenderId: "265240639803",
  appId: "1:265240639803:web:32f441536661f56b6d1f1e",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export let auth = getAuth(firebase);
export let storage = getStorage(firebase);
export let database = getDatabase(firebase);

export default firebase;
