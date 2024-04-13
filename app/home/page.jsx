"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {  signOut  } from "firebase/auth";
import { auth, db } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { FaUserDoctor } from "react-icons/fa6";

const fetchUser = async (id) =>{
  const userDoc = await getDoc(doc(db,"users",id))
  return userDoc.data()
}

export default function Home() {
  const {toast} = useToast();
  function logout(){
    signOut(auth).then(() => {
      toast({
        title:"Logout Success"
      })
    }).catch((error) => {
      toast({
        title:"Something went wrong",
        variant:"destructive"
      })
    });
  }
 

  return (
    <main className={"h-screen w-full "}>

      {/* <Button
        variant="default"
        onClick={() => {
          logout()
        }}
      >Click me</Button> */}

    </main>
  );
}


