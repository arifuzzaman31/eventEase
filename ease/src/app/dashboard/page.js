'use client'
import { useState, useEffect,useLayoutEffect } from 'react';
import {isAuthenticated} from '@/Utils/Auth';
import { redirect } from 'next/navigation';

export default function Dashboard() {
    const [isClient,setIsClient] = useState(false)
    useLayoutEffect(() => {
        const isAuth = isAuthenticated;
        if(!isAuth){
          redirect("/")
        }
      }, [])

    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>
            {isClient ? <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Dashboard
                    </h1>
                </div>
            </div> : <div></div>}
        </>
    );
}