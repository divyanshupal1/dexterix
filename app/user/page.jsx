"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter()
    return (
        <div className='w-full flex justify-between items-center space-x-4'>
            <Button variant="secondary" className="w-full" onClick={()=>router.push('/user/login')}>Sign In</Button>
            <Button className="w-full" onClick={()=>router.push('/user/signup')}>Sign Up</Button>
        </div>
    )
}

export default Page