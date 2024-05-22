"use client"

import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../_components/SearchBar'
import FileList from '../../myfiles/_components/FileList'
import FolderList from '../../_components/FolderList'
import { useRouter, useSearchParams } from 'next/navigation'
import { NewFileId, NewFolderContext, ParentFolderIdContext } from '../../layout'
import {app} from '../../../../../config/FirebaseConfig'
import { useUser } from '@clerk/nextjs'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

function FolderDetails() {
    const router = useSearchParams()
    const {user} = useUser();
    const folderName = router.get('name')
    const folderId = router.get('id')
    const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);
    const {newFolderId} = useContext(NewFolderContext);
    const db = getFirestore(app)
    const [foldersList, setFoldersList] = useState()
    const route = useRouter()
    const [filesList, setFilesList] = useState([]);
    const {newFileId} = useContext(NewFileId);

    useEffect(() => {
        setFoldersList([])
        setParentFolderId(folderId)
        if(parentFolderId == folderId) {
            getFolderList(parentFolderId);
            getFileList(parentFolderId);
        }
    }, [parentFolderId, newFolderId, newFileId])

    const getFolderList = async(parentFolder) => {
        const q=query(collection(db,"Folders"),
        where("createdBy","==",user?.primaryEmailAddress?.emailAddress),
        where('parentFolderId', '==', parentFolder))
    
        let count = 0
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setFoldersList(foldersList=>([...foldersList,doc.data()]));
            count++
        
        });
        
    }

    const getFileList=async(parentFolder)=>{
        setFilesList([]);
        const q=query(collection(db,"files"),
        where("createdBy",'==',user?.primaryEmailAddress?.emailAddress),
        where("parentFolderId",'==',parentFolder))
      
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setFilesList(filesList=>([...filesList,doc.data()]))
        console.log(filesList)
    }); 
      }
    
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
    // const filesList = [
    //     {
    //         id:1,
    //         name: 'Sample doc page',
    //         type: 'doc',
    //         size: '6272',
    //         modified: 'Nov 23 2020',
    //         icon: ''
    //     },
    //     {
    //         id:2,
    //         name: 'Data Structure PDF',
    //         type: 'pdf',
    //         size: '627',
    //         modified: 'Nov 28 2020'
    //     },
    //     {
    //         id:3,
    //         name: 'Sample Image png',
    //         type: 'png',
    //         size: '400',
    //         modified: 'Nov 23 2020'
    //     },
    //     {
    //         id:4,
    //         name:'React Principal.docx',
    //         type:'doc',
    //         size:'6272',
    //         modified:'Nov 23,2020'
    //     },
    //     {
    //         id:5,
    //         name: 'Sample doc page',
    //         type: 'doc',
    //         size: '6272',
    //         modified: 'Nov 23 2020'
    //     }
    // ]

    const onFolderClick = (name,id) => {
        
        route.replace(`/home/folder/${id}?id=${id}&name=${name}`);
    }
  return (
    <div><div className='p-5'>
    <SearchBar/>
    <h2 className='text-[20px] font-bold mt-5'>{`Folder: ${folderName}`}
    <svg xmlns="http://www.w3.org/2000/svg" 
    // onClick={()=>deleteFolder()}
      fill="none" viewBox="0 0 24 24" 
      strokeWidth={1.5} stroke="currentColor"
       className="w-5 h-5 float-right text-red-500
       hover:scale-110 transition-all cursor-pointer">
   <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    </h2>
   {foldersList?.length>0? <FolderList 
    foldersList={foldersList}
    subFolder={true}
    title={'Subfolders'} onClickFunc={onFolderClick}/>:
    <h2 className='text-gray-400
    text-[16px] mt-5'>No Folder Found</h2>}

    <FileList filesList={filesList} />
</div></div>
  )
}

export default FolderDetails
