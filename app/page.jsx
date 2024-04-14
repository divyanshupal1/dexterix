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
import { IoMdExit } from "react-icons/io";
  export const Navbar = () => {

  const {toast} = useToast()
  const [user,setUser] = React.useState({})

  React.useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(user)
            const profile = await fetchUser(user.uid)
            console.log(profile)
            setUser(profile)
        }
      });
  },[])

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
    <div className="w-full flex fixed top-0 bg-background justify-between items-center h-[60px] px-4 py-3 border-b">
        <div>
          <span>Hi,</span> <span className="font-bold">{user?user?.username:<Skeleton className={'w-[100px] h-[10px]'}/>}</span>
        </div>
        <div><Button variant="outline" onClick={logout}><div className="scale-150"><IoMdExit/></div></Button></div>
    </div>
  )
}

import { FaCamera } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import Link from "next/link";

export const BottomNav = () =>{
  const path = usePathname()
  return (
    <div className="w-full flex justify-between items-start bg-background  fixed bottom-0 right-0 h-[80px] px-[12px] py-[12px] border-t">
          <Link href={`/home`}>
          <div className='flex flex-col gap-y-2 items-center justify-between p-2 '>
            <div className={`scale-150 ${path==`/home`?`bg-primary text-white`:""} px-4 py-1 rounded-full bg-opacity-50`}><FaUserDoctor/></div>
            {path==`/home`&& <div className="font-medium">Home</div>}
          </div>
          </Link>
          <Link href={`/home/help`}>
          <div className='flex flex-col gap-y-2 items-center justify-between p-2 '>
            <div className={`scale-150 ${path.split('/')[2] ==`help`?`bg-primary text-white`:""} px-4 py-1 rounded-full bg-opacity-50`}><FaCamera/></div>
             {path.split('/')[2]==`help`&& <div className="font-medium">Help</div>}
          </div>
          </Link>
          <Link href={`/home/reward`}>
          <div className='flex flex-col gap-y-2 items-center justify-between p-2 '>
            <div className={`scale-150 ${path.split('/')[2] ==`reward`?`bg-primary text-white`:""} px-4 py-1 rounded-full bg-opacity-50`}><FaGift/></div>
            {path.split('/')[2] ==`reward`&& <div className="font-medium">Reward</div>}
          </div>
          </Link>
          <Link href={`/home/profile`}>
          <div className='flex flex-col gap-y-2 items-center justify-between p-2 '>
            <div className={`scale-150 ${path.split('/')[2] ==`profile`?`bg-primary text-white`:""} px-4 py-1 rounded-full bg-opacity-50`}><FaUser/></div>
            {path.split('/')[2] ==`profile`&& <div className="font-medium">Profile</div>}
          </div>
          </Link>
    </div>
  )
}