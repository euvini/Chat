import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJFeVRlVZLHminyqKdjRE6ejavEoF2sfU",
  authDomain: "chat-aba91.firebaseapp.com",
  projectId: "chat-aba91",
  storageBucket: "chat-aba91.appspot.com",
  messagingSenderId: "433047020217",
  appId: "1:433047020217:web:d9a0708a8b70c6d8d8b168"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = initializeFirestore(app, {experimentalForceLongPolling: true});
export const auth = getAuth();
export const storage = getStorage();


