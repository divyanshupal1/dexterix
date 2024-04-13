"use client"
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
const NavComp = () => {
    const path = usePathname().split("/")
    const router = useRouter()

    
    return (
        <>
            {
                path[2] && 
                <div onClick={()=>router.back()} className='p-4 rounded-full absolute top-8 left-6 z-10 bg-background'>
                    <div className='scale-150'><IoIosArrowBack /></div>       
                </div>
            }
        </>
    )
}

export default NavComp