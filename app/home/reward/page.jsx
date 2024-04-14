"use client"
import React from 'react'
import { auth ,db } from '@/lib/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { Button } from '@/components/ui/button';

const fetchUser = async (id) =>{
  const userDoc = await getDoc(doc(db,"users",id))
  return userDoc.data()
}

const Help = () => {
  const [user,setUser] = React.useState(null)
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
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full p-4 bg-secondary rounded-lg flex justify-between items-center'>
        <div>Coins: {user?.coins}</div>
        <Button full={false} className="w-[100px]">Claim</Button>
      </div>
    </div>
  )
}

export default Help