"use client"
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {  signOut  } from "firebase/auth";
import { auth, db } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc,getDocs,collection, query, where, updateDoc, deleteDoc } from "firebase/firestore";

import { Skeleton } from "@/components/ui/skeleton";
import { FaUserDoctor } from "react-icons/fa6";

const fetchUser = async (id) =>{
  const userDoc = await getDoc(doc(db,"users",id))
  return userDoc.data()
}

export default function Home() {

  const [user,setUser] = React.useState(null)
  const [alerts,setAlerts] = React.useState(null)

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
  async function getAlerts(){
    if (user?.pincode == undefined) return
    const temp = []
    const alertsRef = collection(db, "alerts");
    const q = query(alertsRef, where("info.pincode", "==", user?.pincode));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push({id:doc.id,...doc.data()})
      console.log(doc.id, " => ", doc.data());
    });
    setAlerts(temp)
  }
  console.log(alerts)
  useEffect(()=>{
    getAlerts()
  },[user?.uid])

  return (
    <main className={"h-autp w-full space-y-4"}>

      {
        alerts?.map((item,index)=><Card item={item} user={user} key={index} refresh={getAlerts}/>)
      }

    </main>
  );
}
import { FaLocationDot } from "react-icons/fa6";
import { setDoc  } from "firebase/firestore"; 

const Card = ({item,user,refresh}) =>{

  async function help(){
    const docRef = doc(db, "rewards", item.reward);
    const docSnap = await getDoc(docRef);
    const coins = docSnap.data().coins ? docSnap.data().coins : 0
    await updateDoc(doc(db, "users", user.uid ), {
      coins:Number(user?.coins?user?.coins:0) + Number(coins)
    });
    await deleteDoc(doc(db, "alerts", item.id))
    refresh();
}

  return ( 
    <div className="w-full p-5 bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="rounded-md" src={item?.img} alt="" />
        </a>
        <div className="">
            <a href="#">
                <h5 className="mb-2 mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.info?.name}</h5>
            </a>
            <div className="flex space-x-4 items-start">
              <div className="mt-2"><FaLocationDot/></div>
              <div className="w-auto">
                <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">{item?.info?.address},{item?.info?.city}</p>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">{item?.info?.pincode},{item?.info?.state}</p>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button className="w-full" onClick={help}>Help</Button>
            </div>
        </div>
    </div>

  )
}


