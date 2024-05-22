"use client"
import Image from 'next/image'
import React, { createContext, useContext, useState } from 'react'
import {app} from '../../../../../config/FirebaseConfig'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';
import { NewFolderContext, ParentFolderIdContext, StorageContext } from '../../layout';



function CreateFolderModal() {
    const { toast } = useToast()
    const docId=Date.now().toString()
    const {user} = useUser();
    const db=getFirestore(app)
    const [folderName, setFolderName] = useState('')
    const {parentFolderId} = useContext(ParentFolderIdContext)
    const {setNewFolderId} = useContext(NewFolderContext)
    const {storageAmount} = useContext(StorageContext);
    
    
    

    const onCreate = async() => {
      
      if(storageAmount >= 50) {
        toast({
          title: "No More Space",
          description: 'You have no available storage'
        })
      } else {
        // Create Folder in Firebase
        await setDoc(doc(db, 'Folders', docId), { 
            name: folderName,
            id:docId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            parentFolderId: parentFolderId,
            starred: 0,
        }, )
        setNewFolderId(docId);
        // Success message
        toast({
            title: "Success!",
            description: "Folder Created",
          })
          

          setFolderName('')
          }
          

    }
  return (
    <form method="dialog" className="modal-box p-9 items-center">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
      ✕
    </button>
    <div className="w-full items-center 
    flex flex-col justify-center gap-3">
      <Image src="/folder.png" alt="folder" width={50} height={50} />
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        className="p-2 border-[1px] outline-none
            rounded-md"
            onChange={(e)=>setFolderName(e.target.value)}
      />
      <button className="bg-blue-500
      text-white rounded-md p-2 px-3 w-full"
      onClick={()=>onCreate()}
      >Create</button>
    </div>
  </form>
  )
}

export default CreateFolderModal
