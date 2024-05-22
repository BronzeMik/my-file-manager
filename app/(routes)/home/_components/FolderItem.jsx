import React from 'react'
import img from '../../../../public/folder.png'
import Image from "next/image";
function FolderItem({folder, subFolder}) {
  return (
    <>
    {subFolder ? 
      <div className='w-full gap-6 flex justify-start items-center border-[1px] rounded-[5px] p-3 bg-slate-50 hover:scale-105 shadow-sm cursor-pointer'>
        <Image
        src={img}
        width={40}
        height={40}
        alt=''
        />
        <h2 className='line-clamp-2 text-center text-[17px]'>{folder?.name}</h2>
      </div> : 
      <div className='w-full flex flex-col justify-center items-center h-[140px] border-[1px] rounded-[5px] p-5 bg-white hover:scale-105 shadow-md cursor-pointer'>
        <Image
        src={img}
        width={40}
        height={40}
        alt=''
        />
        <h2 className='line-clamp-2 text-center text-[12px]'>{folder?.name}</h2>
      </div>
      }
    
    </>
  )
}

export default FolderItem
