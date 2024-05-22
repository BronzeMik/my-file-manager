import { useUser } from '@clerk/nextjs';
import img from '../../../../../public/usericon.png'
import Image from 'next/image';
import React from 'react'

function UserInfo() {
    const {user}=useUser();

  return (
    <div>
        {user?
        <div className='flex gap-2 items-center'>
            <Image src={img}
            alt='user-image'
            width={40}
            height={40}
            className='rounded-full'/>
            <div>
                <h2 className='text-[15px] font-bold'>{user.fullName}</h2>
                <h2 className='text-[13px] text-gray-400
                mt-[-4px]'>{user.primaryEmailAddress.emailAddress}</h2>
            </div>
        </div>:null}
    </div>
  )
}

export default UserInfo
