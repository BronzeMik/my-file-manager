"use client"
import SearchBar from './SearchBar'
import FolderList from './FolderList'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import {app} from '../../../../config/FirebaseConfig'
import { useRouter } from 'next/navigation'

function Home() {
  const {user} = useUser()
    const route = useRouter()
    const db = getFirestore(app)
    const [foldersList,setFoldersList] = useState([])
    
    
    const getFolderList = async() => {
        const q=query(collection(db,"Folders"),
        where("createdBy","==",user?.primaryEmailAddress?.emailAddress));
    
        let count = 0
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          
        // doc.data() is never undefined for query doc snapshots
        if(count > 4) {
            return
        } else {
            console.log(doc.id, " => ", doc.data());
            setFoldersList(foldersList=>([...foldersList,doc.data()]));
            count++
        }
        
        });

        
        
    }
    useEffect(() => {
      setFoldersList([])
      user&&getFolderList()
  }, [user])
  return (
    <div>
        {/* <SearchBar /> */}
        {foldersList?.length >=1 && <FolderList foldersList={foldersList}/> }
    </div>
  )
}

export default Home
