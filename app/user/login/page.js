"use client"
import React from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/lib/firebase';

const Page = () => {

    const [email, setEmail] = React.useState('divyanshupal77@gmail.com');
    const [password, setPassword] = React.useState('123456');

    function SignIN(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    return (
        <div>page</div>
    )
}

export default Page