"use client"
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import React from 'react';
import img from '../../../../public/logo.png';
import Image from 'next/image';
import { LogIn, Mail, SquareArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

function DashboardHeader() {
  const pathname = usePathname()
  return (
    <div className=" shadow-md border-b-gray-200 border-2 flex items-center justify-between bg-white">
        <div className='p-5'>
        <a href='/'>
        <Image 
        src={img}
        width={300}
        />
        </a>
        </div>
        <div className='p-5 flex justify-between items-center'>
        <SignedOut>
        <a href='/home'>
              <button className='mx-5 p-3 rounded-lg btn btn-primary flex justify-between items-center bg-green-600 text-white hover:bg-black hover:text-white'>
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </button>
            </a>
            </SignedOut>
            <SignedIn>
            {pathname=='/'&&<a href='/home'>
              <button className='mx-5 p-3 rounded-lg btn btn-primary flex justify-between items-center bg-green-600 text-white hover:bg-black hover:text-white'>
                <SquareArrowUpRight className="mr-2 h-4 w-4" /> Dashboard
              </button>
            </a>}
              <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default DashboardHeader
