"use client"
import { useContext, useEffect, useState } from 'react'
import FileList from '../myfiles/_components/FileList';
import { NewFileId, ParentFolderIdContext } from '../layout';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import {app} from '../../../../config/FirebaseConfig';
import Storage from '../_components/Storage/Storage';


function page() {
  const {setParentFolderId} = useContext(ParentFolderIdContext)
    const [filesList, setFilesList] = useState([]);
    const {user} = useUser();
    const {newFileId} = useContext(NewFileId);
    const db = getFirestore(app)

    const getFileList=async()=>{
        setFilesList([]);
        const q=query(collection(db,"files"),
        where("createdBy",'==',user?.primaryEmailAddress?.emailAddress),
        where("starred",'==',1)
      );
      
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setFilesList(fileList=>([...fileList,doc.data()]))
        console.log(filesList)
    }); 
      }
      useEffect(() =>{
        setParentFolderId(0)
        user&&getFileList()
      }, [user, newFileId])
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='col-span-1 md:col-span-2 bg-gray-100 p-5'>
                <FileList title="Starred Files" filesList={filesList}/>
            </div>
            <div className='bg-white p-5'>
            <Storage />
            </div>
            
        </div>
    </div>
  )
}

export default page
