// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDXU3Z8Uz5Q3dd53I4lZ3-c_4yHmn2lHP8',
    authDomain: 'instagram-2d1bd.firebaseapp.com',
    projectId: 'instagram-2d1bd',
    storageBucket: 'instagram-2d1bd.appspot.com',
    messagingSenderId: '1058121506900',
    appId: '1:1058121506900:web:c9a0101829af9ec47dcdc1',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
