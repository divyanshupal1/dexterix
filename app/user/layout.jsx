"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import NavComp from './navcomp'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const Layout = ({children}) => {
    const path = usePathname().split("/").at(2)
    console.log(path=='login'?"h-1/2":"h-1/4")
    const router = useRouter()

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/')
            } else {

            }
          });
    },[])

    return (
        <>
        <NavComp/>
        <div className='flex flex-col h-screen w-full relative overflow-hidden'>
            <div className='absolute bottom-0'>
                <div className='w-full relative translate-y-4'>
                    <div className='absolute top-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center'>
                        <p className='text-4xl font-bold'>Save a Life</p>
                        <p className='text-lg font-medium'>They need you</p>
                    </div>
                    <img src={'/login_flow_img.png'} className='w-full h-auto mx-auto' />
                </div>
                <div className={`w-full transition-all duration-500 bg-background  ${path=='login'?"top-2/4":"top-3/4"} min-h-28 max-h-[650px] p-5 pt-8 relative z-10 rounded-t-xl border-b overflow-y-scroll`}>
                    {children} 
                </div>
            </div>
        </div>
        </>
    )
}

export default Layout