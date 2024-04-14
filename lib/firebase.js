import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8beh_8KJ7GsnPh4IlF6pFyOK6H6rcdy4",
    authDomain: "helpinghands-cc147.firebaseapp.com",
    projectId: "helpinghands-cc147",
    storageBucket: "helpinghands-cc147.appspot.com",
    messagingSenderId: "748038188647",
    appId: "1:748038188647:web:f7e5c80b7133c6b989aec2"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);