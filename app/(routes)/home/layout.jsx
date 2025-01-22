"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'
import { SidebarProvider } from '@/context/SideBarContext'

export const ParentFolderIdContext = createContext();
export const NewFolderContext = createContext('');
export const NewFileId = createContext('');
export const StorageContext = createContext();


function layout({children}) {

  const [parentFolderId, setParentFolderId] = useState("");
  const [newFolderId, setNewFolderId] = useState("");
  const [newFileId, setNewFileId] = useState("");
  const [storageAmount, setStorageAmount] = useState("");
  
  return (
    <ParentFolderIdContext.Provider value={{parentFolderId, setParentFolderId}}>
      <NewFolderContext.Provider value={{newFolderId, setNewFolderId}}>
        <NewFileId.Provider value={{newFileId, setNewFileId}}>
          <StorageContext.Provider value={{storageAmount, setStorageAmount}}>
            
          <div className=''>
              <div className="fixed md:w-64 md:block">
                  <SideBar />
              </div>
              <div className="md:ml-64">
                  
                  {children}
              </div>
          </div>
          
          </StorageContext.Provider>
        </NewFileId.Provider>
      </NewFolderContext.Provider>
    </ParentFolderIdContext.Provider>
  )
}

export default layout
