"use client"

import React from 'react'
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

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
    <>
    {
      user &&
      <div className='w-full'>
          
          <div class="">
              <div class="bg-white shadow-sm flex flex-col rounded-lg py-3">
                  {/* <div class="photo-wrapper p-2"> */}
                  <Avatar className="mx-auto h-[100px] w-[100px] z-[1]">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* </div> */}
                  <div class="p-2">
                      <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{user?.username}</h3>
                      <div class="text-center text-gray-400 text-xs font-semibold">
                          <p>{user?.type}</p>
                      </div>
                      <table class="text-xs my-3">
                          <tbody>
                            <tr>
                              <td class="px-2 py-2 text-base text-gray-500 font-semibold">Address</td>
                              <td class="px-2 py-2 text-base">{user?.address}</td>
                          </tr>
                          <tr>
                              <td class="px-2 py-2 text-base text-gray-500 font-semibold">Phone</td>
                              <td class="px-2 py-2 text-base">{user?.phone}</td>
                          </tr>
                          <tr>
                              <td class="px-2 py-2 text-base text-gray-500 font-semibold">Pincode</td>
                              <td class="px-2 py-2 text-base">{user?.pincode}</td>
                          </tr>
                          <tr>
                              <td class="px-2 py-2 text-base text-gray-500 font-semibold">City</td>
                              <td class="px-2 py-2 text-base">{user?.city}</td>
                          </tr>
                          <tr>
                              <td class="px-2 py-2 text-base text-gray-500 font-semibold">State</td>
                              <td class="px-2 py-2 text-base">{user?.state}</td>
                          </tr>
                          <tr>
                              <td class="px-2 py-2 text-base text-gray-500 font-semibold">Coins</td>
                              <td class="px-2 py-2 text-base">{user?.coins}</td>
                          </tr>
                      </tbody></table>

                      <div class="text-center my-3">
                          {/* <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a> */}
                      </div>

                  </div>
              </div>
          </div>
      </div>
    }
    </>
  )
}

export default Help