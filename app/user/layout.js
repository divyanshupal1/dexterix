import React from 'react'

const Layout = ({children}) => {
    return (
        <div className='flex flex-col w-full h-screen relative'>
            <div className='w-full relative shrink top-0 left-0 -z-10'>
                <div className='absolute top-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center'>
                    <p className='text-4xl font-bold'>Save a Life</p>
                    <p className='text-lg font-medium'>They need you</p>
                </div>
                <img src={'/login_flow_img.png'} className='w-full h-auto mx-auto' />
            </div>
            <div className='w-full bg-background min-h-9 p-5 absolute bottom-0 z-10'>
                {children} 
            </div>
        </div>
    )
}

export default Layout