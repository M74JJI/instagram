// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHThcSNh8nmIwa5-P-kZdjIF0cKuLnyA0",
    authDomain: "insta-1dbee.firebaseapp.com",
    projectId: "insta-1dbee",
    storageBucket: "insta-1dbee.appspot.com",
    messagingSenderId: "889389203667",
    appId: "1:889389203667:web:1a044ff81d15b6c9e5d426"
  };
  

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
