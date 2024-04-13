"use client"
import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const AuthComp = () => {
    const router = useRouter()

    React.useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                
            } else {
                router.push('/user')
            }
          });
    },[])

  return (
    <div></div>
  )
}

export default AuthComp