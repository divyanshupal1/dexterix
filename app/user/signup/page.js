"use client"

import React from 'react'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

const Page = () => {

    function SignUp(){
        createUserWithEmailAndPassword(auth, 'divyanshupal77@gmail.com', '123456')
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });
    }

    return (
        <div>
            <Button onClick={SignUp}>Sign Up</Button>
        </div>
    )
}

export default Page