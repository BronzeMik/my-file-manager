
"use client"
import React, { useEffect, useState } from 'react'
import FolderItem from './FolderItem'
import { useRouter } from 'next/navigation'

function FolderList({foldersList, title,onClickFunc, subFolder}) {
    // const foldersList = [
    //     {
    //         id: 1,
    //         name: 'Folder 1 to Test Big',
    //     },
    //     {
    //         id:2,
    //         name:'Folder 2'
    //     },
    //     {
    //         id:3,
    //         name:'Folder 3'
    //     },
    //     {
    //         id:4,
    //         name:'Folder 4'
    //     },
    //     {
    //         id:5,
    //         name:'Folder 5'
    //     }
    // ]

    
    const [folderList,setFolderList] = useState([])
    const route = useRouter()
    useEffect(() => {
        setFolderList(foldersList)
    }, [])

    const onFolderClick = (folderName,folderId) => {
        route.push(`/home/folder/${folderId}?id=${folderId}&name=${folderName}`)
    }

    
    
  return (
    <div className='p-5 mt-5 bg-white rounded-[15px]'>
        <h2 className='text-lg font-bold items-center'>{title ? title : 'Recent Folders'}
        <span className='float-right text-blue-500 font-normal'><a href='home/folder'>View All</a></span>
        </h2>
        {subFolder? 
        <div className='grid gap-3 grid-cols-1 m-3 w-[60%]'>
            {folderList.length >= 1 ? (folderList?.map((item) => (
                <div onClick={() => {onClickFunc ? onClickFunc(item.name,item.id) : onFolderClick(item.name,item.id)}}>
                <FolderItem folder={item} subFolder={true}/>
                </div>
            ))) : 
            ([1,2,3,4,5].map((item) => (
                <div className='animate-pulse h-[140px] w-[150px]'></div>
            )))}
        </div> :
        <div className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-3'>
            {folderList.length >= 1 ? (folderList?.map((item) => (
                <div onClick={() => {onClickFunc ? onClickFunc(item.name,item.id) : onFolderClick(item.name,item.id)}}>
                <FolderItem folder={item}/>
                </div>
            ))) : 
            ([1,2,3,4,5].map((item) => (
                <div className='animate-pulse h-[140px] w-[150px]'></div>
            )))}
        </div>
        }
        
    </div>
  )
}

export default FolderList
