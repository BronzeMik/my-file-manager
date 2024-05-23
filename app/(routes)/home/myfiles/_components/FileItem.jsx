import Image from 'next/image'
import React, { useContext } from 'react'
import pdf from '../../../../../public/pdf.png'
import img from '../../../../../public/img.png'
import docx from '../../../../../public/docx.png'
import dateFormat from 'dateformat'
import { Trash2 } from 'lucide-react';
import { FaRegStar, FaStar } from "react-icons/fa";
import { deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'
import {app} from '../../../../../config/FirebaseConfig'
import { NewFileId, ParentFolderIdContext } from '../../layout'
import { useUser } from '@clerk/nextjs'

function FolderItem({file}) {
    const {toast} = useToast();
    const db = getFirestore(app);
    const {setNewFileId} = useContext(NewFileId)
    const {user} = useUser();
    const {parentFolderId} = useContext(ParentFolderIdContext);
    let image = null
    if(file?.type == 'png') {
        image = img
    } else if(file?.type == 'pdf') {
        image = pdf
    } else if(file?.type == 'docx') {
        image = docx
    }

    const deleteFile=async(file)=>{
      await deleteDoc(doc(db,"files",file.id.toString())).then(resp=>{
              setNewFileId(file.id.toString())
              toast({
              title: 'Success',
              description: `${file.name} has been deleted`
              })
      })
  }
  const starFile = async(file) => {
    // Create Folder in Firebase
    // await setDoc(doc(db, 'files', file?.id), { 
    //     name: file.name,
    //     id:file.id,
    //     createdBy: user?.primaryEmailAddress?.emailAddress,
    //     parentFolderId: file.parentFolderId,
    //     starred: 1,
    // })
    await setDoc(doc(db, "files", file.id.toString()), {
      createdBy: user?.primaryEmailAddress?.emailAddress, 
      id:file.id,
      imageUrl: file.imageUrl,
      modifiedAt: file.modifiedAt,
      name: file.name,
      parentFolderId: file.parentFolderId,
      size: file.size,
      type: file.type,
      starred: 1,
    });
    setNewFileId(file.id.toString());
    // Success message
    toast({
        title: "Success!",
        description: "File starred",
      })}

const unstarFile = async(file) => {
  // Create Folder in Firebase
  await setDoc(doc(db, 'files', file?.id.toString()), {
      createdBy: user?.primaryEmailAddress?.emailAddress, 
      id:file.id,
      imageUrl: file.imageUrl,
      modifiedAt: file.modifiedAt,
      name: file.name,
      parentFolderId: file.parentFolderId,
      size: file.size,
      type: file.type,
      starred: 0,
  }, )
  setNewFileId(file.id.toString()+1);
  // Success message
  toast({
      title: "Success!",
      description: "Removed star",
    })}

      
  return (
    <div
      className="grid grid-cols-1
    md:grid-cols-2 justify-between
    cursor-pointer
    p-3 rounded-md"

    >
      <div className="flex gap-2 items-center" >
        {image && <Image
          src={file.type == 'png' ? img : (file.type == 'pdf' ? pdf : docx)}
          alt="file-icon"
          width={26}
          height={20}
          on
        />}
        <a href={file.imageUrl} target='_blank'><h2 className="text-[15px] truncate hover:underline"
        // onClick={()=>window.open(file.imageUrl)}
        >{file.name}</h2></a>
      </div>
      <div className="grid grid-cols-4 place-content-start">
        <h2 className="text-[15px]">
          
          {dateFormat(file.modified, "fullDate")}
        </h2>
        
        <h2 className="text-[15px] flex gap-5">
          {/* {(file.size / 1024 ** 2).toFixed(2) + " MB"} */}
          <span>
            {(file.size / 1024 ** 2).toFixed(2) + " MB"}
          </span>       
        </h2>
        <>
        <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}><Trash2 className='hover:text-red-700' /></button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-full items-center 
    flex flex-col justify-center gap-3 p-6 rounded-lg" >
            <h3 className="font-bold text-lg">Delete File</h3>
            <p className="py-4">Are you sure you want to permanently delete {file.name}?</p>
            <div className="modal-action">
              <form method="dialog">
                
                <div className='flex gap-5 justify-center p-3 '>
                  <button className="btn bg-red-700 hover:bg-red-500 text-white p-4 rounded-lg" onClick={()=>deleteFile(file)}>Yes, delete this file</button>
                  <button className="btn bg-black hover:bg-gray-800 text-white p-4 rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        </>
        <div className='flex items-center'>
          {file?.starred == 1 ? <FaStar className='text-2xl text-yellow-500 ' onClick={(() => unstarFile(file))} /> 
          : <FaRegStar className='text-2xl text-black hover:text-yellow-500' onClick={(() => starFile(file))} />
          }
          </div>
      </div>
      
      
      

      
    </div>
  )
}

export default FolderItem
