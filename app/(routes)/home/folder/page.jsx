"use client"

import FolderItem from '../_components/FolderItem'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import {app} from '../../../../config/FirebaseConfig'
import { useRouter } from 'next/navigation'

function page() {
  var {user} = useUser()
    var route = useRouter()
    var db = getFirestore(app)
    var [foldersList,setFoldersList] = useState([])
    
    
    const getFolderList = async() => {
        var q=query(collection(db,"Folders"),
        where("createdBy","==",user?.primaryEmailAddress?.emailAddress));
    
        var count = 0
        var querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          
        // doc.data() is never undefined for query doc snapshots
        if(count > 500) {
            return
        } else {
            // console.log(doc.id, " => ", doc.data());
            setFoldersList(foldersList=>([...foldersList,doc.data()]));
            count++
        } 
        
        });

        
        
    }
    var onFolderClick = (folderName,folderId) => {
      route.push(`/home/folder/${folderId}?id=${folderId}&name=${folderName}`)
  }
  useEffect(() => {
    setFoldersList([])
    user&&getFolderList()
}, [user])
  return (
    <div>
        <h2 className='p-5 mt-5 text-lg font-bold items-center'>My Folders</h2>
        <div className='grid gap-5 grid-cols-2 md:grid-cols-3 m-3'>
            {foldersList?.length >= 1 ? (foldersList?.map((item) => (
                <div onClick={() => onFolderClick(item.name,item.id)}>
                <FolderItem folder={item}/>
                </div>
            ))) : 
            ([1,2,3,4,5].map((item) => (
                <div className='animate-pulse h-[140px] w-[150px]'></div>
            )))}
        </div>
    </div>
  )
}

export default page
