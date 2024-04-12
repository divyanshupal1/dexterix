import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFjCz_sT5ACwxXRijiGmJdDUxrr5hm5aU",
    authDomain: "helpinghands-eed5f.firebaseapp.com",
    projectId: "helpinghands-eed5f",
    storageBucket: "helpinghands-eed5f.appspot.com",
    messagingSenderId: "728489942861",
    appId: "1:728489942861:web:0b35aa63b21f855fdaa104"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);